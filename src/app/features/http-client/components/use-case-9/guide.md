# Use Case 9: Advanced Promise Patterns

## 🎯 What This Covers

This use case provides a comprehensive guide to Promise patterns in JavaScript/TypeScript, from legacy approaches to modern best practices.

## 📚 Patterns Covered

### 1. Old vs New Pattern

**Old Pattern (Legacy):**
```javascript
// Callback hell / Promise chains
fetchData()
    .then(data => process(data))
    .then(result => display(result))
    .catch(err => handleError(err))
    .finally(() => cleanup());
```

**New Pattern (Modern):**
```javascript
async function loadData() {
    try {
        const data = await fetchData();
        const result = await process(data);
        display(result);
    } catch (err) {
        handleError(err);
    } finally {
        cleanup();
    }
}
```

### 2. Promise.all() - Parallel with Fail-Fast

```javascript
// All must succeed, or entire operation fails
const [users, products, orders] = await Promise.all([
    fetchUsers(),      // 300ms
    fetchProducts(),   // 500ms  
    fetchOrders()      // 400ms
]);
// Total time: ~500ms (parallel, not 1200ms sequential)

// If ANY fails → entire Promise.all rejects immediately
```

**When to use:**
- Dashboard loading (need ALL data)
- Form validation (all fields must pass)
- Initial app bootstrap

### 3. Promise.allSettled() - Wait for All Results

```javascript
const results = await Promise.allSettled([
    fetchFromAPI1(),  // might fail
    fetchFromAPI2(),  // might succeed
    fetchFromAPI3()   // might timeout
]);

// Always returns array with status
results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
    } else {
        console.log('Failed:', result.reason);
    }
});
```

