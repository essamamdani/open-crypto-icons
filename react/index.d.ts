
import React from 'react';

export interface CryptoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  symbol: string;
  variant?: 'colored' | 'black' | 'white' | 'outline';
  size?: number | string;
}

export const CryptoIcon: React.FC<CryptoIconProps>;
