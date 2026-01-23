# 🎯 Standalone Directives & Pipes

> **💡 Lightbulb Moment**: Directives and pipes work the same way - just add `standalone: true`!


## 📋 Table of Contents
- [Standalone Directive](#standalone-directive)
- [Standalone Pipe](#standalone-pipe)
- [Usage](#usage)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
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
