# 📶 Offline Detection

This guide explains how to detect network status changes and inform the user.

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

## 🐛 Common Pitfalls & Debugging

### 1. False Positives
`navigator.onLine` being `true` only means the computer is connected to a network (e.g., a router). It doesn't guarantee the router has internet access.
*   **Robust Solution**: Periodically ping a lightweight file (e.g., `/favicon.ico`) or an API endpoint to verify actual connectivity (Heartbeat pattern).

### 2. Testing
You **cannot** just unplug your ethernet cable to test `localhost`. Using Chrome DevTools "Offline" preset is the best way to simulate this for web apps.

## ⚡ Performance & Architecture

*   **Background Sync**: Advanced PWA feature. If offline, you can save a form submission to IndexedDB and register a "Background Sync" task. When online returns, the SW sends the request automatically—even if the user closed the tab!

## 🌍 Real World Use Cases

1.  **Field Service Apps**: Technicians working in basements without signal.
2.  **Messaging Apps**: "Waiting for network..." banner at the top of the chat.
3.  **Docs**: Reading documentation on a plane.

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

