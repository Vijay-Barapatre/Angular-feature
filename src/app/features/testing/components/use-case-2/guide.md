# ⚙️ Use Case 2: Service Testing

> **💡 Lightbulb Moment**: Services are the easiest to test because they're just TypeScript classes. No DOM, no template—just pure logic!

---

## 1. 🔍 How It Works

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#667eea'}}}%%
flowchart LR
    A[TestBed] -->|inject| B[Service Instance]
    B -->|call| C[Methods]
    C -->|verify| D[State/Output]
    
    style A fill:#667eea,stroke:#5a67d8,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
```

### Service Testing is Simple

| Step | Action |
|------|--------|
| 1 | Configure TestBed with service |
| 2 | Inject service instance |
| 3 | Call methods |
| 4 | Assert results |

---

## 2. 🚀 Implementation

### Basic Service Test

```typescript
describe('CounterService', () => {
    let service: CounterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CounterService]
        });
        service = TestBed.inject(CounterService);
    });

    it('should increment', () => {
        service.increment();
        expect(service.currentCount).toBe(1);
    });
});
```

### Testing Observables

```typescript
it('should emit updates', (done) => {
    const values: number[] = [];
    service.count$.subscribe(v => values.push(v));
    
    service.increment();
    service.increment();
    
    expect(values).toEqual([0, 1, 2]);
    done();
});
```

### Testing Signals (Angular 17+)

```typescript
it('should update signal', () => {
    service.increment();
    expect(service.countSignal()).toBe(1);
    expect(service.doubleCount()).toBe(2);  // Computed
});
```

---

## 3. 🐛 Common Pitfalls

| ❌ Wrong | ✅ Right |
|----------|----------|
| Testing private methods | Test public API only |
| Shared state between tests | Fresh instance per test |
| Testing framework internals | Test your business logic |

---

## 4. ⚡ Performance Tips

1. **Skip TestBed for simple services**:
   ```typescript
   let service = new CounterService();  // Direct instantiation
   ```

2. **Use `firstValueFrom` for async**:
   ```typescript
   const value = await firstValueFrom(service.count$);
   ```

---

## 5. ❓ Interview Questions

**Q: When should you use TestBed vs direct instantiation?**
> Use TestBed when the service has dependencies (other services injected). Use direct `new Service()` for simple services with no DI.

**Q: How do you test an Observable that emits multiple values?**
> Collect values in an array via `subscribe`, then assert on the array after triggering changes.

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  SERVICE TESTING: PURE LOGIC, NO DOM                        │
│                                                             │
│   MINIMAL SETUP:                                            │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ // With dependencies: use TestBed                     │ │
│   │ beforeEach(() => {                                    │ │
│   │   TestBed.configureTestingModule({                    │ │
│   │     providers: [MyService, MockHttp]                  │ │
│   │   });                                                 │ │
│   │   service = TestBed.inject(MyService);                │ │
│   │ });                                                   │ │
│   │                                                       │ │
│   │ // Simple service: just new it!                       │ │
│   │ service = new CounterService();  // No TestBed needed │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   TESTING OBSERVABLES:                                      │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ it('should emit values', () => {                      │ │
│   │   const values: number[] = [];                        │ │
│   │   service.count$.subscribe(v => values.push(v));      │ │
│   │   service.increment();                                │ │
│   │   expect(values).toEqual([0, 1]);                     │ │
│   │ });                                                   │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   TESTING SIGNALS:                                          │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ expect(service.countSignal()).toBe(5);  // Just call! │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Services = pure TypeScript classes = easy to test! Use TestBed only if service has dependencies.

---

## 🧮 Calculator Test Analogy (Easy to Remember!)

Think of service testing like **testing a calculator**:

| Concept | Calculator Analogy | Memory Trick |
|---------|-------------------|--------------| 
| **Service** | 🧮 **Calculator**: Pure logic, no screen | **"Just the brain"** |
| **TestBed.inject** | 🔌 **Get the calculator**: Obtain the device | **"Get instance"** |
| **Call method** | 🔢 **Press buttons**: add(2, 3) | **"Execute function"** |
| **Assert result** | ✅ **Check display**: Should show 5 | **"Verify output"** |
| **No DOM** | 📵 **No screen test**: Just math, no display | **"Pure logic only"** |

### 📖 Story to Remember:

> 🧮 **Testing the Calculator Factory**
>
> You're quality-testing calculators (services):
>
> **Getting the Calculator:**
> ```typescript
> beforeEach(() => {
>   service = TestBed.inject(CalculatorService);  // 🔌 Get one from factory
>   // OR for simple services:
>   service = new CalculatorService();            // 🔧 Build directly
> });
> ```
>
> **Testing it works:**
> ```typescript
> it('should add numbers', () => {
>   // 🔢 Press buttons
>   const result = service.add(2, 3);
>   
>   // ✅ Check display
>   expect(result).toBe(5);
> });
> ```
>
> **Why it's easy:**
> ```
> Component Testing = Test whole phone (screen, buttons, apps)
> Service Testing   = Test just the calculator chip (pure logic)
> 
> No DOM. No templates. Just JavaScript. ✨
> ```

### 🎯 Quick Reference:
```
🧮 Service          = Calculator (pure logic)
🔌 TestBed.inject   = Get calculator from factory
🔧 new Service()    = Build calculator directly
🔢 method()         = Press buttons
✅ expect()         = Check the display
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Service Testing))
    Setup
      TestBed.inject
      Direct new
    Test Targets
      Methods
      Properties
      Observables
      Signals
    Assertions
      toBe
      toEqual
      toHaveBeenCalled
```
