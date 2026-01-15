import './App.css';
import Sidebar from './sidebar';
import { Route, Routes } from 'react-router-dom';
import SwiperPage from './SwiperPage';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/swiper" element={<SwiperPage />} />
        {/* Add other routes here if needed */}
      </Routes>
    </div>
  );
}

export default App;
