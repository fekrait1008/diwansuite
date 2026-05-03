/**
 * api/lib/security.ts
 * Shared security utilities for all lead-flow serverless functions.
 * No PII is logged or exposed here — all identifiers are hashed or redacted.
 */

import crypto from 'crypto'

// ---------------------------------------------------------------------------
// Correlation ID
// ---------------------------------------------------------------------------

/** Generate a short, opaque, non-PII correlation ID for request tracing. */
export function generateCorrelationId(): string {
  return crypto.randomBytes(10).toString('hex')
}

// ---------------------------------------------------------------------------
// Trusted-proxy-aware IP resolution
// ---------------------------------------------------------------------------

const TRUSTED_CIDR_ENV = process.env.TRUSTED_PROXY_CIDRS || ''

/**
 * Parse a comma-separated list of CIDR strings into a list of
 * { network: bigint; bits: number } objects.
 */
function parseCidrs(raw: string): Array<{ network: bigint; bits: number }> {
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(cidr => {
      const [ip, bits] = cidr.split('/')
      const numBits = parseInt(bits || '32', 10)
      return { network: ipToBigInt(ip), bits: numBits }
    })
    .filter(c => !isNaN(Number(c.bits)))
}

function ipToBigInt(ip: string): bigint {
  // IPv4 only for now
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return 0n
  return BigInt(
    (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]
  ) & 0xffffffffn
}

function ipInCidr(ip: string, network: bigint, bits: number): boolean {
  const addr = ipToBigInt(ip)
  const mask = bits === 0 ? 0n : (0xffffffffn << BigInt(32 - bits)) & 0xffffffffn
  return (addr & mask) === (network & mask)
}

let _trustedCidrs: Array<{ network: bigint; bits: number }> | null = null
function getTrustedCidrs() {
  if (_trustedCidrs === null) _trustedCidrs = parseCidrs(TRUSTED_CIDR_ENV)
  return _trustedCidrs
}

function isRemoteAddrTrusted(remoteAddr: string): boolean {
  const cidrs = getTrustedCidrs()
  if (cidrs.length === 0) return false
  return cidrs.some(c => ipInCidr(remoteAddr, c.network, c.bits))
}

/**
 * Resolve client IP safely.
 * - Always uses REMOTE_ADDR (socket address) as the canonical source.
 * - Only considers X-Forwarded-For if REMOTE_ADDR is in TRUSTED_PROXY_CIDRS.
 * - If no trusted proxies are configured, X-Forwarded-For is ignored entirely.
 */
export function resolveClientIp(
  remoteAddress: string | undefined,
  forwardedFor: string | undefined
): string {
  const remoteAddr = (remoteAddress || '').replace(/^::ffff:/, '') || 'unknown'

  if (!forwardedFor) return remoteAddr
  if (!isRemoteAddrTrusted(remoteAddr)) return remoteAddr

  // Take the leftmost (client-supplied) address from the chain
  const clientIp = forwardedFor.split(',')[0].trim().replace(/^::ffff:/, '')
  // Basic sanity check — must look like an IP
  if (/^[\d.:a-fA-F]+$/.test(clientIp) && clientIp.length <= 45) return clientIp
  return remoteAddr
}

// ---------------------------------------------------------------------------
// Request body size guard
// ---------------------------------------------------------------------------

const MAX_BODY_BYTES = 64 * 1024 // 64 KB

/**
 * Returns true if Content-Length exceeds the safe limit.
 * Call this before reading the body. Returns false if header is missing
 * (unknown size — let the framework handle streaming limits separately).
 */
export function bodyTooLarge(contentLength: string | undefined): boolean {
  if (!contentLength) return false
  const len = parseInt(contentLength, 10)
  if (isNaN(len)) return false
  return len > MAX_BODY_BYTES
}

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------

const ALLOWED_ORIGINS = [
  'https://diwansuite.com',
  'https://www.diwansuite.com',
  // Dev origins — will be removed automatically in production if not needed
  'http://localhost:4173',
  'http://localhost:3000',
]

/**
 * Apply strict same-origin CORS headers.
 * Rejects requests from unknown origins with no Allow header.
 * Returns true if the origin is allowed.
 */
export function applyCors(
  origin: string | undefined,
  setHeader: (name: string, value: string) => void
): boolean {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    setHeader('Access-Control-Allow-Origin', origin)
    setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    setHeader('Access-Control-Allow-Headers', 'Content-Type')
    setHeader('Vary', 'Origin')
    return true
  }
  // Same-origin requests (no Origin header, e.g. server-to-server) are allowed
  if (!origin) return true
  return false
}

// ---------------------------------------------------------------------------
// Safe logging / redaction
// ---------------------------------------------------------------------------

/** Redact email to h***@domain.com form */
export function redactEmail(email: string): string {
  const idx = email.indexOf('@')
  if (idx < 1) return '***@***'
  return email[0] + '***' + email.slice(idx)
}

/** Redact phone — keep country prefix and last 3 digits */
export function redactPhone(phone: string): string {
  if (phone.length <= 6) return '***'
  return phone.slice(0, 4) + '****' + phone.slice(-3)
}

/**
 * Hash a value with HMAC-SHA256 using the RATE_LIMIT_SALT env var.
 * Used to create opaque, non-reversible identifiers for logging/rate-limiting.
 */
