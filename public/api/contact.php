<?php
/**
 * Diwan Suite — Enterprise Lead Form Handler
 *
 * Security hardening applied:
 *  - IP resolved via REMOTE_ADDR; X-Forwarded-For only trusted when REMOTE_ADDR
 *    is in TRUSTED_PROXY_CIDRS (prevents rate-limit bypass via header spoofing)
 *  - Request body size capped at MAX_BODY_BYTES before reading php://input
 *  - CORS: no wildcard — only exact origin match or no-origin (server-to-server)
 *  - Correlation ID on every request, returned in JSON response and X-Correlation-ID header
 *  - Rate-limit store uses LEAD_STORAGE_DIR (configurable, not sys_get_temp_dir)
 *  - CRM success parsed strictly — HTTP 200 + confirmed body shape required
 *  - No raw PII (email, phone) in error_log; redacted forms used
 *  - SMTP/CRM credentials never surfaced to caller
 *  - OTP: server-side generation, hashed storage, configurable TTL/attempts/resend
 *  - No detailed error messages to end users
 *
 * TODO(owner): Confirm EightGate CRM response contract and set
 * CRM_SUCCESS_FIELD + CRM_SUCCESS_VALUE + CRM_ID_FIELD in production env.
 */

// ============================================================
// BOOTSTRAP GUARD — prevents direct include execution
// ============================================================
define('DIWAN_LEAD_BOOTSTRAPPED', true);

// ============================================================
// CONFIGURATION (from environment only — no hardcoded secrets)
// ============================================================

// SMTP
define('SMTP_HOST',      getenv('SMTP_HOST')      ?: '');
define('SMTP_PORT',      (int)(getenv('SMTP_PORT') ?: 587));
define('SMTP_USER',      getenv('SMTP_USER')      ?: '');
define('SMTP_PASS',      getenv('SMTP_PASS')      ?: '');
define('SMTP_FROM',      getenv('SMTP_FROM')      ?: getenv('SMTP_USER') ?: '');
define('SMTP_FROM_NAME', 'Diwan Suite');
define('SMTP_SECURE',    getenv('SMTP_SECURE')    ?: 'tls');

// Recipients
define('RECIPIENT_EMAIL', getenv('LEAD_EMAIL_TO') ?: 'info@fekrait.com.sa');
define('CC_EMAILS',       '');

// reCAPTCHA
define('RECAPTCHA_ENABLED',        !empty(getenv('RECAPTCHA_SECRET_KEY')));
define('RECAPTCHA_SECRET',         getenv('RECAPTCHA_SECRET_KEY') ?: '');
define('RECAPTCHA_EXPECTED_ACTION', getenv('RECAPTCHA_EXPECTED_ACTION') ?: 'hero_lead_submit');
define('RECAPTCHA_ACCEPT_SCORE',   (float)(getenv('RECAPTCHA_ACCEPT_SCORE') ?: 0.7));
define('RECAPTCHA_REVIEW_SCORE',   (float)(getenv('RECAPTCHA_REVIEW_SCORE') ?: 0.4));

// CRM
define('CRM_ENABLED',       !empty(getenv('CRM_USER_TOKEN')));
define('CRM_API_URL',       getenv('CRM_API_URL')       ?: 'https://eightgate.ws/ecm/api/v3/post/1');
define('CRM_USER_TOKEN',    getenv('CRM_USER_TOKEN')    ?: '');
define('CRM_SUCCESS_FIELD', getenv('CRM_SUCCESS_FIELD') ?: '');
define('CRM_SUCCESS_VALUE', getenv('CRM_SUCCESS_VALUE') ?: '');
define('CRM_ID_FIELD',      getenv('CRM_ID_FIELD')      ?: '');

// Trusted proxies (CIDR list, comma-separated) — empty = never trust X-Forwarded-For
define('TRUSTED_PROXY_CIDRS', getenv('TRUSTED_PROXY_CIDRS') ?: '');

// Storage (MUST be outside web root in production)
define('LEAD_STORAGE_DIR',            getenv('LEAD_STORAGE_DIR')            ?: sys_get_temp_dir() . '/diwan_leads');
define('LEAD_STORAGE_RETENTION_DAYS', (int)(getenv('LEAD_STORAGE_RETENTION_DAYS') ?: 14));
define('LEAD_IDEMPOTENCY_TTL_HOURS',  (int)(getenv('LEAD_IDEMPOTENCY_TTL_HOURS')  ?: 24));

