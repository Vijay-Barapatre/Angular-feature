# 🟦 Exercise 1: FormControl

**Difficulty:** Beginner | **Time:** 15 minutes

---

## 📋 Problem Statement

Create a single form control with validation using Angular's `FormControl` class.

---

## ✅ Requirements

- [ ] Create a `FormControl` with initial value
- [ ] Add `required` and `minLength` validators
- [ ] Display validation errors in template
- [ ] Show control state (valid/invalid, touched/untouched)

---

## 📤 Expected Output

```
Username: [____________]
         ⚠️ Username is required
         ⚠️ Minimum 3 characters

Control State: invalid, untouched
```

---

## 💡 Hints

```typescript
import { FormControl, Validators } from '@angular/forms';

username = new FormControl('', [
  Validators.required,
  Validators.minLength(3)
]);
```
