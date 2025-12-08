# Exercise 3: Unsaved Changes Guard (CanDeactivate)

## 🎯 Objective

Implement a `canDeactivate` guard that prevents users from leaving a page with unsaved changes.

## 📋 Scenario

You have a form page where users edit their profile or create content. If users try to navigate away while they have unsaved changes, they should see a confirmation dialog asking if they want to discard their changes.

## ✅ Requirements

- [ ] Create a `canDeactivate` guard that checks for unsaved changes
- [ ] Show a browser confirmation dialog when leaving with changes
- [ ] Allow navigation if confirmed or no changes exist
- [ ] Define an interface for components that can be guarded
- [ ] Apply the guard to form routes

## 🔄 Expected Behavior

| Form State | Navigation Attempt | Expected Result |
|------------|-------------------|-----------------|
| No changes | Click link | ✅ Navigate immediately |
| Has changes | Click link | ⚠️ Show confirmation dialog |
| Has changes | Confirm dialog | ✅ Navigate, discard changes |
| Has changes | Cancel dialog | ❌ Stay on page |

## 💡 Hints

1. Create an interface like `CanComponentDeactivate`
2. The component must implement a method to check for changes
3. Use `window.confirm()` for simple confirmation
4. Consider async confirmation for custom modals
5. `canDeactivate` receives the component instance as first argument

## 🏁 Starting Point

```typescript
// Interface for components with unsaved changes
export interface CanComponentDeactivate {
  canDeactivate(): boolean | Observable<boolean>;
}

// TODO: Implement the guard
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = 
  (component, currentRoute, currentState, nextState) => {
    // 1. Check if component has unsaved changes
    // 2. If yes, show confirmation dialog
    // 3. Return result of confirmation
  };
```
