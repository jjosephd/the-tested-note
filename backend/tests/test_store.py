import pytest
from backend.store import NoteStore

@pytest.fixture
def store():
    return NoteStore()

def test_create_and_get_note(store):
    note = store.create_note("Test title", "Test body")
    assert note.id == 1
    assert note.title == "Test title"
    assert note.body == "Test body"


def test_update_note(store):
    note = store.create_note("Test title 2", "newbody")
    assert note.id == 1
    assert note.title == "Test title 2"
    assert store.get_note(note.id).body == "newbody"
    
def test_delete_note(store):
    note = store.create_note("Test title 2", "newbody")
    assert note.id == 1
    assert note.title == "Test title 2"
    assert store.get_note(note.id).body == "newbody"
    store.delete_note(note.id)
    assert store.get_note(note.id) is None
    
def test_list_notes(store):
    note = store.create_note("New Note", "New body")
    note2 = store.create_note("New Note 2", "New body 2")
    notes = store.list_notes()
    assert len(notes) == 2
    assert notes[0].id == note.id
    assert notes[1].id == note2.id
    assert notes[0].title == "New Note"
    assert notes[1].title == "New Note 2"
    
def test_combine_existing_note(store):
    title = "New Note"
    body1, body2 = "New body", "New body 2"
    note = store.create_note(title, body1)
    store.combine_existing_note(title, body2)
    assert store.get_note(note.id).body == "New bodyNew body 2"
    assert store.get_note(note.id).title == "New Note"
    
    