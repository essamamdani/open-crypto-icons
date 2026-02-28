import requests
import os
import json
import re
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

if os.path.exists(JSON_PATH):
    try:
        with open(JSON_PATH, "r") as f:
            valid_coins = json.load(f)
    except Exception:
        pass

existing_symbols = {c["symbol"].lower() for c in valid_coins}

def clean_svg(svg_content):
    content = svg_content.decode("utf-8", errors="ignore")
    # Remove footprint
    content = re.sub(r'<!--.*?-->\s*', '', content)
    svg_tag_match = re.search(r'<svg[^>]+>', content)
    if svg_tag_match:
        svg_tag = svg_tag_match.group(0)
        w_match = re.search(r'width="(\d+)"', svg_tag)
        h_match = re.search(r'height="(\d+)"', svg_tag)
        if w_match and h_match:
            orig_w = int(w_match.group(1))
            orig_h = int(h_match.group(1))
            svg_tag_new = svg_tag
            if 'viewBox' not in svg_tag_new:
                svg_tag_new = svg_tag_new.replace('>', f' viewBox="0 0 {orig_w} {orig_h}">', 1)
            new_w = orig_w * 2
            new_h = orig_h * 2
            svg_tag_new = re.sub(r'width="\d+"', f'width="{new_w}"', svg_tag_new)
            svg_tag_new = re.sub(r'height="\d+"', f'height="{new_h}"', svg_tag_new)
            content = content.replace(svg_tag, svg_tag_new)
    return content.encode("utf-8")

for coin in coins:
    symbol = coin["symbol"].upper()
    lower_symbol = symbol.lower()
    filename = lower_symbol + ".svg"
    file_path = os.path.join(SAVE_DIR, filename)

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
            cleaned_content = clean_svg(res.content)
            with open(file_path, "wb") as f:
                f.write(cleaned_content)
            valid_coins.append({
                "id": coin.get("id", ""),
                "symbol": symbol,
                "name": coin.get("name", "")
            })
            existing_symbols.add(lower_symbol)
            success += 1
            print(f"✅ {filename} (Cleaned & Resized)")
        else:
            failed += 1
        sleep(0.1)
    except Exception:
        failed += 1
        print(f"❌ Failed: {symbol}")

with open(JSON_PATH, "w") as f:
    json.dump(valid_coins, f, indent=2)

print("\nDONE")
print("Downloaded:", success)
print("Failed:", failed)
print("Total valid icons indexed:", len(valid_coins))
