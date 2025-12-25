# 🚦 Use Case 8: Signals Integration in Template-Driven Forms

> **Goal**: Bridge Template-Driven Forms with Angular Signals for reactive, computed state without complex RxJS.

---

## 🏛️ What Problem Does It Solve?

### The "Async Pipe Soup" Problem
*   **The Problem**: Using RxJS observables in templates requires the `async` pipe everywhere, making templates verbose.
*   **The Solution**: Convert form observables to signals with `toSignal()`. Use `computed()` for derived values.
*   **The Benefit**: Cleaner templates with synchronous-looking syntax (`{{ count() }}` vs `{{ count$ | async }}`).

### The "Injection Context" Challenge
*   **The Problem**: `toSignal()` requires an injection context, but the form isn't available until AfterViewInit.
*   **The Solution**: Use `runInInjectionContext()` to create signals after the form is available.

---

## 🔬 Deep Dive: Key Concepts

### A. The Timing Challenge
```typescript
// ❌ PROBLEM: Form doesn't exist in constructor
constructor() {
    this.formSignal = toSignal(this.myForm.valueChanges); // ERROR!
}

// ✅ SOLUTION: Wait for AfterViewInit + injection context
ngAfterViewInit() {
    runInInjectionContext(this.injector, () => {
        this.formSignal = toSignal(this.myForm.valueChanges);
    });
}
```

### B. Signal Types for Forms
| Type | Use Case |
|------|----------|
| `signal()` | Component state that you manually set |
| `toSignal()` | Convert Observable to Signal |
| `computed()` | Derived values (char count, validation) |
| `effect()` | Side effects (logging, saving) |

---

## 1. 🔍 How It Works (The Concept)

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#10b981'}}}%%
flowchart LR
    User[User Input] --> TDForm[Template Form]
    TDForm --> NgForm[NgForm]
    NgForm --> VC[valueChanges$]
    
    subgraph SignalFlow ["Signal Conversion"]
        VC --> |toSignal| Sig[contentSignal]
        Sig --> C1[computed: charCount]
        Sig --> C2[computed: isValid]
        C1 --> Eff[effect: autoSave]
    end
    
    C1 --> Template[Template Binding]
    
    style SignalFlow fill:#f0fdf4,stroke:#22c55e
