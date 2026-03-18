

## Plan: Delete static sitemap.xml

### Problem
The static `public/sitemap.xml` file was supposed to be removed in previous steps but was never actually deleted. It contains only 17 hardcoded URLs (no articles) and will conflict with the Cloudflare Worker proxy that serves the dynamic sitemap at the same path.

### Change

**Delete `public/sitemap.xml`**

Remove the file entirely. The Cloudflare Worker will handle requests to `/sitemap.xml` by proxying to the dynamic edge function. If the static file remains, the hosting server may serve it instead of letting the Worker intercept the request.

No other files need changes — `robots.txt` already points to `https://propasso.nl/sitemap.xml`.

