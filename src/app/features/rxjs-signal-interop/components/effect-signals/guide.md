# ⚡ effect()

> **💡 Lightbulb Moment**: effect() = subscribe to signals for side effects!


## 📋 Table of Contents
- [Common Uses](#common-uses)
- [Example](#example)
- [Rules](#rules)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
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

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  effect(): REACT TO SIGNAL CHANGES                          │
│                                                             │
│   USE CASES:                                                │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ • Logging/debugging                                   │ │
│   │ • Persist to localStorage                             │ │
│   │ • Analytics tracking                                  │ │
│   │ • Sync with external libraries                        │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   EXAMPLE:                                                  │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ effect(() => {                                        │ │
│   │   localStorage.setItem('theme', this.theme());        │ │
│   │ });                                                   │ │
│   │                                                       │ │
│   │ // Runs whenever theme() changes!                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ⚠️ DON'T: Write signals inside effect (infinite loop!)   │
│   ✅ Use allowSignalWrites: true if you absolutely must   │
│   💡 For derived values → use computed() instead          │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: effect() is for side effects (localStorage, logging, analytics). For derived values, use computed() instead!

