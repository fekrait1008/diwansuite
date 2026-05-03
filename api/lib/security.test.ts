/**
 * api/lib/security.test.ts
 * Unit tests for shared security utilities.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  resolveClientIp,
  bodyTooLarge,
  redactEmail,
  redactPhone,
  hashValue,
  parseCrmResponse,
  buildIdempotencyKey,
  getIdempotencyRecord,
  setIdempotencyRecord,
  checkRateLimit,
  recordRateHit,
  generateCorrelationId,
} from './security.js'

// ============================================================
// resolveClientIp
// ============================================================

describe('resolveClientIp', () => {
  it('returns REMOTE_ADDR when no X-Forwarded-For is present', () => {
    const ip = resolveClientIp('1.2.3.4', undefined)
    expect(ip).toBe('1.2.3.4')
  })

  it('does NOT trust X-Forwarded-For when no trusted proxies are configured', () => {
    // TRUSTED_PROXY_CIDRS is not set in test env
    const ip = resolveClientIp('1.2.3.4', '9.9.9.9, 8.8.8.8')
    expect(ip).toBe('1.2.3.4')
  })

  it('strips IPv4-mapped IPv6 prefix from REMOTE_ADDR', () => {
    const ip = resolveClientIp('::ffff:192.168.1.1', undefined)
    expect(ip).toBe('192.168.1.1')
  })

  it('returns "unknown" when remoteAddress is undefined', () => {
    const ip = resolveClientIp(undefined, undefined)
    expect(ip).toBe('unknown')
  })
})

// ============================================================
// bodyTooLarge
// ============================================================

describe('bodyTooLarge', () => {
  it('returns false when content-length header is missing', () => {
    expect(bodyTooLarge(undefined)).toBe(false)
  })

  it('returns false for sizes within 64KB limit', () => {
    expect(bodyTooLarge('1024')).toBe(false)
    expect(bodyTooLarge('65536')).toBe(false)
  })

  it('returns true for sizes exceeding 64KB', () => {
    expect(bodyTooLarge('65537')).toBe(true)
    expect(bodyTooLarge('1000000')).toBe(true)
  })

  it('returns false for non-numeric content-length', () => {
    expect(bodyTooLarge('invalid')).toBe(false)
  })
})

// ============================================================
// redactEmail
// ============================================================

describe('redactEmail', () => {
  it('redacts the local part leaving first char and domain', () => {
    const result = redactEmail('user@example.com')
    expect(result).toBe('u***@example.com')
  })

  it('handles edge case: single-char local part', () => {
    const result = redactEmail('a@b.com')
    expect(result).toBe('a***@b.com')
  })

  it('returns safe placeholder for invalid emails', () => {
    const result = redactEmail('notanemail')
    expect(result).toBe('***@***')
  })
})

// ============================================================
// redactPhone
// ============================================================

describe('redactPhone', () => {
  it('masks middle digits keeping prefix and last 3', () => {
    const result = redactPhone('+966501234567')
    expect(result).toMatch(/^\+966/)
    expect(result).toMatch(/567$/)
    expect(result).toContain('****')
  })

  it('returns placeholder for very short phones', () => {
    const result = redactPhone('123')
    expect(result).toBe('***')
  })
})

// ============================================================
// hashValue
// ============================================================

describe('hashValue', () => {
  it('returns a string of 16 hex characters', () => {
    const h = hashValue('test-input')
    expect(h).toMatch(/^[0-9a-f]{16}$/)
  })

  it('is deterministic for same input', () => {
    expect(hashValue('same')).toBe(hashValue('same'))
  })

  it('produces different hashes for different inputs', () => {
    expect(hashValue('a')).not.toBe(hashValue('b'))
  })
})

// ============================================================
// generateCorrelationId
// ============================================================

describe('generateCorrelationId', () => {
  it('returns a 20-char hex string', () => {
    const id = generateCorrelationId()
    expect(id).toMatch(/^[0-9a-f]{20}$/)
  })

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, generateCorrelationId))
    expect(ids.size).toBe(100)
  })
})

// ============================================================
// parseCrmResponse
// ============================================================

describe('parseCrmResponse', () => {
  const cid = 'test-cid-001'

  it('returns ok=false for non-2xx HTTP status', () => {
    expect(parseCrmResponse(500, { success: true }, cid)).toMatchObject({ ok: false })
    expect(parseCrmResponse(404, { success: true }, cid)).toMatchObject({ ok: false })
    expect(parseCrmResponse(0,   { success: true }, cid)).toMatchObject({ ok: false })
  })

  it('returns ok=false for null/undefined body', () => {
    expect(parseCrmResponse(200, null, cid)).toMatchObject({ ok: false })
    expect(parseCrmResponse(200, undefined, cid)).toMatchObject({ ok: false })
  })

  it('returns ok=false for empty body', () => {
    expect(parseCrmResponse(200, {}, cid)).toMatchObject({ ok: false })
  })

  it('recognises success=true shape', () => {
    expect(parseCrmResponse(200, { success: true }, cid)).toMatchObject({ ok: true })
  })

  it('recognises status="success" shape', () => {
    expect(parseCrmResponse(200, { status: 'success' }, cid)).toMatchObject({ ok: true })
  })

  it('recognises id present shape (string id)', () => {
    expect(parseCrmResponse(200, { id: 'abc123' }, cid)).toMatchObject({ ok: true })
  })

  it('recognises id present shape (numeric id)', () => {
    expect(parseCrmResponse(200, { id: 42 }, cid)).toMatchObject({ ok: true })
  })

  it('returns ok=false when id is 0 or empty', () => {
    expect(parseCrmResponse(200, { id: 0 }, cid)).toMatchObject({ ok: false })
    expect(parseCrmResponse(200, { id: '' }, cid)).toMatchObject({ ok: false })
  })

  it('returns ok=false when success=false', () => {
    expect(parseCrmResponse(200, { success: false }, cid)).toMatchObject({ ok: false })
  })

  it('returns ok=false when body has no known success field', () => {
    expect(parseCrmResponse(200, { foo: 'bar' }, cid)).toMatchObject({ ok: false })
  })
})

// ============================================================
// buildIdempotencyKey
// ============================================================

describe('buildIdempotencyKey', () => {
  it('returns a consistent 16-char hex key', () => {
    const key = buildIdempotencyKey('user@test.com', '+966501234', 'ACME Corp')
    expect(key).toMatch(/^[0-9a-f]{16}$/)
  })

  it('is case-insensitive for email', () => {
    const k1 = buildIdempotencyKey('User@Test.COM', '+966501234', 'ACME')
    const k2 = buildIdempotencyKey('user@test.com', '+966501234', 'ACME')
    expect(k1).toBe(k2)
  })

  it('trims whitespace', () => {
    const k1 = buildIdempotencyKey('  user@test.com  ', '+966501234', '  ACME  ')
    const k2 = buildIdempotencyKey('user@test.com', '+966501234', 'ACME')
    expect(k1).toBe(k2)
  })

  it('differs for different emails', () => {
    const k1 = buildIdempotencyKey('a@test.com', '+966501234', 'ACME')
    const k2 = buildIdempotencyKey('b@test.com', '+966501234', 'ACME')
    expect(k1).not.toBe(k2)
  })
})

// ============================================================
// Idempotency store
// ============================================================

describe('idempotency store', () => {
  it('returns undefined for unknown keys', () => {
    expect(getIdempotencyRecord('nonexistent-key-xyz')).toBeUndefined()
  })

  it('stores and retrieves a record', () => {
    const key = 'test-idempotency-key-001'
    setIdempotencyRecord(key, { status: 'received', createdAt: Date.now(), correlationId: 'cid-1' })
    const rec = getIdempotencyRecord(key)
    expect(rec).toBeDefined()
    expect(rec?.status).toBe('received')
  })
})

// ============================================================
// checkRateLimit / recordRateHit
// ============================================================

describe('rate limiting', () => {
  it('allows requests under the limit', () => {
    // Use a unique IP that hasn't been hit
    const testIp = '10.0.99.1'
    const result = checkRateLimit(testIp)
    expect(result.allowed).toBe(true)
  })

  it('rate.remaining decreases after a hit', () => {
    const testIp = '10.0.99.2'
    const before = checkRateLimit(testIp)
    recordRateHit(testIp)
    const after = checkRateLimit(testIp)
    expect(after.remaining).toBeLessThan(before.remaining)
  })
})
