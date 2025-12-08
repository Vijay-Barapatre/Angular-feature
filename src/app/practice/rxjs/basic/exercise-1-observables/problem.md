# 🟦 Exercise 1: Observables

**Difficulty:** Beginner | **Time:** 20 minutes

## 📋 Problem Statement
Create and subscribe to basic Observables using RxJS.

## ✅ Requirements
- [ ] Create Observable with `new Observable()`
- [ ] Subscribe and handle values
- [ ] Handle completion and errors
- [ ] Unsubscribe properly

## 💡 Key Pattern
```typescript
const obs$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});

obs$.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Done!')
});
```
