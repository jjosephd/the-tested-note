import { test, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

const LOGIN_PAGE: string = '/';

export class LoginPage {
  readonly emailInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginButton: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.emailInputField = page.getByTestId('email-input');
    this.passwordInputField = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
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
    await this.page.goto('/');
  }

  async handleLogin(email: string, password: string) {
    await this.fillEmailInput(email);
    await this.fillPasswordInput(password);
    await this.clickLogin();
  }
}
