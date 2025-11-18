import { test, expect } from '@playwright/test';
import { beforeEach } from '../constants';

// Constants
const NAV_LINK = 'http://localhost:5173/login'; // default login component
const LOGIN_USER = 'test_user_123';
const LOGIN_PASSWORD = 'testpassword$21';
//Describe the test
test.describe('LoginForm component', () => {
  beforeEach(NAV_LINK);

  //declare test and what is expected
  test('Should render a username input, password input, and login button', async ({
    page,
  }) => {
    const emailInputField = page.getByTestId('email-input'); // access by data test id
    const passwordInputField = page.getByTestId('password-input'); // access by data test id
    const loginButton = page.getByRole('button', { name: 'Login' }); // optional: access by name (content) of button

    /* Verify form elements exist */
    await expect(emailInputField).toBeVisible();
    await expect(passwordInputField).toBeVisible();
    await expect(loginButton).toBeVisible();

    /* Fill in and verify login form */
    // Fill email

    await emailInputField.fill(LOGIN_USER);
    await expect(emailInputField).toHaveValue(LOGIN_USER);

    await passwordInputField.fill(LOGIN_PASSWORD);
    await expect(passwordInputField).toHaveValue(LOGIN_PASSWORD);

    // Submit the form
    await loginButton.click();

    /* Navigate to home */
    await page.goto(NAV_LINK);
  });

  /* Test empty username error submission */
  test.only('Should prevent login and return an error', async ({ page }) => {
    const emailInputField = page.getByTestId('email-input'); // access by data test id
    const passwordInputField = page.getByTestId('password-input'); // access by data test id
    const loginButton = page.getByRole('button', { name: 'Login' }); // optional: access by name (content) of button

    /* Verify form elements exist */
    await expect(emailInputField).toBeVisible();
    await expect(passwordInputField).toBeVisible();
    await expect(loginButton).toBeVisible();

    /* Fill in and verify login form */
    // Fill email

    await emailInputField.fill('');
    await expect(emailInputField).toHaveValue('');
    await passwordInputField.fill(LOGIN_PASSWORD);
    await expect(passwordInputField).toHaveValue(LOGIN_PASSWORD);

    // Submit the form
    await loginButton.click();

    await expect(
      page.getByText('Please enter a valid email address')
    ).toBeVisible();
    await page.screenshot({ path: 'debug.png' });
  });
});
