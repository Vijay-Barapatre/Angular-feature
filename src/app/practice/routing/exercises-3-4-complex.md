# 🟦 Exercises 3-4 & Complex Scenarios

## Exercise 3: Query Parameters
```typescript
// Navigate with query params
this.router.navigate(['/search'], { 
  queryParams: { q: 'angular', page: 1 } 
});

// Read query params
query$ = this.route.queryParams.pipe(
  map(params => params['q'])
);
```

## Exercise 4: Child Routes
```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
```

## Complex Scenarios Summary

### Scenario 1: Route Guards
Protect routes with canActivate, canDeactivate.

### Scenario 2: Lazy Loading
```typescript
{ 
  path: 'feature', 
  loadChildren: () => import('./feature/routes')
    .then(m => m.FEATURE_ROUTES) 
}
```

### Scenario 3: Resolvers
Pre-fetch data before route activation.

### Scenario 4: Route Events
Listen to NavigationStart, NavigationEnd, etc.

### Scenario 5: Dynamic Routes
Generate routes programmatically.
