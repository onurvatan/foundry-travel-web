import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Recommendation from './pages/Recommendation';
import HotelDetails from './pages/HotelDetails';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/recommendation">AI Recommendation</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </div>
  );
}
