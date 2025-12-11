# Scenario 5: Polling & Retry Logic - Solution

## ✅ Complete Solution

### Basic Polling Implementation

```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
    interval, Subscription, Subject,
    switchMap, takeUntil, retry, catchError, of, tap
} from 'rxjs';

@Component({...})
export class PollingComponent implements OnInit, OnDestroy {
    private http = inject(HttpClient);
    private destroy$ = new Subject<void>();
    private pollingSubscription: Subscription | null = null;

    notifications: string[] = [];
    isPolling = false;
    lastFetch: Date | null = null;
    pollingInterval = 5000; // 5 seconds

    startPolling(): void {
        if (this.isPolling) return;
        
        this.isPolling = true;
        
        this.pollingSubscription = interval(this.pollingInterval).pipe(
            // Make HTTP call for each interval tick
            switchMap(() => this.http.get<string[]>('/api/notifications').pipe(
                // Retry up to 3 times on failure
                retry(3),
                // If still fails, return empty and continue polling
                catchError(err => {
                    console.error('Fetch failed:', err);
                    return of([]);
                })
            )),
            // Auto-unsubscribe when component destroys
            takeUntil(this.destroy$)
        ).subscribe(data => {
            this.notifications = data;
            this.lastFetch = new Date();
        });
    }

    stopPolling(): void {
        this.pollingSubscription?.unsubscribe();
        this.isPolling = false;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
```

### Advanced: Exponential Backoff Retry

```typescript
import { timer, throwError, Observable } from 'rxjs';
import { retryWhen, delayWhen, scan, tap } from 'rxjs/operators';

// Custom operator for exponential backoff
function retryWithBackoff<T>(
    maxRetries: number = 3,
    initialDelay: number = 1000
): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => source.pipe(
        retryWhen(errors => errors.pipe(
            // Track retry count
            scan((retryCount, error) => {
                if (retryCount >= maxRetries) {
                    throw error; // Give up
                }
                return retryCount + 1;
            }, 0),
            // Log retry attempt
            tap(retryCount => {
                console.log(`Retry attempt ${retryCount}/${maxRetries}`);
            }),
            // Exponential delay: 1s, 2s, 4s, 8s...
            delayWhen(retryCount => 
                timer(initialDelay * Math.pow(2, retryCount - 1))
            )
        ))
    );
}

// Usage
this.http.get('/api/data').pipe(
    retryWithBackoff(3, 1000) // 3 retries, starting at 1s
).subscribe();
```

### Polling with Stop Condition

```typescript
import { takeWhile } from 'rxjs/operators';

// Poll until condition is met
interval(5000).pipe(
    switchMap(() => this.http.get<Order>('/api/orders/123')),
    // Stop when order is complete
    takeWhile(order => order.status !== 'COMPLETE', true),
    takeUntil(this.destroy$)
).subscribe(order => {
    this.order = order;
    if (order.status === 'COMPLETE') {
        console.log('Order complete! Polling stopped.');
    }
});
```

## 🔑 Key Concepts

### interval vs timer

```typescript
// interval - emits 0, 1, 2... every N ms (starts after first interval)
interval(5000).subscribe(n => console.log(n));
// Output at: 5s, 10s, 15s...

// timer - emits once after delay, OR repeatedly
timer(0, 5000).subscribe(n => console.log(n));
// Output at: 0s, 5s, 10s, 15s... (immediate first)
```

### Why switchMap for Polling?

```typescript
// switchMap cancels previous request if new interval tick arrives
interval(5000).pipe(
    switchMap(() => this.http.get('/api/data'))
).subscribe();

// If request takes 6 seconds, the response from 
// the first interval is ignored when second tick arrives
// This prevents stale data accumulation
```

### Proper Cleanup

```typescript
@Component({...})
export class MyComponent implements OnDestroy {
    private destroy$ = new Subject<void>();

    ngOnInit() {
        // All subscriptions auto-cleanup
        interval(5000).pipe(
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
```

## 📝 Complete Working Example

```typescript
@Component({
    template: `
        <div class="polling-status">
            <span [class.active]="isPolling">
                {{ isPolling ? '🟢 Polling Active' : '🔴 Polling Stopped' }}
            </span>
            <span>Interval: {{ pollingInterval / 1000 }}s</span>
            <span *ngIf="lastFetch">
                Last: {{ lastFetch | date:'HH:mm:ss' }}
            </span>
        </div>
        
        <div class="notifications">
            <div *ngFor="let n of notifications">{{ n }}</div>
        </div>
        
        <button (click)="isPolling ? stopPolling() : startPolling()">
            {{ isPolling ? 'Stop' : 'Start' }} Polling
        </button>
    `
})
export class NotificationsComponent implements OnDestroy {
    private http = inject(HttpClient);
    private destroy$ = new Subject<void>();
    private polling$: Subscription | null = null;

    notifications: string[] = [];
    isPolling = false;
    lastFetch: Date | null = null;
    pollingInterval = 5000;

    startPolling(): void {
        this.isPolling = true;
        
        // Immediate first fetch, then every 5 seconds
        this.polling$ = timer(0, this.pollingInterval).pipe(
            switchMap(() => this.http.get<string[]>('/api/notifications').pipe(
                retryWithBackoff(3, 1000),
                catchError(() => of([]))
            )),
            tap(() => this.lastFetch = new Date()),
            takeUntil(this.destroy$)
        ).subscribe(data => this.notifications = data);
    }

    stopPolling(): void {
        this.polling$?.unsubscribe();
        this.isPolling = false;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
```

## 💡 Pro Tips

1. **Use `timer(0, interval)`** for immediate first fetch
2. **Always use `takeUntil`** for automatic cleanup
3. **Use `switchMap`** to prevent stale responses
4. **Implement backoff** to avoid hammering failing servers
5. **Show retry status** to users for transparency
