/**
 * api/lead-submit.ts
 * Hero Lead Flow — main submission endpoint.
 *
 * Security hardening applied:
 *  - IP resolved via REMOTE_ADDR; X-Forwarded-For only trusted if REMOTE_ADDR
 *    is in TRUSTED_PROXY_CIDRS (prevents rate-limit bypass via header spoofing)
 *  - Request body size capped at 64 KB before processing
 *  - Strict same-origin CORS (no wildcard)
 *  - Correlation ID on every request and response
 *  - CRM success parsed strictly via parseCrmResponse()
 *  - Idempotency key prevents duplicate CRM calls within LEAD_IDEMPOTENCY_TTL_HOURS
 *  - No raw PII in logs (email/phone redacted or hashed)
 *  - SMTP/CRM credentials never surfaced to caller
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import {
  generateCorrelationId,
  resolveClientIp,
  bodyTooLarge,
  applyCors,
  checkRateLimit,
  recordRateHit,
  redactEmail,
  redactPhone,
  hashValue,
  parseCrmResponse,
  buildIdempotencyKey,
  getIdempotencyRecord,
  setIdempotencyRecord,
  updateIdempotencyStatus,
} from './lib/security.js'

// ---------------------------------------------------------------------------
// Input validation schema
// ---------------------------------------------------------------------------

const LeadSchema = z.object({
  // Step 1: Contact (matching frontend EnterpriseLeadForm field names)
  fullName: z.string().min(2).max(100).refine(val => {
    const words = val.trim().split(/\s+/).filter(w => w.length > 0)
    return words.length >= 2
  }, 'Full name must contain at least 2 words'),
  jobTitle: z.string().min(2).max(100),
  email: z.string().email().transform(val => val.toLowerCase().replace(/\s/g, '')),
  phone: z.string().min(8).max(20).transform(val => {
    let cleaned = val.replace(/\s+/g, '').replace(/[^0-9+]/g, '')
    if (cleaned.startsWith('05') && cleaned.length === 10) {
      cleaned = '+966' + cleaned.substring(1)
    } else if (cleaned.match(/^5\d{8}$/)) {
      cleaned = '+966' + cleaned
    }
    return cleaned
  }),
  additionalNotes: z.string().max(1000).optional().default(''),

  // Step 2: Organization (matching frontend field names)
  organizationName: z.string().max(200).optional().default(''),
  sector: z.string().max(100).optional().default(''),
  country: z.string().max(100).optional().default(''),

  // Step 3: Requirements
  boardCount: z.string().max(50).optional().default(''),
  memberCount: z.string().max(50).optional().default(''),
  currentTools: z.string().max(500).optional().default(''),
  timeline: z.string().max(50).optional().default(''),

  // Step 4: Preferences
  deploymentPreference: z.enum(['cloud', 'on-premise', 'hybrid', '']).optional().default(''),
  demoPreference: z.enum(['video-call', 'in-person', 'self-guided', '']).optional().default(''),

  // Security
  recaptchaToken: z.string().min(1),
  honeypot: z.string().max(0).optional().default(''),

  // Metadata (non-PII)
  locale: z.enum(['ar', 'en', 'hi', 'ur']).default('ar'),
  pageUrl: z.string().max(500).optional().default(''),
  ctaLabel: z.string().max(200).optional().default(''),
  referrer: z.string().max(500).optional().default(''),
  utm_source: z.string().max(200).optional().default(''),
  utm_campaign: z.string().max(200).optional().default(''),
  utm_content: z.string().max(200).optional().default(''),
  utm_medium: z.string().max(200).optional().default(''),
  utm_term: z.string().max(200).optional().default(''),
  affiliateParam: z.string().max(200).optional().default(''),
})

type LeadData = z.infer<typeof LeadSchema>

// ---------------------------------------------------------------------------
// reCAPTCHA verification
// ---------------------------------------------------------------------------

async function verifyRecaptcha(
  token: string,
  ip: string,
  correlationId: string
): Promise<{ success: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error(`[lead] RECAPTCHA_SECRET_KEY not configured cid=${correlationId}`)
    return { success: false, score: 0 }
  }

  const expectedAction = process.env.RECAPTCHA_EXPECTED_ACTION || 'hero_lead_submit'

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
    const data = await response.json() as Record<string, unknown>

    // Validate action if provided by reCAPTCHA v3
    if (data.action && data.action !== expectedAction) {
      console.warn(
        `[lead] reCAPTCHA action mismatch expected=${expectedAction} got=${data.action} cid=${correlationId}`
      )
      return { success: false, score: 0 }
    }

    return {
      success: data.success === true,
      score: typeof data.score === 'number' ? data.score : 0,
    }
  } catch (err) {
    console.error(`[lead] reCAPTCHA verification threw cid=${correlationId}`, err)
    return { success: false, score: 0 }
  }
}

// ---------------------------------------------------------------------------
// Lead score (no PII — only structural)
// ---------------------------------------------------------------------------

function calculateLeadScore(data: LeadData): number {
  let score = 0
  if (data.fullName.length > 5) score += 10
  if (data.jobTitle.length > 3) score += 10
  if (data.email.includes('@')) score += 10
  if (data.phone.length > 8) score += 10
  if (data.organizationName && data.organizationName.length > 3) score += 15
  if (data.sector) score += 10
  if (data.boardCount) score += 5
  if (data.memberCount) score += 5
  if (data.timeline) score += 5
  if (data.deploymentPreference) score += 5
  if (data.demoPreference) score += 5
  if (data.additionalNotes && data.additionalNotes.length > 20) score += 10
  return Math.min(score, 100)
}

// ---------------------------------------------------------------------------
// CRM payload builder
// ---------------------------------------------------------------------------

function buildMessageDetails(data: LeadData): string {
  const leadScore = calculateLeadScore(data)
  return `
الهدف من الطلب: طلب عرض توضيحي

اسم الجهة / الشركة: ${data.organizationName || '—'}
مجال عمل الجهة: ${data.sector || '—'}
الدولة: ${data.country || '—'}
عدد المجالس واللجان: ${data.boardCount || '—'}
عدد الأعضاء: ${data.memberCount || '—'}
الأدوات الحالية: ${data.currentTools || '—'}
الجدول الزمني: ${data.timeline || '—'}
تفضيل التوزيع: ${data.deploymentPreference || '—'}
تفضيل العرض: ${data.demoPreference || '—'}

الاسم الكامل: ${data.fullName}
المسمى الوظيفي: ${data.jobTitle}
البريد الإلكتروني للعمل: ${data.email}
رقم الجوال: ${data.phone}
ملاحظات إضافية: ${data.additionalNotes || '—'}

رابط الصفحة: ${data.pageUrl || '—'}
اللغة الحالية: ${data.locale || '—'}
الزر الذي فتح النموذج: ${data.ctaLabel || '—'}
المصدر: ${data.utm_source || '—'}
الحملة: ${data.utm_campaign || '—'}
المحتوى الإعلاني: ${data.utm_content || '—'}
الوسيط: ${data.utm_medium || '—'}
مصطلح الإعلان: ${data.utm_term || '—'}
المرجع: ${data.referrer || '—'}
معرف الإحالة: ${data.affiliateParam || '—'}

Lead Score: ${leadScore}
وقت الإرسال: ${new Date().toISOString()}
`.trim()
}

// ---------------------------------------------------------------------------
// CRM submission
// ---------------------------------------------------------------------------

async function sendToCRM(
  data: LeadData,
  correlationId: string
): Promise<{ ok: boolean; crmId?: string }> {
  const crmUrl = process.env.CRM_API_URL
  const crmToken = process.env.CRM_USER_TOKEN

  if (!crmUrl || !crmToken) {
    console.warn(`[lead] CRM not configured, skipping cid=${correlationId}`)
    return { ok: true } // Not a fatal error when CRM is not wired up yet
  }

  const crmPayload: Record<string, unknown> = {
    member_name: data.fullName,
    member_phone: data.phone,
    member_email: data.email,
    memberField_37: data.organizationName || '',
    memberField_23: '22',
    title: 'طلب نظام ديوان سويت',
    customField_33: 'نظام ديوان سويت',
    customField_19: 'diwansuite.com',
    customField_35: 0,
    customField_98: 1,
    customField_102: 0,
    customField_21: buildMessageDetails(data),
    customField_20: '',
    customField_91: '',
    customField_90: '',
    customField_34: '',
    customField_36: '',
    customField_100: '',
    member_country: data.country || 'sa',
    // Correlation ID for CRM-side tracing if supported
    custom_ref: correlationId,
  }

  if (data.affiliateParam) {
    crmPayload.assign_ids = data.affiliateParam
  }

  try {
    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${crmToken}`,
        'Accept': 'application/json',
        'X-Correlation-ID': correlationId,
      },
      body: JSON.stringify(crmPayload),
      signal: AbortSignal.timeout(10_000),
    })

    let body: unknown = null
    try {
      body = await response.json()
    } catch {
      body = null
    }

    const result = parseCrmResponse(response.status, body, correlationId)
    if (!result.ok) {
      // Log a safe summary — no PII, no token
      console.error(
        `[lead] CRM rejected submission status=${response.status} cid=${correlationId}`
      )
    }
    return result
  } catch (err) {
    // AbortError = timeout; other errors = network failure
    const reason = err instanceof Error ? err.name : 'unknown'
    console.error(`[lead] CRM fetch failed reason=${reason} cid=${correlationId}`)
    return { ok: false }
  }
}

// ---------------------------------------------------------------------------
// SMTP notification
// ---------------------------------------------------------------------------

async function sendNotificationEmail(
  data: LeadData,
  correlationId: string
): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
  const smtpSecure = process.env.SMTP_SECURE === 'true'
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpFrom = process.env.SMTP_FROM || smtpUser
  const notifyEmail = process.env.LEAD_EMAIL_TO

  if (!smtpHost || !smtpUser || !smtpPass || !notifyEmail) {
    console.warn(`[lead] SMTP not configured, skipping email cid=${correlationId}`)
    return true
  }

  const leadScore = calculateLeadScore(data)

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure || smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Diwan Suite" <${smtpFrom}>`,
      to: notifyEmail,
      subject: 'طلب عرض توضيحي جديد - ديوان سويت',
      headers: { 'X-Correlation-ID': correlationId },
      html: `
        <div dir="rtl" style="font-family:'Segoe UI',Tahoma,Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1a1a2e;border-bottom:2px solid #4e47e3;padding-bottom:10px;">طلب عرض توضيحي جديد</h2>
          <p style="font-size:11px;color:#999;">Correlation ID: ${correlationId}</p>

          <h3 style="color:#4e47e3;margin-top:20px;">معلومات التواصل</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;width:150px;"><strong>الاسم الكامل:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.fullName}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>المسمى الوظيفي:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.jobTitle}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>البريد الإلكتروني:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.email}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>رقم الجوال:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.phone}</td></tr>
          </table>

          <h3 style="color:#4e47e3;margin-top:20px;">بيانات الجهة</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;width:150px;"><strong>اسم الجهة:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.organizationName || '—'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>مجال العمل:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.sector || '—'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>الدولة:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.country || '—'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>عدد المجالس:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.boardCount || '—'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>عدد الأعضاء:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.memberCount || '—'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>الجدول الزمني:</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.timeline || '—'}</td></tr>
          </table>

          ${data.additionalNotes ? `<h3 style="color:#4e47e3;margin-top:20px;">ملاحظات إضافية</h3><p style="background:#f8f9fa;padding:15px;border-radius:8px;">${data.additionalNotes}</p>` : ''}

          <h3 style="color:#4e47e3;margin-top:20px;">معلومات إضافية</h3>
          <table style="width:100%;border-collapse:collapse;font-size:12px;color:#666;">
            <tr><td style="padding:5px;"><strong>Lead Score:</strong></td><td style="padding:5px;">${leadScore}/100</td></tr>
            <tr><td style="padding:5px;"><strong>اللغة:</strong></td><td style="padding:5px;">${data.locale}</td></tr>
            <tr><td style="padding:5px;"><strong>الصفحة:</strong></td><td style="padding:5px;">${data.pageUrl || '—'}</td></tr>
            <tr><td style="padding:5px;"><strong>المصدر:</strong></td><td style="padding:5px;">${data.utm_source || '—'}</td></tr>
            <tr><td style="padding:5px;"><strong>الحملة:</strong></td><td style="padding:5px;">${data.utm_campaign || '—'}</td></tr>
            <tr><td style="padding:5px;"><strong>وقت الإرسال:</strong></td><td style="padding:5px;">${new Date().toISOString()}</td></tr>
          </table>
        </div>
      `,
    })

    return true
  } catch (err) {
    // Intentionally no error details in response — logged here only
    console.error(`[lead] SMTP sendMail failed cid=${correlationId}`)
    return false
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const correlationId = generateCorrelationId()
  res.setHeader('X-Correlation-ID', correlationId)

  // --- CORS ---
  const origin = req.headers.origin
  const corsOk = applyCors(origin, (k, v) => res.setHeader(k, v))

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (!corsOk) {
    return res.status(403).json({ error: 'forbidden', correlationId })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed', correlationId })
  }

  // --- Request size guard ---
  if (bodyTooLarge(req.headers['content-length'])) {
    return res.status(413).json({
      error: 'payload_too_large',
      message: 'حجم الطلب كبير جدًا.',
      correlationId,
    })
  }

  // --- IP resolution (safe, proxy-aware) ---
  const ip = resolveClientIp(
    req.socket?.remoteAddress,
    req.headers['x-forwarded-for'] as string | undefined
  )

  // --- Rate limiting ---
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    console.warn(`[lead] Rate limit hit hashedIp=${hashValue(ip)} cid=${correlationId}`)
    return res.status(429).json({
      error: 'rate_limit_exceeded',
      message: 'لقد تجاوزت الحد المسموح. يرجى المحاولة لاحقًا.',
      retryAfter: 3600,
      correlationId,
    })
  }

  // --- Input validation ---
  const parseResult = LeadSchema.safeParse(req.body)
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'validation_error',
      message: 'بيانات غير صالحة.',
      correlationId,
    })
  }

  const data = parseResult.data

  // --- Honeypot check (silent accept for bots) ---
  if (data.honeypot) {
    return res.status(200).json({ success: true, correlationId })
  }

  // --- reCAPTCHA ---
  const recaptcha = await verifyRecaptcha(data.recaptchaToken, ip, correlationId)
  if (!recaptcha.success) {
    return res.status(400).json({
      error: 'recaptcha_failed',
      message: 'تعذر التحقق من الحماية. يرجى المحاولة مرة أخرى.',
      correlationId,
    })
  }

  const acceptScore = parseFloat(process.env.RECAPTCHA_ACCEPT_SCORE || '0.7')
  const reviewScore = parseFloat(process.env.RECAPTCHA_REVIEW_SCORE || '0.4')

  if (recaptcha.score < reviewScore) {
    console.warn(
      `[lead] reCAPTCHA score critically low score=${recaptcha.score} cid=${correlationId}`
    )
    return res.status(400).json({
      error: 'recaptcha_score_too_low',
      message: 'تعذر التحقق من الحماية. يرجى المحاولة مرة أخرى.',
      correlationId,
    })
  }

  const requiresReview = recaptcha.score < acceptScore

  // --- Record rate hit only after passing all guards ---
  recordRateHit(ip)

  // --- Idempotency check ---
  const idempotencyKey = buildIdempotencyKey(
    data.email,
    data.phone,
    data.organizationName || ''
  )
  const existing = getIdempotencyRecord(idempotencyKey)

  if (existing && (existing.status === 'crm_sent' || existing.status === 'completed')) {
    console.info(
      `[lead] Duplicate request idempotency hit, returning cached success cid=${correlationId} originalCid=${existing.correlationId}`
    )
    return res.status(200).json({
      success: true,
      correlationId,
      // Indicate to frontend that this was a deduplicated response
      deduplicated: true,
    })
  }

  // Record new submission
  setIdempotencyRecord(idempotencyKey, {
    status: 'received',
    createdAt: Date.now(),
    correlationId,
  })

  console.info(
    `[lead] Submission received email=${redactEmail(data.email)} phone=${redactPhone(data.phone)} score=${recaptcha.score} requiresReview=${requiresReview} cid=${correlationId}`
  )

  // --- CRM submission ---
  updateIdempotencyStatus(idempotencyKey, 'crm_pending' as any)
  const crmResult = await sendToCRM(data, correlationId)
  if (crmResult.ok) {
    updateIdempotencyStatus(idempotencyKey, 'crm_sent', crmResult.crmId)
  } else {
    updateIdempotencyStatus(idempotencyKey, 'failed')
  }

  // --- Email notification ---
  const emailResult = await sendNotificationEmail(data, correlationId)

  if (crmResult.ok || emailResult) {
    updateIdempotencyStatus(idempotencyKey, 'completed')
  }

  console.info(
    `[lead] Result crm=${crmResult.ok} email=${emailResult} cid=${correlationId}`
  )

  // If both fail, return generic error (no details)
  if (!crmResult.ok && !emailResult) {
    return res.status(500).json({
      error: 'submission_failed',
      message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.',
      correlationId,
    })
  }

  return res.status(200).json({ success: true, correlationId })
}
