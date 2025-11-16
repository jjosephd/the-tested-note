import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Note, NoteContextType } from '../types/note';

export const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = ({ title, content }: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};
