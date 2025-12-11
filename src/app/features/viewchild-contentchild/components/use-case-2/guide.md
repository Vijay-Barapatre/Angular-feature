# 📋 Use Case 2: @ViewChildren

> **💡 Lightbulb Moment**: @ViewChildren returns a QueryList of ALL matching elements - and updates when the list changes!

---

## 1. 🔍 What is @ViewChildren?

Queries all matching elements, directives, or components.

```typescript
@Component({
    template: `
        @for (item of items; track item.id) {
            <app-item [data]="item"></app-item>
        }
    `
})
export class ListComponent implements AfterViewInit {
    @ViewChildren(ItemComponent) itemComponents!: QueryList<ItemComponent>;
    
    ngAfterViewInit() {
        console.log('Items:', this.itemComponents.length);
        
        // Subscribe to changes
        this.itemComponents.changes.subscribe(() => {
            console.log('List updated:', this.itemComponents.length);
        });
    }
}
```

---

## 2. 🚀 QueryList Features

```typescript
// Properties and methods
this.itemComponents.first;       // First item
this.itemComponents.last;        // Last item
this.itemComponents.length;      // Count
this.itemComponents.toArray();   // Convert to array
this.itemComponents.forEach(...); // Iterate
this.itemComponents.changes;     // Observable of changes
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: When does QueryList update?
**Answer:** When items are added/removed from the DOM (like in *ngFor changes).

#### Q2: How to iterate ViewChildren?
**Answer:**
```typescript
this.itemComponents.forEach(item => item.highlight());
// OR
for (const item of this.itemComponents) { ... }
```

---

### Scenario-Based Questions

#### Scenario: Highlight All Items
**Question:** Add "highlight" method that highlights all items.

**Answer:**
```typescript
@ViewChildren(ItemComponent) items!: QueryList<ItemComponent>;

highlightAll() {
    this.items.forEach(item => item.setHighlight(true));
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((@ViewChildren))
    Returns
      QueryList
      All matches
    Features
      changes Observable
      forEach
      toArray
    Timing
      ngAfterViewInit
      Updates dynamically
```
