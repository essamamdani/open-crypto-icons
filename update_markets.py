import json
import os
import requests
import time

svg_dir = "public/icons_svg"
valid_svgs = {f.replace(".svg", "").lower() for f in os.listdir(svg_dir) if f.endswith(".svg")}
print(f"Total SVGs physically available: {len(valid_svgs)}")

final_coins = []
seen = set()

print("Fetching up to page 50 from CoinGecko markets (12,500 coins)...")
for page in range(1, 51):
    url = f"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page={page}"
    try:
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            data = res.json()
            if not data:
                break
            
            for c in data:
                sym = c.get("symbol", "").lower()
                if sym in valid_svgs and sym not in seen:
                    final_coins.append({
                        "id": c.get("id", ""),
                        "symbol": sym.upper(),
                        "name": c.get("name", "")
                    })
                    seen.add(sym)
            print(f"Page {page} processed. Total valid found: {len(final_coins)}")
        elif res.status_code == 429:
            print(f"Rate limited on page {page}, waiting 20 seconds...")
            time.sleep(20)
            res = requests.get(url, timeout=10)
            if res.status_code == 200:
                data = res.json()
                for c in data:
                    sym = c.get("symbol", "").lower()
                    if sym in valid_svgs and sym not in seen:
                        final_coins.append({
                            "id": c.get("id", ""),
                            "symbol": sym.upper(),
                            "name": c.get("name", "")
                        })
                        seen.add(sym)
                print(f"Page {page} processed after retry. Total valid: {len(final_coins)}")
        time.sleep(1.5)
    except Exception as e:
        print(f"Error on page {page}: {e}")

try:
    all_coins_res = requests.get("https://api.coingecko.com/api/v3/coins/list", timeout=10)
    if all_coins_res.status_code == 200:
        all_coins = all_coins_res.json()
        for c in all_coins:
            sym = c.get("symbol", "").lower()
            if sym in valid_svgs and sym not in seen:
                final_coins.append({
                    "id": c.get("id", ""),
                    "symbol": sym.upper(),
                    "name": c.get("name", "")
                })
                seen.add(sym)
except:
    pass

with open("public/coins.json", "w") as f:
    json.dump(final_coins, f, indent=2)

print(f"\nDONE! Saved {len(final_coins)} strictly sorted valid icons to coins.json")
