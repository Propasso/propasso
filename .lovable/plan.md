

## Sitemap Architecture: Problem Analysis and Options

### The Core Problem
Google Search Console requires the sitemap URL to be on the **same domain** as the site it describes. The current edge function URL (`qqxohovmhrvshpoxkpdd.supabase.co/functions/v1/sitemap`) is rejected because it lives on a different domain than `propasso.nl`.

Since Lovable deploys as a static SPA, there is no server-side layer to dynamically generate `/sitemap.xml` on request. The file at `public/sitemap.xml` is baked at build time.

### Three Approaches

---

#### Option A: Cloudflare Worker Proxy (Recommended)

**Architecture:** A Cloudflare Worker intercepts requests to `propasso.nl/sitemap.xml` and proxies them to the existing Supabase edge function, returning the dynamic XML response transparently.

**How it works:**
1. Create a Cloudflare Worker on the `propasso.nl` domain
2. The Worker matches the route `/sitemap.xml`
3. It fetches the Supabase edge function, forwards the XML response with correct `Content-Type: application/xml`
4. Update `robots.txt` to point to `https://propasso.nl/sitemap.xml`

**Pros:**
- Sitemap is always fresh (dynamic, sourced from Sanity via the edge function)
- Served on the root domain — fully GSC-compliant
- Cloudflare caching (Cache-Control headers already set at 1 hour)
- Zero changes to the Lovable codebase or edge function logic
- Simple, ~15 lines of Worker code

**Cons:**
- Requires Cloudflare Workers access (you already use Cloudflare for DNS)
- Adds a dependency on Cloudflare Workers (free tier is generous: 100k requests/day)
- Two hops: Cloudflare → Supabase → Sanity (but all cached, so fast)

**Required changes:**
- Cloudflare: Create a Worker + route rule for `propasso.nl/sitemap.xml`
- Lovable: Update `public/robots.txt` to `Sitemap: https://propasso.nl/sitemap.xml`
- Lovable: Delete or empty `public/sitemap.xml` to avoid route conflict

**Risks:**
- If the static `public/sitemap.xml` file exists, it may take precedence over the Worker route depending on hosting config. Must be removed.
- Worker must handle errors gracefully (return cached version or 503)

---

#### Option B: Cloudflare Page Rule / Transform Rule Redirect

**Architecture:** Use a Cloudflare redirect or rewrite rule (no Worker needed) to redirect `propasso.nl/sitemap.xml` → the Supabase edge function URL.

**How it works:**
1. Create a Cloudflare Page Rule or Transform Rule: `propasso.nl/sitemap.xml` → 301/302 redirect to the edge function URL

**Pros:**
- No code at all — pure DNS/CDN config
- Quick to set up

**Cons:**
- **Google Search Console may still reject it** — a 301 redirect to a different domain doesn't solve the cross-domain issue; GSC validates the final resolved domain
- Not a transparent proxy; the sitemap URL changes after redirect
- Less reliable for SEO compliance

**Required changes:**
- Cloudflare: Page Rule or Redirect Rule
- Lovable: Update `robots.txt`

**Risks:**
- High risk that GSC still rejects the sitemap because the final response comes from `supabase.co`
- **Not recommended** for this reason

---

#### Option C: Build-Time Generation via Vite Plugin

**Architecture:** A custom Vite plugin fetches all Sanity articles at build time and writes a complete `public/sitemap.xml` before deployment.

**How it works:**
1. Create a Vite plugin that runs during `build`
2. Plugin fetches articles from Sanity API (same query as the edge function)
3. Generates `dist/sitemap.xml` with all static + pillar + article URLs
4. Served statically at `propasso.nl/sitemap.xml`

**Pros:**
- Sitemap is on the root domain — fully GSC-compliant
- No external dependencies (no Workers, no proxy)
- Extremely fast (static file, CDN-cached)

**Cons:**
- **Stale until next deploy** — new Sanity articles won't appear in the sitemap until you redeploy in Lovable
- Adds build complexity (Vite plugin + Sanity fetch at build time)
- If Sanity API is down during build, sitemap generation fails

**Required changes:**
- Lovable: Create Vite plugin in `vite.config.ts`
- Lovable: Update `robots.txt` to `https://propasso.nl/sitemap.xml`
- Lovable: Remove static `public/sitemap.xml` (plugin writes to `dist/`)

**Risks:**
- Staleness is the main risk — if you publish 3 articles between deploys, they won't be in the sitemap until the next Lovable publish
- Build failure if Sanity is unreachable

---

### Recommendation: **Option A — Cloudflare Worker Proxy**

This is the best fit for this stack because:

1. **Always fresh** — every request gets the latest Sanity content (with 1-hour caching)
2. **On the root domain** — `propasso.nl/sitemap.xml` is fully GSC-compliant
3. **Minimal changes** — the edge function already works perfectly; we just need a transparent proxy
4. **You already use Cloudflare** — no new vendor, free tier covers this easily
5. **No redeploy needed** when new articles are published

### Implementation Steps (after approval)

1. **In Lovable:** Update `public/robots.txt` → `Sitemap: https://propasso.nl/sitemap.xml`
2. **In Lovable:** Delete `public/sitemap.xml` to prevent routing conflicts
3. **In Cloudflare (manual):** Create a Worker with ~15 lines that proxies `/sitemap.xml` to the Supabase edge function — I will provide the exact Worker code
4. **In Cloudflare (manual):** Add a route rule: `propasso.nl/sitemap.xml` → Worker
5. **Verify:** Confirm `https://propasso.nl/sitemap.xml` returns valid XML with all URLs
6. **Submit** to Google Search Console

