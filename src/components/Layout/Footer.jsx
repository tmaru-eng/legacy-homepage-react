import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* フッターリンク */}
      <div className="footer-links">
        <Link to="/">TOP</Link>
        <span style={{ color: '#666666' }}>|</span>
        <Link to="/profile">PROFILE</Link>
        <span style={{ color: '#666666' }}>|</span>
        <Link to="/bbs">BBS</Link>
        <span style={{ color: '#666666' }}>|</span>
        <Link to="/links">LINK</Link>
      </div>

      {/* バナーエリア */}
      <div className="banner-area">
        {/* サンプルバナー（CSS生成） */}
        <div style={{
          width: '88px',
          height: '31px',
          background: 'linear-gradient(135deg, #003366, #006699)',
          border: '1px solid #336699',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '7px',
          color: '#ffffff'
        }}>
          GeoCities
        </div>
        <div style={{
          width: '88px',
          height: '31px',
          background: 'linear-gradient(135deg, #333333, #666666)',
          border: '1px solid #999999',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          color: '#00ff00'
        }}>
          HTML 4.0
        </div>
        <div style={{
          width: '88px',
          height: '31px',
          background: 'linear-gradient(135deg, #660066, #990099)',
          border: '1px solid #cc00cc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '7px',
          color: '#ffffff'
        }}>
          素材屋さん
        </div>
      </div>

      {/* コピーライト */}
      <div className="footer-copyright">
        <p>
          ━━━━━━━━━━━━━━━━━━━━━━━━━━
        </p>
        <p style={{ margin: '5px 0' }}>
          Copyright (C) 1999-{currentYear} なつかし太郎(@tmaru-eng) All Rights Reserved.
        </p>
        <p style={{ fontSize: '10px', color: '#666666' }}>
          当サイトの画像・文章の無断転載を禁じます
        </p>
        <p style={{ marginTop: '10px', color: '#666666' }}>
          ━━━━━━━━━━━━━━━━━━━━━━━━━━
        </p>
      </div>

      {/* 素材クレジット */}
      <div style={{ 
        marginTop: '10px', 
        fontSize: '10px', 
        color: '#666699' 
      }}>
        <p>素材提供: 架空の素材屋さん様</p>
        <p>カウンターCGI: 架空のCGI配布サイト様</p>
      </div>
    </footer>
  );
};

export default Footer;

