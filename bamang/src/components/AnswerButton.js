import { LETTERS } from '../data';

const AnswerButton = ({ index, option, question, status, selectedAnswer, hidden, onAnswer }) => {
  const isCorrectAnswer = question.answer === index;
  const isSelected = selectedAnswer === index;
  const stateClass = status === 'locked' && isSelected
    ? ' answer-pending'
    : status === 'revealed' && isCorrectAnswer
      ? ' answer-correct'
      : status === 'revealed' && isSelected
        ? ' answer-wrong'
        : '';

  return (
    <button
      type="button"
      className={`answer-button${stateClass}${hidden ? ' answer-hidden' : ''}`}
      onClick={() => onAnswer(index)}
      disabled={status !== 'answering' || hidden}
      aria-label={hidden ? `${LETTERS[index]} đã được ẩn` : `${LETTERS[index]}. ${option}`}
    >
      <span className="answer-key">{LETTERS[index]}</span>
      <span className="answer-option-text">{hidden ? '' : option}</span>
      {status === 'revealed' && isCorrectAnswer && <span className="answer-feedback">✓</span>}
      {status === 'revealed' && isSelected && !isCorrectAnswer && <span className="answer-feedback">×</span>}
    </button>
  );
};

export default AnswerButton;
