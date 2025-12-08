# Angular Guards Practice

Master route protection with Angular Guards through hands-on exercises.

## 📚 Overview

Guards are functions that control navigation in Angular applications. They determine whether a route can be activated, deactivated, or if data should be pre-loaded.

### Guard Types

| Type | Purpose | Use Case |
|------|---------|----------|
| `canActivate` | Control route access | Authentication, authorization |
| `canActivateChild` | Protect child routes | Admin sections |
| `canDeactivate` | Prevent leaving a route | Unsaved changes |
| `canMatch` | Control route matching | Feature flags, A/B testing |
| `resolve` | Pre-fetch data | Load data before component |

## 🎯 Exercises

### Basic (4 Exercises)
1. **Authentication Guard** - Protect routes from unauthenticated users
2. **Role-Based Guard** - Restrict access based on user roles
3. **Unsaved Changes Guard** - Confirm before leaving with unsaved data
4. **Data Resolver** - Pre-fetch data before route activation

### Complex (5 Scenarios)
1. **Multi-Guard Chain** - Combine multiple guards
2. **Lazy Loading Guards** - Protect lazy-loaded modules
3. **Permission-Based Access** - Fine-grained CRUD permissions
4. **Generic Form Dirty Check** - Reusable dirty check guard
5. **Feature Flag Guard** - Enable/disable routes via config

## 🚀 Getting Started

1. Navigate to `/practice/guards`
2. Select an exercise
3. Read the `problem.md` to understand requirements
4. Implement the solution in the exercise component
5. Check `solution.md` for the complete solution with diagrams

## 📁 File Structure

```
guards/
├── guards-practice.component.ts
├── guards-practice.routes.ts
├── README.md (this file)
│
├── basic/
│   ├── exercise-1-auth/
│   │   ├── exercise.component.ts
│   │   ├── problem.md
│   │   └── solution.md
│   ├── exercise-2-role/
│   ├── exercise-3-deactivate/
│   └── exercise-4-resolve/
│
└── complex/
    ├── scenario-1-multi-guard/
    ├── scenario-2-lazy-guard/
    ├── scenario-3-permission/
    ├── scenario-4-form-dirty/
    └── scenario-5-feature-flag/
```
