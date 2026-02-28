const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Insert SEO Helmet import
code = code.replace(
  "import { Search, Zap, ChevronLeft, ChevronRight, Copy, CheckCircle, ArrowLeft } from 'lucide-react';",
  "import { Search, Zap, ChevronLeft, ChevronRight, Copy, CheckCircle, ArrowLeft } from 'lucide-react';\nimport SEOHelmet from './SEOHelmet';"
);

// Add Home SEO
code = code.replace(
  "<div className=\"max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8\">",
  `<div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
       <SEOHelmet 
         title="Open Crypto Icons - Free High-Quality Cryptocurrency Logos" 
         description="Download high-quality cryptocurrency icons in SVG, PNG, and JPG formats. Search for Bitcoin, Ethereum, and thousands of other crypto logos."
         image="https://essamamdani.github.io/open-crypto-icons/vite.svg"
         url="https://essamamdani.github.io/open-crypto-icons/"
       />`
);

// Add About SEO
code = code.replace(
  "<div className=\"max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8\">",
  `<div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <SEOHelmet 
         title="About - Open Crypto Icons" 
         description="Learn about Open Crypto Icons, the most comprehensive open-source repository for cryptocurrency logos and icons."
         image="https://essamamdani.github.io/open-crypto-icons/vite.svg"
         url="https://essamamdani.github.io/open-crypto-icons/about"
       />`
);

// Add IconDetail SEO
code = code.replace(
  "const cdnUrl = `https://essamamdani.github.io/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`;",
  `const cdnUrl = \`https://essamamdani.github.io/open-crypto-icons/icons_svg/\${icon.symbol.toLowerCase()}.svg\`;
  const pageUrl = \`https://essamamdani.github.io/open-crypto-icons/\${icon.symbol.toLowerCase()}\`;`
);

code = code.replace(
  "<div className=\"max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8\">",
  `<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet 
         title={\`\${icon.name} (\${icon.symbol.toUpperCase()}) Icon SVG, PNG, JPG Download - Open Crypto Icons\`} 
         description={\`Download \${icon.name} (\${icon.symbol.toUpperCase()}) vector logo in SVG, PNG, and JPG formats. Free and open-source \${icon.name} crypto icon.\`}
         image={cdnUrl}
         url={pageUrl}
       />`
);

fs.writeFileSync('src/App.tsx', code);
