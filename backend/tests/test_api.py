import pytest
import sys
from pathlib import Path

from werkzeug.wrappers import response

# Add parent directory to path so we can import app and store
sys.path.insert(0, str(Path(__file__).parent.parent))

from app import app, store
from store import NoteStore

@pytest.fixture
def client():
    app.config['TESTING'] = True
    return app.test_client()

def test_create_and_get_note(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create note
    response = client.post("/notes", json={"title": "t", "body": "b"})
    assert response.status_code == 201
    
    # Verify response contains the note
    data = response.get_json()
    assert data["title"] == "t"
    assert data["body"] == "b"
    assert "id" in data
    
    # Verify we can retrieve it
    note_id = data["id"]
    get_response = client.get(f"/notes/{note_id}")
    assert get_response.status_code == 200
    
def test_create_note_invalid_body(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create note without body
    response = client.post("/notes", json={"title": "t"})
    # Verify we get a 400 error
    assert response.status_code == 400
    
    # Verify no note was created
    assert store.list_notes() == []
    
def test_title_empty(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create a note with an empty string for title
    response = client.post("/notes", json={"title": "", "body": "b"})
    assert response.status_code == 400
    
    # Verify error message
    data = response.get_json()
    assert data["message"] == "title and body required"
    
    # Verify no note was created
    assert store.list_notes() == []

def test_body_empty(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create a note with an empty string for body
    response = client.post("/notes", json={"title": "Valid Title", "body": ""})
    assert response.status_code == 400
    
    # Verify error message
    data = response.get_json()
    assert data["message"] == "title and body required"
    
    # Verify no note was created
    assert store.list_notes() == []

def test_title_too_long(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create note with title exceeding 100 characters
    long_title = "t" * 101  # 101 characters
    response = client.post("/notes", json={"title": long_title, "body": "Valid body"})
    
    # Verify we get a 400 error
    assert response.status_code == 400
    
    # Verify error message
    data = response.get_json()
    assert "Title must be 100 characters or less" in data["message"]
    
    # Verify no note was created
    assert store.list_notes() == []

def test_body_too_long(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create note with body exceeding 1000 characters
    long_body = "b" * 1001  # 1001 characters
    response = client.post("/notes", json={"title": "Valid Title", "body": long_body})
    
    # Verify we get a 400 error
    assert response.status_code == 400
    
    # Verify error message
    data = response.get_json()
    assert "body must be 1000 characters or less" in data["message"]
    
    # Verify no note was created
    assert store.list_notes() == []

def test_title_and_body_at_max_length(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create note with title and body at exactly the maximum allowed length
    max_title = "t" * 100   # Exactly 100 characters
    max_body = "b" * 1000   # Exactly 1000 characters
    response = client.post("/notes", json={"title": max_title, "body": max_body})
    
    # Should succeed - at the limit is OK
    assert response.status_code == 201
    
    # Verify the note was created
    data = response.get_json()
    assert data["title"] == max_title
    assert data["body"] == max_body
    assert "id" in data
    
def test_duplicate_note(client, monkeypatch):
    # Start with fresh store
    monkeypatch.setattr("app.store", NoteStore())
    
    # Create note with title and body
    title = "t"
    body = "b"
    
    
    response = client.post("/notes", json={"title": title, "body": body})
    assert response.status_code == 201
    
    response = client.post("/notes", json={"title": title, "body": body})
    assert response.status_code == 400
        
            

    
    
    