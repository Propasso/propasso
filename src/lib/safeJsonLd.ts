/**
 * Serialize a value for safe embedding inside a <script type="application/ld+json"> tag.
 * Escapes characters that could otherwise let CMS content break out of the script tag
 * (e.g. a stray "</script>" sequence) and enable XSS.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}