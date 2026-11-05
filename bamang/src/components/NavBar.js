import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <header className="site-header">
    <div className="header-inner">
      <NavLink to="/" end className="brand" aria-label="Thử thách 3 mạng - Trang chủ">
        <span className="brand-mark" aria-hidden="true"><span>3</span></span>
        <span className="brand-copy">
          <strong>THỬ THÁCH</strong>
          <small>3 MẠNG</small>
        </span>
      </NavLink>
      <nav className="main-nav" aria-label="Điều hướng chính">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          <span className="nav-icon" aria-hidden="true">⌂</span>Trang chủ
        </NavLink>
        <NavLink to="/questions" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          <span className="nav-icon" aria-hidden="true">▤</span>Ngân hàng câu hỏi
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          <span className="nav-icon" aria-hidden="true">↗</span>Lịch sử
        </NavLink>
      </nav>
      <span className="header-note"><i /> Sẵn sàng thử sức?</span>
    </div>
  </header>
);

export default NavBar;
