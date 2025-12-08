# Exercise 2: Role-Based Guard

## 🎯 Objective

Implement a `canActivate` guard that restricts access based on user roles.

## 📋 Scenario

Your application has different user roles: `user`, `editor`, and `admin`. Certain routes should only be accessible to specific roles:
- `/admin/*` routes require `admin` role
- `/editor/*` routes require `editor` or `admin` role
- `/dashboard` is accessible to all authenticated users

## ✅ Requirements

- [ ] Extend AuthService to include user roles
- [ ] Create a guard that checks for required roles
- [ ] Support multiple allowed roles per route
- [ ] Use route data to specify required roles
- [ ] Show appropriate error when access is denied

## 🔄 Expected Behavior

| User Role | Route | Expected Result |
|-----------|-------|-----------------|
| `user` | `/dashboard` | ✅ Allowed |
| `user` | `/admin/users` | ❌ Access Denied |
| `editor` | `/editor/posts` | ✅ Allowed |
| `editor` | `/admin/users` | ❌ Access Denied |
| `admin` | `/admin/users` | ✅ Allowed |
| `admin` | `/editor/posts` | ✅ Allowed |

## 💡 Hints

1. Use `route.data` to pass required roles to the guard
2. Check if user's role is included in the allowed roles array
3. Consider using bitwise flags for complex permission systems
4. You can stack multiple guards on a single route

## 📚 Resources

- [Route Data](https://angular.io/api/router/Route#data)
- [Multiple Guards](https://angular.io/guide/router#milestone-5-route-guards)

## 🏁 Starting Point

```typescript
// Route configuration
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin'] }
}

// TODO: Implement roleGuard
export const roleGuard: CanActivateFn = (route, state) => {
  // 1. Get required roles from route.data
  // 2. Get current user's role from AuthService
  // 3. Check if user's role is in required roles
  // 4. Return true or redirect to "access denied"
};
```
