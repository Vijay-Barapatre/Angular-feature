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

## 📚 Detailed API & Mechanism Explanations

### 1. SwUpdate.unrecoverable Observable

**Type**: `Observable<UnrecoverableStateEvent>`  
**Purpose**: Emits when SW detects unrecoverable failure

**Event Object**:
```typescript
interface UnrecoverableStateEvent {
  reason: string;  // Description of what failed
  type: 'UNRECOVERABLE_STATE';
}
```

**When It Fires**:
- Critical app file returns 404 (e.g., `main.js`, `index.html`)
- Manifest is corrupted or missing
- SW cache becomes inconsistent

**Example**:
```typescript
updates.unrecoverable.subscribe(event => {
  console.error('Unrecoverable:', event.reason);
  // Log to error tracking (Sentry, etc.)
  this.errorService.log('SW Unrecoverable', event);
  
  // Show user message
  this.dialog.open({
    title: 'App Update Required',
    message: 'The app needs to reload to fix an issue.',
    action: () => document.location.reload()
  });
});
```

**Best Practice**: Always handle this event, even if just auto-reloading

---

### 2. ngsw-bypass Query Parameter

**Syntax**: `?ngsw-bypass=true` or `?ngsw-bypass`

**How It Works**:
1. Angular SW checks every request for this parameter
2. If present, SW does NOT intercept the request
3. Request goes directly to network (no cache)
4. Fresh content loaded from server

**Usage**:
```typescript
// Programmatically add bypass
const url = new URL(window.location.href);
url.searchParams.set('ngsw-bypass', 'true');
window.location.href = url.toString();

// Or as a link
<a href="/?ngsw-bypass=true">Reload Without Cache</a>
```

**When to Use**:
- **Debugging**: Test without SW caching
- **Emergency**: Help user escape broken SW
- **Support**: "Try this link to fix the issue"

**Limitations**:
- Only bypasses for THAT specific request
- Subsequent navigations use SW again
- Doesn't unregister the SW

---

### 3. Unregistering Service Worker

**Complete Removal**:
```typescript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister();
      console.log('SW unregistered');
    });
  });
}
```

**When to Unregister**:
- Removing PWA functionality entirely
- Switching to non-SW deployment
- Testing without SW
- Emergency kill switch

**Note**: Requires page reload to take effect fully

---

### 4. Safety Worker Pattern

**Concept**: Deploy a minimal "safety" SW that unregisters itself

**safety-worker.js**:
```javascript
// Minimal SW that unregisters itself
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return clients.matchAll();
    }).then(clients => {
      clients.forEach(client => client.navigate(client.url));
    })
  );
});
```

**Deploy When**: You need to remove a broken SW from all users' browsers

---

### 5. Atomic Deployment Strategy

**Problem Prevention**: Keep old build files on server

**File Structure**:
```
/dist/
  /v1-abc123/     # Old version
    main.js
    index.html
  /v2-def456/     # New version  
    main.js
    index.html
  index.html      # Points to latest version
```

**Benefits**:
- Old SW can still fetch `main.old.js` from `/v1-abc123/`
- No 404 errors
- Gradual transition
- Can rollback by changing root `index.html`

**TTL**: Keep old versions for 7-14 days minimum

---

### 6. document.location.reload() Mechanics

**What Happens**:
1. Discards all JavaScript state
2. Requests `index.html` from server OR SW
3. If SW is working: serves new version from cache
4. If SW is broken: bypasses and gets from network
5. Loads new JS/CSS bundles

**Alternative**: `window.location.reload()`
- Functionally equivalent
- `document.location` is slightly more explicit

**Force Hard Reload**: `location.reload(true)` (deprecated)
- Modern approach: Clear cache manually or use `ngsw-bypass`

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