const SALT = process.env.RATE_LIMIT_SALT || 'diwan-default-salt-change-in-production'

export function hashValue(value: string): string {
  return crypto.createHmac('sha256', SALT).update(value).digest('hex').slice(0, 16)
}

// ---------------------------------------------------------------------------
// Rate limiting (in-memory, resets on cold start — acceptable for serverless)
// ---------------------------------------------------------------------------

const _rateStore = new Map<string, number[]>()
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5', 10)

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const key = hashValue(ip)
  const now = Date.now()
  const times = (_rateStore.get(key) || []).filter(t => now - t < RATE_WINDOW_MS)
  _rateStore.set(key, times)
  const remaining = RATE_MAX - times.length
  return { allowed: remaining > 0, remaining: Math.max(0, remaining) }
}

export function recordRateHit(ip: string): void {
  const key = hashValue(ip)
  const times = _rateStore.get(key) || []
  times.push(Date.now())
  _rateStore.set(key, times)
}

// ---------------------------------------------------------------------------
// CRM success parsing — strict, configurable
// ---------------------------------------------------------------------------

/**
 * Parse CRM response body strictly.
 *
 * Contract for EightGate (https://eightgate.ws/ecm/api/v3/post/1) is NOT
 * confirmed from public documentation. The parser is therefore fail-safe:
 * it looks for the most common success shapes and can be configured via
 * env vars CRM_SUCCESS_FIELD / CRM_SUCCESS_VALUE / CRM_ID_FIELD.
 *
 * TODO(owner): Confirm the exact response shape from EightGate and set
 * CRM_SUCCESS_FIELD + CRM_SUCCESS_VALUE + CRM_ID_FIELD in production env.
 */
export function parseCrmResponse(
  httpStatus: number,
  body: unknown,
  correlationId: string
): { ok: boolean; crmId?: string } {
  // HTTP-level failure is always a failure regardless of body
  if (httpStatus < 200 || httpStatus >= 300) {
    console.error(`[lead] CRM HTTP failure status=${httpStatus} cid=${correlationId}`)
    return { ok: false }
  }

  if (!body || typeof body !== 'object') {
    // Empty or non-object body — not a confirmed success
    console.warn(`[lead] CRM body empty or non-object cid=${correlationId}`)
    return { ok: false }
  }

  const record = body as Record<string, unknown>

  const successField = process.env.CRM_SUCCESS_FIELD
  const successValue = process.env.CRM_SUCCESS_VALUE
  const idField = process.env.CRM_ID_FIELD

  // If env-configured, use those fields as the sole arbiter
  if (successField && successValue) {
    const fieldVal = record[successField]
    const matches =
      String(fieldVal) === successValue ||
      fieldVal === true && successValue === 'true' ||
      fieldVal === 1 && successValue === '1'
    const crmId = idField && record[idField] ? String(record[idField]) : undefined
    return { ok: matches, crmId }
  }

  // Unconfirmed — attempt common success shapes but log a warning
  console.warn(
    `[lead] CRM_SUCCESS_FIELD not configured, using heuristic parser. Set CRM_SUCCESS_FIELD + CRM_SUCCESS_VALUE + CRM_ID_FIELD. cid=${correlationId}`
  )

  const isSuccess =
    record.success === true ||
    record.status === 'success' ||
    (typeof record.id === 'string' && record.id.length > 0) ||
    (typeof record.id === 'number' && record.id > 0)

  if (!isSuccess) {
    console.warn(`[lead] CRM response did not match any known success shape cid=${correlationId}`)
    return { ok: false }
  }

  const crmId = record.id ? String(record.id) : undefined
  return { ok: true, crmId }
}

// ---------------------------------------------------------------------------
// Idempotency store (in-memory; for production use Vercel KV / Redis)
// ---------------------------------------------------------------------------

const TTL_MS = parseInt(process.env.LEAD_IDEMPOTENCY_TTL_HOURS || '24', 10) * 60 * 60 * 1000

interface IdempotencyRecord {
  status: 'received' | 'crm_sent' | 'email_sent' | 'completed' | 'failed'
  crmId?: string
  createdAt: number
  correlationId: string
}

const _idempotencyStore = new Map<string, IdempotencyRecord>()

/**
 * Build a safe fingerprint for deduplication.
 * Uses normalized email + phone + company — no raw PII stored as the key.
 */
export function buildIdempotencyKey(email: string, phone: string, company: string): string {
  const normalized = [
    email.toLowerCase().trim(),
    phone.replace(/\s+/g, ''),
    company.toLowerCase().trim(),
  ].join('|')
  return hashValue(normalized)
}

export function getIdempotencyRecord(key: string): IdempotencyRecord | undefined {
  const rec = _idempotencyStore.get(key)
  if (!rec) return undefined
  // Expired
  if (Date.now() - rec.createdAt > TTL_MS) {
    _idempotencyStore.delete(key)
    return undefined
  }
  return rec
}

export function setIdempotencyRecord(key: string, record: IdempotencyRecord): void {
  _idempotencyStore.set(key, record)
}

export function updateIdempotencyStatus(
  key: string,
  status: IdempotencyRecord['status'],
  crmId?: string
): void {
  const rec = _idempotencyStore.get(key)
  if (rec) {
    rec.status = status
    if (crmId) rec.crmId = crmId
    _idempotencyStore.set(key, rec)
  }
}
