# 📋 Use Case 2: TrackBy Optimization

> **💡 Lightbulb Moment**: TrackBy tells Angular "this item is the same as before" so it reuses DOM!

---

## Syntax

```typescript
// Modern @for
@for (item of items; track item.id) {
    <div>{{ item.name }}</div>
}

// Legacy *ngFor
*ngFor="let item of items; trackBy: trackById"
```

---

## Impact

| Scenario | Without TrackBy | With TrackBy |
|----------|-----------------|--------------|
| Add 1 to 1000 | 1000 DOM ops | 1 DOM op |

---

## Best Practices

✅ Track by unique ID  
❌ Don't track by index (unless static)  
❌ Don't track by object reference
