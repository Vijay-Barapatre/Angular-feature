import { Component } from '@angular/core';

@Component({
    selector: 'app-api-mocking',
    standalone: true,
    template: `
    <div class="demo-container">
      <h2>🔌 API Mocking & Network Interception</h2>
      
      <div class="section">
        <h3>Route Interception Example</h3>
        <pre>{{ mockExample }}</pre>
      </div>

      <div class="patterns">
        <div class="pattern">
          <h4>✅ Mock API Response</h4>
          <p>Return fake data instead of real API</p>
        </div>
        <div class="pattern">
          <h4>✅ Network Throttling</h4>
          <p>Simulate slow connections</p>
        </div>
        <div class="pattern">
          <h4>✅ Request Validation</h4>
          <p>Verify request payload</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .demo-container { padding: 2rem; max-width: 900px; }
    h2 { color: #667eea; }
    .section { margin: 2rem 0; background: white; padding: 1.5rem; border-radius: 8px; }
    pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    .patterns { display: grid; gap: 1rem; margin-top: 2rem; }
    .pattern { padding: 1rem; background: #f9fafb; border-radius: 4px; }
  `]
})
export class ApiMockingComponent {
    mockExample = `import { test, expect } from '@playwright/test';

test('mock API response', async ({ page }) => {
  // Intercept /api/users request
  await page.route('**/api/users', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ])
    });
  });

  await page.goto('/users');
  await expect(page.locator('.user-item')).toHaveCount(2);
});`;
}
