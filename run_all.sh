#!/bin/bash
set -e

cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

echo "1. Running update_markets.py..."
python3 update_markets.py

echo "2. Running seo_export.py..."
python3 seo_export.py

echo "3. Cleaning footprints from SVGs..."
python3 clean_svgs.py

echo "4. Building the Vite app..."
npm install
npm run build

echo "5. Deploying to gh-pages branch and pushing to master..."
# Ensure we're on master
git checkout master
git add .
git commit -m "chore: sync crypto icons, build and push" || echo "No changes to commit"
git push origin master

# Deploy gh-pages
# The deploy.sh might be doing this. Let's check deploy.sh
