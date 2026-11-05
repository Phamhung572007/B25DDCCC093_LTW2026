const Helpers = ({ usedHelpers, lives, maxLives, onFiftyFifty, onSkip, onExtraLife, disabled }) => (
  <section className="helpers-section">
    <div className="helpers-heading"><div><span className="eyebrow">TRỢ GIÚP</span><h2>Chọn một lợi thế</h2></div><span className="helpers-note">Mỗi quyền dùng một lần</span></div>
    <div className="helper-grid">
      <button className={`helper-card${usedHelpers.fiftyFifty ? ' helper-used' : ''}`} type="button" onClick={onFiftyFifty} disabled={disabled || usedHelpers.fiftyFifty}>
        <span className="helper-symbol helper-purple">½</span><span className="helper-copy"><strong>50:50</strong><small>Ẩn hai đáp án sai</small></span><span className="helper-state">{usedHelpers.fiftyFifty ? 'ĐÃ DÙNG' : 'DÙNG'}</span>
      </button>
      <button className={`helper-card${usedHelpers.skip ? ' helper-used' : ''}`} type="button" onClick={onSkip} disabled={disabled || usedHelpers.skip}>
        <span className="helper-symbol helper-orange">↠</span><span className="helper-copy"><strong>Bỏ qua</strong><small>Chuyển sang câu tiếp</small></span><span className="helper-state">{usedHelpers.skip ? 'ĐÃ DÙNG' : 'DÙNG'}</span>
      </button>
      <button className={`helper-card${usedHelpers.extraLife ? ' helper-used' : ''}`} type="button" onClick={onExtraLife} disabled={disabled || usedHelpers.extraLife || lives >= maxLives}>
        <span className="helper-symbol helper-pink">♥+</span><span className="helper-copy"><strong>Thêm 1 mạng</strong><small>Tối đa {maxLives} mạng</small></span><span className="helper-state">{usedHelpers.extraLife ? 'ĐÃ DÙNG' : lives >= maxLives ? 'ĐẦY MẠNG' : 'DÙNG'}</span>
      </button>
    </div>
  </section>
);

export default Helpers;
