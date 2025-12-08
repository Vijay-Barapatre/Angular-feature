# 🟦 Exercise 4: Input Transform

**Difficulty:** Intermediate | **Time:** 15-20 minutes

---

## 📋 Problem Statement

Create a component that uses `@Input()` with a transform function to automatically convert input values. For example, transform string 'true'/'false' to boolean, or parse string numbers.

---

## ✅ Requirements

- [ ] Create component with `@Input({ transform: ... })` 
- [ ] Transform string "true"/"false" to boolean
- [ ] Transform string numbers to actual numbers

---

## 📤 Expected Output

```html
<app-feature enabled="true"></app-feature>
<!-- enabled is boolean true, not string "true" -->
```

---

## 💡 Hints

```typescript
@Input({ transform: booleanAttribute }) enabled = false;
@Input({ transform: numberAttribute }) count = 0;
```
