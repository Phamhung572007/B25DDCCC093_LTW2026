const ProgressBar = ({ total, results, currentIndex }) => (
  <section className="progress-section" aria-label="Tiến độ câu hỏi">
    <div className="progress-heading"><span>TIẾN ĐỘ</span><span>{String(Math.min(currentIndex + 1, total)).padStart(2, '0')} <i>/</i> {String(total).padStart(2, '0')}</span></div>
    <div className="progress-grid">
      {Array.from({ length: total }).map((_, index) => {
        const result = results[index];
        const stateClass = result === 'correct' ? 'progress-correct' : result === 'wrong' ? 'progress-wrong' : result === 'skipped' ? 'progress-skipped' : index === currentIndex ? 'progress-current' : 'progress-upcoming';
        return <span className={`progress-cell ${stateClass}`} key={index} aria-label={`Câu ${index + 1}${result ? `: ${result}` : index === currentIndex ? ': đang chơi' : ': chưa tới'}`}>{index + 1}</span>;
      })}
    </div>
    <div className="progress-legend"><span><i className="legend-dot legend-green" /> Đúng</span><span><i className="legend-dot legend-red" /> Sai</span><span><i className="legend-dot legend-orange" /> Bỏ qua</span></div>
  </section>
);

export default ProgressBar;
