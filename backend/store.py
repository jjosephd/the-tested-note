from dataclasses import dataclass
from typing import Dict, Optional, List
import itertools

@dataclass 
class Note:
    '''
    A note in the database
    '''
    id: int
    title: str
    body: str

class NoteStore:
    '''
    A store for notes
    '''
    def __init__(self):
        self._notes: Dict[int, Note] = {}
        self._id_iter = itertools.count(1)
        
    def create_note(self, title: str, body: str) -> Note:
        note_id = next(self._id_iter)
        note = Note(id=note_id, title=title, body = body)
        self._notes[note_id] = note
        return note
        
    def get_note(self, note_id: int) -> Optional[Note]:
        return self._notes.get(note_id)
    
    def list_notes(self) -> List[Note]:
        return list(self._notes.values())
    
    def update_note(self, note_id: int, title: str, body: str) -> Optional[Note]:
        note = self.get_note(note_id)
        if note is None:
            return None
        note.title = title
        note.body = body
        return note
        
    def delete_note(self, nid: int) -> bool:
        return self._notes.pop(nid, None) is not None
    
    def get_note_by_title(self, title: str):
        '''
        Returns the first note with the given title, or None if no such note exists
        '''
        for note in self._notes.values():
            if note.title != title:
                continue
            return note
        return None
    
    def get_note_by_body(self, body: str):
        '''
        Returns the first note with the given body, or None if no such note exists
        '''
        for note in self._notes.values():
            if note.body != body:
                continue
            return note
        return None
    
    def remove_duplicate_note_by_id(self, note_id: int) -> bool:
        '''
        Removes a note with the given id if it exists
        '''
        return self._notes.pop(note_id, None) is not None
    
    def combine_existing_note(self, title: str, body: str) -> Optional[Note]:
        '''
        Combines the body of an existing note with the given body
        '''
        note = self.get_note_by_title(title)
        if note is None:
            return None
        note.body += body
        return note
    