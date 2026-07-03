
# HubSpot Tracking Code installeren

Je hebt het HubSpot embed script gevonden met account ID `147744482`. Ik ga dit netjes inbouwen, maar **niet** rechtstreeks in `index.html`. Reden: HubSpot tracking valt onder de categorie "Statistieken" in jullie cookie consent (zie `SERVICE_CATEGORIES` in `use-cookie-consent.tsx`) en de AVG vereist dat we het script pas laden nadat de bezoeker daar toestemming voor geeft. Direct in `index.html` plakken zou die consent-logica omzeilen en een compliance-probleem worden.

## Aanpak

### 1. Nieuwe component `src/components/HubSpotTracking.tsx`
- Gebruikt `useCookieConsent()` en checkt `hasConsent("statistics")`
- Injecteert dynamisch één keer:
  ```html
  <script type="text/javascript" id="hs-script-loader" async defer
          src="//js-eu1.hs-scripts.com/147744482.js"></script>
  ```
- Guard tegen dubbel inladen (check op bestaand `#hs-script-loader`)
- Bij intrekken consent: script blijft geladen tot pagina-refresh (HubSpot verwijdert zijn eigen cookies niet retroactief; dit is standaard gedrag)

### 2. `src/App.tsx`
- `<HubSpotTracking />` toevoegen binnen `CookieConsentProvider`, naast `CookieConsent` en `CookieConsentTrigger`

### 3. `src/pages/Cookieverklaring.tsx` (optioneel, alleen als je wilt)
- Vermelding toevoegen dat HubSpot tracking cookies gebruikt onder categorie "Statistieken" — kan ik doen als je aangeeft dat dit gewenst is

## Wat we NIET doen
- Script niet in `index.html` plaatsen (consent-omzeiling)
- Geen wijzigingen aan de HubSpot Meetings embed of contactformulieren (die werken al)
- Geen chatflow embed nu — dat is een aparte stap

## Resultaat
- Bezoekers die "Alles accepteren" of "Statistieken" aanvinken → HubSpot tracking laadt
- Bezoekers die weigeren → geen HubSpot script, geen cookies
- Werkt op alle pagina's automatisch via `App.tsx`

Zeg maar of ik dit zo mag implementeren.
