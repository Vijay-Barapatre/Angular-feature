# 🏭 Use Case 3: useFactory Provider

> **💡 Lightbulb Moment**: useFactory lets you create dependencies dynamically based on runtime conditions!

---

## 1. 🔍 What is useFactory?

A factory function that returns the dependency value.

```typescript
providers: [
    {
        provide: Logger,
        useFactory: () => {
            return environment.production ? new ProductionLogger() : new DebugLogger();
        }
    }
]
```

---

## 2. 🚀 Factory with Dependencies

```typescript
providers: [
    {
        provide: DataService,
        useFactory: (http: HttpClient, config: AppConfig) => {
            return new DataService(http, config.apiUrl);
        },
        deps: [HttpClient, APP_CONFIG]  // Dependencies passed to factory
    }
]
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: When use useFactory vs useValue?
**Answer:**
| useValue | useFactory |
|----------|------------|
| Static value | Dynamic creation |
| Simple config | Complex initialization |
| No dependencies | Needs other services |

#### Q2: What is the deps array?
**Answer:** Lists dependencies that Angular should inject into the factory function.

---

### Scenario-Based Questions

#### Scenario: Feature Flag Service
**Question:** Create service that behaves differently based on environment.

**Answer:**
```typescript
{
    provide: FeatureService,
    useFactory: (http: HttpClient, config: AppConfig) => {
        if (config.useRemoteFeatures) {
            return new RemoteFeatureService(http);
        }
        return new LocalFeatureService();
    },
    deps: [HttpClient, APP_CONFIG]
}
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((useFactory))
    Purpose
      Dynamic creation
      Runtime decisions
      Complex init
    Syntax
      Factory function
      deps array
    Use Cases
      Environment config
      Feature flags
      A/B testing
```
