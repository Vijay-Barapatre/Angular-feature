# 🧩 Use Case 6: Custom Attribute Directive

> **Goal**: Create reusable attribute directives using HostListener and HostBinding.

---

## 🔍 How It Works

Attribute directives modify behavior of existing elements. Perfect use of Host decorators!

---

## 🚀 Implementation

### Highlight Directive

```typescript
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    @Input() highlightColor = '#fff176';

    @HostBinding('style.backgroundColor')
    bgColor = 'transparent';

    @HostListener('mouseenter')
    onEnter() { this.bgColor = this.highlightColor; }

    @HostListener('mouseleave')
    onLeave() { this.bgColor = 'transparent'; }
}
```

### Usage

```html
<div appHighlight>Yellow on hover</div>
<div appHighlight [highlightColor]="'pink'">Pink</div>
```

---

## 🌍 Real World Uses

1. **Highlight directive** - Text highlights
2. **Tooltip directive** - Custom tooltips
3. **Click outside** - Close dropdowns
4. **Lazy load** - Images on scroll

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Custom Directives))
    Structure
      @Directive decorator
      selector attribute
      standalone true
    Inputs
      Configuration
      Colors, text
    HostBinding
      Style changes
      Class toggles
    HostListener
      User events
      Document events
```
