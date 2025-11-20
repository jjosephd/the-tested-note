import { test, expect } from '@playwright/test';

// data constants
const NOTE_TITLE = 'My First Note';
const NOTE_CONTENT = 'First note content';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('DeleteNote function', () => {
  test('should allow deleting a note', async ({ page }) => {
    //1. Fill in the note title
    await page.getByTestId('note-title').fill(NOTE_TITLE);

    //2. Fill in the note content
    await page.getByTestId('note-content').fill(NOTE_CONTENT);

    // 3. Click the save button
    await page.getByTestId('save-note').click();

    //4. Verify that the note is added
    const noteItem = page.getByTestId('note-item').first(); // start by storing to note item variable
    await expect(noteItem).toBeVisible();
    await expect(noteItem.getByText(NOTE_TITLE)).toBeVisible();
    await expect(noteItem.getByText(NOTE_CONTENT)).toBeVisible();

    //5. Click the delete button for this specific note
    await noteItem.getByRole('button', { name: /delete note/i }).click();

    //6. Verify that the note is deleted
    await expect(noteItem).toBeHidden();
  });
});
