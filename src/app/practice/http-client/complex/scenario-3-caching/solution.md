# Scenario 3: HTTP Caching - Solution

## ✅ Complete Caching Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    observable?: Observable<T>;
}

@Injectable({ providedIn: 'root' })
export class CachingService {
    private cache = new Map<string, CacheEntry<any>>();
    private DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

    constructor(private http: HttpClient) {}

    /**
     * GET with caching
     */
    get<T>(url: string, ttl: number = this.DEFAULT_TTL): Observable<T> {
        const cached = this.cache.get(url);
        
        // Check if cache is valid
        if (cached && !this.isExpired(cached, ttl)) {
            console.log(`[Cache HIT] ${url}`);
            return of(cached.data);
        }

        // Cache miss - fetch from network
        console.log(`[Cache MISS] ${url}`);
        
        const request$ = this.http.get<T>(url).pipe(
            tap(data => {
                this.cache.set(url, {
                    data,
                    timestamp: Date.now()
                });
            }),
            shareReplay(1)
        );

        return request$;
    }

    /**
     * Clear specific cache entry
     */
    invalidate(url: string): void {
        this.cache.delete(url);
        console.log(`[Cache INVALIDATED] ${url}`);
    }

    /**
     * Clear all cache
     */
    clearAll(): void {
        this.cache.clear();
        console.log('[Cache CLEARED]');
    }

    private isExpired(entry: CacheEntry<any>, ttl: number): boolean {
        return Date.now() - entry.timestamp > ttl;
    }
}
```

## 🔑 Using shareReplay for Observable Caching

```typescript
// Alternative: Cache the Observable itself
@Injectable({ providedIn: 'root' })
export class ProductService {
    private products$: Observable<Product[]> | null = null;

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        if (!this.products$) {
            this.products$ = this.http.get<Product[]>('/api/products').pipe(
                shareReplay(1) // Cache last emission
            );
        }
        return this.products$;
    }

    invalidateCache(): void {
        this.products$ = null;
    }
}
```

## 🎯 Key Concepts

### shareReplay Explained

```typescript
// Without shareReplay - EACH subscriber makes a new request
const products$ = this.http.get('/api/products');
products$.subscribe();  // Request 1
products$.subscribe();  // Request 2 (duplicate!)

// With shareReplay - ONE request, shared result
const products$ = this.http.get('/api/products').pipe(
    shareReplay(1)
);
products$.subscribe();  // Request 1
products$.subscribe();  // Uses cached result ✅
```

### Cache with TTL

```typescript
interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

get<T>(url: string, ttlMs: number = 60000): Observable<T> {
    const cached = this.cache.get(url);
    
    if (cached && Date.now() < cached.expiresAt) {
        return of(cached.data); // Return cached
    }
    
    return this.http.get<T>(url).pipe(
        tap(data => {
            this.cache.set(url, {
                data,
                expiresAt: Date.now() + ttlMs
            });
        })
    );
}
```

### Cache Invalidation on Mutations

```typescript
// Service
createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products', product).pipe(
        tap(() => {
            // Invalidate products cache after creation
            this.invalidate('/api/products');
        })
    );
}

updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`/api/products/${id}`, product).pipe(
        tap(() => {
            this.invalidate('/api/products');
            this.invalidate(`/api/products/${id}`);
        })
    );
}
```

## 📝 Usage in Component

```typescript
@Component({...})
export class ProductListComponent {
    products$ = this.cachingService.get<Product[]>('/api/products');
    
    constructor(private cachingService: CachingService) {}
    
    refreshData(): void {
        this.cachingService.invalidate('/api/products');
        this.products$ = this.cachingService.get<Product[]>('/api/products');
    }
}
```

## 💡 Pro Tips

1. **Don't cache user-specific data** without user ID in cache key
2. **Invalidate on mutations** (POST, PUT, DELETE)
3. **Use shorter TTL** for frequently changing data
4. **Consider IndexedDB** for persistent caching
5. **Implement cache size limits** to prevent memory issues
