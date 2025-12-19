# 💾 Use Case 1: In-Memory Caching

> **💡 Lightbulb Moment**: Store API responses in memory to avoid redundant HTTP calls!

---

## 1. 🔍 What is In-Memory Caching?

Store HTTP responses in a variable/Map to reuse without making new requests.

```typescript
@Injectable({ providedIn: 'root' })
export class CachingService {
    private cache = new Map<string, any>();
    
    getData(url: string): Observable<any> {
        if (this.cache.has(url)) {
            return of(this.cache.get(url));
        }
        
        return this.http.get(url).pipe(
            tap(data => this.cache.set(url, data))
        );
    }
}
```

---

## 2. 🚀 Pros and Cons

| Pros | Cons |
|------|------|
| Simple | Lost on refresh |
| Fast | Memory usage |
| No dependencies | No expiration |

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: When use in-memory caching?
**Answer:**
- Static reference data
- User session data
- Frequently accessed, rarely changing data

#### Q2: How to invalidate cache?
**Answer:**
```typescript
clearCache() { this.cache.clear(); }
invalidate(key: string) { this.cache.delete(key); }
```

---

### Scenario-Based Questions

#### Scenario: Cache with TTL
**Question:** Add expiration to cached items.

**Answer:**
```typescript
private cache = new Map<string, { data: any, expiry: number }>();

getData(url: string, ttlMs = 60000) {
    const cached = this.cache.get(url);
    if (cached && cached.expiry > Date.now()) {
        return of(cached.data);
    }
    return this.http.get(url).pipe(
        tap(data => this.cache.set(url, { data, expiry: Date.now() + ttlMs }))
    );
}
```

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  IN-MEMORY CACHING: STORE & REUSE                           │
│                                                             │
│   CACHE FLOW:                                               │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ getData(url) {                                        │ │
│   │   if (cache.has(url)) {       // 1. Check cache       │ │
│   │     return of(cache.get(url)); // 2. Cache HIT ⚡     │ │
│   │   }                                                   │ │
│   │                                                       │ │
│   │   return http.get(url).pipe(   // 3. Cache MISS       │ │
│   │     tap(data => cache.set(url, data))  // 4. Store    │ │
│   │   );                                                  │ │
│   │ }                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   WITH TTL (expiration):                                    │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ cache = Map<string, { data: any, expiry: number }>    │ │
│   │                                                       │ │
│   │ if (cached && cached.expiry > Date.now()) {           │ │
│   │   return of(cached.data);  // Still fresh ✅          │ │
│   │ }                                                     │ │
│   │ // Else: expired, fetch new data                      │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   INVALIDATION: cache.delete(key) or cache.clear()         │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Check cache first (Map.has). Store on miss. Add TTL to prevent stale data!

---

## 🧊 Refrigerator Analogy (Easy to Remember!)

Think of in-memory caching like a **refrigerator**:

| Concept | Refrigerator Analogy | Memory Trick |
|---------|---------------------|--------------|
| **Cache** | 🧊 **Fridge**: Quick-access storage for frequent items | **"Keep nearby for quick access"** |
| **Cache Hit** | ✅ **Food already in fridge**: Grab and go, no cooking! | **"Already prepared!"** |
| **Cache Miss** | 🍳 **Fridge empty**: Must cook from scratch (API call) | **"Need to fetch"** |
| **TTL (Expiry)** | ⏰ **Expiration date**: Milk goes bad after 7 days | **"Good until..."** |
| **Invalidation** | 🗑️ **Throw out old food**: Clear when stale | **"Out with the old"** |

### 📖 Story to Remember:

> 🧊 **The Efficient Kitchen**
>
> You're cooking dinner and need ingredients:
>
> **Without Cache (no fridge):**
> ```
> Need milk → Walk to store → Buy milk → Use milk
> Need milk again → Walk to store AGAIN → Buy more milk
> Slow! 🐢
> ```
>
> **With Cache (fridge):**
> ```
> Need milk → Check fridge → "Got it!" → Use milk ⚡
> Need milk again → Check fridge → "Still got it!" → Use ⚡
> Fast! 🚀
> ```
>
> **But watch the expiration!** Old data is like spoiled milk. 🤢

### 🎯 Quick Reference:
```
🧊 Check fridge first = Check cache (Map.has())
✅ Food in fridge    = Return cached data (of(cachedData))
🍳 Fridge empty      = Make API call, store result
⏰ Check expiry      = Compare Date.now() with TTL
🗑️ Throw out         = cache.delete() or cache.clear()
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((In-Memory Cache))
    Storage
      Map
      Object
      Variable
    Features
      Fast
      Simple
      Volatile
    Operations
      Get
      Set
      Invalidate
```
