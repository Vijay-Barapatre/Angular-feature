# 🔒 Use Case 4: HTTP Interceptors

> **Goal**: Implement cross-cutting concerns like auth, logging, and error handling.

---

## 1. 🔍 How It Works

Interceptors are **middleware** that intercept every HTTP request/response.

### 📊 Interceptor Chain

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#667eea'}}}%%
flowchart LR
    A[Request] --> B[Auth Interceptor]
    B --> C[Logging Interceptor]
    C --> D[Error Interceptor]
    D --> E[Server]
    E --> D2[Error Interceptor]
    D2 --> C2[Logging Interceptor]
    C2 --> F[Response]
    
    style B fill:#667eea,color:#fff
    style C fill:#4ade80,color:#fff
    style D fill:#ef4444,color:#fff
```

---

## 2. 🚀 Implementation

### Functional Interceptor (Angular 15+)

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    
    // Clone request (immutable!)
    const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next(authReq);
};
```

### Register in app.config.ts

```typescript
export const appConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([authInterceptor, loggingInterceptor])
        )
    ]
};
```

---

## 3. 🌍 Real World Uses

1. **Auth tokens** - Add JWT to every request
2. **Request logging** - Track all API calls
3. **Global errors** - Show toasts on 500 errors
4. **Caching** - Return cached responses

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Interceptors))
    Auth
      Add Bearer token
      Refresh token
    Logging
      Request timing
      Debug info
    Error
      Global handling
      Redirect on 401
    Caching
      Store responses
      Return cached
```
