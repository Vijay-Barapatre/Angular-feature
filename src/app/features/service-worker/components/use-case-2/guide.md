# 📦 Service Worker Caching Strategies

This guide helps you understand how `ngsw-config.json` controls caching.

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

## 🐛 Common Pitfalls & Debugging

### 1. "My changes aren't showing up!"
*   Cause: **Performance Strategy**. The SW returns the *cached* version first.
*   Fix: You need the `SwUpdate` flow (Use Case 1) to notify the user.

### 2. "API calls are failing offline!"
*   Cause: You didn't define a `dataGroup` for that API, or the cache has expired (`maxAge`).
*   Fix: Verify regex in `urls` matches your API endpoint exactly.

## ⚡ Performance & Architecture

*   **Prefetch vs Lazy**: Use `prefetch` for core shell (index.html, main.js). Use `lazy` for big images or optional modules.
*   **Cache Busting**: Angular hashes build files (`main.a1b2c3.js`). The SW knows exactly which files correspond to which version.

## 🌍 Real World Use Cases

1.  **Google Fonts**: Cache them with `performance` strategy so they render instantly on next visit.
2.  **Weather App**: Use `freshness` with a 30m `maxAge`. You want current temp, but cached is better than nothing if tunnel.
