import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatScore } from '../data';

const Result = () => {
  const { state } = useLocation();
  if (!state) return <Navigate to="/" replace />;

  const titleByReason = {
    perfect: 'Xuất sắc! Bạn đã trả lời đúng cả 15 câu.',
    completed: 'Bạn đã hoàn thành thử thách.',
    lives: 'Bạn đã hết mạng.',
    time: 'Hết giờ!',
  };
  const title = titleByReason[state.reason] || titleByReason.completed;

  return (
    <section className="content-page result-page">
      <div className="result-confetti" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span><span>✳</span></div>
      <div className="result-card">
        <div className={`result-emblem${state.reason === 'perfect' ? ' emblem-perfect' : ''}`} aria-hidden="true">{state.reason === 'perfect' ? '✦' : state.reason === 'lives' ? '♡' : state.reason === 'time' ? '◷' : '✓'}</div>
        <span className="eyebrow">LƯỢT CHƠI ĐÃ KẾT THÚC</span>
        <h1>{title}</h1>
        <p className="result-player">Người chơi: <strong>{state.name}</strong></p>
        <div className="result-score"><span>ĐIỂM CỦA BẠN</span><strong>{formatScore(state.score)}</strong></div>
        <div className="result-stats">
          <div><strong>{state.correctCount}</strong><span>Câu trả lời đúng</span></div>
          <div><strong>{state.livesLeft}</strong><span>Mạng còn lại</span></div>
          {state.longestStreak !== undefined && <div><strong>{state.longestStreak}</strong><span>Chuỗi dài nhất</span></div>}
        </div>
        <div className="result-actions"><Link to="/play" className="button button-primary">Chơi lại <span>↻</span></Link><Link to="/" className="button button-outline">Về trang chủ</Link></div>
      </div>
    </section>
  );
};

export default Result;
