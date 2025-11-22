import type { Page, Locator } from '@playwright/test';

const LOGIN_PAGE: string = '/login';

export class LoginPage {
  readonly emailInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginButton: Locator;
  readonly emailInputErrorMsg: Locator;
  readonly passwordInputErrorMsg: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.emailInputField = page.getByTestId('email-input');
    this.passwordInputField = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.emailInputErrorMsg = page.getByText(
      'Please enter a valid email address'
    );
    this.passwordInputErrorMsg = page.getByText(
      'Must be at least 6 characters'
    );
  }

  async fillEmailInput(emailInput: string) {
    await this.emailInputField.fill(emailInput);
  }

  async fillPasswordInput(passwordInput: string) {
    await this.passwordInputField.fill(passwordInput);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async goto() {
    await this.page.goto(LOGIN_PAGE);
  }

  async handleLogin(email: string, password: string) {
    await this.fillEmailInput(email);
    await this.fillPasswordInput(password);
    await this.clickLogin();
  }

  getEmailErrorMsg = () => {
    return this.emailInputErrorMsg;
  };
  getPasswordErrorMsg = () => {
    return this.passwordInputErrorMsg;
  };
}
