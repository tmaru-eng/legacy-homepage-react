import React from 'react';
import type { BannerProps } from '../../types';
import './Common.css';

const Banner: React.FC<BannerProps> = ({ 
  width = 88, 
  height = 31, 
  text = 'BANNER', 
  bgGradient = 'linear-gradient(45deg, #000066, #0000cc)',
  href
}) => {
  const bannerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    background: bgGradient,
    border: '1px solid #333366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: width > 100 ? '12px' : '9px',
    color: '#ffffff',
    textShadow: '1px 1px 0 #000000',
    fontWeight: 'bold',
    overflow: 'hidden',
    textDecoration: 'none',
    cursor: href ? 'pointer' : 'default'
  };

  const content = (
    <div style={bannerStyle} className="legacy-banner">
      {text}
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: 'inline-block' }}
      >
        {content}
      </a>
    );
  }

  return content;
};

export default Banner;
