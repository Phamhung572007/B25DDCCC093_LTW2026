import { useMemo } from 'react';
import { formatScore } from '../data';

const History = ({ history, onClear }) => {
  const sortedHistory = useMemo(() => [...history].sort((first, second) => second.score - first.score || second.livesLeft - first.livesLeft), [history]);
  const totalCorrect = history.reduce((total, game) => total + game.correctCount, 0);
  const bestScore = history.reduce((best, game) => Math.max(best, game.score), 0);

  return (
    <section className="content-page history-page">
      <div className="page-heading history-heading">
        <div><span className="eyebrow">HÀNH TRÌNH CỦA BẠN</span><h1>Lịch sử lượt chơi</h1><p>Mỗi lượt chơi là một bước tiến. Xem lại thành tích của bạn.</p></div>
        <button className="button button-outline clear-history" type="button" onClick={onClear} disabled={!history.length}><span aria-hidden="true">⌫</span> Xóa lịch sử</button>
      </div>
      <div className="history-stats">
        <article className="history-stat"><span className="stat-icon stat-violet">↻</span><div><span>SỐ LƯỢT CHƠI</span><strong>{history.length}</strong></div></article>
        <article className="history-stat"><span className="stat-icon stat-amber">✦</span><div><span>ĐIỂM CAO NHẤT</span><strong>{history.length ? formatScore(bestScore) : '—'}</strong></div></article>
        <article className="history-stat"><span className="stat-icon stat-green">✓</span><div><span>TỔNG CÂU ĐÚNG</span><strong>{totalCorrect}</strong></div></article>
      </div>
      <div className="history-table-card">
        <div className="table-card-heading"><div><h2>Bảng thành tích</h2><p>Sắp xếp theo điểm số cao nhất</p></div><span>{history.length} LƯỢT</span></div>
        {!history.length ? <div className="empty-history"><div className="empty-history-icon">↗</div><strong>Chưa có lượt chơi nào</strong><p>Bắt đầu thử thách để ghi lại thành tích đầu tiên của bạn.</p></div> : (
          <div className="table-wrap"><table className="data-table history-table">
            <thead><tr><th>#</th><th>Người chơi</th><th>Số câu đúng</th><th>Mạng còn lại</th><th>Điểm</th><th>Chuỗi dài nhất</th><th>Thời gian</th></tr></thead>
            <tbody>{sortedHistory.map((game, index) => <tr key={game.id}><td className="rank-cell">{String(index + 1).padStart(2, '0')}</td><td><span className="player-avatar">{game.name.charAt(0).toLocaleUpperCase('vi')}</span><strong className="player-name">{game.name}</strong></td><td>{game.correctCount} <span className="muted-unit">/ 15</span></td><td><span className="table-hearts">{'♥'.repeat(game.livesLeft)}<span>{'♥'.repeat(Math.max(0, 3 - game.livesLeft))}</span></span></td><td className="history-score">{formatScore(game.score)}</td><td>{game.longestStreak ?? 0}</td><td className="played-date">{game.playedAt}</td></tr>)}</tbody>
          </table></div>
        )}
      </div>
    </section>
  );
};

export default History;
