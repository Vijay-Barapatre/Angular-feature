import { Component } from '@angular/core';

@Component({
    selector: 'app-visual-regression',
    standalone: true,
    template: `
    <div class="demo-container">
      <h2>📸 Visual Regression Testing</h2>
      
      <div class="section">
        <h3>Screenshot Comparison</h3>
        <pre>{{ screenshotExample }}</pre>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <h4>Full Page</h4>
          <code>await page.screenshot({ fullPage: true })</code>
        </div>
        <div class="info-card">
          <h4>Element Only</h4>
          <code>await element.screenshot()</code>
        </div>
        <div class="info-card">
          <h4>Comparison</h4>
          <code>toHaveScreenshot()</code>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .demo-container { padding: 2rem; max-width: 900px; }
    h2 { color: #667eea; }
    .section { margin: 2rem 0; background: white; padding: 1.5rem; border-radius: 8px; }
    pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    .info-grid { display: grid; gap: 1rem; margin-top: 2rem; }
    .info-card { padding: 1.5rem; background: #f3f4f6; border-radius: 8px; }
    code { background: #e5e7eb; padding: 0.5rem; border-radius: 4px; display: block; margin-top: 0.5rem; font-size: 0.875rem; }
  `]
})
export class VisualRegressionComponent {
    screenshotExample = `import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  
  // Take screenshot and compare with baseline
  await expect(page).toHaveScreenshot('homepage.png');
});

test('element screenshot', async ({ page }) => {
  await page.goto('/dashboard');
  
  const widget = page.locator('.stats-widget');
  await expect(widget).toHaveScreenshot('stats-widget.png');
});`;
}
