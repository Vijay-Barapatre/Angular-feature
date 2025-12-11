# Scenario 3: HTTP Caching Service

## 🎯 Problem Statement

You are building an application that frequently requests the **same data** from the server. To improve performance, you need to implement a **caching layer** that:

1. Stores responses in memory
2. Returns cached data for repeated requests
3. Has a configurable cache expiration time
4. Can be invalidated when data changes

## 📋 Requirements

### Functional Requirements
- First request fetches from server
- Subsequent requests return cached data
- Show cache status (HIT/MISS)
- Provide cache invalidation button
- Display time since last fetch

### Technical Requirements
- Create a reusable caching service
- Use RxJS `shareReplay` operator
- Implement TTL (Time To Live) for cache
- Handle cache invalidation on mutations

## 🔗 Caching Flow

```
Request 1: GET /api/products
├─ Cache: MISS ❌
├─ Network: ────────────────> (500ms)
└─ Response stored in cache

Request 2: GET /api/products
├─ Cache: HIT ✅ (0ms)
└─ Return immediately from cache

Request 3 (after TTL expires):
├─ Cache: EXPIRED ⏰
├─ Network: ────────────────> (500ms)
└─ Response updated in cache
```

## 💡 Hints

1. Use `shareReplay(1)` to cache the last emitted value
2. Store Observables in a Map for different endpoints
3. Add timestamp to check cache expiration
4. Clear cache on POST/PUT/DELETE operations

## ⚠️ Common Mistakes

- Caching Observables that return user-specific data
- Not invalidating cache after mutations
- Setting TTL too long (stale data)
- Caching error responses

## 📊 Expected Behavior

```
Click "Fetch Products" (1st time):
┌─────────────────────────────────────┐
│ 📡 Cache: MISS                      │
│ ⏱️  Network time: 523ms             │
│ 📦 Products loaded: 10              │
└─────────────────────────────────────┘

Click "Fetch Products" (2nd time):
┌─────────────────────────────────────┐
│ 💾 Cache: HIT                       │
│ ⏱️  Response time: 2ms              │
│ 📦 Products loaded: 10              │
└─────────────────────────────────────┘
```
