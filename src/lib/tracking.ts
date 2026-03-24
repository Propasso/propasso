/**
 * Minimal GTM dataLayer helper.
 * Each push is fire-and-forget; no deduplication needed
 * because callers already guard against repeat triggers.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushEvent(
  event: string,
  extra?: Record<string, unknown>,
) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    ...extra,
  });
}
