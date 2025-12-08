# Testing Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: Component Testing
Test component rendering and behavior.

```typescript
describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  });

  it('should increment counter', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });
});
```

### Exercise 2: Service Testing
Test services with mocked dependencies.

### Exercise 3: Pipe Testing
Test custom pipes.

### Exercise 4: Directive Testing
Test attribute and structural directives.

## 🟥 Complex Scenarios

### Scenario 1: HTTP Testing
Mock HttpClient with HttpTestingController.

### Scenario 2: Integration Testing
Test component interactions.

### Scenario 3: Async Testing
Handle async operations in tests.

### Scenario 4: Form Testing
Test reactive forms.

### Scenario 5: Router Testing
Test navigation and guards.
