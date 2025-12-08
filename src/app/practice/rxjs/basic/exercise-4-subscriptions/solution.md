# 🟦 Exercise 4: Subscriptions - Solution

```typescript
// Pattern 1: takeUntil with destroy$
private destroy$ = new Subject<void>();

ngOnInit() {
  this.data$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(data => this.process(data));
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// Pattern 2: Async pipe (preferred)
// In template: {{ data$ | async }}
// Auto-unsubscribes when component destroys

// Pattern 3: DestroyRef (Angular 16+)
destroyRef = inject(DestroyRef);

ngOnInit() {
  this.data$.pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe();
}
```
