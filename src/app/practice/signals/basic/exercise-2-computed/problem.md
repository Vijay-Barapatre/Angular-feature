# 🟦 Exercise 2: Computed Signals

**Difficulty:** Beginner | **Time:** 15 minutes

## 📋 Problem Statement

Create derived values that automatically update when source signals change.

## ✅ Requirements

- [ ] Create `price` and `quantity` signals
- [ ] Create `total` computed signal = price × quantity
- [ ] Display all values; total updates automatically

## 💡 Hints

```typescript
price = signal(10);
quantity = signal(2);
total = computed(() => this.price() * this.quantity());
```
