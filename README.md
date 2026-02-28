# 🪙 Open Crypto Icons

Welcome to **Open Crypto Icons**, the most comprehensive open-source repository for cryptocurrency logos and icons. Our goal is to provide developers, designers, and creators with high-quality, up-to-date cryptocurrency icons that can be seamlessly integrated into any project. No more hunting for the right logo format.

## Demo & Web App
Check out our searchable Web App with on-the-fly PNG/JPG conversions:
👉 **[Open Crypto Icons Web App](https://essamamdani.github.io/open-crypto-icons/)**

## Features:
- **Free to Use:** Fully open-source and free to use in personal and commercial projects.
- **Huge Collection:** Over 6,700+ cryptocurrency icons and counting.
- **Multiple Formats:** Instantly download in SVG, PNG, and JPG formats via our Web App.
- **NPM Support:** Easy to use React components available via NPM.
- **High Availability:** Assets are served directly from our GitHub Pages CDN ensuring fast delivery.

---

## 🚀 Installation (NPM / React)

We provide a lightweight React component wrapper so you don't have to bundle thousands of SVGs into your app. The component automatically fetches the high-quality vector icons directly from our CDN.

**Install the package:**
```bash
npm install open-crypto-icons
# or
yarn add open-crypto-icons
# or
pnpm add open-crypto-icons
```

**Usage in React:**
```jsx
import { CryptoIcon } from 'open-crypto-icons/react';

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Default (Colored) Bitcoin Icon */}
      <CryptoIcon symbol="btc" size={48} />
      
      {/* Solid Black Ethereum Icon */}
      <CryptoIcon symbol="eth" variant="black" size={48} />
      
      {/* Solid White Solana Icon (good for dark mode) */}
      <CryptoIcon symbol="sol" variant="white" size={48} />
      
      {/* Transparent Outline Icon */}
      <CryptoIcon symbol="doge" variant="outline" size={48} />
    </div>
  );
}
```

**Available Props for `<CryptoIcon />`:**
- `symbol` (string): The ticker symbol of the coin (e.g., `'btc'`, `'eth'`, `'usdt'`).
- `variant` (string): Style of the icon. Options are `'colored'` (default), `'black'`, `'white'`, or `'outline'`.
- `size` (number | string): Width and height of the icon. Defaults to `24`.
- Extends standard `img` props like `className`, `style`, etc.

---

## 🌐 Usage via CDN (HTML/Vue/Vanilla JS)

Since this is hosted on GitHub Pages, you can directly hotlink the SVGs in your HTML or any other framework using our `gh-pages` branch:

```html
<!-- Colored Bitcoin Icon -->
<img src="https://essamamdani.github.io/open-crypto-icons/icons/colored/btc.svg" width="48" alt="Bitcoin Logo" />

<!-- Black Monochrome Ethereum Icon -->
<img src="https://essamamdani.github.io/open-crypto-icons/icons/black/eth.svg" width="48" alt="Ethereum Logo" />
```

## JSON Metadata
You can also fetch the full list of available coins (sorted by Market Cap) natively:
```bash
https://essamamdani.github.io/open-crypto-icons/coins.json
```
