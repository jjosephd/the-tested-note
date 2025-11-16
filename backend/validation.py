from store import NoteStore


def check_title_exists(store: NoteStore, title: str) -> bool:
    return store.get_note_by_title(title) is not None
    
def validate_note_data(data, store: NoteStore):
    
    """
    Validates note data for creation/update.
    
    Args:
        data: Dictionary containing note data
        store: NoteStore instance to check for duplicate titles
    
    Returns:
        tuple: (is_valid: bool, error_message: str or None)
    """
    # Check required fields exist
    if "title" not in data or "body" not in data:
        return False, "title and body required"
    
    # Check if title exists
    if check_title_exists(store, data["title"]):
        return False, "Note with this title already exists"
    
    # Check for empty/whitespace-only strings
    if not data["title"].strip() or not data["body"].strip():
        return False, "title and body required"
    
    # Check length limits
    if len(data["title"]) > 100:
        return False, "Title must be 100 characters or less"
    if len(data["body"]) > 1000:
        return False, "body must be 1000 characters or less"
    
    return True, None