### 1. Production Bug Emergency Patch
**Scenario**: Critical bug in cached SW, need users to bypass immediately  
**Implementation**:
```typescript
// Emergency bypass link sent via email/support
const  emergencyLink = `${window.location.origin}/?ngsw-bypass=true&emergency=fix-123`;

// Support page shows this link
<div class="alert alert-warning">
  <h3>Experiencing issues?</h3>
  <p>Click this link to load the latest version:</p>
  <a href="/?ngsw-bypass=true">Reload App (Bypass Cache)</a>
</div>
```
**Why**: Immediate relief while deploying proper fix

### 2. CDN Aggressive Purge
**Scenario**: CDN purges old files too quickly, causing 404s  
**Implementation**:
```typescript
// Detect and handle unrecoverable state
this.updates.unrecoverable.subscribe(event => {
  // Log to analytics
  this.analytics.trackError('UnrecoverableState', {
    reason: event.reason,
    url: window.location.href,
    userAgent: navigator.userAgent
  });
  
  // Show user-friendly message before reload
  this.snackBar.open(
    'Updating to latest version...',
    '',
    { duration: 2000 }
  ).afterDismissed().subscribe(() => {
    document.location.reload();
  });
});
```
**Why**: Users get smooth experience despite backend issues

### 3. Developer Debug Mode
**Scenario**: QA/developers need to test without SW caching  
**Implementation**:
```typescript
// Add debug toggle in app
@Component({
  template: `
    <button *ngIf="isDev" (click)="toggleSW()">
      {{ swEnabled ? 'Disable' : 'Enable' }} Service Worker
    </button>
  `
})
export class DebugControlsComponent {
  isDev = !environment.production;
  swEnabled = !window.location.href.includes('ngsw-bypass');
  
  toggleSW() {
    const url = new URL(window.location.href);
    if (this.swEnabled) {
      url.searchParams.set('ngsw-bypass', 'true');
    } else {
      url.searchParams.delete('ngsw-bypass');
    }
    window.location.href = url.toString();
  }
}
```
**Why**: Easy testing of network-only vs cached behavior

### 4. Phased SW Removal
**Scenario**: Migrating away from PWA, need to remove SW from all users  
**Implementation**:
```typescript
// Step 1: Deploy safety worker (in app.config.ts)
import { ApplicationConfig } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('safety-worker.js', {
      enabled: true,  // Force enable to override old SW
      registrationStrategy: 'registerImmediately'
    })
  ]
};

// Step 2: safety-worker.js unregisters itself
// (see detailed API section above)

// Step 3: After 2 weeks, remove SW entirely
// Remove ServiceWorkerModule from config
```
**Why**: Cleanly remove SW from all users over time

### 5. A/B Testing SW Features
**Scenario**: Test SW features with subset of users, need escape hatch  
**Implementation**:
```typescript
// Check if user in experiment
if (this.experiments.isEnabled('sw-test')) {
  // Use SW
} else {
  // Bypass SW for control group
  const url = new URL(window.location.href);
  if (!url.searchParams.has('ngsw-bypass')) {
    url.searchParams.set('ngsw-bypass', 'true');
    window.location.href = url.toString();
  }
}
```
**Why**: Fair A/B comparison between SW and non-SW users

### 6. Deployment Rollback Workflow
**Scenario**: New version has critical issue, need to rollback  
**Implementation**:
```typescript
// Server-side rollback
// 1. Update ngsw.json to point to old version hash
//    (or restore old ngsw.json)

// 2. Trigger update check on client
if (this.updates.isEnabled) {
  this.updates.checkForUpdate().then(hasUpdate => {
    if (hasUpdate) {
      // New-old version detected
      this.updates.activateUpdate().then(() => {
        document.location.reload();
      });
    }
  });
}

// 3. If SW stuck, use unrecoverable handler
updates.unrecoverable.subscribe(() => {
  // Force reload to get rolled-back version
  document.location.reload();
});
```
**Why**: Quick recovery from bad deployments

## ❓ Interview & Concept Questions

### Basic Concepts (1-5)

