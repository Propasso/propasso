# Algemene voorwaarden juridisch houdbaar aanbieden (art. 6:234 BW)

## Wat er nu staat (gecontroleerd)

- `/algemene-voorwaarden` haalt de tekst live uit Sanity (`legalPage`, slug `algemene-voorwaarden`) en rendert die als HTML via `LegalPage.tsx`.
- De inhoud is compleet en inhoudelijk sterk: 13 artikelen, KvK 58115439, aansprakelijkheid, honorarium, opzegging, Nederlands recht / Rechtbank 's-Hertogenbosch.
- Er staat een datum "laatst bijgewerkt" (nu 30 augustus 2026), afkomstig uit het veld `lastUpdated`.
- Er is **geen** downloadbare PDF: `public/` bevat geen voorwaardenbestand.
- Er is **geen** versienummer in de tekst; artikel 12 zegt dat wijzigingen ingaan zodra ze op de site zijn gepubliceerd.
- De pagina staat op `noIndex`.

## Juridische beoordeling

Voor elektronisch gesloten overeenkomsten mag je naar voorwaarden op je site verwijzen (art. 6:234 lid 2 BW), maar alleen als de wederpartij de tekst **kan opslaan en later kan raadplegen**. Twee risico's in de huidige opzet:

1. **Geen vastlegging per versie.** De HTML-tekst kan wijzigen zonder dat vast te stellen is welke tekst gold op het moment van contracteren. Bij een geschil moet je kunnen bewijzen wat de klant destijds heeft ontvangen.
2. **Opslaan/printen is niet expliciet geregeld.** Een HTML-pagina is verdedigbaar, maar een gedateerde PDF is de veilige route en het is wat rechters in de praktijk als "ter hand stellen" accepteren.

De inhoud zelf hoeft niet te wijzigen. Het gaat om de vorm en de vindbaarheid.

## Best practice: wat we gaan inrichten

### 1. Versienummer en ingangsdatum zichtbaar op de pagina
Bovenaan een compacte versiebalk: "Versie 2026-08 - geldig vanaf 30 augustus 2026". Zo is elke verwijzing eenduidig.

### 2. Downloadbare, gedateerde PDF
Een PDF met versie in de bestandsnaam, bijvoorbeeld `algemene-voorwaarden-propasso-2026-08.pdf`, opgeslagen in `public/voorwaarden/`. Op de pagina een duidelijke downloadknop ("Download als PDF") plus de bestandsgrootte. De PDF is de tekst die je in e-mails en opdrachtbevestigingen aanhaalt.

Twee opties voor het maken van die PDF:
- **A. Jij levert de PDF aan** (uit Word, met huisstijl). Ik plaats hem en bouw de download-link.
- **B. Ik genereer hem uit de Sanity-tekst** met een printvriendelijke lay-out. Dan blijft de tekst automatisch in sync, maar de opmaak is soberder dan een eigen briefpapier-versie.

### 3. Versie-archief
Een sectie "Eerdere versies" onderaan de pagina met links naar oudere PDF's. Bij een wijziging blijft de oude PDF staan, zodat je bij een lopend dossier altijd de destijds geldende tekst kunt overleggen.

### 4. Printvriendelijke weergave
Een `@media print` stylesheet zodat de HTML-pagina netjes op papier komt: header, footer, cookiebanner en floating buttons weg, zwarte tekst op wit, URL's van links uitgeschreven.

### 5. Artikel 12 scherper formuleren
De huidige tekst laat wijzigingen ingaan bij publicatie. Best practice bij doorlopende opdrachten: nieuwe versies gelden voor nieuwe opdrachten, en bij lopende opdrachten pas na schriftelijke kennisgeving. Ik lever een voorstelzin aan; jij bepaalt of je die door je jurist wilt laten toetsen voordat we hem in Sanity zetten.

### 6. Vindbaarheid
De pagina blijft op `noIndex` (dat is een bewuste keuze en prima), maar de link staat al in de footer en dat is genoeg. Belangrijk voor de rechtsgeldigheid: in elke opdrachtbevestiging en e-mail de **volledige URL plus het versienummer** noemen, en de PDF als bijlage meesturen. Dat laatste is de sterkste bewijspositie en kost je niets.

## Buiten scope

- Geen inhoudelijke herziening van de 13 artikelen.
- Geen KvK-depot (niet verplicht, voegt weinig toe bij B2B-dienstverlening).
- Geen wijziging aan disclaimer of privacyverklaring.

## Technische details

- **Nieuw**: `public/voorwaarden/algemene-voorwaarden-propasso-2026-08.pdf`
- **Edit**: `src/pages/AlgemeneVoorwaarden.tsx` - versiebalk, downloadknop, archiefsectie doorgeven aan `LegalPage`
- **Edit**: `src/components/LegalPage.tsx` - optionele props `version`, `pdfUrl`, `previousVersions` zodat disclaimer en privacyverklaring later hetzelfde patroon kunnen gebruiken
- **Edit**: `src/index.css` - `@media print` regels voor legal pages
- Sanity-tekst van artikel 12: alleen aanpassen na jouw akkoord

## Wat ik van jou nodig heb

1. Lever je de PDF zelf aan (optie A) of genereer ik hem (optie B)?
2. Welk versienummer wil je aanhouden: datumnotatie ("2026-08") of oplopend ("v2.0")?
3. Wil je de voorgestelde herformulering van artikel 12 zien voordat we die doorvoeren?
