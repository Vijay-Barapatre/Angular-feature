# 🧮 Use Case 4: Computed + Async

> **💡 Lightbulb Moment**: `toSignal()` + `computed()` = reactive data pipeline!

---

## Pattern

```typescript
// Async → Signal
products = toSignal(this.http.get(...), { initialValue: [] });

// Derived values
cart = signal<Product[]>([]);
subtotal = computed(() => this.cart().reduce(...));
total = computed(() => this.subtotal() + this.tax());
```

---

## Data Flow

Observable → toSignal() → Signal → computed() → Template
