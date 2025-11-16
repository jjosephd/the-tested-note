import { test, expect } from '@playwright/test';
import { beforeEach } from './constants';

// data constants
const NOTE_TITLE = 'My First Note';
const NOTE_CONTENT = 'First note content';

const NAVIGATION_LINK = '/';

test.describe('AddNote Component', () => {
  beforeEach(NAVIGATION_LINK);

  test('should alow adding a new note', async ({ page }) => {
    //1. Fill in the note title
    await page.getByTestId('note-title').fill(NOTE_TITLE);

    //2. Fill in the note content
    await page.getByTestId('note-content').fill(NOTE_CONTENT);

    // 3. Click the save button
    await page.getByTestId('save-note').click();

    // debugger
    await page.screenshot({ path: 'debug.png' });

    //4. Verify that the note is added
    const noteItem = page.getByTestId('note-item').first(); // start by storing to note item variable
    await expect(noteItem).toBeVisible(); // verify that the note is visible
    await expect(noteItem.getByText(NOTE_TITLE)).toBeVisible(); // verify that the note title is visible
    await expect(noteItem.getByText(NOTE_CONTENT)).toBeVisible(); // verify that the note content is visible
  });
});
