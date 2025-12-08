# 🧩 *ngComponentOutlet Directive

This guide explains how to use the declarative `*ngComponentOutlet` directive for dynamic components.

## 🔍 How It Works (The Concept)

If you simply want to "render Component X here" based on a variable, writing `ViewContainerRef` boilerplate is overkill.
Angular provides a directive specifically for this.

```html
<ng-container *ngComponentOutlet="myComponentVariable"></ng-container>
```

When `myComponentVariable` changes, Angular destroys the old component and creates the new one automatically.

## 🚀 Step-by-Step Implementation Guide

### 1. Import `NgComponentOutlet`
It's a standalone directive, so import it in your component.

```typescript
import { NgComponentOutlet } from '@angular/common';

@Component({
  imports: [NgComponentOutlet],
  // ...
})
```

### 2. Define the Variable
The variable must hold a **Class Reference** (`Type<any>`), not a string.

```typescript
import { MyComponent } from './my.component';

export class ParentComponent {
  activeComponent = MyComponent; 
}
```

### 3. Use in Template

```html
<ng-container *ngComponentOutlet="activeComponent"></ng-container>
```

### 4. Passing Data (Inputs)
To pass data, you need an **Injector**. `*ngComponentOutlet` does not support `[inputs]` binding directly in a simple way (though Angular 16+ added an `inputs` input to the directive!).

**Angular 16+ Way:**
```html
<ng-container *ngComponentOutlet="activeComponent; inputs: { name: 'Alice' }"></ng-container>
```

**Old Way (Injector):**
You had to create a custom injector to inject tokens into the child.

## ⚡ Comparison

| Feature | ViewContainerRef | *ngComponentOutlet |
| :--- | :--- | :--- |
| **Style** | Imperative (JS/TS) | Declarative (HTML) |
| **Complexity** | High | Low |
| **Flexibility** | High (Move, Insert, Detach) | Low (Only Swap) |
| **Use Case** | Modals, Complex Lists | Tab Switchers, Dynamic Pages |

## 🌍 Real World Use Cases

1.  **Tab Systems**: Where each tab is a different component.
2.  **CMS Page Builder**: Rendering a "Text Block", then "Image Block", then "Video Block" based on a JSON array of types.
