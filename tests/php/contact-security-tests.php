<?php
/**
 * tests/php/contact-security-tests.php
 *
 * Standalone PHP unit tests for the security helper functions in
 * public/api/lib/contact-security.php
 *
 * Run with:  php tests/php/contact-security-tests.php
 *
 * Exit code 0 = all pass.  Exit code 1 = one or more failures.
 */

declare(strict_types=1);

// Bootstrap guard so the lib file loads safely
define('DIWAN_LEAD_BOOTSTRAPPED', true);
require_once __DIR__ . '/../../public/api/lib/contact-security.php';

// ---------------------------------------------------------------------------
// Minimal test harness
// ---------------------------------------------------------------------------

$passed  = 0;
$failed  = 0;
$results = [];

function assert_equal(string $label, mixed $actual, mixed $expected): void
{
    global $passed, $failed, $results;
    if ($actual === $expected) {
        $passed++;
        $results[] = "  PASS  {$label}";
    } else {
        $failed++;
        $exp = var_export($expected, true);
        $act = var_export($actual, true);
        $results[] = "  FAIL  {$label}\n         expected: {$exp}\n         actual:   {$act}";
    }
}

function assert_true(string $label, mixed $value): void
{
    assert_equal($label, (bool)$value, true);
}

function assert_false(string $label, mixed $value): void
{
    assert_equal($label, (bool)$value, false);
}

function assert_matches(string $label, string $subject, string $pattern): void
{
    global $passed, $failed, $results;
    if (preg_match($pattern, $subject)) {
        $passed++;
        $results[] = "  PASS  {$label}";
    } else {
        $failed++;
        $results[] = "  FAIL  {$label}\n         '{$subject}' did not match {$pattern}";
    }
}

// ---------------------------------------------------------------------------
// resolveClientIp
// ---------------------------------------------------------------------------

echo "--- resolveClientIp ---\n";

assert_equal(
    'returns REMOTE_ADDR when no XFF and no trusted proxies',
    resolveClientIp('1.2.3.4', '', ''),
    '1.2.3.4'
);

assert_equal(
    'does NOT trust XFF when no trusted proxies configured',
    resolveClientIp('1.2.3.4', '9.9.9.9', ''),
    '1.2.3.4'
);

assert_equal(
    'does NOT trust XFF when REMOTE_ADDR not in CIDR list',
    resolveClientIp('5.5.5.5', '9.9.9.9', '10.0.0.0/8'),
    '5.5.5.5'
);

assert_equal(
    'trusts XFF leftmost address when REMOTE_ADDR is trusted proxy',
    resolveClientIp('10.0.0.1', '203.0.113.5, 10.0.0.1', '10.0.0.0/8'),
    '203.0.113.5'
);

assert_equal(
    'strips IPv4-mapped IPv6 prefix from REMOTE_ADDR',
    resolveClientIp('::ffff:192.168.1.1', '', ''),
    '192.168.1.1'
);

assert_equal(
    'handles empty REMOTE_ADDR gracefully',
    resolveClientIp('', '', ''),
    'unknown'
);

assert_equal(
    'rejects malformed XFF value even behind trusted proxy',
    resolveClientIp('10.0.0.1', 'not_an_ip!!!', '10.0.0.0/8'),
    '10.0.0.1'
);

// ---------------------------------------------------------------------------
// bodyTooLarge
// ---------------------------------------------------------------------------

echo "\n--- bodyTooLarge ---\n";

assert_false('returns false when contentLength = -1 (header absent)', bodyTooLarge(-1, 65536));
assert_false('returns false for size = limit',                          bodyTooLarge(65536, 65536));
assert_true( 'returns true for size = limit + 1',                      bodyTooLarge(65537, 65536));
assert_true( 'returns true for very large body',                        bodyTooLarge(1000000, 65536));
assert_false('returns false for small body',                            bodyTooLarge(1024, 65536));

// ---------------------------------------------------------------------------
// redactEmail
// ---------------------------------------------------------------------------

echo "\n--- redactEmail ---\n";

assert_equal('redacts local part keeping first char and domain', redactEmail('user@example.com'), 'u***@example.com');
assert_equal('handles single-char local part',                   redactEmail('a@b.com'),          'a***@b.com');
assert_equal('returns placeholder for no-@ string',             redactEmail('notanemail'),        '***@***');
assert_equal('returns placeholder for leading-@ string',        redactEmail('@example.com'),      '***@***');

// ---------------------------------------------------------------------------
// redactPhone
// ---------------------------------------------------------------------------

echo "\n--- redactPhone ---\n";

$rp = redactPhone('+966501234567');
assert_true( 'keeps 4-char prefix',   str_starts_with($rp, '+966'));
assert_true( 'keeps last 3 digits',   str_ends_with($rp, '567'));
assert_true( 'contains mask',         str_contains($rp, '****'));
assert_equal('short phone returns placeholder', redactPhone('123'), '***');

// ---------------------------------------------------------------------------
// hashValue
// ---------------------------------------------------------------------------

echo "\n--- hashValue ---\n";

