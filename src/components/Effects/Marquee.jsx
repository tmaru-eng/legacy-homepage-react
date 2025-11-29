import { useEffect, useRef } from 'react';
import './Effects.css';

const Marquee = ({ children, speed = 50, direction = 'left' }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content) return;

    let position = direction === 'left' ? container.offsetWidth : -content.offsetWidth;
    
    const animate = () => {
      if (direction === 'left') {
        position -= 1;
        if (position < -content.offsetWidth) {
          position = container.offsetWidth;
        }
      } else {
        position += 1;
        if (position > container.offsetWidth) {
          position = -content.offsetWidth;
        }
      }
      content.style.transform = `translateX(${position}px)`;
    };

    const interval = setInterval(animate, speed);
    return () => clearInterval(interval);
  }, [speed, direction]);

  return (
    <div className="marquee-container" ref={containerRef}>
      <div className="marquee-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default Marquee;

