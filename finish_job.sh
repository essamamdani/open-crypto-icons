#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

# Wait for update_markets.py to finish
echo "Waiting for update_markets.py to finish..."
while kill -0 87643 2>/dev/null; do
    sleep 5
done

echo "update_markets.py finished. Running clean_svgs.py..."
python3 clean_svgs.py

echo "Running seo_export.py..."
python3 seo_export.py

echo "Building and deploying to gh-pages..."
npm run deploy

echo "Committing to master..."
git add .
git commit -m "chore(cron): sync crypto icons and deploy"
git push origin master

echo ""
echo "==== SUMMARY ===="
echo "SVGS_DOWNLOADED=$(ls public/icons_svg/*.svg | wc -l)"
echo "COINS_INDEXED=$(grep -o '"id"' public/coins.json | wc -l)"
echo "================="