$h = hashValue('test-input', 'test-salt');
assert_true(  'returns 16 hex chars',          (bool)preg_match('/^[0-9a-f]{16}$/', $h));
assert_equal( 'deterministic same input',       hashValue('same', 'salt'), hashValue('same', 'salt'));
assert_true(  'different output for diff input', hashValue('a', 'salt') !== hashValue('b', 'salt'));
assert_true(  'different salt changes output',   hashValue('a', 'salt1') !== hashValue('a', 'salt2'));
assert_true(  'never returns empty string',      strlen($h) > 0);

// ---------------------------------------------------------------------------
// buildIdempotencyKey
// ---------------------------------------------------------------------------

echo "\n--- buildIdempotencyKey ---\n";

$salt = 'test-salt';
$k1 = buildIdempotencyKey('user@test.com', '+966501234', 'ACME Corp', $salt);
assert_matches('returns 16-char hex key', $k1, '/^[0-9a-f]{16}$/');

assert_equal(
    'case-insensitive for email',
    buildIdempotencyKey('User@Test.COM', '+966501234', 'ACME', $salt),
    buildIdempotencyKey('user@test.com', '+966501234', 'ACME', $salt)
);

assert_equal(
    'trims whitespace',
    buildIdempotencyKey('  user@test.com  ', '+966501234', '  ACME  ', $salt),
    buildIdempotencyKey('user@test.com', '+966501234', 'ACME', $salt)
);

assert_true(
    'differs for different emails',
    buildIdempotencyKey('a@test.com', '+966501234', 'ACME', $salt) !==
    buildIdempotencyKey('b@test.com', '+966501234', 'ACME', $salt)
);

// Fingerprint must NOT contain raw PII
assert_false('key does not contain raw email', str_contains($k1, 'user@test.com'));
assert_false('key does not contain raw phone', str_contains($k1, '+966501234'));
assert_false('key does not contain raw company', str_contains($k1, 'ACME'));

// ---------------------------------------------------------------------------
// parseCrmResponse
// ---------------------------------------------------------------------------

echo "\n--- parseCrmResponse ---\n";

// HTTP failures
assert_false('HTTP 500 is failure', parseCrmResponse(500, '{"success":true}')['ok']);
assert_false('HTTP 404 is failure', parseCrmResponse(404, '{"success":true}')['ok']);
assert_false('HTTP 0 is failure',   parseCrmResponse(0,   '{"success":true}')['ok']);

// Empty / bad body
assert_false('empty body is failure',      parseCrmResponse(200, '')['ok']);
assert_false('non-JSON body is failure',   parseCrmResponse(200, 'OK')['ok']);
assert_false('empty JSON object failure',  parseCrmResponse(200, '{}')['ok']);

// Heuristic shapes
assert_true('success=true recognised',        parseCrmResponse(200, '{"success":true}')['ok']);
assert_true('status=success recognised',      parseCrmResponse(200, '{"status":"success"}')['ok']);
assert_true('id string present recognised',   parseCrmResponse(200, '{"id":"abc123"}')['ok']);
assert_true('id numeric present recognised',  parseCrmResponse(200, '{"id":42}')['ok']);
assert_false('success=false is failure',      parseCrmResponse(200, '{"success":false}')['ok']);
assert_false('id=0 is failure',               parseCrmResponse(200, '{"id":0}')['ok']);
assert_false('id="" is failure',              parseCrmResponse(200, '{"id":""}')['ok']);
assert_false('unknown shape is failure',      parseCrmResponse(200, '{"foo":"bar"}')['ok']);

// Env-configured strict path
assert_true(
    'env-configured field=value match succeeds',
    parseCrmResponse(200, '{"result":"ok","ref":"123"}', 'result', 'ok', 'ref')['ok']
);
assert_equal(
    'env-configured id field extracted',
    parseCrmResponse(200, '{"result":"ok","ref":"123"}', 'result', 'ok', 'ref')['id'],
    '123'
);
assert_false(
    'env-configured field=value mismatch fails',
    parseCrmResponse(200, '{"result":"error"}', 'result', 'ok', 'ref')['ok']
);

// ---------------------------------------------------------------------------
// isIpInCidr / isIpInCidrList
// ---------------------------------------------------------------------------

echo "\n--- IP CIDR helpers ---\n";

assert_true( '10.0.0.1 in 10.0.0.0/8',         isIpInCidr('10.0.0.1',   '10.0.0.0/8'));
assert_false('192.168.1.1 NOT in 10.0.0.0/8',   isIpInCidr('192.168.1.1','10.0.0.0/8'));
assert_true( '127.0.0.1 in 127.0.0.1/32',       isIpInCidr('127.0.0.1',  '127.0.0.1/32'));
assert_false('1.1.1.1 NOT in 127.0.0.1/32',     isIpInCidr('1.1.1.1',    '127.0.0.1/32'));
assert_true( '/0 matches everything',            isIpInCidr('8.8.8.8',    '0.0.0.0/0'));
assert_true( 'isIpInCidrList multi-CIDR match',
    isIpInCidrList('172.16.5.1', '10.0.0.0/8,172.16.0.0/12'));
assert_false('isIpInCidrList no match',
    isIpInCidrList('1.1.1.1', '10.0.0.0/8,172.16.0.0/12'));

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

echo "\n" . str_repeat('=', 60) . "\n";
foreach ($results as $line) {
    echo $line . "\n";
}

echo str_repeat('=', 60) . "\n";
echo "Results: {$passed} passed, {$failed} failed\n";

exit($failed > 0 ? 1 : 0);
