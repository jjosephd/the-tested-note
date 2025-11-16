import { test, expect } from '@playwright/test';
import { beforeEach } from './constants';

// Constants
const PAGE_TITLE = 'frontend';
const NAVIGATION_LINK = '/';

// Describe what is being tested
// ARRANGE - Setup/navigation
test.describe('Page title verification', () => {
  beforeEach(NAVIGATION_LINK);

  // ACT - Interact with the page: No interaction required
  test('verify page has title', async ({ page }) => {
    // ASSERT - Verify expected outcomes
    // assertion: page to have title
    await expect(page).toHaveTitle(PAGE_TITLE);
  });
});
