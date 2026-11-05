import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatScore, LEVELS, LETTERS, POINTS } from '../data';

const QuestionDetail = ({ questions, isLoading, loadError }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionId = Number(id);
  const question = questions.find((item) => item.id === questionId);

  if (isLoading) return <div className="state-card"><span className="loading-dots" />Đang tải câu hỏi...</div>;
  if (loadError) return <div className="state-card state-error">Không tải được câu hỏi.</div>;
  if (!question) return <section className="content-page"><div className="state-card"><span className="empty-mark">?</span><strong>Không tìm thấy câu hỏi</strong><p>Câu hỏi này không có trong ngân hàng.</p><Link className="button button-primary" to="/questions">Về ngân hàng câu hỏi</Link></div></section>;

  const previousQuestion = questions.find((item) => item.id === question.id - 1);
  const nextQuestion = questions.find((item) => item.id === question.id + 1);

  return (
    <section className="content-page detail-page">
      <button className="back-link" type="button" onClick={() => navigate(-1)}>← <span>Quay lại</span></button>
      <div className="detail-card">
        <div className="detail-topline"><span className="eyebrow">NGÂN HÀNG CÂU HỎI</span><span className={`level-pill level-${question.level}`}>{LEVELS[question.level]} <i>·</i> {formatScore(POINTS[question.level])}</span></div>
        <div className="detail-number">CÂU HỎI SỐ <strong>{String(question.id).padStart(2, '0')}</strong></div>
        <h1>{question.question}</h1>
        <div className="detail-options">
          {question.options.map((option, index) => (
            <div className={`detail-option${index === question.answer ? ' correct-option' : ''}`} key={`${question.id}-${option}`}>
              <span className="answer-letter">{LETTERS[index]}</span><span className="answer-text">{option}</span>
              {index === question.answer && <span className="correct-label"><span>✓</span> Đáp án đúng</span>}
            </div>
          ))}
        </div>
        <div className="detail-navigation">
          {previousQuestion ? <Link to={`/questions/${previousQuestion.id}`} className="button button-outline">← Câu trước</Link> : <span />}
          <span className="detail-position">{question.id} <span>/</span> {questions.length}</span>
          {nextQuestion ? <Link to={`/questions/${nextQuestion.id}`} className="button button-primary">Câu sau →</Link> : <span />}
        </div>
      </div>
    </section>
  );
};

export default QuestionDetail;
