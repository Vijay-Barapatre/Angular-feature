# Use Case 8: Async Guards

## 🎯 What are Async Guards?

Guards can return `Observable<boolean>` or `Promise<boolean>` instead of just a boolean. This allows guards to make API calls and wait for async operations.

## 🔄 Return Types

| Return Type | Use Case |
|-------------|----------|
| `boolean` | Sync checks (local state) |
| `UrlTree` | Redirect on failure |
| `Observable<boolean>` | API calls, async checks |
| `Promise<boolean>` | Async/await patterns |
| `Observable<UrlTree>` | Async redirect |

## 💡 Real-World Use Cases

1. **Token Validation** - Verify JWT with server
2. **Permission Check** - API call to check access
3. **Resource Exists** - Check if resource exists before navigation
4. **Feature Availability** - Server-side feature flags

## 📝 Implementation

### Basic Async Guard

```typescript
export const asyncPermissionGuard: CanActivateFn = (
    route, 
    state
): Observable<boolean> => {
    const http = inject(HttpClient);
    const router = inject(Router);
    
    return http.get<{ allowed: boolean }>('/api/permissions/check').pipe(
        map(response => response.allowed),
        catchError(() => of(false))  // Handle errors!
    );
};
```

### With Redirect on Failure

```typescript
export const asyncGuardWithRedirect: CanActivateFn = (
    route, 
    state
): Observable<boolean | UrlTree> => {
    const http = inject(HttpClient);
    const router = inject(Router);
    
    return http.get<{ allowed: boolean }>('/api/check').pipe(
        map(response => {
            if (!response.allowed) {
                return router.createUrlTree(['/unauthorized']);
            }
            return true;
        }),
        catchError(() => of(router.createUrlTree(['/error'])))
    );
};
```

### With Timeout

```typescript
export const guardWithTimeout: CanActivateFn = () => {
    const http = inject(HttpClient);
    
    return http.get('/api/check').pipe(
        timeout(5000),  // Fail after 5 seconds
        map(() => true),
        catchError(() => of(false))
    );
};
```

## ⚠️ Best Practices

1. **Always use catchError** - Network failures happen
2. **Add timeout** - Prevent hanging on slow servers
3. **Cache results** - Don't repeat expensive calls
4. **Show loading** - Users should know something is happening

## 🔧 Caching Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class PermissionCache {
    private cache = new Map<string, boolean>();
    
    check(permission: string): Observable<boolean> {
        if (this.cache.has(permission)) {
            return of(this.cache.get(permission)!);
        }
        
        return this.http.get<boolean>(`/api/check/${permission}`).pipe(
            tap(result => this.cache.set(permission, result))
        );
    }
}
```
