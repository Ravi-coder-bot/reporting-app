import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReportSubmission from './pages/ReportSubmission';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<ReportSubmission />} />
      </Routes>
    </div>
  );
}

export default App;
