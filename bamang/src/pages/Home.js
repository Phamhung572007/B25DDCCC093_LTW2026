import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const DIFFICULTIES = [
  { name: 'Dễ', duration: 120 },
  { name: 'Thường', duration: 90 },
  { name: 'Khó', duration: 60 },
];

const Home = ({ playerName, setPlayerName, history, gameDuration, setGameDuration }) => {
  const navigate = useNavigate();
  const bestRecord = [...history].sort((first, second) => second.score - first.score || second.livesLeft - first.livesLeft)[0];

  const handleStart = (event) => {
    event.preventDefault();
    if (playerName.trim()) navigate('/play');
  };

  return (
    <div className="home-page">
      <section className="hero-card">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> BÀI THỬ KIẾN THỨC WEB</div>
          <h1>Thử thách<br /><span>3 mạng.</span></h1>
          <p className="hero-description">15 câu hỏi. {gameDuration} giây. Ba cơ hội để chứng minh bạn đã sẵn sàng.</p>
          <div className="difficulty-picker">
            <div className="difficulty-label"><span>Độ khó lượt chơi</span><span>{gameDuration} giây</span></div>
            <div className="difficulty-options" role="radiogroup" aria-label="Chọn độ khó">
              {DIFFICULTIES.map(({ name, duration }) => (
                <button
                  className={`difficulty-option${gameDuration === duration ? ' selected' : ''}`}
                  key={name}
                  type="button"
                  role="radio"
                  aria-checked={gameDuration === duration}
                  onClick={() => setGameDuration(duration)}
                >
                  <span>{name}</span><small>{duration} giây</small>
                </button>
              ))}
            </div>
          </div>
          <form className="start-form" onSubmit={handleStart}>
            <label htmlFor="player-name">Tên người chơi</label>
            <div className="name-field">
              <span aria-hidden="true">◉</span>
              <input id="player-name" type="text" value={playerName} onChange={(event) => setPlayerName(event.target.value)} placeholder="Nhập tên của bạn" maxLength={28} />
            </div>
            <button className="button button-primary start-button" type="submit" disabled={!playerName.trim()}>
              Bắt đầu thử thách <span aria-hidden="true">→</span>
            </button>
          </form>
          {bestRecord && <div className="home-record"><span className="record-star">✦</span><span>Kỷ lục: <strong>{formatScore(bestRecord.score)}</strong> <span className="record-dash">—</span> {bestRecord.name}</span></div>}
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-spark spark-one">✦</div><div className="art-spark spark-two">✧</div>
          <div className="art-main-number">3</div>
          <div className="heart-row"><span>♥</span><span>♥</span><span>♥</span></div>
          <div className="art-caption">MẠNG CỦA BẠN</div>
          <div className="floating-chip chip-fast"><span>◷</span> {gameDuration} GIÂY</div>
          <div className="floating-chip chip-quiz"><span>✳</span> 15 CÂU HỎI</div>
        </div>
      </section>

      <section className="rules-section">
        <div className="section-heading">
          <div><span className="eyebrow">NẮM LUẬT, VÀO CUỘC</span><h2>Mỗi câu hỏi là một cơ hội</h2></div>
          <span className="section-aside">Chơi thông minh. Giữ bình tĩnh.</span>
        </div>
        <div className="rule-grid">
          <article className="rule-card"><span className="rule-icon violet">◷</span><div><h3>{gameDuration} giây tất cả</h3><p>Đồng hồ chỉ chạy khi bạn đang chọn câu trả lời.</p></div><span className="rule-index">01</span></article>
          <article className="rule-card"><span className="rule-icon coral">♥</span><div><h3>Ba mạng sống</h3><p>Mỗi câu sai mất một mạng, nhưng trò chơi vẫn tiếp tục.</p></div><span className="rule-index">02</span></article>
          <article className="rule-card"><span className="rule-icon amber">✦</span><div><h3>Điểm và chuỗi đúng</h3><p>Câu khó được nhiều điểm hơn. Từ chuỗi thứ ba có thưởng.</p></div><span className="rule-index">03</span></article>
        </div>
      </section>
      <div className="home-note"><span>✧</span> Có ba quyền trợ giúp trong mỗi lượt chơi. Chọn thời điểm sử dụng thật khéo nhé.</div>
    </div>
  );
};

export default Home;
