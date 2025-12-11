# Exercise 6: Parallel API Calls - Solution

## ✅ Complete Solution

### Step 1: Define Interfaces

```typescript
interface DashboardData {
    users: User[];
    products: Product[];
    stats: Statistics;
}

interface User {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Statistics {
    totalSales: number;
    activeUsers: number;
    pendingOrders: number;
}
```

### Step 2: Implement Parallel Loading with forkJoin

```typescript
import { forkJoin, catchError, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

// State
dashboard: DashboardData | null = null;
loading = false;
loadTime = 0;

loadDashboard(): void {
    this.loading = true;
    this.dashboard = null;
    const startTime = Date.now();

    // forkJoin runs ALL Observables in PARALLEL
    // Waits for ALL to complete before emitting
    forkJoin({
        users: this.http.get<User[]>('/api/users'),
        products: this.http.get<Product[]>('/api/products'),
        stats: this.http.get<Statistics>('/api/stats')
    }).pipe(
        finalize(() => {
            this.loading = false;
            this.loadTime = Date.now() - startTime;
        })
    ).subscribe({
        next: result => {
            // result = { users: [...], products: [...], stats: {...} }
            this.dashboard = result;
        },
        error: err => {
            console.error('Dashboard load failed:', err);
            // If ANY request fails, we get here
        }
    });
}
```

## 🔑 Key Points

### forkJoin with Object vs Array

```typescript
// Object syntax (recommended - named results)
forkJoin({
    users: this.fetchUsers(),
    products: this.fetchProducts(),
    stats: this.fetchStats()
}).subscribe(result => {
    console.log(result.users);     // Typed!
    console.log(result.products);  // Typed!
});

// Array syntax (indexed results)
forkJoin([
    this.fetchUsers(),
    this.fetchProducts(),
    this.fetchStats()
]).subscribe(([users, products, stats]) => {
    // Destructure to get values
});
```

### Handling Individual Failures

```typescript
// If you want partial data even when some fail:
forkJoin({
    users: this.http.get<User[]>('/api/users').pipe(
        catchError(() => of([]))  // Return empty array on failure
    ),
    products: this.http.get<Product[]>('/api/products').pipe(
        catchError(() => of([]))  // Return empty array on failure
    ),
    stats: this.http.get<Statistics>('/api/stats').pipe(
        catchError(() => of({ totalSales: 0, activeUsers: 0, pendingOrders: 0 }))
    )
}).subscribe(result => {
    // Always succeeds, but some arrays might be empty
});
```

### Performance Comparison Code

```typescript
// Parallel (fast)
async loadParallel(): Promise<void> {
    const start = Date.now();
    
    const result = await lastValueFrom(forkJoin({
        users: this.fetchUsers(),     // 800ms
        products: this.fetchProducts(), // 600ms
        stats: this.fetchStats()       // 1000ms
    }));
    
    console.log(`Parallel: ${Date.now() - start}ms`); // ~1000ms
}

// Sequential (slow)
async loadSequential(): Promise<void> {
    const start = Date.now();
    
    const users = await lastValueFrom(this.fetchUsers());     // 800ms
    const products = await lastValueFrom(this.fetchProducts()); // +600ms
    const stats = await lastValueFrom(this.fetchStats());       // +1000ms
    
    console.log(`Sequential: ${Date.now() - start}ms`); // ~2400ms
}
```

## 🎓 When to Use What

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `forkJoin` | Wait for all, emit once | Dashboard loading, init |
| `combineLatest` | Emit on any change | Form validation, filters |
| `merge` | Emit each separately | Multiple event sources |
| `concat` | Sequential, in order | Ordered operations |

## 📝 Complete Working Example

```typescript
@Component({
    selector: 'app-dashboard',
    template: `
        <button (click)="loadDashboard()" [disabled]="loading">
            {{ loading ? 'Loading...' : 'Load Dashboard' }}
        </button>
        
        <div *ngIf="dashboard" class="dashboard">
            <div class="card">
                <h3>Users ({{ dashboard.users.length }})</h3>
                <ul>
                    <li *ngFor="let user of dashboard.users">
                        {{ user.name }}
                    </li>
                </ul>
            </div>
            <!-- Similar cards for products and stats -->
        </div>
        
        <p *ngIf="loadTime">Loaded in {{ loadTime }}ms</p>
    `
})
export class DashboardComponent {
    private http = inject(HttpClient);
    
    dashboard: DashboardData | null = null;
    loading = false;
    loadTime = 0;

    loadDashboard(): void {
        this.loading = true;
        const startTime = Date.now();

        forkJoin({
            users: this.http.get<User[]>('/api/users'),
            products: this.http.get<Product[]>('/api/products'),
            stats: this.http.get<Statistics>('/api/stats')
        }).pipe(
            finalize(() => {
                this.loading = false;
                this.loadTime = Date.now() - startTime;
            })
        ).subscribe(result => this.dashboard = result);
    }
}
```

## 💡 Pro Tips

1. **Always use `finalize`** for cleanup (it runs on complete OR error)
2. **Add `catchError` to individual requests** if partial data is acceptable
3. **Use object syntax** for better readability and TypeScript support
4. **Don't forget**: forkJoin only works with Observables that complete!