**When to use:**
- Batch operations (don't stop on first failure)
- Multiple API sources (partial data is OK)
- Logging/analytics (want all results regardless)

### 4. Promise.race() - First Response Wins

```javascript
// Timeout pattern
const result = await Promise.race([
    fetchData(),
    new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
    )
]);

// Fastest server wins
const data = await Promise.race([
    fetchFromServer1(),  // 100ms - WINS
    fetchFromServer2()   // 500ms - abandoned
]);
```

**When to use:**
- Implementing timeouts
- Fastest CDN/server selection
- Connection quality testing

### 5. Promise.any() (ES2021)

```javascript
// First SUCCESS wins (ignores rejections)
const data = await Promise.any([
    fetchFromPrimary(),   // might fail
    fetchFromBackup(),    // succeeds first
    fetchFromCDN()        // might be slow
]);
// Returns first successful result
```

## ⚠️ Angular-Specific Notes

Angular's HttpClient returns **Observables**, not Promises. To convert:

```typescript
import { lastValueFrom } from 'rxjs';

// ✅ Modern way (RxJS 7+)
const users = await lastValueFrom(this.http.get('/api/users'));

// ❌ Deprecated (don't use)
const users = await this.http.get('/api/users').toPromise();
```

## 🔑 Key Takeaways

| Method | Behavior | Use Case |
|--------|----------|----------|
| `Promise.all()` | Fail-fast, all or nothing | Dashboard loading |
| `Promise.allSettled()` | Wait for all, get all results | Batch operations |
| `Promise.race()` | First to complete wins | Timeouts |
| `Promise.any()` | First success wins | Fallback sources |

---

## 🏎️ Race Track Analogy (Easy to Remember!)

Think of Promise patterns like **different types of races**:

| Method | Race Analogy | Memory Trick |
|--------|-------------|--------------|
| **Promise.all()** | 🏃‍♂️ **Team Relay**: ALL runners must finish for the team to win. One falls? Team loses! | **"All or nothing"** |
| **Promise.allSettled()** | 🎽 **Marathon Results**: Record everyone's time - finished OR dropped out | **"Everyone's result"** |
| **Promise.race()** | 🏁 **Sprint Race**: First to cross the line WINS (even if they trip!) | **"First one wins"** |
| **Promise.any()** | 🏆 **First SUCCESSFUL finish**: First to finish WITHOUT falling wins | **"First success wins"** |

### 📖 Story to Remember:

> 🏎️ **The Racing Championship**
>
> **Promise.all() = Relay Race:**
> ```
> Team of 3 runners: A, B, C
> A finishes ✅ → B finishes ✅ → C trips ❌
> Result: TEAM LOSES! (one failure = all fail)
> ```
>
> **Promise.allSettled() = Record Everyone:**
> ```
> "Runner A: 10.5s ✅"
> "Runner B: DNF (injury) ❌"
> "Runner C: 11.2s ✅"
> Result: We have ALL results regardless!
> ```
>
> **Promise.race() = First to Finish:**
> ```
> 3 runners start...
> Runner B crosses first! (even if exhausted)
> Result: B WINS, ignore others
> ```
>
> **Promise.any() = First SUCCESSFUL Finish:**
> ```
> Runner A trips ❌ (ignored)
> Runner B finishes ✅ (WINNER!)
> Runner C still running (ignored)
> Result: B wins (first success)
> ```

### 🎯 Quick Decision Guide:
```
"Need ALL data?"           → Promise.all()
"Want ALL results (ok/fail)?" → Promise.allSettled()
"Just need the fastest?"   → Promise.race()
"Need fastest SUCCESS?"    → Promise.any()
```

---

## 🎤 Interview Questions

### Basic Questions

#### Q1: What is the difference between Promise and Observable?
**Answer:**
| Feature | Promise | Observable |
|---------|---------|------------|
| Values | Single value | Multiple values over time |
| Execution | Eager (starts immediately) | Lazy (needs subscription) |
| Cancellation | Cannot cancel | Can unsubscribe |
| Operators | Limited (.then, .catch) | Rich (map, filter, switchMap) |

#### Q2: Why is `toPromise()` deprecated in RxJS 7+?
**Answer:**
- `toPromise()` was ambiguous about which value to return
- `lastValueFrom()` explicitly returns the LAST emitted value
- `firstValueFrom()` explicitly returns the FIRST emitted value
- Better error handling when Observable completes without emitting

#### Q3: What happens if one Promise in `Promise.all()` rejects?
**Answer:**
- The entire `Promise.all()` rejects immediately
- Other pending promises continue executing (but their results are ignored)
- Use `Promise.allSettled()` if you need all results regardless of failures

#### Q4: When would you use `Promise.race()`?
**Answer:**
- Implementing request timeouts
- Selecting the fastest server/CDN
- Connection quality testing
- Canceling slow operations

---

### Scenario-Based Questions

#### Scenario 1: Dashboard Loading
**Question:** You need to load users, products, and orders for a dashboard. All three must load successfully, or show an error. How would you implement this?

**Answer:**
```typescript
async loadDashboard() {
    try {
        const [users, products, orders] = await Promise.all([
            lastValueFrom(this.api.getUsers()),
            lastValueFrom(this.api.getProducts()),
            lastValueFrom(this.api.getOrders())
        ]);
        this.displayDashboard(users, products, orders);
    } catch (error) {
        this.showError('Failed to load dashboard');
    }
}
```
**Why Promise.all?** All data is required; partial data is useless.

---

#### Scenario 2: Multiple API Sources
**Question:** You're fetching data from 3 different APIs. Some might fail, but you want to show whatever data is available. How do you handle this?

**Answer:**
```typescript
async loadFromMultipleSources() {
    const results = await Promise.allSettled([
        lastValueFrom(this.api1.getData()),
        lastValueFrom(this.api2.getData()),
        lastValueFrom(this.api3.getData())
    ]);
    
    const successfulData = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);
    
    const failures = results.filter(r => r.status === 'rejected');
    
    this.displayData(successfulData);
    if (failures.length) {
        this.showWarning(`${failures.length} sources failed`);
    }
}
```
**Why Promise.allSettled?** Partial data is acceptable; don't lose good data due to one failure.

---

#### Scenario 3: Request Timeout
**Question:** Your API sometimes takes too long. Implement a 5-second timeout that rejects if the request is too slow.

**Answer:**
```typescript
async fetchWithTimeout<T>(request$: Observable<T>, timeoutMs = 5000): Promise<T> {
    return Promise.race([
        lastValueFrom(request$),
        new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
        )
    ]);
}

// Usage
try {
    const data = await this.fetchWithTimeout(this.api.getData(), 5000);
} catch (error) {
    if (error.message === 'Request timeout') {
        this.showError('Request took too long');
    }
}
```

---

#### Scenario 4: Checkout Flow
**Question:** In an e-commerce checkout, you need to: 1) Reserve inventory, 2) Process payment, 3) Send confirmation. These MUST happen in order. If any fails, stop and rollback. How?

