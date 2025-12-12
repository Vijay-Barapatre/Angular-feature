# 👶 Angular Child Routes

This guide explains how to nest components within other components using routing, creating complex page layouts.

## 🔍 How It Works (The Concept)

Angular allows you to define routes *inside* other routes.
*   **Parent Route**: Displays the "Layout" (e.g., Sidebar, Header) and contains a `<router-outlet>`.
*   **Child Route**: Displays the specific content inside the parent's outlet.

### Mermaid Diagram: Component Nesting

```mermaid
graph TD
    A[App Component] -->|contains| B[Router Outlet (Root)]
    B -->|renders| C[ChildRoutes Component (Parent)]
    C -->|contains| D[Router Outlet (Nested)]
    D -->|renders| E[Overview Component]
    D -.->|or renders| F[Settings Component]
```

## 🚀 Step-by-Step Implementation Guide

### 1. Define Nested Routes (`children` array)
In your routing configuration, use the `children` property.

```typescript
{
  path: 'dashboard',
  component: DashboardLayoutComponent, // <--- Has the <router-outlet>
  children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'stats', component: StatsComponent }
  ]
}
```

### 2. Create the Parent Layout
The parent component **must** include a `<router-outlet>` tag where the children will appear.

```typescript
@Component({
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="dashboard">
      <nav>
        <!-- Relative links! No need for /dashboard/overview -->
        <a routerLink="overview">Overview</a>
        <a routerLink="stats">Stats</a>
      </nav>
      
      <main>
        <!-- Children load here ⬇️ -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class DashboardLayoutComponent {}
```

## 🐛 Common Pitfalls & Debugging

### 1. Missing `router-outlet`
If you navigate to a child route but the screen is blank (or only shows the parent), you likely forgot the `<router-outlet>` in the **Parent Component's template**.

### 2. PathMatch: 'full'
When redirecting the empty path `''`:
*   `{ path: '', redirectTo: 'overview' }` ❌ **Infinite Loop / Error** (Matches everything partially)
*   `{ path: '', redirectTo: 'overview', pathMatch: 'full' }` ✅ **Correct** (Matches only exact empty path)

## ⚡ Performance & Architecture

*   **Encapsulation**: Child routes keep feature logic bundled together. The "Dashboard" feature doesn't need to know about the global app structure, it just manages its own sub-views.
*   **Lazy Loading**: You can lazy load the entire parent *and* its children as a single bundle (as we did with this Feature Module).

## 🌍 Real World Use Cases

1.  **Tab Layouts**: A page with "Profile", "Settings", and "Activity" tabs. The tabs are the parent; the content is the child.
2.  **Admin Panels**: Left sidebar + Top Header (Parent) with changing content area (Children).
3.  **Wizards/Steppers**: Step 1, Step 2, Step 3 as child routes to preserve state in the URL.

## 🖼️ Picture Frame Analogy (Easy to Remember!)

Think of Child Routes like a **picture frame on the wall**:

| Concept | Frame Analogy | Memory Trick |
|---------|---------------|--------------| 
| **Parent** | 🖼️ **The frame**: Stays on wall, holds content | **"Layout"** |
| **router-outlet** | ⬜ **The opening**: Where photo goes | **"Content slot"** |
| **Child routes** | 🎨 **The photos**: Slide in and out | **"Page content"** |
| **children[]** | 📚 **Photo album**: Collection to choose from | **"Route config"** |
| **Navigate** | 🔄 **Change photo**: Same frame, different picture | **"Switch child"** |

### 📖 Story to Remember:

> 🖼️ **The Gallery Wall**
>
> Your layout is a picture frame:
>
> **The Frame (Parent):**
> ```typescript
> @Component({
>   template: `
>     <nav>Menu</nav>         <!-- Frame border -->
>     <router-outlet></router-outlet>  <!-- ⬜ Opening! -->
>   `
> })
> export class DashboardLayout {}
> ```
>
> **The Photos (Children):**
> ```typescript
> {
>   path: 'dashboard',
>   component: DashboardLayout,  // 🖼️ Frame
>   children: [
>     { path: 'overview', component: Overview },  // 🎨 Photo 1
>     { path: 'stats', component: Stats }         // 🎨 Photo 2
>   ]
> }
> ```
>
> **Change photos without changing the frame!**

### 🎯 Quick Reference:
```
🖼️ Parent          = Frame (stays fixed)
⬜ router-outlet   = Opening (content slot)
🎨 Child routes    = Photos (swap in/out)
📚 children[]      = Photo album (all options)
🔄 Navigate        = Change the photo
```

## ❓ Interview & Concept Questions

1.  **Q: How do relative links work in child routes?**
    *   A: `routerLink="next"` appends to the current path. `routerLink="../"` goes up one level.
2.  **Q: Can you have multiple router outlets?**
    *   A: Yes, using "Named Outlets" (primary + auxiliary routes), though simple child nesting is more common.
3.  **Q: If I put a Guard on the parent, does it check children?**
    *   A: Yes! `canActivate` on the parent runs before any child can load. `canActivateChild` is specifically for checking permissions when navigating *between* children.
