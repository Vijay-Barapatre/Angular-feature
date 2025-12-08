# Guards Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: Auth Guard (canActivate)
Protect routes from unauthenticated users.

```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  return auth.isLoggedIn() 
    ? true 
    : router.createUrlTree(['/login']);
};
```

### Exercise 2: Role Guard
Check user roles before allowing access.

### Exercise 3: CanDeactivate Guard
Confirm before leaving unsaved changes.

### Exercise 4: Resolve Guard
Pre-fetch data before route activation.

## 🟥 Complex Scenarios

### Scenario 1: Multi-Guard Chain
Combine multiple guards on a route.

### Scenario 2: Lazy Load Guard
Protect lazy-loaded modules.

### Scenario 3: Permission System
Role-based access control with route data.

### Scenario 4: Form Guard
Prevent navigation with unsaved form data.

### Scenario 5: Feature Flags
Enable/disable routes based on feature flags.
