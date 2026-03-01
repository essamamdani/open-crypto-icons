#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons
python3 seo_export.py
python3 clean_svgs.py
npm install
npm run build
npx gh-pages -d dist
git config --global user.email "bot@openclaw.ai"
git config --global user.name "OpenClaw Cron"
git add .
git commit -m "chore: automated cron sync [skip ci]"
git push origin master
echo "Finished deploy."
