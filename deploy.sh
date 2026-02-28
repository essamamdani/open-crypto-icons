#!/bin/bash
set -e

# Run the python scripts
python3 update_markets.py
python3 seo_export.py
python3 clean_svgs.py

# Build
npm run build

# Deploy to gh-pages
npx gh-pages -d dist -b gh-pages -m "Deploy: updated icons"

# Push to master
git add .
git commit -m "chore: auto-sync crypto icons" || true
git push origin master

# Get counts
SVG_COUNT=$(ls public/icons_svg | grep "\.svg$" | wc -l)
COIN_COUNT=$(jq '. | length' public/coins.json)

echo "=== SUMMARY ==="
echo "Downloaded SVGs: $SVG_COUNT"
echo "Indexed Coins: $COIN_COUNT"
