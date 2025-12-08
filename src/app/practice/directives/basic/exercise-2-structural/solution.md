# Solution: Structural Directive

## 📊 Flow Diagram

```mermaid
flowchart TD
    subgraph Directive["📦 *appUnless Directive"]
        A[Condition Input] --> B{Condition?}
        B -->|true| C[viewContainer.clear]
        B -->|false| D[createEmbeddedView]
        C --> E[Content Hidden]
        D --> F[Content Visible]
    end

    style E fill:#fee2e2
    style F fill:#dcfce7
```

## 💻 Implementation

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      // Condition is FALSE, show the content
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      // Condition is TRUE, hide the content
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

### Usage

```html
<div *appUnless="isLoading">
  Content shows when NOT loading
</div>

<div *appUnless="hasPermission">
  Access Denied message (shows when no permission)
</div>
```

## 🔑 Key Concepts

- **TemplateRef**: Reference to the template content
- **ViewContainerRef**: Container that can hold views
- **createEmbeddedView**: Instantiates the template
- **clear**: Removes all views from container
