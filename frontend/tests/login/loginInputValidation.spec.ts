import { test, expect } from '@playwright/test';
import { beforeEach } from '../constants';

// Constants
const NAV_LINK = 'http://localhost:5173/login'; // default login component
const LOGIN_EMAIL = 'test_user_123@aol.com';
const LOGIN_PASSWORD = 'testpassword$21';
const MIN_PASS_LENGTH = 6;

const EMPTY_EMAIL = '';
const EMPTY_PASSWORD = '';

const INVALID_EMAIL = 'invalidemail';
const INVALID_PASSWORD = 'inv';

//Describe the test
test.describe('LoginForm component', () => {
  beforeEach(NAV_LINK);

  /**
   * Scenario: Verify login form input fields and button are visible
   * Arrange: render locators
   * Act: none
   * Assert: verify locators are visible
   */
  test('Should render email and password input fields and login button', async ({
    page,
  }) => {
    const emailInputField = page.getByTestId('email-input')
    const passwordInputField = page.getByTestId('password-input')
    const loginButton = page.getByTestId('login-button')

    await expect(emailInputField).toBeVisible()
    await expect(passwordInputField).toBeVisible()
    await expect(loginButton).toBeVisible()
  });

  /**
   * Scenario: Verify successful login and navigation to NAV_LINK
   * Arrange: render locators
   * Act: fill in fields and submit
   * Assert: verify successful login and navigation to NAV_LINK
   */

  test('Should allow user login based on valid credentials', async ({
    page,
  }) =>{
    const emailInputField = page.getByTestId('email-input')
    const passwordInputField = page.getByTestId('password-input')
    const loginButton = page.getByTestId('login-button')

    await emailInputField.fill(LOGIN_EMAIL) // fill email field
    await passwordInputField.fill(LOGIN_PASSWORD) // fill password field
    await loginButton.click() // click login button
    
    await expect(page).toHaveURL(NAV_LINK) // verify successful login
  })

  /**
   * Scenario: Verify realtime validation for email field
   * Arrange: render locators
   * Act: fill in invalid email
   * Assert: verify realtime validation error message
   */

  test(
    'Should display error message when email is invalid',
    async ({ page}) => {
      const emailInputField = page.getByTestId('email-input') // render locator

      await emailInputField.fill('invalidemail') // fill email input with invalid email
      await expect(emailInputField).toHaveValue('invalidemail') // verify email input is invalidemail

      await expect(page.getByText('Please enter a valid email address')).toBeVisible() // verify error message is visible

    }
  )

  /**
   * Scenario: Verify realtime validation for password field
   * Arrange: render locators
   * Act: fill in invalid password
   * Assert: verify realtime validation error message
   */

  test.only(
    'Should display error message when password is invalid',
    async ({ page}) => {
      const passwordInputField = page.getByTestId('password-input') // render locator

      await passwordInputField.fill('inv') // fill password input with invalid password
      await expect(passwordInputField).toHaveValue('inv') // verify password input is invalidpassword

      await expect(page.getByText('Must be at least 6 characters')).toBeVisible() // verify error message is visible

    }
  )

  /**
   * Scenario: Disabled login button
   * Arrange: declare locators
   * Assert: verify login button is disabled when text is empty
   */

  test.only('Button default disabled',
    async ({page}) =>{
      const loginButton = page.getByTestId('login-button')

      await expect(loginButton).toBeDisabled() // verify login button is disabled
    }
  )

  /**
   * Scenario: Verify disabled login button
   * Arrange: declare locators
   * Act: fill in empty email and password
   * Assert: verify login button is disabled
   */ 
  test.only('Button should be disabled while email and password are empty',
    async ({page}) =>{
      const loginButton = page.getByTestId('login-button')
      const emailInputField = page.getByTestId('email-input')
      const passwordInputField = page.getByTestId('password-input')

      await emailInputField.fill(EMPTY_EMAIL) // fill email input with empty email
      await passwordInputField.fill(EMPTY_PASSWORD) // fill password input with empty password

      await expect(loginButton).toBeDisabled() // verify login button is disabled
    }
  )
  
  /**
   * Scenario: Verify disabled login button
   * Arrange: declare locators
   * Act: fill in empty email and password
   * Assert: verify login button is disabled
   */ 
  test.only('Button should be disabled while email and password are invalid',
    async ({page}) =>{
      const loginButton = page.getByTestId('login-button')
      const emailInputField = page.getByTestId('email-input')
      const passwordInputField = page.getByTestId('password-input')

      await emailInputField.fill(INVALID_EMAIL) // fill email input with empty email
      await passwordInputField.fill(INVALID_PASSWORD) // fill password input with empty password

      await expect(loginButton).toBeDisabled() // verify login button is disabled
    }
  )
});
