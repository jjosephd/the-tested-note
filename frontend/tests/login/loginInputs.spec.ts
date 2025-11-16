import { test, expect } from '@playwright/test';
import { beforeEach } from '../constants';

// Constants
const NAV_LINK = 'http://localhost:5173/login'; // default login component

//Describe the test
test.describe('LoginForm component', () => {
  beforeEach(NAV_LINK);

  //declare test and what is expected
  test.only('Should render a username input, password input, and login button', async ({
    page,
  }) => {
    const emailInputField = page.getByTestId('email-input');
    const passwordInputField = page.getByTestId('password-input');

    await expect(emailInputField).toBeVisible();
    await expect(passwordInputField).toBeVisible();
  });
});
