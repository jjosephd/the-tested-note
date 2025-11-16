import { useContext, useState } from 'react';
import { NoteContext } from '../contexts/NoteContext';
import { ViewAllNotesButton } from './ViewAllNotesButton';

const NotesList = () => {
  const { notes, deleteNote } = useContext(NoteContext)!;
  const [showAll, setShowAll] = useState(false);
  
  // Determine which notes to show based on showAll state
  const displayedNotes = showAll ? notes : notes.slice(0, 1);

  const handleViewAll = () => {
    setShowAll(true);
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No notes yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Notes</h2>
        {!showAll && notes.length > 1 && (
          <ViewAllNotesButton onViewAll={handleViewAll} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedNotes.map((note) => (
          <div
            key={note.id}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            data-testid="note-item"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">{note.title}</h3>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete note"
                data-testid={`delete-note-${note.id}`}
              >
                ×
              </button>
            </div>
            <p className="mt-2 text-gray-600 whitespace-pre-wrap">
              {note.content}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {showAll && notes.length > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(false)}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesList;
