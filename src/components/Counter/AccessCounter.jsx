import { useCounter } from '../../hooks';
import './Counter.css';

const AccessCounter = () => {
  const { count, loading, isKiriban } = useCounter();

  // カウンターを7桁でゼロ埋め
  const formattedCount = String(count).padStart(7, '0');

  return (
    <div className="counter-area">
      <div className="counter-label">
        ★ あなたは <span className="counter-highlight">{count}</span> 番目の訪問者です ★
      </div>
      
      <div className="counter-display-wrapper">
        <div className="counter-frame">
          {loading ? (
            <div className="counter-loading">Loading...</div>
          ) : (
            <div className="counter-digits">
              {formattedCount.split('').map((digit, index) => (
                <span key={index} className="counter-digit">
                  {digit}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {isKiriban && (
        <div className="kiriban-message">
          <span className="blink-text" style={{ color: '#ff0000' }}>
            ★★★ キリ番おめでとう！！ ★★★
          </span>
          <p style={{ fontSize: '11px', marginTop: '5px' }}>
            BBSで報告してね♪
          </p>
        </div>
      )}

      <div className="counter-footer">
        <p>カウンター設置日: 1999年4月1日</p>
      </div>
    </div>
  );
};

export default AccessCounter;
