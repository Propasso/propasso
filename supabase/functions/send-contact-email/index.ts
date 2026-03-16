import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const HUBSPOT_PORTAL_ID = "147744482";
const HUBSPOT_FORM_GUID = "d5ed24d9-8667-4f3a-ac38-3efe6e17d03e";
const HUBSPOT_REGION = "eu1";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MINUTES = 60;

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  newsletter?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, newsletter } = await req.json() as ContactPayload;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Naam, e-mail en bericht zijn verplicht.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Ongeldig e-mailadres.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (name.length > 200 || email.length > 255 || (phone && phone.length > 30) || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Invoer te lang.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const cutoff = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("rate_limit_log")
      .select("*", { count: "exact", head: true })
      .eq("function_name", "send-contact-email")
      .eq("identifier", email)
      .gte("created_at", cutoff);

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await supabase.from("rate_limit_log").insert({
      function_name: "send-contact-email",
      identifier: email,
    });

    // Split name into first and last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Build HubSpot form fields
    const fields: Array<{ objectTypeId: string; name: string; value: string }> = [
      { objectTypeId: "0-1", name: "firstname", value: firstName },
      { objectTypeId: "0-1", name: "lastname", value: lastName },
      { objectTypeId: "0-1", name: "email", value: email },
      { objectTypeId: "0-1", name: "message", value: message },
    ];

    if (phone) {
      fields.push({ objectTypeId: "0-1", name: "phone", value: phone });
    }

    // Submit to HubSpot Forms API v3
    const hubspotUrl = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

    const res = await fetch(hubspotUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    });

    const resultText = await res.text();

    if (!res.ok) {
      console.error('HubSpot Forms API error:', res.status, resultText);
      return new Response(
        JSON.stringify({ error: 'Formulier kon niet worden verzonden.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Er is een onverwachte fout opgetreden.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
