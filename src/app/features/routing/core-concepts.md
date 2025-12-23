# 🧭 Angular Routing: Core Concepts Guide

This guide breaks down the essential building blocks of Angular Routing: **Routes**, **Router**, **routerLink**, **RouterLinkActive**, and **ActivatedRoute**.

---

## 1. `Routes` (The Configuration)

`Routes` is a **type definition** that represents an array of route configurations. It tells the Angular Router how to interpret URLs and which component to load for each path.

### 📝 Key Properties
- **`path`**: The URL segment to match (e.g., `'admin'`). 
- **`component`**: The component to load immediately.
- **`loadChildren` / `loadComponent`**: Function to lazy-load a module or standalone component (Performance 🚀).
- **`redirectTo`**: Redirects to another path (often used with `pathMatch: 'full'`).
- **`data`**: Static read-only data (e.g., `{ title: 'Home Page' }`).

---

## 2. `Router` (The Navigation Service)

The `Router` is a **Service** that you inject into your components to perform *programmatic navigation*. Use this when you need to navigate based on logic (e.g., after a form submit or API call).

### 🛠️ Common Methods
- **`navigate(['/path', param])`**: Navigates to a specific route using an array of segments.
- **`navigateByUrl('/path/123')`**: Navigates using a complete string URL.
- **`url`**: Property that returns the current active URL as a string.

---

## 3. `routerLink` (The Declarative Navigation)

`routerLink` is a **Directive** used in your HTML templates to link to specific parts of your application. It intercepts click events so the browser doesn't reload the page, preserving the Single Page Application (SPA) experience.

### 🛠️ Key Usages
- **String Input**: Use for static, simple paths.
- **Array Input (`[]`)**: Use for dynamic paths or passing parameters.
- **Relative vs. Absolute**: Paths starting with `/` are absolute (from root). Paths without `/` are relative to the current URL.

### 💻 Example
```html
<!-- 1. Static String Link (String) -->
<a routerLink="/home">Go Home</a>

<!-- 2. Dynamic Link with Parameters (Array) -->
<!-- Generates: /products/123 -->
<a [routerLink]="['/products', productId]">View Product</a>

<!-- 3. Link with Query Params -->
<!-- Generates: /search?q=angular -->
<a routerLink="/search" [queryParams]="{ q: 'angular' }">Search</a>

<!-- 4. Relative Navigation -->
<!-- If currently at /products, this goes to /products/details -->
<a routerLink="details">Details</a>

<!-- 5. Navigate Up a Level -->
<a routerLink="../">Back</a>
```

> **💡 Best Practice**: Always use `[routerLink]` (Array syntax) when your path is dynamic or has multiple segments.

---

## 4. `RouterLinkActive` (The Styling Directive)

`RouterLinkActive` is a **Directive** that toggles a CSS class on an element when the associated `routerLink` is currently active. This is perfect for highlighting the current menu item in a navigation bar.

### 🎨 How it works
- It watches the current URL.
- If the URL matches the `routerLink`, it adds the class.
- If the URL changes to something else, it removes the class.

### 💻 Example
```html
<nav>
  <!-- 
    When URL is '/home':
    Class 'active-link' is ADDED.
    User sees a highlighted "Home" button.
  -->
  <a routerLink="/home" 
     routerLinkActive="active-link" 
     [routerLinkActiveOptions]="{ exact: true }">
     Home
  </a>

  <!-- 
    When URL is '/products' OR '/products/123':
    Class 'active-link' is ADDED (because it contains '/products').
  -->
  <a routerLink="/products" 
     routerLinkActive="active-link">
     Products
  </a>
</nav>

<style>
  .active-link {
    font-weight: bold;
    color: blue;
    border-bottom: 2px solid blue;
  }
</style>
```

---

## 5. `ActivatedRoute` (The Current State)

`ActivatedRoute` is a **Service** that represents the *currently loaded route*. Inject this into your component to access information about the current URL, parameters, and data.

### 🔍 Key Properties
- **`params`**: Observable of path parameters (e.g., `id` in `user/:id`).
- **`queryParams`**: Observable of query string parameters (e.g., `?sort=asc`).
- **`snapshot`**: The state of the route *at the moment the component was created*. (Does not update if URL changes while component stays alive).
- **`data`**: Observable of static data defined in the route config.

