import AddNote from './AddNote';
import NotesList from './NotesList';

export const DashboardPage = () => {
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
};
