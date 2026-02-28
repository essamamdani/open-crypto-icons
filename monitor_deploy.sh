#!/bin/bash
PID=$1
while kill -0 $PID 2>/dev/null; do
  sleep 10
done
# Process finished, get counts
SVG_COUNT=$(ls public/icons_svg | grep "\.svg$" | wc -l)
COIN_COUNT=$(jq '. | length' public/coins.json)
echo "=== DEPLOYMENT COMPLETE ==="
echo "Downloaded SVGs: $SVG_COUNT"
echo "Indexed Coins: $COIN_COUNT"
