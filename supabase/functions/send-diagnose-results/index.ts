import {
  escHtml,
  isValidEmail,
  validateString,
  pickAllowedKeys,
  checkRateLimit,
  recordRateLimitHit,
  logAudit,
  corsHeaders,
  jsonResponse,
  createServiceClient,
} from "../_shared/security-utils.ts";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FUNCTION_NAME = "send-diagnose-results";
const HUBSPOT_PORTAL_ID = "147744482";
const HUBSPOT_FORM_GUID = "bcfa7a30-7cbb-4658-9dac-4b2f76b38c96";

// Rate limits: 3 per email per hour, 10 per IP per hour
const RATE_LIMIT_CONFIG_EMAIL = {
  functionName: FUNCTION_NAME,
  limits: [
    { windowMinutes: 60, maxRequests: 3 },
    { windowMinutes: 1, maxRequests: 1 }, // burst: max 1 per minute per email
  ],
};

const RATE_LIMIT_CONFIG_IP = {
  functionName: `${FUNCTION_NAME}:ip`,
  limits: [
    { windowMinutes: 60, maxRequests: 10 },
    { windowMinutes: 5, maxRequests: 3 },
  ],
};

// ---------------------------------------------------------------------------
// Allowed enum values (must match client-side diagnoseData.ts)
// ---------------------------------------------------------------------------

const ALLOWED_REVENUE = ["< €1 mln", "€1–3 mln", "€3–10 mln", "€10–25 mln", "€25–50 mln", "> €50 mln"] as const;
const ALLOWED_EMPLOYEES = ["1–10", "10–25", "25–50", "50–100", "100+"] as const;
const ALLOWED_ROLES = [
  "Ondernemer (DGA, groot-aandeelhouder)",
  "Ondernemer (mede-aandeelhouder)",
  "Directie/management",
  "Non-executive/adviseur",
] as const;
const ALLOWED_PROFITABILITY = ["Verlieslatend", "Break-even", "Lage winst", "Gezonde winst", "Zeer winstgevend"] as const;
const ALLOWED_HORIZON = ["0–2 jaar", "3–5 jaar", "5–10 jaar", "Nog niet concreet"] as const;

