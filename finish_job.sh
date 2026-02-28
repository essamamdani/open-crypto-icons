#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons

echo "Waiting for update_markets.py to finish..."
while pgrep -f "python3 update_markets.py" > /dev/null; do
    sleep 5
done
echo "update_markets.py finished."

python3 seo_export.py
python3 clean_svgs.py
python3 process_svgs.py

npm run build
npm run deploy

git add .
git commit -m "Auto-update markets and SVGs"
git push origin master

echo "Downloaded SVGs: $(ls -1 public/icons_svg/*.svg | wc -l)"
if command -v jq &> /dev/null; then
    echo "Indexed coins: $(jq length public/coins.json)"
else
    echo "Indexed coins: $(grep -o '"id"' public/coins.json | wc -l)"
fi
