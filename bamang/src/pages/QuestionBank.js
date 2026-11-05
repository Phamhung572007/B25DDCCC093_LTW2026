import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatScore, LEVELS, POINTS } from '../data';

const QuestionBank = ({ questions, isLoading, loadError }) => {
  const [levelFilter, setLevelFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleFilterShift = (event) => setSearch(event.target.value);

  const visibleQuestions = useMemo(() => questions.filter((question) => {
    const matchesLevel = levelFilter === 'all' || question.level === Number(levelFilter);
    const matchesSearch = question.question.toLocaleLowerCase('vi').includes(search.trim().toLocaleLowerCase('vi'));
    return matchesLevel && matchesSearch;
  }), [questions, levelFilter, search]);

  const handleRandom = () => {
    if (!visibleQuestions.length) return;
    const selectedQuestion = visibleQuestions[Math.floor(Math.random() * visibleQuestions.length)];
    navigate(`/questions/${selectedQuestion.id}`);
  };

  if (isLoading) return <div className="state-card"><span className="loading-dots" />Đang tải câu hỏi...</div>;
  if (loadError) return <div className="state-card state-error">Không tải được câu hỏi.</div>;

  return (
    <section className="content-page question-bank-page">
      <div className="page-heading">
        <div><span className="eyebrow">ÔN TẬP KIẾN THỨC</span><h1>Ngân hàng câu hỏi</h1><p>Khám phá câu hỏi và xem đáp án trước khi bắt đầu.</p></div>
        <div className="heading-count"><strong>{questions.length.toString().padStart(2, '0')}</strong><span>CÂU HỎI</span></div>
      </div>
      <div className="filter-panel">
        <label className="filter-control"><span>Mức độ</span>
          <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
            <option value="all">Tất cả mức độ</option><option value="1">Dễ</option><option value="2">Trung bình</option><option value="3">Khó</option>
          </select>
        </label>
        <label className="filter-control search-control"><span>Tìm kiếm theo nội dung câu hỏi</span>
          <div className="search-field"><span aria-hidden="true">⌕</span><input value={search} onChange={handleFilterShift} placeholder="Ví dụ: component, CSS..." /></div>
        </label>
        <button className="button button-outline random-button" type="button" onClick={handleRandom} disabled={!visibleQuestions.length}><span aria-hidden="true">⤨</span> Câu ngẫu nhiên</button>
      </div>
      <div className="table-meta"><span>Có <strong>{visibleQuestions.length}</strong> câu hỏi</span><span>Chọn câu hỏi để xem đáp án <span aria-hidden="true">↘</span></span></div>
      <div className="table-wrap">
        <table className="data-table question-table">
          <thead><tr><th>STT</th><th>Mức độ</th><th>Điểm</th><th>Câu hỏi</th><th aria-label="Xem chi tiết" /></tr></thead>
          <tbody>
            {visibleQuestions.map((question) => (
              <tr key={question.id}>
                <td className="row-number">{String(question.id).padStart(2, '0')}</td>
                <td><span className={`level-pill level-${question.level}`}>{LEVELS[question.level]}</span></td>
                <td className="score-cell">{formatScore(POINTS[question.level])}</td>
                <td><Link className="question-link" to={`/questions/${question.id}`}>{question.question}</Link></td>
                <td><Link className="row-arrow" to={`/questions/${question.id}`} aria-label={`Xem câu ${question.id}`}>↗</Link></td>
              </tr>
            ))}
            {!visibleQuestions.length && <tr><td className="empty-cell" colSpan="5">Không tìm thấy câu hỏi phù hợp.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QuestionBank;
