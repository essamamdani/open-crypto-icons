#!/bin/bash
set -e
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons
echo "Starting update_markets.py..." > cron_progress.log
python3 -u update_markets.py >> cron_progress.log 2>&1
echo "Starting seo_export.py..." >> cron_progress.log
python3 -u seo_export.py >> cron_progress.log 2>&1
echo "Starting clean_svgs.py..." >> cron_progress.log
python3 -u clean_svgs.py >> cron_progress.log 2>&1
echo "Building Vite app..." >> cron_progress.log
npm run build >> cron_progress.log 2>&1
echo "Deploying to gh-pages..." >> cron_progress.log
npm run deploy >> cron_progress.log 2>&1
echo "Committing to master..." >> cron_progress.log
git add . >> cron_progress.log 2>&1
git commit -m "chore: sync new icons [cron]" >> cron_progress.log 2>&1 || true
git push origin master >> cron_progress.log 2>&1
echo "Counting SVGs and Coins..." >> cron_progress.log
SVG_COUNT=$(ls public/icons_svg | grep \.svg | wc -l)
COIN_COUNT=$(cat public/coins.json | grep '"id"' | wc -l)
echo "SVG_COUNT=$SVG_COUNT" >> cron_progress.log
echo "COIN_COUNT=$COIN_COUNT" >> cron_progress.log
echo "FINISHED" >> cron_progress.log
