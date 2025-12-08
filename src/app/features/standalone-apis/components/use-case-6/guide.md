# 🔄 Use Case 6: Migration Patterns

> **💡 Lightbulb Moment**: Use `importProvidersFrom` to bridge NgModules into standalone apps!

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
