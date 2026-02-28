import json
import os

with open("public/coins.json", "r") as f:
    coins = json.load(f)

# generate sitemap
sitemap_urls = ["https://essamamdani.github.io/open-crypto-icons/", "https://essamamdani.github.io/open-crypto-icons/about"]
for c in coins:
    sitemap_urls.append(f"https://essamamdani.github.io/open-crypto-icons/{c['symbol'].lower()}")

xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for url in sitemap_urls:
    xml += f"  <url>\n    <loc>{url}</loc>\n  </url>\n"
xml += '</urlset>'

with open("public/sitemap.xml", "w") as f:
    f.write(xml)

# Create redirect 404 page for gh-pages SPA routing without hashes
with open("public/404.html", "w") as f:
    f.write("""<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Open Crypto Icons</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
""")

print("Generated sitemap.xml and SPA 404.html")
