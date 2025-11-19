import { test, expect } from '@playwright/test';
import { beforeEach } from '../constants';

// Constants
const NAV_LINK = 'http://localhost:5173/login'; // default login component
const LOGIN_USER = 'test_user_123';
const LOGIN_PASSWORD = 'testpassword$21';
const MIN_PASS_LENGTH = 6;

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

  /**
   * Test:  empty email and password string error submissio
   * Arrange: verify visible fields
   * Act: click login button's without entering valid input
   * Assert: verify email and password errors
   */

  test('Should prevent login and return an error based on required email and user input', async ({
    page,
  }) => {
    const emailInputField = page.getByTestId('email-input'); // access by data test id
    const passwordInputField = page.getByTestId('password-input'); // access by data test id
    const loginButton = page.getByRole('button', { name: 'Login' }); // optional: access by name (content) of button

    /* Verify form elements exist */
    await expect(emailInputField).toBeVisible();
    await expect(passwordInputField).toBeVisible();
    await expect(loginButton).toBeVisible();

    // click the login button
    await loginButton.click();
    await page.screenshot({
      path: 'empty_user_and_pass_debug.png',
    });

    const errorMessages = page.getByText('This field is required');
    await expect(errorMessages).toHaveCount(2);
  });

  /**
   * Test:  empty email string error submission
   * Arrange: verify visible fields
   * Act: click login button's without entering valid email input
   * Assert: verify email error
   */

  test('Should prevent login and return error based on required email input', async ({
    page,
  }) => {
    const emailInputField = page.getByTestId('email-input'); // access by data test id
    const passwordInputField = page.getByTestId('password-input'); // access by data test id
    const loginButton = page.getByRole('button', { name: 'Login' }); // optional: access by name (content) of button

    /* Verify form elements exist */
    await expect(emailInputField).toBeVisible();
    await expect(passwordInputField).toBeVisible();
    await expect(loginButton).toBeVisible();

    await passwordInputField.fill(LOGIN_PASSWORD);
    // click the login button
    await loginButton.click();
    await page.screenshot({
      path: 'empty_user_debug.png',
    });

    await expect(page.getByText('This field is required')).toBeVisible();
  });

  /**
   * Test:  empty password string error submission
   * Arrange: verify visible fields
   * Act: click login button's without entering valid password input
   * Assert: verify password error
   */

  test('Should show required error when only password field is empty', async ({
    page,
  }) => {
    // --- Locators ---
    const emailInput = page.getByTestId('email-input');
    const passwordInput = page.getByTestId('password-input');
    const loginButton = page.getByRole('button', { name: 'Login' });

    // Optional: Assert visibility (Good practice, but often redundant after goto)
    await expect(emailInput).toBeVisible();

    // 1. Ensure a clean starting state for the password field by explicitly clearing it.
    await passwordInput.clear();

    // 2. Fill the email field with a valid value.
    await emailInput.fill(LOGIN_USER);

    // 3. Trigger the 'blur' event to ensure React registers the email input value change
    // before the form submission. We focus the password field to blur the email field.
    await passwordInput.focus();

    // 4. Click the login button to trigger the onSubmit validation.
    await loginButton.click();

    // 5. --- Assertions ---
    // The previous screenshot step is commented out, as it should no longer be needed
    // to debug this particular issue once the fix is applied.
    await page.screenshot({ path: 'empty_pass_debug_FIXED.png' });

    // 6. Refined Assertion: Locate the password input's parent/sibling element
    // that contains the specific error message text. This avoids confusion
    // if the email field error (for format) is also present.
    // We target the `<p>` element immediately following the password input.
    const passwordError = passwordInput.locator('+ p');

    // Assert that the 'required' error message is visible under the password field.
    await expect(passwordError).toHaveText('This field is required');
  });
});
