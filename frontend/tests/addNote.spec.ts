import { test, expect } from '@playwright/test';
import { beforeEach } from './constants';
import { LoginPage } from './pages/auth/login.page';
import { CreateNotePage } from './pages/notes/createNote.page';

// data constants
const NOTE_TITLE = 'My First Note';
const NOTE_CONTENT = 'First note content';

const LOGIN_EMAIL = 'test_user_123@aol.com';
const LOGIN_PASSWORD = 'testpassword$21';

const NAVIGATION_LINK = '/';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.handleLogin(LOGIN_EMAIL, LOGIN_PASSWORD);
});

test.describe('AddNote Component', () => {
  test.only('should alow adding a new note', async ({ page }) => {
    const createNotePage = new CreateNotePage(page);

    await createNotePage.handleFillNote(NOTE_TITLE, NOTE_CONTENT); // fill note

    /*1. Fill in the note title
    await page.getByTestId('note-title').fill(NOTE_TITLE);

    //2. Fill in the note content
    await page.getByTestId('note-content').fill(NOTE_CONTENT);

    // 3. Click the save button
    await page.getByTestId('save-note').click();
*/
    // debugger

    //4. Verify that the note is added
    const noteItem = page.getByTestId('note-item').first(); // start by storing to note item variable
    await expect(noteItem).toBeVisible(); // verify that the note is visible
    await expect(noteItem.getByText(NOTE_TITLE)).toBeVisible(); // verify that the note title is visible
    await expect(noteItem.getByText(NOTE_CONTENT)).toBeVisible(); // verify that the note content is visible

    await page.screenshot({ path: 'screenshots/debug.png' });
  });
});
