import { useAuth } from '../contexts/AuthContext';
import AddNote from './AddNote';
import NotesList from './NotesList';

export const DashboardPage = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Note Taking App
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        <AddNote />
        <NotesList />
      </div>
    </div>
  );
};
