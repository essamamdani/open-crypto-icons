import os
import re

svg_dir = "public/icons_svg"
for f in os.listdir(svg_dir):
    if not f.endswith(".svg"):
        continue
    path = os.path.join(svg_dir, f)
    with open(path, "r") as file:
        content = file.read()
    
    # Actually, the data is already lost in the files.
    # But maybe we can run update_markets.py again and remove the destructive regex from clean_svgs.py
