# 📡 Angular HTTP Client - Complete Guide

## 🎯 Overview

Angular's `HttpClient` is a powerful service for making HTTP requests. This guide covers all 9 use cases implemented in this project, from basic GET requests to advanced patterns like caching and file uploads.

---

## 📋 Table of Contents

1. [Use Case 1: Basic GET with Observable](#use-case-1-basic-get-with-observable)
2. [Use Case 2: CRUD Operations](#use-case-2-crud-operations)
3. [Use Case 3: Error Handling & Retry](#use-case-3-error-handling--retry)
4. [Use Case 4: HTTP Interceptors](#use-case-4-http-interceptors)
5. [Use Case 5: Promise-based Requests](#use-case-5-promise-based-requests)
6. [Use Case 6: RxJS Operators](#use-case-6-rxjs-operators)
7. [Use Case 7: Caching Strategies](#use-case-7-caching-strategies)
8. [Use Case 8: File Upload/Download](#use-case-8-file-uploaddownload)
9. [Use Case 9: Promise Patterns](#use-case-9-promise-patterns)

---

## Use Case 1: Basic GET with Observable

### 📖 What It Teaches
How to fetch data from an API and handle all UI states (loading, error, empty, success).

### 🔑 Key Concepts

#### Observable Pattern
```typescript
// HttpClient returns an Observable, not raw data
this.http.get<User[]>('/api/users').subscribe(users => {
    this.users = users;
});
```

#### State Management
```typescript
// Track all possible UI states
interface LoadState {
    loading: boolean;    // Show spinner
    error: string | null; // Show error message
    data: User[] | null;  // Show data
    lastFetched: Date | null;
}
```

#### RxJS Operators Used
| Operator | Purpose |
|----------|---------|
| `tap()` | Side effects (logging) without modifying stream |
| `map()` | Transform response data |
| `finalize()` | Always runs on complete OR error (like finally) |
| `catchError()` | Handle errors, return fallback value |

### 💻 Code Example
```typescript
fetchWithStateManagement(): void {
    this.state = { loading: true, error: null, data: null };

    this.apiService.getUsers().pipe(
        tap(() => console.log('Fetching...')),
        finalize(() => this.state.loading = false),
        catchError(err => {
            this.state.error = err.message;
            return of(null);
        })
    ).subscribe(users => {
        if (users) this.state.data = users;
    });
}
```

### ⚠️ Common Mistakes
- Forgetting that Observables are **lazy** (nothing happens until you subscribe)
- Not handling loading state (users see frozen UI)
- Not unsubscribing (memory leaks)

---

## Use Case 2: CRUD Operations

### 📖 What It Teaches
Complete Create, Read, Update, Delete operations with optimistic updates.

### 🔑 Key Concepts

#### HTTP Methods
| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | `http.get('/api/users')` |
| POST | Create new | `http.post('/api/users', newUser)` |
| PUT | Update full | `http.put('/api/users/1', user)` |
| PATCH | Update partial | `http.patch('/api/users/1', { name })` |
| DELETE | Remove | `http.delete('/api/users/1')` |

#### Optimistic Updates Pattern
Update UI immediately, then sync with server. Rollback if server fails.

```typescript
saveEdit(): void {
    // 1. Store original for rollback
    const original = { ...this.users[index] };
    
    // 2. Update UI immediately (OPTIMISTIC)
    this.users[index] = this.editingUser;
    
    // 3. Sync with server
    this.api.updateUser(this.editingUser).subscribe({
        next: () => console.log('Saved!'),
        error: () => {
            // 4. ROLLBACK on error
            this.users[index] = original;
        }
    });
}
```

### 💻 Code Example - POST
```typescript
createUser(): void {
    const newUser = { name: 'John', email: 'john@example.com' };
    
    this.http.post<User>('/api/users', newUser).subscribe({
        next: (createdUser) => {
            // Server returns user with ID
            this.users.push(createdUser);
        },
        error: (err) => console.error('Create failed:', err)
    });
}
```

---

## Use Case 3: Error Handling & Retry

### 📖 What It Teaches
Production-grade error handling with classification, retry strategies, and graceful degradation.

### 🔑 Key Concepts

#### Error Classification
```typescript
classifyError(error: HttpErrorResponse): ClassifiedError {
    // Network error (offline, timeout)
    if (error.status === 0) {
        return { type: 'network', isRetryable: true };
    }
    
    // Client errors (your fault)
    if (error.status >= 400 && error.status < 500) {
        return { type: 'client', isRetryable: error.status === 429 };
    }
    
    // Server errors (their fault)
    if (error.status >= 500) {
        return { type: 'server', isRetryable: true };
    }
}
```

#### Which Errors to Retry?
| Status | Meaning | Retry? |
|--------|---------|--------|
| 0 | Network offline | ✅ Yes |
| 400 | Bad request | ❌ No (fix your data) |
| 401 | Unauthorized | ❌ No (need login) |
| 404 | Not found | ❌ No |
| 429 | Rate limited | ✅ Yes (with backoff) |
| 500+ | Server error | ✅ Yes |

#### Exponential Backoff
Wait progressively longer between retries:
- Retry 1: Wait 1 second
- Retry 2: Wait 2 seconds
- Retry 3: Wait 4 seconds

Add **jitter** (random delay) to prevent all clients retrying simultaneously.

#### Circuit Breaker Pattern
Stop calling a failing service to let it recover:
- **CLOSED**: Normal operation
- **OPEN**: Service down, reject all requests
- **HALF-OPEN**: Test if service recovered

---

## Use Case 4: HTTP Interceptors

### 📖 What It Teaches
Middleware that runs for EVERY HTTP request/response.

### 🔑 Key Concepts

#### What Are Interceptors?
Think of them as a pipeline every request passes through:
```
Request:  Component → Auth → Logging → Error → Server
Response: Server → Error → Logging → Auth → Component
```

#### Common Use Cases
- **Auth**: Add Bearer token to all requests
- **Logging**: Log every request/response
- **Error Handling**: Catch 401s globally, redirect to login
- **Loading**: Show/hide global loading indicator

### 💻 Auth Interceptor Example
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('auth_token');
    
    // CRITICAL: Clone request (immutable!)
    const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next(authReq);
};
```

#### Setup in app.config.ts
```typescript
provideHttpClient(
    withInterceptors([
        authInterceptor,
        loggingInterceptor,
        errorInterceptor
    ])
)
```

### ⚠️ Critical Rule
HTTP requests are **IMMUTABLE**! You must clone to modify:
```typescript
// ❌ WRONG - doesn't work
req.headers.set('Auth', 'token');

// ✅ CORRECT - clone first
req.clone({ headers: req.headers.set('Auth', 'token') });
```

---

## Use Case 5: Promise-based Requests

### 📖 What It Teaches
Using async/await syntax with Angular's HttpClient.

### 🔑 Key Concepts

#### Observable vs Promise
| Feature | Observable | Promise |
|---------|------------|---------|
| Values | Multiple over time | Single value |
| Execution | Lazy (subscribe needed) | Eager (immediate) |
| Cancellation | ✅ Unsubscribe | ❌ Cannot cancel |
| Operators | Rich (map, filter, etc.) | Limited |

#### Converting Observable to Promise
```typescript
// ✅ MODERN (RxJS 7+)
const users = await lastValueFrom(this.http.get<User[]>('/api/users'));

// ❌ DEPRECATED
const users = await this.http.get<User[]>('/api/users').toPromise();
```

### 💻 Async/Await Pattern
```typescript
async loadData(): Promise<void> {
    try {
        this.loading = true;
        this.users = await lastValueFrom(this.apiService.getUsers());
    } catch (error) {
        this.error = error.message;
    } finally {
        this.loading = false;
    }
}
```

#### When to Use Promises
- ✅ Simple one-time requests
- ✅ Sequential async flow needed
- ✅ Working with Promise-based libraries
- ❌ Avoid for streams (WebSocket, polling)
- ❌ Avoid for type-ahead search (need cancellation)

---

## Use Case 6: RxJS Operators

### 📖 What It Teaches
Advanced RxJS patterns for real-world HTTP scenarios.

### 🔑 Key Operators

#### Type-ahead Search Operators
```typescript
this.searchInput$.pipe(
    debounceTime(300),        // Wait 300ms after user stops typing
    distinctUntilChanged(),   // Only if value changed
    switchMap(term =>         // Cancel previous, start new
        this.api.search(term)
    )
).subscribe(results => this.results = results);
```

| Operator | Purpose |
|----------|---------|
| `debounceTime(300)` | Wait for pause in typing |
| `distinctUntilChanged()` | Skip duplicate values |
| `switchMap()` | Cancel previous request |

#### Parallel Loading (forkJoin)
```typescript
forkJoin({
    users: this.api.getUsers(),
    products: this.api.getProducts(),
    stats: this.api.getStats()
}).subscribe(result => {
    // All complete at once
    console.log(result.users, result.products, result.stats);
});
```

#### Operator Comparison
| Operator | Behavior | Use Case |
|----------|----------|----------|
| `switchMap` | Cancel previous | Search autocomplete |
| `concatMap` | Queue in order | Form submissions |
| `mergeMap` | Run all parallel | Bulk operations |
| `exhaustMap` | Ignore while busy | Prevent double-click |

---

## Use Case 7: Caching Strategies

### 📖 What It Teaches
How to cache HTTP responses to avoid redundant API calls.

### 🔑 Key Concepts

#### shareReplay() Operator
```typescript
// Without shareReplay: 3 clicks = 3 API calls
getUsersNoCached(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
}

// With shareReplay: 3 clicks = 1 API call!
private usersCache$: Observable<User[]> | null = null;

getUsersCached(): Observable<User[]> {
    if (!this.usersCache$) {
        this.usersCache$ = this.http.get<User[]>('/api/users').pipe(
            shareReplay(1)  // Cache last emission
        );
    }
    return this.usersCache$;
}
```

#### Cache Invalidation
```typescript
invalidateCache(): void {
    this.usersCache$ = null;  // Force new request next time
}
```

#### Caching Strategies
| Strategy | Persistence | Best For |
|----------|-------------|----------|
| `shareReplay` | In-memory | Simple, session-only |
| `BehaviorSubject` | In-memory | Need current value |
| `localStorage` | Browser | Persist across sessions |
| Interceptor | Global | Multiple endpoints |

---

## Use Case 8: File Upload/Download

### 📖 What It Teaches
Handle file operations with progress tracking.

### 🔑 Key Concepts

#### File Upload
```typescript
const formData = new FormData();
formData.append('file', selectedFile);

const req = new HttpRequest('POST', '/api/upload', formData, {
    reportProgress: true  // Enable progress events
});

this.http.request(req).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
        const percent = Math.round(100 * event.loaded / event.total!);
        this.uploadProgress = percent;
    }
    if (event.type === HttpEventType.Response) {
        console.log('Upload complete!');
    }
});
```

#### HttpEventType Values
| Type | Meaning |
|------|---------|
| `Sent` (0) | Request sent |
| `UploadProgress` (1) | Upload progress |
| `ResponseHeader` (2) | Headers received |
| `DownloadProgress` (3) | Download progress |
| `Response` (4) | Complete response |

#### File Download
```typescript
this.http.get('/api/file', { responseType: 'blob' }).subscribe(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.pdf';
    a.click();
});
```

---

## Use Case 9: Promise Patterns

### 📖 What It Teaches
Advanced Promise patterns: `Promise.all`, `Promise.allSettled`, `Promise.race`.

### 🔑 Key Patterns

#### Promise.all - Parallel, Fail-Fast
```typescript
// All succeed → Returns [result1, result2, result3]
// ANY fails → Rejects immediately
const [users, products, stats] = await Promise.all([
    lastValueFrom(this.api.getUsers()),
    lastValueFrom(this.api.getProducts()),
    lastValueFrom(this.api.getStats())
]);
```

#### Promise.allSettled - Get All Results
```typescript
// NEVER rejects, always returns all results
const results = await Promise.allSettled([
    lastValueFrom(this.api.call1()),
    lastValueFrom(this.api.call2()),
    lastValueFrom(this.api.call3())
]);

results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
    } else {
        console.log('Failed:', result.reason);
    }
});
```

#### Promise.race - First Response Wins
```typescript
// Timeout pattern
const result = await Promise.race([
    lastValueFrom(this.api.getData()),
    new Promise((_, reject) => 
        setTimeout(() => reject('Timeout'), 5000)
    )
]);
```

---

## 🎓 Quick Reference

### RxJS Operators Cheat Sheet
| Operator | Purpose | Example |
|----------|---------|---------|
| `map` | Transform value | `map(user => user.name)` |
| `tap` | Side effects | `tap(x => console.log(x))` |
| `catchError` | Handle errors | `catchError(err => of([]))` |
| `finalize` | Always run cleanup | `finalize(() => loading = false)` |
| `switchMap` | Cancel previous | Type-ahead search |
| `forkJoin` | Parallel, wait all | Dashboard loading |
| `shareReplay` | Cache result | Prevent duplicate calls |
| `debounceTime` | Wait for pause | Input debouncing |
| `distinctUntilChanged` | Skip duplicates | Filter unchanged values |
| `retry` | Retry on error | `retry(3)` |

### HTTP Status Codes
| Code | Meaning | Retry? |
|------|---------|--------|
| 200 | OK | - |
| 201 | Created | - |
| 204 | No Content | - |
| 400 | Bad Request | ❌ |
| 401 | Unauthorized | ❌ |
| 403 | Forbidden | ❌ |
| 404 | Not Found | ❌ |
| 429 | Rate Limited | ✅ |
| 500 | Server Error | ✅ |
| 503 | Unavailable | ✅ |

---

## 🔧 Best Practices

1. **Always handle errors** - Don't let requests fail silently
2. **Show loading states** - Users need feedback
3. **Unsubscribe** - Prevent memory leaks (use `takeUntil` or async pipe)
4. **Type your responses** - `http.get<User[]>()` for type safety
5. **Use interceptors** - For cross-cutting concerns (auth, logging)
6. **Cache when appropriate** - Don't make redundant calls
7. **Debounce search** - Prevent API hammering
8. **Use switchMap for search** - Cancel stale requests

---

## 🎤 Interview Questions

### 📋 Basic Questions

#### Q1: What type of object does HttpClient.get() return?
**Answer:** An `Observable<T>`. Angular's HttpClient is RxJS-based, so all HTTP methods return Observables, not Promises or raw data.

#### Q2: What's the difference between GET and POST?
**Answer:**
| Method | Purpose | Body | Idempotent |
|--------|---------|------|------------|
| GET | Read data | ❌ No | ✅ Yes |
| POST | Create new | ✅ Yes | ❌ No |

#### Q3: How do you handle errors in HttpClient?
**Answer:**
```typescript
this.http.get('/api/data').pipe(
    catchError(error => {
        console.error('Error:', error);
        return of(null);  // Return fallback
    })
).subscribe();
```

#### Q4: What is an HTTP Interceptor?
**Answer:** Middleware that intercepts every HTTP request and response. Used for auth tokens, logging, error handling, and caching.

#### Q5: Why are HTTP requests immutable in Angular?
**Answer:** For safety and predictability. You cannot accidentally modify a request mid-flight. To change a request, you must `clone()` it first.

---

### 🎯 Scenario-Based Questions

#### Scenario 1: Dashboard Loading
**Question:** You need to load users, products, and orders simultaneously. All must succeed. How?

**Answer:**
```typescript
forkJoin({
    users: this.api.getUsers(),
    products: this.api.getProducts(),
    orders: this.api.getOrders()
}).subscribe(result => {
    this.users = result.users;
    this.products = result.products;
    this.orders = result.orders;
});
```

---

#### Scenario 2: Type-ahead Search
**Question:** Build a search that calls API as user types, but don't call on every keystroke. Cancel previous requests.

**Answer:**
```typescript
this.searchInput$.pipe(
    debounceTime(300),          // Wait for pause
    distinctUntilChanged(),      // Skip duplicates
    switchMap(term =>           // Cancel previous
        this.api.search(term)
    )
).subscribe(results => this.results = results);
```

---

#### Scenario 3: Token Refresh
**Question:** Your JWT expires. On 401, refresh token and retry the original request.

**Answer:**
```typescript
catchError(error => {
    if (error.status === 401) {
        return this.authService.refreshToken().pipe(
            switchMap(newToken => {
                const retryReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                });
                return next(retryReq);
            })
        );
    }
    return throwError(() => error);
})
```

---

#### Scenario 4: Optimistic Updates
**Question:** User edits a record. Update UI immediately for better UX, but rollback if server fails.

**Answer:**
```typescript
// 1. Store original
const original = { ...this.users[index] };

