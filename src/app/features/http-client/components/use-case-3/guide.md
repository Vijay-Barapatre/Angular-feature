# 🐛 Use Case 3: Error Handling & Retry

> **Goal**: Handle HTTP errors gracefully and implement retry strategies.

---

## 1. 🔍 How It Works

### Error Handling Operators

| Operator | Purpose |
|----------|---------|
| `catchError` | Catch error, optionally recover |
| `retry(n)` | Retry n times immediately |
| `retryWhen` | Custom retry logic |
| `throwError` | Re-throw or create new error |

### 📊 Error Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#ef4444'}}}%%
flowchart TD
    A[HTTP Request] --> B{Success?}
    B -->|Yes| C[next callback]
    B -->|No| D{retry?}
    D -->|Yes| A
    D -->|No| E[catchError]
    E --> F{Recover?}
    F -->|Yes| G[Return fallback]
    F -->|No| H[error callback]
    
    style D fill:#fbbf24,color:#000
    style E fill:#ef4444,color:#fff
    style G fill:#4ade80,color:#fff
```

---

## 2. 🚀 Implementation

### Basic catchError

```typescript
this.http.get(url).pipe(
    catchError(error => {
        console.error('API Error:', error);
        // Return fallback or empty
        return of({ error: true, data: [] });
    })
).subscribe(data => ...);
```

### Retry with Exponential Backoff

```typescript
this.http.get(url).pipe(
    retryWhen(errors => errors.pipe(
        delayWhen((_, attempt) => 
            timer(Math.pow(2, attempt) * 1000) // 1s, 2s, 4s...
        ),
        take(3) // Max 3 retries
    )),
    catchError(err => of(null))
).subscribe();
```

---

## 3. 🌍 Real World Uses

1. **Flaky APIs** - Retry transient network errors
2. **Offline mode** - Return cached data on error
3. **User feedback** - Show friendly error messages

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Error Handling))
    catchError
      Handle error
      Return fallback
      Log to service
    retry
      Immediate retry
      Fixed count
    retryWhen
      Delay between retries
      Exponential backoff
      Custom logic
    Recovery
      Cached data
      Default values
      Empty array
```
