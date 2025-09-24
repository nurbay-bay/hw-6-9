import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';

import UsersPage from './pages/UsersPage/UsersPage';
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import StudentsPage from './pages/StudentsPage/StudentsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/old-about" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
