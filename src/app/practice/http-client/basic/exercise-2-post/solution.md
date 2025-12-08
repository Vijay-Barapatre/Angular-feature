# 🟦 Exercise 2: POST Request - Solution

```typescript
createUser(user: CreateUserDto): Observable<User> {
  return this.http.post<User>('/api/users', user);
}

// Usage
onSubmit(): void {
  this.createUser({ name: 'John', email: 'john@test.com' })
    .subscribe({
      next: (user) => console.log('Created:', user),
      error: (err) => console.error('Error:', err)
    });
}
```
