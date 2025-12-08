# 🟦 Exercise 4: Headers & Params - Solution

```typescript
import { HttpHeaders, HttpParams } from '@angular/common/http';

// With headers
getProtectedData(): Observable<Data> {
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('Content-Type', 'application/json');
  
  return this.http.get<Data>('/api/protected', { headers });
}

// With query params
searchUsers(query: string, page: number): Observable<User[]> {
  const params = new HttpParams()
    .set('q', query)
    .set('page', page.toString())
    .set('limit', '10');
  
  return this.http.get<User[]>('/api/users', { params });
}

// URL becomes: /api/users?q=john&page=1&limit=10
```
