from flask import Flask, request, jsonify, abort
from store import NoteStore
from validation import validate_note_data

app = Flask(__name__)
store = NoteStore()

@app.route("/notes", methods=["POST"])
def create_note():
    data = request.get_json() or {}
    
    # Validate input
    is_valid, error_message = validate_note_data(data, store)
    if not is_valid:
        return jsonify({"message": error_message}), 400
    
    # Create note
    note = store.create_note(data["title"], data["body"]) 
    return jsonify({"id": note.id, "title": note.title, "body": note.body}), 201

@app.route("/notes", methods=["GET"])
def list_notes():
    notes = [n.__dict__ for n in store.list_notes()]
    return jsonify(notes)

@app.route("/notes/<int:nid>", methods=["GET", "PUT", "DELETE"])
def note_detail(nid):
    if request.method == "GET":
        note = store.get_note(nid)
        if not note: abort(404)
        return jsonify(note.__dict__)
    if request.method == "PUT":
        data = request.json or {}
        
        # Validate input
        is_valid, error_message = validate_note_data(data, store)
        if not is_valid:
            return jsonify({"message": error_message}), 400
        
        note = store.update_note(nid, data.get("title",""), data.get("body",""))
        if not note: abort(404)
        return jsonify(note.__dict__)
    if request.method == "DELETE":
        ok = store.delete_note(nid)
        if not ok: abort(404)
        return "", 204

if __name__=="__main__":
    app.run(debug=True)
    