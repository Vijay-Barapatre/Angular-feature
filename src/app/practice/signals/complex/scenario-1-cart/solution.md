# 🟥 Scenario 1: Shopping Cart - Solution

```mermaid
flowchart TB
    cart["cart = signal([])"] --> total["total = computed()"]
    total --> display["${{ total() }}"]
```

```typescript
cart = signal<CartItem[]>([]);
total = computed(() => 
  this.cart().reduce((sum, item) => sum + item.price * item.qty, 0)
);

addToCart(product: Product): void {
  this.cart.update(items => [...items, { ...product, qty: 1 }]);
}
```
