#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

# Wait for update_markets.py to finish
tail --pid=122253 -f /dev/null

echo "Update markets finished."

# Run seo export and clean svgs
python3 seo_export.py
python3 clean_svgs.py

# Build the app
npm run build

# Deploy to gh-pages branch
npm run deploy

# Commit and push to master
git add .
git commit -m "chore: sync and push crypto icons"
git push origin master

# Count
SVG_COUNT=$(ls -1 public/icons_svg | grep '\.svg$' | wc -l)
COIN_COUNT=$(grep -o '"symbol"' public/coins.json | wc -l)

echo "Downloaded SVGs: $SVG_COUNT" > summary.txt
echo "Indexed coins: $COIN_COUNT" >> summary.txt
