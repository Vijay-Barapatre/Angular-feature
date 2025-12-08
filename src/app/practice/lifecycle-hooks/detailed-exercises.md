# Lifecycle Hooks - Detailed Exercises

## 🟦 Exercise 1: OnInit / OnDestroy

### Problem
Implement proper initialization and cleanup.

### Solution
```typescript
@Component({ ... })
export class TimerComponent implements OnInit, OnDestroy {
  private intervalId?: ReturnType<typeof setInterval>;
  counter = signal(0);
  
  ngOnInit(): void {
    console.log('Component initialized');
    this.intervalId = setInterval(() => {
      this.counter.update(n => n + 1);
    }, 1000);
  }
  
  ngOnDestroy(): void {
    console.log('Component destroyed');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

## 🟦 Exercise 2: OnChanges

### Problem
React when input properties change.

### Solution
```typescript
export class ChildComponent implements OnChanges {
  @Input() data: any;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      const { previousValue, currentValue, firstChange } = changes['data'];
      console.log('Data changed:', { previousValue, currentValue, firstChange });
    }
  }
}
```

## 🟦 Exercise 3: AfterViewInit

### Problem
Access view children after view initialization.

### Solution
```typescript
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  ngAfterViewInit(): void {
    // Canvas is now available
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx?.fillRect(0, 0, 100, 100);
  }
}
```

## 🟦 Exercise 4: AfterContentInit

### Problem
Access projected content after it's initialized.

### Solution
```typescript
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  
  ngAfterContentInit(): void {
    // Projected tabs are now available
    console.log('Found tabs:', this.tabs.length);
    this.selectTab(0);
  }
  
  selectTab(index: number): void {
    this.tabs.forEach((tab, i) => tab.active = i === index);
  }
}
```
