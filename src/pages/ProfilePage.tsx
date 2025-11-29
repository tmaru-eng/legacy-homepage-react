import { RainbowText, BlinkText } from '../components/Effects';

interface FavoriteCategory {
  category: string;
  items: string[];
}

const ProfilePage: React.FC = () => {
  const favoriteThings: FavoriteCategory[] = [
    { category: '好きな食べ物', items: ['ラーメン', '焼肉', 'カレー'] },
    { category: '好きなゲーム', items: ['ドラクエ', 'FF', '女神転生'] },
    { category: '好きな音楽', items: ['J-POP', 'アニソン', 'ゲーム音楽'] },
    { category: '好きなサイト', items: ['Yahoo!', '2ch', '窓の杜'] },
  ];

  return (
    <div className="profile-page">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        <RainbowText>★ プロフィール ★</RainbowText>
      </h1>

      {/* 基本情報 */}
      <div className="section-box">
        <div className="section-title">★ 基本情報 ★</div>
        <table className="legacy-table">
          <tbody>
            <tr>
              <th style={{ width: '30%' }}>ハンドルネーム</th>
              <td>なつかし太郎(@tmaru-eng)</td>
            </tr>
            <tr>
              <th>年齢</th>
              <td>永遠の17歳 <span style={{ fontSize: '10px', color: '#999999' }}>（？）</span></td>
            </tr>
            <tr>
              <th>性別</th>
              <td>ヒ・ミ・ツ♪</td>
            </tr>
            <tr>
              <th>出身地</th>
              <td>日本のどこか</td>
            </tr>
            <tr>
              <th>職業</th>
              <td>学生（たぶん）</td>
            </tr>
            <tr>
              <th>趣味</th>
              <td>ネットサーフィン、ゲーム、ホームページ作り</td>
            </tr>
            <tr>
              <th>使用ブラウザ</th>
              <td>
                Netscape Navigator 4.7
                <span style={{ fontSize: '10px', color: '#00ff00', marginLeft: '10px' }}>
                  （推奨！）
                </span>
              </td>
            </tr>
            <tr>
              <th>使用PC</th>
              <td>
                Windows 98 SE<br />
                <span style={{ fontSize: '11px', color: '#999999' }}>
                  Pentium III 500MHz / RAM 128MB
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 自己紹介 */}
      <div className="section-box">
        <div className="section-title">★ 自己紹介 ★</div>
        <div style={{ padding: '10px', lineHeight: '1.8' }}>
          <p>
            はじめまして！<span style={{ color: '#00ffff' }}>なつかし太郎(@tmaru-eng)</span>です。
          </p>
          <p style={{ marginTop: '10px' }}>
            このホームページは、1990年代〜2000年代初頭の<br />
            <span style={{ color: '#ffff00' }}>「個人ホームページ」</span>の雰囲気を<br />
            現代の技術で再現することを目的に作りました。
          </p>
          <p style={{ marginTop: '10px' }}>
            当時は<span style={{ color: '#ff6600' }}>GeoCities</span>や
            <span style={{ color: '#ff6600' }}>COOL ONLINE</span>で<br />
            ホームページを持つのが流行っていましたね。
          </p>
          <p style={{ marginTop: '10px' }}>
            <BlinkText color="#ff0000">★</BlinkText>
            ぜひBBSに足跡を残していってください！
            <BlinkText color="#ff0000">★</BlinkText>
          </p>
        </div>
      </div>

      {/* 好きなもの */}
      <div className="section-box">
        <div className="section-title">★ 好きなもの ★</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', padding: '10px' }}>
          {favoriteThings.map((category, index) => (
            <div key={index} style={{ 
              background: 'rgba(0, 0, 102, 0.5)',
              border: '1px solid #666699',
              padding: '10px'
            }}>
              <h4 style={{ 
                color: '#ffff00', 
                fontSize: '13px',
                borderBottom: '1px dotted #666699',
                paddingBottom: '5px',
                marginBottom: '8px'
              }}>
                ▼ {category.category}
              </h4>
              <ul style={{ listStyle: 'none', fontSize: '12px' }}>
                {category.items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '3px' }}>
                    <span style={{ color: '#ff6600' }}>・</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 連絡先 */}
      <div className="section-box">
        <div className="section-title">★ 連絡先 ★</div>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>
            ご連絡はこちらまで↓
          </p>
          <a 
            href="https://x.com/tmaru_eng" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              background: '#000000',
              border: '1px inset #333333',
              padding: '10px 20px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#00ffff',
              textDecoration: 'none'
            }}
          >
            𝕏 @tmaru_eng
          </a>
          <p style={{ fontSize: '10px', color: '#999999', marginTop: '10px' }}>
            ※ DMまたはリプライでどうぞ
          </p>
          <p style={{ marginTop: '15px', fontSize: '12px' }}>
            または<span style={{ color: '#00ffff' }}>BBS</span>に書き込んでください！
          </p>
        </div>
      </div>

      {/* 使用ソフト */}
      <div className="section-box">
        <div className="section-title">★ このサイトの制作環境 ★</div>
        <div style={{ padding: '10px', fontSize: '12px' }}>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '5px' }}>
              <span style={{ color: '#ff6600' }}>▶</span> フレームワーク: React 19 + Vite
            </li>
            <li style={{ marginBottom: '5px' }}>
              <span style={{ color: '#ff6600' }}>▶</span> 言語: TypeScript
            </li>
            <li style={{ marginBottom: '5px' }}>
              <span style={{ color: '#ff6600' }}>▶</span> ルーティング: React Router
            </li>
            <li style={{ marginBottom: '5px' }}>
              <span style={{ color: '#ff6600' }}>▶</span> フロント: Cloudflare Pages
            </li>
            <li style={{ marginBottom: '5px' }}>
              <span style={{ color: '#ff6600' }}>▶</span> バックエンド: Cloudflare Workers + D1
            </li>
            <li style={{ marginBottom: '5px' }}>
              <span style={{ color: '#ff6600' }}>▶</span> デザイン: 自作CSS（レガシー風）
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
