import React from 'react';
import type { MarqueeProps } from '../../types';
import './Effects.css';

const Marquee: React.FC<MarqueeProps> = ({ children, speed = 20 }) => {
  return (
    <div className="marquee-container">
      <div 
        className="marquee-content"
        style={{ 
          animation: `marquee ${speed}s linear infinite`
        }}
      >
        {children}
        {/* 連続表示のため複製 */}
        <span style={{ paddingLeft: '100px' }}>{children}</span>
      </div>
    </div>
  );
};

export default Marquee;
