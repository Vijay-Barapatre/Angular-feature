# Services & DI - Detailed Exercises

## 🟦 Exercise 1: Basic Service

### Problem
Create a simple service with state management.

### Solution
```typescript
@Injectable({ providedIn: 'root' })
export class CounterService {
  private count = signal(0);
  
  readonly value = this.count.asReadonly();
  
  increment(): void { this.count.update(n => n + 1); }
  decrement(): void { this.count.update(n => n - 1); }
  reset(): void { this.count.set(0); }
}

// Usage in component
@Component({ ... })
export class CounterComponent {
  counter = inject(CounterService);
}
```

## 🟦 Exercise 2: inject() Function

### Problem
Use modern inject() instead of constructor injection.

### Solution
```typescript
// Modern approach (Angular 14+)
@Component({ ... })
export class ProfileComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
}

// Classic approach
@Component({ ... })
export class ProfileComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
```

## 🟦 Exercise 3: Providers

### Problem
Understand different provider configurations.

### Solution
```typescript
// Root provider (singleton)
@Injectable({ providedIn: 'root' })
export class GlobalService { }

// Component-level (instance per component)
@Component({
  providers: [LocalService]
})
export class MyComponent { }

// useClass - provide different implementation
providers: [
  { provide: DataService, useClass: MockDataService }
]

// useValue - provide constant
providers: [
  { provide: API_URL, useValue: 'https://api.example.com' }
]

// useFactory - create dynamically
providers: [
  {
    provide: LoggerService,
    useFactory: (config: Config) => 
      config.debug ? new DebugLogger() : new ProdLogger(),
    deps: [Config]
  }
]
```

## 🟦 Exercise 4: Injection Tokens

### Problem
Inject non-class dependencies.

### Solution
```typescript
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

// Provide
providers: [
  { provide: API_URL, useValue: 'https://api.example.com' }
]

// Inject
@Component({ ... })
export class ApiComponent {
  private apiUrl = inject(API_URL);
}
```
