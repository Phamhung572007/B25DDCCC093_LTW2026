import { formatScore, MAX_LIVES } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak, brokenHeart }) => (
  <section className="status-grid" aria-label="Trạng thái lượt chơi">
    <div className={`status-card timer-card${timeLeft <= 15 ? ' timer-warning' : ''}`}>
      <span className="status-icon">◷</span><div><span className="status-label">Thời gian</span><strong>{timeLeft} <small>giây</small></strong></div>
    </div>
    <div className="status-card lives-card">
      <span className="status-icon">♥</span><div><span className="status-label">Mạng</span><strong>{lives} <span className="heart-icons" aria-label={`${lives} trên ${MAX_LIVES} mạng`}>{Array.from({ length: MAX_LIVES }, (_, index) => <span className={index < lives ? 'heart-live' : index === brokenHeart ? 'heart-broken' : 'heart-empty'} key={index}>♥</span>)}</span></strong></div>
    </div>
    <div className="status-card score-card">
      <span className="status-icon">✦</span><div><span className="status-label">Điểm</span><strong>{formatScore(score)}</strong></div>
    </div>
    <div className="status-card streak-card">
      <span className="status-icon">↗</span><div><span className="status-label">Chuỗi đúng</span><strong>{streak}</strong></div>
    </div>
  </section>
);

export default StatusBar;
