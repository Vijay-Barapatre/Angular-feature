# 🔄 toObservable()

> **💡 Lightbulb Moment**: Need `debounceTime` or `switchMap`? Convert signal to Observable first!


## 📋 Table of Contents
- [When to Use](#when-to-use)
- [Example](#example)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
---

## When to Use

- Debouncing user input
- SwitchMap for API calls
- CombineLatest multiple signals
- Any RxJS operator need

---

## Example

```typescript
searchTerm = signal('');
searchTerm$ = toObservable(this.searchTerm);

constructor() {
    this.searchTerm$.pipe(
        debounceTime(300),
        switchMap(term => this.api.search(term))
    ).subscribe();
}
```

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  toObservable(): SIGNAL → OBSERVABLE                        │
│                                                             │
│   USE CASES:                                                │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ • Debouncing user input                               │ │
│   │ • switchMap for API calls                             │ │
│   │ • combineLatest multiple signals                      │ │
│   │ • Any RxJS operator need                              │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   EXAMPLE:                                                  │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ searchTerm = signal('');                              │ │
│   │ searchTerm$ = toObservable(this.searchTerm);          │ │
│   │                                                       │ │
│   │ constructor() {                                       │ │
│   │   this.searchTerm$.pipe(                              │ │
│   │     debounceTime(300),  // Works now!                 │ │
│   │     switchMap(term => this.api.search(term))          │ │
│   │   ).subscribe();                                      │ │
│   │ }                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   Signal ━━━➤ toObservable() ━━━➤ RxJS operators apply!   │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Need RxJS operators on a signal? toObservable() bridges the gap. Perfect for debounce, switchMap, combineLatest!

```
