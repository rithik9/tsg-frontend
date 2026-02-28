import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import './App.css';
import CampaignDetails from './components/CampaignDetails';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/campaign-details" element={<CampaignDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;