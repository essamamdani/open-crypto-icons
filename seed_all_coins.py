import requests
import json

print("Fetching all coins from CoinGecko...")
res = requests.get("https://api.coingecko.com/api/v3/coins/list")
coins = res.json()
print(f"Total coins fetched: {len(coins)}")

valid_coins = []
seen = set()

for c in coins:
    sym = c["symbol"].upper()
    if sym not in seen:
        valid_coins.append({
            "id": c.get("id", ""),
            "symbol": sym,
            "name": c.get("name", "")
        })
        seen.add(sym)

with open("public/coins.json", "w") as f:
    json.dump(valid_coins, f, indent=2)

print(f"Saved {len(valid_coins)} unique coins to coins.json")
