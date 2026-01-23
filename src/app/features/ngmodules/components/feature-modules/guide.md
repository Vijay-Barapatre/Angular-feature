# 📦 Feature Modules

> **💡 Lightbulb Moment**: Feature module = organize by domain, lazy load = load on demand!


## 📋 Table of Contents
- [Lazy Loading](#lazy-loading)
- [Key Points](#key-points)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
---

## Lazy Loading

```typescript
{
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
        .then(m => m.AdminModule)
}
```

---

## Key Points

- Use `RouterModule.forRoot()` in AppModule
- Use `RouterModule.forChild()` in feature modules
- Lazy loading reduces initial bundle size

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  FEATURE MODULES: ORGANIZE BY DOMAIN                        │
│                                                             │
│   LAZY LOADING:                                             │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ // app-routing.module.ts                              │ │
│   │ {                                                     │ │
│   │   path: 'admin',                                      │ │
│   │   loadChildren: () => import('./admin/admin.module')  │ │
│   │     .then(m => m.AdminModule)                         │ │
│   │ }                                                     │ │
│   │                                                       │ │
│   │ // Result: AdminModule only loads when user visits /admin│
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ROUTING RULES:                                            │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ AppModule:     RouterModule.forRoot(routes)           │ │
│   │ FeatureModule: RouterModule.forChild(featureRoutes)   │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   BENEFIT: Smaller initial bundle → faster first load!     │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Feature modules organize by domain. Lazy loading = load on demand. forRoot only once, forChild in features!

