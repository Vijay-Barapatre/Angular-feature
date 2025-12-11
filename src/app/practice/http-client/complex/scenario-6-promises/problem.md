# Scenario 6: Advanced Promise Patterns

## 🎯 Problem Statement

You're building a dashboard that needs to handle multiple API calls using different **Promise patterns**. Your task is to implement:

1. **Promise.all()** - Load multiple resources (fail if ANY fails)
2. **Promise.allSettled()** - Load resources (partial success OK)
3. **Promise.race()** - Implement timeout pattern
4. **Sequential Promises** - Checkout flow with dependencies

## 📋 Requirements

### Functional Requirements

#### Pattern 1: Promise.all (Dashboard Load)
- Load Users, Products, and Orders in parallel
- Display all data only when ALL succeed
- Show error immediately if ANY fails

#### Pattern 2: Promise.allSettled (Batch Processing)
- Process multiple items
- Show result for EACH item (success or failure)
- Don't stop on first failure

#### Pattern 3: Promise.race (Timeout)
- Race between API call and timeout
- Show which one "won"
- Configurable timeout duration

#### Pattern 4: Sequential (Checkout)
- 5 steps that depend on each other
- Each step waits for previous
- Stop on first failure

### Technical Requirements
- Use `lastValueFrom()` to convert Observables to Promises
- Handle errors appropriately for each pattern
- Display loading and result states

## 🔗 Pattern Comparison

```
Promise.all([A, B, C])
├─ All succeed → Returns [resultA, resultB, resultC]
└─ Any fails → REJECTS IMMEDIATELY (fail-fast)

Promise.allSettled([A, B, C])
├─ Wait for ALL to complete
└─ Returns [
     { status: 'fulfilled', value: resultA },
     { status: 'rejected', reason: errorB },
     { status: 'fulfilled', value: resultC }
   ]

Promise.race([A, B])
└─ Returns result of FIRST to complete (success or failure)

Sequential: await A; await B; await C;
└─ Runs in order, each waits for previous
```

## 💡 Hints

1. `Promise.all` - Use for dashboard loading where you need ALL data
2. `Promise.allSettled` - Use for batch operations where partial success is OK
3. `Promise.race` - Use for timeouts or fallback sources
4. Sequential - Use when steps depend on each other

## ⚠️ Common Mistakes

- Using `Promise.all` when partial success is acceptable
- Forgetting that `Promise.race` can reject (if first to complete fails)
- Not handling the `reason` property in rejected `allSettled` results
- Using parallel when sequential order matters

## 📊 Expected Behavior

### Promise.all Success:
```
┌────────────────────────────────────┐
│ ✅ All APIs Succeeded!              │
│ Users: 3 | Products: 5 | Orders: 2 │
│ Total time: 512ms (parallel!)      │
└────────────────────────────────────┘
```

### Promise.all Failure:
```
┌────────────────────────────────────┐
│ ❌ Failed at 203ms                  │
│ Error: Orders API failed            │
│ (Other requests were abandoned)    │
└────────────────────────────────────┘
```

### Promise.allSettled:
```
┌────────────────────────────────────┐
│ Item 1: ✅ Completed in 302ms       │
│ Item 2: ❌ Error: Connection failed │
│ Item 3: ✅ Completed in 415ms       │
└────────────────────────────────────┘
```