**Q1: What causes an "unrecoverable state" in Angular Service Workers?**  
**A**: Occurs when SW expects files that are missing from the server:
- **Common cause**: Deploying new version while deleting old files
- **Example**: SW has cached `index.html` pointing to `main.old.js`, but server deleted `main.old.js`
- **Result**: 404 errors, blank screen
- **Angular detects**: Missing critical files and fires `unrecoverable` event

**Q2: What happens when you add `?ngsw-bypass=true` to URL?**  
**A**: Service Worker ignores that specific request:
- Request goes directly to network (no cache)
- Fetches fresh content from server
- Bypasses ALL SW caching for that page load
- **Note**: Only applies to that request; subsequent navigations use SW again

**Q3: Should you auto-reload when unrecoverable event fires?**  
**A**: **Yes**, in most cases:
```typescript
updates.unrecoverable.subscribe(event => {
  document.location.reload();  // Best practice
});
```
**Why**: Usually fixes the issue by fetching fresh `index.html`
**Exception**: Might want to log/alert first, but still reload

**Q4: What's the difference between ngsw-bypass and unregistering SW?**  
**A**:
- **ngsw-bypass**:
  - Temporary
  - Only affects current request
  - SW still installed
  - Use for: debugging, one-time network fetch
- **Unregister**:
  - Permanent (until re-registered)
  - Removes SW completely
  - Use for: removing PWA functionality

**Q5: Can unrecoverable state happen in development?**  
**A**: **No**, SW is disabled in `ng serve` by default
- Only happens in production builds
- Must test with `ng build` + `http-server`

### Intermediate Implementation (6-12)

**Q6: How do you detect if ngsw-bypass is active?**  
**A**:
```typescript
const url = new URL(window.location.href);
const bypassed = url.searchParams.has('ngsw-bypass');

if (bypassed) {
  console.log('SW bypassed, using network only');
}
```

**Q7: What is a "safety worker" and when do you use it?**  
**A**: Minimal SW that unregisters itself:
```javascript
self.addEventListener('activate', event => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return clients.matchAll();
    }).then(clients => {
      clients.forEach(client => client.navigate(client.url));
    })
  );
});
```
**Use when**: Bad SW deployed to all users, need to remove it

**Q8: How do you prevent unrecoverable states?**  
**A**: **Atomic deployments** - keep old build files:
```
/dist/
  /build-v1/  # Old version files stay here
    main.js
  /build-v2/  # New version
    main.js
  index.html  # Root points to latest
```
**Keep for**: 7-14 days
**Why**: Old SW can still fetch old files

**Q9: Can you clear SW cache programmatically?**  
**A**: Yes:
```typescript
if ('caches' in window) {
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames
        .filter(name => name.startsWith('ngsw:'))
        .map(name => caches.delete(name))
    );
  }).then(() => {
    console.log('SW caches cleared');
    location.reload();
  });
}
```

**Q10: How does reload() fix unrecoverable state?**  
**A**:
1. Browser requests fresh `index.html`
2. If SW broken: request bypasses SW  → gets from network
3. New `index.html` loads correct JS files
4. New SW (if deployed) takes over
5. App recovers

**Q11: Should you show a message before auto-reloading?**  
**A**: **Recommended** for better UX:
```typescript
updates.unrecoverable.subscribe(event => {
  this.snackBar.open(
    'App needs to reload to fix an issue',
    'OK',
    { duration: 3000 }
  ).afterDismissed().subscribe(() => {
    document.location.reload();
  });
});
```
Avoids jarring instant reload

**Q12: Can you trigger unrecoverable state for testing?**  
**A**: Not easily, but you can simulate:
1. Build app: `ng build`
2. Serve and load app
3. Delete a critical file from `dist/` (e.g., `main.js`)
4. Reload app
5. SW tries to fetch deleted file → unrecoverable fires

### Advanced Scenarios & DevOps (13-20)