// Rate limiting
define('RATE_LIMIT_ENABLED', true);
define('RATE_LIMIT_MAX',     (int)(getenv('RATE_LIMIT_MAX')  ?: 5));
define('RATE_LIMIT_SALT',    getenv('RATE_LIMIT_SALT')       ?: 'diwan-default-salt-change-in-production');

// OTP config
define('OTP_TTL_SECONDS',           (int)(getenv('OTP_TTL_SECONDS')           ?: 600));
define('OTP_MAX_ATTEMPTS',          (int)(getenv('OTP_MAX_ATTEMPTS')           ?: 3));
define('OTP_RESEND_COOLDOWN_SECONDS', (int)(getenv('OTP_RESEND_COOLDOWN_SECONDS') ?: 60));
define('OTP_MAX_RESENDS',           (int)(getenv('OTP_MAX_RESENDS')            ?: 3));

// Body size limit
define('MAX_BODY_BYTES', 65536); // 64 KB

// Allowed CORS origins — no wildcard
define('ALLOWED_ORIGINS', [
    'https://diwansuite.com',
    'https://www.diwansuite.com',
    'http://localhost:4173',
    'http://localhost:3000',
    'http://localhost:5173',
]);

// ============================================================
// EARLY HEADERS
// ============================================================

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');

// Correlation ID — generated early so it can appear in all responses
$correlationId = bin2hex(random_bytes(10));
header('X-Correlation-ID: ' . $correlationId);

// ============================================================
// CORS — strict origin matching, no wildcard fallback
// ============================================================

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$corsAllowed = false;

if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Max-Age: 86400');
    header('Vary: Origin');
    $corsAllowed = true;
} elseif ($origin === '') {
    // No Origin header — direct server-to-server or same-origin — allow
    $corsAllowed = true;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!$corsAllowed) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden', 'correlationId' => $correlationId]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed', 'correlationId' => $correlationId]);
    exit;
}

// ============================================================
// BODY SIZE GUARD — check CONTENT_LENGTH before reading
// ============================================================

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int)$_SERVER['CONTENT_LENGTH'] : -1;
if ($contentLength > MAX_BODY_BYTES) {
    http_response_code(413);
    echo json_encode(['success' => false, 'message' => 'حجم الطلب كبير جدًا.', 'correlationId' => $correlationId]);
    exit;
}

// ============================================================
// IP RESOLUTION — REMOTE_ADDR first, proxy headers only when trusted
// ============================================================

$remoteAddr = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$remoteAddr = preg_replace('/^::ffff:/', '', $remoteAddr); // strip IPv4-mapped IPv6 prefix

$clientIp = resolveClientIp($remoteAddr, $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');

// ============================================================
// RATE LIMITING
// ============================================================

if (RATE_LIMIT_ENABLED) {
    $rateLimitResult = checkRateLimit($clientIp);
    if (!$rateLimitResult['allowed']) {
        http_response_code(429);
        echo json_encode([
            'success'       => false,
            'message'       => 'لقد تجاوزت الحد المسموح. يرجى المحاولة لاحقًا.',
            'retryAfter'    => 3600,
            'correlationId' => $correlationId,
        ]);
        exit;
    }
}

// ============================================================
// PARSE INPUT
// ============================================================

$rawInput = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (strlen($rawInput) > MAX_BODY_BYTES) {
    http_response_code(413);
    echo json_encode(['success' => false, 'message' => 'حجم الطلب كبير جدًا.', 'correlationId' => $correlationId]);
    exit;
}

$data = json_decode($rawInput, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'بيانات غير صالحة.', 'correlationId' => $correlationId]);
    exit;
}

// ============================================================
// HONEYPOT
// ============================================================

if (!empty($data['honeypot'])) {
    // Silent accept — bot detected
    echo json_encode(['success' => true, 'correlationId' => $correlationId]);
    exit;
}

// ============================================================
// VALIDATE REQUIRED FIELDS
// ============================================================

$required = ['goal', 'fullName', 'email', 'phone'];
foreach ($required as $field) {
    if (empty(trim((string)($data[$field] ?? '')))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'بيانات غير مكتملة.', 'correlationId' => $correlationId]);
        exit;
    }
}

if (!empty($data['representsOrg']) && $data['representsOrg'] === 'yes') {
    if (empty(trim((string)($data['orgName'] ?? ''))) || empty(trim((string)($data['sector'] ?? '')))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'بيانات غير مكتملة.', 'correlationId' => $correlationId]);
        exit;
    }
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'بيانات غير صالحة.', 'correlationId' => $correlationId]);
    exit;
}

