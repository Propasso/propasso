

## Plan: E-mail queue herstellen

### Probleem
1. De pg_cron job voor `process-email-queue` ontbreekt — nieuwe e-mails worden wel ge-enqueued maar nooit verstuurd
2. 33 eerdere quickscan-rapporten zijn verlopen (TTL overschreden) of in de dead-letter queue beland door "domain_not_verified" fouten — deze kunnen niet meer via de normale queue worden verstuurd

### Stappen

**Stap 1: E-mail infrastructuur opnieuw opzetten**
- `setup_email_infra` aanroepen om de cron job en vault secret opnieuw aan te maken
- Dit is veilig/idempotent en herstelt de ontbrekende cron job

**Stap 2: Oude pending e-mails opnieuw verzenden**
- De 33 "pending" rijen in `email_send_log` hebben geen corresponderende queue-berichten meer (queue is leeg)
- Optie A: De gebruiker kan een nieuwe quickscan invullen om te testen of de keten nu werkt
- Optie B: We kunnen een script maken dat de unieke pending message_id's ophaalt, de originele payloads reconstrueert uit `send-diagnose-results` data, en opnieuw in de queue plaatst — maar dit vereist dat de originele e-mail HTML nog beschikbaar is, wat niet het geval is (de payloads worden niet opgeslagen)

**Stap 3: Verificatie**
- Na het herstellen van de cron job, een test-quickscan invullen en controleren of de e-mail aankomt
- `email_send_log` controleren op nieuwe "sent" statussen

### Technische details
- De cron job roept elke 5 seconden `process-email-queue` aan met de service role key
- De edge function leest batches uit pgmq en verstuurt ze via de Lovable Email API
- Nu het domein geverifieerd is, zullen nieuwe verzendingen slagen

### Belangrijk
De 33 eerder ingediende quickscan-rapporten die niet zijn verstuurd, kunnen **niet automatisch opnieuw worden verzonden** — de e-mail payloads (HTML-inhoud) worden niet bewaard in de database. Deze gebruikers hebben hun rapport niet ontvangen.

