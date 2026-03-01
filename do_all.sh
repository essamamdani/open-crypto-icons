#!/bin/bash
cd /root/openclaw-workspace/openclaw-sandbox-crypto-icons
wait 138991
echo "update_markets finished"
npm install
npm run build
git branch -M master
git add .
git commit -m "Update icons and coins.json data"
git push origin master
# Now deploy to gh-pages
# Wait, deploy.sh exists
