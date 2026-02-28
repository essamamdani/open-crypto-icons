import os
import re

svg_dir = "public/icons_svg"
for f in os.listdir(svg_dir):
    if not f.endswith(".svg"):
        continue
    path = os.path.join(svg_dir, f)
    with open(path, "r") as file:
        content = file.read()
    
    orig = content
    # Remove TradingView comment
    content = content.replace("<!-- by TradingView -->", "")
    
    # DO NOT remove colored background paths anymore!
    # Instead, we just remove empty paths or generic white/gray ones if needed, 
    # but to be safe we will just keep the shape so colors are preserved.
    # We can turn the square into a circle by adding rx="28" to the main box
    content = re.sub(r'<path([^>]*?)d="M0 0h56v56H0z"([^>]*?)/>', r'<rect\1width="56" height="56" rx="28"\2/>', content)
    
    if content != orig:
        with open(path, "w") as file:
            file.write(content)
print("SVGs cleaned safely without destroying colors.")
