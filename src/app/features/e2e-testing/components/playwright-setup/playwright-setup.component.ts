import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-playwright-setup',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="demo-container">
      <h2>🎭 Playwright Setup & Configuration</h2>
      
      <div class="section">
        <h3>Installation Commands</h3>
        <div class="code-block">
          <code>npm init playwright@latest</code>
          <code>npm install -D @playwright/test</code>
          <code>npx playwright install</code>
        </div>
      </div>

      <div class="section">
        <h3>Configuration File (playwright.config.ts)</h3>
        <pre class="config-example">{{ configExample }}</pre>
      </div>

      <div class="section">
        <h3>Running Tests</h3>
        <div class="commands">
          <div class="command-item">
            <code>npx playwright test</code>
            <span>Run all tests</span>
          </div>
          <div class="command-item">
            <code>npx playwright test --headed</code>
            <span>Run in headed mode</span>
          </div>
          <div class="command-item">
            <code>npx playwright test --ui</code>
            <span>Run in UI mode</span>
          </div>
          <div class="command-item">
            <code>npx playwright show-report</code>
            <span>Show test report</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Browser Context Example</h3>
        <pre class="test-example">{{ testExample }}</pre>
      </div>
    </div>
  `,
    styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 900px;
    }

    h2 {
      color: #667eea;
      margin-bottom: 2rem;
    }

    .section {
      margin-bottom: 2rem;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    h3 {
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .code-block {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    code {
      background: #f3f4f6;
      padding: 0.75rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      display: block;
    }

    pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .commands {
      display: grid;
      gap: 1rem;
    }

    .command-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 4px;
    }

    .command-item code {
      background: #e5e7eb;
      padding: 0.5rem 0.75rem;
      margin: 0;
    }

    .command-item span {
      color: #6b7280;
      font-size: 0.875rem;
    }
  `]
})
export class PlaywrightSetupComponent {
    configExample = `import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  },
});`;

    testExample = `import { test, expect } from '@playwright/test';

test.describe('Playwright Setup Demo', () => {
  test('basic navigation test', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Angular Features/);
  });

  test('browser context with storage', async ({ context }) => {
    // Set storage state
    await context.addCookies([{
      name: 'auth_token',
      value: 'test_token',
      domain: 'localhost',
      path: '/'
    }]);

    const page = await context.newPage();
    await page.goto('/dashboard');
    // Cookies automatically available
  });

  test('multiple pages in one test', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('/page1');
    await page2.goto('/page2');

    // Both pages active simultaneously
  });
});`;
}
