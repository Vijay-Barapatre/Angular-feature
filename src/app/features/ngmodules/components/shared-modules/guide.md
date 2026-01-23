# 🔄 Shared Modules

> **💡 Lightbulb Moment**: SharedModule = one import, all common components!


## 📋 Table of Contents
- [Pattern](#pattern)
- [SharedModule vs CoreModule](#sharedmodule-vs-coremodule)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
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

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  SHARED MODULE: ONE IMPORT, ALL COMMON STUFF                │
│                                                             │
│   STRUCTURE:                                                │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @NgModule({                                           │ │
│   │   declarations: [ButtonComponent, CardComponent, ...] │ │
│   │   exports: [                                          │ │
│   │     CommonModule,   // Re-export for convenience      │ │
│   │     ButtonComponent,                                  │ │
│   │     CardComponent                                     │ │
│   │   ]                                                   │ │
│   │ }) export class SharedModule {}                       │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   SHARED vs CORE:                                           │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ SharedModule: Imported in MANY modules (UI components)│ │
│   │ CoreModule:   Imported ONCE in AppModule (singletons) │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: SharedModule = reusable UI (buttons, cards). CoreModule = app singletons (services). Import SharedModule in features, CoreModule only once!

