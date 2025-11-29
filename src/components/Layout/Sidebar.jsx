import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'トップページ', icon: '🏠' },
    { path: '/profile', label: 'プロフィール', icon: '👤' },
    { path: '/bbs', label: '掲示板(BBS)', icon: '📝' },
    { path: '/links', label: 'リンク集', icon: '🔗' },
    { path: '/wip', label: '工事中', icon: '🚧' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      {/* メニュー */}
      <div className="sidebar-section">
        <div className="sidebar-title">★ MENU ★</div>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} style={{
              background: isActive(item.path) ? 'rgba(255, 102, 0, 0.3)' : 'transparent'
            }}>
              <Link to={item.path}>
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* バナーエリア */}
      <div className="sidebar-section">
        <div className="sidebar-title">★ BANNER ★</div>
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          {/* 88x31 バナー */}
          <div style={{
            width: '88px',
            height: '31px',
            background: 'linear-gradient(45deg, #ff6600, #ffcc00)',
            border: '1px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '7px',
            color: '#000000',
            fontWeight: 'bold',
            margin: '0 auto 10px'
          }}>
            なつかしHP
          </div>
          <p style={{ fontSize: '10px', color: '#ffff00' }}>
            ↑リンクフリー！
          </p>
        </div>
      </div>

      {/* ミニカウンター */}
      <div className="sidebar-section">
        <div className="sidebar-title">★ INFO ★</div>
        <div style={{ fontSize: '11px', padding: '5px' }}>
          <p>管理人: なつかし太郎(@tmaru-eng)</p>
          <p style={{ marginTop: '5px' }}>
            Since: 1999.04.01
          </p>
          <p style={{ marginTop: '5px', color: '#ff6600' }}>
            ★キリ番踏んだ人は
            <br />
            　BBSに報告してね！
          </p>
        </div>
      </div>

      {/* おすすめ */}
      <div className="sidebar-section">
        <div className="sidebar-title">★ 推奨環境 ★</div>
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <p style={{ fontSize: '10px', color: '#cccccc' }}>
            このサイトは
            <br />
            <span style={{ color: '#00ff00' }}>Netscape Navigator 4.0</span>
            <br />
            以上で最適化されています
          </p>
          <div style={{
            marginTop: '10px',
            padding: '5px',
            background: '#000000',
            border: '1px solid #666666',
            fontSize: '9px',
            color: '#999999'
          }}>
            800×600以上推奨
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

