/**
 * api/lead-otp-verify.ts
 * Verify OTP and finalize lead submission for OTP-gated flow.
 *
 * Security hardening:
 *  - OTP verified via timing-safe HMAC comparison (no plaintext lookup)
 *  - Max-attempt and expiry enforced in shared otp-store module
 *  - Strict same-origin CORS (no wildcard)
 *  - CRM success parsed strictly
 *  - No PII in logs (email/phone redacted)
 *  - SMTP/CRM errors not surfaced to caller
 *  - Correlation ID on every request and response
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import {
  generateCorrelationId,
  resolveClientIp,
  bodyTooLarge,
  applyCors,
  redactEmail,
  redactPhone,
  parseCrmResponse,
} from './lib/security.js'
import { verifyOtp } from './lib/otp-store.js'

// ---------------------------------------------------------------------------
// Input schema — full form data collected during OTP flow
// ---------------------------------------------------------------------------

const VerifyOtpSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  otp: z.string().length(6).regex(/^\d{6}$/),

  fullName: z.string().min(2).max(100),
  jobTitle: z.string().min(2).max(100),
  phone: z.string().min(8).max(20),
  organizationName: z.string().min(2).max(200),
  sector: z.string().min(1).max(100),
  country: z.string().min(2).max(100),
  boardCount: z.string().min(1).max(20),
  memberCount: z.string().min(1).max(20),
  currentTools: z.string().max(500).optional().default(''),
  timeline: z.string().min(1).max(50),
  deploymentPreference: z.enum(['cloud', 'on-premise', 'hybrid']),
  demoPreference: z.enum(['video-call', 'in-person', 'self-guided']),
  additionalNotes: z.string().max(1000).optional().default(''),
  locale: z.enum(['ar', 'en', 'hi', 'ur']).default('ar'),
})

type VerifyData = z.infer<typeof VerifyOtpSchema>

// ---------------------------------------------------------------------------
// CRM submission
// ---------------------------------------------------------------------------

async function sendToCRM(
  data: VerifyData,
  correlationId: string
): Promise<{ ok: boolean; crmId?: string }> {
  const crmUrl = process.env.CRM_API_URL
  const crmToken = process.env.CRM_USER_TOKEN

  if (!crmUrl || !crmToken) {
    console.warn(`[otp-verify] CRM not configured cid=${correlationId}`)
    return { ok: true }
  }

  try {
    const payload = {
      source: 'diwan-suite-website-otp',
      verifiedViaOtp: true,
      member_name: data.fullName,
      member_phone: data.phone,
      member_email: data.email,
      member_country: 'sa',
      memberField_37: data.organizationName,
      customField_33: 'نظام ديوان سويت',
      customField_19: 'diwansuite.com',
      customField_21: [
        `اسم الجهة: ${data.organizationName}`,
        `المجال: ${data.sector}`,
        `الدولة: ${data.country}`,
        `المجالس: ${data.boardCount}`,
        `الأعضاء: ${data.memberCount}`,
        `الأدوات: ${data.currentTools || '—'}`,
        `الجدول الزمني: ${data.timeline}`,
        `التوزيع: ${data.deploymentPreference}`,
        `تفضيل العرض: ${data.demoPreference}`,
        `ملاحظات: ${data.additionalNotes || '—'}`,
      ].join('\n'),
      custom_ref: correlationId,
    }

    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${crmToken}`,
        'Accept': 'application/json',
        'X-Correlation-ID': correlationId,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    })

    let body: unknown = null
    try {
      body = await response.json()
    } catch {
      body = null
    }

    return parseCrmResponse(response.status, body, correlationId)
  } catch (err) {
    const reason = err instanceof Error ? err.name : 'unknown'
    console.error(`[otp-verify] CRM fetch failed reason=${reason} cid=${correlationId}`)
    return { ok: false }
  }
}

// ---------------------------------------------------------------------------
// Notification email to team
// ---------------------------------------------------------------------------

async function sendNotificationEmail(
  data: VerifyData,
  correlationId: string
): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const notifyEmail = process.env.LEAD_EMAIL_TO

  if (!smtpHost || !smtpUser || !smtpPass || !notifyEmail) return true

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Diwan Suite Leads" <${smtpUser}>`,
      to: notifyEmail,
      subject: `[تحقق OTP] طلب جديد: ${data.organizationName}`,
      headers: { 'X-Correlation-ID': correlationId },
      html: `
        <div dir="rtl" style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1a1a2e;">طلب جديد (تحقق عبر OTP)</h2>
          <p style="font-size:11px;color:#999;">Correlation ID: ${correlationId}</p>
          <ul>
            <li><strong>الاسم:</strong> ${data.fullName}</li>
            <li><strong>المسمى:</strong> ${data.jobTitle}</li>
            <li><strong>البريد (محقق):</strong> ${data.email}</li>
            <li><strong>الجوال:</strong> ${data.phone}</li>
            <li><strong>الجهة:</strong> ${data.organizationName}</li>
            <li><strong>المجال:</strong> ${data.sector}</li>
            <li><strong>الدولة:</strong> ${data.country}</li>
            <li><strong>المجالس:</strong> ${data.boardCount}</li>
            <li><strong>الأعضاء:</strong> ${data.memberCount}</li>
            <li><strong>الجدول الزمني:</strong> ${data.timeline}</li>
            <li><strong>التوزيع:</strong> ${data.deploymentPreference}</li>
            <li><strong>تفضيل العرض:</strong> ${data.demoPreference}</li>
          </ul>
          ${data.additionalNotes ? `<p><strong>ملاحظات:</strong> ${data.additionalNotes}</p>` : ''}
        </div>
      `,
    })

    return true
  } catch {
    console.error(`[otp-verify] Notification email failed cid=${correlationId}`)
    return false
  }
}

// ---------------------------------------------------------------------------
// Confirmation email to user
// ---------------------------------------------------------------------------

async function sendConfirmationEmail(
  data: VerifyData,
  correlationId: string
): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpFrom = process.env.SMTP_FROM || smtpUser

  if (!smtpHost || !smtpUser || !smtpPass) return true

  const subjects: Record<string, string> = {
    ar: 'شكراً لتواصلك مع ديوان سويت',
    en: 'Thank you for contacting Diwan Suite',
    hi: 'दीवान सुइट से संपर्क करने के लिए धन्यवाद',
    ur: 'دیوان سویٹ سے رابطہ کرنے کا شکریہ',
  }

  const bodies: Record<string, string> = {
    ar: `<div dir="rtl" style="font-family:'Cairo',Arial,sans-serif;"><h2>مرحباً ${data.fullName}،</h2><p>شكراً لتواصلك مع فريق ديوان سويت.</p><p>تم التحقق من بريدك الإلكتروني واستلام طلبك بنجاح.</p><p>سيقوم فريقنا بالتواصل معك خلال ٢٤ ساعة عمل.</p><p>مع أطيب التحيات،<br/>فريق ديوان سويت</p></div>`,
    en: `<div style="font-family:Arial,sans-serif;"><h2>Hello ${data.fullName},</h2><p>Thank you for contacting the Diwan Suite team.</p><p>Your email has been verified and your request received.</p><p>Our team will contact you within 24 business hours.</p><p>Best regards,<br/>Diwan Suite Team</p></div>`,
    hi: `<div style="font-family:Arial,sans-serif;"><h2>नमस्ते ${data.fullName},</h2><p>दीवान सुइट टीम से संपर्क करने के लिए धन्यवाद।</p><p>आपका ईमेल सत्यापित हो गया है।</p><p>हमारी टीम 24 व्यावसायिक घंटों में संपर्क करेगी।</p><p>सादर,<br/>दीवान सुइट टीम</p></div>`,
    ur: `<div dir="rtl" style="font-family:Arial,sans-serif;"><h2>ہیلو ${data.fullName}،</h2><p>دیوان سویٹ ٹیم سے رابطہ کرنے کا شکریہ۔</p><p>آپ کی درخواست موصول ہو گئی۔</p><p>ہماری ٹیم 24 گھنٹوں میں رابطہ کرے گی۔</p><p>نیک تمنائیں،<br/>دیوان سویٹ ٹیم</p></div>`,
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Diwan Suite" <${smtpFrom}>`,
      to: data.email,
      subject: subjects[data.locale] || subjects.en,
      html: bodies[data.locale] || bodies.en,
      headers: { 'X-Correlation-ID': correlationId },
    })

    return true
  } catch {
    console.error(`[otp-verify] Confirmation email failed cid=${correlationId}`)
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

  // --- Size guard ---
  if (bodyTooLarge(req.headers['content-length'])) {
    return res.status(413).json({ error: 'payload_too_large', correlationId })
  }

  // --- Input validation ---
  const parseResult = VerifyOtpSchema.safeParse(req.body)
  if (!parseResult.success) {
    return res.status(400).json({ error: 'validation_error', correlationId })
  }

  const data = parseResult.data

  const ip = resolveClientIp(
    req.socket?.remoteAddress,
    req.headers['x-forwarded-for'] as string | undefined
  )

  console.info(
    `[otp-verify] Attempt email=${redactEmail(data.email)} cid=${correlationId}`
  )

  // --- OTP verification (timing-safe, hashed) ---
  const result = verifyOtp(data.email, data.otp)

  if (!result.ok) {
    const messages: Record<string, string> = {
      not_found: 'لم يتم العثور على رمز التحقق. يرجى طلب رمز جديد.',
      expired: 'انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.',
      max_attempts: 'تم تجاوز الحد الأقصى للمحاولات. يرجى طلب رمز جديد.',
      invalid: 'رمز التحقق غير صحيح.',
    }

    console.warn(
      `[otp-verify] OTP failed reason=${result.reason} email=${redactEmail(data.email)} cid=${correlationId}`
    )

    return res.status(400).json({
      error: result.reason,
      message: messages[result.reason] || 'رمز التحقق غير صحيح.',
      ...(result.reason === 'invalid' && 'attemptsRemaining' in result
        ? { attemptsRemaining: result.attemptsRemaining }
        : {}),
      correlationId,
    })
  }

  console.info(
    `[otp-verify] OTP verified email=${redactEmail(data.email)} phone=${redactPhone(data.phone)} cid=${correlationId}`
  )

  // --- Post-verification: CRM + emails in parallel ---
  const [crmResult, notifyResult, confirmResult] = await Promise.all([
    sendToCRM(data, correlationId),
    sendNotificationEmail(data, correlationId),
    sendConfirmationEmail(data, correlationId),
  ])

  console.info(
    `[otp-verify] Result crm=${crmResult.ok} notify=${notifyResult} confirm=${confirmResult} cid=${correlationId}`
  )

  return res.status(200).json({
    success: true,
    verified: true,
    correlationId,
  })
}
