import { test as setup } from '@playwright/test';
import { LoginPage } from './login.page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page); // invoke login page object

  await loginPage.goto(); // navigate to the login page
  // login using .env credentials
});
