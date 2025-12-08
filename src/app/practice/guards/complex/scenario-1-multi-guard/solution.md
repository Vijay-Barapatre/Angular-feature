# Solution: Multi-Guard Chain

## 📊 Flow Diagram

```mermaid
flowchart LR
    subgraph Chain["Guard Chain Execution"]
        A[Navigation] --> B[authGuard]
        B -->|Pass| C[roleGuard]
        B -->|Fail| X1[/login]
        C -->|Pass| D[subscriptionGuard]
        C -->|Fail| X2[/access-denied]
        D -->|Pass| E[✅ Component]
        D -->|Fail| X3[/upgrade]
    end

    style E fill:#dcfce7
    style X1 fill:#fee2e2
    style X2 fill:#fee2e2
    style X3 fill:#fee2e2
```

## 💻 Implementation

```typescript
// Three focused guards
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() || router.createUrlTree(['/login']);
};

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = route.data['roles'] as string[];
  return auth.hasRole(roles) || router.createUrlTree(['/access-denied']);
};

export const subscriptionGuard: CanActivateFn = () => {
  const sub = inject(SubscriptionService);
  const router = inject(Router);
  return sub.isActive() || router.createUrlTree(['/upgrade']);
};

// Route configuration
{
  path: 'admin/settings',
  component: AdminSettingsComponent,
  canActivate: [authGuard, roleGuard, subscriptionGuard],
  data: { roles: ['admin'] }
}
```
