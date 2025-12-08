# Exercise 4: Data Resolver

## 🎯 Objective

Implement a `resolve` guard that pre-fetches data before a route activates.

## 📋 Scenario

You have a product detail page that needs product data before rendering. Instead of showing a loading spinner in the component, use a resolver to fetch the data before the route activates, ensuring the component receives complete data immediately.

## ✅ Requirements

- [ ] Create a functional resolver using `ResolveFn`
- [ ] Fetch product data based on route parameter
- [ ] Handle errors (redirect to 404 if product not found)
- [ ] Access resolved data in component via `ActivatedRoute`
- [ ] Show loading indicator during resolution

## 🔄 Expected Behavior

| Scenario | Expected Result |
|----------|-----------------|
| Valid product ID | Data fetched → Component renders with data |
| Invalid product ID | Redirect to /not-found page |
| Network error | Show error page or retry |

## 💡 Hints

1. Use `inject()` to get services in functional resolvers
2. Access resolved data via `route.snapshot.data['key']`
3. Return `Observable`, `Promise`, or direct value
4. Use `EMPTY` or `router.navigate` for error handling
5. Route parameter available via `route.paramMap.get('id')`

## 🏁 Starting Point

```typescript
// Route configuration
{
  path: 'products/:id',
  component: ProductDetailComponent,
  resolve: {
    product: productResolver
  }
}

// TODO: Implement the resolver
export const productResolver: ResolveFn<Product> = (route, state) => {
  // 1. Get product ID from route params
  // 2. Inject ProductService
  // 3. Fetch product by ID
  // 4. Handle errors (404, network)
  // 5. Return the product
};

// In component
ngOnInit() {
  this.product = this.route.snapshot.data['product'];
}
```
