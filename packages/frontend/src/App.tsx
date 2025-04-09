import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PrivateRoute } from './components/common/PrivateRoute';
import HomePage from './pages/HomePage';
import TeamsPage from './pages/TeamsPage';
import FieldsPage from './pages/FieldsPage';
import GamesPage from './pages/GamesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ErrorScreen } from './components/common/ErrorScreen';
import { Layout } from './components/layout/Layout';

const AppContent: React.FC = () => {
  const { loading, error } = useApp();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <TeamsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/fields"
          element={
            <PrivateRoute>
              <FieldsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/games"
          element={
            <PrivateRoute>
              <GamesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AppProvider>
  );
};

export default App; 