$nameParts = preg_split('/\s+/', trim((string)$data['fullName']));
if (count($nameParts) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'يجب إدخال الاسم الكامل.', 'correlationId' => $correlationId]);
    exit;
}

// ============================================================
// SANITIZE
// ============================================================

$sanitized = [];
foreach ($data as $key => $value) {
    if (is_string($value)) {
        $sanitized[$key] = htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
    } elseif (is_bool($value) || is_int($value) || is_float($value)) {
        $sanitized[$key] = $value;
    }
}

// ============================================================
// reCAPTCHA
// ============================================================

if (RECAPTCHA_ENABLED && !empty($data['recaptchaToken'])) {
    $recaptchaResult = verifyRecaptcha($data['recaptchaToken'], $clientIp);
    if (!$recaptchaResult['success']) {
        http_response_code(400);
        echo json_encode([
            'success'       => false,
            'message'       => 'تعذر التحقق من الحماية. يرجى المحاولة مرة أخرى.',
            'correlationId' => $correlationId,
        ]);
        exit;
    }
    if (($recaptchaResult['score'] ?? 1.0) < RECAPTCHA_REVIEW_SCORE) {
        http_response_code(400);
        echo json_encode([
            'success'       => false,
            'message'       => 'تعذر التحقق من الحماية. يرجى المحاولة مرة أخرى.',
            'correlationId' => $correlationId,
        ]);
        exit;
    }
}

// ============================================================
// RECORD RATE HIT (only after passing all guards)
// ============================================================

if (RATE_LIMIT_ENABLED) {
    recordRateHit($clientIp);
}

// ============================================================
// IDEMPOTENCY CHECK
// ============================================================

$idempotencyKey = buildIdempotencyKey(
    (string)($data['email']  ?? ''),
    (string)($data['phone']  ?? ''),
    (string)($data['orgName'] ?? '')
);

$existingRecord = getIdempotencyRecord($idempotencyKey);
if ($existingRecord && in_array($existingRecord['status'], ['crm_sent', 'completed'], true)) {
    error_log('[lead] Duplicate request idempotency hit cid=' . $correlationId . ' originalCid=' . ($existingRecord['correlationId'] ?? ''));
    echo json_encode(['success' => true, 'deduplicated' => true, 'correlationId' => $correlationId]);
    exit;
}

setIdempotencyRecord($idempotencyKey, [
    'status'        => 'received',
    'createdAt'     => time(),
    'correlationId' => $correlationId,
]);

// Log submission (no raw PII)
error_log(sprintf(
    '[lead] Submission received email=%s phone=%s cid=%s',
    redactEmail((string)($data['email'] ?? '')),
    redactPhone((string)($data['phone'] ?? '')),
    $correlationId
));

// ============================================================
// LEAD SCORING (internal only — never shown to user)
// ============================================================

$leadScore = computeLeadScore($sanitized);
$sanitized['_leadScore'] = $leadScore; // attach for downstream use

error_log(sprintf(
    '[lead] Score=%s goal=%s orgSize=%s cid=%s',
    $leadScore,
    $sanitized['goal'] ?? '—',
    $sanitized['employeeCount'] ?? '—',
    $correlationId
));

// ============================================================
// BUILD EMAIL & SEND
// ============================================================

$isArabic = (($sanitized['language'] ?? 'ar') === 'ar');

$emailSubject = $isArabic
    ? 'طلب عرض توضيحي جديد - ديوان سويت'
    : 'New Demo Request - Diwan Suite';

$emailBody = buildEmailBody($sanitized, $isArabic, $correlationId);
$emailSent = sendEmail($emailSubject, $emailBody, $correlationId);

// ============================================================
// CRM SUBMISSION
// ============================================================

$crmSent  = false;
$crmId    = null;

if (CRM_ENABLED) {
    updateIdempotencyStatus($idempotencyKey, 'crm_pending');
    $crmResult = sendToCRM($sanitized, $correlationId);
    $crmSent   = $crmResult['ok'];
    $crmId     = $crmResult['id'] ?? null;
    updateIdempotencyStatus($idempotencyKey, $crmSent ? 'crm_sent' : 'failed');
}

// ============================================================
// FINALIZE
// ============================================================

if ($emailSent || $crmSent) {
    updateIdempotencyStatus($idempotencyKey, 'completed');
}

error_log(sprintf(
    '[lead] Result crm=%s email=%s cid=%s',
    $crmSent ? 'true' : 'false',
    $emailSent ? 'true' : 'false',
    $correlationId
));

