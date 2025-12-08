# 🟦 Security - Exercises Documentation

## Exercise 1: XSS Prevention
Angular automatically sanitizes data bound to the DOM.

```typescript
// UNSAFE - bypasses sanitization
@Component({
  template: `<div [innerHTML]="htmlContent"></div>`
})
export class UnsafeComponent {
  htmlContent = '<script>alert("XSS")</script><b>Safe text</b>';
  // Script tag is removed, only "Safe text" is shown
}
```

## Exercise 2: Safe HTML with DomSanitizer
```typescript
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  template: `<div [innerHTML]="safeHtml"></div>`
})
export class SafeHtmlComponent {
  private sanitizer = inject(DomSanitizer);
  
  safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    '<b>Trusted HTML content</b>'
  );
}
```

## Exercise 3: CSRF Protection
Configure XSRF token handling for HTTP requests.

```typescript
// In app.config.ts
provideHttpClient(
  withXsrfConfiguration({
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN'
  })
)
```

## Exercise 4: Content Security Policy
Implement CSP headers on your server.

## Complex Scenarios
### Scenario 1: JWT Authentication
Store tokens securely, handle refresh.

### Scenario 2: Role-Based Authorization
Check user roles before showing features.

### Scenario 3: Route Protection
Use guards to protect sensitive routes.
