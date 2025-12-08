# ⚡ Use Case 3: effect()

> **💡 Lightbulb Moment**: effect() = subscribe to signals for side effects!

---

## Common Uses

- 📝 Logging / debugging
- 💾 Persist to localStorage
- 📊 Analytics tracking
- 🔗 Sync with external libraries

---

## Example

```typescript
effect(() => {
    localStorage.setItem('theme', this.theme());
});
```

---

## Rules

⚠️ Don't write signals inside effect (infinite loop)  
✅ Use `allowSignalWrites: true` if you must  
💡 For computed values, use `computed()` instead
