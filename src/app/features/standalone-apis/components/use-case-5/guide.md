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
