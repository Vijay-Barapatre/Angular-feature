# 🔄 Use Case 2: toObservable()

> **💡 Lightbulb Moment**: Need `debounceTime` or `switchMap`? Convert signal to Observable first!

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
