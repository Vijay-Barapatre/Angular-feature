# 🌍 Use Case 5: Real-world Patterns

> **💡 Lightbulb Moment**: Combine patterns for production-ready apps!

---

## 5 Key Patterns

1. **HTTP + Loading** - toSignal + effect
2. **Debounced Search** - toObservable → RxJS → toSignal
3. **Form Validation** - computed for validation
4. **State Store** - Signals as mini-store
5. **Caching** - toSignal in Map

---

## Most Common Pattern

```typescript
// Signal → debounce → API → Signal
results = toSignal(
    toObservable(this.query).pipe(
        debounceTime(300),
        switchMap(q => this.api.search(q))
    ),
    { initialValue: [] }
);
```

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  REAL-WORLD PATTERNS                                        │
│                                                             │
│   5 KEY PATTERNS:                                           │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ 1. HTTP + Loading:  toSignal + effect for loading     │ │
│   │ 2. Debounced Search: toObservable → RxJS → toSignal   │ │
│   │ 3. Form Validation: computed for validation rules     │ │
│   │ 4. State Store:     Signals as mini-store             │ │
│   │ 5. Caching:         toSignal in Map for cache         │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   MOST COMMON PATTERN (Debounced Search):                   │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ results = toSignal(                                   │ │
│   │   toObservable(this.query).pipe(                      │ │
│   │     debounceTime(300),                                │ │
│   │     switchMap(q => this.api.search(q))                │ │
│   │   ),                                                  │ │
│   │   { initialValue: [] }                                │ │
│   │ );                                                    │ │
│   │                                                       │ │
│   │ Signal → toObservable → RxJS operators → toSignal     │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: The bridge pattern: Signal → toObservable → RxJS operators → toSignal. Best of both worlds!

```
