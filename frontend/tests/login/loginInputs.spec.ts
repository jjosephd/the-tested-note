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
    const emailInputField = page.getByTestId('email-input'); // access by data test id
    const passwordInputField = page.getByTestId('password-input'); // access by data test id
    const loginButton = page.getByRole('button', { name: 'Login' }); // optional: access by name (content) of button

    /* Verify form elements exist */
    await expect(emailInputField).toBeVisible();
    await expect(passwordInputField).toBeVisible();
    await expect(loginButton).toBeVisible();
  });
});
