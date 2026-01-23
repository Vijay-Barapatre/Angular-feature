# 💉 Providers & DI

> **💡 Lightbulb Moment**: `providedIn: 'root'` = singleton + tree-shakable!


## 📋 Table of Contents
- [Best Practice](#best-practice)
- [forRoot/forChild Pattern](#forrootforchild-pattern)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
---

## Best Practice

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {}
```

---

## forRoot/forChild Pattern

- `forRoot()` in AppModule - provides services
- `forChild()` in feature modules - no services

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  PROVIDERS & DI                                             │
│                                                             │
│   MODERN WAY (BEST):                                        │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @Injectable({ providedIn: 'root' })                   │ │
│   │ export class UserService {}                           │ │
│   │                                                       │ │
│   │ • Singleton across entire app                         │ │
│   │ • Tree-shakable (removed if unused)                   │ │
│   │ • No need to add to module providers                  │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   forRoot/forChild PATTERN:                                 │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ AppModule:  SomeModule.forRoot(config)  // Provides   │ │
│   │ Features:   SomeModule.forChild()       // No services│ │
│   │                                                       │ │
│   │ Prevents duplicate service instances!                 │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Use `providedIn: 'root'` for services - it's tree-shakable and simpler. forRoot/forChild prevents duplicate instances!