// 2. Update UI immediately
this.users[index] = editedUser;

// 3. Sync with server
this.api.update(editedUser).subscribe({
    error: () => {
        // 4. Rollback on failure
        this.users[index] = original;
        this.showError('Update failed');
    }
});
```

---

#### Scenario 5: Retry with Backoff
**Question:** API is flaky. Retry 3 times with increasing delays.

**Answer:**
```typescript
this.http.get('/api/data').pipe(
    retry({
        count: 3,
        delay: (error, retryCount) => {
            const delay = Math.pow(2, retryCount) * 1000;  // 1s, 2s, 4s
            return timer(delay);
        }
    })
).subscribe();
```

---

### 💡 Advanced Questions

#### Q6: When would you use Observable vs Promise for HTTP?
**Answer:**
| Use Observable | Use Promise |
|----------------|-------------|
| Type-ahead search | Simple one-time requests |
| Polling/streaming | Sequential async flow |
| Need cancellation | Working with Promise APIs |
| Complex transformations | Better readability |

#### Q7: What's the difference between switchMap, mergeMap, concatMap?
**Answer:**
| Operator | Behavior | Use Case |
|----------|----------|----------|
| `switchMap` | Cancel previous | Search autocomplete |
| `mergeMap` | Run all in parallel | Bulk operations |
| `concatMap` | Queue in order | Dependent requests |
| `exhaustMap` | Ignore while busy | Prevent double-click |

#### Q8: How do you cache HTTP responses?
**Answer:**
```typescript
private cache$: Observable<Data> | null = null;

