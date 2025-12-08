# 🟦 Exercise 4: Signal Updates

**Difficulty:** Intermediate | **Time:** 15 minutes

## 📋 Problem Statement

Master different ways to update signals with objects and arrays.

## ✅ Requirements

- [ ] Create signal with object `{name, age}`
- [ ] Update individual properties correctly
- [ ] Handle array signals with add/remove

## 💡 Key Pattern

```typescript
// For objects - must return new reference
user.update(u => ({ ...u, age: u.age + 1 }));

// For arrays
items.update(arr => [...arr, newItem]);
items.update(arr => arr.filter(i => i.id !== id));
```
