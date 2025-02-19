import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Transactions from './pages/transactions/Transactions';
import Settings from './pages/settings/Settings';
import Layout from './components/Layout';
import AuthGuard from './components/AuthGuard';
import './styles/home.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <AuthGuard requireAuth={false}>
            <Login />
          </AuthGuard>
        } />
        
        <Route path="/" element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }>
          <Route index element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;