# 🔄 Use Case 3: Shared Modules

> **💡 Lightbulb Moment**: SharedModule = one import, all common components!

---

## Pattern

```typescript
@NgModule({
    declarations: [ButtonComponent, CardComponent],
    exports: [CommonModule, ButtonComponent, CardComponent]
})
export class SharedModule {}
```

---

## SharedModule vs CoreModule

| Aspect | SharedModule | CoreModule |
|--------|--------------|------------|
| Import in | Many modules | AppModule only |
| Contains | Reusable UI | App singletons |