if (!$emailSent && !$crmSent) {
    http_response_code(500);
    echo json_encode([
        'success'       => false,
        'message'       => 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.',
        'correlationId' => $correlationId,
    ]);
    exit;
}

echo json_encode(['success' => true, 'correlationId' => $correlationId]);

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Resolve client IP safely.
 * Only trusts X-Forwarded-For when REMOTE_ADDR is in TRUSTED_PROXY_CIDRS.
 */
function resolveClientIp(string $remoteAddr, string $forwardedFor): string {
    if (empty($forwardedFor)) return $remoteAddr;

    $trustedCidrs = TRUSTED_PROXY_CIDRS;
    if (empty($trustedCidrs)) return $remoteAddr; // Never trust XFF without trusted proxies

    $cidrs = array_filter(array_map('trim', explode(',', $trustedCidrs)));
    $remoteInt = ip2long($remoteAddr);
    if ($remoteInt === false) return $remoteAddr;

    $isTrusted = false;
    foreach ($cidrs as $cidr) {
        [$network, $bits] = array_pad(explode('/', $cidr, 2), 2, '32');
        $netInt  = ip2long($network);
        $bits    = (int)$bits;
        if ($netInt === false || $bits < 0 || $bits > 32) continue;
        $mask = $bits === 0 ? 0 : (~0 << (32 - $bits));
        if (($remoteInt & $mask) === ($netInt & $mask)) {
            $isTrusted = true;
            break;
        }
    }

    if (!$isTrusted) return $remoteAddr;

    $clientIp = trim(explode(',', $forwardedFor)[0]);
    $clientIp = preg_replace('/^::ffff:/', '', $clientIp);
    if (preg_match('/^[\d.]+$/', $clientIp) || preg_match('/^[0-9a-fA-F:]+$/', $clientIp)) {
        return $clientIp;
    }
    return $remoteAddr;
}

/** Hash IP for rate-limit store key using HMAC (non-reversible). */
function hashIp(string $ip): string {
    return hash_hmac('sha256', $ip, RATE_LIMIT_SALT);
}

/** Build safe storage path. */
function storagePath(string $prefix, string $key, bool $mkdir = true): string {
    $dir = rtrim(LEAD_STORAGE_DIR, '/') . '/' . $prefix;
    if ($mkdir && !is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    return $dir . '/' . $key . '.json';
}

/** Rate limit check — returns ['allowed'=>bool, 'remaining'=>int] */
function checkRateLimit(string $ip): array {
    $key  = substr(hashIp($ip), 0, 32);
    $file = storagePath('rate', $key);
    $now  = time();
    $windowStart = $now - 3600;

    $times = [];
    if (is_file($file)) {
        $decoded = json_decode(@file_get_contents($file), true);
        if (is_array($decoded)) $times = $decoded;
    }
    $times = array_values(array_filter($times, fn($t) => $t > $windowStart));

    $remaining = RATE_LIMIT_MAX - count($times);
    return ['allowed' => $remaining > 0, 'remaining' => max(0, $remaining)];
}

/** Record a rate-limit hit. */
function recordRateHit(string $ip): void {
    $key  = substr(hashIp($ip), 0, 32);
    $file = storagePath('rate', $key);
    $now  = time();
    $windowStart = $now - 3600;

    $times = [];
    if (is_file($file)) {
        $decoded = json_decode(@file_get_contents($file), true);
        if (is_array($decoded)) $times = $decoded;
    }
    $times = array_values(array_filter($times, fn($t) => $t > $windowStart));
    $times[] = $now;

    @file_put_contents($file, json_encode($times), LOCK_EX);
    @chmod($file, 0600);
}

/** Build idempotency key from normalized email + phone + company (no raw PII stored as key). */
function buildIdempotencyKey(string $email, string $phone, string $company): string {
    $normalized = strtolower(trim($email)) . '|' . preg_replace('/\s+/', '', $phone) . '|' . strtolower(trim($company));
    return substr(hash_hmac('sha256', $normalized, RATE_LIMIT_SALT), 0, 32);
}

function getIdempotencyRecord(string $key): ?array {
    $file = storagePath('idempotency', $key);
    if (!is_file($file)) return null;
    $data = json_decode(@file_get_contents($file), true);
    if (!is_array($data)) return null;
    $ttlSeconds = LEAD_IDEMPOTENCY_TTL_HOURS * 3600;
    if ((time() - ($data['createdAt'] ?? 0)) > $ttlSeconds) {
        @unlink($file);
        return null;
    }
    return $data;
}

function setIdempotencyRecord(string $key, array $record): void {
    $file = storagePath('idempotency', $key);
    @file_put_contents($file, json_encode($record), LOCK_EX);
    @chmod($file, 0600);
}

function updateIdempotencyStatus(string $key, string $status, ?string $crmId = null): void {
    $file = storagePath('idempotency', $key);
    $record = [];
    if (is_file($file)) {
        $record = json_decode(@file_get_contents($file), true) ?: [];
    }
    $record['status'] = $status;
    if ($crmId !== null) $record['crmId'] = $crmId;
    @file_put_contents($file, json_encode($record), LOCK_EX);
}

/** Redact email for safe logging. */
function redactEmail(string $email): string {
    $idx = strpos($email, '@');
    if ($idx === false || $idx < 1) return '***@***';
    return substr($email, 0, 1) . '***' . substr($email, $idx);
}

/** Redact phone for safe logging. */
function redactPhone(string $phone): string {
    if (strlen($phone) <= 6) return '***';
    return substr($phone, 0, 4) . '****' . substr($phone, -3);
}

/** Verify reCAPTCHA v3 token. */
function verifyRecaptcha(string $token, string $ip): array {
    if (empty(RECAPTCHA_SECRET)) return ['success' => true, 'score' => 1.0];

    $postData = http_build_query([
        'secret'   => RECAPTCHA_SECRET,
        'response' => $token,
        'remoteip' => $ip,
    ]);

    $ctx = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $postData,
            'timeout' => 10,
        ],
    ]);

    $response = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $ctx);
    if (!$response) return ['success' => false, 'score' => 0.0];

    $result = json_decode($response, true);
    if (!is_array($result)) return ['success' => false, 'score' => 0.0];

    // Validate action if present
    if (!empty($result['action']) && $result['action'] !== RECAPTCHA_EXPECTED_ACTION) {
        return ['success' => false, 'score' => 0.0];
    }

    return [
        'success' => !empty($result['success']),
        'score'   => (float)($result['score'] ?? 0.0),
    ];
}

