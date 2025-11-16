import { test, expect } from '@playwright/test';

// Before Each helper method
export const beforeEach = (navigationLink: string) => {
  test.beforeEach(async ({ page }) => {
    await page.goto(navigationLink);
  });
};
