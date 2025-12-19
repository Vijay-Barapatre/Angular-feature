# ⚡ Use Case 3: Effect

> **💡 Lightbulb Moment**: Effects automatically run side effects when their tracked signals change!

---

## 1. 🔍 What is effect()?

Runs a callback whenever any signal it reads changes.

```typescript
import { signal, effect } from '@angular/core';

const name = signal('John');

effect(() => {
    console.log(`Name changed to: ${name()}`);
});

name.set('Jane');  // Logs: "Name changed to: Jane"
```

---

## 2. 🚀 Common Use Cases

### Logging/Analytics
```typescript
effect(() => {
    console.log('User:', this.user());
    analytics.track('user_changed', this.user());
});
```

### LocalStorage Sync
```typescript
effect(() => {
    localStorage.setItem('settings', JSON.stringify(this.settings()));
});
```

### DOM Manipulation
```typescript
effect(() => {
    document.title = `${this.unreadCount()} messages`;
});
```

### 📊 Data Flow Diagram

```mermaid
flowchart LR
    subgraph Signal["📡 Signal"]
        Value["name = signal('John')"]
    end
    
    subgraph Effect["🚨 Effect (Motion Sensor)"]
        Watch["effect(() => console.log(name()))"]
    end
    
    subgraph SideEffect["💡 Side Effect"]
        Log["Console: 'John'"]
    end
    
    Value --> Watch
    Watch --> Log
    
    style Effect fill:#fff3e0,stroke:#ff6f00
```

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  COMPONENT                                                  │
│                                                             │
│   ① CREATE SIGNAL                                           │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ name = signal('John');                                │ │
│   └───────────────────────────────────────────────────────┘ │
│          │                                                  │
│          ▼                                                  │
│   ② REGISTER EFFECT (in constructor)                        │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ effect(() => {                                        │ │
│   │   // 🚨 This callback runs automatically when         │ │
│   │   // any signal it READS changes                      │ │
│   │   console.log(`Hello ${this.name()}!`);               │ │
│   │ });                    │                              │ │
│   │                        │                              │ │
│   │  Angular auto-tracks: "This effect reads name()"      │ │
│   └────────────────────────│──────────────────────────────┘ │
│                            │                                │
│                            ▼                                │
│   ③ SIDE EFFECT EXECUTES                                    │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ Console: "Hello John!"  (runs immediately on setup)   │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ④ SIGNAL CHANGES                                          │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ name.set('Jane');  // 🚶 "Motion detected!"           │ │
│   │      ↓                                                │ │
│   │ Effect automatically re-runs                          │ │
│   │      ↓                                                │ │
│   │ Console: "Hello Jane!"  💡                            │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ⚠️ KEY DIFFERENCES FROM computed():                       │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ • effect() has NO return value (side effects only)    │ │
│   │ • effect() runs EAGERLY (not lazy like computed)      │ │
│   │ • effect() is for: logging, API calls, localStorage   │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Effect Lifecycle:**
1. **Register** effect in constructor (needs injection context)
2. **Auto-track** dependencies: Angular sees which signals are read
3. **Run immediately** on registration
4. **Re-run automatically** whenever tracked signals change
5. **Cleanup** automatically on component destroy

> **Key Takeaway**: `effect()` is a motion sensor - it watches signals and reacts. Use for side effects (logging, localStorage, DOM), NOT for derived values (use `computed()` for that)!

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: effect() vs computed() - what's the difference?
**Answer:**
| computed | effect |
|----------|--------|
| Returns value | No return value |
| For derived data | For side effects |
| Lazy | Eager |
| Pure | Has side effects |

#### Q2: Can you use effect() outside components?
**Answer:** Yes, but you need an injection context:
```typescript
constructor() {
    effect(() => { ... });  // Works - has injection context
}
```

---

### Scenario-Based Questions

#### Scenario: Auto-save Form
**Question:** Auto-save form data when it changes.

**Answer:**
```typescript
formData = signal({ name: '', email: '' });

constructor() {
    effect(() => {
        this.autoSave(this.formData());
    });
}
```

---

## 🚨 Motion Sensor Analogy (Easy to Remember!)

Think of effect() like a **motion sensor light**:

| Concept | Sensor Analogy | Memory Trick |
|---------|---------------|--------------| 
| **effect()** | 🚨 **Motion sensor**: Watches and reacts | **"Auto-reaction"** |
| **Signal** | 🚶 **Motion**: Something changes (movement) | **"The trigger"** |
| **Callback** | 💡 **Light turns on**: Automatic reaction | **"Side effect"** |
| **Auto-tracking** | 👁️ **Smart sensor**: Knows what to watch | **"No manual setup"** |
| **No return** | 🔇 **Just light**: Doesn't produce anything | **"Action only"** |

### 📖 Story to Remember:

> 🚨 **The Smart Home System**
>
> Your app is a smart home with motion sensors:
>
> **Setting up the sensor:**
> ```typescript
> name = signal('John');
>
> constructor() {
>   // 🚨 Install motion sensor
>   effect(() => {
>     // 💡 Light turns on when motion detected
>     console.log(`Hello ${this.name()}!`);
>   });
> }
> ```
>
> **How it works:**
> ```
> name.set('Jane');  // 🚶 Motion detected!
>                    // 💡 Log: "Hello Jane!"
> 
> name.set('Bob');   // 🚶 More motion!
>                    // 💡 Log: "Hello Bob!"
> ```
>
> **Sensor automatically knows WHAT to watch. No wiring needed!**

### 🎯 Quick Reference:
```
🚨 effect()      = Motion sensor (watches & reacts)
🚶 signal()      = Movement (triggers reaction)
💡 callback      = Light (the side effect)
👁️ Auto-track   = Knows what to watch
🔇 No return     = Action only, no value produced
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((effect))
    Purpose
      Side effects
      Reactions
      Sync external
    Triggers
      On signal change
      Automatic tracking
    Use Cases
      Logging
      LocalStorage
      DOM updates
      Analytics
```
