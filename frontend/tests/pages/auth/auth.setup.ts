import { test as setup } from '@playwright/test';
import { LoginPage } from './login.page';

const authFile = 'playwright/.auth/user.json';

// if (!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD) {
//   throw new Error('Missing LOGIN_EMAIL or LOGIN_PASSWORD in .env');
// }
const LOGIN_EMAIL: string = process.env.LOGIN_EMAIL || '';
const LOGIN_PASSWORD: string = process.env.LOGIN_PASSWORD || '';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page); // invoke login page object

  await loginPage.goto(); // navigate to the login page
  await loginPage.handleLogin(LOGIN_EMAIL, LOGIN_PASSWORD); // login using .env credentials

  await page.waitForURL('/'); // wait for login to complete

  await page.context().storageState({ path: authFile });
});
