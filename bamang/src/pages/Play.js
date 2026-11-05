import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Helpers from '../components/Helpers';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import StatusBar from '../components/StatusBar';
import { MAX_LIVES, TOTAL_TIME } from '../data';
import { calcScore, shuffle } from '../utils';

const Play = ({ questions, isLoading, loadError, onGameEnd, playerName, duration }) => {
  const navigate = useNavigate();
  const roundQuestions = useMemo(() => (questions.length ? shuffle(questions) : []), [questions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration || TOTAL_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [usedHelpers, setUsedHelpers] = useState({ fiftyFifty: false, skip: false, extraLife: false });
  const [longestStreak, setLongestStreak] = useState(0);
  const [brokenHeart, setBrokenHeart] = useState(null);
  const finishedRef = useRef(false);
  const currentQuestion = roundQuestions[currentIndex];
  const scoreState = calcScore(results, roundQuestions);

  const finishGame = useCallback((reason, finalResults = results, finalLives = lives) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const { score } = calcScore(finalResults, roundQuestions);
    const correctCount = finalResults.filter((result) => result === 'correct').length;
    const finalReason = reason === 'completed' && correctCount === roundQuestions.length ? 'perfect' : reason;
    const gameResult = { name: playerName, score, correctCount, livesLeft: finalLives, reason: finalReason, longestStreak };
    onGameEnd(gameResult);
    navigate('/result', { replace: true, state: gameResult });
  }, [lives, longestStreak, navigate, onGameEnd, playerName, results, roundQuestions]);

  const chooseAnswer = useCallback((answerIndex) => {
    if (status !== 'answering' || hiddenOptions.includes(answerIndex)) return;
    setSelectedAnswer(answerIndex);
    setStatus('locked');
  }, [hiddenOptions, status]);

  useEffect(() => {
    if (status !== 'answering' || !currentQuestion || isLoading) return undefined;
    const timerId = window.setInterval(() => setTimeLeft((remaining) => Math.max(0, remaining - 1)), 1000);
    return () => window.clearInterval(timerId);
  }, [status, currentQuestion, isLoading]);

  useEffect(() => {
    if (timeLeft === 0 && status === 'answering') finishGame('time');
  }, [timeLeft, status, finishGame]);

  useEffect(() => {
    if (status === 'locked' && currentQuestion) {
      const timeoutId = window.setTimeout(() => {
        const isCorrect = selectedAnswer === currentQuestion.answer;
        const nextResults = [...results, isCorrect ? 'correct' : 'wrong'];
        const nextLives = isCorrect ? lives : Math.max(0, lives - 1);
        const nextStreak = isCorrect ? scoreState.streak + 1 : 0;
        setResults(nextResults);
        setLives(nextLives);
        if (!isCorrect) setBrokenHeart(lives - 1);
        setLongestStreak((longest) => Math.max(longest, nextStreak));
        setStatus('revealed');
      }, 1000);
      return () => window.clearTimeout(timeoutId);
    }

    if (status === 'revealed') {
      const timeoutId = window.setTimeout(() => {
        if (lives <= 0) {
          finishGame('lives');
        } else if (results.length >= roundQuestions.length) {
          finishGame('completed');
        } else {
          setCurrentIndex((index) => index + 1);
          setSelectedAnswer(null);
          setHiddenOptions([]);
          setStatus('answering');
        }
      }, 1000);
      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [status, currentQuestion, selectedAnswer, results, lives, scoreState.streak, roundQuestions.length, finishGame]);

  useEffect(() => {
    const handleKey = (event) => {
      if (status !== 'answering') return;
      const answerIndex = ['A', 'B', 'C', 'D'].indexOf(event.key.toUpperCase());
      if (answerIndex >= 0 && !hiddenOptions.includes(answerIndex)) chooseAnswer(answerIndex);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hiddenOptions, chooseAnswer]);

  useEffect(() => {
    if (!currentQuestion) return undefined;
    document.title = `Câu ${currentIndex + 1}/${roundQuestions.length} – còn ${lives} mạng`;
    return undefined;
  }, [currentIndex, roundQuestions.length, lives, currentQuestion]);

  useEffect(() => () => { document.title = 'Thử thách 3 mạng'; }, []);

  const handleFiftyFifty = () => {
    if (status !== 'answering' || usedHelpers.fiftyFifty || !currentQuestion) return;
    const wrongAnswers = currentQuestion.options.map((_, index) => index).filter((index) => index !== currentQuestion.answer);
    setHiddenOptions(shuffle(wrongAnswers).slice(0, 2));
    setUsedHelpers((helpers) => ({ ...helpers, fiftyFifty: true }));
  };

  const handleSkip = () => {
    if (status !== 'answering' || usedHelpers.skip || !currentQuestion) return;
    const nextResults = [...results, 'skipped'];
    setResults(nextResults);
    setUsedHelpers((helpers) => ({ ...helpers, skip: true }));
    if (currentIndex + 1 >= roundQuestions.length) {
      finishGame('completed', nextResults);
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
    setHiddenOptions([]);
  };

  const handleExtraLife = () => {
    if (status !== 'answering' || usedHelpers.extraLife || lives >= MAX_LIVES) return;
    setLives((remaining) => Math.min(MAX_LIVES, remaining + 1));
    setBrokenHeart(null);
    setUsedHelpers((helpers) => ({ ...helpers, extraLife: true }));
  };

  if (isLoading) return <div className="state-card"><span className="loading-dots" />Đang tải câu hỏi...</div>;
  if (loadError || !roundQuestions.length || !currentQuestion) return <div className="state-card state-error">Không tải được câu hỏi.</div>;

  return (
    <section className="content-page play-page">
      <div className="play-intro"><div><span className="eyebrow">LƯỢT CHƠI CỦA {playerName.toLocaleUpperCase('vi')}</span><h1>Tập trung. Bạn làm được.</h1></div><span className="live-indicator"><i /> ĐANG CHƠI</span></div>
      <StatusBar timeLeft={timeLeft} lives={lives} score={scoreState.score} streak={scoreState.streak} brokenHeart={brokenHeart} />
      <div className="play-layout">
        <div className="play-main-column">
          <QuestionCard question={currentQuestion} index={currentIndex} total={roundQuestions.length} status={status} selectedAnswer={selectedAnswer} hiddenOptions={hiddenOptions} onAnswer={chooseAnswer} />
          <Helpers usedHelpers={usedHelpers} lives={lives} maxLives={MAX_LIVES} onFiftyFifty={handleFiftyFifty} onSkip={handleSkip} onExtraLife={handleExtraLife} disabled={status !== 'answering'} />
        </div>
        <aside className="play-side-column"><div className="play-quote"><span>“</span><p>Tiến bộ đến từ việc dám thử sức với điều mới.</p><small>MỘT CÂU HỎI MỖI LẦN</small></div></aside>
      </div>
      <ProgressBar total={roundQuestions.length} results={results} currentIndex={currentIndex} />
    </section>
  );
};

export default Play;
