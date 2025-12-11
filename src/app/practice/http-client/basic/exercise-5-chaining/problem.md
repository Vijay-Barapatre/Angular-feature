# Exercise 5: API Chaining with switchMap

## 🎯 Problem Statement

You are building an order management system. When a user selects a customer, you need to:

1. **Fetch customer details** by their ID
2. **Then fetch their orders** using the customer data
3. **Display both** customer info and their orders

The second API call **depends on** the first call's result.

## 📋 Requirements

### Functional Requirements
- Provide a dropdown to select a customer (1, 2, or 3)
- Click button to load customer AND their orders
- Show loading state during the process
- Display customer info card
- Display list of orders for that customer

### Technical Requirements
- Use `switchMap` or `concatMap` to chain Observables
- Handle errors in the chain
- Show which step of the chain is currently running

## 🔗 API Flow

```
Step 1: GET /api/users/{id}
        ↓
        Returns: { id, name, email }
        ↓
Step 2: GET /api/users/{id}/orders
        ↓
        Returns: [{ id, product, amount }]
```

## 💡 Hints

1. `switchMap` receives the result of the outer Observable
2. It returns a NEW Observable (the inner one)
3. The subscription only gets the inner Observable's result
4. Use `tap()` if you need to save intermediate results

## ⚠️ Common Mistakes

- Nested subscribes (callback hell) - use switchMap instead!
- Forgetting to return the inner Observable in switchMap
- Not handling errors in the chain
- Using `map` instead of `switchMap` (map doesn't flatten)

## 📊 Expected Behavior

```
User selects: "User 1 (John)"
Clicks: "Load User & Orders"

Step 1: ⏳ Fetching user...
Step 2: ⏳ Fetching orders...
Step 3: ✅ Display Results

┌─────────────────────────┐
│ 👤 User Info            │
│ Name: John Doe          │
│ Email: john@example.com │
├─────────────────────────┤
│ 📦 Orders (2)           │
│ Laptop - $1299          │
│ Mouse - $49             │
└─────────────────────────┘
```

## 🧠 Key Concept

```
switchMap vs concatMap vs mergeMap:

switchMap  → Cancels previous inner Observable (search)
concatMap  → Queues and waits (ordered operations)
mergeMap   → Runs all in parallel (fire and forget)
```
