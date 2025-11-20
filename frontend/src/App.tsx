// src/App.tsx

import { useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegistrationPage } from './components/auth/RegistrationPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardPage } from './components/DashboardPage';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <RegistrationPage />}
      />
      <Route
        path="/forgot-password"
        element={isAuthenticated ? <Navigate to="/" replace /> : <ForgotPasswordPage />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
