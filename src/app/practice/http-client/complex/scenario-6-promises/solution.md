# Scenario 6: Advanced Promise Patterns - Solution

## ✅ Complete Solutions

### Converting Angular Observables to Promises

```typescript
import { lastValueFrom, firstValueFrom } from 'rxjs';

// Modern approach (RxJS 7+)
const users = await lastValueFrom(this.http.get<User[]>('/api/users'));

// ❌ Deprecated (don't use)
const users = await this.http.get<User[]>('/api/users').toPromise();
```

---

## Pattern 1: Promise.all() - Parallel, Fail-Fast

```typescript
async loadDashboard(): Promise<void> {
    this.loading = true;
    const startTime = Date.now();

    try {
        // All three start immediately and run in PARALLEL
        const [users, products, orders] = await Promise.all([
            lastValueFrom(this.http.get<User[]>('/api/users')),
            lastValueFrom(this.http.get<Product[]>('/api/products')),
            lastValueFrom(this.http.get<Order[]>('/api/orders'))
        ]);

        // Only reaches here if ALL succeed
        this.users = users;
        this.products = products;
        this.orders = orders;
        
        console.log(`Loaded in ${Date.now() - startTime}ms`);
    } catch (error) {
        // If ANY fails, we immediately get here
        // Other requests are NOT cancelled, but their results are ignored
        console.error('Dashboard load failed:', error);
    } finally {
        this.loading = false;
    }
}
```

**When to use**: Dashboard loading, app initialization, form validation (all fields must pass)

---

## Pattern 2: Promise.allSettled() - Get All Results

```typescript
async processBatch(items: number[]): Promise<void> {
    const promises = items.map(id => 
        lastValueFrom(this.http.post(`/api/process/${id}`, {}))
    );

    // allSettled NEVER rejects - always returns all results
    const results = await Promise.allSettled(promises);

    // Process each result individually
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Item ${items[index]}: Success`, result.value);
        } else {
            console.log(`Item ${items[index]}: Failed`, result.reason);
        }
    });

    // Count successes and failures
    const successes = results.filter(r => r.status === 'fulfilled').length;
    const failures = results.filter(r => r.status === 'rejected').length;
    
    console.log(`Completed: ${successes} succeeded, ${failures} failed`);
}
```

**When to use**: Batch operations, analytics collection, multi-source data fetching

---

## Pattern 3: Promise.race() - First Response Wins

### Timeout Pattern

```typescript
async fetchWithTimeout<T>(
    url: string, 
    timeoutMs: number = 5000
): Promise<T> {
    const fetchPromise = lastValueFrom(this.http.get<T>(url));
    
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
    });

    // Race between fetch and timeout
    return Promise.race([fetchPromise, timeoutPromise]);
}

// Usage
try {
    const data = await this.fetchWithTimeout('/api/data', 3000);
    console.log('Got data:', data);
} catch (error) {
    if (error.message === 'Request timeout') {
        console.log('Request took too long!');
    }
}
```

### Fastest Server Pattern

```typescript
async fetchFromFastestCDN(): Promise<Data> {
    // Race multiple CDN endpoints - first to respond wins
    return Promise.race([
        lastValueFrom(this.http.get<Data>('https://cdn1.example.com/data')),
        lastValueFrom(this.http.get<Data>('https://cdn2.example.com/data')),
        lastValueFrom(this.http.get<Data>('https://cdn3.example.com/data'))
    ]);
}
```

**When to use**: Timeouts, fastest server selection, connection quality testing

---

## Pattern 4: Sequential Promises - Dependent Operations

```typescript
async checkout(): Promise<void> {
    try {
        // Step 1: Validate Cart
        const cart = await this.validateCart();
        console.log('Cart validated:', cart);

        // Step 2: Check Inventory (needs cart data)
        const inventory = await this.checkInventory(cart.items);
        console.log('Inventory checked:', inventory);

        // Step 3: Process Payment (needs cart total)
        const payment = await this.processPayment(cart.total);
        console.log('Payment processed:', payment);

        // Step 4: Create Order (needs payment confirmation)
        const order = await this.createOrder({
            cart,
            paymentId: payment.id
        });
        console.log('Order created:', order);

        // Step 5: Send Confirmation (needs order details)
        await this.sendConfirmation(order.id);
        console.log('Confirmation sent!');

    } catch (error) {
        // If ANY step fails, we immediately jump here
        // Previous successful steps may need rollback
        console.error('Checkout failed at step:', error);
        await this.rollback();
    }
}
```

**When to use**: Checkout flows, wizards, any operation where steps depend on previous results

---

## 🔑 Quick Reference

| Pattern | Behavior | Use Case |
|---------|----------|----------|
| `Promise.all()` | Parallel, fail-fast | Dashboard load |
| `Promise.allSettled()` | Parallel, all results | Batch processing |
| `Promise.race()` | First to complete | Timeouts |
| `Promise.any()` | First SUCCESS | Fallback sources |
| Sequential `await` | One after another | Dependent steps |

---

## 💡 Pro Tips

1. **Promise.all is for ALL-or-nothing** - Use when you can't render partial data
2. **Promise.allSettled is for best-effort** - Use when partial success is acceptable
3. **Promise.race can reject!** - If the first to complete is a rejection
4. **Promise.any (ES2021)** - Use when you want first SUCCESS (ignores rejections)
5. **In Angular**, always use `lastValueFrom()` not `.toPromise()`
