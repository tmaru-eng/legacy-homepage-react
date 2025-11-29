import React from 'react';
import type { UnderConstructionProps } from '../../types';
import './Common.css';

const UnderConstruction: React.FC<UnderConstructionProps> = ({ 
  message = 'このページは工事中です' 
}) => {
  return (
    <div className="under-construction">
      <div className="construction-icon">
        <span className="icon-animated">🚧</span>
        <span className="icon-animated delay">⚠️</span>
        <span className="icon-animated">🚧</span>
      </div>
      <div className="construction-message">
        <span className="blink-slow">{message}</span>
      </div>
      <div className="construction-sub">
        - Under Construction -
      </div>
    </div>
  );
};

export default UnderConstruction;
