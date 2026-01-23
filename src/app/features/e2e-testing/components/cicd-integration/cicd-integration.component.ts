import { Component } from '@angular/core';

@Component({
    selector: 'app-cicd-integration',
    standalone: true,
    template: `
    <div class="demo-container">
      <h2>⚙️ CI/CD Integration</h2>
      
      <div class="section">
        <h3>GitHub Actions Workflow</h3>
        <pre>{{ githubActionsExample }}</pre>
      </div>

      <div class="features">
        <div class="feature">✅ Parallel execution</div>
        <div class="feature">✅ Docker containers</div>
        <div class="feature">✅ HTML reports</div>
        <div class="feature">✅ Artifact upload</div>
      </div>
    </div>
  `,
    styles: [`
    .demo-container { padding: 2rem; max-width: 900px; }
    h2 { color: #667eea; }
    .section { margin: 2rem 0; background: white; padding: 1.5rem; border-radius: 8px; }
    pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 0.75rem; }
    .features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 2rem; }
    .feature { padding: 1rem; background: #dcfce7; border-radius: 4px; font-weight: 600; text-align: center; }
  `]
})
export class CicdIntegrationComponent {
    githubActionsExample = `# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
      
    - name: Run Playwright tests
      run: npx playwright test
      
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30`;
}
