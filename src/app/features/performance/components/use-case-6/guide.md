# 🧠 Use Case 6: Memory Management

> **💡 Lightbulb Moment**: `takeUntilDestroyed()` = auto-unsubscribe when component dies!

---

## Best Patterns

1. **async pipe** - Zero boilerplate
2. **takeUntilDestroyed()** - Modern approach
3. **DestroyRef.onDestroy()** - For non-Observable cleanup

---

## Example

```typescript
private destroyRef = inject(DestroyRef);

ngOnInit() {
    this.data$.pipe(
        takeUntilDestroyed(this.destroyRef)
    ).subscribe();
}
```
