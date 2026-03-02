#!/bin/bash
echo "Waiting for PID 296651 to finish..."
while kill -0 296651 2>/dev/null; do
    sleep 5
done
echo "PID finished."
python3 seo_export.py
npm run build
npx gh-pages -d dist -b gh-pages -m "Deploy: auto-sync update $(date)"
git add .
git commit -m "chore: auto-sync crypto icons $(date)" || true
git push origin master

SVG_COUNT=$(ls public/icons_svg | grep "\.svg$" | wc -l)
COIN_COUNT=$(jq '. | length' public/coins.json)

echo "Downloaded SVGs: $SVG_COUNT"
echo "Indexed Coins: $COIN_COUNT"
