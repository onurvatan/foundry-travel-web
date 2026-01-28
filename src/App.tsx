import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Recommendation from './pages/Recommendation';
import HotelDetails from './pages/HotelDetails';
import './App.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <h1 className="app-title">🏨 Foundry Travel</h1>
          </Link>
          <nav className="app-nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              🏠 Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© 2026 Travel Finder - Powered by AI</p>
      </footer>
    </div>
  );
}
