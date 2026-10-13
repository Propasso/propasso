CREATE OR REPLACE FUNCTION public.privacy_data_cleanup()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $func$
  DELETE FROM public.rate_limit_log WHERE created_at < now() - interval '30 days';
  DELETE FROM public.email_send_log WHERE created_at < now() - interval '12 months';
  DELETE FROM public.email_unsubscribe_tokens WHERE used_at IS NOT NULL AND used_at < now() - interval '12 months';
$func$;

REVOKE EXECUTE ON FUNCTION public.privacy_data_cleanup() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.privacy_data_cleanup() TO service_role;

SELECT cron.schedule(
  'privacy-data-cleanup',
  '15 3 * * *',
  $cron$ SELECT public.privacy_data_cleanup(); $cron$
);