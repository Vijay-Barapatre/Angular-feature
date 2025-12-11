# 🔄 Use Case 6: ngOnChanges Lifecycle Hook

> **💡 Lightbulb Moment**: `ngOnChanges` is called whenever ANY @Input() changes - and it gives you both the current AND previous values!

---

## 1. 🔍 What is ngOnChanges?

A lifecycle hook that fires when input properties change.

```typescript
import { OnChanges, SimpleChanges } from '@angular/core';

export class MyComponent implements OnChanges {
    @Input() name: string = '';
    @Input() age: number = 0;
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes['name']) {
            console.log('Name changed from', changes['name'].previousValue,
                        'to', changes['name'].currentValue);
        }
    }
}
```

---

## 2. 🚀 SimpleChanges Object

```typescript
interface SimpleChange {
    previousValue: any;
    currentValue: any;
    firstChange: boolean;
    isFirstChange(): boolean;
}
```

### Usage
```typescript
ngOnChanges(changes: SimpleChanges) {
    // Check if specific input changed
    if (changes['userId']) {
        const change = changes['userId'];
        
        if (change.firstChange) {
            console.log('Initial value:', change.currentValue);
        } else {
            console.log('Changed from', change.previousValue, 'to', change.currentValue);
        }
    }
}
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: When does ngOnChanges run?
**Answer:**
1. Before ngOnInit (with initial values)
2. Whenever any @Input() property changes
3. Does NOT run for internal property changes

#### Q2: Can you have ngOnChanges without @Input()?
**Answer:** No! ngOnChanges only fires for @Input() decorated properties. Regular properties don't trigger it.

#### Q3: Does ngOnChanges fire for object mutations?
**Answer:** No! It only fires when the reference changes:
```typescript
// Does NOT trigger ngOnChanges
this.user.name = 'New Name';

// DOES trigger ngOnChanges
this.user = { ...this.user, name: 'New Name' };
```

---

### Scenario-Based Questions

#### Scenario 1: Multiple Inputs Changed
**Question:** Both `userId` and `userName` change at the same time. How many times does ngOnChanges fire?

**Answer:** Once! All input changes in the same change detection cycle are batched into a single call. The `SimpleChanges` object will contain both changes:
```typescript
ngOnChanges(changes: SimpleChanges) {
    // changes contains both 'userId' and 'userName'
    console.log(Object.keys(changes));  // ['userId', 'userName']
}
```

---

#### Scenario 2: Reload Data on Input Change
**Question:** Your component has a `productId` input. When it changes, reload product data from API.

**Answer:**
```typescript
@Input() productId!: string;

ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && !changes['productId'].firstChange) {
        // Skip first change (handled in ngOnInit)
        this.loadProduct(changes['productId'].currentValue);
    }
}

ngOnInit() {
    // Initial load
    this.loadProduct(this.productId);
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((ngOnChanges))
    SimpleChanges
      previousValue
      currentValue
      firstChange
    Timing
      Before ngOnInit
      On input change
      Batched calls
    Gotchas
      Reference only
      Not for mutations
      Input() required
```
