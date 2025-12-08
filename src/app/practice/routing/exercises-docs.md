# Routing Practice Documentation

## 🟦 Basic Exercises

### Exercise 1: Basic Routes
Configure routes with path and component.

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
```

### Exercise 2: Route Parameters
Pass dynamic values via route params.

### Exercise 3: Query Parameters
Handle search/filter params.

### Exercise 4: Child Routes
Nested routing with parent/child layouts.

## 🟥 Complex Scenarios

### Scenario 1: Route Guards
Protect routes with authentication.

### Scenario 2: Lazy Loading
Load modules on demand.

### Scenario 3: Resolvers
Pre-fetch data before navigation.

### Scenario 4: Route Events
Track navigation, show loading.

### Scenario 5: Dynamic Routes
Generate routes programmatically.
