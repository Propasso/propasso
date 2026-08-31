# Knop "Opslaan als pdf" op de juridische pagina's

## Doel

Bezoekers kunnen de algemene voorwaarden zelf als PDF opslaan of printen, zonder dat jij ooit een PDF-bestand hoeft te uploaden of te vervangen. De knop gebruikt de printfunctie van de browser ("Opslaan als pdf" is daar een standaardoptie), dus de PDF bevat altijd automatisch de actuele tekst uit het CMS.

## Wat er komt

### 1. Knop op een zichtbare plek
Direct onder de titel, naast de bestaande regel "Laatst bijgewerkt op 30 augustus 2026": een compacte knop met printicoon en label "Opslaan als pdf". Outline-stijl in navy, passend bij de rest van de site. Zichtbaar zonder scrollen, ook op mobiel.

### 2. Printvriendelijke weergave
Zodat het opgeslagen bestand er professioneel uitziet:

- Header, footer, breadcrumb, cookiebanner en de knop zelf verdwijnen in print
- Zwarte tekst op wit, compactere regelafstand, nette marges
- Titel, versiedatum en KvK-regel blijven bovenaan staan
- Artikelkoppen breken niet los van hun tekst over een paginagrens

### 3. Zelfde knop op de andere juridische pagina's
Disclaimer en privacyverklaring gebruiken hetzelfde `LegalPage`-component, dus die krijgen de knop er gratis bij. Dat is consistent en vereist geen extra werk.

## Buiten scope

- Geen PDF-bestand in de site, geen backend-functie, geen versiearchief.
- Geen inhoudelijke wijziging aan de voorwaarden.

## Technische details

- **Edit** `src/components/LegalPage.tsx`: knop naast de `lastUpdated`-regel die `window.print()` aanroept, met `Printer` icoon uit lucide-react en de bestaande shadcn `Button` (variant outline, size sm). Wrapper krijgt een `print-legal` class.
- **Edit** `src/index.css`: `@media print` blok dat `header`, `footer`, `nav`, `[data-print-hide]` verbergt, kleuren forceert naar zwart-op-wit, en `break-inside`/`break-after` regels zet voor koppen.
- Geen nieuwe dependencies.
