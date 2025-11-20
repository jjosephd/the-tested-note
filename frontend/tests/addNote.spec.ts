import { test, expect } from '@playwright/test';
import { CreateNotePage } from './pages/notes/createNote.page';

// data constants
const NOTE_TITLE = 'My First Note';
const NOTE_CONTENT = 'First note content';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('AddNote Component', () => {
  test.only('should allow creating a new note', async ({ page }) => {
    const createNotePage = new CreateNotePage(page);

    await createNotePage.handleFillNote(NOTE_TITLE, NOTE_CONTENT); // fill note

    // Verify that the note is added
    const noteItem = page.getByTestId('note-item').first(); // start by storing to note item variable
    await expect(noteItem).toBeVisible(); // verify that the note is visible
    await expect(noteItem.getByText(NOTE_TITLE)).toBeVisible(); // verify that the note title is visible
    await expect(noteItem.getByText(NOTE_CONTENT)).toBeVisible(); // verify that the note content is visible

    await page.screenshot({ path: 'screenshots/debug.png' });
  });

  /**
   * Scenario: Empty title submission
   
  test('create a note with empty string', async ({ page }) => {
    const createNotePage = new CreateNotePage(page);

    await createNotePage.handleFillNote('', NOTE_CONTENT); // fill note

    // Verify that the note is added
    const noteItem = page.getByTestId('note-item').first(); // start by storing to note item variable
    await expect(noteItem).toBeVisible(); // verify that the note is visible
    await expect(noteItem.getByText(NOTE_TITLE)).toBeVisible(); // verify that the note title is visible
    await expect(noteItem.getByText(NOTE_CONTENT)).toBeVisible(); // verify that the note content is visible

    await page.screenshot({ path: 'empty_title.png' });
  });*/
});
