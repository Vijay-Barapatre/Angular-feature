# Use Case 7: Combined Guards

## 🎯 What are Combined Guards?

You can apply **multiple guards** to a single route. Guards run in order, and **ALL must return true** for navigation to proceed.

## 🔗 Execution Flow

```
canActivate: [guard1, guard2, guard3]

Execution: guard1 → guard2 → guard3
If ANY returns false/UrlTree → Navigation STOPS
```

## 💡 Real-World Use Case: Multi-Layer Security

```typescript
{
    path: 'admin-dashboard',
    canActivate: [
        authCheckGuard,       // 1. Is user logged in?
        roleCheckGuard,       // 2. Does user have admin role?
        featureFlagGuard,     // 3. Is this feature enabled?
        maintenanceModeGuard  // 4. Is system operational?
    ],
    data: {
        requiredRole: 'admin'
    }
}
```

## 📝 Guard Implementations

### Guard 1: Authentication

```typescript
export const authCheckGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (!authService.isLoggedIn()) {
        return router.createUrlTree(['/login']);
    }
    return true;
};
```

### Guard 2: Role Check

```typescript
export const roleCheckGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const requiredRole = route.data?.['requiredRole'] || 'user';
    
    if (!authService.hasRole(requiredRole)) {
        return router.createUrlTree(['/unauthorized']);
    }
    return true;
};
```

### Guard 3: Feature Flag

```typescript
export const featureFlagGuard: CanActivateFn = (route, state) => {
    const featureService = inject(FeatureService);
    const featureName = route.data?.['feature'];
    
    return featureService.isEnabled(featureName);
};
```

## ✅ Best Practices

1. **Order matters** - Put fast guards first
2. **Single responsibility** - Each guard checks ONE thing
3. **Reusable** - Same guards, different combinations
4. **Clear naming** - Guard names describe what they check

## ⚠️ Performance Tip

Guards run sequentially. If a guard makes an API call, put it LAST:

```typescript
canActivate: [
    authGuard,      // Fast (checks local state)
    roleGuard,      // Fast (checks token)
    apiCheckGuard   // Slow (API call) - Put last!
]
```
