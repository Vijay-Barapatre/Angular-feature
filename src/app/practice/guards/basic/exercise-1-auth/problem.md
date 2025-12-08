# Exercise 1: Authentication Guard

## 🎯 Objective

Implement a `canActivate` guard that protects routes from unauthenticated users.

## 📋 Scenario

You're building a dashboard application where certain routes (like `/dashboard`, `/profile`, `/settings`) should only be accessible to logged-in users. If a user tries to access these routes without being authenticated, they should be redirected to the login page.

## ✅ Requirements

- [ ] Create an `AuthService` with `isLoggedIn()` method
- [ ] Implement a functional guard using `CanActivateFn`
- [ ] Redirect unauthenticated users to `/login`
- [ ] Preserve the intended URL as a query parameter for post-login redirect
- [ ] Apply the guard to protected routes

## 🔄 Expected Behavior

| User State | Action | Expected Result |
|------------|--------|-----------------|
| Not logged in | Navigate to `/dashboard` | Redirect to `/login?returnUrl=/dashboard` |
| Not logged in | Navigate to `/profile` | Redirect to `/login?returnUrl=/profile` |
| Logged in | Navigate to `/dashboard` | Allow access, show dashboard |
| Logged in | Navigate to `/profile` | Allow access, show profile |

## 💡 Hints

1. Use `inject()` function to get services in functional guards
2. `Router.createUrlTree()` allows redirecting with query params
3. The `state` parameter in guard contains the target URL
4. Return `true` to allow, `false` to deny, or `UrlTree` to redirect

## 📚 Resources

- [Angular Guard Documentation](https://angular.io/guide/router#preventing-unauthorized-access)
- [Functional Guards in Angular 15+](https://angular.io/api/router/CanActivateFn)

## 🏁 Starting Point

```typescript
// TODO: Implement in exercise.component.ts
export const authGuard: CanActivateFn = (route, state) => {
  // 1. Inject AuthService and Router
  // 2. Check if user is logged in
  // 3. If yes, return true
  // 4. If no, redirect to login with returnUrl
};
```
