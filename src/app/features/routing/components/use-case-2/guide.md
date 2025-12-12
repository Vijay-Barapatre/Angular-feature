# 🆔 Angular Route Parameters

This guide explains how to pass data between pages using dynamic URL segments.

## 🔍 How It Works (The Concept)

Route parameters are placeholders in your URL definition (e.g., `/user/:id`). They act like variables that the Angular Router fills in.

*   **Required**: The route won't match if the parameter is missing.
*   **Dynamic**: The same component displays different data based on the parameter.

### Mermaid Diagram: Reading Parameters

```mermaid
graph LR
    A[URL: /user/42] -->|Router Matches| B(Route Definition: /user/:id)
    B -->|Extracts| C{ActivatedRoute}
    C -->|Exposes| D[snapshot.paramMap]
    C -->|Exposes| E[paramMap Observable]
    
    D -->|Get 'id'| F[Value: 42 (String)]
    E -->|Subscribe 'id'| F
```

## 🚀 Step-by-Step Implementation Guide

### 1. Define the Parameterized Route
In your routes file, use a colon `:` to denote a parameter.
```typescript
{ 
  path: 'user/:id', // <--- :id is the parameter
  component: UserProfileComponent 
}
```

### 2. Link to the Route
Pass an array to `routerLink`. The second item fills the parameter.
```typescript
<!-- Result: /user/123 -->
<a [routerLink]="['/user', 123]">View User 123</a>
```

### 3. Read the Parameter (Observable Approach)
This is the **recommended** way. It handles changes if the user navigates from `/user/1` to `/user/2` without leaving the component.

```typescript
// 🛡️ CRITICAL: Import ActivatedRoute
import { ActivatedRoute } from '@angular/router';

export class UserProfileComponent {
  userId$: Observable<string | null>;

  constructor(private route: ActivatedRoute) {
    // updates automatically when URL changes
    this.userId$ = this.route.paramMap.pipe(
      map(params => params.get('id')) 
    );
  }
}
```

## 🐛 Common Pitfalls & Debugging

### 1. String vs. Number
Route parameters are **ALWAYS strings**.
*   **Bad**: `if (id === 5)` (might fail if id is "5")
*   **Good**: `const id = Number(params.get('id'));`

### 2. Snapshot vs. Observable
Using `snapshot` only reads the parameter **once** when the component is created.
```typescript
// ⚠️ BAD if you navigate from /user/1 to /user/2
// The component is reused, so ngOnInit doesn't run again!
const id = this.route.snapshot.paramMap.get('id'); 
```
**Fix:** Use `.paramMap.subscribe()` (or `AsyncPipe`) to react to changes.

## ⚡ Performance & Architecture

*   **Component Reuse**: Angular defaults to reusing the component instance if only the route parameters change (e.g., Next/Previous user buttons). This saves performance but requires you to use Observables to detect changes.

## 🌍 Real World Use Cases

1.  **Product Details**: `/products/pixel-8-pro`
2.  **Order History**: `/orders/ORD-99283`
3.  **User Profiles**: `/profile/vijay`

## 📬 Mailbox Address Analogy (Easy to Remember!)

Think of route parameters like **mailbox addresses**:

| Concept | Mailbox Analogy | Memory Trick |
|---------|----------------|--------------| 
| **Route path** | 🛣️ **Street name**: "/users" is Main Street | **"The base route"** |
| **:id parameter** | 📬 **House number**: #42 on Main Street | **"The variable part"** |
| **ActivatedRoute** | 📨 **Mailman's log**: Shows current house details | **"Route info"** |
| **paramMap** | 📝 **Address card**: Extract number from "Main St #42" | **"Read the parameter"** |
| **Observable** | 🔔 **Doorbell notification**: Alerts when address changes | **"React to changes"** |

### 📖 Story to Remember:

> 📬 **The Mailman's Route**
>
> You're a mailman (component) on Main Street:
>
> **Defining the Route:**
> ```typescript
> { path: 'user/:id', component: UserComponent }
> // "Main Street, with house numbers"
> ```
>
> **Navigating to a House:**
> ```html
> <a [routerLink]="['/user', 42]">House 42</a>
> <!-- Result: /user/42 -->
> ```
>
> **Reading the Address:**
> ```typescript
> // Snapshot = look at address ONCE
> const id = route.snapshot.paramMap.get('id');  // "42"
> 
> // Observable = get NOTIFIED when you move houses
> route.paramMap.subscribe(params => {
>   const id = params.get('id');  // Updates automatically!
> });
> ```
>
> **Same street ("/user"), different houses (:id)!**

### 🎯 Quick Reference:
```
🛣️ path: 'x/:id'   = Street with house numbers
📬 :id             = Variable house number
📨 ActivatedRoute   = Mailman's current info
📝 paramMap.get('id') = Read the house number
🔔 paramMap$        = Notifications when address changes
```

## ❓ Interview & Concept Questions

1.  **Q: valid parameter names?**
    *   A: Alphanumeric characters (e.g., `:id`, `:username`).
2.  **Q: What happens if I use snapshot and navigate to the same route with different ID?**
    *   A: The data won't update because the component isn't destroyed/recreated. The snapshot remains stale. Be "Reactive"!
