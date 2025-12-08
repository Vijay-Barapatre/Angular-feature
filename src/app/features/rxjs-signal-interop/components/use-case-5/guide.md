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
