<?php
/**
 * public/api/lib/contact-security.php
 *
 * Security helper functions extracted from contact.php for isolated testing.
 * MUST only be included from a bootstrapped context:
 *
 *   defined('DIWAN_LEAD_BOOTSTRAPPED') || exit;
 *
 * Functions here have zero side-effects and depend only on their arguments
 * or on PHP built-ins. No global state, no error_log, no network calls.
 */

defined('DIWAN_LEAD_BOOTSTRAPPED') || exit;

// ---------------------------------------------------------------------------
// IP resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the real client IP safely.
 *
 * Only trusts X-Forwarded-For when REMOTE_ADDR is in the configured
 * TRUSTED_PROXY_CIDRS list. When no trusted proxies are configured the
 * header is ignored entirely to prevent rate-limit bypass.
 *
 * @param string $remoteAddr   Socket-level address ($_SERVER['REMOTE_ADDR'])
 * @param string $forwardedFor Raw X-Forwarded-For header value (may be empty)
 * @param string $trustedCidrs Comma-separated CIDR list from env
 * @return string              Resolved client IP
 */
function resolveClientIp(string $remoteAddr, string $forwardedFor, string $trustedCidrs = ''): string
{
    // Strip IPv4-mapped IPv6 prefix (::ffff:1.2.3.4 → 1.2.3.4)
    $remoteAddr = preg_replace('/^::ffff:/i', '', $remoteAddr);
    if ($remoteAddr === '' || $remoteAddr === null) {
        $remoteAddr = 'unknown';
    }

    if ($forwardedFor === '' || $trustedCidrs === '') {
        return $remoteAddr;
    }

    if (!isIpInCidrList($remoteAddr, $trustedCidrs)) {
        return $remoteAddr;
    }

    // Take leftmost (client-facing) address from the XFF chain
    $parts    = explode(',', $forwardedFor);
    $clientIp = trim($parts[0]);
    $clientIp = preg_replace('/^::ffff:/i', '', $clientIp);

    // Sanity: must look like an IP address
    if (preg_match('/^[\d.:a-fA-F]+$/', $clientIp) && strlen($clientIp) <= 45) {
        return $clientIp;
    }

    return $remoteAddr;
}

/**
 * Returns true if $ip is covered by any CIDR in the comma-separated $cidrList.
 * IPv4 only.
 */
function isIpInCidrList(string $ip, string $cidrList): bool
{
    $cidrs = array_filter(array_map('trim', explode(',', $cidrList)));
    foreach ($cidrs as $cidr) {
        if (isIpInCidr($ip, $cidr)) {
            return true;
        }
    }
    return false;
}

/** Returns true if $ip falls within $cidr (e.g. "10.0.0.0/8"). IPv4 only. */
function isIpInCidr(string $ip, string $cidr): bool
{
    if (strpos($cidr, '/') === false) {
        $cidr .= '/32';
    }
    [$network, $bits] = explode('/', $cidr, 2);
    $bits = (int)$bits;

    $networkLong = ip2long($network);
    $ipLong      = ip2long($ip);

    if ($networkLong === false || $ipLong === false) {
        return false;
    }

    if ($bits === 0) {
        return true;
    }

    $mask = -1 << (32 - $bits);
    return ($ipLong & $mask) === ($networkLong & $mask);
}

// ---------------------------------------------------------------------------
// Body size
// ---------------------------------------------------------------------------

/**
 * Returns true if $contentLength (from Content-Length header) exceeds the limit.
 * Returns false if header is absent or non-numeric.
 */
function bodyTooLarge(int $contentLength, int $maxBytes): bool
{
    if ($contentLength < 0) return false; // -1 = header absent
    return $contentLength > $maxBytes;
}

// ---------------------------------------------------------------------------
// Redaction — safe logging, no PII in error_log
// ---------------------------------------------------------------------------

/** Redact email to first-char + *** + @domain form. */
function redactEmail(string $email): string
{
    $idx = strpos($email, '@');
    if ($idx === false || $idx < 1) return '***@***';
    return substr($email, 0, 1) . '***' . substr($email, $idx);
}

/** Redact phone, keeping country-code prefix (4 chars) and last 3 digits. */
function redactPhone(string $phone): string
{
    if (strlen($phone) <= 6) return '***';
    return substr($phone, 0, 4) . '****' . substr($phone, -3);
}

// ---------------------------------------------------------------------------
// Hashing (used for rate-limit keys and idempotency fingerprint)
// ---------------------------------------------------------------------------

/**
 * HMAC-SHA256 of $value using $salt.
 * Returns first 16 hex chars (opaque, non-reversible).
 */
function hashValue(string $value, string $salt): string
{
    return substr(hash_hmac('sha256', $value, $salt), 0, 16);
}

// ---------------------------------------------------------------------------
// Idempotency fingerprint
// ---------------------------------------------------------------------------

/**
 * Build a stable, PII-free deduplication key.
 * Input is normalised before hashing so case/whitespace differences
 * in the same submission produce the same key.
 */
function buildIdempotencyKey(string $email, string $phone, string $company, string $salt): string
{
    $normalised = implode('|', [
        strtolower(trim($email)),
        preg_replace('/\s+/', '', $phone),
        strtolower(trim($company)),
    ]);
    return hashValue($normalised, $salt);
}

// ---------------------------------------------------------------------------
// CRM response parser
// ---------------------------------------------------------------------------

/**
 * Parse a CRM HTTP response strictly.
 *
 * Returns ['ok' => true, 'id' => string|null] on confirmed success,
 * ['ok' => false] otherwise.
 *
 * @param int    $httpStatus   HTTP status code returned by the CRM
 * @param string $body         Raw response body (may be empty)
 * @param string $successField CRM_SUCCESS_FIELD env value (may be empty)
 * @param string $successValue CRM_SUCCESS_VALUE env value (may be empty)
 * @param string $idField      CRM_ID_FIELD env value (may be empty)
 * @return array{ok: bool, id: string|null}
 */
function parseCrmResponse(
    int    $httpStatus,
    string $body,
    string $successField = '',
    string $successValue = '',
    string $idField      = ''
): array {
    // HTTP-level failure is always a failure
    if ($httpStatus < 200 || $httpStatus >= 300) {
        return ['ok' => false, 'id' => null];
    }

    $record = json_decode($body, true);
    if (!is_array($record) || empty($record)) {
        return ['ok' => false, 'id' => null];
    }

    // Env-configured strict path
    if ($successField !== '' && $successValue !== '') {
        $fieldVal = $record[$successField] ?? null;
        $matches  = (string)$fieldVal === $successValue
            || ($fieldVal === true  && $successValue === 'true')
            || ($fieldVal === 1     && $successValue === '1');
        $crmId = ($idField !== '' && !empty($record[$idField])) ? (string)$record[$idField] : null;
        return ['ok' => $matches, 'id' => $crmId];
    }

    // Heuristic fallback (owner should configure env vars)
    $ok = ($record['success'] ?? null) === true
        || ($record['status'] ?? null) === 'success'
        || (isset($record['id']) && $record['id'] !== '' && $record['id'] !== 0 && $record['id'] !== false);

    if (!$ok) {
        return ['ok' => false, 'id' => null];
    }

    $crmId = !empty($record['id']) ? (string)$record['id'] : null;
    return ['ok' => true, 'id' => $crmId];
}
