# 🟦 Pipes - Missing Exercises

## Exercise 2: Pipe with Arguments
```typescript
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, suffix = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + suffix;
  }
}

// Usage
{{ longText | truncate:20:'...' }}
{{ longText | truncate:100:'[more]' }}
```

## Exercise 3: Pure vs Impure
```typescript
// Pure pipe (default) - only recalculates when inputs change
@Pipe({ name: 'filter', pure: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    return items.filter(i => i.name.includes(filter));
  }
}

// Impure pipe - recalculates on every change detection
@Pipe({ name: 'filterImpure', pure: false })
export class FilterImpurePipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    return items.filter(i => i.name.includes(filter));
  }
}
```

## Exercise 4: Async Pipe
```html
<!-- Automatically subscribes and unsubscribes -->
@if (user$ | async; as user) {
  <p>Welcome, {{ user.name }}</p>
} @else {
  <p>Loading...</p>
}
```

## Complex Scenarios
### Scenario 2: Sorting Pipe
```typescript
@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(array: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    return [...array].sort((a, b) => {
      const result = a[field] > b[field] ? 1 : -1;
      return order === 'asc' ? result : -result;
    });
  }
}
```

### Scenario 3: Time Ago Pipe
```typescript
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(date: Date | string): string {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }
}
```
