# 📢 Use Case 1: Subject (The Speaker)

> **💡 Analogy**: Think of a Subject like a **Live TV Broadcast**. If you tune in late, you missed the beginning. You only see what happens *after* you join.

---

## 🖼️ Visualizing the Flow (Marble Diagram)

![Subject Flow](./subject-flow.png)

## 🔑 Key Concepts

1.  **Multicasting**: One source (Subject) shares execution with many observers.
2.  **No Initial Value**: It starts "empty".
3.  **Late Subscribers**: Miss all values emitted *before* they subscribed.

---

## 📝 Code Example

```typescript
const subject = new Subject<string>();

// 1. Source emits 'A' (LOST! No one is listening)
subject.next('A');

// 2. Subscriber 1 joins
subject.subscribe(val => console.log('Sub 1:', val));

// 3. Source emits 'B'
subject.next('B'); 
// Output: Sub 1: B

// 4. Subscriber 2 joins (Late)
subject.subscribe(val => console.log('Sub 2:', val));

// 5. Source emits 'C'
subject.next('C');
// Output: Sub 1: C
// Output: Sub 2: C
```

---

## ⚠️ When to use?
- When you need a simple event bus (e.g., "Button Clicked").
- When past values generally don't matter to new subscribers.
