import { useContext } from 'react';
import { NoteContext } from '../contexts/NoteContext';

interface ViewAllNotesButtonProps {
  onViewAll: () => void;
  className?: string;
}

export const ViewAllNotesButton = ({
  onViewAll,
  className = '',
}: ViewAllNotesButtonProps) => {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error('ViewAllNotesButton must be used within a NoteProvider');
  }

  const { notes } = context;

  if (notes.length === 0) {
    return null;
  }

  return (
    <button
      data-testid="view-all-notes"
      onClick={onViewAll}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      View All Notes ({notes.length})
    </button>
  );
};
