# 🟥 Scenario 2: Interceptors - Solution

```typescript
// Functional interceptor (modern approach)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  
  return next(req);
};

// Logging interceptor
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  
  return next(req).pipe(
    tap({
      next: () => {
        const elapsed = Date.now() - started;
        console.log(`${req.method} ${req.url} - ${elapsed}ms`);
      },
      error: (err) => {
        console.error(`${req.method} ${req.url} - Error:`, err);
      }
    })
  );
};

// Register in app.config.ts
provideHttpClient(
  withInterceptors([authInterceptor, loggingInterceptor])
)
```
