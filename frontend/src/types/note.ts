export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface NoteContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  deleteNote: (id: string) => void;
}
