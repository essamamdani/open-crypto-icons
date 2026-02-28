import requests
import os
import json

API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
ICON_URL = "https://s3-symbol-logo.tradingview.com/crypto/XTVC{}--big.svg"
SAVE_DIR = "public/icons_svg"
JSON_PATH = "public/coins.json"

os.makedirs(SAVE_DIR, exist_ok=True)
print("Fetching top 100 coins...")
coins = requests.get(API_URL).json()

valid_coins = []

for coin in coins:
    symbol = coin["symbol"].upper()
    lower_symbol = symbol.lower()
    filename = lower_symbol + ".svg"
    file_path = os.path.join(SAVE_DIR, filename)

    icon_url = ICON_URL.format(symbol)
    if not os.path.exists(file_path):
        try:
            res = requests.get(icon_url, timeout=10)
            if res.status_code == 200 and "svg" in res.headers.get("Content-Type", ""):
                with open(file_path, "wb") as f:
                    f.write(res.content)
                print(f"✅ {filename}")
        except:
            pass
    
    if os.path.exists(file_path):
        valid_coins.append({
            "id": coin.get("id", ""),
            "symbol": symbol,
            "name": coin.get("name", "")
        })

with open(JSON_PATH, "w") as f:
    json.dump(valid_coins, f, indent=2)

print(f"Seeded {len(valid_coins)} top coins!")
