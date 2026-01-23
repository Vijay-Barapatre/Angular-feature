# 🚀 AsyncSubject (The Finalist)

> **💡 Analogy**: Think of `AsyncSubject` like a **Rocket Launch**. You can join the viewing area anytime, but you only see the main event (lift-off) when the countdown finishes (completes).

---

## 🖼️ Visualizing the Flow (Marble Diagram)

![AsyncSubject Flow](./async-subject-flow.png)

## 🔑 Key Concepts

1.  **Completion Required**: Subscribers receive NOTHING until `complete()` is called.
2.  **Last Value Only**: Only the very last value emitted before completion is sent.
3.  **One-Shot**: Once completed, all future subscribers get that same last value immediately.

---

## 📝 Code Example

```typescript
const subject = new AsyncSubject<string>();

// 1. Source emits values (IGNORED by subscribers)
subject.next('A');
subject.next('B');
subject.next('C'); // This is the last one!

// 2. Subscriber 1 joins
subject.subscribe(val => console.log('Sub 1:', val));
// Output: (Nothing yet...)

// 3. Mark as Complete
subject.complete();
// Output: Sub 1: C

// 4. Subscriber 2 joins (After complete)
subject.subscribe(val => console.log('Sub 2:', val));
// Output: Sub 2: C (Immediate)
```

---

## ⚠️ When to use?
- **HTTP Requests**: You only care about the final response, and you want to cache it for late subscribers.
- **Calculations**: Waiting for a heavy computation to finish and return a single result.