**Q13: Design a deployment strategy that prevents unrecoverable states**  
**A**:
```yaml
# CI/CD Pipeline
steps:
  - name: Build
    run: ng build --configuration=production
  
  - name: Deploy with versioning
    run: |
      VERSION=$(git rev-parse --short HEAD)
      aws s3 sync dist/ s3://bucket/releases/$VERSION/
      
  - name: Update current symlink
    run: |
      # Atomic swap to new version
      aws s3 cp s3://bucket/releases/$VERSION/index.html s3://bucket/index.html
  
  - name: Keep old versions
    run: |
      # Delete releases older than 14 days
      find-and-delete-old-releases --days 14
```

**Q14: How do you implement a kill switch for broken SW?**  
**A**:
```typescript
// Check remote config on app init
this.http.get('/api/config').subscribe(config => {
  if (config.disableServiceWorker) {
    // Unregister SW
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.unregister());
    });
    
    // Add bypass to prevent re-registration
    const url = new URL(window.location.href);
    if (!url.searchParams.has('ngsw-bypass')) {
      url.searchParams.set('ngsw-bypass', 'true');
      window.location.href = url.toString();
    }
  }
});
```

**Q15: How do you monitor unrecoverable states in production?**  
**A**: Log to error tracking:
```typescript
updates.unrecoverable.subscribe(event => {
  // Sentry/LogRocket/etc.
  this.errorTracking.captureException(new Error('SW Unrecoverable'), {
    extra: {
      reason: event.reason,
      url: window.location.href,
      userAgent: navigator.userAgent,
      swVersion: await this.getSwVersion()
    }
  });
  
  document.location.reload();
});
```
**Monitor**: Frequency of unrecoverable events per deployment

**Q16: Can you recover from unrecoverable state without reload?**  
**A**: **Very difficult**, reload is the reliable fix:
- Could try: Unregister SW, clear caches, re-register
- **Problem**: Complex, error-prone, partial state
- **Best practice**: Just reload

**Q17: How does ngsw-bypass interact with browser cache?**  
**A**:
- **ngsw-bypass**: Only bypasses SERVICE WORKER
- **Browser HTTP cache**: Still active
- **Result**: Might get cached response from browser, not SW
- **Full bypass**: `ngsw-bypass=true` + `Cache-Control: no-cache` headers

**Q18: What's the impact of frequent unrecoverable states?**  
**A**:
- **User experience**: Frustrating reloads
- **Performance**: Re-downloads assets
- **Data loss**: Unsaved form data
- **Root cause**: Aggressive cache purging or bad deployment strategy
- **Fix**: Implement atomic deployments

**Q19: How do you test recovery from unrecoverable state?**  
**A**:
```typescript
// Mock unrecoverable event
class MockSwUpdate {
  unrecoverable = new Subject<UnrecoverableStateEvent>();
  
  triggerUnrecoverable() {
    this.unrecoverable.next({
      type: 'UNRECOVERABLE_STATE',
      reason: 'Test: missing main.js'
    });
  }
}

// In test
it('should reload on unrecoverable state', () => {
  spyOn(document.location, 'reload');
  mockSwUpdate.triggerUnrecoverable();
  expect(document.location.reload).toHaveBeenCalled();
});
```

**Q20: When should you NOT auto-reload on unrecoverable?**  
**A**: Rare cases:
- **Data collection**: Log extensively before reload
- **User confirmation**: Critical unsaved work (show dialog first)
- **Fallback UI**: Show degraded mode instead of reload

**Example**:
```typescript
updates.unrecoverable.subscribe(event => {
  if (this.hasUnsavedChanges()) {
    this.dialog.open({
      title: 'App Issue Detected',
      message: 'Save your work before reloading?',
      actions: [
        { label: 'Save & Reload', action: () => this.saveAndReload() },
        { label: 'Reload Anyway', action: () => location.reload() }
      ]
    });
  } else {
    location.reload();
  }
});
```

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

