# ⏱️ Use Case 4: Async Testing

> **💡 Lightbulb Moment**: `fakeAsync` + `tick` gives you a time machine! Fast-forward through delays without actually waiting.

---

## 1. 🔍 Async Testing Arsenal

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#667eea'}}}%%
flowchart TD
    A{Async Type?}
    A -->|setTimeout/Interval| B[fakeAsync + tick]
    A -->|Promise| C[fakeAsync + tick]
    A -->|Observable delay| D[fakeAsync + tick]
    A -->|HTTP mock| E[flush]
    A -->|Zone.js async| F[whenStable]
    A -->|Simple subscribe| G[done callback]
    
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#10b981,stroke:#059669,color:#fff
    style D fill:#10b981,stroke:#059669,color:#fff
```

| Tool | Use When |
|------|----------|
| `fakeAsync` + `tick(ms)` | Precise time control |
| `flush()` | Complete all timers |
| `discardPeriodicTasks()` | Cleanup intervals |
| `async` + `whenStable()` | Zone.js tracked async |
| `done()` callback | Observable subscriptions |

---

## 2. 🚀 Patterns

### fakeAsync + tick

```typescript
it('waits for timeout', fakeAsync(() => {
    component.startTimer();        // Starts 1s timer
    expect(component.done).toBeFalse();
    
    tick(1000);                    // ⏩ Fast-forward 1s
    expect(component.done).toBeTrue();
}));
```

### flush()

```typescript
it('completes all timers', fakeAsync(() => {
    component.startMultipleTimers();  // Several timers
    flush();                          // Complete them all
    expect(component.allDone).toBeTrue();
}));
```

### Debounce Testing

```typescript
it('debounces input', fakeAsync(() => {
    component.search('a');
    tick(100);
    component.search('ab');
    tick(300);  // Wait for debounce (300ms)
    
    expect(service.search).toHaveBeenCalledWith('ab');
    discardPeriodicTasks();  // Cleanup
}));
```

---

## 3. 🐛 Common Pitfalls

| ❌ Problem | ✅ Solution |
|-----------|-------------|
| Timer still running error | Use `discardPeriodicTasks()` |
| tick(0) doesn't work | Use `flush()` for microtasks |
| Observable never completes | Mock with synchronous `of()` |

---

## 4. ⚡ Performance Tip

Use synchronous mocks when possible:

```typescript
// Instead of delay(500)
mockService.getData.and.returnValue(of(data));  // Instant!
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Async Testing))
    fakeAsync
      tick ms
      flush
      discardPeriodicTasks
    whenStable
      Zone.js async
      Promises
    done callback
      subscribe
      manual complete
```
