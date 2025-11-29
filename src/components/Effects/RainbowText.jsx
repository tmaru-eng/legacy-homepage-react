import './Effects.css';

const RainbowText = ({ children, animated = false }) => {
  const text = String(children);
  const colors = [
    '#ff0000', // 赤
    '#ff7f00', // オレンジ
    '#ffff00', // 黄
    '#00ff00', // 緑
    '#0000ff', // 青
    '#4b0082', // 藍
    '#8f00ff', // 紫
  ];

  if (animated) {
    return (
      <span className="rainbow-text-animated">
        {text}
      </span>
    );
  }

  return (
    <span className="rainbow-text">
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          style={{ color: colors[index % colors.length] }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default RainbowText;

