# Use Case 5: canLoad Guard

## 🎯 What is canLoad?

`canLoad` prevents a lazy-loaded module from being **downloaded** at all. If it returns false, the module code is never fetched from the server.

## 🆚 canLoad vs canActivate

| Aspect | canActivate | canLoad |
|--------|-------------|---------|
| **When it runs** | After module downloads | Before module downloads |
| **If blocked** | Module code already in browser | Module code never fetched |
| **Network request** | Module is downloaded | No network request |
| **Security** | Code visible in DevTools | Code stays on server |
| **Best for** | Route-level access | Feature-level access |

## 💡 Real-World Use Cases

1. **Subscription Features** - Don't download premium code for free users
2. **Admin Modules** - Keep admin code hidden from regular users
3. **Feature Flags** - Don't load disabled feature modules
4. **Bandwidth Optimization** - Reduce initial download size

## 📝 Implementation

### 1. Create the Guard

```typescript
// can-load.guard.ts
import { inject } from '@angular/core';
import { CanLoadFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const premiumLoadGuard: CanLoadFn = (route, segments) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (!authService.isPremium()) {
        // Option 1: Just block (return false)
        return false;
        
        // Option 2: Redirect
        return router.createUrlTree(['/upgrade']);
    }
    
    return true;  // Allow module to load
};
```

### 2. Apply to Lazy-Loaded Route

```typescript
// app.routes.ts
{
    path: 'premium-features',
    canLoad: [premiumLoadGuard],  // Checked BEFORE download
    loadChildren: () => import('./premium/premium.routes')
}
```

## ⚠️ Important Notes

1. **Only works with lazy loading** - Eager-loaded modules are already bundled
2. **One-time check** - Once loaded, module stays in memory
3. **Use with loadChildren** - Not with loadComponent
4. **Combine with canActivate** - For route-level checks after loading

## 🔐 Security Consideration

`canLoad` provides **code obfuscation**, not true security:
- Premium features code is never sent to free users
- But server-side validation is still required
- API endpoints must verify permissions independently
