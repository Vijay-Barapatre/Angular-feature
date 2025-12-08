# 🟦 Exercise 3: Error Handling - Solution

```typescript
import { catchError, retry } from 'rxjs/operators';
import { throwError, EMPTY } from 'rxjs';

users$ = this.http.get<User[]>('/api/users').pipe(
  retry(2),  // Retry up to 2 times
  catchError(error => {
    if (error.status === 404) {
      this.errorMessage.set('Users not found');
      return EMPTY;  // Return empty observable
    }
    if (error.status === 500) {
      this.errorMessage.set('Server error, please try later');
      return EMPTY;
    }
    return throwError(() => error);  // Re-throw other errors
  })
);
```

## Error Status Codes
| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad Request | Show validation errors |
| 401 | Unauthorized | Redirect to login |
| 403 | Forbidden | Show access denied |
| 404 | Not Found | Show not found message |
| 500 | Server Error | Show retry option |
