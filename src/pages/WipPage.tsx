import { UnderConstruction } from '../components/Common';
import { RainbowText, BlinkText } from '../components/Effects';
import { Link } from 'react-router-dom';

interface PlannedContent {
  name: string;
  description: string;
  progress: number;
}

const WipPage: React.FC = () => {
  const plannedContent: PlannedContent[] = [
    { name: 'ギャラリー', description: '自作イラストを公開予定', progress: 30 },
    { name: '日記', description: '日々の出来事を綴ります', progress: 10 },
    { name: 'ゲームコーナー', description: 'JavaScriptゲームを設置予定', progress: 5 },
    { name: 'チャットルーム', description: 'リアルタイムチャット（予定）', progress: 0 },
  ];

  return (
    <div className="wip-page">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        <RainbowText>★ 工事中 ★</RainbowText>
      </h1>

      {/* メインの工事中表示 */}
      <UnderConstruction message="このページは現在準備中です" />

      {/* 予定コンテンツ */}
      <div className="section-box">
        <div className="section-title">★ 準備中のコンテンツ ★</div>
        <div style={{ padding: '10px' }}>
          {plannedContent.map((content, index) => (
            <div key={index} style={{
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: index < plannedContent.length - 1 ? '1px dotted #333366' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: '#ffff00', fontWeight: 'bold' }}>
                  ▼ {content.name}
                </span>
                {content.progress === 0 && (
                  <span style={{ 
                    fontSize: '10px', 
                    color: '#999999',
                    background: '#333333',
                    padding: '2px 6px'
                  }}>
                    未着手
                  </span>
                )}
              </div>
              <p style={{ fontSize: '12px', color: '#cccccc', marginBottom: '8px' }}>
                {content.description}
              </p>
              {/* プログレスバー */}
              <div style={{
                background: '#000000',
                border: '1px solid #666666',
                height: '16px',
                position: 'relative'
              }}>
                <div style={{
                  background: content.progress > 0 
                    ? 'linear-gradient(to right, #006600, #00cc00)' 
                    : '#333333',
                  height: '100%',
                  width: `${content.progress}%`,
                  transition: 'width 0.3s ease'
                }} />
                <span style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '10px',
                  color: '#ffffff',
                  textShadow: '1px 1px 0 #000000'
                }}>
                  {content.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* お知らせ */}
      <div className="section-box">
        <div className="section-title">★ お知らせ ★</div>
        <div style={{ padding: '15px', textAlign: 'center' }}>
          <p style={{ marginBottom: '15px' }}>
            <BlinkText color="#ffff00">★</BlinkText>
            　完成したらBBSでお知らせします！　
            <BlinkText color="#ffff00">★</BlinkText>
          </p>
          <p style={{ fontSize: '12px', color: '#cccccc' }}>
            「こんなコンテンツが欲しい！」などの<br />
            ご要望がありましたら
            <Link to="/bbs" style={{ margin: '0 5px' }}>BBS</Link>
            までどうぞ！
          </p>
        </div>
      </div>

      {/* 懐かしの工事中GIF風 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px',
        margin: '30px 0',
        flexWrap: 'wrap'
      }}>
        {/* 工事中アイコン1 */}
        <div style={{
          width: '100px',
          height: '100px',
          background: '#ffcc00',
          border: '3px solid #000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'shake 0.5s ease-in-out infinite'
        }}>
          <span style={{ fontSize: '40px' }}>⚠️</span>
          <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#000000' }}>
            UNDER
          </span>
          <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#000000' }}>
            CONSTRUCTION
          </span>
        </div>

        {/* 工事中アイコン2 */}
        <div style={{
          width: '100px',
          height: '100px',
          background: 'repeating-linear-gradient(45deg, #ffcc00, #ffcc00 10px, #000000 10px, #000000 20px)',
          border: '3px solid #ffcc00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '5px 10px',
            transform: 'rotate(-10deg)'
          }}>
            <span style={{ fontSize: '24px' }}>🚧</span>
          </div>
        </div>

        {/* 工事中アイコン3 */}
        <div style={{
          width: '100px',
          height: '100px',
          background: '#ff6600',
          border: '3px solid #cc3300',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 1s ease-in-out infinite'
        }}>
          <span style={{ fontSize: '40px' }}>👷</span>
        </div>
      </div>

      {/* 戻るリンク */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link 
          to="/" 
          style={{
            background: 'linear-gradient(to bottom, #cccccc, #999999)',
            border: '2px outset #cccccc',
            padding: '8px 20px',
            color: '#000000',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          ← トップページに戻る
        </Link>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default WipPage;
