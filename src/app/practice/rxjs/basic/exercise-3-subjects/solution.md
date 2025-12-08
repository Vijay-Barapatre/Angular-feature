# 🟦 Exercise 3: Subjects - Solution

```typescript
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

// Subject - no initial value, no replay
const subject = new Subject<string>();
subject.subscribe(v => console.log('A:', v));
subject.next('Hello');  // A: Hello

// BehaviorSubject - has initial value
const behavior$ = new BehaviorSubject<number>(0);
console.log(behavior$.value);  // 0 (sync access)

// ReplaySubject - replays last N values
const replay$ = new ReplaySubject<string>(2);
replay$.next('a');
replay$.next('b');
replay$.next('c');
replay$.subscribe(console.log); // b, c (last 2)
```

| Type | Initial Value | Replay | Sync Access |
|------|--------------|--------|-------------|
| Subject | No | No | No |
| BehaviorSubject | Yes | Last 1 | Yes (.value) |
| ReplaySubject | No | Last N | No |
