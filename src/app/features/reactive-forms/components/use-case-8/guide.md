# 📡 Use Case 8: Value Changes & Status Observables

> **Goal**: React to form value and status changes using RxJS.

---

## 1. 🔍 How It Works (The Concept)

### The Core Mechanism

Every `FormControl` and `FormGroup` exposes:
- `valueChanges: Observable<any>` - Emits on value change
- `statusChanges: Observable<string>` - Emits VALID, INVALID, PENDING

### 📊 Observable Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#667eea'}}}%%
flowchart LR
    User["User Types"] --> FC["FormControl"]
    FC --> VC["valueChanges.emit()"]
    FC --> SC["statusChanges.emit()"]
    VC --> RxJS["RxJS Operators"]
    RxJS --> Action["API Call / UI Update"]
    
    style VC fill:#667eea,color:#fff
    style SC fill:#764ba2,color:#fff
```

---

## 2. 🚀 Step-by-Step Implementation

### Subscribe to Value Changes

```typescript
this.form.get('search')!.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
).subscribe(value => {
    this.searchService.search(value); // API call
});
```

### Subscribe to Status Changes

```typescript
this.form.get('email')!.statusChanges.subscribe(status => {
    console.log(status); // 'VALID', 'INVALID', 'PENDING'
});
```

### 🛡️ Always Unsubscribe!

```typescript
ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
```

---

## 3. 🌍 Real World Use Cases

1. **Search-as-you-type**: Debounce API calls.
2. **Auto-save**: Save form on value change.
3. **Conditional UI**: Show/hide based on status.

---

## 🧠 Mind Map: Quick Visual Reference

```mermaid
mindmap
  root((Value Changes))
    Observables
      valueChanges
      statusChanges
    RxJS Operators
      debounceTime
      distinctUntilChanged
      switchMap
    Best Practices
      Unsubscribe
      Use async pipe
      Debounce inputs
```
