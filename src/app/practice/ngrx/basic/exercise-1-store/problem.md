# Exercise 1: Store Setup

## 🎯 Objective

Configure NgRx store in a standalone Angular 17+ application with DevTools for debugging.

## 📋 Scenario

You're building a product management application and need to set up centralized state management using NgRx. The application should have Redux DevTools integration for development debugging.

## ✅ Requirements

- [ ] Install @ngrx/store, @ngrx/effects, @ngrx/store-devtools
- [ ] Configure providers in app.config.ts
- [ ] Create initial AppState interface
- [ ] Enable DevTools only in development mode
- [ ] Verify store is working via DevTools

## 🔄 Expected Behavior

| Configuration | Development | Production |
|---------------|-------------|------------|
| Store | ✅ Enabled | ✅ Enabled |
| Effects | ✅ Enabled | ✅ Enabled |
| DevTools | ✅ Enabled | ❌ Disabled |

## 💡 Hints

1. Use `provideStore()`, `provideEffects()`, `provideStoreDevtools()` from NgRx
2. `isDevMode()` from `@angular/core` checks environment
3. `maxAge` in devtools limits action history
4. Empty object `{}` for initial store with no root state

## 📚 Resources

- [NgRx Store Setup](https://ngrx.io/guide/store/configuration)
- [StoreDevtoolsModule](https://ngrx.io/guide/store-devtools)

## 🏁 Starting Point

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // TODO: Add NgRx providers
    // 1. provideStore({})
    // 2. provideEffects([])
    // 3. provideStoreDevtools({ ... })
  ]
};
```
