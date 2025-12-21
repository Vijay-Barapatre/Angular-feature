# 🏭 Use Case 7: useFactory Implementation Example

> **💡 Goal**: Implement a dynamic `AppService` that switches between `ProdService` and `DebugService` based on runtime configuration using `useFactory`.

---

---

## 1. 🛡️ The Problem & Solution

### The Problem: "The Environment Switch" 🔀
Imagine you have a `ProdService` that calls a real API and a `DebugService` that logs to console.
*   **Issue**: You want to use `ProdService` in production and `DebugService` in development.
*   **Constraint**: You don't want to change your component code (`constructor(private svc: AppService)`).
*   **Challenge**: How do you tell Angular to swap the implementation at runtime?

### The Solution: "Factory Provider" 🏭
We use `useFactory` to make the decision at runtime.
*   **Concept**: We write a small function that checks a config flag (`isProduction`).
*   **Result**: The function returns the correct service instance.
*   **Benefit**: The component remains ignorant. It just gets an `AppService` and works.

---

## 2. 📂 File Structure

We have created a modular structure to demonstrate this pattern:

```
use-case-7/
├── service.model.ts            # Abstract AppService class (The Contract)
├── service.implementations.ts  # Concrete implementations (Prod & Debug)
├── config.token.ts             # InjectionToken for Config
├── use-factory-example.component.ts    # Main component with useFactory provider
└── guide.md                    # This documentation
```

---

## 2. 📝 The Code Explained

### Step 1: The Contract (`service.model.ts`)
We define an abstract class `AppService`. This is what components will ask for (inject).

```typescript
export abstract class AppService {
    abstract getData(): void;
}
```

### Step 2: The Implementations (`service.implementations.ts`)
We create two different versions of the service. Both require `HttpClient`.

*   **ProdService**: Production logic.
*   **DebugService**: Debug logic.

```typescript
@Injectable()
export class ProdService implements AppService {
    constructor(private http: HttpClient) {}
    getData() { console.log('[ProdService] 🔴 Fetching production data...'); }
}

@Injectable()
export class DebugService implements AppService {
    constructor(private http: HttpClient) {}
    getData() { console.log('[DebugService] 🟢 Fetching debug data...'); }
}
```

### Step 3: The Configuration (`config.token.ts`)
We use an `InjectionToken` for configuration.

```typescript
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
```

### Step 4: The Factory Provider (`use-factory-example.component.ts`)
This is where the magic happens! We provide `AppService` using `useFactory`.

```typescript
providers: [
    // 1. Provide the configuration
    { provide: APP_CONFIG, useValue: DEBUG_CONFIG },

    // 2. Provide the AppService dynamically
    {
        provide: AppService, 
        
        // 🏭 Factory Function
        useFactory: (http: HttpClient, config: AppConfig) => {
            console.log('🏭 Factory running!');
            
            if (config.isProduction) {
                return new ProdService(http);
            } else {
                return new DebugService(http);
            }
        },
        
        // 🔧 Dependencies (Injected into factory)
        deps: [HttpClient, APP_CONFIG]
    }
]
```

---

## 3. 🚀 How It Works (Runtime Flow)

1.  Angular creates `UseFactoryExampleComponent`.
2.  It sees the component needs `AppService`.
3.  It looks up the provider for `AppService`.
4.  It sees `useFactory`, so it prepares to call it.
5.  **Dependency Injection**: It resolves `HttpClient` and `APP_CONFIG` (from `deps`) and passes them to the factory.
6.  **Factory Logic**: The function checks `config.isProduction`.
7.  **Creation**: It creates either `ProdService` or `DebugService`, passing `http` to the constructor.
8.  **Injection**: The created instance is injected into the component.

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  useFactory FLOW                                            │
│                                                             │
│   ① DEFINE PROVIDER                                         │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ {                                                     │ │
│   │   provide: AppService,                                │ │
│   │   useFactory: (http, config) => { ... },              │ │
│   │   deps: [HttpClient, APP_CONFIG]                      │ │
│   │ }                                                     │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ② INJECTION REQUEST                                       │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ Component asks for: AppService                        │ │
│   │        │                                              │ │
│   │        ▼                                              │ │
│   │  Angular resolves deps:                               │ │
│   │     1. HttpClient ➔ (Instance)                        │ │
│   │     2. APP_CONFIG ➔ { isProduction: ... }             │ │
│   │        │                                              │ │
│   │        ▼                                              │ │
│   │  Factory(http, config) runs                           │ │
│   │        │                                              │ │
│   │        ├── [IF PROD] ──➔ return new ProdService(http) │ │
│   │        │                                              │ │
│   │        └── [ELSE] ─────➔ return new DebugService(http)│ │
│   │                                     │                 │ │
│   │                                     ▼                 │ │
│   │  Component receives: Service Instance                 │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. 🕵️ Deep Dive: Why do we need `deps`?

