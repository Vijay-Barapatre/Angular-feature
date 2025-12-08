# 🟥 Scenarios 3-5 Summary

## Scenario 3: Caching
Cache GET responses to reduce API calls.

```typescript
private cache = new Map<string, Observable<any>>();

getData(key: string): Observable<Data> {
  if (!this.cache.has(key)) {
    this.cache.set(key, 
      this.http.get<Data>(`/api/data/${key}`).pipe(
        shareReplay(1)
      )
    );
  }
  return this.cache.get(key)!;
}
```

## Scenario 4: Upload Progress
Track file upload progress with reportProgress.

```typescript
uploadFile(file: File): Observable<HttpEvent<any>> {
  const formData = new FormData();
  formData.append('file', file);
  
  return this.http.post('/api/upload', formData, {
    reportProgress: true,
    observe: 'events'
  });
}
```

## Scenario 5: Retry Logic
Automatically retry failed requests.

```typescript
getData().pipe(
  retry({ count: 3, delay: 1000 })
)
```
