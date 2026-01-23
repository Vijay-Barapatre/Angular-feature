# 🏭 useFactory Implementation Example

> **💡 Goal**: Implement a dynamic `AppService` that switches between `ProdService` and `DebugService` based on runtime configuration using `useFactory`.


## 📋 Table of Contents
- [1. 🛡️ The Problem & Solution](#1--the-problem--solution)
  - [The Problem: "The Environment Switch" 🔀](#the-problem-the-environment-switch)
  - [The Solution: "Factory Provider" 🏭](#the-solution-factory-provider)
- [2. 📂 File Structure](#2--file-structure)
- [2. 📝 The Code Explained](#2--the-code-explained)
  - [Step 1: The Contract (`service.model.ts`)](#step-1-the-contract-servicemodelts)
  - [Step 2: The Implementations (`service.implementations.ts`)](#step-2-the-implementations-serviceimplementationsts)
  - [Step 3: The Configuration (`config.token.ts`)](#step-3-the-configuration-configtokents)
  - [Step 4: The Factory Provider (`use-factory-example.component.ts`)](#step-4-the-factory-provider-use-factory-examplecomponentts)
- [3. 🔍 Deep Dive: Code Breakdown](#3--deep-dive-code-breakdown)
  - [🏭 The "Factory Logic" (Step-by-Step)](#the-factory-logic-step-by-step)
    - [1. The Provider Configuration (`use-factory-example.component.ts`)](#1-the-provider-configuration-use-factory-examplecomponentts)
    - [2. The Abstract Contract (`service.model.ts`)](#2-the-abstract-contract-servicemodelts)
    - [3. The Concrete Implementations (`service.implementations.ts`)](#3-the-concrete-implementations-serviceimplementationsts)
    - [4. The Consumption (`use-factory-example.component.ts`)](#4-the-consumption-use-factory-examplecomponentts)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)
- [4. 🕵️ Deep Dive: Why do we need `deps`?](#4--deep-dive-why-do-we-need-deps)
  - [The Difference: Class vs. Function](#the-difference-class-vs-function)
- [5. 🆚 Comparison: vs. You asked: **"How is `private appService: AppService` different from ?"**](#5--comparison-vs-you-asked-how-is-private-appservice-appservice-different-from)
  - [1. In the Component (The Consumer)](#1-in-the-component-the-consumer)
  - [2. In the Provider (The Creator)](#2-in-the-provider-the-creator)
- [6. 🧠 Key Takeaways](#6--key-takeaways)
- [🌍 Real-World Use Cases](#real-world-use-cases)
  - [1. API Mocking (Dev vs Prod)](#1-api-mocking-dev-vs-prod)
  - [2. Feature Toggling](#2-feature-toggling)
  - [3. Localization / i18n](#3-localization--i18n)
  - [4. AB Testing](#4-ab-testing)
  - [5. Tenant-Specific Configuration](#5-tenant-specific-configuration)
- [❓ Complete Interview Questions (20+)](#complete-interview-questions-20)
  - [Basic Questions](#basic-questions)
  - [Scenario-Based Questions](#scenario-based-questions)
  - [Advanced Questions](#advanced-questions)

---
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

## 3. 🔍 Deep Dive: Code Breakdown

This implementation uses **7 Key Points** to make the magic happen:

### 🏭 The "Factory Logic" (Step-by-Step)

This pattern allows Angular to **dynamically choose** which service to create at runtime.

#### 1. The Provider Configuration (`use-factory-example.component.ts`)

This is the most critical part. We tell Angular: *"Don't just use a class. Run THIS function to get the service."*

```typescript
providers: [
  // 1️⃣ CONFIGURATION
  // We provide the configuration first. This is what the factory will read.
  // We use 'useValue' because the config is just a static object (DEBUG_CONFIG).
  { provide: APP_CONFIG, useValue: DEBUG_CONFIG },

  // 2️⃣ THE FACTORY PROVIDER
  {
    provide: AppService, // 👈 The Token: Components will ask for "AppService"

    // 🏭 THE FACTORY FUNCTION
    // This function runs when the component is created.
    // It receives the dependencies we listed in 'deps' below.
    useFactory: (http: HttpClient, config: AppConfig) => {
      
      // 🔍 POINT 1: RUNTIME LOGIC
      // We can run ANY javascript here. We check the config flag.
      console.log('🏭 Factory running! Is Production?', config.isProduction);

      if (config.isProduction) {
        // 🔴 POINT 2: MANUAL CREATION (Prod)
        // If prod, we manually "new up" the ProdService.
        // We MUST pass 'http' because ProdService expects it in its constructor.
        return new ProdService(http);
      } else {
        // 🟢 POINT 3: MANUAL CREATION (Debug)
        // If debug, we create the DebugService.
        return new DebugService(http);
      }
    },

    // 🔗 POINT 4: THE MAP (deps)
    // This array tells Angular WHAT to inject into the factory function arguments.
    // Order matches the function arguments above!
    // [0] HttpClient -> becomes 'http' argument
    // [1] APP_CONFIG -> becomes 'config' argument
    deps: [HttpClient, APP_CONFIG] 
  }
]
```

#### 2. The Abstract Contract (`service.model.ts`)

This is the "Interface". The component talks to *this*, not the specific implementations.

```typescript
// 📄 POINT 5: THE CONTRACT
// We use an abstract class so it can be used as a Token (interfaces can't be tokens).
export abstract class AppService {
    abstract getData(): void;
}
```

#### 3. The Concrete Implementations (`service.implementations.ts`)

These are the actual workers. They both "sign the contract" (implement `AppService`).

```typescript
@Injectable()
export class ProdService implements AppService {
    // 🧱 POINT 6: SHARED DEPENDENCIES
    // Both services need HttpClient, so our Factory must provide it.
    constructor(private http: HttpClient) {} 
    getData() { console.log('🔴 Production API Call'); }
}

@Injectable()
export class DebugService implements AppService {
    constructor(private http: HttpClient) {}
    getData() { console.log('🟢 Fake/Debug Data'); }
}
```

#### 4. The Consumption (`use-factory-example.component.ts`)

The component is kept completely ignorant of the complexity!

```typescript
export class UseFactoryExampleComponent {
  constructor(
    // 🪄 POINT 7: THE MAGIC
    // The component asks for 'AppService'.
    // It has NO IDEA that a factory ran.
    // It has NO IDEA if it got ProdService or DebugService.
    private appService: AppService
  ) { }

  ngOnInit() {
    // Calls the method on whichever instance was created
    this.appService.getData(); 
  }
}
```

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

You might wonder: **"In , we didn't need a `deps` array. Why here?"**

### The Difference: Class vs. Function

1.  **(Standard Class Injection)**:
    *   **Code**: `constructor(private http: HttpClient) {}`
    *   **How it works**: Angular uses TypeScript metadata (decorators like `@Injectable`) to inspect the class constructor. It "sees" that you need `HttpClient` and automatically injects it. It's smart! 🧠

2.  **(Factory Function)**:
    *   **Code**: `useFactory: (http, config) => { ... }`
    *   **The Problem**: A function is just raw code. At runtime (especially after minification), the argument names `http` and `config` might become `a` and `b`. Angular **cannot** look at a function and guess what `a` and `b` are supposed to be. It's "blind" here. 🙈
    *   **The Solution (`deps`)**: You must explicitly provide a **map**.
        *   `deps: [HttpClient, APP_CONFIG]` tells Angular:
            *   "For the 1st argument, please inject `HttpClient`."
            *   "For the 2nd argument, please inject `APP_CONFIG`."

> **⚠️ Critical**: The order in `deps` MUST match the order of arguments in your factory function!

---

---

## 5. 🆚 Comparison: vs. You asked: **"How is `private appService: AppService` different from ?"**

### 1. In the Component (The Consumer)
**There is NO difference!** 😲

*   ****: `constructor(private dataService: DataService)`
*   ****: `constructor(private appService: AppService)`

In both cases, the component just says: *"I need something that matches this token."* It doesn't know (or care) how that service is created. This is the beauty of Dependency Injection!

### 2. In the Provider (The Creator)
**This is where they differ.**

| Feature | (Standard) | (Factory) |
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

---

## 🌍 Real-World Use Cases

### 1. API Mocking (Dev vs Prod)
The classic example. Using a real HTTP service in production (`PropApi`) and a static JSON returner in development (`MockApi`).

### 2. Feature Toggling
Enabled/Disabling features based on a server-side flag fetched at startup.
```typescript
useFactory: (flags) => flags.isNewDashboard ? new NewDashboardService() : new LegacyDashboardService()
```

### 3. Localization / i18n
Loading different `LanguageService` implementations based on the browser's locale (detected at runtime).

### 4. AB Testing
Randomly assigning a user to "Variant A" or "Variant B" service for an experiment.

### 5. Tenant-Specific Configuration
In a multi-tenant app (SaaS), reading the subdomain (`customer.app.com`) and creating a `TenantService` configured specifically for that customer.

---

## ❓ Complete Interview Questions (20+)

### Basic Questions

**Q1: Why use `useFactory` over `useClass`?**
> A: When creation requires runtime logic (ifs/else) or configuration dependency.

**Q2: What is the `deps` array for?**
> A: Maps tokens to factory function arguments.

**Q3: Can `useFactory` return a primitive?**
> A: Yes (e.g., a connection string).

**Q4: Is the factory run multiple times?**
> A: Only if the provider is non-singleton (component level) or requested multiple times in different scopes.

**Q5: Can I use async logic in `useFactory`?**
> A: No, must return instance synchronously.

---

### Scenario-Based Questions

**Q6: Scenario: 3rd Party Library needs a config object.**
> A: Use factory to create the library instance with the config injected from `APP_CONFIG`.

**Q7: Scenario: Recursive Dependencies.**
> A: Be careful! Factory A needs B, B needs A = Error.

**Q8: Scenario: Runtime switch.**
> A: Check config, return `new ClassA()` or `new ClassB()`.

**Q9: Scenario: Passing static string to service.**
> A: Wrap string in `InjectionToken`, inject it into factory.

**Q10: Scenario: Reading Browser specific API.**
> A: Check `PLATFORM_ID`, returns mock if server, real if browser.

---

### Advanced Questions

**Q11: Can `inject()` be used inside `useFactory`?**
> A: Yes, in modern Angular.

**Q12: How to test `useFactory`?**
> A: Test the factory function as a standalone function.

**Q13: Does strict mode affect `deps`?**
> A: Yes, types must match.

**Q14: Can I use `useFactory` with `providedIn: 'root'`?**
> A: Yes!

**Q15: What if I want to return an Observable?**
> A: Use `APP_INITIALIZER` token, not a regular service provider.

**Q16: Can I update the service later?**
> A: No, once created, the instance is fixed for that injector.

**Q17: Difference from `useValue`?**
> A: `useValue` is static/constant. `useFactory` computes the value.

**Q18: Performance cost?**
> A: Negligible, runs once per injector.

**Q19: Can multiple factories depend on each other?**
> A: Yes, standard DI resolution applies.

**Q20: Is `deps` required if using `inject()`?**
> A: No.