getData(): Observable<Data> {
    if (!this.cache$) {
        this.cache$ = this.http.get<Data>('/api/data').pipe(
            shareReplay(1)
        );
    }
    return this.cache$;
}
```

#### Q9: What's a Circuit Breaker pattern?
**Answer:** A pattern that stops calling a failing service to let it recover:
- **CLOSED**: Normal operation
- **OPEN**: Service down, reject requests (fail fast)
- **HALF-OPEN**: Test if service recovered

#### Q10: How do you upload a file with progress?
**Answer:**
```typescript
const req = new HttpRequest('POST', '/api/upload', formData, {
    reportProgress: true
});

this.http.request(req).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
        const percent = Math.round(100 * event.loaded / event.total!);
    }
});
```

---

## 🏆 Interview Preparation Checklist

- [ ] Can explain Observable vs Promise
- [ ] Know how to use `catchError`, `finalize`, `tap`
- [ ] Understand interceptor chain order
- [ ] Can implement type-ahead with `switchMap`
- [ ] Know when to use `forkJoin` vs `combineLatest`
- [ ] Can explain optimistic updates pattern
- [ ] Understand error classification (4xx vs 5xx)
- [ ] Know how `shareReplay` works for caching
- [ ] Can implement file upload with progress
- [ ] Understand Circuit Breaker pattern

