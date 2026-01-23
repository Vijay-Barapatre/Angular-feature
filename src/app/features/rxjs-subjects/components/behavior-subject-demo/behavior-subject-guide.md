# 🧠 BehaviorSubject (The State Holder)

> **💡 Analogy**: Think of a `BehaviorSubject` like a **Digital Scoreboard**. Even if you arrive late to the game, you immediately see the *current score*.

---

## 🖼️ Visualizing the Flow (Marble Diagram)

![BehaviorSubject Flow](./behavior-subject-flow.png)

## 🔑 Key Concepts

1.  **Initial Value**: Must be created with a starting value (e.g., `0`, `null`, `[]`).
2.  **Current Value**: Always holds the latest emitted value.
3.  **Late Subscribers**: Immediately receive the *current value* upon subscription.

---

## 📝 Code Example

```typescript
// 1. Initialize with value 'A'
const subject = new BehaviorSubject<string>('A');

// 2. Subscriber 1 joins
subject.subscribe(val => console.log('Sub 1:', val));
// Output: Sub 1: A (Immediate Playback)

// 3. Source emits 'B'
subject.next('B');
// Output: Sub 1: B

// 4. Subscriber 2 joins
subject.subscribe(val => console.log('Sub 2:', val));
// Output: Sub 2: B (Immediate Playback)
```

---

## ⚠️ When to use?
- **State Management**: Storing the current user, theme, or cart items.
- When any component needs the "latest known data" immediately.
