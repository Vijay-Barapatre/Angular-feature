# 📡 Use Case 1: Basic Signals

> **💡 Lightbulb Moment**: Signals are reactive primitives that notify consumers when their value changes - no subscriptions needed!

---

## 1. 🔍 What are Signals?

A wrapper around a value that notifies interested consumers when that value changes.

```typescript
import { signal } from '@angular/core';

// Create a signal
const count = signal(0);

// Read value
console.log(count());  // 0

// Update value
count.set(5);
count.update(c => c + 1);
```

---

## 2. 🚀 Signals vs Observables

| Aspect | Signal | Observable |
|--------|--------|------------|
| Value access | Synchronous | Async subscription |
| Syntax | `signal()` to read | `.subscribe()` |
| Memory | No cleanup needed | Must unsubscribe |
| Learning curve | Simple | Complex |

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: What problem do Signals solve?
**Answer:** Simpler reactivity without RxJS complexity:
- No subscriptions to manage
- Synchronous value access
- Automatic change detection
- Easier to learn

#### Q2: set() vs update() - when to use which?
**Answer:**
```typescript
count.set(10);           // Replace with new value
count.update(c => c + 1); // Transform based on current value
```

#### Q3: Do Signals replace Observables?
**Answer:** No! They complement each other:
- Signals: Synchronous, local state
- Observables: Async, streams, HTTP

---

### Scenario-Based Questions

#### Scenario: Counter Component
**Question:** Build a counter with Signals.

**Answer:**
```typescript
@Component({
    template: `
        <button (click)="decrement()">-</button>
        <span>{{ count() }}</span>
        <button (click)="increment()">+</button>
    `
})
export class CounterComponent {
    count = signal(0);
    
    increment() { this.count.update(c => c + 1); }
    decrement() { this.count.update(c => c - 1); }
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Signals))
    Creation
      signal function
      Initial value
    Methods
      set
      update
      mutate
    Reading
      Call as function
      In template
    Benefits
      Simple
      Sync
      No cleanup
```
