import { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}年${month}月${day}日(${weekday}) ${hours}:${minutes}:${seconds}`;
  };

  return (
    <header className="header">
      <h1 className="header-title">
        ☆★☆ Welcome to My Homepage ☆★☆
      </h1>
      <p className="header-subtitle">
        ～ネットサーフィンの旅人へ贈る、懐かしのホームページ～
      </p>
      <p style={{ 
        fontSize: '11px', 
        color: '#00ffff', 
        marginTop: '8px',
        fontFamily: 'monospace'
      }}>
        現在時刻: {formatDate(currentTime)}
      </p>
    </header>
  );
};

export default Header;

