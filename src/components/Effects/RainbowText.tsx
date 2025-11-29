import React from 'react';
import type { RainbowTextProps } from '../../types';
import './Effects.css';

const RainbowText: React.FC<RainbowTextProps> = ({ children, animated = false }) => {
  const rainbowColors = [
    '#ff0000', '#ff7f00', '#ffff00', '#00ff00', 
    '#0000ff', '#4b0082', '#8b00ff'
  ];

  if (animated) {
    return (
      <span className="rainbow-text-animated">
        {children}
      </span>
    );
  }

  // 各文字に色を適用
  return (
    <span className="rainbow-text">
      {children.split('').map((char, index) => (
        <span 
          key={index}
          style={{ color: rainbowColors[index % rainbowColors.length] }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default RainbowText;
