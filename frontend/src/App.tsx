// src/App.tsx

import { useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import { Routes, Route, Navigate } from 'react-router-dom';

export function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Note Taking App
        </h1>
        <AddNote />
        <NotesList />
      </div>
    </div>
  );
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppContent />} />
      </Route>
    </Routes>
  );
}

export default App;
