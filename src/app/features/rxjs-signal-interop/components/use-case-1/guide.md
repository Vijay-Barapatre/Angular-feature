# 📡 Use Case 1: toSignal()

> **💡 Lightbulb Moment**: `toSignal()` = No more async pipe! Observable becomes a Signal.

---

## Syntax

```typescript
// Basic
const data = toSignal(observable$);

// With initial value (recommended)
const data = toSignal(observable$, { initialValue: [] });

// For BehaviorSubject
const data = toSignal(subject$, { requireSync: true });
```

---

## Example: HTTP

```typescript
users = toSignal(
    this.http.get<User[]>('/api/users'),
    { initialValue: [] }
);

// Template
@for (user of users(); track user.id) { ... }
```

---

## Key Points

- ✅ Auto-unsubscribes on component destroy
- ⚠️ Must be called in injection context
- 💡 Use `initialValue` to avoid undefined
