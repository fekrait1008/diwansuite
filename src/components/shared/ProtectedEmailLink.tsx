/**
 * ProtectedEmailLink
 *
 * Wraps email links (and optional plain-text email spans) in Cloudflare's
 * <!--email_off--> ... <!--/email_off--> HTML comments so Cloudflare's
 * "Email Address Obfuscation" feature leaves them untouched.
 *
 * React JSX comments ({/* ... *\/}) are stripped from the final HTML output,
 * so we MUST use dangerouslySetInnerHTML to emit real HTML comments.
 * The email values come from our own SITE_CONFIG constants — never from
 * user-supplied input — so dangerouslySetInnerHTML is safe here.
 *
 * Usage:
 *   <ProtectedEmailLink email="info@diwansuite.com" />
 *   <ProtectedEmailLink email="info@diwansuite.com" label="راسلنا" className="text-primary hover:underline" />
 *   <ProtectedEmailLink email="info@diwansuite.com" textOnly className="text-muted-foreground" />
 */

type ProtectedEmailLinkProps = {
  /** The email address — must be a trusted constant, never user input */
  email: string
  /** Optional display label; defaults to the email address itself */
  label?: string
  /** Additional Tailwind / CSS class names for the anchor or span */
  className?: string
  /**
   * When true, renders a <span> with the email text instead of an <a> link.
   * Use this when you need to display the address without a mailto: link.
   */
  textOnly?: boolean
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function ProtectedEmailLink({
  email,
  label,
  className = '',
  textOnly = false,
}: ProtectedEmailLinkProps) {
  const safeEmail = escapeHtml(email)
  const safeLabel = escapeHtml(label || email)
  const safeClass = className ? escapeHtml(className) : ''
  const classAttr = safeClass ? ` class="${safeClass}"` : ''

  const inner = textOnly
    ? `<span${classAttr}>${safeLabel}</span>`
    : `<a href="mailto:${safeEmail}"${classAttr}>${safeLabel}</a>`

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off-->${inner}<!--/email_off-->`,
      }}
    />
  )
}
