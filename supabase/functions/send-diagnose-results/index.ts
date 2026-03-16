import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const HUBSPOT_PORTAL_ID = "147744482";
const HUBSPOT_FORM_GUID = "bcfa7a30-7cbb-4658-9dac-4b2f76b38c96";

interface DiagnosePayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  newsletter?: boolean;
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

// ---------------------------------------------------------------------------
// Score helpers (mirrors client-side logic)
// ---------------------------------------------------------------------------

type ScoreLevel = "orientation" | "foundation" | "good" | "ready";

function getScoreLevel(percentage: number): ScoreLevel {
  if (percentage <= 33) return "orientation";
  if (percentage <= 55) return "foundation";
  if (percentage <= 75) return "good";
  return "ready";
}

const scoreLevelLabels: Record<ScoreLevel, string> = {
  orientation: "Oriëntatiefase",
  foundation: "Fundamenten aanwezig",
  good: "Goed op weg",
  ready: "Transactiegereed",
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
      "Breng in kaart welk percentage omzet afhankelijk is van uw top-3 klanten. Streef naar maximaal 15% per klant.",
      "Documenteer uw persoonlijke taken en begin met het delegeren van klantrelaties aan uw team.",
    ],
    foundation: [
      "Werk actief aan klantspreiding door nieuwe marktsegmenten te benaderen.",
      "Investeer in een tweede managementlaag die operationele beslissingen zelfstandig kan nemen.",
    ],
    good: [
      "Test uw bedrijfscontinuïteit door periodiek afwezig te zijn en de resultaten te monitoren.",
      "Optimaliseer uw klantcontracten met langere looptijden en automatische verlengingen.",
    ],
    ready: [
      "Laat een externe partij uw bedrijfscontinuïteit valideren om dit richting kopers te onderbouwen.",
      "Documenteer uw groeistrategie en marktpotentieel als verkoopargument.",
    ],
  },
  readiness: {
    orientation: [
      "Laat uw jaarrekeningen van de afgelopen drie jaar door een accountant controleren en normaliseren.",
      "Maak een inventarisatie van alle lopende contracten, vergunningen en overeenkomsten.",
    ],
    foundation: [
      "Implementeer maandelijkse managementrapportages met de belangrijkste financiële en operationele KPI's.",
      "Zorg dat alle contracten op naam van de BV staan, niet op uw persoonlijke naam.",
    ],
    good: [
      "Laat een fiscalist de holdingstructuur beoordelen op optimale overdrachtsgereedheid.",
      "Bereid een vendor due diligence-rapport voor om het verkoopproces te versnellen.",
    ],
    ready: [
      "Laat een proef-due diligence uitvoeren om eventuele verrassingen vóór te zijn.",
      "Bespreek met uw adviseur de optimale transactiestructuur (share deal vs. asset deal).",
    ],
  },
  owner: {
    orientation: [
      "Maak een persoonlijk financieel plan: hoeveel vermogen heeft u nodig om comfortabel te leven na de verkoop?",
      "Denk na over wat u na de verkoop wilt doen — ondernemerschap, advieswerk, reizen, of iets anders.",
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
// HTML email template
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
              ${label}
              <span style="float:right;font-weight:400;font-size:13px;color:${color};">
                ${pct}% — ${levelLabel}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <div style="background:#e8eeef;border-radius:6px;height:10px;overflow:hidden;">
                <div style="background:${color};width:${pct}%;height:100%;border-radius:6px;"></div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function buildTipsSection(
  dimension: string,
  label: string,
  pct: number
): string {
  const level = getScoreLevel(pct);
  const tips = tipsByDimension[dimension]?.[level] ?? [];
  if (tips.length === 0) return "";

  const tipsHtml = tips
    .map(
      (tip) =>
        `<li style="padding:6px 0;font-size:14px;line-height:1.6;color:#3a5a6a;">${tip}</li>`
    )
    .join("");

  return `
    <tr>
      <td style="padding:16px 0 8px;">
        <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#1a3a4a;">${label}</p>
        <ul style="margin:0;padding-left:20px;">${tipsHtml}</ul>
      </td>
    </tr>`;
}

function buildEmailHtml(
  firstName: string,
  scores: { attractiveness: number; readiness: number; owner: number },
  snapshot: DiagnosePayload["snapshot"]
): string {
  const overall = Math.round(
    (scores.attractiveness + scores.readiness + scores.owner) / 3
  );
  const overallLevel = getScoreLevel(overall);
  const overallColor = scoreLevelColors[overallLevel];
  const overallLabel = scoreLevelLabels[overallLevel];

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
            <td width="60" align="right" valign="top">
              <div style="width:48px;height:48px;background:rgba(200,240,80,0.2);border-radius:50%;text-align:center;line-height:48px;font-size:20px;">🏔️</div>
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
          ${buildScoreBar("Aantrekkelijkheid van het Bedrijf", scores.attractiveness)}
          ${buildScoreBar("Verkoopklaarheid van het Bedrijf", scores.readiness)}
          ${buildScoreBar("Verkoopklaarheid van de Ondernemer", scores.owner)}
        </table>

        <!-- Context -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="margin:24px 0;background:#f8fafa;border-radius:8px;border:1px solid #e0e8eb;">
          <tr><td style="padding:20px;">
            <p style="margin:0 0 10px;font-size:14px;font-weight:600;color:#1a3a4a;">Uw bedrijfsprofiel</p>
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:13px;color:#3a5a6a;">
              <tr><td style="padding:3px 0;" width="45%">Omzet</td><td style="padding:3px 0;">${snapshot.revenue_band}</td></tr>
              <tr><td style="padding:3px 0;">Medewerkers</td><td style="padding:3px 0;">${snapshot.employee_band}</td></tr>
              <tr><td style="padding:3px 0;">Rol</td><td style="padding:3px 0;">${snapshot.role_type}</td></tr>
              <tr><td style="padding:3px 0;">Winstgevendheid</td><td style="padding:3px 0;">${snapshot.profitability}</td></tr>
              <tr><td style="padding:3px 0;">Overdrachtshorizon</td><td style="padding:3px 0;">${snapshot.exit_horizon}</td></tr>
            </table>
          </td></tr>
        </table>

        <!-- Tips per dimension -->
        <p style="margin:24px 0 8px;font-size:18px;font-weight:700;color:#1a3a4a;">Aanbevelingen per dimensie</p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#3a5a6a;">
          Op basis van uw scores hebben wij per dimensie de twee meest relevante aanbevelingen geselecteerd.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${buildTipsSection("attractiveness", "Aantrekkelijkheid van het Bedrijf", scores.attractiveness)}
          ${buildTipsSection("readiness", "Verkoopklaarheid van het Bedrijf", scores.readiness)}
          ${buildTipsSection("owner", "Verkoopklaarheid van de Ondernemer", scores.owner)}
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
              Plan een vrijblijvend gesprek →
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
                © ${new Date().getFullYear()} Propasso · Exit Planning voor het MKB
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

  try {
    const payload = (await req.json()) as DiagnosePayload;
    const { name, email, company, phone, newsletter, scores, snapshot } =
      payload;

    // Validate required fields
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Naam en e-mail zijn verplicht." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Ongeldig e-mailadres." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // -----------------------------------------------------------------------
    // 1. Submit to HubSpot (fire-and-forget — don't block on failure)
    // -----------------------------------------------------------------------
    const hubspotFields: Array<{
      objectTypeId: string;
      name: string;
      value: string;
    }> = [
      { objectTypeId: "0-1", name: "firstname", value: firstName },
      { objectTypeId: "0-1", name: "lastname", value: lastName },
      { objectTypeId: "0-1", name: "email", value: email },
    ];

    if (company)
      hubspotFields.push({
        objectTypeId: "0-1",
        name: "company",
        value: company,
      });
    if (phone)
      hubspotFields.push({
        objectTypeId: "0-1",
        name: "phone",
        value: phone,
      });

    hubspotFields.push(
      {
        objectTypeId: "0-1",
        name: "business_attractiveness_score",
        value: scores.business_attractiveness_score,
      },
      {
        objectTypeId: "0-1",
        name: "business_readiness_score",
        value: scores.business_readiness_score,
      },
      {
        objectTypeId: "0-1",
        name: "owner_readiness_score",
        value: scores.owner_readiness_score,
      },
      {
        objectTypeId: "0-1",
        name: "revenue_band",
        value: snapshot.revenue_band,
      },
      {
        objectTypeId: "0-1",
        name: "employee_band",
        value: snapshot.employee_band,
      },
      { objectTypeId: "0-1", name: "role_type", value: snapshot.role_type },
      {
        objectTypeId: "0-1",
        name: "profitability",
        value: snapshot.profitability,
      },
      {
        objectTypeId: "0-1",
        name: "exit_horizon",
        value: snapshot.exit_horizon,
      }
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
            communications: newsletter
              ? [
                  {
                    value: true,
                    subscriptionTypeId: 999,
                    text: "Ik wil graag relevante rapporten en de nieuwsbrief ontvangen.",
                  },
                ]
              : [],
          },
        },
      }),
    }).catch((err) => console.error("HubSpot submission failed:", err));

    // -----------------------------------------------------------------------
    // 2. Enqueue branded rapport email
    // -----------------------------------------------------------------------
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const numericScores = {
      attractiveness: parseInt(scores.business_attractiveness_score, 10),
      readiness: parseInt(scores.business_readiness_score, 10),
      owner: parseInt(scores.owner_readiness_score, 10),
    };

    const messageId = `quickscan-rapport-${crypto.randomUUID()}`;
    const unsubscribeToken = crypto.randomUUID();
    const html = buildEmailHtml(firstName, numericScores, snapshot);

    const emailPayload = {
      to: email,
      from: "Propasso <info@propasso.nl>",
      sender_domain: "notify.propasso.nl",
      subject: `${firstName}, uw Exit Readiness Rapport staat klaar`,
      html,
      text: `Beste ${firstName}, bedankt voor het invullen van de Quickscan. Uw totaalscore is ${Math.round((numericScores.attractiveness + numericScores.readiness + numericScores.owner) / 3)}%. Bekijk uw volledige rapport door deze e-mail in HTML-weergave te openen.`,
      purpose: "transactional",
      label: "quickscan-rapport",
      message_id: messageId,
      idempotency_key: messageId,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    };

    // Log pending + persist unsubscribe token + enqueue in parallel
    const [logResult, unsubscribeTokenResult, enqueueResult] = await Promise.all([
      supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: "quickscan-rapport",
        recipient_email: email,
        status: "pending",
      }),
      supabase.from("email_unsubscribe_tokens").insert({
        email,
        token: unsubscribeToken,
      }),
      supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: emailPayload,
      }),
    ]);

    if (enqueueResult.error) {
      console.error("Failed to enqueue email:", enqueueResult.error);
      // Still return success — HubSpot submission may have succeeded
    }
    if (logResult.error) {
      console.error("Failed to log email:", logResult.error);
    }

    // Wait for HubSpot (non-blocking — already started)
    await hubspotPromise;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Er is een onverwachte fout opgetreden." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
