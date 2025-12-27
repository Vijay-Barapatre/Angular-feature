import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-basic-e2e',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="demo-container">
      <h2>🧪 Basic E2E Tests</h2>
      
      <div class="section">
        <h3>Test Examples</h3>
        <pre class="code">{{ testExamples }}</pre>
      </div>

      <div class="section">
        <h3>Common Patterns</h3>
        <div class="patterns">
          <div class="pattern">
            <h4>✅ Navigation</h4>
            <code>await page.goto('/dashboard');</code>
          </div>
          <div class="pattern">
            <h4>✅ Form Filling</h4>
            <code>await page.fill('[name="email"]', 'test@test.com');</code>
          </div>
          <div class="pattern">
            <h4>✅ Button Clicks</h4>
            <code>await page.click('button[type="submit"]');</code>
          </div>
          <div class="pattern">
            <h4>✅ Assertions</h4>
            <code>await expect(page.locator('.success')).toBeVisible();</code>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .demo-container { padding: 2rem; max-width: 900px; }
    h2 { color: #667eea; }
    .section { margin: 2rem 0; background: white; padding: 1.5rem; border-radius: 8px; }
    pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    .patterns { display: grid; gap: 1rem; }
    .pattern { padding: 1rem; background: #f9fafb; border-radius: 4px; }
    code { background: #e5e7eb; padding: 0.5rem; border-radius: 4px; display: block; margin-top: 0.5rem; }
  `]
})
export class BasicE2EComponent {
    testExamples = `import { test, expect } from '@playwright/test';

test.describe('Basic E2E Tests', () => {
  test('navigation test', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(/Angular Features/);
  });

  test('form submission', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form
    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', 'john@test.com');
    await page.fill('[name="message"]', 'Test message');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Assert success
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('auto-waiting example', async ({ page }) => {
    await page.goto('/slow-page');
    
    // Playwright auto-waits for element to be:
    // - Attached to DOM
    // - Visible
    // - Enabled
    // - Stable (not animating)
    await page.click('.load-data-btn');
    
    // Auto-waits for element to appear
    await expect(page.locator('.data-loaded')).toBeVisible();
  });
});`;
}
