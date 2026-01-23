# 📶 Offline Detection


## 📋 Table of Contents
- [🎯 What Problem Does It Solve?](#what-problem-does-it-solve)
  - [The Problem](#the-problem)
  - [How Offline Detection Solves It](#how-offline-detection-solves-it)
  - [Benefits](#benefits)
- [🔍 How It Works (The Concept)](#how-it-works-the-concept)
  - [Ecosystem](#ecosystem)
- [🚀 Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
  - [1. Observe Window Events](#1-observe-window-events)
  - [2. Initial Check](#2-initial-check)
- [📚 Detailed API & Observable Explanations](#detailed-api--observable-explanations)
  - [1. navigator.onLine (Browser API)](#1-navigatoronline-browser-api)
  - [2. window 'online' and 'offline' Events](#2-window-online-and-offline-events)
  - [3. RxJS fromEvent() Operator](#3-rxjs-fromevent-operator)
  - [4. RxJS merge() Operator](#4-rxjs-merge-operator)
  - [5. RxJS map() Operator](#5-rxjs-map-operator)
  - [6. Heartbeat Pattern (Robust Connectivity Check)](#6-heartbeat-pattern-robust-connectivity-check)
- [🐛 Common Pitfalls & Debugging](#common-pitfalls--debugging)
  - [1. False Positives](#1-false-positives)
  - [2. Testing](#2-testing)
- [⚡ Performance & Architecture](#performance--architecture)
- [🌍 Real World Use Cases](#real-world-use-cases)
  - [1. Field Service & Technician Apps](#1-field-service--technician-apps)
  - [2. Messaging & Chat Applications](#2-messaging--chat-applications)
  - [3. Documentation & Reading Apps](#3-documentation--reading-apps)
  - [4. E-Commerce Checkout Protection](#4-e-commerce-checkout-protection)
  - [5. Form Builders & Surveys](#5-form-builders--surveys)
  - [6. Progressive Media Players](#6-progressive-media-players)
- [❓ Interview & Concept Questions](#interview--concept-questions)
  - [Basic Concepts (1-5)](#basic-concepts-1-5)
  - [Intermediate Implementation (6-12)](#intermediate-implementation-6-12)
  - [Advanced Scenarios (13-20)](#advanced-scenarios-13-20)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
This guide explains how to detect network status changes and inform the user.

## 🎯 What Problem Does It Solve?

### The Problem
Web applications have traditionally been "all-or-nothing" when it comes to network connectivity:

1. **No Connectivity Feedback**: Users don't know why forms won't submit or data won't load
2. **Poor Offline UX**: Apps fail silently with cryptic errors instead of clear messaging
3. **Lost User Input**: Forms submitted offline simply fail without saving data
4. **Confusing Behavior**: Cached content loads fine, but API calls fail - users think app is broken
5. **No Recovery Guidance**: When offline, apps don't tell users what they can/can't do

**Result**: Frustrated users, lost data, poor app ratings

### How Offline Detection Solves It

Provides **real-time connectivity awareness** so your app can:

1. **Show Clear Status**: Banner, icon, or toast showing "You're Offline"
2. **Disable Features**: Gray out submit buttons, hide "refresh" options
3. **Queue Actions**: Save form data locally, sync when online
4. **Guide Users**: "You can browse cached articles but can't post comments"
5. **Auto-Retry**: Automatically retry failed requests when connectivity returns

### Benefits

✅ **Transparent UX**: Users understand app state  
✅ **Data Protection**: Prevent lost form submissions  
✅ **Progressive Enhancement**: Core functionality works offline  
✅ **Smart Queueing**: Background sync when connection returns  
✅ **Better Trust**: Users know the app is working correctly

## 🔍 How It Works (The Concept)

The browser provides the `navigator.onLine` property and fires `online`/`offline` events on the `window` object.
While the Service Worker handles the *mechanics* of serving files offline, your UI needs to react to let the user know why "Submit" might not work or why data is stale.

### Ecosystem
*   **Service Worker**: Keeps the app running (assets + data cache).
*   **Component**: Updates the UI (disable buttons, show banners).

## 🚀 Step-by-Step Implementation Guide

### 1. Observe Window Events
Use RxJS `fromEvent` to create observables for the window events.

```typescript
import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

// Merge both streams into one boolean stream
const networkStatus$ = merge(
  fromEvent(window, 'online').pipe(map(() => true)),
  fromEvent(window, 'offline').pipe(map(() => false))
);

networkStatus$.subscribe(isOnline => {
  this.showBanner = !isOnline;
});
```

### 2. Initial Check
Events only fire on *change*. You usually need to check the status on initialization too.

```typescript
this.isOnline = navigator.onLine; // Initial value
```

## 📚 Detailed API & Observable Explanations

### 1. navigator.onLine (Browser API)

**Type**: Boolean property  
**Purpose**: Indicates if browser has network connectivity  
**Returns**: `true` if online, `false` if offline

**Critical Limitation - False Positives**:
```typescript
navigator.onLine === true  // Doesn't guarantee internet access!
```

**Why It's Not Perfect**:
- `true` = Connected to a network (router/LAN)
- Doesn't mean connected to the internet
- **Example**: Connected to WiFi router with dead internet → still returns `true`
- **Example**: Corporate firewall blocking everything → still returns `true`

**When to Use**:
- Initial check on app load
- Quick connectivity indicator
- Combined with heartbeat pings for accuracy

---

### 2. window 'online' and 'offline' Events

**Type**: Browser DOM events  
**Fired When**: Network connectivity changes

**'online' event**: Fires when browser gains connectivity  
**'offline' event**: Fires when browser loses connectivity

**Important**: Events only fire on STATE CHANGE:
- If you load the app while offline, no event fires initially
- Must check `navigator.onLine` first, THEN subscribe to events

---

### 3. RxJS fromEvent() Operator

**Purpose**: Converts browser events into Observables

```typescript
import { fromEvent } from 'rxjs';

fromEvent(window, 'online')   // Observable<Event>
fromEvent(window, 'offline')  // Observable<Event>
```

**How It Works**:
1. Attaches event listener to `window` object
2. Emits Observable values whenever event fires
3. Automatically handles cleanup when unsubscribed

**Why Use It**:
- Angular-friendly reactive pattern
- Easy to combine with other observables
- Automatic memory management

---

### 4. RxJS merge() Operator

**Purpose**: Combine multiple observables into one stream

```typescript
import { merge } from 'rxjs';

const networkStatus$ = merge(
  fromEvent(window, 'online'),   // Stream 1
  fromEvent(window, 'offline')   // Stream 2
);
// Result: Single stream that emits on EITHER event
```

**Why Use merge()**:
- Single subscription handles both online/offline
- Cleaner code than separate listeners
- Can easily add more streams (e.g., periodic heartbeat)

---

### 5. RxJS map() Operator

**Purpose**: Transform emitted values

```typescript
import { map } from 'rxjs/operators';

fromEvent(window, 'online').pipe(
  map(() => true)    // Convert Event → boolean
)

fromEvent(window, 'offline').pipe(
  map(() => false)   // Convert Event → boolean
)
```

**Why map to boolean**:
- Events themselves are not useful (just Event objects)
- We only care if online (true) or offline (false)
- Simplified state management

---

### 6. Heartbeat Pattern (Robust Connectivity Check)

**Problem**: `navigator.onLine` gives false positives

**Solution**: Periodically ping a lightweight endpoint

```typescript
import { interval, from, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

// Check every 30 seconds
const heartbeat$ = interval(30000).pipe(
  switchMap(() => 
    from(fetch('/api/ping', { method: 'HEAD' }))
  ),
  map(() => true),           // Success = online
  catchError(() => of(false)) // Failure = offline
);

heartbeat$.subscribe(isOnline => {
  this.actuallyOnline = isOnline;
});
```

**When to Use**:
- Critical apps (banking, healthcare)
- When false positives are unacceptable
- Long-running apps (kiosks)

**Trade-off**: Extra network requests, battery impact

## 🐛 Common Pitfalls & Debugging

### 1. False Positives
`navigator.onLine` being `true` only means the computer is connected to a network (e.g., a router). It doesn't guarantee the router has internet access.
*   **Robust Solution**: Periodically ping a lightweight file (e.g., `/favicon.ico`) or an API endpoint to verify actual connectivity (Heartbeat pattern).

### 2. Testing
You **cannot** just unplug your ethernet cable to test `localhost`. Using Chrome DevTools "Offline" preset is the best way to simulate this for web apps.

## ⚡ Performance & Architecture

*   **Background Sync**: Advanced PWA feature. If offline, you can save a form submission to IndexedDB and register a "Background Sync" task. When online returns, the SW sends the request automatically—even if the user closed the tab!

## 🌍 Real World Use Cases

### 1. Field Service & Technician Apps
**Scenario**: Workers in basements, remote areas, or buildings without signal  
**Implementation**:
```typescript
ngOnInit() {
  this.networkService.isOnline$.subscribe(online => {
    if (!online) {
      // Save work orders to IndexedDB
      this.workOrderService.enableOfflineMode();
      this.showBanner('Working offline. Data will sync when reconnected.');
    } else {
      // Sync queued work orders
      this.workOrderService.syncPendingChanges();
    }
  });
}
```
**Why**: Must complete work orders without connectivity, sync later

### 2. Messaging & Chat Applications
**Scenario**: Real-time connectivity indicator like WhatsApp/Slack  
**Implementation**:
```html
<div class="chat-header">
  <div class="status-indicator" [class.offline]="!isOnline">
    {{ isOnline ? 'Connected' : 'Waiting for network...' }}
  </div>
</div>

<!-- Disable send button when offline -->
<button [disabled]="!isOnline || !message" (click)="send()">Send</button>
```
**Why**: Users need to know if messages will be delivered

### 3. Documentation & Reading Apps
**Scenario**: MDN, Medium, news readers for airplane mode  
**Implementation**:
```typescript
if (!navigator.onLine) {
  this.articleService.setMode('cached-only');
  this.showInfo('Reading offline. Some images may not load.');
}
```
**Why**: Core reading experience works offline via SW cache

### 4. E-Commerce Checkout Protection
**Scenario**: Prevent cart submission when offline  
**Implementation**:
```typescript
proceedToCheckout() {
  if (!navigator.onLine) {
    this.dialog.open(OfflineWarningComponent, {
      message: 'You must be online to complete checkout.',
      action: 'Retry when connected'
    });
    return;
  }
  // Proceed with checkout
}
```
**Why**: Prevent failed payment attempts and cart data loss

### 5. Form Builders & Surveys
**Scenario**: Progressive Web App for field surveys  
**Implementation**:
```typescript
autoSave() {
  if (navigator.onLine) {
    this.formService.saveToServer(this.formData);
  } else {
    this.formService.saveToLocal(this.formData);
    this.scheduleSyncOnReconnect();
  }
}

private scheduleSyncOnReconnect() {
  const online$ = fromEvent(window, 'online').pipe(take(1));
  online$.subscribe(() => this.formService.syncFromLocal());
}
```
**Why**: Never lose user input, sync when possible

### 6. Progressive Media Players
**Scenario**: Spotify/YouTube-like offline playback  
**Implementation**:
```typescript
playTrack(trackId: string) {
  if (navigator.onLine) {
    this.streamFrom('network', trackId);
  } else {
    if (this.cacheService.has(trackId)) {
      this.streamFrom('cache', trackId);
    } else {
      this.showError('This track is not available offline');
    }
  }
}
```
**Why**: Graceful degradation to cached media

## ❓ Interview & Concept Questions

### Basic Concepts (1-5)

**Q1: What is navigator.onLine and what does it actually check?**  
**A**: `navigator.onLine` is a browser API property that returns `true` if the browser is connected to a network, `false` otherwise. **Important limitation**: It only checks if connected to a router/network, NOT if you have actual internet access. You could be connected to WiFi with no internet and it still returns `true`.

**Q2: Why do we need BOTH navigator.onLine check AND event listeners?**  
**A**:
- `navigator.onLine`: Gives **initial state** when component loads
- Event listeners (`online`/`offline`): Fire only on **state changes**
- **Problem**: If app loads while offline, no event fires initially
- **Solution**: Check `navigator.onLine` once in `ngOnInit()`, then subscribe to events for changes

**Q3: What are the 'online' and 'offline' events?**  
**A**: Browser DOM events fired by `window` when network connectivity changes:
- `online`: Fires when browser gains connectivity
- `offline`: Fires when browser loses connectivity
- Attach with: `window.addEventListener('online', callback)` or use RxJS `fromEvent(window, 'online')`

**Q4: Why use RxJS merge() for combining online/offline events?**  
**A**: To create a single observable stream from both events:
```typescript
const networkStatus$ = merge(
  fromEvent(window, 'online').pipe(map(() => true)),
  fromEvent(window, 'offline').pipe(map(() => false))
);
```
Benefits:
- Single subscription instead of two
- Cleaner reactive code
- Easier to pipe additional operators
- Automatic cleanup

**Q5: When should you unsubscribe from network status observables?**  
**A**: **Always** in `ngOnDestroy()` to prevent memory leaks:
```typescript
ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
```
Without unsubscribe: listener continues after component destroyed, accumulating memory

### Intermediate Implementation (6-12)

**Q6: What is the "heartbeat pattern" for connectivity checking?**  
**A**: Periodically pinging a lightweight server endpoint to verify REAL internet connectivity:
```typescript
interval(30000).pipe(
  switchMap(() => from(fetch('/api/ping', { method: 'HEAD' }))),
  map(() => true),
  catchError(() => of(false))
).subscribe(isOnline => this.actuallyOnline = isOnline);
```
**Why**: Solves the false positive problem of `navigator.onLine`

**Q7: How would you implement an offline queue for failed requests?**  
**A**:
```typescript
class OfflineQueue {
  private queue: Request[] = [];

  add(request: Request) {
    this.queue.push(request);
    localStorage.setItem('offline-queue', JSON.stringify(this.queue));
  }

  syncWhenOnline() {
    fromEvent(window, 'online').pipe(take(1)).subscribe(() => {
      this.queue.forEach(req => this.http.request(req).subscribe());
      this.queue = [];
      localStorage.removeItem('offline-queue');
    });
  }
}
```

**Q8: How does offline detection work with Service Workers?**  
**A**:
- **Separate concerns**:
  - Service Worker: Handles offline MECHANICS (serving cached files)
  - Component: Handles offline UI/UX (banners, disabled buttons)
- **Component detects with**: `navigator.onLine` and events
- **SW doesn't care**: Serves from cache regardless of online status
- **Together**: Component shows "Offline" banner AND SW serves cached assets

**Q9: How can you test offline functionality locally?**  
**A**:
1. **Chrome DevTools**: Network tab → Throttling → "Offline"
2. **Simulate**: `Object.defineProperty(navigator, 'onLine', { value: false })`
3. **Firewall**: Block specific ports/domains
4. **Real test**: Actually disconnect ethernet/WiFi
5. **Events**: Manually dispatch `window.dispatchEvent(new Event('offline'))`

**Q10: What's the difference between checking in ngOnInit vs constructor?**  
**A**:
```typescript
// ❌ Don't do this
constructor() {
  this.isOnline = navigator.onLine; // Too early, window might not be ready
}

// ✅ Do this
ngOnInit() {
  this.isOnline = navigator.onLine; // Browser APIs fully available
  this.subscription = /* ... */;
}
```
Best practice: Use `ngOnInit` for browser API access and subscriptions

**Q11: How would you show a toast only when going offline, not on initial load?**  
**A**:
```typescript
private previousState: boolean = true;

ngOnInit() {
  this.isOnline = navigator.onLine;
  this.previousState = this.isOnline; // Store initial

  this.subscription = networkStatus$.subscribe(isOnline => {
    if (!isOnline && this.previousState) {
      this.toast.show('You are now offline');
    }
    this.previousState = isOnline;
    this.isOnline = isOnline;
  });
}
```

**Q12: Can you detect the TYPE of connection (WiFi, 4G, etc.)?**  
**A**: Yes, using the **Network Information API** (experimental):
```typescript
const connection = (navigator as any).connection;
if (connection) {
  console.log(connection.effectiveType); // '4g', '3g', 'slow-2g', etc.
  console.log(connection.downlink);      // Mbps estimate
}
```
Note: Not widely supported, use feature detection

### Advanced Scenarios (13-20)

**Q13: Design an offline-first app architecture**  
**A**:
```typescript
// 1. Service: Abstract data source
class DataService {
  getData() {
    if (navigator.onLine) {
      return this.http.get('/api/data').pipe(
        tap(data => this.cacheService.set('data', data))
      );
    } else {
      return of(this.cacheService.get('data'));
    }
  }
}

// 2. Mutations: Queue when offline
createItem(item: Item) {
  if (navigator.onLine) {
    return this.http.post('/api/items', item);
  } else {
    this.queue.add({ method: 'POST', url: '/api/items', body: item });
    return of({ id: 'temp-' + Date.now(), ...item });
  }
}
```

**Q14: How do you handle file uploads when offline?**  
**A**: Use Background Sync API (advanced):
```typescript
if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
  navigator.serviceWorker.ready.then(registration => {
    return registration.sync.register('upload-files');
  });
}

// In service-worker.js
self.addEventListener('sync', event => {
  if (event.tag === 'upload-files') {
    event.waitUntil(uploadQueuedFiles());
  }
});
```

**Q15: What's the impact on battery life from constant connectivity checking?**  
**A**:
- **Native events** (`online`/`offline`): **No impact** (system-level, no polling)
- **Heartbeat polling**: **Moderate impact**
  - Network request every 30s = battery drain
  - Mitigation: Increase interval, use exponential backoff
  - Only poll when app is active (pause when backgrounded)
- **Best practice**: Use native events + heartbeat only when critical

**Q16: How would you implement exponential backoff for reconnection?**  
**A**:
```typescript
retryCount = 0;

checkConnectivity() {
  fetch('/api/ping').then(() => {
    this.isOnline = true;
    this.retryCount = 0; // Reset
  }).catch(() => {
    this.isOnline = false;
    const delay = Math.min(1000 * Math.pow(2, this.retryCount), 60000);
    setTimeout(() => {
      this.retryCount++;
      this.checkConnectivity();
    }, delay);
  });
}
```
Delay: 1s, 2s, 4s, 8s, 16s, 32s, 60s (max)

**Q17: How does offline detection interact with PWA installation?**  
**A**:
- **Before install**: App might not work offline
- **After install**: Service Worker caches assets
- **Best practice**:
```typescript
if (this.isInstalled() && !navigator.onLine) {
  this.showMessage('You\'re offline, but the app still works!');
} else if (!this.isInstalled() && !navigator.onLine) {
  this.showMessage('Install this app to use it offline');
}
```

**Q18: Can you detect if a specific API endpoint is reachable?**  
**A**: Yes, with targeted health checks:
```typescript
async checkEndpoint(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      cache: 'no-cache',
      signal: AbortSignal.timeout(5000) // 5s timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}
```

**Q19: How do you sync data conflicts when coming back online?**  
**A**: Implement conflict resolution:
```typescript
syncData() {
  const local = this.cache.get('data');
  const localTimestamp = this.cache.get('timestamp');

  this.http.get('/api/data').subscribe(remote => {
    if (remote.timestamp > localTimestamp) {
      // Server wins
      this.cache.set('data', remote);
    } else {
      // Client wins, push to server
      this.http.put('/api/data', local).subscribe();
    }
  });
}
```

**Q20: What are the limitations of navigator.onLine across browsers?**  
**A**:
- **Chrome/Edge**: Reliable, checks network connection
- **Firefox**: More conservative, might show offline even when LAN connected
- **Safari/iOS**: Can be unreliable, especially on cellular
- **IE11**: Works but outdated detection logic
- **Best practice**: Always combine with heartbeat for critical apps

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  OFFLINE DETECTION                                          │
│                                                             │
│   DETECT NETWORK STATUS:                                    │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ // Initial check                                      │ │
│   │ this.isOnline = navigator.onLine;                     │ │
│   │                                                       │ │
│   │ // Listen for changes                                 │ │
│   │ const networkStatus$ = merge(                         │ │
│   │   fromEvent(window, 'online').pipe(map(() => true)),  │ │
│   │   fromEvent(window, 'offline').pipe(map(() => false)) │ │
│   │ );                                                    │ │
│   │                                                       │ │
│   │ networkStatus$.subscribe(isOnline => {                │ │
│   │   this.showOfflineBanner = !isOnline;                 │ │
│   │ });                                                   │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   ⚠️ navigator.onLine can be true even without internet!  │
│   → Robust: ping a lightweight file periodically          │
│                                                             │
│   Advanced: Background Sync for offline form submissions  │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Check navigator.onLine initially + subscribe to events. For real connectivity, ping a server!

