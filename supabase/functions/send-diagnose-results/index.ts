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
    { windowMinutes: 1, maxRequests: 1 },
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
const ALLOWED_PROFITABILITY = [
  "Onder druk of dalend",
  "Rond break-even",
  "Redelijke winst maar weinig marge",
  "Goed winstgevend met gezonde marges",
] as const;
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
  profitability: {
    [aliasKey("Verlieslatend")]: "Onder druk of dalend",
    [aliasKey("Break-even")]: "Rond break-even",
    [aliasKey("Lage winst")]: "Redelijke winst maar weinig marge",
    [aliasKey("Gezonde winst")]: "Goed winstgevend met gezonde marges",
    [aliasKey("Zeer winstgevend")]: "Goed winstgevend met gezonde marges",
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

const ALLOWED_PAYLOAD_KEYS = ["name", "email", "company", "phone", "newsletter", "scores", "snapshot", "answers"] as const;

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

  // Validate snapshot (3 fields)
  const snap = obj.snapshot as Record<string, unknown> | undefined;
  if (!snap || typeof snap !== "object") return { valid: false, error: "Snapshot ontbreekt." };

  const revenue_band = validateSnapshotEnum(snap.revenue_band, ALLOWED_REVENUE, SNAPSHOT_ALIASES.revenue);
  const profitability = validateSnapshotEnum(snap.profitability, ALLOWED_PROFITABILITY, SNAPSHOT_ALIASES.profitability);
  const exit_horizon = validateSnapshotEnum(snap.exit_horizon, ALLOWED_HORIZON, SNAPSHOT_ALIASES.horizon);

  if (!revenue_band || !profitability || !exit_horizon) {
    const failedFields = [];
    if (!revenue_band) failedFields.push(`revenue_band=${JSON.stringify(snap.revenue_band)}`);
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
      snapshot: { revenue_band, profitability, exit_horizon },
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

const scoreLevelDescriptions: Record<ScoreLevel, string> = {
  orientation:
    "De basis voor een overdraagbaar bedrijf is nog beperkt ontwikkeld. Een verkoopproces zou momenteel waarschijnlijk leiden tot een lage waardering of beperkte interesse van kopers.",
  foundation:
    "Er zijn duidelijke fundamenten aanwezig, maar meerdere factoren beperken de aantrekkelijkheid of verkoopbaarheid van je bedrijf. Gerichte verbeteringen kunnen de waarde en verkoopbaarheid significant verhogen.",
  good:
    "Het bedrijf heeft een solide fundament en meerdere kenmerken die aantrekkelijk zijn voor kopers of investeerders. Met gerichte verbeteringen ben je goed op weg.",
  ready:
    "Je bedrijf heeft de kenmerken van een goed overdraagbare onderneming. Zorg dat je ook persoonlijk klaar bent voor de volgende stap.",
};

// ---------------------------------------------------------------------------
// Per-question tips (mirrors client-side questionTips)
// ---------------------------------------------------------------------------

interface QuestionTip {
  critical: string;
  improvement: string;
  strong: string;
}

const questionTips: Record<number, QuestionTip> = {
  6: {
    critical: "Als je niet kunt voorspellen wat je gaat draaien, kan een koper dat ook niet. Voorspelbare omzet is de basis van een gezonde waardering.",
    improvement: "Er is enige voorspelbaarheid, maar er is ruimte om dit te versterken. Denk aan langere contracttermijnen of abonnementsmodellen.",
    strong: "Sterke omzetvoorspelbaarheid. Dit is aantrekkelijk voor kopers.",
  },
  7: {
    critical: "Hoge klantconcentratie is een van de sterkste rode vlaggen bij bedrijfsoverdracht. Begin nu met het diversifiëren van je klantenbestand.",
    improvement: "Je klantspreiding is redelijk maar niet optimaal. Werk actief aan het verkleinen van de afhankelijkheid van je grootste klanten.",
    strong: "Goede klantspreiding. Dit vermindert het risicoprofiel aanzienlijk.",
  },
  8: {
    critical: "Terugkerende omzet is de nummer 1 waarde-driver. Zonder contractuele omzetzekerheid is je bedrijf fundamenteel minder waard.",
    improvement: "Er is een basis aan terugkerende omzet. Vergroot dit aandeel door bestaande klantrelaties om te zetten naar contractuele afspraken.",
    strong: "Uitstekend. Een hoog aandeel terugkerende omzet is het sterkste verkoopargument.",
  },
  9: {
    critical: "Als het bedrijf niet zonder jou kan, koopt een koper een risico. Begin met het delegeren van je meest kritieke taken.",
    improvement: "Het bedrijf heeft enige zelfstandigheid, maar is nog te afhankelijk van jou. Werk aan het formaliseren van verantwoordelijkheden.",
    strong: "Een bedrijf dat kan draaien zonder de eigenaar is fundamenteel meer waard.",
  },
  10: {
    critical: "Zonder duidelijke positionering ben je inwisselbaar. Definieer scherper waarin je uniek bent en voor wie.",
    improvement: "Je hebt een positie, maar die is nog niet scherp genoeg. Werk aan je onderscheidend vermogen.",
    strong: "Goed gepositioneerd. Een duidelijke marktpositie maakt je bedrijf aantrekkelijker.",
  },
  11: {
    critical: "Een koper die geen helder beeld kan krijgen, haakt af. Investeer in heldere rapportages en een overzichtelijke administratie.",
    improvement: "De basis staat, maar een externe partij zou te lang nodig hebben om je bedrijf te doorgronden.",
    strong: "Goed. Financiële transparantie versnelt het due diligence proces.",
  },
  12: {
    critical: "Relaties op jouw naam in plaats van op de BV zijn een risico bij overdracht. Begin met formaliseren.",
    improvement: "Een deel is vastgelegd, maar check of alle kritieke relaties juridisch overdraagbaar zijn.",
    strong: "Goed geregeld. Contractuele overdraagbaarheid is een belangrijke randvoorwaarde.",
  },
  13: {
    critical: "Als kennis alleen in hoofden zit, verliest een koper die kennis bij vertrek van sleutelpersonen.",
    improvement: "Er is een begin gemaakt, maar de vastlegging is niet compleet of actueel.",
    strong: "Gedocumenteerde processen verhogen de overdraagbaarheid en verlagen het risico voor kopers.",
  },
  14: {
    critical: "Laat een fiscalist of jurist met M&A-ervaring je structuur beoordelen. Dit kan je tonnen schelen bij een deal.",
    improvement: "Je bent op de hoogte maar er zijn nog openstaande punten. Pak de aanbevelingen van je adviseur op.",
    strong: "Goed voorbereid. Een doordachte structuur is een groot voordeel bij onderhandeling.",
  },
  15: {
    critical: "Kopers kopen de toekomst, niet het verleden. Zonder concreet groeiplan ontbreekt het verkoopverhaal.",
    improvement: "Er zijn ideeën over groei, maar ze zijn nog niet uitgewerkt of presentabel.",
    strong: "Een helder groeiverhaal is een van de belangrijkste waardebepalers.",
  },
  16: {
    critical: "Zonder dit getal kun je geen exit-strategie bepalen. Laat een wealth gap analyse maken.",
    improvement: "Je hebt een globaal idee, maar het is nog niet scherp genoeg. Werk het uit met een financieel adviseur.",
    strong: "Je weet wat je nodig hebt. Dat is de basis voor elke exit-strategie.",
  },
  17: {
    critical: "75% van ondernemers die dit overslaan heeft spijt binnen een jaar na verkoop. Ga dit gesprek aan.",
    improvement: "Je denkt erover na, maar het is nog vaag. Maak het concreter. Praat erover met je partner.",
    strong: "Een concreet persoonlijk plan na de exit voorkomt het 'zwarte gat' waar veel ondernemers in vallen.",
  },
  18: {
    critical: "Als je niet actief loslaat, groeit het bedrijf niet voorbij jou. Begin met het delegeren van één verantwoordelijkheid per maand.",
    improvement: "Je bent begonnen met loslaten, maar het gaat nog niet systematisch.",
    strong: "Actief delegeren bouwt tegelijkertijd bedrijfswaarde en persoonlijke vrijheid.",
  },
  19: {
    critical: "Een boekhouder en notaris zijn niet genoeg. Je hebt specialisten nodig met ervaring in bedrijfsoverdrachten.",
    improvement: "Je hebt goede adviseurs, maar ze missen M&A-ervaring. Vul je team aan.",
    strong: "De juiste adviseurs aan tafel geeft vertrouwen en beschermt je belangen.",
  },
  20: {
    critical: "De beste deals worden gesloten door ondernemers die ruim op tijd beginnen. Als het nog niet urgent voelt, is dat juist het moment om te starten.",
    improvement: "Je voelt dat het eraan komt. Gebruik die energie om nu de eerste concrete stappen te zetten.",
    strong: "Urgentie gecombineerd met een plan is de sterkste uitgangspositie.",
  },
};

function getQuestionTip(questionId: number, score: number): string {
  const tips = questionTips[questionId];
  if (!tips) return "";
  if (score <= 2) return tips.critical;
  if (score <= 4) return tips.improvement;
  return tips.strong;
}

// Question texts (mirrors client-side)
const questionTexts: Record<number, string> = {
  6: "Onze omzet is voorspelbaar",
  7: "Klantspreiding",
  8: "Terugkerende omzet",
  9: "Eigenaarsonafhankelijkheid",
  10: "Marktpositie",
  11: "Financiële transparantie",
  12: "Contracten en overdraagbaarheid",
  13: "Procesvastlegging",
  14: "Juridische en fiscale structuur",
  15: "Groeiplan",
  16: "Financieel doelbeeld",
  17: "Persoonlijk plan na verkoop",
  18: "Loslaten en delegeren",
  19: "Adviesteam",
  20: "Urgentie",
};

// ---------------------------------------------------------------------------
// Find top priorities (lowest scoring questions)
// ---------------------------------------------------------------------------

function getTopPriorities(answers: Record<string, string>, count = 3): Array<{ id: number; score: number }> {
  const diagnosticIds = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const scored = diagnosticIds
    .map((id) => ({ id, score: parseInt(answers[String(id)] || "1", 10) }))
    .sort((a, b) => a.score - b.score);

  // Prefer variety across dimensions
  const result: typeof scored = [];
  const usedDims = new Set<string>();

  for (const item of scored) {
    if (result.length >= count) break;
    const dim = item.id <= 10 ? "A" : item.id <= 15 ? "R" : "O";
    if (result.length < count - 1 || !usedDims.has(dim)) {
      result.push(item);
      usedDims.add(dim);
    }
  }

  while (result.length < count && scored.length > result.length) {
    const next = scored.find((s) => !result.find((r) => r.id === s.id));
    if (next) result.push(next);
    else break;
  }

  return result.slice(0, count);
}

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

function buildPriorityItem(id: number, score: number): string {
  const label = questionTexts[id] || `Vraag ${id}`;
  const tip = getQuestionTip(id, score);
  const dotColor = score <= 2 ? "#e04040" : "#e8912a";

  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eef2f3;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td width="12" valign="top" style="padding-top:4px;">
              <div style="width:8px;height:8px;border-radius:50%;background:${dotColor};"></div>
            </td>
            <td style="padding-left:10px;">
              <p style="margin:0;font-size:14px;font-weight:600;color:#1a3a4a;">${escHtml(label)} <span style="font-weight:400;color:#8a9aaa;">(${score}/6)</span></p>
              <p style="margin:6px 0 0;font-size:13px;line-height:1.6;color:#3a5a6a;">${escHtml(tip)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function buildEmailHtml(
  data: ValidatedPayload,
  numericScores: { attractiveness: number; readiness: number; owner: number },
  answers: Record<string, string>,
): string {
  const firstName = escHtml(data.firstName);
  const overall = Math.round((numericScores.attractiveness + numericScores.readiness + numericScores.owner) / 3);
  const overallLevel = getScoreLevel(overall);
  const overallColor = scoreLevelColors[overallLevel];
  const overallLabel = escHtml(scoreLevelLabels[overallLevel]);
  const overallDescription = escHtml(scoreLevelDescriptions[overallLevel]);

  const snap = {
    revenue_band: escHtml(data.snapshot.revenue_band),
    profitability: escHtml(data.snapshot.profitability),
    exit_horizon: escHtml(data.snapshot.exit_horizon),
  };

  const priorities = getTopPriorities(answers);
  const prioritiesHtml = priorities.map((p) => buildPriorityItem(p.id, p.score)).join("");

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Uw Propasso Exit Readiness Quickscan — Persoonlijk Rapport</title></head>
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
              <p style="margin:0;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.7);">Persoonlijk Rapport</p>
              <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
                Exit Readiness Quickscan
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
          Bedankt voor het invullen van de Exit Readiness Quickscan. Hieronder vindt u uw persoonlijke rapport.
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
          <tr>
            <td style="padding:0 24px 20px;text-align:center;">
              <p style="margin:0;font-size:13px;line-height:1.5;color:#3a5a6a;">${overallDescription}</p>
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
          <tr><td style="padding:16px 20px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1a3a4a;">Uw bedrijfsprofiel</p>
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:13px;color:#3a5a6a;">
              <tr><td style="padding:3px 0;" width="45%">Jaaromzet</td><td style="padding:3px 0;">${snap.revenue_band}</td></tr>
              <tr><td style="padding:3px 0;">Winstgevendheid</td><td style="padding:3px 0;">${snap.profitability}</td></tr>
              <tr><td style="padding:3px 0;">Overdrachtshorizon</td><td style="padding:3px 0;">${snap.exit_horizon}</td></tr>
            </table>
          </td></tr>
        </table>

        <!-- Top priorities -->
        <p style="margin:24px 0 8px;font-size:18px;font-weight:700;color:#1a3a4a;">Uw top prioriteiten</p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#3a5a6a;">
          Op basis van uw scores zijn dit de onderdelen waar de meeste winst te behalen is.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${prioritiesHtml}
        </table>

        <!-- Methodology note -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="margin:28px 0;border-left:3px solid #c8e848;background:#fafcf0;border-radius:0 8px 8px 0;">
          <tr><td style="padding:16px 20px;">
            <p style="margin:0;font-size:13px;line-height:1.6;color:#3a5a6a;">
              <strong style="color:#1a3a4a;">Over de methodiek</strong><br>
              Deze quickscan is gebaseerd op de internationaal erkende Value Acceleration Methodology,
              vertaald naar de praktijk van het Nederlandse MKB.
            </p>
          </td></tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:8px 0 0;">
          <tr><td>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a5a6a;">
              Heeft u vragen over uw resultaten, of wilt u bespreken wat de volgende stap kan zijn?
            </p>
            <a href="https://propasso.nl/contact"
              style="display:inline-block;background:#0b3d5c;color:#ffffff;font-size:15px;font-weight:600;
              text-decoration:none;padding:14px 32px;border-radius:8px;">
              Plan een vrijblijvend gesprek &rarr;
            </a>
            <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#3a5a6a;">
              Met vriendelijke groet,<br><br>
              <strong style="color:#1a3a4a;">Karel Cremers</strong><br>
              Propasso — Exit Planning voor het MKB
            </p>
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

    // Build a simple answers map for priority extraction
    // The client doesn't send raw answers, so we reconstruct approximate scores from percentages
    // For top priorities we need individual question scores — we'll pass them if available
    const rawBody2 = rawBody as Record<string, unknown>;
    const answersMap: Record<string, string> = {};
    if (rawBody2.answers && typeof rawBody2.answers === "object") {
      for (const [k, v] of Object.entries(rawBody2.answers as Record<string, unknown>)) {
        if (typeof v === "string") answersMap[k] = v;
      }
    }

    const messageId = `quickscan-rapport-${crypto.randomUUID()}`;
    const unsubscribeToken = crypto.randomUUID();
    const html = buildEmailHtml(data, numericScores, answersMap);
    const overall = Math.round((numericScores.attractiveness + numericScores.readiness + numericScores.owner) / 3);

    const emailPayload = {
      to: data.email,
      from: "Propasso <info@propasso.nl>",
      sender_domain: "notify.propasso.nl",
      subject: `Uw Propasso Exit Readiness Quickscan — Persoonlijk Rapport`,
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
