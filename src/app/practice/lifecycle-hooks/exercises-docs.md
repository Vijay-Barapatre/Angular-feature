# Lifecycle Hooks Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: OnInit / OnDestroy
Initialize and cleanup component.

```typescript
ngOnInit(): void {
  console.log('Component initialized');
  this.subscription = this.data$.subscribe();
}

ngOnDestroy(): void {
  console.log('Component destroyed');
  this.subscription.unsubscribe();
}
```

### Exercise 2: OnChanges
React to input property changes.

### Exercise 3: AfterViewInit
Access view children after view init.

### Exercise 4: AfterContentInit
Access projected content.

## 🟥 Complex Scenarios

### Scenario 1: Timer Cleanup
Proper interval/subscription management.

### Scenario 2: Change Detection Timing
Understanding when hooks fire.

### Scenario 3: Dynamic Form Lifecycle
Multiple component lifecycles.

### Scenario 4: Animation Hooks
Coordinate animations with lifecycle.

### Scenario 5: Performance Monitoring
Track hook execution times.
