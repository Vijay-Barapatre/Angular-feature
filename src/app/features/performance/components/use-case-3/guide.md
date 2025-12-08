# 📦 Use Case 3: Lazy Loading

> **💡 Lightbulb Moment**: Don't load admin features until user clicks "Admin"!

---

## Methods

| Method | Code | Impact |
|--------|------|--------|
| Route lazy load | `loadChildren` | High |
| Component lazy load | `loadComponent` | High |
| @defer blocks | `@defer (on viewport)` | Medium |

---

## Example

```typescript
{
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
        .then(m => m.ADMIN_ROUTES)
}
```

---

## Tools

- `ng build --stats-json` - Bundle stats
- `source-map-explorer` - Visualize bundles
