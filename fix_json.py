import json
import os
import requests
import time

svg_dir = "public/icons_svg"
valid_svgs = {f.replace(".svg", "").lower() for f in os.listdir(svg_dir) if f.endswith(".svg")}

print(f"Total downloaded SVGs found: {len(valid_svgs)}")

# Load all coins list
try:
    print("Fetching global coin list...")
    all_coins = requests.get("https://api.coingecko.com/api/v3/coins/list").json()
except Exception as e:
    print("Failed to fetch list, using existing coins.json", e)
    with open("public/coins.json", "r") as f:
        all_coins = json.load(f)

# Fetch top 1000 for ranking
ranked_symbols = {}
try:
    print("Fetching CoinGecko top markets for ranking...")
    for page in range(1, 6):
        res = requests.get(f"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page={page}", timeout=10)
        if res.status_code == 200:
            data = res.json()
            for idx, c in enumerate(data):
                sym = c["symbol"].lower()
                if sym not in ranked_symbols:
                    ranked_symbols[sym] = (page - 1) * 250 + idx + 1
        time.sleep(1.5)
except Exception as e:
    print("Rate limit or error on markets:", e)

final_coins = []
seen = set()

for c in all_coins:
    sym = c.get("symbol", "").lower()
    if sym in valid_svgs and sym not in seen:
        final_coins.append({
            "id": c.get("id", ""),
            "symbol": sym.upper(),
            "name": c.get("name", ""),
            "rank": ranked_symbols.get(sym, 999999)
        })
        seen.add(sym)

# Sort by rank, then name
final_coins.sort(key=lambda x: (x["rank"], x["name"].lower()))

# Remove the 'rank' key to save space
for c in final_coins:
    if "rank" in c:
        del c["rank"]

with open("public/coins.json", "w") as f:
    json.dump(final_coins, f, indent=2)

print(f"Saved {len(final_coins)} coins with VALID SVGs and sorted by CoinGecko Rank!")
