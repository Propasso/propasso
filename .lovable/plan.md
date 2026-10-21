# Actieplan: 44 kapotte interne links

## Wat er echt aan de hand is
Geen reden tot schrikken: het zijn twee oorzaken, allebei snel op te lossen.

**Oorzaak 1 (het grootste deel): e-mailadressen.** Cloudflare (de beveiligingslaag voor je site) "verstopt" e-mailadressen tegen spam door de link te vervangen door `/cdn-cgi/l/email-protection`. Een crawler ziet dat als een kapotte link. Dit staat op elke pagina met een e-mailadres in de footer, dus het telt op tot tientallen meldingen. Bezoekers merken er niets van.

**Oorzaak 2: oude WordPress-links in Sanity-artikelen.** Gevonden in de artikeltekst:

| Artikel | Kapotte link | Nieuwe bestemming |
|---|---|---|
| hoe-bepaal-je-de-waarde-van-je-mkb-bedrijf | /exit-planning/ | /werkwijze |
| hoe-bepaal-je-de-waarde-van-je-mkb-bedrijf | /hoe-ik-werk/ | /werkwijze |
| waarom-je-team-de-waarde-van-je-bedrijf-bepaalt | /exit-planning/ | /werkwijze |
| waarom-je-team-... | /van-cijfers-naar-inzicht-hoe-bepaal-je-... | /kennisbank/hoe-bepaal-je-de-waarde-van-je-mkb-bedrijf |
| waarom-je-team-... | /ben-je-klaar-om-te-verkopen-.../ | (werkt al via doorverwijzing, beter direct naar het nieuwe artikel) |
| waarom-een-persoonlijk-plan-cruciaal-is-... | /exit-planning/ | /werkwijze |
| waarom-een-persoonlijk-plan-... | /de-onmisbare-ondernemer/ | /kennisbank/de-onmisbare-ondernemer |
| waarom-een-persoonlijk-plan-... | /over-mij/ | /over-propasso (werkt al via doorverwijzing) |

## Wat ik doe
1. **Doorverwijzingen toevoegen** voor alle oude adressen hierboven (`/exit-planning`, `/hoe-ik-werk`, `/van-cijfers-naar-inzicht-...`, `/de-onmisbare-ondernemer`). Daarmee werken ook links vanaf andere websites en oude Google-resultaten weer.
2. **E-mailadressen**: Cloudflare laat links met `mailto:` die al in de code staan meestal ongemoeid als ze worden gemarkeerd; ik voeg de markering toe aan de e-maillinks in footer en contactpagina, zodat het werkt ook als de Cloudflare-instelling aan blijft.
3. **Optioneel, op jouw verzoek**: de links in de drie Sanity-artikelen direct goed zetten (via de CMS-koppeling), zodat ze niet via een doorverwijzing lopen.

## Wat jij doet (2 minuten)
- In Cloudflare: Scrape Shield > **Email Address Obfuscation uit**. Dit is de definitieve oplossing voor oorzaak 1.
- Na de volgende publicatie de audit opnieuw draaien.

## Over het ranken op "exit planning"
De kapotte links zijn een klein signaal, niet de hoofdreden. Een eigen pagina die specifiek over Exit Planning gaat (nu staat dat verspreid over home en werkwijze) zou meer helpen. Dat pakken we eventueel apart op.

## Technische details
- `netlify.toml`: 301's boven de bestaande rewrites, met en zonder trailing slash.
- E-maillinks: `<!--email_off-->`-aanpak werkt niet in React; daarom de mailto-href pas bij klik samenstellen (`onClick` → `window.location.href`), zodat Cloudflare niets herschrijft.
- Netlify-redirects werken pas na deploy; daarna met `curl -I` controleren.

---

# Aanvulling: structured data, llms.txt en artikel persoonlijk plan

## 4. Structured data (76 meldingen, één oorzaak)
Het bedrijfsprofiel voor zoekmachines staat in het basissjabloon van elke pagina en bevat het veld `serviceType`. Dat veld mag alleen bij een dienst, niet bij een organisatie. Aanpassing:
- `serviceType` weghalen bij Propasso als organisatie.
- Vervangen door `knowsAbout` (Exit Planning, bedrijfsoverdracht, verkoopklaar maken, bedrijfswaardering) en een `hasOfferCatalog` met de dienst "Exit Planning begeleiding". Zo herkennen zoekmachines en AI-modellen wie je bent en wat je doet, zonder fouten.
- De dienstbeschrijvingen op home en werkwijze houden `serviceType`; daar is het wel geldig.
- Let op: het profiel noemt `hallo@propasso.nl`, de footer `info@propasso.nl`. Ik maak dit gelijk aan het adres dat jij aangeeft (voorstel: info@).

## 5. llms.txt
Nieuw bestand `/llms.txt` met een korte omschrijving van Propasso, de doelgroep, de zes pijlers en links naar home, werkwijze, over Propasso, kennisbank, de zes pijlerpagina's, Quickscan, veelgestelde vragen en contact. Juridische pagina's blijven eruit. Wordt toegevoegd aan de doorverwijzingsregels zodat het niet als 404 eindigt.

## 6. Artikel "persoonlijk plan na de overdracht"
De tekst staat in het CMS. Ik haal titel, beschrijving en koppen op, doe een concreet voorstel voor betere titel, metabeschrijving, koppen en interne links (o.a. naar de pijlerpagina en de Quickscan), en zet het op jouw akkoord in het CMS. De drie kapotte links in dit artikel (zie punt 2) worden daarbij meteen hersteld.

## Technische details (aanvulling)
- `index.html`: Organization/ProfessionalService-node aanpassen.
- `public/llms.txt` + rewrite in `netlify.toml` vóór de 404-catch-all.
- Sanity-wijzigingen via de CMS-koppeling, alleen na akkoord op de tekstvoorstellen.
