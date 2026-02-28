
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
  
  const src = `https://essamamdani.github.io/open-crypto-icons/${dir}/${sym}.svg`;
  
  return (
    <img 
      src={src} 
      alt={`${symbol.toUpperCase()} icon`} 
      width={size} 
      height={size} 
      className={`open-crypto-icon ${className}`} 
      style={style}
      onError={(e) => {
        // Fallback to a default generic crypto icon if the symbol doesn't exist
        e.target.src = 'https://essamamdani.github.io/open-crypto-icons/icons_svg/crypto.svg';
      }}
      {...props} 
    />
  );
};
