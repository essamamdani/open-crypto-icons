#!/bin/bash
echo "Waiting for update_markets.py to finish..."
while pgrep -f update_markets.py > /dev/null; do
  sleep 5
done
echo "Running seo_export.py..."
python3 seo_export.py
echo "Running clean_svgs.py..."
python3 clean_svgs.py
echo "Building Vite app..."
npm run build
echo "Deploying to gh-pages branch..."
npm run deploy
echo "Pushing everything to master branch..."
git add .
git commit -m "chore: sync and push icons"
git push origin master
echo "Counts:"
echo "Downloaded SVGs: $(ls -1 public/icons_svg | grep '\.svg$' | wc -l)"
echo "Indexed coins: $(grep -c '\"id\"' public/coins.json)"
