# 🔄 Use Case 2: ngOnChanges

> **💡 Lightbulb Moment**: `ngOnChanges` fires BEFORE ngOnInit and then whenever ANY @Input() changes!

---

## 1. 🔍 What is ngOnChanges?

Lifecycle hook that responds to input property changes.

```typescript
export class UserCardComponent implements OnChanges {
    @Input() userId!: string;
    @Input() highlight: boolean = false;
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes['userId']) {
            this.loadUserData();
        }
        if (changes['highlight']?.currentValue) {
            this.animateHighlight();
        }
    }
}
```

---

## 2. 🚀 SimpleChanges Structure

```typescript
{
    userId: {
        previousValue: '123',
        currentValue: '456',
        firstChange: false,
        isFirstChange: () => false
    },
    highlight: {
        previousValue: undefined,
        currentValue: true,
        firstChange: true,
        isFirstChange: () => true
    }
}
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: ngOnChanges vs Input setter - when to use which?
**Answer:**
| ngOnChanges | Input Setter |
|-------------|--------------|
| Multiple inputs | Single input |
| Need previous value | Just need new value |
| Compare changes | Simple transformation |

#### Q2: Does ngOnChanges fire for object mutations?
**Answer:** NO! Only for reference changes:
```typescript
// NO trigger
this.user.name = 'Jane';

// YES trigger
this.user = { ...this.user, name: 'Jane' };
```

---

### Scenario-Based Questions

#### Scenario: Reload on ID Change
**Question:** Component has productId input. On change, fetch new product.

**Answer:**
```typescript
ngOnChanges(changes: SimpleChanges) {
    const productIdChange = changes['productId'];
    if (productIdChange && !productIdChange.firstChange) {
        // Don't reload on initial value - ngOnInit handles that
        this.fetchProduct(productIdChange.currentValue);
    }
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((ngOnChanges))
    Timing
      Before ngOnInit
      On input change
    SimpleChanges
      previousValue
      currentValue  
      firstChange
    Best For
      Multiple inputs
      Comparing values
      Complex reactions
```