**Answer:**
```typescript
async processCheckout(order: Order) {
    try {
        // Step 1: Reserve inventory
        const reservation = await lastValueFrom(
            this.api.reserveInventory(order.items)
        );
        
        // Step 2: Process payment (only if inventory reserved)
        const payment = await lastValueFrom(
            this.api.processPayment(order.payment, reservation.id)
        );
        
        // Step 3: Confirm order (only if payment succeeded)
        const confirmation = await lastValueFrom(
            this.api.confirmOrder(order.id, payment.transactionId)
        );
        
        return confirmation;
    } catch (error) {
        // Rollback: Release inventory if reserved
        if (reservation?.id) {
            await lastValueFrom(this.api.releaseInventory(reservation.id));
        }
        throw error;
    }
}
```
**Why sequential await?** Each step depends on the previous step's result.

---

#### Scenario 5: Fastest Server Selection
**Question:** Your app can fetch from 3 mirror servers. You want to use whichever responds first. How?

**Answer:**
```typescript
async getFastestResponse() {
    return Promise.race([
        this.fetchFromServer('https://server1.example.com/data'),
        this.fetchFromServer('https://server2.example.com/data'),
        this.fetchFromServer('https://server3.example.com/data')
    ]);
}

// Note: Consider Promise.any() if you want first SUCCESS (ignoring failures)
async getFirstSuccessfulResponse() {
    return Promise.any([
        this.fetchFromServer('https://server1.example.com/data'),
        this.fetchFromServer('https://server2.example.com/data'),
        this.fetchFromServer('https://server3.example.com/data')
    ]);
}
```

---

### Advanced Questions

#### Q5: What's the difference between `Promise.race()` and `Promise.any()`?
**Answer:**
| Method | First to... | If all fail... |
|--------|-------------|----------------|
| `race()` | Settle (resolve OR reject) | Returns first rejection |
| `any()` | Resolve (success only) | Returns AggregateError |

```typescript
// Promise.race - first rejection wins
await Promise.race([
    Promise.reject('Error 1'),  // ← THIS WINS (first to settle)
    Promise.resolve('Success')
]); // Rejects with 'Error 1'

// Promise.any - first success wins
await Promise.any([
    Promise.reject('Error 1'),  // Ignored
    Promise.resolve('Success')  // ← THIS WINS (first success)
]); // Resolves with 'Success'
```

#### Q6: How would you implement a retry with Promise?
**Answer:**
```typescript
async function fetchWithRetry<T>(
    fn: () => Promise<T>, 
    retries = 3,
    delay = 1000
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(fn, retries - 1, delay * 2); // Exponential backoff
    }
}
```

#### Q7: In a real Angular app, should you prefer Observables or Promises for HTTP?
**Answer:**
- **Use Observables** for:
  - Type-ahead search (need `switchMap` cancellation)
  - Polling/real-time updates
  - Complex transformations
  - When you need operators like `retry`, `debounceTime`

- **Use Promises (async/await)** for:
  - Simple one-time requests
  - Sequential operations where order matters
  - When code readability is priority
  - Integration with Promise-based libraries

---

## 💡 Pro Tips

1. **Don't mix patterns unnecessarily** - Pick Observable OR Promise and stick with it
2. **Handle errors at every await** - Unhandled rejections crash your app
3. **Remember: Promise.race doesn't cancel** - Other promises still execute
4. **Use Promise.allSettled for batch operations** - Don't lose good data
5. **Convert to Promise at the last moment** - Keep RxJS benefits until you need async/await

