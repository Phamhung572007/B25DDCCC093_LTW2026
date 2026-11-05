import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
  <>
    <NavBar />
    <main className="page-frame">
      <Outlet />
    </main>
    <footer className="site-footer">
      <span>TH02 · Lập trình Web</span>
      <span>Được tạo để học qua những câu hỏi ngắn.</span>
    </footer>
  </>
);

export default Layout;
