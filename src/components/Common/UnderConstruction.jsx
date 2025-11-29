import './Common.css';

const UnderConstruction = ({ message = 'このページは現在工事中です' }) => {
  return (
    <div className="under-construction">
      {/* 工事中GIF風のCSS表現 */}
      <div className="construction-icon">
        <span className="construction-animation">🚧</span>
        <span className="construction-animation" style={{ animationDelay: '0.25s' }}>👷</span>
        <span className="construction-animation">🚧</span>
      </div>
      
      <h2 className="construction-title">
        ★ UNDER CONSTRUCTION ★
      </h2>
      
      <p className="construction-message">{message}</p>
      
      <div className="construction-details">
        <p>もうしばらくお待ちください m(_ _)m</p>
        <p style={{ marginTop: '10px', fontSize: '11px', color: '#999999' }}>
          完成予定: 未定
        </p>
      </div>

      {/* 工事中バー */}
      <div className="construction-bar">
        <div className="construction-bar-stripe"></div>
      </div>

      <p className="construction-notice">
        ↓完成したらBBSでお知らせします↓
      </p>
    </div>
  );
};

export default UnderConstruction;

