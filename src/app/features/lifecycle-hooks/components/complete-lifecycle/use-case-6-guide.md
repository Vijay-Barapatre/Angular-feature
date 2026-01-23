# 🎬 Complete Lifecycle Order Demo

> **Goal**: Understand the exact execution order of ALL Angular lifecycle hooks.

---

## 1. 🔍 The Complete Lifecycle Order

```mermaid
graph TD
    A["1. constructor"] --> B["2. ngOnChanges"]
    B --> C["3. ngOnInit"]
    C --> D["4. ngDoCheck"]
    D --> E["5. ngAfterContentInit"]
    E --> F["6. ngAfterContentChecked"]
    F --> G["7. ngAfterViewInit"]
    G --> H["8. ngAfterViewChecked"]
    
    I["Component in use"] --> J["ngOnChanges (on input change)"]
    J --> K["ngDoCheck"]
    K --> L["ngAfterContentChecked"]
    L --> M["ngAfterViewChecked"]
    
    N["Component destroyed"] --> O["9. ngOnDestroy"]

    style A fill:#6b7280,stroke:#374151
    style C fill:#4ade80,stroke:#16a34a
    style E fill:#f59e0b,stroke:#d97706
    style G fill:#ec4899,stroke:#db2777
    style O fill:#f87171,stroke:#dc2626
```

---

## 2. 📊 Lifecycle Summary Table

| # | Hook | Frequency | Purpose |
|---|------|-----------|---------|
| 1 | `constructor` | Once | Class instantiation, DI |
| 2 | `ngOnChanges` | On input change | React to @Input changes |
| 3 | `ngOnInit` | Once | Initialize component |
| 4 | `ngDoCheck` | Every CD | Custom change detection |
| 5 | `ngAfterContentInit` | Once | Content projection ready |
| 6 | `ngAfterContentChecked` | Every CD | Content checked |
| 7 | `ngAfterViewInit` | Once | View initialized |
| 8 | `ngAfterViewChecked` | Every CD | View checked |
| 9 | `ngOnDestroy` | Once | Cleanup |

---

## 3. 🚀 Implementation (All Hooks)

```typescript
@Component({ ... })
export class LifecycleDemoComponent implements
    OnChanges, OnInit, DoCheck,
    AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() message = '';
  @ViewChild('ref') viewRef!: ElementRef;
  @ContentChild('content') contentRef!: ElementRef;

  constructor() {
    console.log('1. constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('2. ngOnChanges', changes);
  }

  ngOnInit() {
    console.log('3. ngOnInit');
  }

  ngDoCheck() {
    console.log('4. ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('5. ngAfterContentInit');
    // @ContentChild available here
  }

  ngAfterContentChecked() {
    console.log('6. ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('7. ngAfterViewInit');
    // @ViewChild available here
  }

  ngAfterViewChecked() {
    console.log('8. ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('9. ngOnDestroy');
  }
}
```

---

## 4. 🔑 Key Rules to Remember

### Initialization Hooks (Run Once)
- `ngOnInit` → General initialization
- `ngAfterContentInit` → Content ready
- `ngAfterViewInit` → View ready

### Check Hooks (Run Frequently)
- `ngDoCheck` → Every CD cycle
- `ngAfterContentChecked` → Every CD cycle
- `ngAfterViewChecked` → Every CD cycle

### Cleanup Hook
- `ngOnDestroy` → Final cleanup opportunity

---

## 5. ❓ Interview & Concept Questions

### Q1: What runs first: `ngOnChanges` or `ngOnInit`?
**A:** `ngOnChanges` runs first (with initial input values), then `ngOnInit`.

### Q2: When is `@ViewChild` available?
**A:** From `ngAfterViewInit` onwards.

### Q3: When is `@ContentChild` available?
**A:** From `ngAfterContentInit` onwards.

### Q4: Which hooks run on *every* change detection cycle?
**A:** `ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked`.

### Q5: What's the order: Content or View first?
**A:** **Content first.** `ngAfterContentInit` runs before `ngAfterViewInit`.

---

## 6. 📝 Quick Reference Card

```
CREATION:
  constructor → ngOnChanges → ngOnInit → ngDoCheck →
  ngAfterContentInit → ngAfterContentChecked →
  ngAfterViewInit → ngAfterViewChecked

UPDATES (repeated):
  ngOnChanges → ngDoCheck →
  ngAfterContentChecked → ngAfterViewChecked

DESTRUCTION:
  ngOnDestroy
```


