# 🪙 Open Crypto Icons

Welcome to **Open Crypto Icons**, the most comprehensive open-source repository for cryptocurrency logos and icons. Our goal is to provide developers, designers, and creators with high-quality, up-to-date cryptocurrency icons that can be seamlessly integrated into any project. No more hunting for the right logo format.

## Demo & Web App
Check out our searchable Web App with on-the-fly PNG/JPG conversions:
👉 **[Open Crypto Icons Web App](https://essamamdani.github.io/open-crypto-icons/)**

## Features:
- **Free to Use:** Fully open-source and free to use in personal and commercial projects.
- **2x Retina SVGs:** All icons have been scaled and optimized to retina (2x) display quality with clean `.svg` code.
- **Multiple Formats:** Instantly download in SVG, PNG, and JPG formats via our Web App.
- **Constantly Updated:** Synchronized automatically with CoinGecko and TradingView.
- **High Availability:** Hosted on GitHub Pages with robust CDN infrastructure ensuring fast delivery.

## Usage (CDN)
Since this is hosted on GitHub Pages, you can directly hotlink the SVGs in your HTML, React, or Vue apps using our `gh-pages` branch:

```html
<img src="https://essamamdani.github.io/open-crypto-icons/icons/btc.svg" alt="Bitcoin Logo" />
```

```jsx
// React Example
const CoinIcon = ({ symbol }) => (
  <img src={`https://essamamdani.github.io/open-crypto-icons/icons/${symbol.toLowerCase()}.svg`} alt={symbol} />
);
```

## JSON Metadata
You can also fetch the full list of available coins (sorted by Market Cap) natively:
```bash
https://essamamdani.github.io/open-crypto-icons/coins.json
```
