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

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  toSignal(): OBSERVABLE → SIGNAL                            │
│                                                             │
│   BASIC USAGE:                                              │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ // Without initial value (returns T | undefined)      │ │
│   │ const data = toSignal(observable$);                   │ │
│   │                                                       │ │
│   │ // With initial value (returns T) ← RECOMMENDED       │ │
│   │ const data = toSignal(observable$, { initialValue: [] });│
│   │                                                       │ │
│   │ // For BehaviorSubject (has initial value)            │ │
│   │ const data = toSignal(subject$, { requireSync: true });│ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   HTTP EXAMPLE:                                             │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ users = toSignal(                                     │ │
│   │   this.http.get<User[]>('/api/users'),                │ │
│   │   { initialValue: [] }                                │ │
│   │ );                                                    │ │
│   │                                                       │ │
│   │ // Template - no async pipe needed!                   │ │
│   │ @for (user of users(); track user.id) { ... }         │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ✅ Auto-unsubscribes on destroy  ⚠️ Injection context only│
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: toSignal() converts Observable to Signal. No more async pipe! Use initialValue to avoid undefined.

