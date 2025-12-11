# Exercise 5: API Chaining - Solution

## ✅ Complete Solution

### Step 1: Define Interfaces

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    userId: number;
    product: string;
    amount: number;
}
```

### Step 2: Implement the Chained Call

```typescript
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

// State variables
user: User | null = null;
orders: Order[] = [];
loading = false;
error = '';

loadUserAndOrders(): void {
    this.loading = true;
    this.error = '';
    this.user = null;
    this.orders = [];

    // Step 1: Start with fetching the user
    this.http.get<User>(`/api/users/${this.selectedUserId}`).pipe(
        // Step 2: Use switchMap to chain to orders request
        // switchMap receives the user and returns a NEW Observable
        switchMap(user => {
            // Save the user (we need it for display)
            this.user = user;
            
            // Return the orders Observable - switchMap subscribes to it
            return this.http.get<Order[]>(`/api/users/${user.id}/orders`);
        }),
        
        // Handle any errors in the entire chain
        catchError(err => {
            this.error = 'Failed to load: ' + err.message;
            return of([]); // Return empty array to continue
        })
    ).subscribe({
        next: orders => {
            // This receives the INNER Observable's result (orders)
            this.orders = orders;
        },
        complete: () => {
            this.loading = false;
        }
    });
}
```

## 🔑 Key Points

### Why switchMap?

```typescript
// ❌ BAD: Nested subscribes (callback hell)
this.http.get<User>(url1).subscribe(user => {
    this.http.get<Order[]>(url2).subscribe(orders => {
        // Hard to manage, error handling is messy
    });
});

// ✅ GOOD: switchMap flattens the Observables
this.http.get<User>(url1).pipe(
    switchMap(user => this.http.get<Order[]>(url2))
).subscribe(orders => {
    // Clean, single subscription
});
```

### Error Handling in Chain

```typescript
// catchError at the end handles errors from ANY step
.pipe(
    switchMap(user => this.fetchOrders(user.id)),
    catchError(err => {
        // This catches errors from BOTH fetchUser AND fetchOrders
        console.error('Chain failed:', err);
        return of([]); // Provide fallback
    })
)
```

### Saving Intermediate Results

```typescript
// Use tap() to save values without affecting the stream
.pipe(
    tap(user => this.user = user),  // Save user
    switchMap(user => this.fetchOrders(user.id))
)
```

## 🎓 When to Use Each Operator

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `switchMap` | Cancels previous | Search autocomplete |
| `concatMap` | Queues in order | Form submissions |
| `mergeMap` | Parallel, no order | Bulk operations |
| `exhaustMap` | Ignores while busy | Prevent double-click |

## 📝 Complete Working Example

```typescript
@Component({...})
export class UserOrdersComponent {
    private http = inject(HttpClient);
    
    selectedUserId = 1;
    user: User | null = null;
    orders: Order[] = [];
    loading = false;

    loadData(): void {
        this.loading = true;
        
        this.http.get<User>(`/api/users/${this.selectedUserId}`).pipe(
            tap(user => this.user = user),
            switchMap(user => 
                this.http.get<Order[]>(`/api/users/${user.id}/orders`)
            ),
            catchError(err => {
                console.error(err);
                return of([]);
            }),
            finalize(() => this.loading = false)
        ).subscribe(orders => this.orders = orders);
    }
}
```
