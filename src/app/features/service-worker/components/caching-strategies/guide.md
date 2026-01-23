# 📦 Service Worker Caching Strategies


## 📋 Table of Contents
- [🎯 What Problem Does It Solve?](#what-problem-does-it-solve)
  - [The Problem](#the-problem)
  - [How Caching Strategies Solve It](#how-caching-strategies-solve-it)
  - [Benefits](#benefits)
- [🔍 How It Works (The Concept)](#how-it-works-the-concept)
  - [Strategy 1: Performance (AssetGroups)](#strategy-1-performance-assetgroups)
  - [Strategy 2: Freshness (DataGroups)](#strategy-2-freshness-datagroups)
  - [Mermaid Diagram: Strategies](#mermaid-diagram-strategies)
- [🚀 Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
  - [1. `assetGroups` (Static Files)](#1-assetgroups-static-files)
  - [2. `dataGroups` (API Calls)](#2-datagroups-api-calls)
- [📚 Detailed Configuration Explanations](#detailed-configuration-explanations)
  - [1. ngsw-config.json Structure](#1-ngsw-configjson-structure)
  - [2. assetGroups (Static Files)](#2-assetgroups-static-files)
    - [Properties:](#properties)
  - [3. dataGroups (API Calls & Dynamic Data)](#3-datagroups-api-calls--dynamic-data)
    - [Properties:](#properties)
  - [4. Strategy Decision Tree](#4-strategy-decision-tree)
  - [5. Cache Busting & Versioning](#5-cache-busting--versioning)
- [🐛 Common Pitfalls & Debugging](#common-pitfalls--debugging)
  - [1. "My changes aren't showing up!"](#1-my-changes-arent-showing-up)
  - [2. "API calls are failing offline!"](#2-api-calls-are-failing-offline)
- [⚡ Performance & Architecture](#performance--architecture)
- [🌍 Real World Use Cases](#real-world-use-cases)
  - [1. Google Fonts & External CDN Assets](#1-google-fonts--external-cdn-assets)
  - [2. Weather & News Apps](#2-weather--news-apps)
  - [3. Documentation Sites](#3-documentation-sites)
  - [4. Maps & Tile-Based Applications](#4-maps--tile-based-applications)
  - [5. E-Commerce Product Catalog](#5-e-commerce-product-catalog)
  - [6. Video Streaming / Progressive Downloads](#6-video-streaming--progressive-downloads)
- [❓ Interview & Concept Questions](#interview--concept-questions)
  - [Basic Concepts (1-5)](#basic-concepts-1-5)
  - [Intermediate Implementation (6-12)](#intermediate-implementation-6-12)
  - [Advanced Scenarios & Architecture (13-20)](#advanced-scenarios--architecture-13-20)
  - [Debugging & Best Practices (21-25)](#debugging--best-practices-21-25)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)

---
This guide helps you understand how `ngsw-config.json` controls caching.

## 🎯 What Problem Does It Solve?

### The Problem
Modern web applications face two critical challenges:

1. **Slow Initial Load Times**
   - Large JavaScript bundles (can be MBs)
   - Multiple font files
   - High-resolution images and CSS
   - Each file requires a network round trip
   - Users wait 3-5 seconds or more on slow connections

2. **No Offline Functionality**
   - App breaks completely when network is unavailable
   - Airplane mode, tunnels, poor reception = blank screen
   - Users can't access ANY content, even static pages
   - Terrible UX for modern applications

3. **API Data Staleness vs. Reliability Trade-off**
   - Always fetch from network = slow, fails offline
   - Always use cache = fast but stale data
   - Need intelligent strategy based on content type

### How Caching Strategies Solve It

Angular Service Worker provides **two strategic approaches**:

**1. Performance Strategy (assetGroups)**
- **Goal**: Instant loads
- **How**: Serve from cache IMMEDIATELY, update in background
- **Use**: Fonts, images, CSS, JS bundles (rarely changing assets)
- **Benefit**: Second visit loads in <100ms

**2. Freshness Strategy (dataGroups)**
- **Goal**: Current data
- **How**: Network FIRST, fall back to cache if offline/timeout
- **Use**: API calls, user data, live feeds
- **Benefit**: Always try to get latest, graceful degradation offline

### Benefits

✅ **Blazing Fast**: Second load is instant (cached assets)  
✅ **Offline Capable**: App works without network connection  
✅ **Flexible**: Different strategies for different content types  
✅ **Smart**: Automatic cache invalidation on new deployments  
✅ **Configurable**: Fine-grained control via `ngsw-config.json`

## 🔍 How It Works (The Concept)

The Angular Service Worker doesn't write code; it reads a config file (`ngsw-config.json`).
You define **Groups** of files/URLs and assign a **Strategy** to them.

### Strategy 1: Performance (AssetGroups)
*   **Goal**: Load as fast as possible.
*   **Behavior**: Serve from cache **instantly**. Don't wait for network.
*   **Use for**: Fonts, Images, CSS, JS Bundles (things that don't change often).

### Strategy 2: Freshness (DataGroups)
*   **Goal**: Get the latest data.
*   **Behavior**: Go to **Network first**. If it fails (timeout/offline), fall back to cache.
*   **Use for**: API calls, User Data, News Feeds.

### Mermaid Diagram: Strategies

```mermaid
graph TD
    A[Request] --> B{Type?}
    B -->|Asset (Font/JS)| C[Performance Strategy]
    B -->|API Data| D[Freshness Strategy]
    
    C -->|Always| E[Return Cache]
    C -.->|Background| F[Fetch & Update Cache]
    
    D -->|Network Available?| G[Fetch Network]
    G -->|Success| H[Return Data & Cache it]
    G -->|Fail/Timeout| I[Return Cache]
```

## 🚀 Step-by-Step Implementation Guide

### 1. `assetGroups` (Static Files)
Defined in `ngsw-config.json`.

```json
"assetGroups": [
  {
    "name": "app",
    "installMode": "prefetch", // Download ALL at start
    "resources": {
      "files": [ "/favicon.ico", "/index.html", "/*.css", "/*.js" ]
    }
  }, {
    "name": "assets",
    "installMode": "lazy", // Download ONLY when requested
    "updateMode": "prefetch",
    "resources": {
      "files": [ "/assets/**" ]
    }
  }
]
```

### 2. `dataGroups` (API Calls)
You must add this manually to `ngsw-config.json`.

```json
"dataGroups": [
  {
    "name": "api-performance",
    "urls": [ "/api/**" ],
    "cacheConfig": {
      "strategy": "freshness", // or 'performance'
      "maxSize": 100,
      "maxAge": "1h",
      "timeout": "10s" // Fallback to cache after 10s
    }
  }
]
```

## 📚 Detailed Configuration Explanations

### 1. ngsw-config.json Structure

**Purpose**: Configuration file that tells Angular CLI what and how to cache  
**Location**: Root of your Angular project (same level as `angular.json`)  
**Generated By**: `ng add @angular/pwa` creates a default template

**Top-Level Structure**:
```json
{
  "index": "/index.html",           // App shell
  "assetGroups": [ /* ... */ ],     // Static assets
  "dataGroups": [ /* ... */ ],      // Dynamic data/APIs
  "navigationUrls": [ /* ... */ ]   // Routes to treat as navigation
}
```

---

### 2. assetGroups (Static Files)

**Purpose**: Cache static application files that change only on deployment

#### Properties:

**`name`** (string)
- Identifier for this asset group
- Used in cache storage names
- Example: `"app"`, `"assets"`, `"fonts"`

**`installMode`** (string: `"prefetch"` | `"lazy"`)
- **`prefetch`**: Download ALL files when SW installs (first visit)
  - Use for: Critical app shell (index.html, main.js, styles.css)
  - Pro: Guaranteed offline access
  - Con: Larger initial download
- **`lazy`**: Download ONLY when requested
  - Use for: Images, optional assets, large files
  - Pro: Faster initial install
  - Con: Not available offline until accessed once

**`updateMode`** (string: `"prefetch"` | `"lazy"`)
- How to handle updates when new version deployed
- **`prefetch`**: Download all files immediately when update detected
- **`lazy`**: Download only when requested in new version
- Usually same as `installMode`

**`resources`** (object)
- **`files`**: Array of glob patterns for files to cache
  - Patterns: `"/*.css"`, `"/*.js"`, `"/assets/**"`, `"/favicon.ico"`
  - Relative to `dist/` folder
  - `**` = any subdirectory, `*` = any filename
- **`urls`**: Array of external URLs to cache (CDN fonts, etc.)
  - Example: `"https://fonts.googleapis.com/**"`

**Example**:
```json
{
  "name": "app-shell",
  "installMode": "prefetch",  // Download immediately
  "updateMode": "prefetch",    // Update immediately
  "resources": {
    "files": [
      "/index.html",
      "/*.css",
      "/*.js",
      "/assets/icons/**"      // All icons
    ]
  }
}
```

---

### 3. dataGroups (API Calls & Dynamic Data)

**Purpose**: Cache dynamic data from APIs with configurable strategies

#### Properties:

**`name`** (string)
- Identifier for this data group
- Example: `"api-fresh"`, `"api-performance"`

**`urls`** (array of strings/patterns)
- URL patterns to match
- Supports glob patterns: `"/api/**"`, `"/api/users/*"`
- Only matches URLs, not query parameters (cache key includes full URL+params)

**`version`** (number, optional)
- Increment to invalidate all cached data in this group
- Forces fresh fetch for all URLs in group

**`cacheConfig`** (object) - The heart of the strategy:

**`strategy`**: `"performance"` | `"freshness"`
- **`performance`** (Cache First):
  1. Check cache → return immediately if found
  2. Fetch from network in background
  3. Update cache for next time
  4. User sees cached (possibly stale) data instantly
- **`freshness`** (Network First):
  1. Try network first
  2. Return network response if successful
  3. Fall back to cache only if network fails/times out
  4. User sees fresh data when online, cached when offline

**`maxSize`** (number)
- Maximum number of responses to cache in this group
- Example: `100` = keep last 100 API responses
- **LRU**: Least Recently Used are evicted first
- Prevents cache from growing indefinitely

**`maxAge`** (string duration)
- How long cached responses are valid
- Format: `"5m"` (5 minutes), `"1h"` (1 hour), `"3d"` (3 days)
- After expiry: treated as cache miss (will fetch from network)
- Units: `s` (seconds), `m` (minutes), `h` (hours), `d` (days)

**`timeout`** (string duration, only for `freshness`)
- How long to wait for network before falling back to cache
- Example: `"10s"` = wait 10 seconds
- Critical for slow networks
- If omitted: waits indefinitely (bad UX on slow connections)

**Example**:
```json
{
  "name": "api-weather",
  "urls": ["/api/weather/**"],
  "cacheConfig": {
    "strategy": "freshness",
    "maxSize": 50,
    "maxAge": "30m",      // Weather stale after 30 min
    "timeout": "5s"       // Fallback if network slow
  }
}
```

---

### 4. Strategy Decision Tree

**Use Performance Strategy When**:
- Content changes rarely (fonts, brand images, documentation)
- Instant load is priority over freshness
- Offline availability is critical
- Examples: UI icons, marketing images, help docs

**Use Freshness Strategy When**:
- Content changes frequently (user feeds, stock prices)
- Current data is priority over speed
- Can tolerate slower loads for accuracy
- Examples: API calls, user profiles, live data

**Hybrid Approach** (Recommended):
```json
{
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",  // App shell: performance
      "resources": { "files": ["/*.css", "/*.js"] }
    },
    {
      "name": "assets",
      "installMode": "lazy",      // Images: performance + lazy
      "resources": { "files": ["/assets/**"] }
    }
  ],
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/**"],
      "cacheConfig": {
        "strategy": "freshness",  // APIs: freshness
        "maxAge": "1h",
        "timeout": "10s"
      }
    }
  ]
}
```

---

### 5. Cache Busting & Versioning

**How Angular Handles Versioning**:
- Each build generates unique hashes for files: `main.a1b2c3d4.js`
- `ngsw-config.json` is compiled into `ngsw.json` with full file manifest
- SW compares `ngsw.json` hash to detect new versions
- Old caches are kept until new version activates (atomic updates)
- No mixed old/new files served (all-or-nothing)

## 🐛 Common Pitfalls & Debugging

### 1. "My changes aren't showing up!"
*   Cause: **Performance Strategy**. The SW returns the *cached* version first.
*   Fix: You need the `SwUpdate` flow () to notify the user.

### 2. "API calls are failing offline!"
*   Cause: You didn't define a `dataGroup` for that API, or the cache has expired (`maxAge`).
*   Fix: Verify regex in `urls` matches your API endpoint exactly.

## ⚡ Performance & Architecture

*   **Prefetch vs Lazy**: Use `prefetch` for core shell (index.html, main.js). Use `lazy` for big images or optional modules.
*   **Cache Busting**: Angular hashes build files (`main.a1b2c3.js`). The SW knows exactly which files correspond to which version.

## 🌍 Real World Use Cases

### 1. Google Fonts & External CDN Assets
**Scenario**: Third-party fonts from CDN  
**Strategy**: Performance (assetGroups with external URLs)  
**Configuration**:
```json
{
  "name": "fonts",
  "installMode": "lazy",
  "resources": {
    "urls": [
      "https://fonts.googleapis.com/**",
      "https://fonts.gstatic.com/**"
    ]
  }
}
```
**Why**: Fonts render instantly on repeat visits, no FOIT (Flash Of Invisible Text)

### 2. Weather & News Apps
**Scenario**: Real-time data with acceptable staleness  
**Strategy**: Freshness with short maxAge  
**Configuration**:
```json
{
  "name": "weather-api",
  "urls": ["/api/weather/**"],
  "cacheConfig": {
    "strategy": "freshness",
    "maxAge": "30m",    // 30-minute-old weather is okay
    "timeout": "5s",     // Don't wait forever
    "maxSize": 20
  }
}
```
**Why**: Users get current weather when online, cached forecast in tunnels

### 3. Documentation Sites
**Scenario**: MDN, Angular docs, help pages  
**Strategy**: Performance with lazy loading  
**Configuration**:
```json
{
  "name": "docs",
  "installMode": "lazy",   // Don't prefetch ALL docs
  "updateMode": "prefetch", // Update visited pages
  "resources": {
    "files": ["/docs/**/*.html", "/docs/**/*.md"]
  }
}
```
**Why**: Read documentation offline (airplanes, commutes)

### 4. Maps & Tile-Based Applications
**Scenario**: Google Maps-style tiled images  
**Strategy**: Performance with large maxSize  
**Configuration**:
```json
{
  "name": "map-tiles",
  "urls": ["https://api.mapbox.com/v4/**"],
  "cacheConfig": {
    "strategy": "performance",
    "maxSize": 500,      // Cache many tiles
    "maxAge": "7d"       // Maps don't change often
  }
}
```
**Why**: Re-visiting same area loads instantly from cache

### 5. E-Commerce Product Catalog
**Scenario**: Product images and details  
**Strategy**: Hybrid (assets=performance, API=freshness)  
**Configuration**:
```json
{
  "assetGroups": [{
    "name": "product-images",
    "installMode": "lazy",
    "resources": { "files": ["/assets/products/**"] }
  }],
  "dataGroups": [{
    "name": "product-api",
    "urls": ["/api/products/**"],
    "cacheConfig": {
      "strategy": "freshness",
      "maxAge": "1h",      // Prices/stock change
      "timeout": "10s",
      "maxSize": 100
    }
  }]
}
```
**Why**: Images cached (performance), prices fresh (accuracy)

### 6. Video Streaming / Progressive Downloads
**Scenario**: Chunk-based video delivery  
**Strategy**: Performance with very large maxSize  
**Configuration**:
```json
{
  "name": "video-chunks",
  "urls": ["/api/videos/*/chunk/*"],
  "cacheConfig": {
    "strategy": "performance",
    "maxSize": 1000,     // Many video chunks
    "maxAge": "30d"      // Videos rarely change
  }
}
```
**Why**: Re-watching doesn't re-download (saves bandwidth)

## ❓ Interview & Concept Questions

### Basic Concepts (1-5)

**Q1: What is the difference between assetGroups and dataGroups?**  
**A**:
- **assetGroups**: For static files that are part of your app (JS, CSS, images, fonts)
  - Versioned with your build
  - Change only on deployment
  - Use `installMode` and `updateMode`
- **dataGroups**: For dynamic data from APIs or external sources
  - Change independently of app deployments
  - Use caching strategies (performance/freshness)
  - Have `maxAge` and `maxSize` limits

**Q2: What does "prefetch" vs "lazy" installMode mean?**  
**A**:
- **prefetch**: Download ALL matching files when Service Worker first installs
  - Pro: Guaranteed offline access immediately
  - Con: Slower initial load (downloads everything)
  - Use for: Critical app shell (index.html, main.js, core CSS)
- **lazy**: Download files only when requested
  - Pro: Faster initial install
  - Con: Not available offline until first access
  - Use for: Images, optional features, large assets

**Q3: Explain the "performance" caching strategy**  
**A**: Cache-first strategy:
1. Request comes in
2. Check cache → if found, return immediately
3. Fetch from network in background
4. Update cache for next time
5. User sees cached (potentially stale) data instantly

**Use when**: Speed > freshness (fonts, images, docs)

**Q4: Explain the "freshness" caching strategy**  
**A**: Network-first strategy:
1. Request comes in
2. Try network first (with timeout)
3. If successful: return network data AND update cache
4. If fail/timeout: fall back to cached data
5. User sees fresh data when online, stale when offline

**Use when**: Freshness > speed (API calls, live data)

**Q5: What is maxAge and how is it formatted?**  
**A**: Specifies cache expiration time:
- **Format**: `"<number><unit>"`
  - Units: `s` (seconds), `m` (minutes), `h` (hours), `d` (days)
  - Examples: `"5m"`, `"1h"`, `"3d"`, `"30s"`
- **Behavior**: After expiry, cached item treated as stale (cache miss)
- **Use case**: Weather app `"30m"` = 30-min-old weather acceptable

### Intermediate Implementation (6-12)

**Q6: What is the purpose of the timeout property in freshness strategy?**  
**A**: Defines how long to wait for network before falling back to cache:
```json
"timeout": "10s"  // Wait 10 seconds max
```
- **Why critical**: Slow networks can hang indefinitely
- **Without timeout**: User waits forever, terrible UX
- **With timeout**: Graceful degradation to cached data
- **Only applies to**: Freshness strategy (network-first)

**Q7: How does maxSize work and what happens when exceeded?**  
**A**:
- **maxSize**: Maximum number of cached responses in a dataGroup
- **LRU Eviction**: When limit reached, Least Recently Used items deleted first
- **Example**: `maxSize: 100` for `/api/products/*`
  - Cache 100 most recent product API calls
  - 101st request evicts oldest cached product
- **Prevents**: Infinite cache growth consuming device storage

**Q8: Can you cache external URLs (CDNs)? How?**  
**A**: Yes, using `resources.urls` in assetGroups:
```json
{
  "name": "external-assets",
  "installMode": "lazy",
  "resources": {
    "urls": [
      "https://fonts.googleapis.com/**",
      "https://cdn.jsdelivr.net/**"
    ]
  }
}
```
- Must include full URL with protocol
- Supports glob patterns (`**`)
- Subject to CORS policies

**Q9: What glob patterns are supported in file matching?**  
**A**:
- `*`: Matches any characters in a single segment
  - `"/*.css"` = all CSS files in root
- `**`: Matches any characters across directories
  - `"/assets/**"` = all files in assets and subdirectories
- `!`: Negation (exclude)
  - `"!/**/*.map"` = exclude source maps
- Examples:
  - `"/assets/icons/**/*.svg"` = all SVGs in icons
  - `"/*.{css,js}"` = all CSS and JS in root

**Q10: How do you invalidate a specific dataGroup cache?**  
**A**: Increment the `version` property:
```json
{
  "name": "api-cache",
  "version": 2,  // Was 1, now 2 → invalidates all
  "urls": ["/api/**"]
}
```
- Changing version forces fresh fetch for all URLs
- Useful when API contract changes
- Old cache is purged automatically

**Q11: What is the difference between updateMode prefetch vs lazy?**  
**A**:
- **Scenario**: New app version deployed
- **updateMode: "prefetch"**:
  - Download ALL files in group immediately when update detected
  - User gets update faster
  - More bandwidth usage
- **updateMode: "lazy"**:
  - Download files only when requested in new version
  - Gradual update
  - Less initial bandwidth
- **Best practice**: Match installMode (usually both prefetch for shell)

**Q12: How does Angular detect file changes and generate new versions?**  
**A**:
1. **Build**: Each file gets content hash: `main.a1b2c3.js`
2. **Compile**: `ngsw-config.json` → `ngsw.json` with file manifest
3. **Hash**: `ngsw.json` itself gets a hash
4. **Detection**: SW compares `ngsw.json` hash on server vs cached
5. **Update**: Different hash = new version available
6. **Atomic**: All-or-nothing switch (no mixed versions)

### Advanced Scenarios & Architecture (13-20)

**Q13: Design a caching strategy for a social media feed**  
**A**:
```json
{
  "assetGroups": [
    {
      "name": "app-shell",
      "installMode": "prefetch",
      "resources": { "files": ["/*.{css,js}", "/index.html"] }
    },
    {
      "name": "avatars",
      "installMode": "lazy",
      "resources": { "files": ["/assets/avatars/**"] }
    }
  ],
  "dataGroups": [
    {
      "name": "feed",
      "urls": ["/api/feed"],
      "cacheConfig": {
        "strategy": "freshness",  // Always try fresh
        "maxAge": "5m",            // 5-min-old posts okay
        "timeout": "3s",           // Fast timeout
        "maxSize": 10
      }
    },
    {
      "name": "user-profiles",
      "urls": ["/api/users/*"],
      "cacheConfig": {
        "strategy": "performance", // Profiles change rarely
        "maxAge": "1h",
        "maxSize": 100
      }
    }
  ]
}
```

**Q14: What happens if both assetGroup and dataGroup match the same URL?**  
**A**:
- **assetGroups take precedence** over dataGroups
- **Best practice**: Keep them mutually exclusive
  - assetGroups: `/assets/**`, `/*.js`, `/*.css`
  - dataGroups: `/api/**`, external APIs
- **Why**: Prevents conflicting cache strategies

**Q15: How do query parameters affect caching in dataGroups?**  
**A**:
- **URL pattern matches**: Base URL only
  - Pattern: `"/api/products/*"`
  - Matches: `/api/products/123`, `/api/products/456`
- **Cache key includes**: Full URL + query params
  - `/api/products?sort=price` ≠ `/api/products?sort=name`
  - Different query params = different cache entries
- **Impact on maxSize**: Each unique URL+params counts toward limit

**Q16: How would you implement a "stale-while-revalidate" strategy?**  
**A**: Use performance strategy with appropriate maxAge:
```json
{
  "strategy": "performance",  // Serve cache immediately
  "maxAge": "1h",              // Consider stale after 1h
  "maxSize": 50
}
```
- **Behavior**:
  1. Serve cached version immediately (stale)
  2. Fetch from network in background (revalidate)
  3. Update cache for next request
- **Note**: Angular SW doesn't have explicit SWR, but performance strategy approximates it

**Q17: What are navigationUrls and when do you need to configure them?**  
**A**:
- **Purpose**: Define which URLs are app routes (should serve index.html)
- **Default**: Usually works without configuration
- **Customize when**: Using client-side routing with custom URL patterns
```json
"navigationUrls": [
  "/**",           // All routes
  "!/api/**",      // Except API calls
  "!/**/*.*",      // Except files with extensions
  "!/**/*__*"      // Except special patterns
]
```
- **Effect**: Matched URLs → serve cached index.html (SPA routing)

**Q18: How do you handle versioned APIs (e.g., /api/v1/ vs /api/v2/)?**  
**A**: Create separate dataGroups:
```json
{
  "dataGroups": [
    {
      "name": "api-v1",
      "urls": ["/api/v1/**"],
      "cacheConfig": {
        "strategy": "performance",  // Old API, stable
        "maxAge": "1d"
      }
    },
    {
      "name": "api-v2",
      "urls": ["/api/v2/**"],
      "cacheConfig": {
        "strategy": "freshness",    // New API, evolving
        "maxAge": "10m",
        "timeout": "5s"
      }
    }
  ]
}
```

**Q19: What is the impact of caching on A/B testing or feature flags?**  
**A**:
- **Problem**: Cached responses might have old A/B variant
- **Solutions**:
  1. **Short maxAge**: `"5m"` forces frequent revalidation
  2. **Vary headers**: Backend sends `Vary: X-User-ID`
  3. **Client-side flags**: Don't cache flag API (`maxAge: "0s"`)
  4. **URL params**: Include variant in URL (different cache keys)
```json
{
  "name": "ab-test-api",
  "urls": ["/api/experiments"],
  "cacheConfig": {
    "strategy": "freshness",
    "maxAge": "1m",     // Very short
    "timeout": "2s"
  }
}
```

**Q20: How do caching strategies affect analytics tracking?**  
**A**:
- **Problem**: Cached pages might not fire analytics
- **Solutions**:
  1. **Don't cache analytics scripts**: Exclude from assetGroups
  ```json
  "files": ["/**/*.js", "!/**/analytics.js"]
  ```
  2. **Don't cache tracking APIs**: Exclude from dataGroups
  ```json
  "urls": ["/api/**"],  // But not /api/track
  ```
  3. **Client-side tracking**: Track in app code, not via HTTP
  4. **Network-only**: Use `timeout: "1s"` for tracking endpoints

### Debugging & Best Practices (21-25)

**Q21: How do you debug which strategy is being used for a request?**  
**A**:
1. **DevTools**: Application tab → Cache Storage
   - See different cache buckets (ngsw:db, ngsw:assets, etc.)
   - Inspect cached entries
2. **Network tab**: Look for "(ServiceWorker)" in Size column
3. **Console**: Enable SW logging in chrome://serviceworker-internals
4. **Code**: Add logging in ngsw-config:
```json
"appData": { "debugMode": true }
```

**Q22: What's the recommended maxSize for different content types?**  
**A**:
- **API responses** (JSON): 50-100 (small size)
- **Images**: 100-500 (medium size)
- **Map tiles**: 500-2000 (many small files)
- **Video chunks**: 100-1000 (large files, fewer count)
- **User profiles**: 100-200
- **Rule of thumb**: Estimate storage (maxSize × avg response size)

**Q23: Should you cache POST requests?**  
**A**: **No**, Angular SW only caches GET requests:
- **Why**: POST/PUT/DELETE are mutations (not idempotent)
- **POST**: Creates resources
- **PUT/DELETE**: Modifies/deletes resources
- **Caching these**: Would cause stale writes, data corruption
- **Exception**: Read-only POST (bad API design, but cache with dataGroup)

**Q24: How do you test caching strategies locally?**  
**A**:
1. **Production build**: `ng build` (SW disabled in dev)
2. **Serve**: `npx http-server -p 8080 -c-1 dist/app`
   - `-c-1` disables HTTP caching (test SW only)
3. **DevTools**: 
   - Application → Service Workers (check status)
   - Network → Offline mode
   - Cache Storage → inspect cached items
4. **Make changes**: Edit code, rebuild
5. **Refresh**: Check if update detected

**Q25: What are common mistakes in ngsw-config.json?**  
**A**:
1. **Wrong glob patterns**: `"/assets/*"` vs `/assets/**` (missing subdirs)
2. **Too aggressive prefetch**: Prefetching GBs of unnecessary files
3. **No timeout**: Freshness without timeout hangs on slow networks
4. **Conflicting patterns**: assetGroup and dataGroup overlap
5. **Overly short maxAge**: `"1s"` negates caching benefits
6. **Overly long maxAge**: `"30d"` for API = very stale data
7. **Missing external URLs**: Trying to cache CDN without `urls` array
8. **Incorrect URL patterns**: `/api` vs `/api/**` (missing glob)

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  SERVICE WORKER CACHING STRATEGIES                          │
│                                                             │
│   PERFORMANCE (AssetGroups):                                │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ Request → Cache → Return INSTANTLY                    │ │
│   │                    (Background: fetch + update cache) │ │
│   │                                                       │ │
│   │ Use for: Fonts, Images, CSS, JS bundles               │ │
│   │ ngsw-config: { installMode: "prefetch" or "lazy" }    │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   FRESHNESS (DataGroups):                                   │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ Request → Network FIRST → Success? Return + cache     │ │
│   │                         → Timeout/Fail? Return cache  │ │
│   │                                                       │ │
│   │ Use for: API calls, user data, live feeds             │ │
│   │ ngsw-config: { strategy: "freshness", timeout: "10s" }│ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   prefetch = download ALL at start (core shell)            │
│   lazy = download ONLY when requested (images)             │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Performance = cache first (fast!). Freshness = network first (current data). Use prefetch for core shell, lazy for assets!

