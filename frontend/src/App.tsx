// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { NoteProvider } from './contexts/NoteContext';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <NoteProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Note Taking App</h1>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <div className="space-y-8">
                    <AddNote />
                    <NotesList />
                  </div>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </NoteProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;