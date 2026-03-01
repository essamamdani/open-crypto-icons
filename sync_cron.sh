#!/bin/bash
set -e
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

echo "Running update_markets.py..."
python3 update_markets.py

echo "Running seo_export.py..."
python3 seo_export.py

echo "Running clean_svgs.py..."
python3 clean_svgs.py

echo "Building Vite app..."
npm run build

echo "Committing and pushing to master..."
git checkout master
git add .
git commit -m "chore(cron): sync & push crypto icons" || echo "No changes to commit"
git push origin master

echo "Deploying to gh-pages..."
npm run deploy

echo "Getting counts..."
python3 quick_count.py > report.txt
echo "Done!"
