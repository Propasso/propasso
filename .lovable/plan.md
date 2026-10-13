# Quickscan: privacy, HubSpot-koppeling en pushmelding

## 1. Privacy-aanpassingen Quickscan controleren
- Toestemmingstekst, nieuwsbrief-keuze en bewaartermijn in het Quickscan-formulier en het terugbelverzoek gelijktrekken met het contactformulier.
- Rapport-e-mail blijft altijd verstuurd worden (dat is de dienst waar de bezoeker om vraagt), ook zonder cookie-toestemming.

## 2. Quickscan beter koppelen aan HubSpot
Nu stuurt de site de Quickscan naar HubSpot zonder bezoekerskenmerk. HubSpot maakt wel een contact aan, maar kan het niet koppelen aan eerdere bezoeken.
- Als de bezoeker statistiek-cookies heeft geaccepteerd: het HubSpot-bezoekerskenmerk (`hubspotutk`) meesturen, plus de echte pagina-URL. Dan ziet HubSpot welke pagina's iemand bekeek voor hij de Quickscan deed.
- Zonder toestemming: niets meesturen (zoals nu). Het contact en de workflow-trigger werken dan nog steeds.
- Zelfde aanpassing voor het contactformulier en het terugbelverzoek.
- De formulierinzending blijft dé trigger in HubSpot: elke ingevulde Quickscan = één inzending op het Quickscan-formulier, ook als het rapport is verstuurd.

## 3. Pushmelding via de HubSpot-app (geen bouwwerk op de site)
Stappenplan in HubSpot, dat ik na afronding toelicht:
1. Installeer de HubSpot-app op je telefoon en zet meldingen aan.
2. Automatisering > Workflows > Nieuw, op basis van contact.
3. Trigger: "Heeft formulier ingevuld" = Exit Readiness Quickscan formulier. Herinschrijving aan, zodat een tweede Quickscan ook meldt.
4. Actie: "Interne melding sturen" > In-app/push naar Karel. Tekst bv. "Nieuwe Quickscan: [voornaam] [achternaam], [bedrijf], scores [x/y/z]".
5. Optioneel: taak "Bel binnen 24 uur" en een vertakking op hoge score of exit-horizon < 3 jaar.
6. Testen met een eigen Quickscan.

Best practice: melding via HubSpot houdt alles op één plek, kost niets extra en vraagt geen eigen app of Firebase.

## Technische details
- `QuickscanLeadForm.tsx`, `CallbackRequestModal.tsx`, `Contact.tsx`: bij `hasConsent("statistics")` cookie `hubspotutk` en `window.location.href` meesturen.
- `send-diagnose-results`, `send-callback-request`, `send-contact-email`: optionele `hutk` (gevalideerd, hex 32 tekens) en `pageUri` (alleen propasso.nl) doorgeven in `context`.
- Functies opnieuw uitrollen; met een testinzending controleren dat HubSpot 200 teruggeeft.
