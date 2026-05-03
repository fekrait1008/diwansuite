/**
 * api/lead-otp-send.ts
 * Send OTP verification code via email.
 *
 * Security hardening:
 *  - OTP generated server-side only, stored as HMAC-SHA256 hash (never plaintext)
 *  - Resend cooldown and max-resend enforced via shared otp-store module
 *  - Strict same-origin CORS (no wildcard)
 *  - Request body size capped
 *  - Correlation ID on every request
 *  - OTP code never appears in logs or response
 *  - Email redacted in logs
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
} from './lib/security.js'
import { generateOtp, storeOtp } from './lib/otp-store.js'

// ---------------------------------------------------------------------------
// Input schema
// ---------------------------------------------------------------------------

const SendOtpSchema = z.object({
  email: z.string().email().transform(v => v.toLowerCase().trim()),
  locale: z.enum(['ar', 'en', 'hi', 'ur']).default('ar'),
})

// ---------------------------------------------------------------------------
// Email content per locale
// ---------------------------------------------------------------------------

function buildOtpEmail(otp: string, locale: string): { subject: string; html: string } {
  const subjects: Record<string, string> = {
    ar: 'رمز التحقق - ديوان سويت',
    en: 'Verification Code - Diwan Suite',
    hi: 'सत्यापन कोड - दीवान सुइट',
    ur: 'تصدیقی کوڈ - دیوان سویٹ',
  }

  const ttlMinutes = Math.round(
    parseInt(process.env.OTP_TTL_SECONDS || '600', 10) / 60
  )

  const html: Record<string, string> = {
    ar: `
      <div dir="rtl" style="font-family:'Cairo',Arial,sans-serif;text-align:center;padding:40px;max-width:480px;margin:0 auto;">
        <h2 style="color:#1a1a2e;">رمز التحقق الخاص بك</h2>
        <p style="font-size:36px;font-weight:bold;letter-spacing:10px;background:#f5f5f5;padding:20px;border-radius:8px;color:#4e47e3;">${otp}</p>
        <p style="color:#555;">هذا الرمز صالح لمدة ${ttlMinutes} دقائق.</p>
        <p style="color:#999;font-size:12px;">إذا لم تطلب هذا الرمز، يرجى تجاهل هذه الرسالة.</p>
      </div>`,
    en: `
      <div style="font-family:Arial,sans-serif;text-align:center;padding:40px;max-width:480px;margin:0 auto;">
        <h2 style="color:#1a1a2e;">Your Verification Code</h2>
        <p style="font-size:36px;font-weight:bold;letter-spacing:10px;background:#f5f5f5;padding:20px;border-radius:8px;color:#4e47e3;">${otp}</p>
        <p style="color:#555;">This code is valid for ${ttlMinutes} minutes.</p>
        <p style="color:#999;font-size:12px;">If you did not request this code, please ignore this email.</p>
      </div>`,
    hi: `
      <div style="font-family:Arial,sans-serif;text-align:center;padding:40px;max-width:480px;margin:0 auto;">
        <h2 style="color:#1a1a2e;">आपका सत्यापन कोड</h2>
        <p style="font-size:36px;font-weight:bold;letter-spacing:10px;background:#f5f5f5;padding:20px;border-radius:8px;color:#4e47e3;">${otp}</p>
        <p style="color:#555;">यह कोड ${ttlMinutes} मिनट के लिए मान्य है।</p>
        <p style="color:#999;font-size:12px;">यदि आपने इस कोड का अनुरोध नहीं किया है, तो कृपया इस ईमेल को अनदेखा करें।</p>
      </div>`,
    ur: `
      <div dir="rtl" style="font-family:Arial,sans-serif;text-align:center;padding:40px;max-width:480px;margin:0 auto;">
        <h2 style="color:#1a1a2e;">آپ کا تصدیقی کوڈ</h2>
        <p style="font-size:36px;font-weight:bold;letter-spacing:10px;background:#f5f5f5;padding:20px;border-radius:8px;color:#4e47e3;">${otp}</p>
        <p style="color:#555;">یہ کوڈ ${ttlMinutes} منٹ کے لیے درست ہے۔</p>
        <p style="color:#999;font-size:12px;">اگر آپ نے اس کوڈ کی درخواست نہیں کی تو براہ کرم اس ای میل کو نظر انداز کریں۔</p>
      </div>`,
  }

  return {
    subject: subjects[locale] || subjects.en,
    html: html[locale] || html.en,
  }
}

// ---------------------------------------------------------------------------
// SMTP sender
// ---------------------------------------------------------------------------

async function sendOtpEmail(
  email: string,
  otp: string,
  locale: string,
  correlationId: string
): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpFrom = process.env.SMTP_FROM || smtpUser

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn(`[otp-send] SMTP not configured cid=${correlationId}`)
    return false
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    const { subject, html } = buildOtpEmail(otp, locale)

    await transporter.sendMail({
      from: `"Diwan Suite" <${smtpFrom}>`,
      to: email,
      subject,
      html,
      headers: { 'X-Correlation-ID': correlationId },
    })

    console.info(
      `[otp-send] OTP sent email=${redactEmail(email)} cid=${correlationId}`
    )
    return true
  } catch {
    // Error intentionally not forwarded to client
    console.error(`[otp-send] SMTP failed email=${redactEmail(email)} cid=${correlationId}`)
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

  // --- IP-based rate limit (shared with lead-submit) ---
  const ip = resolveClientIp(
    req.socket?.remoteAddress,
    req.headers['x-forwarded-for'] as string | undefined
  )
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: 'rate_limit_exceeded',
      message: 'يرجى المحاولة لاحقًا.',
      retryAfter: 3600,
      correlationId,
    })
  }

  // --- Input validation ---
  const parseResult = SendOtpSchema.safeParse(req.body)
  if (!parseResult.success) {
    return res.status(400).json({ error: 'validation_error', correlationId })
  }

  const { email, locale } = parseResult.data

  // --- OTP generation and store (cooldown enforced here) ---
  const otp = generateOtp()
  const storeResult = storeOtp(email, otp)

  if (!storeResult.ok) {
    return res.status(429).json({
      error: 'cooldown',
      message: `يرجى الانتظار ${storeResult.retryAfterSeconds} ثانية قبل طلب رمز جديد.`,
      retryAfter: storeResult.retryAfterSeconds,
      correlationId,
    })
  }

  // --- Send email ---
  const sent = await sendOtpEmail(email, otp, locale, correlationId)
  // OTP variable goes out of scope here — it is never stored in plaintext
  // The `otp` const above is passed to storeOtp() which only keeps its hash

  if (!sent) {
    return res.status(500).json({
      error: 'email_send_failed',
      message: 'تعذر إرسال رمز التحقق. يرجى المحاولة مرة أخرى.',
      correlationId,
    })
  }

  recordRateHit(ip)

  return res.status(200).json({
    success: true,
    expiresInSeconds: storeResult.expiresInSeconds,
    correlationId,
  })
}
