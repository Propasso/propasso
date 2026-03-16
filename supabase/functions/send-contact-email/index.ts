import {
  isValidEmail,
  validateString,
  checkRateLimit,
  recordRateLimitHit,
  logAudit,
  corsHeaders,
  jsonResponse,
  createServiceClient,
} from "../_shared/security-utils.ts";

const FUNCTION_NAME = "send-contact-email";
const HUBSPOT_PORTAL_ID = "147744482";
const HUBSPOT_FORM_GUID = "d5ed24d9-8667-4f3a-ac38-3efe6e17d03e";

const RATE_LIMIT_CONFIG_EMAIL = {
  functionName: FUNCTION_NAME,
  limits: [
    { windowMinutes: 60, maxRequests: 5 },
    { windowMinutes: 1, maxRequests: 1 },
  ],
};

const RATE_LIMIT_CONFIG_IP = {
  functionName: `${FUNCTION_NAME}:ip`,
  limits: [
    { windowMinutes: 60, maxRequests: 15 },
    { windowMinutes: 5, maxRequests: 5 },
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

    const name = validateString(obj.name, 200);
    const email = typeof obj.email === "string" ? obj.email.trim() : "";
    const message = validateString(obj.message, 5000);
    const phone = validateString(obj.phone, 30) ?? "";
    const newsletter = obj.newsletter === true;

    if (!name) return jsonResponse({ error: "Naam is verplicht (max 200 tekens)." }, 400);
    if (!isValidEmail(email)) return jsonResponse({ error: "Ongeldig e-mailadres." }, 400);
    if (!message) return jsonResponse({ error: "Bericht is verplicht (max 5000 tekens)." }, 400);

    const supabase = createServiceClient();

    // Rate limiting — IP first, then email
    const ipCheck = await checkRateLimit(supabase, RATE_LIMIT_CONFIG_IP, clientIp);
    if (!ipCheck.allowed) {
      logAudit({ function: FUNCTION_NAME, action: "rate_limit", result: "rejected", reason: "ip_limit_exceeded" });
      return jsonResponse({ error: "Te veel verzoeken. Probeer het later opnieuw." }, 429);
    }

    const emailCheck = await checkRateLimit(supabase, RATE_LIMIT_CONFIG_EMAIL, email);
    if (!emailCheck.allowed) {
      logAudit({ function: FUNCTION_NAME, action: "rate_limit", result: "rejected", reason: "email_limit_exceeded" });
      return jsonResponse({ error: "Te veel verzoeken. Probeer het later opnieuw." }, 429);
    }

    await Promise.all([
      recordRateLimitHit(supabase, FUNCTION_NAME, email),
      recordRateLimitHit(supabase, `${FUNCTION_NAME}:ip`, clientIp),
    ]);

    // Split name
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // HubSpot submission
    const fields: Array<{ objectTypeId: string; name: string; value: string }> = [
      { objectTypeId: "0-1", name: "firstname", value: firstName },
      { objectTypeId: "0-1", name: "lastname", value: lastName },
      { objectTypeId: "0-1", name: "email", value: email },
      { objectTypeId: "0-1", name: "message", value: message },
    ];

    if (phone) fields.push({ objectTypeId: "0-1", name: "phone", value: phone });

    const hubspotUrl = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

    const res = await fetch(hubspotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          hutk: null,
          pageUri: "https://propasso.nl/contact",
          pageName: "Contact - Propasso",
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "Ik ga akkoord met de privacyverklaring",
            communications: newsletter
              ? [{ value: true, subscriptionTypeId: 999, text: "Ik wil graag relevante rapporten en de nieuwsbrief ontvangen." }]
              : [],
          },
        },
      }),
    });

    const resultText = await res.text();

    if (!res.ok) {
      logAudit({ function: FUNCTION_NAME, action: "hubspot", result: "error", reason: `status_${res.status}` });
      return jsonResponse({ error: "Formulier kon niet worden verzonden." }, 500);
    }

    logAudit({ function: FUNCTION_NAME, action: "submit", result: "ok" });
    return jsonResponse({ success: true });
  } catch (error) {
    logAudit({ function: FUNCTION_NAME, action: "handler", result: "error", reason: String(error) });
    return jsonResponse({ error: "Er is een onverwachte fout opgetreden." }, 500);
  }
});