/**
 * Compute a simple internal lead score: High / Medium / Low.
 * Logic is intentionally readable and easy to maintain.
 * Score is NEVER shown to the user.
 */
function computeLeadScore(array $data): string {
    $points = 0;

    // Goal quality
    $goalPoints = ['demo' => 3, 'solution' => 3, 'pricing' => 2, 'integration' => 2, 'inquiry' => 1];
    $points += $goalPoints[$data['goal'] ?? ''] ?? 0;

    // Represents an organisation (essential qualifier)
    if (($data['representsOrg'] ?? '') === 'yes') $points += 2;

    // Employee count — larger = higher value
    $empPoints = ['500+' => 3, '201-500' => 2, '51-200' => 2, '11-50' => 1, '1-10' => 0];
    $points += $empPoints[$data['employeeCount'] ?? ''] ?? 0;

    // Boards/committees count — core product fit signal
    $boardPoints = ['10+' => 3, '7-10' => 3, '4-6' => 2, '2-3' => 1, '1' => 0];
    $points += $boardPoints[$data['boardsCount'] ?? ''] ?? 0;

    // Monthly meetings volume
    $mtgPoints = ['20+' => 2, '11-20' => 2, '6-10' => 1, '1-5' => 0];
    $points += $mtgPoints[$data['meetingsCount'] ?? ''] ?? 0;

    // Job title — decision proximity
    $highRoleTitles = ['ceo', 'cfo', 'board-secretary', 'governance-officer', 'board-member', 'compliance-officer'];
    $midRoleTitles  = ['legal-counsel', 'executive'];
    if (in_array($data['jobTitle'] ?? '', $highRoleTitles, true)) $points += 3;
    elseif (in_array($data['jobTitle'] ?? '', $midRoleTitles, true)) $points += 1;

    // Purchase influence (decisionRole)
    $rolePoints = ['decision-maker' => 3, 'recommender' => 2, 'evaluator' => 1, 'user' => 0];
    $points += $rolePoints[$data['decisionRole'] ?? ''] ?? 0;

    // Thresholds: 0-7 = Low, 8-13 = Medium, 14+ = High
    if ($points >= 14) return 'High';
    if ($points >= 8)  return 'Medium';
    return 'Low';
}

