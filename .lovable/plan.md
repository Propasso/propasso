

## Problem

Bing (and other non-JS crawlers) only see the static `index.html`. The `<body>` contains just `<div id="root"></div>` with no `<h1>`. The actual `<h1>` is rendered client-side by React in `HeroSection.tsx`, which Bing doesn't execute.

## Solution

Add a **server-side-visible `<h1>`** inside `index.html` that React will overwrite once it mounts. This gives crawlers immediate access to the heading.

### File: `index.html`

Add an `<h1>` inside `<div id="root">` as fallback content. React's `createRoot().render()` replaces the contents of `#root`, so this text is only visible to bots and disappears instantly for real users.

```html
<div id="root">
  <h1 style="position:absolute;left:-9999px">Propasso — Exit Planning &amp; Bedrijfsoverdracht voor MKB-ondernemers</h1>
</div>
```

The `h1` text mirrors the page `<title>` and core keyword strategy. The off-screen positioning ensures no flash of unstyled content before React hydrates.

### Why this works
- Bing, Google's basic crawler, and AI bots see the `<h1>` in the raw HTML
- React replaces `#root` contents on mount — no duplicate heading for users
- No conflict with per-page `<h1>` tags rendered by React components
- Zero impact on existing components or routing

### No other files affected

