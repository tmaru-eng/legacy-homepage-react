import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import type { LayoutProps } from '../../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
