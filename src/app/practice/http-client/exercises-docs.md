# HTTP Client Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: GET Request
Fetch data from an API endpoint.

```typescript
constructor(private http: HttpClient) {}

users$ = this.http.get<User[]>('/api/users');
```

### Exercise 2: POST Request
Create new resources.

### Exercise 3: Error Handling
Handle HTTP errors gracefully.

### Exercise 4: Headers & Params
Add authentication headers and query params.

## 🟥 Complex Scenarios

### Scenario 1: CRUD Operations
Complete Create, Read, Update, Delete implementation.

### Scenario 2: Interceptors
Add auth tokens, logging to all requests.

### Scenario 3: Caching
Cache responses for performance.

### Scenario 4: Upload Progress
Track file upload progress.

### Scenario 5: Retry Logic
Automatically retry failed requests.
