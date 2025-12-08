# 🟦 Exercise 2: Route Parameters - Solution

```typescript
// Route config
{ path: 'users/:id', component: UserDetailComponent }

// Reading params
@Component({ ... })
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  
  userId = this.route.snapshot.params['id'];
  
  // Or reactive approach
  userId$ = this.route.params.pipe(
    map(params => params['id'])
  );
}

// Navigation
this.router.navigate(['/users', userId]);

// Template link
<a [routerLink]="['/users', user.id]">View</a>
```
