<?php
/**
 * Diwan Suite - Configuration Example File
 * 
 * IMPORTANT: 
 * - Copy this file to config.php and fill in your actual values
 * - NEVER commit config.php to version control
 * - config.php is listed in .gitignore
 * 
 * For production deployment:
 * - Use environment variables instead of this file
 * - All values below can be set via server environment variables
 */

return [
    // ============================================
    // SMTP CONFIGURATION
    // Environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, SMTP_FROM
    // ============================================
    'smtp' => [
        'host'      => getenv('SMTP_HOST') ?: 'smtp.example.com',
        'port'      => (int)(getenv('SMTP_PORT') ?: 587),
        'username'  => getenv('SMTP_USER') ?: '',
        'password'  => getenv('SMTP_PASS') ?: '',
        'encryption'=> getenv('SMTP_SECURE') ?: 'tls',
        'from_email'=> getenv('SMTP_FROM') ?: getenv('SMTP_USER') ?: '',
        'from_name' => 'Diwan Suite',
    ],
    
    // ============================================
    // EMAIL RECIPIENTS
    // Environment variable: LEAD_EMAIL_TO
    // ============================================
    'recipients' => [
        'to'  => getenv('LEAD_EMAIL_TO') ?: 'your-email@example.com',
        'cc'  => [],
        'bcc' => [],
    ],
    
    // ============================================
    // RECAPTCHA CONFIGURATION
    // Environment variables: RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY, RECAPTCHA_ACCEPT_SCORE
    // ============================================
    'recaptcha' => [
        'enabled'    => !empty(getenv('RECAPTCHA_SECRET_KEY')),
        'site_key'   => getenv('RECAPTCHA_SITE_KEY') ?: '',
        'secret_key' => getenv('RECAPTCHA_SECRET_KEY') ?: '',
        'min_score'  => (float)(getenv('RECAPTCHA_ACCEPT_SCORE') ?: 0.5),
    ],
    
    // ============================================
    // CRM INTEGRATION (EightGate)
    // Environment variables: CRM_API_URL, CRM_USER_TOKEN
    // ============================================
    'crm' => [
        'enabled'  => !empty(getenv('CRM_USER_TOKEN')),
        'api_url'  => getenv('CRM_API_URL') ?: 'https://your-crm-api-url.com/api/v1/leads',
        'api_key'  => getenv('CRM_USER_TOKEN') ?: '',
        'timeout'  => 10,
    ],
    
    // ============================================
    // SECURITY
    // Environment variables: RATE_LIMIT_MAX, RATE_LIMIT_SALT
    // ============================================
    'security' => [
        'rate_limit_enabled' => true,
        'rate_limit_max'     => (int)(getenv('RATE_LIMIT_MAX') ?: 5),
        'rate_limit_salt'    => getenv('RATE_LIMIT_SALT') ?: 'change-this-salt-in-production',
        'allowed_origins'    => [
            'https://diwansuite.com',
            'https://www.diwansuite.com',
            // Add localhost origins for development:
            // 'http://localhost:4173',
            // 'http://localhost:3000',
        ],
    ],
    
    // ============================================
    // NOTIFICATIONS (OPTIONAL)
    // ============================================
    'notifications' => [
        'slack_webhook'   => getenv('SLACK_WEBHOOK_URL') ?: '',
        'telegram_bot'    => getenv('TELEGRAM_BOT_TOKEN') ?: '',
        'telegram_chat'   => getenv('TELEGRAM_CHAT_ID') ?: '',
    ],
];