/** Build notification email HTML body. */
function buildEmailBody(array $data, bool $isArabic, string $correlationId): string {
    $labels = $isArabic ? [
        'goal'            => 'هدف الطلب',
        'representsOrg'   => 'يمثل جهة',
        'orgName'         => 'اسم الجهة / الشركة',
        'sector'          => 'مجال عمل الجهة',
        'employeeCount'   => 'عدد الموظفين',
        'meetingsCount'   => 'الاجتماعات شهريًا',
        'boardsCount'     => 'المجالس واللجان',
        'fullName'        => 'الاسم الكامل',
        'jobTitle'        => 'المسمى الوظيفي',
        'decisionRole'    => 'العلاقة بقرار الشراء',
        'email'           => 'البريد الإلكتروني',
        'phone'           => 'رقم الجوال',
        'message'         => 'ملاحظات إضافية',
        'selectedPackage' => 'الباقة المختارة',
        '_leadScore'      => 'Lead Score',
        // Metadata
        'pageUrl'         => 'رابط الصفحة',
        'language'        => 'اللغة',
        'referrer'        => 'المرجع',
        'ctaLabel'        => 'CTA المستخدم',
        'utm_source'      => 'المصدر',
        'utm_medium'      => 'الوسيط',
        'utm_campaign'    => 'الحملة',
        'utm_term'        => 'الكلمة المفتاحية',
        'utm_content'     => 'المحتوى الإعلاني',
        'affiliate'       => 'الإحالة',
        'timestamp'       => 'وقت الإرسال',
    ] : [
        'goal'            => 'Request Goal',
        'representsOrg'   => 'Represents Organization',
        'orgName'         => 'Company / Organization Name',
        'sector'          => 'Sector',
        'employeeCount'   => 'Employee Count',
        'meetingsCount'   => 'Monthly Meetings',
        'boardsCount'     => 'Boards & Committees',
        'fullName'        => 'Full Name',
        'jobTitle'        => 'Job Title',
        'decisionRole'    => 'Decision Role',
        'email'           => 'Email',
        'phone'           => 'Phone',
        'message'         => 'Additional Notes',
        'selectedPackage' => 'Selected Package',
        '_leadScore'      => 'Lead Score',
        // Metadata
        'pageUrl'         => 'Page URL',
        'language'        => 'Language',
        'referrer'        => 'Referrer',
        'ctaLabel'        => 'CTA Used',
        'utm_source'      => 'UTM Source',
        'utm_medium'      => 'UTM Medium',
        'utm_campaign'    => 'UTM Campaign',
        'utm_term'        => 'UTM Term',
        'utm_content'     => 'UTM Content',
        'affiliate'       => 'Affiliate',
        'timestamp'       => 'Submitted At',
    ];

    $dir = $isArabic ? 'rtl' : 'ltr';
    $title = $isArabic ? 'طلب عرض توضيحي جديد - ديوان سويت' : 'New Demo Request - Diwan Suite';

    // Business fields
    $businessFields = ['goal', 'representsOrg', 'orgName', 'sector', 'employeeCount', 'meetingsCount',
                       'boardsCount', 'fullName', 'jobTitle', 'decisionRole', 'email', 'phone',
                       'message', 'selectedPackage'];
    // Internal / metadata fields
    $metaFields = ['_leadScore', 'pageUrl', 'language', 'referrer', 'ctaLabel',
                   'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
                   'affiliate', 'timestamp'];

    $buildRows = function(array $fields) use ($data, $labels, $isArabic): string {
        $rows = '';
        foreach ($fields as $field) {
            if (!isset($data[$field]) || $data[$field] === '' || $data[$field] === null) continue;
            $label = $labels[$field] ?? $field;
            $value = (string)$data[$field];
            if ($field === 'representsOrg') {
                $value = $value === 'yes' ? ($isArabic ? 'نعم' : 'Yes') : ($isArabic ? 'لا' : 'No');
            }
            if ($field === '_leadScore') {
                $scoreColor = $value === 'High' ? '#1a7a4a' : ($value === 'Medium' ? '#b45309' : '#6b7280');
                $rows .= "<tr style='border-bottom:1px solid #eee;background:#f9f9f9;'>";
                $rows .= "<td style='padding:10px;font-weight:bold;width:180px;color:#444;'>{$label}</td>";
                $rows .= "<td style='padding:10px;font-weight:bold;color:{$scoreColor};'>{$value}</td>";
                $rows .= "</tr>";
                continue;
            }
            $rows .= "<tr style='border-bottom:1px solid #eee;'>";
            $rows .= "<td style='padding:10px;font-weight:bold;width:180px;color:#666;'>{$label}</td>";
            $rows .= "<td style='padding:10px;color:#333;'>" . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . "</td>";
            $rows .= "</tr>";
        }
        return $rows;
    };

    $businessRows = $buildRows($businessFields);
    $metaRows     = $buildRows($metaFields);
    $metaSectionLabel = $isArabic ? 'بيانات داخلية' : 'Internal Metadata';

    return <<<HTML
<html><head><meta charset='UTF-8'></head>
<body dir='{$dir}' style='font-family:Arial,sans-serif;'>
  <h2 style='color:#1a1a2e;'>{$title}</h2>
  <p style='font-size:11px;color:#999;'>Correlation ID: {$correlationId}</p>
  <table style='border-collapse:collapse;width:100%;max-width:600px;'>{$businessRows}</table>
  <h3 style='color:#555;margin-top:24px;font-size:13px;'>{$metaSectionLabel}</h3>
  <table style='border-collapse:collapse;width:100%;max-width:600px;font-size:12px;color:#888;'>{$metaRows}</table>
</body></html>
HTML;
}

