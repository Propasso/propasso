

## Plan: Contactpagina Redesign

### Overzicht
Volledige herschrijving van `src/pages/Contact.tsx` — van 6 rommelige secties naar 4 gestructureerde secties met conversiehiërarchie.

### Sectie-indeling

**1. Hero** (`bg-background`)
- Persoonlijke kop: "Laten we kennismaken"
- Subtekst: verwachtingsmanagement (open gesprek, geen verplichtingen)
- Eén primaire CTA (lime, rounded-full) die smooth-scrollt naar agenda-sectie
- Karel-foto rechts met teal-tint overlay
- Mobiel: foto verborgen, CTA full-width

**2. Twee contactpaden** (`section-neutral-bg`)
- `lg:grid-cols-5` layout (3/5 + 2/5)
- **Pad A (primair, 3/5):** HubSpotMeetingsEmbed in kaart met korte intro
- **Pad B (secundair, 2/5):** Drie compacte contactitems (Bellen, WhatsApp, E-mail) + bereikbaarheidstekst
- WhatsApp via `wa.me/31610057566` link met vooringevuld bericht
- WhatsApp-icoon: `MessageCircle` uit lucide-react (of inline SVG)
- LinkedIn-tegels verwijderd
- Mobiel: paden onder elkaar, agenda bovenaan

**3. Contactformulier + vertrouwen** (`section-alt-bg`, mint)
- `lg:grid-cols-5` (2/5 + 3/5), zelfde patroon als huidig
- Links: kop, verwachtingstekst, 3 checkmarks, testimonial-citaat (placeholder)
- Rechts: bestaand formulier (Zod, react-hook-form, Supabase edge function, ConsentCheckboxes)
- **Navy button** (geen lime op mint achtergrond)
- Bestaande `onSubmit`, succesbericht, en form state volledig behouden

**4. Locatie + afsluitende CTA** (`bg-background` + `bg-primary`)
- Compact adresblok (geen Google Maps embed, `GoogleMapsEmbed` component verwijderd)
- Adres + "Bekijk op Google Maps" link
- Navy CTA-balk met één kop + twee buttons: "Bel direct" (accent/lime) + "Plan een kennismaking" (outline wit, scrollt naar agenda)

### Technische details

**Behouden:**
- Alle imports: `PageLayout`, `SEO`, `Form`/`FormField` etc., `Input`, `Textarea`, `Button`, `ConsentCheckboxes`, `HubSpotMeetingsEmbed`, `useToast`, `pushEvent`
- `contactSchema` (Zod), `onSubmit` handler, Supabase `send-contact-email` edge function
- SEO component + JSON-LD structured data
- Framer Motion `fadeUp` variant (spaarzaam gebruikt)
- `karelImg` import

**Verwijderd:**
- `GoogleMapsEmbed` component + `useCookieConsent` import (niet meer nodig)
- LinkedIn contactopties
- `MapPinned` import (niet meer nodig)
- Dubbele telefoon/mail CTA's

**Toegevoegd:**
- WhatsApp contactoptie met `wa.me` link
- Smooth scroll naar agenda-sectie via `id="agenda"` + `scrollIntoView`
- Testimonial placeholder blok
- WhatsApp in JSON-LD `sameAs` array

**Bestand:** Alleen `src/pages/Contact.tsx` wordt herschreven. Geen andere bestanden wijzigen.

