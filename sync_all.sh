#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons
echo "Running seo_export..."
python3 seo_export.py
echo "Running clean_svgs..."
python3 clean_svgs.py
echo "Building Vite app..."
npm run build
echo "Committing to master..."
git checkout master
git add .
git commit -m "chore: cron update svgs and site"
git push origin master
echo "Deploying to gh-pages..."
npm run deploy
echo "Generating report..."
python3 quick_count.py > sync_report.txt