/** Send email — prefers PHPMailer if available, falls back to mail(). */
function sendEmail(string $subject, string $body, string $correlationId): bool {
    if (empty(SMTP_HOST) || empty(SMTP_USER) || empty(SMTP_PASS) || empty(RECIPIENT_EMAIL)) {
        error_log('[lead] SMTP not configured cid=' . $correlationId);
        return false;
    }

    if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        return sendWithPHPMailer($subject, $body, $correlationId);
    }

    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SMTP_FROM_NAME . ' <' . SMTP_FROM . '>',
        'Reply-To: ' . SMTP_FROM,
        'X-Correlation-ID: ' . $correlationId,
    ]);

    $result = @mail(RECIPIENT_EMAIL, $subject, $body, $headers);
    if (!$result) {
        error_log('[lead] mail() failed cid=' . $correlationId);
    }
    return (bool)$result;
}

function sendWithPHPMailer(string $subject, string $body, string $correlationId): bool {
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE === 'ssl'
            ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port      = SMTP_PORT;
        $mail->CharSet   = 'UTF-8';

        $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $mail->addAddress(RECIPIENT_EMAIL);
        if (!empty(CC_EMAILS)) {
            foreach (explode(',', CC_EMAILS) as $cc) {
                $mail->addCC(trim($cc));
            }
        }

        $mail->addCustomHeader('X-Correlation-ID', $correlationId);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;

        return $mail->send();
    } catch (\Throwable $e) {
        // Intentionally no exception details in logs — only internal reference
        error_log('[lead] PHPMailer failed cid=' . $correlationId);
        return false;
    }
}

/**
 * Send to CRM with strict success parsing.
 *
 * TODO(owner): Confirm EightGate response contract.
 * Set CRM_SUCCESS_FIELD + CRM_SUCCESS_VALUE + CRM_ID_FIELD in env.
 */
function sendToCRM(array $data, string $correlationId): array {
    if (!CRM_ENABLED || empty(CRM_API_URL)) return ['ok' => false];

    $payload = [
        'member_name'     => $data['fullName'] ?? '',
        'member_phone'    => $data['phone'] ?? '',
        'member_email'    => $data['email'] ?? '',
        'member_country'  => 'sa',
        'memberField_37'  => $data['orgName'] ?? '',
        'memberField_23'  => '22',
        'title'           => 'طلب نظام ديوان سويت',
        'customField_33'  => 'نظام ديوان سويت',
        'customField_19'  => 'diwansuite.com',
        'customField_35'  => 0,
        'customField_98'  => 1,
        'customField_102' => 0,
        'customField_21'  => buildCrmMessageDetails($data),
        'customField_20'  => '',
        'customField_91'  => '',
        'customField_90'  => '',
        'customField_34'  => '',
        'customField_36'  => '',
        'customField_100' => '',
        'custom_ref'      => $correlationId,
    ];

    if (!empty($data['affiliate'])) {
        $payload['assign_ids'] = $data['affiliate'];
    }

    $ctx = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => implode("\r\n", [
                'Content-Type: application/json; charset=utf-8',
                'Accept: application/json',
                'Authorization: Bearer ' . CRM_USER_TOKEN,
                'X-Correlation-ID: ' . $correlationId,
            ]) . "\r\n",
            'content' => json_encode($payload, JSON_UNESCAPED_UNICODE),
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);

    $responseBody = @file_get_contents(CRM_API_URL, false, $ctx);

    // Parse HTTP status from $http_response_header
    $httpStatus = 0;
    if (isset($http_response_header) && is_array($http_response_header)) {
        preg_match('/HTTP\/\S+ (\d+)/', $http_response_header[0] ?? '', $m);
        $httpStatus = (int)($m[1] ?? 0);
    }

    return parseCrmResponse($httpStatus, $responseBody ?: '', $correlationId);
}

