# Exercise 6: Parallel API Calls with forkJoin

## 🎯 Problem Statement

You are building a dashboard that displays data from **3 different APIs**:
- Users API (takes ~800ms)
- Products API (takes ~600ms)  
- Statistics API (takes ~1000ms)

Your task is to load ALL data **in parallel** to minimize total loading time.

## 📋 Requirements

### Functional Requirements
- Single button to load entire dashboard
- Show loading state for each API independently
- Display all data once ALL APIs complete
- Show timing comparison (parallel vs sequential)

### Technical Requirements
- Use `forkJoin` to run requests in parallel
- All requests must complete before showing data
- Handle the case where one request fails
- Display total load time

## 🔗 Performance Comparison

```
Sequential Loading:
├─ Users API ────────────────────────> (800ms)
│                    └─ Products API ─────────────> (600ms)  
│                                           └─ Stats API ──────────> (1000ms)
└─ Total: 2400ms ❌

Parallel Loading (forkJoin):
├─ Users API ────────────────────────> (800ms)
├─ Products API ─────────────> (600ms)
├─ Stats API ─────────────────────────────> (1000ms)
└─ Total: ~1000ms ✅ (just the slowest one!)
```

## 💡 Hints

1. `forkJoin` takes an object or array of Observables
2. It waits for ALL to complete before emitting
3. Results are in the same order/shape as input
4. If ANY Observable fails, forkJoin fails entirely

## ⚠️ Common Mistakes

- Using `combineLatest` instead of `forkJoin` (different behavior)
- Forgetting that forkJoin fails if ANY request fails
- Not using `catchError` on individual requests for fault tolerance
- Confusing parallel (forkJoin) with sequential (concat)

## 📊 Expected Output

```
┌─────────────────────────────────────────────┐
│ 📊 Dashboard Load Time Comparison           │
├─────────────────────────────────────────────┤
│ 🚀 Parallel (forkJoin): 1050ms             │
│ 🐌 Sequential (await):  2400ms             │
│ ✅ Saved: 1350ms (56% faster!)             │
└─────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┐
│ 👥 Users (3) │ 📦 Products  │ 📈 Stats     │
├──────────────┼──────────────┼──────────────┤
│ John Doe     │ Laptop $1299 │ Sales: $45k  │
│ Jane Smith   │ Monitor $399 │ Users: 1234  │
│ Bob Wilson   │ Keyboard $149│ Orders: 56   │
└──────────────┴──────────────┴──────────────┘
```

## 🧠 Key Concept

```
forkJoin vs combineLatest:

forkJoin      → Waits for ALL to COMPLETE, emits once
combineLatest → Emits on EVERY change after all emit once

Use forkJoin for HTTP requests (complete once)
Use combineLatest for streams (form inputs, subjects)
```
