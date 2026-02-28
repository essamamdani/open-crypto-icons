# 🪙 Open Crypto Icons

Welcome to **Open Crypto Icons**, the most comprehensive open-source repository for cryptocurrency logos and icons. Our goal is to provide developers, designers, and creators with high-quality, up-to-date cryptocurrency icons that can be seamlessly integrated into any project. No more hunting for the right logo format.

## Features:
- **Free to Use:** Fully open-source and free to use in personal and commercial projects.
- **2x Retina SVGs:** All icons have been scaled and optimized to retina (2x) display quality with clean `.svg` code.
- **Multiple Formats:** Instantly download in SVG, PNG, and JPG formats via our Web App.
- **Constantly Updated:** Synchronized automatically with CoinGecko and TradingView.
- **High Availability:** Hosted on GitHub Pages with robust CDN infrastructure ensuring fast delivery.

## Usage

### Using the Search App
1. Go to our [GitHub Pages App URL](https://essamamdani.github.io/open-crypto-icons/)
2. Search for any coin by Name (e.g. `Bitcoin`) or Symbol (e.g. `BTC`)
3. Hover over any icon and download it in SVG, PNG, or JPG formats.

### Using as a CDN in your projects
Since this is hosted on GitHub Pages, you can directly hotlink the SVGs in your HTML, React, or Vue apps:

```html
<img src="https://essamamdani.github.io/open-crypto-icons/icons_svg/btc.svg" alt="Bitcoin Logo" />
```

```jsx
// React Example
const CoinIcon = ({ symbol }) => (
  <img src={`https://essamamdani.github.io/open-crypto-icons/icons_svg/${symbol.toLowerCase()}.svg`} alt={symbol} />
);
```

### Direct Download
You can also browse the [`public/icons_svg/`](public/icons_svg/) folder in this repository and download the RAW `.svg` files directly to your machine.
