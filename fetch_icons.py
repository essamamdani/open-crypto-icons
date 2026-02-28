import requests
import os
from time import sleep

# --------------------------------
# CONFIG
# --------------------------------
API_URL = "https://api.coingecko.com/api/v3/coins/list"
ICON_URL = "https://s3-symbol-logo.tradingview.com/crypto/XTVC{}--big.svg"
SAVE_DIR = "public/icons_svg"

os.makedirs(SAVE_DIR, exist_ok=True)

# --------------------------------
# FETCH COINS
# --------------------------------
print("Fetching coins list...")
coins = requests.get(API_URL).json()
print(f"Total coins: {len(coins)}")

# --------------------------------
# DOWNLOAD SVG ICONS
# --------------------------------
success = 0
failed = 0

for coin in coins:
    symbol = coin["symbol"].upper()   # TradingView uppercase use karta hai
    filename = coin["symbol"].lower() + ".svg"

    file_path = os.path.join(SAVE_DIR, filename)

    # skip existing
    if os.path.exists(file_path):
        continue

    icon_url = ICON_URL.format(symbol)

    try:
        res = requests.get(icon_url, timeout=10)

        if res.status_code == 200 and "svg" in res.headers.get("Content-Type", ""):
            with open(file_path, "wb") as f:
                f.write(res.content)

            success += 1
            print(f"✅ {filename}")
        else:
            failed += 1

        sleep(0.1)  # rate limit safety

    except Exception:
        failed += 1
        print(f"❌ Failed: {symbol}")

print("\nDONE")
print("Downloaded:", success)
print("Failed:", failed)
