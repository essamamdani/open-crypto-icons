const fs = require('fs');

// Add Docs to App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

if (!appCode.includes('import Docs from')) {
  appCode = appCode.replace(
    "import SEOHelmet from './SEOHelmet';", 
    "import SEOHelmet from './SEOHelmet';\nimport Docs from './Docs';"
  );
}

if (!appCode.includes('<Route path="/docs"')) {
  appCode = appCode.replace(
    '<Route path="/about" element={<About />} />',
    '<Route path="/about" element={<About />} />\n          <Route path="/docs" element={<Docs />} />'
  );
}

fs.writeFileSync('src/App.tsx', appCode);

// Fix index.css to enforce manual class toggle
let cssCode = fs.readFileSync('src/index.css', 'utf8');
if (!cssCode.includes('@custom-variant dark')) {
  cssCode = cssCode.replace('@import "tailwindcss";', `@import "tailwindcss";\n\n/* dark mode ONLY via class */\n@custom-variant dark (&:where(.dark, .dark *));\n`);
}
fs.writeFileSync('src/index.css', cssCode);

// Ensure index.html has color-scheme
let htmlCode = fs.readFileSync('index.html', 'utf8');
if (!htmlCode.includes('color-scheme: dark')) {
  htmlCode = htmlCode.replace('<html lang="en"', '<html lang="en" class="dark" style="color-scheme: dark;"');
}
fs.writeFileSync('index.html', htmlCode);