function normalizeEnumValue(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[‐‑‒–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const aliasKey = (value: string) => normalizeEnumValue(value);

const SNAPSHOT_ALIASES = {
  revenue: {
    [aliasKey("< €1 miljoen")]: "< €1 mln",
    [aliasKey("€1 – €3 miljoen")]: "€1–3 mln",
    [aliasKey("€3 – €10 miljoen")]: "€3–10 mln",
    [aliasKey("€10 – €25 miljoen")]: "€10–25 mln",
    [aliasKey("€25 – €50 miljoen")]: "€25–50 mln",
    [aliasKey("> €50 miljoen")]: "> €50 mln",
  },
  employees: {
    [aliasKey("1 - 10")]: "1–10",
    [aliasKey("10 - 25")]: "10–25",
    [aliasKey("25 - 50")]: "25–50",
    [aliasKey("50 - 100")]: "50–100",
  },
  roles: {
    [aliasKey("Eigenaar-ondernemer")]: "Ondernemer (DGA, groot-aandeelhouder)",
    [aliasKey("Aandeelhouder")]: "Ondernemer (mede-aandeelhouder)",
    [aliasKey("Directie / management (niet aandeelhouder)")]: "Directie/management",
  },
  horizon: {
    [aliasKey("0 - 2 jaar")]: "0–2 jaar",
    [aliasKey("3 - 5 jaar")]: "3–5 jaar",
    [aliasKey("5 - 10 jaar")]: "5–10 jaar",
  },
} as const;

function validateSnapshotEnum(
  value: unknown,
  allowed: readonly string[],
  aliases?: Record<string, string>,
): string | null {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (allowed.includes(raw)) return raw;

  const normalized = normalizeEnumValue(raw);
  if (aliases?.[normalized]) return aliases[normalized];

  const canonicalMatch = allowed.find((entry) => normalizeEnumValue(entry) === normalized);
  return canonicalMatch ?? null;
}


const ALLOWED_PAYLOAD_KEYS = ["name", "email", "company", "phone", "newsletter", "scores", "snapshot"] as const;

// ---------------------------------------------------------------------------
// Payload interface & validation
// ---------------------------------------------------------------------------

interface ValidatedPayload {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  newsletter: boolean;
  scores: {
    business_attractiveness_score: string;
    business_readiness_score: string;
    owner_readiness_score: string;
  };
  snapshot: {
    revenue_band: string;
    employee_band: string;
    role_type: string;
    profitability: string;
    exit_horizon: string;
  };
}

function validatePayload(raw: unknown): { valid: true; data: ValidatedPayload } | { valid: false; error: string } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { valid: false, error: "Ongeldige payload." };
  }

  const obj = pickAllowedKeys(raw as Record<string, unknown>, ALLOWED_PAYLOAD_KEYS);

  const name = validateString(obj.name, 200);
  if (!name) return { valid: false, error: "Naam is verplicht (max 200 tekens)." };

  const email = typeof obj.email === "string" ? obj.email.trim() : "";
  if (!isValidEmail(email)) return { valid: false, error: "Ongeldig e-mailadres." };

  const company = validateString(obj.company, 200) ?? "";
  const phone = validateString(obj.phone, 30) ?? "";
  const newsletter = obj.newsletter === true;

  // Validate scores (client sends percentage strings 0–100)
  const scores = obj.scores as Record<string, unknown> | undefined;
  if (!scores || typeof scores !== "object") return { valid: false, error: "Scores ontbreken." };

  const validatePercentage = (val: unknown): string | null => {
    if (typeof val !== "string") return null;
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 0 || num > 100 || String(num) !== val) return null;
    return val;
  };

  const attractPct = validatePercentage(scores.business_attractiveness_score);
  const readyPct = validatePercentage(scores.business_readiness_score);
  const ownerPct = validatePercentage(scores.owner_readiness_score);

  if (!attractPct || !readyPct || !ownerPct) {
    return { valid: false, error: "Ongeldige score waarden (verwacht 0–100)." };
  }

  // Validate snapshot
  const snap = obj.snapshot as Record<string, unknown> | undefined;
  if (!snap || typeof snap !== "object") return { valid: false, error: "Snapshot ontbreekt." };

  const revenue_band = validateSnapshotEnum(snap.revenue_band, ALLOWED_REVENUE, SNAPSHOT_ALIASES.revenue);
  const employee_band = validateSnapshotEnum(snap.employee_band, ALLOWED_EMPLOYEES, SNAPSHOT_ALIASES.employees);
  const role_type = validateSnapshotEnum(snap.role_type, ALLOWED_ROLES, SNAPSHOT_ALIASES.roles);
  const profitability = validateSnapshotEnum(snap.profitability, ALLOWED_PROFITABILITY);
  const exit_horizon = validateSnapshotEnum(snap.exit_horizon, ALLOWED_HORIZON, SNAPSHOT_ALIASES.horizon);

  if (!revenue_band || !employee_band || !role_type || !profitability || !exit_horizon) {
    const failedFields = [];
    if (!revenue_band) failedFields.push(`revenue_band=${JSON.stringify(snap.revenue_band)}`);
    if (!employee_band) failedFields.push(`employee_band=${JSON.stringify(snap.employee_band)}`);
    if (!role_type) failedFields.push(`role_type=${JSON.stringify(snap.role_type)}`);
    if (!profitability) failedFields.push(`profitability=${JSON.stringify(snap.profitability)}`);
    if (!exit_horizon) failedFields.push(`exit_horizon=${JSON.stringify(snap.exit_horizon)}`);
    console.warn(`Snapshot validation failed: ${failedFields.join(", ")}`);
    return { valid: false, error: "Ongeldige snapshot waarden." };
  }

  const nameParts = name.split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  return {
    valid: true,
    data: {
      name,
      firstName,
      lastName,
      email,
      company,
      phone,
      newsletter,
      scores: {
        business_attractiveness_score: attractPct,
        business_readiness_score: readyPct,
        owner_readiness_score: ownerPct,
      },
      snapshot: { revenue_band, employee_band, role_type, profitability, exit_horizon },
    },
  };
}

// ---------------------------------------------------------------------------
// Score helpers (mirrors client-side logic)
// ---------------------------------------------------------------------------

type ScoreLevel = "orientation" | "foundation" | "good" | "ready";

function getScoreLevel(percentage: number): ScoreLevel {
  if (percentage <= 40) return "orientation";
  if (percentage <= 65) return "foundation";
  if (percentage <= 82) return "good";
  return "ready";
}

const scoreLevelLabels: Record<ScoreLevel, string> = {
  orientation: "Oriëntatiefase",
  foundation: "Verbeterfase",
  good: "Sterke basis",
  ready: "Verkoopklaar",
};

