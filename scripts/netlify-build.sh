#!/usr/bin/env bash
# Netlify-build voor propasso.nl: vite build + build-time prerendering.
# Aangeroepen vanuit netlify.toml. Lovable gebruikt dit script niet.
#
# Productie (CONTEXT=production): mislukt een stap, dan faalt de build en blijft de vorige versie live.
# Deploy preview: de volledige uitvoer komt ook in dist/prerender-log.txt, zodat hij via de
# preview-URL leesbaar is. Mislukt een stap, dan wordt alleen de lege app plus dat log gepubliceerd.

set -o pipefail
LOG="$(mktemp)"

steps() {
  set -e
  echo "== omgeving: CONTEXT=${CONTEXT:-onbekend}, node $(node -v), npm $(npm -v)"
  npm run build
  npm install --prefix scripts/.prerender-deps --no-save --no-package-lock --no-audit --no-fund puppeteer@25.12.0
  node scripts/prerender.mjs
}

( steps ) 2>&1 | tee "$LOG"
STATUS=${PIPESTATUS[0]}

if [ "${CONTEXT:-}" = "deploy-preview" ]; then
  mkdir -p dist
  { echo "== status: $STATUS"; cat "$LOG"; } > dist/prerender-log.txt
  if [ "$STATUS" -ne 0 ]; then
    [ -f dist/index.html ] || echo "<!doctype html><title>build mislukt</title><p>Zie /prerender-log.txt</p>" > dist/index.html
    echo "== deploy preview: build mislukt (status $STATUS); log op /prerender-log.txt"
    exit 0
  fi
fi

exit "$STATUS"
