import os
import shutil

BASE_DIR = "icons"
COLOR_DIR = os.path.join(BASE_DIR, "colored")
BLACK_DIR = os.path.join(BASE_DIR, "black")
WHITE_DIR = os.path.join(BASE_DIR, "white")
OUTLINE_DIR = os.path.join(BASE_DIR, "outline")

for d in [COLOR_DIR, BLACK_DIR, WHITE_DIR, OUTLINE_DIR]:
    os.makedirs(d, exist_ok=True)

spothq_svg = "/tmp/spothq-icons/svg"
count_spot = 0
if os.path.exists(spothq_svg):
    for variant, target_dir in [("color", COLOR_DIR), ("black", BLACK_DIR), ("white", WHITE_DIR), ("icon", OUTLINE_DIR)]:
        src_dir = os.path.join(spothq_svg, variant)
        if os.path.exists(src_dir):
            for f in os.listdir(src_dir):
                if f.endswith(".svg"):
                    shutil.copy2(os.path.join(src_dir, f), os.path.join(target_dir, f))
                    count_spot += 1

print(f"Copied {count_spot} SVGs from spothq/cryptocurrency-icons")

# Now copy all TradingView SVGs into COLOR_DIR as fallback
tv_dir = "public/icons_svg"
count_tv = 0
for f in os.listdir(tv_dir):
    if f.endswith(".svg"):
        target_path = os.path.join(COLOR_DIR, f)
        # We can either overwrite or just fill the gaps.
        # User wants "original colored" and TradingView has all 6700+.
        # Let's use TradingView as the master for COLOR_DIR because it's massive.
        # Spothq only has 400. We will overwrite the spothq colors with TradingView colors, 
        # or maybe spothq is better quality? Spothq doesn't have the background rect, it's transparent.
        # Let's just put TradingView into COLOR_DIR.
        shutil.copy2(os.path.join(tv_dir, f), target_path)
        count_tv += 1

print(f"Copied {count_tv} SVGs from TradingView into colored directory")
