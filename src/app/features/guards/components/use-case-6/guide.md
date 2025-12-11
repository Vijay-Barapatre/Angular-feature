# Use Case 6: canActivateChild Guard

## 🎯 What is canActivateChild?

`canActivateChild` protects **ALL child routes** of a parent route with a single guard. Instead of adding `canActivate` to each child, you add one guard to the parent.

## 🆚 canActivate vs canActivateChild

| Aspect | canActivate | canActivateChild |
|--------|-------------|------------------|
| **Protects** | Single route | All child routes |
| **Configuration** | On each route | Once on parent |
| **Runs** | Once when navigating | For each child navigation |
| **Best for** | Individual routes | Sections/modules |

## 💡 Visual Example

```
/admin (parent)  ← canActivateChild: [adminGuard]
  ├── /admin/users     ← Protected automatically ✓
  ├── /admin/settings  ← Protected automatically ✓
  ├── /admin/reports   ← Protected automatically ✓
  └── /admin/logs      ← Protected automatically ✓
```

## 📝 Implementation

### 1. Create the Guard

```typescript
// activate-child.guard.ts
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminChildGuard: CanActivateChildFn = (
    childRoute,
    state
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    // This runs for EVERY child route navigation
    console.log('Checking access to:', state.url);
    
    if (!authService.isAdmin()) {
        return router.createUrlTree(['/unauthorized']);
    }
    
    return true;
};
```

### 2. Configure Routes

```typescript
// app.routes.ts
{
    path: 'admin',
    canActivateChild: [adminChildGuard],  // Protects ALL children
    children: [
        { path: 'users', component: UsersComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'reports', component: ReportsComponent }
    ]
}
```

## ✅ Benefits

1. **DRY Principle** - Define guard once, protects all children
2. **Consistent Security** - Impossible to forget a child route
3. **Easy Maintenance** - Change guard in one place
4. **Audit Logging** - Easy to log all child navigations

## ⚠️ Common Use Cases

- Admin sections with multiple pages
- Settings areas
- Subscription-only feature sections
- Multi-step wizards that require auth
