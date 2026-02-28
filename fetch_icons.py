import requests
import os
import json
from time import sleep

# --------------------------------
# CONFIG
# --------------------------------
API_URL = "https://api.coingecko.com/api/v3/coins/list"
ICON_URL = "https://s3-symbol-logo.tradingview.com/crypto/XTVC{}--big.svg"
SAVE_DIR = "public/icons_svg"
JSON_PATH = "public/coins.json"

os.makedirs(SAVE_DIR, exist_ok=True)

# --------------------------------
# FETCH COINS
# --------------------------------
print("Fetching coins list from CoinGecko...")
try:
    coins = requests.get(API_URL).json()
except Exception as e:
    print(f"Failed to fetch coins: {e}")
    coins = []

print(f"Total coins: {len(coins)}")

# --------------------------------
# DOWNLOAD SVG ICONS & SAVE METADATA
# --------------------------------
success = 0
failed = 0
valid_coins = []

# Load existing to avoid losing metadata
if os.path.exists(JSON_PATH):
    try:
        with open(JSON_PATH, "r") as f:
            valid_coins = json.load(f)
    except Exception:
        pass

existing_symbols = {c["symbol"].lower() for c in valid_coins}

for coin in coins:
    symbol = coin["symbol"].upper()   # TradingView uses uppercase
    lower_symbol = symbol.lower()
    filename = lower_symbol + ".svg"
    file_path = os.path.join(SAVE_DIR, filename)

    # skip existing
    if os.path.exists(file_path):
        if lower_symbol not in existing_symbols:
            valid_coins.append({
                "id": coin.get("id", ""),
                "symbol": symbol,
                "name": coin.get("name", "")
            })
            existing_symbols.add(lower_symbol)
        continue

    icon_url = ICON_URL.format(symbol)

    try:
        res = requests.get(icon_url, timeout=10)

        if res.status_code == 200 and "svg" in res.headers.get("Content-Type", ""):
            with open(file_path, "wb") as f:
                f.write(res.content)

            valid_coins.append({
                "id": coin.get("id", ""),
                "symbol": symbol,
                "name": coin.get("name", "")
            })
            existing_symbols.add(lower_symbol)
            success += 1
            print(f"✅ {filename}")
        else:
            failed += 1

        sleep(0.1)  # rate limit safety

    except Exception:
        failed += 1
        print(f"❌ Failed: {symbol}")

# Update coins.json with successfully downloaded icons
with open(JSON_PATH, "w") as f:
    json.dump(valid_coins, f, indent=2)

print("\nDONE")
print("Downloaded:", success)
print("Failed:", failed)
print("Total valid icons indexed:", len(valid_coins))