const scoreLevelColors: Record<ScoreLevel, string> = {
  orientation: "#e04040",
  foundation: "#e8912a",
  good: "#d4a017",
  ready: "#2a8a6e",
};

// ---------------------------------------------------------------------------
// Tips matrix (top 2 per dimension/level)
// ---------------------------------------------------------------------------

const tipsByDimension: Record<string, Record<ScoreLevel, string[]>> = {
  attractiveness: {
    orientation: [
      "Breng in kaart hoe voorspelbaar uw omzet en winst zijn. Identificeer de grootste schommelingen en hun oorzaken.",
      "Analyseer uw klantspreiding: welk percentage van de omzet komt van uw top-3 klanten? Streef naar maximaal 15% per klant.",
    ],
    foundation: [
      "Werk actief aan omzetstabiliteit door langere contracten en meer voorspelbare inkomstenstromen op te bouwen.",
      "Investeer in een tweede managementlaag die operationele beslissingen zelfstandig kan nemen.",
    ],
    good: [
      "Test uw bedrijfscontinuïteit door periodiek afwezig te zijn en de resultaten te monitoren.",
      "Optimaliseer uw klantcontracten met langere looptijden en automatische verlengingen.",
    ],
    ready: [
      "Laat een externe partij uw bedrijfscontinuïteit valideren om dit richting kopers te onderbouwen.",
      "Documenteer uw groeistrategie en marktpotentieel als verkoopargument voor potentiële kopers.",
    ],
  },
  readiness: {
    orientation: [
      "Laat uw jaarrekeningen van de afgelopen drie jaar door een accountant controleren en normaliseren.",
      "Maak een inventarisatie van alle lopende contracten met klanten, leveranciers en personeel en beoordeel de overdraagbaarheid.",
    ],
    foundation: [
      "Implementeer maandelijkse managementrapportages met de belangrijkste financiële en operationele KPI's.",
      "Zorg dat alle contracten op naam van de BV staan en niet afhankelijk zijn van uw persoonlijke betrokkenheid.",
    ],
    good: [
      "Bereid een vendor due diligence-rapport voor om het verkoopproces te versnellen en verrassingen te voorkomen.",
      "Zorg voor een digitale data room met alle relevante documenten gestructureerd beschikbaar.",
    ],
    ready: [
      "Laat een proef-due diligence uitvoeren om eventuele verrassingen vóór te zijn.",
      "Bespreek met uw adviseur de optimale transactiestructuur (share deal vs. asset deal).",
    ],
  },
  owner: {
    orientation: [
      "Maak een persoonlijk financieel plan: hoeveel vermogen heeft u nodig om comfortabel te leven na de verkoop?",
      "Denk na over wat u na de verkoop wilt doen: ondernemerschap, advieswerk, reizen, of iets anders.",
    ],
    foundation: [
      "Schakel een financieel planner in die een persoonlijke vermogensprognose kan maken.",
      "Verken concrete activiteiten voor na de overdracht: bestuursfuncties, mentoring, of een nieuw project.",
    ],
    good: [
      "Stel samen met een adviseur een realistisch tijdpad op voor het overdrachtsproces.",
      "Assembleer uw adviesteam: accountant, fiscalist, M&A-adviseur en eventueel een coach.",
    ],
    ready: [
      "Bespreek met uw adviseurs de optimale timing van de verkoop in relatie tot marktomstandigheden.",
      "Bereid u mentaal voor op het due diligence-proces en de emotionele impact daarvan.",
    ],
  },
};

// ---------------------------------------------------------------------------
// HTML email template (all user values escaped)
// ---------------------------------------------------------------------------

