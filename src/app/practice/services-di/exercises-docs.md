# Services & DI Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: Basic Service
Create service with @Injectable.

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private data = signal<string[]>([]);
  
  getData() { return this.data(); }
  addItem(item: string) { 
    this.data.update(d => [...d, item]); 
  }
}
```

### Exercise 2: inject() Function
Modern DI with inject().

### Exercise 3: Providers
Different provider configurations.

### Exercise 4: Injection Tokens
Inject non-class dependencies.

## 🟥 Complex Scenarios

### Scenario 1: Hierarchical DI
Service instances per component tree.

### Scenario 2: Factory Providers
Create services with runtime config.

### Scenario 3: Multi Providers
Collect multiple implementations.

### Scenario 4: Optional Dependencies
Handle missing services gracefully.

### Scenario 5: Service Scope
Control service lifetime.
