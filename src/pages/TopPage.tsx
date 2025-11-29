import { AccessCounter } from '../components/Counter';
import { Marquee, BlinkText, RainbowText } from '../components/Effects';
import { Link } from 'react-router-dom';

interface UpdateHistoryItem {
  date: string;
  content: string;
  isNew: boolean;
}

const TopPage: React.FC = () => {
  const updateHistory: UpdateHistoryItem[] = [
    { date: '2025/11/29', content: 'リンク集を更新しました', isNew: true },
    { date: '2025/11/15', content: 'BBSを設置しました！', isNew: true },
    { date: '2025/11/01', content: 'プロフィールページを更新', isNew: false },
    { date: '2025/10/15', content: 'カウンター設置しました', isNew: false },
    { date: '2025/10/01', content: 'ホームページ開設！', isNew: false },
  ];

  return (
    <div className="top-page">
      {/* Marquee お知らせ */}
      <Marquee speed={30}>
        <span style={{ color: '#ffff00' }}>
          ★☆★ ようこそ！このサイトは1990〜2000年代のホームページを再現しています ★☆★
          　　　キリ番踏んだ人はBBSで報告してね！　　　
          <BlinkText color="#ff0000">NEW!</BlinkText> リンク集を更新しました！　　　
        </span>
      </Marquee>

      {/* ウェルカムメッセージ */}
      <div className="section-box" style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2 style={{ marginBottom: '15px' }}>
          <RainbowText animated>
            ☆★☆ Welcome to My Homepage! ☆★☆
          </RainbowText>
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
          ネットサーファーの皆さん、いらっしゃいませ！<br />
          このホームページは管理人「なつかし太郎(@tmaru-eng)」が運営する<br />
          <span style={{ color: '#ff6600' }}>懐かしのインターネット</span>をテーマにしたサイトです。
        </p>
        <p style={{ marginTop: '15px', fontSize: '12px', color: '#999999' }}>
          ゆっくりしていってね！！！
        </p>
      </div>

      {/* アクセスカウンター */}
      <AccessCounter />

      {/* コンテンツ案内 */}
      <div className="section-box">
        <div className="section-title">★ コンテンツ ★</div>
        <table className="legacy-table">
          <tbody>
            <tr>
              <td style={{ width: '30%', textAlign: 'center' }}>
                <Link to="/profile" style={{ fontSize: '14px' }}>
                  👤 プロフィール
                </Link>
              </td>
              <td>管理人の自己紹介です</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <Link to="/bbs" style={{ fontSize: '14px' }}>
                  📝 掲示板(BBS)
                </Link>
                <span className="new-badge">NEW!</span>
              </td>
              <td>足跡を残していってね♪ キリ番報告もこちらで！</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <Link to="/links" style={{ fontSize: '14px' }}>
                  🔗 リンク集
                </Link>
              </td>
              <td>相互リンク募集中です！</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <Link to="/wip" style={{ fontSize: '14px' }}>
                  🚧 工事中
                </Link>
              </td>
              <td>準備中のページです。お楽しみに！</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 更新履歴 */}
      <div className="section-box">
        <div className="section-title">★ 更新履歴 ★</div>
        <ul className="update-history">
          {updateHistory.map((item, index) => (
            <li key={index}>
              <span className="update-date">{item.date}</span>
              {item.content}
              {item.isNew && <span className="new-badge">NEW!</span>}
            </li>
          ))}
        </ul>
        <p style={{ 
          textAlign: 'right', 
          fontSize: '11px', 
          color: '#666699',
          marginTop: '10px'
        }}>
          ▶ <Link to="/wip">過去の更新履歴</Link>
        </p>
      </div>

      {/* お知らせ */}
      <div className="section-box">
        <div className="section-title">★ お知らせ ★</div>
        <div style={{ padding: '10px' }}>
          <p style={{ marginBottom: '10px' }}>
            <BlinkText color="#ff0000" speed="slow">★重要★</BlinkText>
            　相互リンク募集中です！
          </p>
          <p style={{ fontSize: '12px', color: '#cccccc' }}>
            リンクを貼っていただける方は、BBSかメールでご連絡ください。<br />
            バナーは<Link to="/links">リンク集</Link>に置いてあります。
          </p>
        </div>
      </div>

      {/* MIDI風BGMボタン */}
      <div className="section-box" style={{ textAlign: 'center' }}>
        <div className="section-title">★ BGM ★</div>
        <p style={{ fontSize: '12px', color: '#cccccc', marginBottom: '10px' }}>
          ※実際には音は鳴りません（再現です）
        </p>
        <div style={{ 
          display: 'inline-flex', 
          gap: '5px',
          background: '#000000',
          padding: '5px 10px',
          border: '2px inset #333333'
        }}>
          <button 
            className="legacy-button" 
            style={{ padding: '3px 8px', fontSize: '11px' }}
            onClick={() => alert('♪ ～BGM再生中～ ♪\n（実際には音は鳴りません）')}
          >
            ▶ PLAY
          </button>
          <button 
            className="legacy-button" 
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            ⏹ STOP
          </button>
          <button 
            className="legacy-button" 
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            🔁 LOOP
          </button>
        </div>
        <p style={{ fontSize: '10px', color: '#666666', marginTop: '10px' }}>
          BGM: 「懐かしのMIDI」（架空の素材屋さん様より）
        </p>
      </div>

      {/* フッターメッセージ */}
      <hr className="legacy-hr" />
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#999999' }}>
        <p>
          このページは<span style={{ color: '#00ff00' }}>React + Vite</span>で作られています
        </p>
        <p style={{ marginTop: '5px' }}>
          レトロなデザインをモダンな技術で再現！
        </p>
      </div>
    </div>
  );
};

export default TopPage;