### 💻 Example
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ ... })
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  searchQuery: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // 1. Reading Path Parameters (Reactive)
    // Works even if user navigates from /products/1 to /products/2
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      console.log('Product ID:', this.productId);
      // Fetch new product data here...
    });

    // 2. Reading Query Parameters (Reactive)
    // URL: /products/1?ref=newsletter
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['ref'];
      console.log('Referred by:', this.searchQuery);
    });

    // 3. Using Snapshot (One-time read)
    // Use only if you are sure the component is re-created on navigation
    const staticId = this.route.snapshot.paramMap.get('id');
  }
}
```

---

## 6. Advanced & Missing Concepts

### 🔄 Path Match Strategies
When defining redirects, `pathMatch` is crucial:
- **`pathMatch: 'full'`**: Matches the *entire* URL. Use this for empty path redirects `path: ''` to avoid infinite loops (since empty string matches every path's prefix).
- **`pathMatch: 'prefix'`**: Matches if the URL *start* matches the path. This is the default.

### 🔢 Route Order Matters
Angular Router uses a **First Match Wins** strategy.
- Always place specific routes (e.g., `products/new`) **BEFORE** generic routes (e.g., `products/:id`).
- Always place the Wildcard route (`**`) **LAST**.

### 🛡️ Route Guards (Security)
Guards prevent users from unauthorized access.
- **`canActivate`**: Checks if user can visit a route.
- **`canDeactivate`**: Checks if user can leave (e.g., "You have unsaved changes").
- **`resolve`**: Pre-fetches data *before* the component loads.

### 🗺️ Location Strategies
- **PathLocationStrategy (Default)**: Uses HTML5 History API (e.g., `example.com/home`). Requires server config to redirect 404s to `index.html`.
- **HashLocationStrategy**: Uses URL hash fragment (e.g., `example.com/#/home`). Works on any server without config.

---

## 🎤 Usage Scenarios & Interview Questions

### 🛑 Scenario 1: The "Infinite Loop" Bug
**Q: I added a redirect `{ path: '', redirectTo: 'home' }`, but my app crashes with an infinite loop. Why?**
> **A:** You forgot `pathMatch: 'full'`. The default is `'prefix'`, and since an empty string `''` is a prefix of *every* string, Angular matches it, redirects to `home`, matches `home`'s empty prefix again, and loops forever.

### 🔄 Scenario 2: Component Not Updating
**Q: I am on `/products/1` and I click a link to `/products/2`. The URL changes, but the component doesn't re-initialize (ngOnInit doesn't run). Why?**
> **A:** Angular reuses the component instance for performance when only the parameter changes. `ngOnInit` only runs on creation.
> **Fix:** Subscribe to `this.route.params`, which is an Observable. It will emit the new ID (2) so you can update the view manually.

### 🔗 Scenario 3: routerLink vs href
**Q: Why use `routerLink` instead of `href`?**
> **A:** `href` causes a **full page reload**, which resets your application state, clears memory, and is slower. `routerLink` uses the Angular Router to swap components instantly without reloading the page, preserving the SPA experience.

### 🚧 Scenario 4: Protecting Routes
**Q: How do you prevent a user from accessing `/admin` if they are not logged in?**
> **A:** Use a **Guard** implementing `CanActivateFn`. Add it to the route config: `{ path: 'admin', canActivate: [authGuard] }`.

---

## 🧠 Summary Cheat Sheet

| Feature | Type | Purpose | Analogy |
| :--- | :--- | :--- | :--- |
| **`Routes`** | Config (Type) | Defines the map of URLs to Components. | The **Map** of the city. |
| **`Router`** | Service | Performing navigation actions (Go to X). | The **Driver**. |
| **`routerLink`** | Directive | Creating navigation links in HTML. | The **Signposts**. |
| **`RouterLinkActive`** | Directive | Styling the active link in the UI. | The **"You Are Here"** highlighter. |
| **`ActivatedRoute`** | Service | Reading params of the *current* page. | The **Address Card** of your current location. |