function buildScoreBar(label: string, pct: number): string {
  const level = getScoreLevel(pct);
  const color = scoreLevelColors[level];
  const levelLabel = scoreLevelLabels[level];
  return `
    <tr>
      <td style="padding:12px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="font-size:14px;font-weight:600;color:#1a3a4a;padding-bottom:6px;">
              ${escHtml(label)}
              <span style="float:right;font-weight:400;font-size:13px;color:${color};">
                ${pct}% — ${escHtml(levelLabel)}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <div style="background:#e8eeef;border-radius:6px;height:10px;overflow:hidden;">
                <div style="background:${color};width:${Math.min(pct, 100)}%;height:100%;border-radius:6px;"></div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function buildTipsSection(dimension: string, label: string, pct: number): string {
  const level = getScoreLevel(pct);
  const tips = tipsByDimension[dimension]?.[level] ?? [];
  if (tips.length === 0) return "";

  const tipsHtml = tips
    .map((tip) => `<li style="padding:6px 0;font-size:14px;line-height:1.6;color:#3a5a6a;">${escHtml(tip)}</li>`)
    .join("");

  return `
    <tr>
      <td style="padding:16px 0 8px;">
        <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#1a3a4a;">${escHtml(label)}</p>
        <ul style="margin:0;padding-left:20px;">${tipsHtml}</ul>
      </td>
    </tr>`;
}

function buildEmailHtml(
  data: ValidatedPayload,
  numericScores: { attractiveness: number; readiness: number; owner: number },
): string {
  const firstName = escHtml(data.firstName);
  const overall = Math.round((numericScores.attractiveness + numericScores.readiness + numericScores.owner) / 3);
  const overallLevel = getScoreLevel(overall);
  const overallColor = scoreLevelColors[overallLevel];
  const overallLabel = escHtml(scoreLevelLabels[overallLevel]);

  // Snapshot values are already enum-validated, but escape anyway for defense-in-depth
  const snap = {
    revenue_band: escHtml(data.snapshot.revenue_band),
    employee_band: escHtml(data.snapshot.employee_band),
    role_type: escHtml(data.snapshot.role_type),
    profitability: escHtml(data.snapshot.profitability),
    exit_horizon: escHtml(data.snapshot.exit_horizon),
  };

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Uw Exit Readiness Rapport — Propasso</title></head>
<body style="margin:0;padding:0;background-color:#f4f6f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f6f7;">
<tr><td align="center" style="padding:32px 16px;">

  <!-- Container -->
  <table width="600" cellpadding="0" cellspacing="0" role="presentation"
    style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#0b3d5c 0%,#1a5a7a 100%);padding:32px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td>
              <p style="margin:0;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.7);">Exit Readiness Rapport</p>
              <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
                Uw persoonlijke resultaten
              </h1>
            </td>
            <td align="right" valign="top">
              <img
                src="https://propasso.nl/propasso-logo-grey-yellow.png"
                alt="Propasso"
                width="120"
                style="display:block;width:120px;height:auto;border:0;outline:none;text-decoration:none;"
              />
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:32px 40px;">

        <!-- Greeting -->
        <p style="margin:0 0 8px;font-size:16px;color:#1a3a4a;">Beste ${firstName},</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3a5a6a;">
          Bedankt voor het invullen van de Exit Readiness Quickscan. Hieronder vindt u uw persoonlijke rapport
          met uw scores, een duiding per dimensie en concrete aanbevelingen.
        </p>

        <!-- Overall score -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="background:#f8fafa;border-radius:10px;border:1px solid #e0e8eb;margin-bottom:24px;">
          <tr>
            <td style="padding:24px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#6a8a9a;">Totaalscore</p>
              <p style="margin:0;font-size:42px;font-weight:700;color:${overallColor};">${overall}%</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:${overallColor};">${overallLabel}</p>
            </td>
          </tr>
        </table>

        <!-- Dimension scores -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${buildScoreBar("Aantrekkelijkheid van het Bedrijf", numericScores.attractiveness)}
          ${buildScoreBar("Verkoopklaarheid van het Bedrijf", numericScores.readiness)}
          ${buildScoreBar("Verkoopklaarheid van de Ondernemer", numericScores.owner)}
        </table>

        <!-- Context -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="margin:24px 0;background:#f8fafa;border-radius:8px;border:1px solid #e0e8eb;">
          <tr><td style="padding:20px;">
            <p style="margin:0 0 10px;font-size:14px;font-weight:600;color:#1a3a4a;">Uw bedrijfsprofiel</p>
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:13px;color:#3a5a6a;">
              <tr><td style="padding:3px 0;" width="45%">Omzet</td><td style="padding:3px 0;">${snap.revenue_band}</td></tr>
              <tr><td style="padding:3px 0;">Medewerkers</td><td style="padding:3px 0;">${snap.employee_band}</td></tr>
              <tr><td style="padding:3px 0;">Rol</td><td style="padding:3px 0;">${snap.role_type}</td></tr>
              <tr><td style="padding:3px 0;">Winstgevendheid</td><td style="padding:3px 0;">${snap.profitability}</td></tr>
              <tr><td style="padding:3px 0;">Overdrachtshorizon</td><td style="padding:3px 0;">${snap.exit_horizon}</td></tr>
            </table>
          </td></tr>
        </table>

        <!-- Tips per dimension -->
        <p style="margin:24px 0 8px;font-size:18px;font-weight:700;color:#1a3a4a;">Aanbevelingen per dimensie</p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#3a5a6a;">
          Op basis van uw scores hebben wij per dimensie de twee meest relevante aanbevelingen geselecteerd.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${buildTipsSection("attractiveness", "Aantrekkelijkheid van het Bedrijf", numericScores.attractiveness)}
          ${buildTipsSection("readiness", "Verkoopklaarheid van het Bedrijf", numericScores.readiness)}
          ${buildTipsSection("owner", "Verkoopklaarheid van de Ondernemer", numericScores.owner)}
        </table>

        <!-- Methodology note -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="margin:28px 0;border-left:3px solid #c8e848;background:#fafcf0;border-radius:0 8px 8px 0;">
          <tr><td style="padding:16px 20px;">
            <p style="margin:0;font-size:13px;line-height:1.6;color:#3a5a6a;">
              <strong style="color:#1a3a4a;">Over de methodiek</strong><br>
              Deze quickscan is gebaseerd op de internationaal erkende Value Acceleration Methodology,
              vertaald naar de praktijk van het Nederlandse MKB. De drie dimensies geven een compleet beeld
              van uw exit readiness: bedrijfsaantrekkelijkheid, transactiegereedheid en persoonlijke voorbereiding.
            </p>
          </td></tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:8px 0 0;">
          <tr><td align="center">
            <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a5a6a;text-align:center;">
              Wilt u uw scores bespreken en ontdekken welke stappen het meeste impact hebben?
            </p>
            <a href="https://propasso.nl/contact"
              style="display:inline-block;background:#0b3d5c;color:#ffffff;font-size:15px;font-weight:600;
              text-decoration:none;padding:14px 32px;border-radius:8px;">
              Plan een vrijblijvend gesprek &rarr;
            </a>
          </td></tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f4f6f7;padding:24px 40px;border-top:1px solid #e0e8eb;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td>
              <p style="margin:0;font-size:12px;color:#8a9aaa;">
                &copy; ${new Date().getFullYear()} Propasso &middot; Exit Planning voor het MKB
              </p>
              <p style="margin:4px 0 0;font-size:12px;color:#8a9aaa;">
                <a href="https://propasso.nl/privacyverklaring" style="color:#6a8a9a;text-decoration:underline;">Privacyverklaring</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>

</td></tr></table>
</body></html>`;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    // Parse body
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      logAudit({ function: FUNCTION_NAME, action: "parse", result: "rejected", reason: "invalid_json" });
      return jsonResponse({ error: "Ongeldige request body." }, 400);
    }

    // Validate payload
    const validation = validatePayload(rawBody);
    if (!validation.valid) {
      logAudit({ function: FUNCTION_NAME, action: "validate", result: "rejected", reason: validation.error });
      return jsonResponse({ error: validation.error }, 400);
    }

    const data = validation.data;
    const supabase = createServiceClient();

    // Rate limiting — check IP first (cheaper to reject bots), then email
    const ipCheck = await checkRateLimit(supabase, RATE_LIMIT_CONFIG_IP, clientIp);
    if (!ipCheck.allowed) {
      logAudit({
        function: FUNCTION_NAME,
        action: "rate_limit",
        result: "rejected",
        reason: "ip_limit_exceeded",
        metadata: { ip_prefix: clientIp.substring(0, 8) },
      });
      return jsonResponse({ error: "Te veel verzoeken. Probeer het later opnieuw." }, 429);
    }

    const emailCheck = await checkRateLimit(supabase, RATE_LIMIT_CONFIG_EMAIL, data.email);
    if (!emailCheck.allowed) {
      logAudit({
        function: FUNCTION_NAME,
        action: "rate_limit",
        result: "rejected",
        reason: "email_limit_exceeded",
      });
      return jsonResponse({ error: "Te veel verzoeken voor dit e-mailadres. Probeer het later opnieuw." }, 429);
    }

    // Record rate limit hits (both IP and email)
    await Promise.all([
      recordRateLimitHit(supabase, FUNCTION_NAME, data.email),
      recordRateLimitHit(supabase, `${FUNCTION_NAME}:ip`, clientIp),
    ]);

    // -----------------------------------------------------------------------
    // 1. Submit to HubSpot (fire-and-forget)
    // -----------------------------------------------------------------------
    const hubspotFields: Array<{ objectTypeId: string; name: string; value: string }> = [
      { objectTypeId: "0-1", name: "firstname", value: data.firstName },
      { objectTypeId: "0-1", name: "lastname", value: data.lastName },
      { objectTypeId: "0-1", name: "email", value: data.email },
    ];

    if (data.company) hubspotFields.push({ objectTypeId: "0-1", name: "company", value: data.company });
    if (data.phone) hubspotFields.push({ objectTypeId: "0-1", name: "phone", value: data.phone });

    hubspotFields.push(
      { objectTypeId: "0-1", name: "business_attractiveness_score", value: data.scores.business_attractiveness_score },
      { objectTypeId: "0-1", name: "business_readiness_score", value: data.scores.business_readiness_score },
      { objectTypeId: "0-1", name: "owner_readiness_score", value: data.scores.owner_readiness_score },
      { objectTypeId: "0-1", name: "revenue_band", value: data.snapshot.revenue_band },
      { objectTypeId: "0-1", name: "employee_band", value: data.snapshot.employee_band },
      { objectTypeId: "0-1", name: "role_type", value: data.snapshot.role_type },
      { objectTypeId: "0-1", name: "profitability", value: data.snapshot.profitability },
      { objectTypeId: "0-1", name: "exit_horizon", value: data.snapshot.exit_horizon },
    );

    const hubspotUrl = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

    const hubspotPromise = fetch(hubspotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: hubspotFields,
        context: {
          hutk: null,
          pageUri: "https://propasso.nl/quickscan",
          pageName: "Exit Readiness Quickscan - Propasso",
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "Ik ga akkoord met de privacyverklaring",
            communications: data.newsletter
              ? [{ value: true, subscriptionTypeId: 999, text: "Ik wil graag relevante rapporten en de nieuwsbrief ontvangen." }]
              : [],
          },
        },
      }),
    }).catch((err) => console.error("HubSpot submission failed:", err));

    // -----------------------------------------------------------------------
    // 2. Enqueue branded rapport email
    // -----------------------------------------------------------------------
    const numericScores = {
      attractiveness: parseInt(data.scores.business_attractiveness_score, 10),
      readiness: parseInt(data.scores.business_readiness_score, 10),
      owner: parseInt(data.scores.owner_readiness_score, 10),
    };

    const messageId = `quickscan-rapport-${crypto.randomUUID()}`;
    const unsubscribeToken = crypto.randomUUID();
    const html = buildEmailHtml(data, numericScores);
    const overall = Math.round((numericScores.attractiveness + numericScores.readiness + numericScores.owner) / 3);

    const emailPayload = {
      to: data.email,
      from: "Propasso <info@propasso.nl>",
      sender_domain: "notify.propasso.nl",
      subject: `${escHtml(data.firstName)}, uw Exit Readiness Rapport staat klaar`,
      html,
      text: `Beste ${data.firstName}, bedankt voor het invullen van de Quickscan. Uw totaalscore is ${overall}%. Bekijk uw volledige rapport door deze e-mail in HTML-weergave te openen.`,
      purpose: "transactional",
      label: "quickscan-rapport",
      message_id: messageId,
      idempotency_key: messageId,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    };

    const [logResult, unsubscribeTokenResult, enqueueResult] = await Promise.all([
      supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: "quickscan-rapport",
        recipient_email: data.email,
        status: "pending",
      }),
      supabase.from("email_unsubscribe_tokens").insert({
        email: data.email,
        token: unsubscribeToken,
      }),
      supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: emailPayload,
      }),
    ]);

    if (enqueueResult.error) {
      logAudit({ function: FUNCTION_NAME, action: "enqueue_email", result: "error", reason: enqueueResult.error.message });
    }
    if (logResult.error) {
      logAudit({ function: FUNCTION_NAME, action: "log_email", result: "error", reason: logResult.error.message });
    }
    if (unsubscribeTokenResult.error) {
      logAudit({ function: FUNCTION_NAME, action: "unsubscribe_token", result: "error", reason: unsubscribeTokenResult.error.message });
    }

    await hubspotPromise;

    logAudit({ function: FUNCTION_NAME, action: "submit", result: "ok" });

    return jsonResponse({ success: true });
  } catch (error) {
    logAudit({ function: FUNCTION_NAME, action: "handler", result: "error", reason: String(error) });
    return jsonResponse({ error: "Er is een onverwachte fout opgetreden." }, 500);
  }
});
