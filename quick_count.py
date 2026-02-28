import json
import os
import requests

svg_dir = "public/icons_svg"
valid_svgs = {f.replace(".svg", "").lower() for f in os.listdir(svg_dir) if f.endswith(".svg")}

res = requests.get("https://api.coingecko.com/api/v3/coins/list", timeout=10)
all_coins = res.json()
seen = set()
for c in all_coins:
    sym = c.get("symbol", "").lower()
    if sym in valid_svgs:
        seen.add(sym)
print(f"SVGs: {len(valid_svgs)}")
print(f"Indexed Coins: {len(seen)}")
