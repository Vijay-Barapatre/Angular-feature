import { Component } from '@angular/core';

@Component({
    selector: 'app-page-object-model',
    standalone: true,
    template: `
    <div class="demo-container">
      <h2>📄 Page Object Model Pattern</h2>
      
      <div class="section">
        <h3>Why POM?</h3>
        <ul>
          <li>✅ Reusable page logic</li>
          <li>✅ Maintainable tests</li>
          <li>✅ Reduced duplication</li>
          <li>✅ Easy refactoring</li>
        </ul>
      </div>

      <div class="section">
        <h3>Page Object Example</h3>
        <pre>{{ pageObjectExample }}</pre>
      </div>

      <div class="section">
        <h3>Using Page Objects</h3>
        <pre>{{ testExample }}</pre>
      </div>
    </div>
  `,
    styles: [`
    .demo-container { padding: 2rem; max-width: 900px; }
    h2 { color: #667eea; margin-bottom: 2rem; }
    .section { margin: 2rem 0; background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb; }
    pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 0.875rem; line-height: 1.5; }
    ul { list-style: none; padding: 0; }
    li { padding: 0.5rem 0; }
  `]
})
export class PageObject ModelComponent {
    pageObjectExample = `// pages/login.page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.locator('.alert-error');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}`;

    testExample = `// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login', async ({ page }) => {
    await loginPage.login('user@test.com', 'password123');
    await expect(page).toHaveURL('/dashboard');
  });

  test('invalid credentials', async () => {
    await loginPage.login('wrong@test.com', 'wrong');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
  });
});`;
}
