# Pipes Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: Custom Pipe
Create a truncate pipe for long text.

```typescript
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50): string {
    return value.length > limit 
      ? value.substring(0, limit) + '...' 
      : value;
  }
}

// Usage: {{ longText | truncate:20 }}
```

### Exercise 2: Pipe with Arguments
Create a pipe that accepts multiple parameters.

### Exercise 3: Pure vs Impure
Understand performance implications.

### Exercise 4: Async Pipe
Handle Observables in templates.

## 🟥 Complex Scenarios

### Scenario 1: Search Filter Pipe
Filter arrays based on search term.

### Scenario 2: Sorting Pipe
Sort arrays by property.

### Scenario 3: Time Ago Pipe
Display relative time (2 hours ago).

### Scenario 4: File Size Pipe
Format bytes to KB/MB/GB.

### Scenario 5: Memoization Pipe
Cache expensive calculations.
