# 🔢 Use Case 5: Dynamic Forms

> **Goal**: Manage dynamic lists of data (Arrays) where items can be added or removed, while maintaining correct form state and validation.

---

![Dynamic Forms Flow](template-forms-use-case-5.png)

## 1. 🔍 How It Works

### The Challenge
When you loop over an array with `*ngFor` in a form, every input needs a **unique name** attribute. If two inputs have `name="product"`, they will overwrite each other in the `ngForm` registry.

### The Solution
1.  **Unique Naming**: Append the index or ID to the name: `name="product-{{i}}"`.
2.  **Tracking**: Use `trackBy` to prevent focus loss when the array changes.
3.  **Manual Validation**: Some rules (like "Min 1 item") are easier to check manually than with a directive.

### 📊 Validation Flow diagram

```mermaid
graph TD
    Array[Order Items Array] -->|*ngFor| Inputs
    
    Inputs -->|name='qty-0'| Form
    Inputs -->|name='qty-1'| Form
    
    Form -->|Contains| Controls
    Controls -->|qty-0| Valid0[Valid?]
    Controls -->|qty-1| Valid1[Valid?]
    
    SubButton[Submit Order] -->|Checks| FormState[Form.valid && Array.length > 0]
```

---

## 2. 🚀 Step-by-Step Implementation

### Step 1: Loops and Naming
This is the most critical part.

```html
<div *ngFor="let item of items; let i = index">
  <!-- Unique Name is mandatory! -->
  <input [name]="'product-' + i" [(ngModel)]="item.name">
</div>
```

### Step 2: Adding/Removing Logic
Standard array manipulation in TypeScript.

```typescript
addItem() {
  this.items.push({ name: '', price: 0 });
}

removeItem(index: number) {
  this.items.splice(index, 1);
}
```

### Step 3: TrackBy Function
Without this, Angular might re-render the DOM for every change, causing the input to lose focus while typing.

```typescript
trackById(index, item) {
  return item.id;
}
```

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  DYNAMIC TEMPLATE FORMS: ADD/REMOVE ITEMS                   │
│                                                             │
│   THE PROBLEM:                                              │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ <input name="item" *ngFor="let i of items">           │ │
│   │                                                       │ │
│   │ ❌ All inputs have same name="item" → Conflict!       │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   THE SOLUTION:                                             │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ <div *ngFor="let item of items; let i = index;        │ │
│   │      trackBy: trackById">                             │ │
│   │                                                       │ │
│   │   <input [name]="'product-' + i"                      │ │
│   │          [(ngModel)]="item.name">                     │ │
│   │                                                       │ │
│   │   <button (click)="removeItem(i)">Remove</button>     │ │
│   │ </div>                                                │ │
│   │                                                       │ │
│   │ ✅ Unique names: product-0, product-1, product-2...   │ │
│   │ ✅ trackBy prevents focus loss on array change        │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ADD/REMOVE:                                               │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ addItem()    → items.push({ name: '', price: 0 })     │ │
│   │ removeItem(i)→ items.splice(i, 1)                     │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Use `[name]="'field-' + i"` for unique names. Always use `trackBy` for dynamic lists!

---

## 3. Deep Dive: Loop & TrackBy Mechanics

### A. How the Loop Works (`*ngFor`)
When you write `*ngFor="let item of items"`, Angular acts like a stamp machine.
1.  **Template Instantiation**: It takes the HTML inside the `<div>` and creates a **new instance** of that template for *every single item* in the array.
2.  **Local Scope**: The variable `item` is local to that specific instance. Row 1 has its own `item`, Row 2 has a different `item`.

### B. The "Focus Loss" Problem (Why you need `trackBy`)
Imagine you are typing in Row 3.
1.  You call `addItem()`.
2.  The array changes from `[A, B, C]` to `[A, B, C, D]`.
3.  **Without TrackBy**: Angular looks at the array reference. It might think "The whole list changed!". It destroys the DOM elements for A, B, C and recreates them.
    *   Result: **Focus is lost** because the input you were typing in was just destroyed and replaced by a clone.

### C. How `trackBy` Fixes It
`trackBy` tells Angular how to identify items uniquely.

```typescript
trackById(index: number, item: OrderItem) {
  return item.id; // "If this ID matches, it's the SAME row. Don't touch the DOM."
}
```

**The Reconciliation Logic:**
1.  **Old List (IDs)**: `[1, 2, 3]`
2.  **New List (IDs)**: `[1, 2, 3, 4]`
3.  **Angular Logic**:
    *   "ID 1 is still here." → Keep DOM.
    *   "ID 2 is still here." → Keep DOM.
    *   "ID 3 is still here." → **Keep DOM (Focus preserved!)**.
    *   "ID 4 is new." → Create NEW DOM only for #4.

---

## 4. 🧠 Mind Map: Quick Visual Reference

```mermaid
mindmap
  root((Dynamic Forms))
    Looping
      *ngFor
      trackBy (Critical!)
    Naming
      [name]="'prop-' + i"
      Must be unique
    Logic
      push() to add
      splice() to remove
      reduce() for totals
```
