# 🟦 Testing Exercises Documentation

## Exercise 1: Component Testing
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment counter', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });

  it('should render count in template', () => {
    component.count.set(5);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.count');
    expect(el.textContent).toContain('5');
  });
});
```

## Exercise 2: Service Testing
```typescript
describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch data', () => {
    const mockData = [{ id: 1, name: 'Test' }];
    
    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

## Exercise 3: Pipe Testing
```typescript
describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should truncate long text', () => {
    const result = pipe.transform('Hello World', 5);
    expect(result).toBe('Hello...');
  });

  it('should not truncate short text', () => {
    const result = pipe.transform('Hi', 10);
    expect(result).toBe('Hi');
  });
});
```

## Exercise 4: Directive Testing
```typescript
@Component({
  template: `<div appHighlight>Test</div>`
})
class TestHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HighlightDirective],
      declarations: [TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should highlight on hover', () => {
    const div = fixture.nativeElement.querySelector('div');
    div.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(div.style.backgroundColor).toBe('yellow');
  });
});
```
