# 🚑 Unrecoverable State & Bypass

This guide explains how to escape a broken Service Worker state.

## 🔍 How It Works (The Concept)

### The "Unrecoverable" Problem
1.  SW caches `index.html` referring to `main.old.js`.
2.  You deploy a new version.
3.  Server deletes `main.old.js` and adds `main.new.js`.
4.  User opens app. SW serves cached `index.html`.
5.  `index.html` asks for `main.old.js`.
6.  SW tries to fetch `main.old.js` from cache (missing) -> then network.
7.  **404 Not Found**.
8.  The app crashes blank.

This is the **Unrecoverable State**.

### The Solution
Angular detects this specific failure mode and fires `updates.unrecoverable`.

## 🚀 Step-by-Step Implementation Guide

### 1. Handle Unrecoverable Event
In your `AppComponent` or a core service:

```typescript
constructor(updates: SwUpdate) {
  updates.unrecoverable.subscribe(event => {
    console.error(`Unrecoverable state: ${event.reason}`);
    // Force reload to get fresh index.html from server
    document.location.reload(); 
  });
}
```

### 2. Manual Bypass
If you are developing or debugging and just want to ignore the cache without clearing it:

Add `?ngsw-bypass=true` to the URL.
*   `http://localhost:8080/service-worker?ngsw-bypass=true`

This header tells the Service Worker "Hands off! Let this request go to the network."

## 🐛 Common Pitfalls & Debugging

### 1. Atomic Deployments
**Always** keep the files from the *previous* build on your server for a few days if possible. This prevents 404s for users who have the old index.html cached but haven't downloaded the old JS chunks yet.

### 2. Kill Switch
If you need to remove the SW entirely:
1.  Remove `ServiceWorkerModule` from `app.config.ts`.
2.  Upload a new `ngsw.json` config.
3.  Or use the "Safety Worker" package provided by Angular to unregister it.

## ⚡ Performance & Architecture

*   **Safety First**: The `unrecoverable` handler is your safety net. Implement it early.
*   **Failover**: If the SW consistently fails, the browser will eventually automatically unregister it, but don't rely on that.

## 🌍 Real World Use Cases

1.  **Production Bug**: You pushed a bad bug that is cached. You can tell users "Click this link to fix it" (link has `?ngsw-bypass`).
2.  **CDN Issues**: If your CDN purges old files too aggressively, you will hit unrecoverable states often.

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  UNRECOVERABLE STATE & BYPASS                               │
│                                                             │
│   THE PROBLEM:                                              │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ 1. SW caches index.html → points to main.old.js       │ │
│   │ 2. You deploy new version (main.new.js)               │ │
│   │ 3. Server deletes main.old.js                         │ │
│   │ 4. User opens app → SW serves cached index.html       │ │
│   │ 5. Browser requests main.old.js → 404! 💥             │ │
│   │ 6. App crashes blank (UNRECOVERABLE STATE)            │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   THE FIX:                                                  │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ updates.unrecoverable.subscribe(event => {            │ │
│   │   console.error('Unrecoverable:', event.reason);      │ │
│   │   document.location.reload();  // Force fresh fetch   │ │
│   │ });                                                   │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   BYPASS: Add ?ngsw-bypass=true to URL (debugging)         │
│   PREVENTION: Keep previous build files on server briefly  │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Always handle unrecoverable state! Keep old build files on server for a few days. Use ?ngsw-bypass for debugging!

