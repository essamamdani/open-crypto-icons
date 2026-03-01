#!/bin/bash
set -e
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

echo "Running update_markets.py..."
python3 update_markets.py

echo "Running seo_export.py..."
python3 seo_export.py

echo "Cleaning SVGs..."
python3 clean_svgs.py

echo "Building Vite app..."
npm run build

echo "Deploying to gh-pages branch..."
git add dist -f
git commit -m "chore: deploy to gh-pages" || true
# Just push dist dir
git subtree push --prefix dist origin gh-pages || true
git reset HEAD~1 || true
git checkout dist || true

echo "Pushing everything to master branch..."
git add .
git commit -m "chore: auto-sync crypto icons" || true
git push origin master || true

echo "Counts:"
SVGS=$(ls -1 public/icons_svg | grep "\.svg$" | wc -l)
COINS=$(jq '. | length' public/coins.json 2>/dev/null || echo "0")
echo "$SVGS downloaded SVGs"
echo "$COINS indexed coins"
