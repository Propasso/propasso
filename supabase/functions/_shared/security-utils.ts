/**
 * Shared security utilities for Propasso edge functions.
 * Provides HTML escaping, input validation, rate limiting, and structured logging.
 */

import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// HTML output encoding
// ---------------------------------------------------------------------------

/** Escape user-supplied values for safe interpolation into HTML context. */
export function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Input validation helpers
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return typeof email === "string" && email.length <= 255 && EMAIL_RE.test(email);
}

/** Trim + validate a string field. Returns null if invalid. */
export function validateString(
  value: unknown,
  maxLength: number,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return null;
  return trimmed;
}

/** Validate that a value is one of the allowed options. */
export function validateEnum(value: unknown, allowed: readonly string[]): string | null {
  if (typeof value !== "string") return null;
  return allowed.includes(value) ? value : null;
}

/** Strip any unexpected keys from an object, keeping only the allowed set. */
export function pickAllowedKeys<T extends Record<string, unknown>>(
  obj: T,
  allowed: readonly string[],
): Partial<T> {
  const result: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in obj) result[key] = obj[key];
  }
  return result as Partial<T>;
}

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

export interface RateLimitConfig {
  functionName: string;
  /** Limits to enforce. Each is checked independently; first exceeded limit rejects. */
  limits: Array<{
    windowMinutes: number;
    maxRequests: number;
  }>;
}

/**
 * Check rate limits for a given identifier (email, IP, etc.).
 * Returns { allowed: true } or { allowed: false, retryAfterSeconds }.
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  config: RateLimitConfig,
  identifier: string,
): Promise<{ allowed: true } | { allowed: false; retryAfterSeconds: number }> {
  for (const limit of config.limits) {
    const cutoff = new Date(Date.now() - limit.windowMinutes * 60_000).toISOString();
    const { count } = await supabase
      .from("rate_limit_log")
      .select("*", { count: "exact", head: true })
      .eq("function_name", config.functionName)
      .eq("identifier", identifier)
      .gte("created_at", cutoff);

    if ((count ?? 0) >= limit.maxRequests) {
      return { allowed: false, retryAfterSeconds: limit.windowMinutes * 60 };
    }
  }
  return { allowed: true };
}

/** Record a rate-limit hit for the given identifier. */
export async function recordRateLimitHit(
  supabase: SupabaseClient,
  functionName: string,
  identifier: string,
): Promise<void> {
  await supabase.from("rate_limit_log").insert({
    function_name: functionName,
    identifier,
  });
}

// ---------------------------------------------------------------------------
// Structured logging (no PII in logs)
// ---------------------------------------------------------------------------

export interface AuditEvent {
  function: string;
  action: string;
  result: "ok" | "rejected" | "error";
  reason?: string;
  metadata?: Record<string, unknown>;
}

export function logAudit(event: AuditEvent): void {
  const entry = {
    ts: new Date().toISOString(),
    fn: event.function,
    action: event.action,
    result: event.result,
    ...(event.reason ? { reason: event.reason } : {}),
    ...(event.metadata ? { meta: event.metadata } : {}),
  };
  if (event.result === "error") {
    console.error(JSON.stringify(entry));
  } else if (event.result === "rejected") {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

// ---------------------------------------------------------------------------
// CORS headers (shared)
// ---------------------------------------------------------------------------

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/** Create a JSON response with CORS headers. */
export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Create a Supabase service-role client. */
export function createServiceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}
