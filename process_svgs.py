import os
import re

svg_dir = "public/icons_svg"
count = 0

for filename in os.listdir(svg_dir):
    if not filename.endswith(".svg"):
        continue
    
    filepath = os.path.join(svg_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove the comment footprint
    new_content = re.sub(r'<!--.*?-->\s*', '', content)

    # Find width and height in <svg> tag
    svg_tag_match = re.search(r'<svg[^>]+>', new_content)
    if svg_tag_match:
        svg_tag = svg_tag_match.group(0)
        
        # Extract width and height
        w_match = re.search(r'width="(\d+)"', svg_tag)
        h_match = re.search(r'height="(\d+)"', svg_tag)
        
        if w_match and h_match:
            orig_w = int(w_match.group(1))
            orig_h = int(h_match.group(1))
            
            # Create a viewBox if not present
            if 'viewBox' not in svg_tag:
                svg_tag_new = svg_tag.replace('>', f' viewBox="0 0 {orig_w} {orig_h}">', 1)
            else:
                svg_tag_new = svg_tag
                
            # Double the width and height for 2x retina
            new_w = orig_w * 2
            new_h = orig_h * 2
            
            svg_tag_new = re.sub(r'width="\d+"', f'width="{new_w}"', svg_tag_new)
            svg_tag_new = re.sub(r'height="\d+"', f'height="{new_h}"', svg_tag_new)
            
            new_content = new_content.replace(svg_tag, svg_tag_new)

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        count += 1

print(f"Processed and cleaned {count} SVGs to 2x Retina size!")
