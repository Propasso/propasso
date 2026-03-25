import {
  validateString,
  checkRateLimit,
  recordRateLimitHit,
  logAudit,
  corsHeaders,
  jsonResponse,
  createServiceClient,
  escHtml,
} from "../_shared/security-utils.ts";

const FUNCTION_NAME = "send-callback-request";
const HUBSPOT_PORTAL_ID = "147744482";
const HUBSPOT_FORM_GUID = "d5ed24d9-8667-4f3a-ac38-3efe6e17d03e"; // reuse contact form

const RATE_LIMIT_CONFIG_PHONE = {
  functionName: FUNCTION_NAME,
  limits: [
    { windowMinutes: 60, maxRequests: 3 },
    { windowMinutes: 5, maxRequests: 1 },
  ],
};

const RATE_LIMIT_CONFIG_IP = {
  functionName: `${FUNCTION_NAME}:ip`,
  limits: [
    { windowMinutes: 60, maxRequests: 10 },
    { windowMinutes: 5, maxRequests: 3 },
  ],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      logAudit({ function: FUNCTION_NAME, action: "parse", result: "rejected", reason: "invalid_json" });
      return jsonResponse({ error: "Ongeldige request body." }, 400);
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return jsonResponse({ error: "Ongeldige payload." }, 400);
    }

    const obj = body as Record<string, unknown>;

    const name = validateString(obj.name, 100);
    const phone = validateString(obj.phone, 20);
    const message = validateString(obj.message, 500) ?? "";

    if (!name) return jsonResponse({ error: "Naam is verplicht." }, 400);
    if (!phone) return jsonResponse({ error: "Telefoonnummer is verplicht." }, 400);

    const supabase = createServiceClient();

    // Rate limiting
    const ipCheck = await checkRateLimit(supabase, RATE_LIMIT_CONFIG_IP, clientIp);
    if (!ipCheck.allowed) {
      logAudit({ function: FUNCTION_NAME, action: "rate_limit", result: "rejected", reason: "ip_limit_exceeded" });
      return jsonResponse({ error: "Te veel verzoeken. Probeer het later opnieuw." }, 429);
    }

    const phoneCheck = await checkRateLimit(supabase, RATE_LIMIT_CONFIG_PHONE, phone);
    if (!phoneCheck.allowed) {
      logAudit({ function: FUNCTION_NAME, action: "rate_limit", result: "rejected", reason: "phone_limit_exceeded" });
      return jsonResponse({ error: "Te veel verzoeken. Probeer het later opnieuw." }, 429);
    }

    await Promise.all([
      recordRateLimitHit(supabase, FUNCTION_NAME, phone),
      recordRateLimitHit(supabase, `${FUNCTION_NAME}:ip`, clientIp),
    ]);

    // Split name for HubSpot
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Build message for HubSpot
    const hubspotMessage = [
      `[Terugbelverzoek via Quickscan]`,
      `Telefoonnummer: ${escHtml(phone)}`,
      message ? `Toelichting: ${escHtml(message)}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const fields: Array<{ objectTypeId: string; name: string; value: string }> = [
      { objectTypeId: "0-1", name: "firstname", value: firstName },
      { objectTypeId: "0-1", name: "lastname", value: lastName },
      { objectTypeId: "0-1", name: "phone", value: phone },
      { objectTypeId: "0-1", name: "message", value: hubspotMessage },
    ];

    const hubspotUrl = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

    const res = await fetch(hubspotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          hutk: null,
          pageUri: "https://propasso.nl/quickscan",
          pageName: "Quickscan Terugbelverzoek - Propasso",
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "Ik ga akkoord met de privacyverklaring",
            communications: [],
          },
        },
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      logAudit({ function: FUNCTION_NAME, action: "hubspot", result: "error", reason: `status_${res.status}: ${errorBody}` });
      return jsonResponse({ error: "Verzoek kon niet worden verzonden." }, 500);
    }

    logAudit({ function: FUNCTION_NAME, action: "submit", result: "ok" });
    return jsonResponse({ success: true });
  } catch (error) {
    logAudit({ function: FUNCTION_NAME, action: "handler", result: "error", reason: String(error) });
    return jsonResponse({ error: "Er is een onverwachte fout opgetreden." }, 500);
  }
});
