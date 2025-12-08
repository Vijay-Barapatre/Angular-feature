# 🟦 Exercise 1: Creating Signals

**Difficulty:** Beginner | **Time:** 15 minutes

---

## 📋 Problem Statement

Learn to create and use Angular Signals - the new reactive primitive for state management.

---

## ✅ Requirements

- [ ] Create a signal with `signal(initialValue)`
- [ ] Read signal value with `signalName()`
- [ ] Update with `set()` and `update()`
- [ ] Display signal value in template

---

## 📤 Expected Output

```
Counter: 0
[Increment] [Decrement] [Reset]

Click Increment → Counter: 1
Click Increment → Counter: 2
Click Reset → Counter: 0
```

---

## 💡 Hints

```typescript
// Create
count = signal(0);

// Read
console.log(this.count());

// Update
this.count.set(5);
this.count.update(n => n + 1);
```
