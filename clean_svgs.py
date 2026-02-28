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
    
    # Remove background path like <path fill="#F0F3FA" d="M0 0h56v56H0z"/>
    # or <path fill="url(#axm5xc3fi)" d="M0 0h56v56H0z"/>
    # Use regex
    content = re.sub(r'<path[^>]*?d="M0 0h56v56H0z"[^>]*?/>', '', content)
    
    if content != orig:
        with open(path, "w") as file:
            file.write(content)
print("SVGs cleaned.")