```

---

## 2. 🚀 Step-by-Step Implementation

### Step 1: Inject the Injector
```typescript
private injector = inject(Injector);
```

### Step 2: Create Basic Signals for Initial State
```typescript
contentSignal = signal('');
statusSignal = signal('INVALID');
```

### Step 3: Create Computed Signals
```typescript
charCount = computed(() => this.contentSignal().length);
remaining = computed(() => this.MAX_CHARS - this.charCount());
canSubmit = computed(() => 
    this.statusSignal() === 'VALID' && this.charCount() > 0
);
```

### Step 4: Bridge Form to Signals in AfterViewInit
```typescript
ngAfterViewInit(): void {
    setTimeout(() => {
        runInInjectionContext(this.injector, () => {
            const content$ = this.myForm.valueChanges!.pipe(
                map(v => v?.content ?? '')
            );
            const contentSig = toSignal(content$, { initialValue: '' });
            
            effect(() => {
                this.contentSignal.set(contentSig() ?? '');
            }, { allowSignalWrites: true });
        });
    });
}
```

### Step 5: Use Signals in Template
```html
<div class="counter">{{ charCount() }} / {{ MAX_CHARS }}</div>
<button [disabled]="!canSubmit()">Submit</button>
```

---

## 3. 🌍 Real World Use Cases

1. **Character Counters**: Twitter-style remaining chars display
2. **Real-time Validation Summary**: Show valid/invalid field count
3. **Conditional UI**: Show/hide panels based on form state signals
4. **Auto-calculated Totals**: Shopping cart line item totals
5. **Form Progress**: Compute completion percentage

---

## 7. ❓ Interview & Practice Questions

### Q1: Why can't you use `toSignal()` directly in ngAfterViewInit?
**A:** `toSignal()` requires an injection context. In ngAfterViewInit, you're outside the context. Use `runInInjectionContext()` to create one.

### Q2: What is `runInInjectionContext()` and why is it needed?
**A:** It creates an injection context where DI-aware functions like `toSignal()` can run. The form isn't available in constructor, so we need this bridge.

### Q3: What's the difference between `signal()` and `toSignal()`?
**A:** `signal()` creates a writable signal you set manually. `toSignal()` creates a read-only signal from an Observable.

### Q4: How do you handle the initial value when form isn't ready?
**A:** Create basic signals with default values first, then update them when the form initializes.

### Q5: Why use `{ allowSignalWrites: true }` in effect?
**A:** By default, effects can't write to signals. This flag allows it, which we need when bridging observables to signals.

### Q6: SCENARIO: Your computed signal needs both form value AND a route parameter. How?
**A:**
```typescript
routeId = toSignal(this.route.params.pipe(map(p => p['id'])));
formValue = signal({});
combined = computed(() => ({
    id: this.routeId(),
    data: this.formValue()
}));
```

### Q7: Can you use `toSignal()` with individual NgModel controls?
**A:** Yes, if you have a ViewChild reference:
```typescript
@ViewChild('emailCtrl') emailCtrl!: NgModel;
// In AfterViewInit:
emailSignal = toSignal(this.emailCtrl.valueChanges);
```

### Q8: How do signals help avoid "ExpressionChangedAfterItHasBeenChecked"?
**A:** Signals trigger their own change detection cycle. Reading a signal in the template is synchronous and predictable.

### Q9: What happens when the component is destroyed?
**A:** Signals created with `toSignal()` automatically unsubscribe. Manual signals don't need cleanup.

### Q10: SCENARIO: You want to debounce form changes before updating a signal. How?
**A:**
```typescript
const debounced$ = this.form.valueChanges.pipe(debounceTime(300));
this.debouncedSignal = toSignal(debounced$, { initialValue: {} });
```

### Q11: How do effects work with Template-Driven form signals?
**A:** Effects run whenever their signal dependencies change. If `contentSignal` updates, all effects reading it re-run.

### Q12: Can you use `computed()` to derive validation state?
**A:**
```typescript
isEmailValid = computed(() => 
    this.emailSignal()?.includes('@') ?? false
);
```

### Q13: SCENARIO: You need to save to localStorage when form changes. Should you use `computed()` or `effect()`?
**A:** `effect()` - localStorage writes are side effects:
```typescript
effect(() => {
    localStorage.setItem('draft', JSON.stringify(this.formSignal()));
});
```

### Q14: How do you access multiple form fields in a computed signal?
**A:**
```typescript
fullName = computed(() => 
    `${this.firstNameSignal()} ${this.lastNameSignal()}`
);
```

### Q15: What's the advantage of signals over `async` pipe for form state?
**A:** 
- Cleaner syntax: `count()` vs `count$ | async`
- Easy composition with `computed()`
- No subscription management
- Glitch-free updates

### Q16: SCENARIO: Your effect is running too often. How do you optimize?
**A:** Use `untracked()` for reads that shouldn't trigger re-runs:
```typescript
effect(() => {
    const count = this.charCount(); // tracks
    const timestamp = untracked(() => Date.now()); // doesn't track
});
```

### Q17: Can signals work with async validators?
**A:** Yes! Create a signal from `statusChanges`:
```typescript
statusSignal = toSignal(this.form.statusChanges, { initialValue: 'INVALID' });
isPending = computed(() => this.statusSignal() === 'PENDING');
```

### Q18: How do you test components with form signals?
**A:**
```typescript
it('should compute char count', () => {
    component.contentSignal.set('hello');
    expect(component.charCount()).toBe(5);
});
```

### Q19: What's the pattern for bidirectional signal-form binding?
**A:** Template forms handle the model. Signals are read-only derived state. Don't try to write back to the form from signals.

### Q20: SCENARIO: You have a wizard form with 5 steps. How do you track progress with signals?
**A:**
```typescript
step1Valid = signal(false);
step2Valid = signal(false);
// ...
completionPercent = computed(() => {
    const completed = [this.step1Valid(), this.step2Valid(), ...]
        .filter(Boolean).length;
    return Math.round((completed / 5) * 100);
});
```
