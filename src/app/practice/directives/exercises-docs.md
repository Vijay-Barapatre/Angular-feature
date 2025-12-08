# Directives Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: Attribute Directive
Create a highlight directive that changes background color.

```typescript
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### Exercise 2: Structural Directive
Create custom *appUnless directive (opposite of *ngIf).

### Exercise 3: HostBinding
Bind to host element properties dynamically.

### Exercise 4: Input Decorator with Directives
Pass configuration to directives.

## 🟥 Complex Scenarios

### Scenario 1: Tooltip Directive
Dynamic tooltip that follows mouse.

### Scenario 2: Permission Directive
Show/hide elements based on user permissions.

### Scenario 3: Infinite Scroll
Detect scroll position, load more data.

### Scenario 4: Click Outside
Detect clicks outside element (for dropdowns).

### Scenario 5: Debounce Input
Debounce user input in forms.
