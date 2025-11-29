import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TopPage, ProfilePage, BBSPage, LinksPage, WipPage } from './pages';
import './styles/legacy.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/bbs" element={<BBSPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/wip" element={<WipPage />} />
          {/* 404ページ */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h1 style={{ color: '#ff0000', fontSize: '48px' }}>404</h1>
              <p style={{ color: '#ffff00', marginTop: '20px' }}>
                ページが見つかりません
              </p>
              <p style={{ color: '#999999', marginTop: '10px', fontSize: '12px' }}>
                URLをご確認ください
        </p>
      </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
