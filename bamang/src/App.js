const BUILD_TAG = "tm-6852";
/* eslint import/first: off */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import NotFound from './pages/NotFound';
import Play from './pages/Play';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import Result from './pages/Result';

const HISTORY_KEY = 'ltw_3mang_history';

const readHistory = () => {
  try {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch {
    return [];
  }
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [gameDuration, setGameDuration] = useState(90);
  const [history, setHistory] = useState(readHistory);

  useEffect(() => {
    const controller = new AbortController();

    axios.get('/data/questions.json', { signal: controller.signal })
      .then((response) => {
        setQuestions(response.data);
        setLoadError(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const handleGameEnd = (gameResult) => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: gameResult.name,
      score: gameResult.score,
      correctCount: gameResult.correctCount,
      livesLeft: gameResult.livesLeft,
      longestStreak: gameResult.longestStreak,
      playedAt: new Date().toLocaleString('vi-VN'),
    };
    setHistory((previousHistory) => [entry, ...previousHistory]);
  };

  return (
    <div className="app-shell" data-build-tag={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} history={history} gameDuration={gameDuration} setGameDuration={setGameDuration} />} />
          <Route path="play" element={playerName ? <Play questions={questions} isLoading={isLoading} loadError={loadError} onGameEnd={handleGameEnd} playerName={playerName} duration={gameDuration} /> : <Navigate to="/" replace />} />
          <Route path="result" element={<Result />} />
          <Route path="history" element={<History history={history} onClear={() => setHistory([])} />} />
          <Route path="questions" element={<QuestionBank questions={questions} isLoading={isLoading} loadError={loadError} />} />
          <Route path="questions/:id" element={<QuestionDetail questions={questions} isLoading={isLoading} loadError={loadError} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