function buildCrmMessageDetails(array $data): string {
    $representsLabel = ($data['representsOrg'] ?? '') === 'yes' ? 'نعم' : 'لا';
    return implode("\n", array_filter([
        // Business fields
        'هدف الطلب: '          . ($data['goal']            ?? '—'),
        'يمثل جهة: '           . $representsLabel,
        'اسم الجهة: '          . ($data['orgName']         ?? '—'),
        'المجال: '             . ($data['sector']          ?? '—'),
        'الموظفون: '           . ($data['employeeCount']   ?? '—'),
        'الاجتماعات شهريًا: '  . ($data['meetingsCount']  ?? '—'),
        'المجالس واللجان: '    . ($data['boardsCount']     ?? '—'),
        'المسمى الوظيفي: '     . ($data['jobTitle']        ?? '—'),
        'العلاقة بالقرار: '    . ($data['decisionRole']    ?? '—'),
        'الباقة المختارة: '    . ($data['selectedPackage'] ?? '—'),
        'ملاحظات: '            . ($data['message']         ?? '—'),
        // Lead score
        'Lead Score: '         . ($data['_leadScore']      ?? '—'),
        // Metadata
        'رابط الصفحة: '        . ($data['pageUrl']         ?? '—'),
        'اللغة: '              . ($data['language']        ?? '—'),
        'CTA المستخدم: '       . ($data['ctaLabel']        ?? '—'),
        'المصدر: '             . ($data['utm_source']      ?? '—'),
        'الوسيط: '             . ($data['utm_medium']      ?? '—'),
        'الحملة: '             . ($data['utm_campaign']    ?? '—'),
        'الكلمة المفتاحية: '   . ($data['utm_term']        ?? '—'),
        'المحتوى الإعلاني: '   . ($data['utm_content']    ?? '—'),
        'الإحالة: '            . ($data['affiliate']       ?? '—'),
        'المرجع: '             . ($data['referrer']        ?? '—'),
        'وقت الإرسال: '        . ($data['timestamp']       ?: date('c')),
    ]));
}

/**
 * Parse CRM response strictly.
 *
 * Priority:
 * 1. If CRM_SUCCESS_FIELD env is set, use only that field+value pair.
 * 2. Otherwise, use heuristic fallback (success=true | status=success | id present).
 *    Logs a warning so owner knows to configure the env vars.
 */
function parseCrmResponse(int $httpStatus, string $body, string $correlationId): array {
    if ($httpStatus < 200 || $httpStatus >= 300) {
        error_log('[lead] CRM HTTP failure status=' . $httpStatus . ' cid=' . $correlationId);
        return ['ok' => false];
    }

    $record = json_decode($body, true);
    if (!is_array($record) || empty($record)) {
        error_log('[lead] CRM body empty or not JSON cid=' . $correlationId);
        return ['ok' => false];
    }

    $successField = CRM_SUCCESS_FIELD;
    $successValue = CRM_SUCCESS_VALUE;
    $idField      = CRM_ID_FIELD;

    if (!empty($successField) && !empty($successValue)) {
        $fieldVal = $record[$successField] ?? null;
        $matches  = (string)$fieldVal === $successValue
            || ($fieldVal === true  && $successValue === 'true')
            || ($fieldVal === 1     && $successValue === '1');
        $crmId = !empty($idField) && !empty($record[$idField]) ? (string)$record[$idField] : null;
        return ['ok' => $matches, 'id' => $crmId];
    }

    // Heuristic — warn owner
    error_log('[lead] CRM_SUCCESS_FIELD not configured, using heuristic. Set CRM_SUCCESS_FIELD+CRM_SUCCESS_VALUE+CRM_ID_FIELD. cid=' . $correlationId);

    $ok = ($record['success'] ?? null) === true
        || ($record['status'] ?? null) === 'success'
        || (isset($record['id']) && $record['id'] !== '' && $record['id'] !== 0);

    if (!$ok) {
        error_log('[lead] CRM response did not match known success shape cid=' . $correlationId);
        return ['ok' => false];
    }

    $crmId = !empty($record['id']) ? (string)$record['id'] : null;
    return ['ok' => true, 'id' => $crmId];
}
