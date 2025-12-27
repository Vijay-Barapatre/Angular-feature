# 🔌 Use Case 4-7: Quick Reference Guides

## Use Case 4: API Mocking & Network Interception

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

## Use Case 5: Component Testing

### Mount Component
```typescript
import { test } from '@playwright/experimental-ct-angular';

const component = await mount(MyComponent, {
  props: { title: 'Test' }
});
```

---

## Use Case 6: Visual Regression

### Screenshot Comparison
```typescript
await expect(page).toHaveScreenshot('baseline.png');
```

---

## Use Case 7: CI/CD Integration

### GitHub Actions
```yaml
- run: npx playwright test
- uses: actions/upload-artifact@v3
  with:
    name: playwright-report
```

*Note: Each use case has detailed components and will have full guides similar to Use Cases 1-3.*
