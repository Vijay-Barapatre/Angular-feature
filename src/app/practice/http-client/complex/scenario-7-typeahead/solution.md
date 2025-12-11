# Scenario 7: Type-ahead Search - Solution

## ✅ Complete Solution

### Step 1: Component Setup

```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
    Subject, Subscription, of,
    debounceTime, distinctUntilChanged, switchMap,
    tap, catchError, finalize
} from 'rxjs';

interface SearchResult {
    id: number;
    name: string;
    category: string;
}

@Component({
    selector: 'app-search',
    template: `
        <input 
            type="text"
            [ngModel]="searchTerm"
            (ngModelChange)="onSearch($event)"
            placeholder="Search products..."
        >
        
        <div *ngIf="loading" class="loading">Searching...</div>
        
        <div class="results">
            <div *ngFor="let result of results" class="result-item">
                {{ result.name }} - {{ result.category }}
            </div>
        </div>
    `
})
export class SearchComponent implements OnInit, OnDestroy {
    private http = inject(HttpClient);
    
    // Subject to push search terms into
    private searchSubject = new Subject<string>();
    private subscription: Subscription | null = null;

    searchTerm = '';
    results: SearchResult[] = [];
    loading = false;

    ngOnInit(): void {
        this.setupSearchPipeline();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    // Called on every keystroke
    onSearch(term: string): void {
        this.searchTerm = term;
        this.searchSubject.next(term);
    }

    private setupSearchPipeline(): void {
        this.subscription = this.searchSubject.pipe(
            // 1. DEBOUNCE: Wait 300ms after user stops typing
            debounceTime(300),

            // 2. DISTINCT: Only proceed if term changed
            distinctUntilChanged(),

            // 3. Show loading
            tap(() => this.loading = true),

            // 4. SWITCHMAP: Cancel previous, start new search
            switchMap(term => {
                // Don't search short terms
                if (term.length < 2) {
                    return of([]);
                }
                return this.http.get<SearchResult[]>(
                    `/api/search?q=${encodeURIComponent(term)}`
                ).pipe(
                    catchError(() => of([]))
                );
            }),

            // 5. Hide loading
            tap(() => this.loading = false)
        ).subscribe(results => {
            this.results = results;
        });
    }
}
```

---

## 🔑 Understanding Each Operator

### debounceTime(300)

```typescript
// Without debounce - fires for every keystroke
input: --l--a--p--t--o--p-->
output: --l--a--p--t--o--p-->  // 6 emissions!

// With debounceTime(300) - waits for pause
input: --l-a-p-t-o-p-------->
output: -----------------laptop->  // 1 emission after 300ms pause
```

### distinctUntilChanged()

```typescript
// Scenario: User types "test", deletes, types "test" again
input: --test--te--test-->
output: --test--te--test-->  // All 3 emit (values are different)

// But if they just retype same thing:
input: --test--test-->
output: --test------->  // Second "test" is ignored
```

### switchMap()

```typescript
// User types fast - each keystroke triggers request
// switchMap CANCELS previous request when new one comes

Time:    0ms    100ms   200ms   300ms   400ms
Input:   'l'    'la'    'lap'   (pause) 
         ↓       ↓       ↓
Request: #1     #2      #3
         ❌      ❌       ✅ Only this completes!
         cancelled  cancelled

// With mergeMap, ALL requests would complete (bad!)
// With switchMap, only LATEST request completes (good!)
```

---

## 📊 Tracking Efficiency Stats

```typescript
// Add stats tracking
stats = {
    keystrokes: 0,
    apiCalls: 0,
    cancelledRequests: 0
};

get savingsPercent(): number {
    if (this.stats.keystrokes === 0) return 0;
    const saved = this.stats.keystrokes - this.stats.apiCalls;
    return Math.round((saved / this.stats.keystrokes) * 100);
}

onSearch(term: string): void {
    this.stats.keystrokes++;
    this.searchSubject.next(term);
}

// In switchMap
switchMap(term => {
    this.stats.apiCalls++;
    return this.http.get<SearchResult[]>(url);
})
```

---

## 🎯 Complete Production-Ready Example

```typescript
@Component({
    selector: 'app-product-search',
    template: `
        <div class="search-container">
            <input 
                type="text"
                [(ngModel)]="searchTerm"
                (ngModelChange)="onSearch($event)"
                placeholder="Search products..."
                class="search-input"
            >
            <span *ngIf="loading" class="spinner">⏳</span>
        </div>
        
        <div class="stats">
            <span>Keystrokes: {{ stats.keystrokes }}</span>
            <span>API Calls: {{ stats.apiCalls }}</span>
            <span>Saved: {{ savingsPercent }}%</span>
        </div>
        
        <div class="results" *ngIf="results.length > 0">
            <div *ngFor="let item of results" class="result-item">
                <span class="name">{{ item.name }}</span>
                <span class="category">{{ item.category }}</span>
            </div>
        </div>
        
        <div class="empty" *ngIf="searchTerm.length >= 2 && results.length === 0 && !loading">
            No results found
        </div>
    `
})
export class ProductSearchComponent implements OnInit, OnDestroy {
    private http = inject(HttpClient);
    private searchSubject = new Subject<string>();
    private destroy$ = new Subject<void>();

    searchTerm = '';
    results: SearchResult[] = [];
    loading = false;
    
    stats = {
        keystrokes: 0,
        apiCalls: 0
    };

    get savingsPercent(): number {
        if (this.stats.keystrokes === 0) return 0;
        return Math.round(
            ((this.stats.keystrokes - this.stats.apiCalls) / this.stats.keystrokes) * 100
        );
    }

    ngOnInit(): void {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.loading = true),
            switchMap(term => {
                if (term.length < 2) {
                    this.loading = false;
                    return of([]);
                }
                this.stats.apiCalls++;
                return this.http.get<SearchResult[]>(`/api/search?q=${term}`).pipe(
                    catchError(() => of([]))
                );
            }),
            tap(() => this.loading = false),
            takeUntil(this.destroy$)
        ).subscribe(results => this.results = results);
    }

    onSearch(term: string): void {
        this.stats.keystrokes++;
        this.searchSubject.next(term);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
```

---

## 💡 Pro Tips

1. **300ms is a good default** for debounce - fast enough to feel responsive
2. **Minimum 2-3 characters** before searching reduces noise
3. **Use `takeUntil`** pattern for clean unsubscription
4. **Show loading state** so users know something is happening
5. **Cache recent searches** for instant results on repeated queries
6. **Consider `auditTime`** instead of `debounceTime` for different UX
