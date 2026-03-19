

## Diagnosis

The file `public/sitemap.xml` was deleted from the codebase but the CDN is still serving a cached version at `propasso.nl/sitemap.xml`. Lovable's hosting platform does not support server-level 301 redirects or cache purging, so we cannot force-clear this from the platform side.

## Solution: Replace with a Sitemap Index

Create a new `public/sitemap.xml` that acts as a **sitemap index file** pointing to the dynamic edge function. This approach:

1. **Overwrites** the cached static file on next publish with a fresh, tiny file
2. **Redirects crawlers** to the real dynamic sitemap via the standard sitemapindex protocol
3. **Eliminates confusion** — any crawler hitting `/sitemap.xml` is immediately forwarded to the edge function

### File: `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://sitemap.propasso.nl</loc>
  </sitemap>
</sitemapindex>
```

This is a valid XML sitemap index (per the sitemaps protocol) that tells Google: "the actual sitemap lives at `sitemap.propasso.nl`."

### No other changes needed

- `robots.txt` already points to `https://sitemap.propasso.nl` — no changes
- The edge function continues to work as-is
- Google Search Console will follow the sitemapindex to the dynamic sitemap

### After implementation

Publish the project so the new file replaces the cached version on the CDN.