You might wonder: **"In Use Case 1, we didn't need a `deps` array. Why here?"**

### The Difference: Class vs. Function

1.  **Use Case 1 (Standard Class Injection)**:
    *   **Code**: `constructor(private http: HttpClient) {}`
    *   **How it works**: Angular uses TypeScript metadata (decorators like `@Injectable`) to inspect the class constructor. It "sees" that you need `HttpClient` and automatically injects it. It's smart! 🧠

2.  **Use Case 7 (Factory Function)**:
    *   **Code**: `useFactory: (http, config) => { ... }`
    *   **The Problem**: A function is just raw code. At runtime (especially after minification), the argument names `http` and `config` might become `a` and `b`. Angular **cannot** look at a function and guess what `a` and `b` are supposed to be. It's "blind" here. 🙈
    *   **The Solution (`deps`)**: You must explicitly provide a **map**.
        *   `deps: [HttpClient, APP_CONFIG]` tells Angular:
            *   "For the 1st argument, please inject `HttpClient`."
            *   "For the 2nd argument, please inject `APP_CONFIG`."

> **⚠️ Critical**: The order in `deps` MUST match the order of arguments in your factory function!

---

---

## 5. 🆚 Comparison: Use Case 1 vs. Use Case 7

You asked: **"How is `private appService: AppService` different from Use Case 1?"**

### 1. In the Component (The Consumer)
**There is NO difference!** 😲

*   **Use Case 1**: `constructor(private dataService: DataService)`
*   **Use Case 7**: `constructor(private appService: AppService)`

In both cases, the component just says: *"I need something that matches this token."* It doesn't know (or care) how that service is created. This is the beauty of Dependency Injection!

### 2. In the Provider (The Creator)
**This is where they differ.**

| Feature | Use Case 1 (Standard) | Use Case 7 (Factory) |
| :--- | :--- | :--- |
| **Provider** | `providers: [DataService]` | `providers: [{ provide: ..., useFactory: ... }]` |
| **Creation Logic** | **Automatic**. Angular calls `new DataService()`. | **Manual**. Angular runs *your* function. |
| **Dependencies** | **Auto-detected** from constructor metadata. | **Manually mapped** using `deps` array. |
| **Flexibility** | Low. Always gets the same class. | High. Can return *different* classes based on logic. |

---

## 6. 🧠 Key Takeaways

*   **Dynamic**: You can choose dependencies at runtime.
*   **Dependencies**: Factory functions can have their own dependencies (like `HttpClient`).
*   **Decoupled**: The component just asks for `AppService`.

---

## 7. ❓ Interview Questions

### Q: Why use `deps`?
**A:** The `deps` array tells Angular which services to inject into your factory function. The order in `deps` must match the order of arguments in your factory function.

### Q: Can I inject `HttpClient` into a factory?
**A:** Yes! Just add `HttpClient` to the `deps` array and add it as an argument to your factory function.

### Q: Can I pass a value (like `DEBUG_CONFIG`) directly into `deps`?
**A:** **No.** The `deps` array only accepts **Injection Tokens** (classes, `InjectionToken`, or string tokens). Angular uses these tokens to *look up* providers. It cannot use a raw object value as a lookup key. You must provide the value using a token (like `APP_CONFIG`) and then put that token in `deps`.

❌ **Wrong:** `deps: [DEBUG_CONFIG]`
✅ **Right:** `deps: [APP_CONFIG]` (where `APP_CONFIG` is provided with `useValue: DEBUG_CONFIG`)
