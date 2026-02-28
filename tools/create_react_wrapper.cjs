const fs = require('fs');

const coins = require('../public/coins.json');

// We don't want to bundle 6700 SVGs into NPM, that would be a ~100MB+ package.
// We provide an <Icon /> component that fetches from jsdelivr or our gh-pages.

let code = `
import React from 'react';

const CDN_URL = 'https://essamamdani.github.io/open-crypto-icons/icons_svg';

export const CryptoIcon = ({ symbol = 'btc', variant = 'colored', size = 24, className = '', style = {}, ...props }) => {
  const sym = symbol.toLowerCase();
  
  // As a lightweight package, we return an <img> tag pointing to our high-speed CDN.
  // Alternatively we can use variants like colored, black, white, outline.
  // We'll support 'colored' natively from TradingView (the main collection).
  // The 'black', 'white', 'outline' variants will fall back to 'colored' if missing (from spothq mostly).
  
  let dir = 'icons_svg'; // Main collection
  if (variant === 'black') dir = 'icons/black';
  if (variant === 'white') dir = 'icons/white';
  if (variant === 'outline') dir = 'icons/outline';
  if (variant === 'colored') dir = 'icons/colored';
  
  const src = \`https://essamamdani.github.io/open-crypto-icons/\${dir}/\${sym}.svg\`;
  
  return (
    <img 
      src={src} 
      alt={\`\${symbol.toUpperCase()} icon\`} 
      width={size} 
      height={size} 
      className={\`open-crypto-icon \${className}\`} 
      style={style}
      onError={(e) => {
        // Fallback to a default generic crypto icon if the symbol doesn't exist
        e.target.src = 'https://essamamdani.github.io/open-crypto-icons/icons_svg/crypto.svg';
      }}
      {...props} 
    />
  );
};
`;

const typeDefs = `
import React from 'react';

export interface CryptoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  symbol: string;
  variant?: 'colored' | 'black' | 'white' | 'outline';
  size?: number | string;
}

export const CryptoIcon: React.FC<CryptoIconProps>;
`;

fs.mkdirSync('./react', { recursive: true });
fs.writeFileSync('./react/index.js', code);
fs.writeFileSync('./react/index.d.ts', typeDefs);

// Also update package.json to have exports
const pkg = require('../package.json');
pkg.name = "open-crypto-icons";
pkg.version = "1.0.0";
pkg.main = "react/index.js";
pkg.types = "react/index.d.ts";
pkg.exports = {
  ".": {
    "import": "./react/index.js",
    "require": "./react/index.js",
    "types": "./react/index.d.ts"
  },
  "./react": {
    "import": "./react/index.js",
    "require": "./react/index.js",
    "types": "./react/index.d.ts"
  }
};
fs.writeFileSync('../package.json', JSON.stringify(pkg, null, 2));

console.log("React wrapper generated.");
