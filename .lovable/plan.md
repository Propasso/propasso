# Algemene voorwaarden juridisch houdbaar aanbieden (art. 6:234 BW)

## Wat er nu staat (gecontroleerd)

- `/algemene-voorwaarden` haalt de tekst live uit Sanity (`legalPage`, slug `algemene-voorwaarden`) en rendert die als HTML via `LegalPage.tsx`.
- De inhoud is compleet en inhoudelijk sterk: 13 artikelen, KvK 58115439, aansprakelijkheid, honorarium, opzegging, Nederlands recht / Rechtbank 's-Hertogenbosch.
- Er staat al een versiedatum: "Laatst bijgewerkt op 30 augustus 2026", uit het Sanity-veld `lastUpdated` (`LegalPage.tsx`, regel 103-112). Die regel is de basis waar we op verder bouwen.
- Er is **geen** downloadbare PDF: `public/` bevat geen voorwaardenbestand.
- Er is **geen** expliciet versienummer; artikel 12 zegt dat wijzigingen ingaan zodra ze op de site zijn gepubliceerd.
- De pagina staat op `noIndex`.

## Juridische beoordeling

Voor elektronisch gesloten overeenkomsten mag je naar voorwaarden op je site verwijzen (art. 6:234 lid 2 BW), maar alleen als de wederpartij de tekst **kan opslaan en later kan raadplegen**. Twee risico's in de huidige opzet:

1. **Geen vastlegging per versie.** De HTML-tekst kan wijzigen zonder dat vast te stellen is welke tekst gold op het moment van contracteren. Bij een geschil moet je kunnen bewijzen wat de klant destijds heeft ontvangen.
2. **Opslaan/printen is niet expliciet geregeld.** Een HTML-pagina is verdedigbaar, maar een gedateerde PDF is de veilige route en het is wat rechters in de praktijk als "ter hand stellen" accepteren.

De inhoud zelf hoeft niet te wijzigen. Het gaat om de vorm en de vindbaarheid.

## Best practice: wat we gaan inrichten

### 1. Versieregel scherper maken (bestaande regel uitbreiden)
De huidige "Laatst bijgewerkt op ..." wordt: "Versie 2026-08-30 - laatst bijgewerkt op 30 augustus 2026". Dezelfde `lastUpdated`-datum, alleen ook als eenduidig versiekenmerk waar je in een opdrachtbevestiging naar kunt verwijzen. Jij hoeft niets extra bij te houden: je past in het CMS de tekst aan, zet `lastUpdated` op vandaag, en de versie loopt automatisch mee.

### 2. PDF die zichzelf genereert (geen handwerk bij wijzigingen)
Je hoeft nooit een PDF te uploaden of te vervangen. We bouwen een backend-functie die de voorwaarden live uit het CMS ophaalt en er ter plekke een nette PDF van maakt, in Propasso-huisstijl (navy koppen, logo, KvK-nummer, versiedatum in de voettekst).

- Vaste link: `/algemene-voorwaarden.pdf`
- Bestandsnaam die de gebruiker downloadt bevat automatisch de versie: `propasso-algemene-voorwaarden-2026-08-30.pdf`
- Wijzig je de tekst in het CMS, dan is de PDF direct mee gewijzigd
- Kort gecachet (bijvoorbeeld een uur) zodat crawlers en herhaalbezoek geen extra werk kosten

Op de pagina komt naast de versieregel een duidelijke knop "Download als PDF".

### 3. Versie-archief: hoe je oude versies bewaart zonder werk
Voor je bewijspositie is niet de website leidend, maar wat de klant heeft ontvangen. De praktische route:

- Stuur de PDF bij elke opdrachtbevestiging als bijlage mee. Dat is en blijft het sterkste bewijs, en kost geen onderhoud.
- De vaste link toont altijd de actuele versie. Wil je later ook oude versies online bewaren, dan kan de functie een `?versie=2026-08-30` parameter krijgen die een eerdere CMS-revisie ophaalt. Dat is een uitbreiding voor later, geen onderdeel van deze stap.

### 4. Printvriendelijke weergave
Een `@media print` stylesheet zodat de HTML-pagina ook netjes op papier komt: header, footer, cookiebanner en floating buttons weg, zwarte tekst op wit, URL's van links uitgeschreven.

### 5. Artikel 12 scherper formuleren
De huidige tekst laat wijzigingen ingaan bij publicatie. Best practice bij doorlopende opdrachten: nieuwe versies gelden voor nieuwe opdrachten, en bij lopende opdrachten pas na schriftelijke kennisgeving. Ik lever een voorstelzin aan; jij bepaalt of je die door je jurist wilt laten toetsen voordat we hem in Sanity zetten.

### 6. Vindbaarheid
De pagina blijft op `noIndex` (bewuste keuze, prima) en staat in de footer. Belangrijk voor de rechtsgeldigheid: in elke opdrachtbevestiging de **volledige URL plus de versiedatum** noemen en de PDF meesturen.

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
