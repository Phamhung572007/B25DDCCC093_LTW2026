import { POINTS, STREAK_BONUS } from './data';

export const calcScore = (results, questions) => results.reduce((total, result, index) => {
  if (result === 'wrong') return { ...total, streak: 0 };
  if (result === 'skipped') return total;
  if (result !== 'correct') return total;

  const streak = total.streak + 1;
  const bonus = streak >= 3 ? STREAK_BONUS : 0;
  return {
    score: total.score + (POINTS[questions[index]?.level] || 0) + bonus,
    streak,
  };
}, { score: 0, streak: 0 });

export const shuffle = (items) => {
  const shuffledItems = [...items];
  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[swapIndex]] = [shuffledItems[swapIndex], shuffledItems[index]];
  }
  return shuffledItems;
};
