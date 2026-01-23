# 🧮 Computed + Async

> **💡 Lightbulb Moment**: `toSignal()` + `computed()` = reactive data pipeline!


## 📋 Table of Contents
- [Pattern](#pattern)
- [Data Flow](#data-flow)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
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

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  COMPUTED + ASYNC: REACTIVE DATA PIPELINE                   │
│                                                             │
│   DATA FLOW:                                                │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ Observable (HTTP) ──→ toSignal() ──→ Signal           │ │
│   │           ↓                              ↓             │ │
│   │     Raw data                      computed()          │ │
│   │                                          ↓             │ │
│   │                                    Template            │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   EXAMPLE:                                                  │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ // Async → Signal                                     │ │
│   │ products = toSignal(http.get(...), { initialValue: []});│
│   │                                                       │ │
│   │ // Derived values                                     │ │
│   │ cart = signal<Product[]>([]);                         │ │
│   │ subtotal = computed(() => cart().reduce(...));        │ │
│   │ total = computed(() => subtotal() + tax());           │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   computed() auto-updates when any dependency changes!     │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: toSignal() converts async to signal. computed() chains for derived values. Entire pipeline is reactive!

