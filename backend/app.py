from flask import Flask, request, jsonify, abort
from store import NoteStore

app = Flask(__name__)
store = NoteStore()

@app.route("/notes", methods=["POST"])
def create_note():
    data = request.get_json() or {}
    if "title" not in data or "body" not in data:
        abort(400, "title and body required")
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
        note = store.update_note(nid, data.get("title",""), data.get("body",""))
        if not note: abort(404)
        return jsonify(note.__dict__)
    if request.method == "DELETE":
        ok = store.delete_note(nid)
        if not ok: abort(404)
        return "", 204

if __name__=="__main__":
    app.run(debug=True)
    