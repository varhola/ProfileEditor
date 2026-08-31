import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </div>
  );
}

export default App;
