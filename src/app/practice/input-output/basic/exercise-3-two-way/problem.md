# 🟦 Exercise 3: Two-Way Binding

**Difficulty:** Beginner-Intermediate | **Time:** 20-25 minutes

---

## 📋 Problem Statement

Create a custom `CounterComponent` that implements two-way binding using the "banana-in-a-box" syntax `[(count)]`. The parent should be able to both set and receive the counter value.

### Why This Matters
Two-way binding combines Input and Output into a single convenient syntax. This pattern is used extensively in form controls and custom components that need bidirectional data flow.

---

## 🎯 Scenario

You're building a shopping cart where quantity selectors need to sync with the parent's cart state. When the user changes quantity in the counter, the cart updates. When the cart resets, all counters reset too.

---

## ✅ Requirements

- [ ] Create `CounterComponent` with:
  - `@Input() count` - Receives value from parent
  - `@Output() countChange` - Emits when value changes
  - Increment and decrement buttons
- [ ] Parent uses `[(count)]="quantity"` syntax
- [ ] Changes sync bidirectionally

---

## 📤 Expected Output

```
Parent Quantity: 5

[Counter Component]
   [ - ]  5  [ + ]

Click [+] → Parent shows: 6
Parent sets value to 1 → Counter shows: 1
```

---

## 💡 Hints

1. Two-way binding requires: `@Input() x` + `@Output() xChange`
2. The output name MUST be `{inputName}Change`
3. Usage: `[(count)]` equals `[count]="val" (countChange)="val=$event"`
