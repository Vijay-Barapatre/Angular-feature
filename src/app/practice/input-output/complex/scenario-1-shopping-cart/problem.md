# 🟥 Scenario 1: Shopping Cart

**Difficulty:** Advanced | **Time:** 40-50 minutes

---

## 📋 Problem Statement

Build a complete shopping cart system with multiple components: ProductList, ProductCard, Cart, and CartItem. Implement proper Input/Output communication for adding items, updating quantities, and removing items.

---

## 🎯 Scenario

E-commerce application with:
- Product grid displaying available items
- Cart showing selected items with quantities
- Ability to add, update quantity, and remove items

---

## ✅ Requirements

- [ ] `ProductCardComponent` - Display product, emit "add to cart" event
- [ ] `CartComponent` - Display cart items, calculate total
- [ ] `CartItemComponent` - Show item, emit quantity change/remove events
- [ ] Parent manages cart state

---

## 📤 Expected Output

```
[Product Grid]
┌───────┐ ┌───────┐
│ Item1 │ │ Item2 │
│ $10   │ │ $20   │
│[Add]  │ │[Add]  │
└───────┘ └───────┘

[Cart]
- Item1 x 2 = $20  [+][-][🗑️]
- Item2 x 1 = $20  [+][-][🗑️]
─────────────────
Total: $40
```

---

## 💡 Key Patterns

1. Product → Parent: `(addToCart)="onAdd($event)"`
2. Parent → Cart: `[items]="cartItems"`
3. CartItem → Parent: `(quantityChange)` and `(remove)`
