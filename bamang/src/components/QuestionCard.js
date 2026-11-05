import { formatScore, LEVELS, LETTERS, POINTS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ question, index, total, status, selectedAnswer, hiddenOptions, onAnswer }) => (
  <section className={`question-card play-question status-${status}`} aria-live="polite">
    <div className="question-card-top">
      <span className="question-counter">Câu <strong>{index + 1}</strong><span>/</span>{total}</span>
      <span className={`level-pill level-${question.level}`}>{LEVELS[question.level]} <i>·</i> {formatScore(POINTS[question.level])}</span>
    </div>
    <h1>{question.question}</h1>
    <div className="answer-grid">
      {question.options.map((option, answerIndex) => (
        <AnswerButton
          key={`${question.id}-${LETTERS[answerIndex]}`}
          index={answerIndex}
          option={option}
          question={question}
          status={status}
          selectedAnswer={selectedAnswer}
          hidden={hiddenOptions.includes(answerIndex)}
          onAnswer={onAnswer}
        />
      ))}
    </div>
    <div className="keyboard-hint"><span>⌨</span> Mẹo: dùng phím A, B, C, D để trả lời nhanh</div>
  </section>
);

export default QuestionCard;
