#!/bin/bash
set -e
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

echo "Running update_markets.py..."
python3 -u update_markets.py > cron_step1.log 2>&1

echo "Running seo_export.py..."
python3 -u seo_export.py > cron_step2.log 2>&1

echo "Cleaning up SVGs..."
python3 -u clean_svgs.py > cron_step3.log 2>&1 || true

echo "Building..."
npm run build > cron_step4.log 2>&1

echo "Deploying and pushing..."
git config --global user.email "bot@openclaw.ai"
git config --global user.name "OpenClaw Cron"

# Deploy to gh-pages using standard vite deploy or script if available
if [ -f "deploy.sh" ]; then
    bash deploy.sh > cron_step5.log 2>&1
else
    npm run deploy > cron_step5.log 2>&1 || true
fi

# Push to master
git add .
git commit -m "chore: cron update icons and seo [skip ci]" || true
git push origin master > cron_step6.log 2>&1 || true

SVG_COUNT=$(ls -1 public/icons_svg/*.svg 2>/dev/null | wc -l || echo 0)
COIN_COUNT=$(jq '. | length' public/coins.json 2>/dev/null || echo 0)

echo "$SVG_COUNT SVGs" > cron_result.txt
echo "$COIN_COUNT coins" >> cron_result.txt
