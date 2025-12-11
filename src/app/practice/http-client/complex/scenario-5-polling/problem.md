# Scenario 5: Polling & Retry Logic

## 🎯 Problem Statement

You are building a real-time notification system that needs to:

1. **Poll an API** every N seconds for new data
2. **Automatically retry** failed requests
3. **Stop polling** when component is destroyed
4. **Implement exponential backoff** for retries

## 📋 Requirements

### Functional Requirements
- Start/stop polling with buttons
- Display polling interval
- Show retry attempts on failure
- Display latest data from server
- Visual indicator when polling is active

### Technical Requirements
- Use `interval` with `switchMap` for polling
- Use `retry` or `retryWhen` for auto-retry
- Implement exponential backoff
- Properly unsubscribe on destroy

## 🔗 Polling Flow

```
[Start Polling]
       ↓
Every 5 seconds:
├─ GET /api/notifications
├─ Success → Display data
├─ Failure → Retry with backoff
│   ├─ Retry 1: Wait 1s → Request
│   ├─ Retry 2: Wait 2s → Request
│   ├─ Retry 3: Wait 4s → Request
│   └─ Give up after 3 retries
└─ Continue polling...
       ↓
[Stop Polling]
```

## 💡 Hints

1. Use `interval(5000)` to emit every 5 seconds
2. Pipe through `switchMap` to make the HTTP call
3. Use `retry(3)` for simple retry
4. Use `timer` in `retryWhen` for exponential backoff
5. Store subscription and unsubscribe on destroy

## ⚠️ Common Mistakes

- Not unsubscribing (memory leak, continues after navigate away)
- Using `setInterval` instead of RxJS `interval`
- Retry hammering the server (no backoff)
- Not handling the "give up" case after max retries

## 📊 Expected Behavior

```
┌─────────────────────────────────────┐
│ 🔄 Polling Status: ACTIVE           │
│ ⏱️  Interval: 5 seconds              │
│ 📡 Last fetch: 2 seconds ago        │
│ ✅ Retries: 0/3                     │
├─────────────────────────────────────┤
│ 📬 Latest Notifications:            │
│ • New message from John             │
│ • Order #1234 shipped               │
│ • Payment received                  │
├─────────────────────────────────────┤
│ [Stop Polling]                      │
└─────────────────────────────────────┘
```
