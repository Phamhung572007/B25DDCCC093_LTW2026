import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="content-page not-found-page">
    <div className="not-found-number">404</div>
    <span className="eyebrow">LẠC MẤT RỒI</span>
    <h1>Không tìm thấy trang</h1>
    <p>Đường dẫn này không tồn tại hoặc đã được chuyển đi.</p>
    <Link className="button button-primary" to="/">Về trang chủ <span>→</span></Link>
  </section>
);

export default NotFound;
