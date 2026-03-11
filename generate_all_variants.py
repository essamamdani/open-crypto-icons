import os
import re
import shutil

SVG_DIR = "public/icons_svg"
PUB_ICONS = "public/icons"
ROOT_ICONS = "icons"

VARIANTS = ["black", "white", "outline"]

for v in VARIANTS:
    os.makedirs(os.path.join(PUB_ICONS, v), exist_ok=True)
    os.makedirs(os.path.join(ROOT_ICONS, v), exist_ok=True)

def create_variant(svg_content, variant_type="black"):
    svg_content = re.sub(r'<rect[^>]*width="56"[^>]*>', '', svg_content)
    svg_content = re.sub(r'<rect[^>]*height="56"[^>]*>', '', svg_content)
    svg_content = re.sub(r'<circle[^>]*cx="28"[^>]*cy="28"[^>]*>', '', svg_content)
    svg_content = re.sub(r'<circle[^>]*r="28"[^>]*>', '', svg_content)
    
    inner_match = re.search(r'(<svg[^>]*>)(.*)(</svg>)', svg_content, flags=re.DOTALL)
    if not inner_match:
        return svg_content
        
    tag, inner, end_tag = inner_match.groups()
    inner = re.sub(r'fill="[^"]+"', '', inner)
    inner = re.sub(r'stroke="[^"]+"', '', inner)
    
    if variant_type == "black":
        color = "#000000"
        svg_content = f'{tag}<g fill="{color}">{inner}</g>{end_tag}'
    elif variant_type == "white":
        color = "#FFFFFF"
        svg_content = f'{tag}<g fill="{color}">{inner}</g>{end_tag}'
    elif variant_type == "outline":
        color = "#000000"
        svg_content = f'{tag}<g fill="none" stroke="{color}" stroke-width="2">{inner}</g>{end_tag}'
        
    return svg_content

count = 0
for filename in os.listdir(SVG_DIR):
    if not filename.endswith(".svg"): continue
    
    src_path = os.path.join(SVG_DIR, filename)
    with open(src_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    for v in VARIANTS:
        pub_path = os.path.join(PUB_ICONS, v, filename)
        root_path = os.path.join(ROOT_ICONS, v, filename)
        
        if not os.path.exists(pub_path):
            variant_content = create_variant(content, v)
            with open(pub_path, "w", encoding="utf-8") as out:
                out.write(variant_content)
                
        shutil.copy2(pub_path, root_path)
        
    count += 1
    if count % 1000 == 0:
        print(f"Processed {count} SVGs...")

print("Done generating missing variants and syncing NPM directories.")
