import './Effects.css';

const BlinkText = ({ children, color = '#ff0000', speed = 'normal' }) => {
  const animationDuration = {
    slow: '1.5s',
    normal: '1s',
    fast: '0.5s'
  };

  return (
    <span 
      className="blink-text"
      style={{ 
        color,
        animationDuration: animationDuration[speed] || animationDuration.normal
      }}
    >
      {children}
    </span>
  );
};

export default BlinkText;

