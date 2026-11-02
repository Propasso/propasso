#!/bin/bash
# Netlify "ignore"-script: bepaalt of een build doorgaat.
# exit 1 = bouwen, exit 0 = overslaan.
# Doel: buildtegoed sparen. Productiedeploys kosten credits, deploy previews niet.
# Bouwen alleen bij:
#   1. een deploy preview (pull request), of
#   2. een build hook: de dagelijkse of ad-hoc run van .github/workflows/netlify-rebuild.yml, of
#   3. een commit met [deploy] in het bericht (noodroute).
# Gewone pushes naar main worden overgeslagen; die gaan mee met de volgende dagelijkse build.

if [ "$CONTEXT" = "deploy-preview" ]; then
  echo "Deploy preview: bouwen."
  exit 1
fi

if [ -n "$INCOMING_HOOK_TITLE" ] || [ -n "$INCOMING_HOOK_URL" ]; then
  echo "Build hook (${INCOMING_HOOK_TITLE:-onbekend}): bouwen."
  exit 1
fi

if git log -1 --pretty=%B 2>/dev/null | grep -q "\[deploy\]"; then
  echo "Commit met [deploy]: bouwen."
  exit 1
fi

echo "Push zonder build hook: overgeslagen. Gaat mee met de volgende dagelijkse build."
exit 0
