# 🔄 Migration Patterns

> **💡 Lightbulb Moment**: Use `importProvidersFrom` to bridge NgModules into standalone apps!


## 📋 Table of Contents
- [Key Bridge Function](#key-bridge-function)
- [CLI Schematics](#cli-schematics)
- [Migration Checklist](#migration-checklist)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
---

## Key Bridge Function

```typescript
importProvidersFrom(SomeNgModule)
```

---

## CLI Schematics

```bash
ng generate @angular/core:standalone
```

---

## Migration Checklist

1. Update Angular to 15+
2. Add `standalone: true`
3. Move declarations to imports
4. Use importProvidersFrom for NgModules
5. Update main.ts
6. Remove empty NgModules

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  MIGRATION PATTERNS: NgModule → Standalone                  │
│                                                             │
│   BRIDGE FUNCTION:                                          │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ // Use existing NgModule in standalone app            │ │
│   │ providers: [                                          │ │
│   │   importProvidersFrom(SomeNgModule)  // Bridge!       │ │
│   │ ]                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   AUTO-MIGRATION:                                           │
│   ng generate @angular/core:standalone                      │
│                                                             │
│   MIGRATION CHECKLIST:                                      │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ 1. Update Angular to 15+                              │ │
│   │ 2. Add standalone: true to components                 │ │
│   │ 3. Move declarations to imports                       │ │
│   │ 4. Use importProvidersFrom for NgModules              │ │
│   │ 5. Update main.ts to bootstrapApplication             │ │
│   │ 6. Remove empty NgModules                             │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Migrate gradually with importProvidersFrom bridge. Use ng generate @angular/core:standalone for auto-migration!

