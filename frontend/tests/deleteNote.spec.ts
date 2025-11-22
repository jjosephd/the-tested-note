import { test, expect } from '@playwright/test';
import { NotesPage } from './pages/notes/notesPage.page';

// data constants
const NOTE_TITLE = 'My First Note';
const NOTE_CONTENT = 'First note content';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('DeleteNote function', () => {
  test('should allow deleting a note', async ({ page }) => {
    const notesPage = new NotesPage(page);
    await notesPage.createNote(NOTE_TITLE, NOTE_CONTENT);

    //4. Verify that the note is added
    const noteItem = notesPage.getNoteItem(); // start by storing to note item variable
    await expect(noteItem).toBeVisible();
    await expect(noteItem.getByText(NOTE_TITLE)).toBeVisible();
    await expect(noteItem.getByText(NOTE_CONTENT)).toBeVisible();

    //5. Click the delete button for this specific note
    await notesPage.clickDeleteNote();

    //6. Verify that the note is deleted
    await expect(noteItem).toBeHidden();
  });
});
