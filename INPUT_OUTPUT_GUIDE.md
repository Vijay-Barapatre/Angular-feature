# 📚 @Input() & @Output() Complete Guide

> **Master parent-child component communication in Angular with this comprehensive guide.**

---

## Table of Contents

1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Use Case Breakdown](#use-case-breakdown)
4. [Best Practices](#best-practices)
5. [Common Pitfalls](#common-pitfalls)
6. [Visual Diagrams](#visual-diagrams)

---

## Introduction

Component communication is fundamental to Angular applications. The `@Input()` and `@Output()` decorators enable a clean, predictable pattern for data flow between parent and child components.

### The Pattern: "Props Down, Events Up"

- **Data flows DOWN**: Parent → Child via `@Input()`
- **Events flow UP**: Child → Parent via `@Output()`

This unidirectional data flow makes applications easier to understand, test, and debug.

---

## Core Concepts

### @Input() Decorator

Marks a class property as bindable from a parent component.

```typescript
@Input() userName: string = '';
```

**Parent template:**
```html
<app-child [userName]="parentUserName"></app-child>
```

**Key Points:**
- Uses square brackets `[]` for property binding
- Parent owns the data
- Child receives and displays the data
- Child should NOT modify Input properties directly

### @Output() Decorator

Marks a class property as an event emitter to the parent.

```typescript
@Output() userClick = new EventEmitter<string>();
```

**Child component:**
```typescript
handleClick() {
  this.userClick.emit('Button clicked!');
}
```

**Parent template:**
```html
<app-child (userClick)="handleUserClick($event)"></app-child>
```

**Key Points:**
- Uses parentheses `()` for event binding
- Child emits events, doesn't know what parent does with them
- `$event` contains the emitted data
- Type-safe with generics: `EventEmitter<Type>`

---

## Use Case Breakdown

### Use Case 1: Basic @Input() and @Output()

**What you'll learn:**
- Simple data passing with primitives (string, number, boolean)
- Basic event emission
- Property and event binding syntax

**Real-world example:** User dashboard displaying user info

**Key Code:**
```typescript
// Child
@Input() userName: string;
@Output() greetingClick = new EventEmitter<string>();

onGreetingClick() {
  this.greetingClick.emit(`Hello from ${this.userName}!`);
}
```

---

### Use Case 2: Two-Way Binding

**What you'll learn:**
- Implementing two-way binding pattern
- Using `[()] "banana-in-a-box" syntax
- `Change` suffix naming convention

**Real-world example:** Counter and text input with synchronized values

**Key Code:**
```typescript
// Child - Must follow naming convention!
@Input() counter: number;
@Output() counterChange = new EventEmitter<number>();

increment() {
  this.counter++;
  this.counterChange.emit(this.counter);
}
```

**Parent usage:**
```html
<app-child [(counter)]="parentCounter"></app-child>
```

**This expands to:**
```html
<app-child 
  [counter]="parentCounter"
  (counterChange)="parentCounter=$event">
</app-child>
```

---

### Use Case 3: Complex Objects & Immutability

**What you'll learn:**
- Passing complex objects (arrays, nested objects)
- Change detection strategies
- Immutability patterns for performance
- Object reference vs value changes

**Real-world example:** User profile with nested data

**Key Concepts:**
- JavaScript passes objects by reference
- Modifying object properties doesn't trigger change detection with OnPush
- Create new objects for updates: `{...oldObject, newProperty: value}`

---

### Use Case 4: Custom Event Payloads

**What you'll learn:**
- Type-safe event data with interfaces
- Multiple event types from one component
- Complex data structures in events

**Real-world example:** Shopping cart with add/remove/update events

**Key Code:**
```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Output() itemAdded = new EventEmitter<CartItem>();
@Output() itemRemoved = new EventEmitter<number>(); // just ID
```

---

### Use Case 5: Input Transforms & Validation

**What you'll learn:**
- Angular 16+ `transform` option
- Input setters for validation
- Type coercion and sanitization

**Key Code:**
```typescript
// Transform function
function toNumber(value: string | number): number {
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

// Usage
@Input({ transform: toNumber }) age: number = 0;
```

**With setter:**
```typescript
private _age: number = 0;

@Input()
set age(value: number) {
  if (value < 0 || value > 150) {
    console.error('Invalid age');
    return;
  }
  this._age = value;
}

get age(): number {
  return this._age;
}
```

---

### Use Case 6: Multiple Inputs & Outputs

**What you'll learn:**
- Components with many inputs/outputs
- Organizing complex component APIs
- Real-world patterns

**Real-world example:** User profile editor with multiple fields and actions

**Key Code:**
```typescript
// Many inputs for different data
@Input() userName: string;
@Input() userEmail: string;
@Input() userAvatar: string;

// Many outputs for different events
@Output() save = new EventEmitter<UserProfile>();
@Output() cancel = new EventEmitter<void>();
@Output() change = new EventEmitter<Partial<UserProfile>>();
```

---

## Best Practices

### ✅ DO:

1. **Use TypeScript types**
   ```typescript
   @Output() userSelected = new EventEmitter<User>(); // Good
   @Output() userSelected = new EventEmitter(); // Avoid
   ```

2. **Keep child components reusable**
   - Don't couple children to specific parents
   - Use generic property names
   - Emit events, don't call parent methods directly

3. **Follow naming conventions**
   - Two-way binding: `property` + `propertyChange`
   - Event names: use verbs (`click`, `submit`, `change`)

4. **Default values for inputs**
   ```typescript
   @Input() userName: string = 'Guest'; // Prevents undefined errors
   ```

5. **Immutable updates for objects**
   ```typescript
   // Good
   this.user = { ...this.user, name: 'New Name' };
   
   // Bad (mutates input)
   this.user.name = 'New Name';
   ```

### ❌ DON'T:

1. **Don't modify @Input() directly**
   ```typescript
   // Bad
   @Input() items: string[];
   addItem() {
     this.items.push('new'); // Mutates parent's data!
   }
   
   // Good
   @Output() itemAdded = new EventEmitter<string>();
   addItem() {
     this.itemAdded.emit('new');
   }
   ```

2. **Don't use outputs for synchronous data**
   - Use `@Input()` for data
   - Use `@Output()` for events/actions

3. **Don't create tight coupling**
   - Child shouldn't know about parent's structure
   - Use interfaces for contracts

---

## Common Pitfalls

### 1. Forgetting Square Brackets/Parentheses

```html
<!-- Wrong -->
<app-child userName="John"></app-child>

<!-- Right -->
<app-child [userName]="userName"></app-child>
```

### 2. Not Handling $event

```typescript
// Wrong
<app-child (itemClick)="handleClick()"></app-child>

// Right
<app-child (itemClick)="handleClick($event)"></app-child>
```

### 3. Change Suffix Typo

```typescript
// Won't work with [()]
@Input() value: string;
@Output() valueChanged = new EventEmitter(); // Wrong suffix!

// Correct
@Output() valueChange = new EventEmitter(); // Must be 'Change'
```

### 4. Reference vs Value for Objects

```typescript
// This won't trigger OnPush change detection
this.user.name = 'New';

// This will
this.user = { ...this.user, name: 'New' };
```

---

## Visual Diagrams

Comprehensive mermaid diagrams available at:
**`src/app/features/input-output/docs/diagrams.md`**

Includes:
- Data flow diagrams for all use cases
- Sequence diagrams
- Change detection visualizations
- Two-way binding breakdown

---

## Summary Cheat Sheet

| Pattern | Syntax | Use When |
|---------|--------|----------|
| **Input** | `[prop]="value"` | Passing data to child |
| **Output** | `(event)="handler($event)"` | Receiving events from child |
| **Two-way** | `[(prop)]="value"` | Synchronized state needed |
| **Transform** | `@Input({transform: fn})` | Type coercion/sanitization |
| **Setter** | `@Input() set prop(v) {}` | Validation/side effects |

---

## Next Steps

1. ✅ Complete all 6 use cases
2. ✅ Try the learner exercise
3. ✅ Study the mermaid diagrams
4. ✅ Build your own component with Input/Output
5. ✅ Move on to the next feature module!

---

**Happy Learning! 🚀**
