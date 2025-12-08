# 💤 Lazy Loading Dynamic Components

This guide explains how to split your application into smaller chunks and load components only when needed.

## 🔍 How It Works (The Concept)

By default, Angular bundles all imported components into `main.js`. If you have a massive "Admin Dashboard" or "Chart Widget" that only 1% of users see, you are slowing down the app for everyone.

**Lazy Loading** allows you to keep that code in a separate file (e.g., `src_app_features_heavy-widget_ts.js`) that is only requested over the network when you call `import()`.

### Mermaid Diagram: Bundle Splitting

```mermaid
graph TD
    User[User]
    MainBundle[Main Bundle (Initial Load)]
    Chunk[Lazy Chunk (HeavyWidget)]
    
    User-->MainBundle
    MainBundle-.->|Click Button|Chunk
    Chunk-->|Render|User
```

## 🚀 Step-by-Step Implementation Guide

### 1. Structure
Create your heavy component in a separate file. **DO NOT** import it at the top of your parent component file using a standard `import`.

### 2. Use Dynamic Import
In your method (e.g., `onClick`), use the `import()` function.

```typescript
async loadWidget() {
    // 1. Fetch the code
    const module = await import('./heavy-widget.component');
    const ComponentClass = module.HeavyWidgetComponent;
    
    // 2. Render it
    this.vcr.createComponent(ComponentClass);
}
```

### 3. Handle Loading State
Since fetching code is an asynchronous network request, it can take time (slow 3G). Always show a spinner or loading indicator.

```typescript
this.isLoading = true;
try {
   const { Widget } = await import('./widget');
   this.vcr.createComponent(Widget);
} finally {
   this.isLoading = false;
}
```

## ⚡ Performance Benefits

1.  **Smaller Initial Bundle**: Users download less KB to see the first screen.
2.  **Faster TTI (Time to Interactive)**: Main thread is less busy parsing huge JS files.

## 🌍 Real World Use Cases

1.  **Complex Editors**: Loading a Rich Text Editor (like TinyMCE or Quill) only when the user clicks "Edit".
2.  **Admin Tools**: Loading heavy administrative grids/charts only for admin users.
3.  **Third-Party Libs**: Wrapping a heavy library (like `Three.js` or `D3.js`) in a component and lazy loading it.
