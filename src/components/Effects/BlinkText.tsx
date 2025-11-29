import React from 'react';
import type { BlinkTextProps } from '../../types';
import './Effects.css';

const BlinkText: React.FC<BlinkTextProps> = ({ 
  children, 
  color = '#ff0000', 
  speed = 'normal' 
}) => {
  const speedMap: Record<string, string> = {
    fast: '0.3s',
    normal: '0.5s',
    slow: '1s'
  };

  return (
    <span 
      className="blink-text"
      style={{ 
        color,
        animation: `blink ${speedMap[speed]} step-end infinite`
      }}
    >
      {children}
    </span>
  );
};

export default BlinkText;
