/**
 * api/lib/otp-store.ts
 * Shared OTP storage with:
 *  - OTP hashed (HMAC-SHA256) — never stored or logged in plaintext
 *  - Configurable TTL, max attempts, resend cooldown, max resends
 *  - Per-email rate limiting for resend abuse
 *
 * NOTE: In-memory store resets on cold start. For production with high
 * availability, replace with Vercel KV / Redis (drop-in interface swap).
 * The interface is intentionally separated so that can happen without
 * changing callers.
 */

import crypto from 'crypto'

// ---------------------------------------------------------------------------
// Config from env
// ---------------------------------------------------------------------------

const OTP_TTL_MS =
  parseInt(process.env.OTP_TTL_SECONDS || '600', 10) * 1000
const MAX_ATTEMPTS =
  parseInt(process.env.OTP_MAX_ATTEMPTS || '3', 10)
const RESEND_COOLDOWN_MS =
  parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS || '60', 10) * 1000
const MAX_RESENDS =
  parseInt(process.env.OTP_MAX_RESENDS || '3', 10)

// Use a dedicated secret for OTP hashing — different from rate-limit salt
const OTP_SECRET = process.env.RATE_LIMIT_SALT
  ? process.env.RATE_LIMIT_SALT + '-otp'
  : 'diwan-otp-default-secret-change-in-production'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OtpRecord {
  /** HMAC-SHA256 of the 6-digit OTP — never the raw code */
  codeHash: string
  expiresAt: number
  attempts: number
  resendCount: number
  lastSentAt: number
}

// ---------------------------------------------------------------------------
// In-memory store
// ---------------------------------------------------------------------------

const _store = new Map<string, OtpRecord>()

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hashOtp(code: string): string {
  return crypto.createHmac('sha256', OTP_SECRET).update(code).digest('hex')
}

/** Generate a cryptographically random 6-digit OTP. */
export function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString()
}

function normalizeKey(email: string): string {
  return email.toLowerCase().trim()
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface StoreOtpResult {
  ok: true
  expiresInSeconds: number
  resendCount: number
}

export interface StoreOtpError {
  ok: false
  reason: 'cooldown'
  retryAfterSeconds: number
}

/**
 * Store a new OTP for the given email (hashed).
 * Enforces resend cooldown and max resend limit.
 */
export function storeOtp(
  email: string,
  otp: string
): StoreOtpResult | StoreOtpError {
  const key = normalizeKey(email)
  const now = Date.now()
  const existing = _store.get(key)

  // Enforce resend cooldown
  if (existing) {
    const timeSinceLast = now - existing.lastSentAt
    if (timeSinceLast < RESEND_COOLDOWN_MS) {
      const retryAfterSeconds = Math.ceil(
        (RESEND_COOLDOWN_MS - timeSinceLast) / 1000
      )
      return { ok: false, reason: 'cooldown', retryAfterSeconds }
    }
    // Enforce max resends
    if (existing.resendCount >= MAX_RESENDS) {
      // Treat as cooldown until the original OTP expires, then reset
      if (now < existing.expiresAt) {
        return {
          ok: false,
          reason: 'cooldown',
          retryAfterSeconds: Math.ceil((existing.expiresAt - now) / 1000),
        }
      }
      // Original expired — allow a fresh start
    }
  }

  const resendCount = existing && now < existing.expiresAt
    ? existing.resendCount + 1
    : 0

  _store.set(key, {
    codeHash: hashOtp(otp),
    expiresAt: now + OTP_TTL_MS,
    attempts: 0,
    resendCount,
    lastSentAt: now,
  })

  return {
    ok: true,
    expiresInSeconds: OTP_TTL_MS / 1000,
    resendCount,
  }
}

export type VerifyOtpResult =
  | { ok: true }
  | { ok: false; reason: 'not_found' }
  | { ok: false; reason: 'expired' }
  | { ok: false; reason: 'max_attempts'; attemptsUsed: number }
  | { ok: false; reason: 'invalid'; attemptsRemaining: number }

/**
 * Verify OTP for the given email.
 * Timing-safe comparison. Deletes record on success or max-attempt exhaustion.
 */
export function verifyOtp(email: string, code: string): VerifyOtpResult {
  const key = normalizeKey(email)
  const now = Date.now()
  const record = _store.get(key)

  if (!record) return { ok: false, reason: 'not_found' }

  if (now > record.expiresAt) {
    _store.delete(key)
    return { ok: false, reason: 'expired' }
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    _store.delete(key)
    return { ok: false, reason: 'max_attempts', attemptsUsed: record.attempts }
  }

  const expectedHash = record.codeHash
  const suppliedHash = hashOtp(code)

  // Timing-safe comparison
  const valid =
    expectedHash.length === suppliedHash.length &&
    crypto.timingSafeEqual(
      Buffer.from(expectedHash, 'hex'),
      Buffer.from(suppliedHash, 'hex')
    )

  if (valid) {
    _store.delete(key)
    return { ok: true }
  }

  record.attempts++
  _store.set(key, record)

  const remaining = MAX_ATTEMPTS - record.attempts
  if (remaining <= 0) {
    _store.delete(key)
    return { ok: false, reason: 'max_attempts', attemptsUsed: record.attempts }
  }

  return { ok: false, reason: 'invalid', attemptsRemaining: remaining }
}

/** Remove expired records (call periodically or at startup). */
export function cleanupExpired(): number {
  const now = Date.now()
  let removed = 0
  for (const [key, record] of _store.entries()) {
    if (now > record.expiresAt) {
      _store.delete(key)
      removed++
    }
  }
  return removed
}
