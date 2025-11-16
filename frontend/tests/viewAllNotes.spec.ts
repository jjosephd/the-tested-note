import { test, expect } from '@playwright/test';
import { beforeEach } from './constants';

// Declare constants
const NOTE_TITLE1 = 'Title 1';
const NOTE_TITLE2 = 'Title 2';
const NOTE_CONTENT1 = 'Content Body 1';
const NOTE_CONTENT2 = 'Content Body 2';
const NAVIGATION_LINK = '/';

// Describe the test
// describe takes a string and a callback function
// AAA: __, Act, Assert
test.describe('ViewAllNotes component', () => {
  // before each test, navigate to home
  beforeEach(NAVIGATION_LINK);

  //declare test and what is expected
  test('should allow viewing of all notes', async ({ page }) => {
    /* Create first note */
    await page.getByTestId('note-title').fill(NOTE_TITLE1); // set title input to NOTE_TITLE1
    await page.getByTestId('note-content').fill(NOTE_CONTENT1); // set content to CONTENT_TITLE1
    await page.getByTestId('save-note').click(); // click to save note

    /* Verify note was added */
    // Create a noteItem variable to store the note item using the selector
    const noteItem1 = page.getByTestId('note-item').first();
    await expect(noteItem1).toBeVisible();

    /* Create second note */
    await page.getByTestId('note-title').fill(NOTE_TITLE2); // set title input to NOTE_TITLE2
    await page.getByTestId('note-content').fill(NOTE_CONTENT2); // set content to CONTENT_TITLE2
    await page.getByTestId('save-note').click(); // click to save note

    /* Verify note was added */
    // Create a noteItem variable to store the note item using the selector
    const noteItem2 = page.getByTestId('note-item').first();
    await expect(noteItem2).toBeVisible();

    /* Verify multiple notes exist*/
    const locator = page.locator('note-item');
    const count = await locator.count();

    await page.getByTestId('view-all-notes').click(); // handle view all notes click

    const noteItems = page.getByTestId('note-item');
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
