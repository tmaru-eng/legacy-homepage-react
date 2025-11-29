import { RainbowText, BlinkText } from '../components/Effects';
import { Banner } from '../components/Common';

interface LinkItem {
  name: string;
  url: string;
  description: string;
  banner: {
    bg: string;
    text: string;
  };
}

interface LinkCategory {
  title: string;
  links: LinkItem[];
}

const LinksPage: React.FC = () => {
  const linkCategories: LinkCategory[] = [
    {
      title: 'お友達のサイト',
      links: [
        {
          name: '懐かしの音楽館',
          url: '#',
          description: 'MIDIを配布しているサイトです。BGMはここからお借りしました！',
          banner: { bg: 'linear-gradient(45deg, #990099, #cc00cc)', text: 'MIDI HOUSE' }
        },
        {
          name: 'ゲーム攻略の部屋',
          url: '#',
          description: 'ドラクエやFFの攻略情報が満載！',
          banner: { bg: 'linear-gradient(45deg, #009900, #00cc00)', text: 'GAME ROOM' }
        },
        {
          name: '素材屋さん',
          url: '#',
          description: 'フリー素材を配布しています。このサイトの背景素材はここから！',
          banner: { bg: 'linear-gradient(45deg, #cc6600, #ff9933)', text: 'SOZAI' }
        }
      ]
    },
    {
      title: 'おすすめサイト',
      links: [
        {
          name: 'Yahoo! JAPAN',
          url: 'https://www.yahoo.co.jp',
          description: '日本最大のポータルサイト',
          banner: { bg: 'linear-gradient(45deg, #6600cc, #9933ff)', text: 'Yahoo!' }
        },
        {
          name: 'Vector',
          url: '#',
          description: 'フリーソフトといえばここ！',
          banner: { bg: 'linear-gradient(45deg, #006666, #009999)', text: 'Vector' }
        },
        {
          name: '窓の杜',
          url: '#',
          description: 'Windowsソフトの紹介サイト',
          banner: { bg: 'linear-gradient(45deg, #003366, #006699)', text: 'MADO' }
        }
      ]
    },
    {
      title: 'サーチエンジン',
      links: [
        {
          name: 'Google',
          url: 'https://www.google.com',
          description: '最近人気の検索エンジン',
          banner: { bg: 'linear-gradient(45deg, #4285f4, #34a853)', text: 'Google' }
        },
        {
          name: 'goo',
          url: '#',
          description: 'NTTの検索サイト',
          banner: { bg: 'linear-gradient(45deg, #00cc66, #00ff99)', text: 'goo' }
        }
      ]
    }
  ];

  return (
    <div className="links-page">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        <RainbowText>★ リンク集 ★</RainbowText>
      </h1>

      {/* 相互リンク募集 */}
      <div className="section-box" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '14px', marginBottom: '10px' }}>
          <BlinkText color="#ff0000" speed="slow">★相互リンク募集中★</BlinkText>
        </p>
        <p style={{ fontSize: '12px', color: '#cccccc' }}>
          リンクを貼っていただける方はBBSでご連絡ください！<br />
          バナーは下にあります↓
        </p>
      </div>

      {/* 当サイトのバナー */}
      <div className="section-box">
        <div className="section-title">★ 当サイトのバナー ★</div>
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <p style={{ fontSize: '12px', color: '#cccccc', marginBottom: '15px' }}>
            リンクを貼る際はこちらのバナーをお使いください
          </p>
          
          <div style={{ marginBottom: '15px' }}>
            <Banner 
              width={200} 
              height={40} 
              text="☆ なつかし太郎のHP ☆" 
              bgGradient="linear-gradient(45deg, #000066, #0000cc, #000066)"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <Banner 
              width={88} 
              height={31} 
              text="なつかしHP" 
              bgGradient="linear-gradient(45deg, #ff6600, #ffcc00)"
            />
          </div>

          <div style={{ 
            background: '#000000',
            border: '1px inset #333333',
            padding: '10px',
            fontSize: '11px',
            fontFamily: 'monospace',
            color: '#00ff00',
            wordBreak: 'break-all',
            textAlign: 'left'
          }}>
            &lt;a href="https://legacy-homepage-react.pages.dev/"&gt;<br />
            &lt;img src="banner.gif" alt="なつかし太郎のHP"&gt;<br />
            &lt;/a&gt;
          </div>

          <p style={{ fontSize: '10px', color: '#ff0000', marginTop: '10px' }}>
            ※直リンクOKです！
          </p>
        </div>
      </div>

      {/* リンクカテゴリ */}
      {linkCategories.map((category, catIndex) => (
        <div key={catIndex} className="section-box">
          <div className="section-title">★ {category.title} ★</div>
          <div style={{ padding: '10px' }}>
            {category.links.map((link, linkIndex) => (
              <div key={linkIndex} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                marginBottom: '15px',
                paddingBottom: '15px',
                borderBottom: linkIndex < category.links.length - 1 ? '1px dotted #333366' : 'none'
              }}>
                {/* バナー */}
                <div style={{ flexShrink: 0 }}>
                  <Banner 
                    width={88} 
                    height={31} 
                    text={link.banner.text}
                    bgGradient={link.banner.bg}
                    href={link.url}
                  />
                </div>
                {/* 説明 */}
                <div>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '14px', fontWeight: 'bold' }}
                  >
                    {link.name}
                  </a>
                  {catIndex === 0 && linkIndex === 0 && (
                    <span className="new-badge">NEW!</span>
                  )}
                  <p style={{ fontSize: '12px', color: '#cccccc', marginTop: '5px' }}>
                    {link.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* リンクについて */}
      <div className="section-box">
        <div className="section-title">★ リンクについて ★</div>
        <ul style={{ 
          fontSize: '12px', 
          color: '#cccccc', 
          lineHeight: '1.8',
          listStyle: 'none',
          padding: '10px'
        }}>
          <li><span style={{ color: '#ff6600' }}>▶</span> 当サイトはリンクフリーです</li>
          <li><span style={{ color: '#ff6600' }}>▶</span> 相互リンクご希望の方はBBSまで</li>
          <li><span style={{ color: '#ff6600' }}>▶</span> リンク切れを発見したらお知らせください</li>
          <li><span style={{ color: '#ff6600' }}>▶</span> アダルト・違法サイトとのリンクはお断りします</li>
        </ul>
      </div>

      <style>{`
        @keyframes banner-glow {
          from { box-shadow: 0 0 5px #6666ff; }
          to { box-shadow: 0 0 15px #6666ff, 0 0 25px #0000ff; }
        }
      `}</style>
    </div>
  );
};

export default LinksPage;
