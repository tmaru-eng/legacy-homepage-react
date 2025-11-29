import './Common.css';

const Banner = ({ 
  width = 88, 
  height = 31, 
  text = 'BANNER', 
  bgGradient = 'linear-gradient(45deg, #336699, #6699cc)',
  textColor = '#ffffff',
  href = null,
  onClick = null
}) => {
  const bannerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    background: bgGradient,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: width > 100 ? '10px' : '8px',
    color: textColor,
    fontWeight: 'bold',
    textDecoration: 'none',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
    cursor: href || onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
  };

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="banner-link"
        style={bannerStyle}
        onClick={handleClick}
      >
        {text}
      </a>
    );
  }

  return (
    <div className="banner" style={bannerStyle}>
      {text}
    </div>
  );
};

// プリセットバナー
Banner.Netscape = () => (
  <Banner 
    text="Netscape Now!" 
    bgGradient="linear-gradient(45deg, #006600, #009900)"
    textColor="#ffffff"
  />
);

Banner.IE = () => (
  <Banner 
    text="Best viewed with IE" 
    bgGradient="linear-gradient(45deg, #003399, #0066cc)"
    textColor="#ffffff"
  />
);

Banner.GeoCities = () => (
  <Banner 
    text="Hosted by GeoCities" 
    bgGradient="linear-gradient(45deg, #cc0000, #ff3333)"
    textColor="#ffffff"
  />
);

Banner.HTML40 = () => (
  <Banner 
    text="Valid HTML 4.0" 
    bgGradient="linear-gradient(45deg, #333333, #666666)"
    textColor="#00ff00"
  />
);

export default Banner;

