import { test, expect } from '@playwright/test';
import { NotesPage } from './pages/notes/notesPage.page';

// Declare constants
const NOTE_TITLE1 = 'Title 1';
const NOTE_TITLE2 = 'Title 2';
const NOTE_CONTENT1 = 'Content Body 1';
const NOTE_CONTENT2 = 'Content Body 2';

test.beforeEach('', async ({ page }) => {
  await page.goto('/');
});
// Describe the test
// describe takes a string and a callback function
// AAA: __, Act, Assert
test.describe('ViewAllNotes component', () => {
  //declare test and what is expected
  test('should allow viewing of all notes', async ({ page }) => {
    /* Create first note */
    const notesPage = new NotesPage(page);
    await notesPage.createNote(NOTE_TITLE1, NOTE_CONTENT1);

    /* Verify note was added */
    // Create a noteItem variable to store the note item using the selector
    const noteItem1 = notesPage.getNoteItem();
    await expect(noteItem1).toBeVisible();

    /* Create second note */
    await notesPage.createNote(NOTE_TITLE2, NOTE_CONTENT2);

    /* Verify note was added */
    // Create a noteItem variable to store the note item using the selector
    const noteItem2 = notesPage.getNoteItem();
    await expect(noteItem2).toBeVisible();

    /* Verify multiple notes exist*/

    await notesPage.clickViewAllNotes(); // handle view all notes click

    const noteItems = notesPage.getNoteItems();
    await expect(noteItems).toHaveCount(2); // Check that there are exactly 2 notes

    /* Verify notes are visible */
    const notes = [
      { title: NOTE_TITLE1, content: NOTE_CONTENT1 },
      { title: NOTE_TITLE2, content: NOTE_CONTENT2 },
    ];

    for (const note of notes) {
      // For each note in the notes array, find a visible note item that
      // displays both the note's title and content
      const noteElement = page
        .getByTestId('note-item')
        .filter({ hasText: note.title })
        .filter({ hasText: note.content });

      await expect(noteElement).toBeVisible();
    }
  });
});
