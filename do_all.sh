#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons
python3 -u update_markets.py > update_markets.log 2>&1
python3 -u seo_export.py > seo_export.log 2>&1
python3 -u clean_svgs.py > clean_svgs.log 2>&1
npm run build > build.log 2>&1
npx gh-pages -d dist > deploy.log 2>&1
git config --global user.email "bot@openclaw.ai"
git config --global user.name "OpenClaw Cron"
git add .
git commit -m "chore: automated cron sync [skip ci]"
git push origin master > push.log 2>&1
echo "Finished deploy."
