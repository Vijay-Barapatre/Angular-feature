# 🎯 Use Case 5: Standalone Directives & Pipes

> **💡 Lightbulb Moment**: Directives and pipes work the same way - just add `standalone: true`!

---

## Standalone Directive

```typescript
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
```

## Standalone Pipe

```typescript
@Pipe({
    name: 'reverse',
    standalone: true
})
```

## Usage

```typescript
imports: [HighlightDirective, ReversePipe]
```

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  STANDALONE DIRECTIVES & PIPES                              │
│                                                             │
│   STANDALONE DIRECTIVE:                                     │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @Directive({                                          │ │
│   │   selector: '[appHighlight]',                         │ │
│   │   standalone: true          // ← Just add this!       │ │
│   │ })                                                    │ │
│   │ export class HighlightDirective {}                    │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   STANDALONE PIPE:                                          │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @Pipe({                                               │ │
│   │   name: 'reverse',                                    │ │
│   │   standalone: true          // ← Same pattern!        │ │
│   │ })                                                    │ │
│   │ export class ReversePipe implements PipeTransform {}  │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   USAGE IN COMPONENT:                                       │
│   @Component({ imports: [HighlightDirective, ReversePipe] })│
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Directives and pipes work the same way! Add standalone: true, then import directly where needed.

```
