# 🏗️ Use Case 4: Child Routes (Nested Routing)

> **💡 Key Concept**: Child routes enable nested layouts where a parent component wraps child components. The parent maintains the layout/navigation while children swap in the outlet.

---

## 🖼️ Visual Flow

![Child Routes Flow](./child-routes-flow.png)

## 🎯 When to Use Child Routes

- **Dashboard Layouts**: Admin panels with sidebar navigation
- **Tab-Based UIs**: Settings pages with multiple sections
- **Master-Detail Views**: List with detail panel
- **Multi-Step Wizards**: Steps sharing a common header/footer

## 📝 Implementation

### Route Configuration

```typescript
// routing.routes.ts
{
  path: 'dashboard',
  component: DashboardComponent,  // Parent
  children: [
    {
      path: 'overview',
      component: OverviewComponent  // Child
    },
    {
      path: 'settings',
      component: SettingsComponent  // Child
    },
    {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full'  // Default child
    }
  ]
}
```

### Parent Component Template

```typescript
@Component({
  template: `
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <nav>
        <a routerLink="overview" routerLinkActive="active">Overview</a>
        <a routerLink="settings" routerLinkActive="active">Settings</a>
      </nav>
    </div>

    <!-- Child components render here -->
    <router-outlet></router-outlet>
  `
})
export class DashboardComponent { }
```

### Child Component (Simple)

```typescript
@Component({
  template: `
    <div class="overview-content">
      <h2>Dashboard Overview</h2>
      <!-- Child-specific content -->
    </div>
  `
})
export class OverviewComponent { }
```

## 🔑 Key Concepts

| Concept | Description |
|---------|-------------|
| `<router-outlet>` | Placeholder where child components render |
| Relative Links | `routerLink="overview"` is relative to parent path |
| `routerLinkActive` | Auto-applies CSS class when route is active |
| Default Child | Use `redirectTo` with empty path for default |

## 🌳 URL Structure

```
/dashboard               → Parent + Default Child (Overview)
/dashboard/overview      → Parent + Overview Child
/dashboard/settings      → Parent + Settings Child
```

## ⚠️ Common Patterns

**Relative vs Absolute Navigation:**
```typescript
// ✅ Relative (Recommended for child routes)
<a routerLink="settings">Settings</a>
// Navigates to /dashboard/settings

// ⚠️ Absolute (Use when needed)
<a routerLink="/dashboard/settings">Settings</a>
// Always goes to /dashboard/settings regardless of current route
```

**Nested children (Multiple Levels):**
```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    {
      path: 'settings',
      component: SettingsComponent,
      children: [
        { path: 'profile', component: ProfileComponent },
        { path: 'security', component: SecurityComponent }
      ]
    }
  ]
}
// Creates: /dashboard/settings/profile
```
