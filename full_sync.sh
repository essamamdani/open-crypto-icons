#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

# update markets (it's currently running in another process, I'll wait or it might conflict?)
# wait, my first exec is running it. 
# actually, let's just create a full run script
echo "Running update_markets.py..."
python3 update_markets.py

echo "Running seo_export.py..."
python3 seo_export.py

echo "Cleaning SVGs..."
python3 clean_svgs.py

echo "Building Vite app..."
npm run build

echo "Deploying to gh-pages..."
# git checkout gh-pages
# copy dist content
# push
./deploy.sh

echo "Pushing everything to master..."
git add .
git commit -m "Auto-sync crypto icons and update site"
git push origin master

echo "Stats:"
SVG_COUNT=$(ls -1 public/icons_svg/*.svg 2>/dev/null | wc -l)
COIN_COUNT=$(grep -o '"symbol":' public/coins.json 2>/dev/null | wc -l)
echo "SVG_COUNT=$SVG_COUNT"
echo "COIN_COUNT=$COIN_COUNT"
