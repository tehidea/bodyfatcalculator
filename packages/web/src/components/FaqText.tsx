import DOMPurify from 'isomorphic-dompurify'

const variantStyles = {
  dark: 'mt-4 text-gray-300',
  light: 'mt-4 text-sm text-gray-600',
} as const

export function FaqText({ text, variant = 'light' }: { text: string; variant?: 'dark' | 'light' }) {
  const sanitizedHtml = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized via DOMPurify with a strict allowlist (ALLOWED_TAGS: ['a'])
    <p className={variantStyles[variant]} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  )
}
