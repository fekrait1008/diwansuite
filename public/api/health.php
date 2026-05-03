<?php
/**
 * public/api/health.php
 *
 * Lightweight health-check endpoint for uptime monitoring.
 *
 * Returns JSON:
 *   { "ok": true, "runtime": "php", "timestamp": "...", "version": "1" }
 *
 * Security:
 *  - No secrets, env vars, or paths exposed.
 *  - X-Robots-Tag: noindex, nofollow to prevent search indexing.
 *  - Responds to GET and HEAD only.
 *  - No CORS headers — intended for server-side monitoring only.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method !== 'GET' && $method !== 'HEAD') {
    http_response_code(405);
    header('Allow: GET, HEAD');
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$response = [
    'ok'        => true,
    'runtime'   => 'php',
    'timestamp' => gmdate('c'),
    'version'   => '1',
];

http_response_code(200);

if ($method === 'HEAD') {
    // HEAD: headers only, no body
    exit;
}

echo json_encode($response, JSON_UNESCAPED_SLASHES);
