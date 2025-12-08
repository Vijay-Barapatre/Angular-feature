# 📦 Use Case 4: Standalone Components

> **💡 Lightbulb Moment**: `standalone: true` = component owns its dependencies. No NgModule middleman!

---

## Syntax

```typescript
@Component({
    selector: 'app-my-component',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `...`
})
```

---

## Benefits

- ✅ Self-contained
- ✅ Better tree-shaking
- ✅ Easier testing
- ✅ Clearer dependencies
