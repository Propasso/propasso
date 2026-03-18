

## Plan: Implement Option A — Dynamic Sitemap via Edge Function

### Changes

**1. Update `public/robots.txt`**
Point the Sitemap directive to the dynamic edge function URL. Remove the old `propasso.nl/sitemap.xml` reference.

```
Sitemap: https://qqxohovmhrvshpoxkpdd.supabase.co/functions/v1/sitemap
```

**2. Delete `public/sitemap.xml`**
Remove the static fallback file entirely. It currently contains only 17 static URLs (no articles) and would mislead crawlers who discover it by convention at `/sitemap.xml`.

**3. Verify dynamic sitemap**
Fetch the live edge function to confirm it includes all required URLs and excludes drafts/noIndex/styleguide/404. Report back URL count, article count, and sample article URLs.

### No other files need changes
The edge function (`supabase/functions/sitemap/index.ts`) and its config (`verify_jwt = false`) are already correctly set up.

