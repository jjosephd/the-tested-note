import { test, expect } from '@playwright/test';

// Constants
const PAGE_TITLE = 'frontend';

// Describe what is being tested
// ARRANGE - Setup/navigation
test.beforeEach('navigate to home', async ({ page }) => {
  await page.goto('/');
});
test.describe('Page title verification', () => {
  // ACT - Interact with the page: No interaction required
  test('verify page has title', async ({ page }) => {
    // ASSERT - Verify expected outcomes
    // assertion: page to have title
    await expect(page).toHaveTitle(PAGE_TITLE);
  });
});
