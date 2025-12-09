# Exercise 3: Core Module

## 🎯 Objective

Implement CoreModule pattern for singleton services.

## ✅ Requirements

- [ ] Create CoreModule with singleton services
- [ ] Add guard against multiple imports
- [ ] Include app-level components (navbar, footer)

## 💻 Solution

```typescript
@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  exports: [NavbarComponent, FooterComponent],
  providers: [AuthService, LoggingService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it only in AppModule.'
      );
    }
  }
}
```

## ⚠️ Why Guard Against Multiple Imports?

If lazy-loaded modules import CoreModule, each gets a new instance of services, breaking the singleton pattern.
