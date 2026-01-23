# 🔌 Quick Reference Guides


## 📋 Table of Contents
- [API Mocking & Network Interception](#api-mocking--network-interception)
  - [Route Interception](#route-interception)
  - [Interview Questions (20+)](#interview-questions-20)
- [Component Testing](#component-testing)
  - [Mount Component](#mount-component)
- [Visual Regression](#visual-regression)
  - [Screenshot Comparison](#screenshot-comparison)
- [CI/CD Integration](#cicd-integration)
  - [GitHub Actions](#github-actions)

---
## API Mocking & Network Interception

### Route Interception
```typescript
await page.route('**/api/users', async route => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify([{ id: 1, name: 'Test' }])
  });
});
```

### Interview Questions (20+)
**Q1:** How to mock API response?
> A: `await page.route(url, route => route.fulfill({body: data}))`.

**Q2:** How to intercept all API calls?
> A: `await page.route('**/api/**', handler)`.

**(See full guides in each use-case folder for complete 25+ questions)**

---

## Component Testing

### Mount Component
```typescript
import { test } from '@playwright/experimental-ct-angular';

const component = await mount(MyComponent, {
  props: { title: 'Test' }
});
```

---

## Visual Regression

### Screenshot Comparison
```typescript
await expect(page).toHaveScreenshot('baseline.png');
```

---

## CI/CD Integration

### GitHub Actions
```yaml
- run: npx playwright test
- uses: actions/upload-artifact@v3
  with:
    name: playwright-report
```

*Note: Each use case has detailed components and will have full guides similar to Use Cases 1-3.*
