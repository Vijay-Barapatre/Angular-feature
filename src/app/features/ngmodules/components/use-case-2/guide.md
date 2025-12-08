# 📦 Use Case 2: Feature Modules

> **💡 Lightbulb Moment**: Feature module = organize by domain, lazy load = load on demand!

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
