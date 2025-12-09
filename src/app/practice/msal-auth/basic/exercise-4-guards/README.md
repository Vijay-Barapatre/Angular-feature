# Exercise 4: Route Guards

## 🎯 Objective

Protect routes using MsalGuard for authenticated access.

## ✅ Requirements

- [ ] Apply MsalGuard to protected routes
- [ ] Configure guard interaction type
- [ ] Handle redirect after login

## 💻 Solution

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'public', component: PublicComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard]
  }
];

// app.config.ts - MsalGuard configuration
{
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['user.read']
  }
}
```
