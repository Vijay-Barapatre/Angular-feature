# 📦 Use Case 3: Lazy Loading

> **💡 Lightbulb Moment**: Don't load admin features until user clicks "Admin"!

---

![Lazy Loading Flow](./lazy-loading-flow.png)

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

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  LAZY LOADING: LOAD ON DEMAND                               │
│                                                             │
│   ROUTE LAZY LOADING:                                       │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ {                                                     │ │
│   │   path: 'admin',                                      │ │
│   │   loadChildren: () => import('./admin/admin.routes')  │ │
│   │     .then(m => m.ADMIN_ROUTES)                        │ │
│   │ }                                                     │ │
│   │                                                       │ │
│   │ Main bundle: 500KB → User visits /admin → +100KB loaded│ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   COMPONENT LAZY LOADING:                                   │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ loadComponent: () => import('./heavy.component')      │ │
│   │   .then(m => m.HeavyComponent)                        │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   @DEFER BLOCKS (Angular 17+):                              │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @defer (on viewport) {                                │ │
│   │   <app-heavy-chart></app-heavy-chart>                 │ │
│   │ } @placeholder {                                      │ │
│   │   <div>Loading chart...</div>                         │ │
│   │ }                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ANALYZE: ng build --stats-json + source-map-explorer     │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Lazy load routes with loadChildren, components with loadComponent, sections with @defer. Smaller initial bundle = faster load!

