# 🟦 Exercise 3: Validators - Solution

```typescript
import { Validators } from '@angular/forms';

// Built-in Validators
phone = new FormControl('', [
  Validators.required,
  Validators.minLength(10),
  Validators.maxLength(15),
  Validators.pattern(/^[0-9]+$/)  // Only digits
]);

email = new FormControl('', [
  Validators.required,
  Validators.email
]);

// Check specific errors
@if (phone.errors?.['pattern']) {
  <p>Only numbers allowed</p>
}
@if (phone.errors?.['minlength']) {
  <p>Minimum {{ phone.errors?.['minlength'].requiredLength }} digits</p>
}
```

## Validator Reference

| Validator | Usage |
|-----------|-------|
| `required` | Field must have value |
| `minLength(n)` | Minimum n characters |
| `maxLength(n)` | Maximum n characters |
| `pattern(regex)` | Match regex pattern |
| `email` | Valid email format |
| `min(n)` | Minimum number value |
| `max(n)` | Maximum number value |
