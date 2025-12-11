/**
 * ============================================================================
 * GUARDS ROUTES CONFIGURATION
 * ============================================================================
 *
 * 🛡️ WHAT ARE ROUTE GUARDS?
 * Route Guards are "Security Checkpoints" that run BEFORE or AFTER navigation.
 * They can:
 * - Block access to a route (canActivate)
 * - Prevent leaving a route (canDeactivate)
 * - Pre-fetch data before loading (resolve)
 * - Load child routes conditionally (canLoad)
 *
 * ============================================================================
 * 📦 LAZY LOADING vs 🚀 EAGER LOADING
 * ============================================================================
 *
 * ⏳ LAZY LOADING (Used in this file):
 * ------------------------------------
 * loadComponent: () => import('./component').then(m => m.ComponentName)
 *
 * ✅ Pros:
 *   - Smaller initial bundle (faster first page load)
 *   - Code is downloaded only when user navigates to the route
 *   - Better for large features that users may never visit
 *
 * ❌ Cons:
 *   - Slight delay when navigating to the route for the first time
 *   - More complex syntax
 *
 * 🚀 EAGER LOADING (Alternative):
 * --------------------------------
 * // Step 1: Import at top of file
 * import { AdminComponent } from './components/use-case-1/admin.component';
 * import { authGuard } from './components/use-case-1/auth.guard';
 * import { userResolver } from './components/use-case-3/user.resolver';
 *
 * // Step 2: Use 'component' instead of 'loadComponent'
 * { path: 'admin', component: AdminComponent, canActivate: [authGuard] }
 *
 * // Step 3: For guards/resolvers, use direct reference instead of import()
 * resolve: { userData: userResolver }
 *
 * ✅ Pros:
 *   - No navigation delay (code already loaded)
 *   - Simpler syntax
 *
 * ❌ Cons:
 *   - Larger initial bundle (slower first page load)
 *   - All code loaded even if user never visits the route
 *
 * ============================================================================
 * 🎯 WHEN TO USE WHICH? (RECOMMENDATIONS)
 * ============================================================================
 *
 * | Scenario                       | Recommendation      |
 * |--------------------------------|---------------------|
 * | Admin panel (few users)        | ⏳ LAZY LOAD        |
 * | Settings page (rarely used)    | ⏳ LAZY LOAD        |
 * | Reports/Analytics              | ⏳ LAZY LOAD        |
 * | Login/Signup page              | 🚀 EAGER LOAD       |
 * | Dashboard (always shown)       | 🚀 EAGER LOAD       |
 * | Core navigation pages          | 🚀 EAGER LOAD       |
 * | Feature > 100KB                | ⏳ LAZY LOAD        |
 * | Feature < 10KB                 | 🚀 EAGER LOAD       |
 *
 * 💡 RULE OF THUMB:
 * - Lazy load anything "behind a click" that users might not need immediately.
 * - Eager load anything critical for the first user experience.
 */

import { Routes } from '@angular/router';

// ============================================================================
// 🚀 EAGER LOADING EXAMPLE (Commented out - for reference only):
// ============================================================================
// To use eager loading, uncomment these imports and use 'component' below:
//
// import { GuardsOverviewComponent } from './components/overview/overview.component';
// import { AdminComponent } from './components/use-case-1/admin.component';
// import { LoginComponent } from './components/use-case-1/login.component';
// import { FormEditComponent } from './components/use-case-2/form-edit.component';
// import { UserProfileComponent } from './components/use-case-3/user-profile.component';
// import { authGuard } from './components/use-case-1/auth.guard';
// import { unsavedChangesGuard } from './components/use-case-2/unsaved-changes.guard';
// import { userResolver } from './components/use-case-3/user.resolver';

export const GUARDS_ROUTES: Routes = [
    // =========================================================================
    // ROUTE 1: Overview (Default Route)
    // =========================================================================
    // 📍 PATH: /guards
    // When user navigates to "/guards", this component loads.
    {
        path: '',  // Empty path = default child route

        // ⏳ LAZY LOADING SYNTAX:
        // loadComponent is the standalone equivalent of loadChildren.
        // The arrow function `() => import(...)` is called only when needed.
        // .then(m => m.GuardsOverviewComponent) extracts the named export.
        loadComponent: () => import('./components/overview/overview.component').then(m => m.GuardsOverviewComponent)

        // 🚀 EAGER LOADING ALTERNATIVE:
        // component: GuardsOverviewComponent
    },

    // =========================================================================
    // ROUTE 2: Use Case 1 - canActivate Guard
    // =========================================================================
    // 📍 PATH: /guards/use-case-1/admin
    // 🛡️ GUARD TYPE: canActivate
    // PURPOSE: Block unauthorized users from accessing the Admin page.
    {
        path: 'use-case-1',
        // 👶 CHILDREN: Nested routes under use-case-1
        children: [
            // Redirect /guards/use-case-1 → /guards/use-case-1/admin
            { path: '', redirectTo: 'admin', pathMatch: 'full' },

            {
                path: 'admin',
                // ⏳ LAZY LOADING (Current):
                loadComponent: () => import('./components/use-case-1/admin.component').then(m => m.AdminComponent),

                // 🚀 EAGER LOADING ALTERNATIVE:
                // component: AdminComponent,

                // 🛡️ canActivate: "CAN THE USER ENTER THIS ROUTE?"
                // --------------------------------------------------------
                // This guard runs BEFORE the component is loaded.
                // If it returns:
                //   - true: User can enter, component loads.
                //   - false: User is blocked (usually redirected to login).
                //   - UrlTree: User is redirected to a specific route.
                //
                // 🔧 FUNCTIONAL GUARD (Modern Angular 14+):
                // Instead of a class-based guard, we use a function.
                // The arrow function lazily imports the guard.

                // ⏳ LAZY LOADING (Current):
                canActivate: [() => import('./components/use-case-1/auth.guard').then(m => m.authGuard)]

                // 🚀 EAGER LOADING ALTERNATIVE:
                // canActivate: [authGuard]
            },
            {
                path: 'login',
                // ⏳ LAZY LOADING (Current):
                loadComponent: () => import('./components/use-case-1/login.component').then(m => m.LoginComponent)

                // 🚀 EAGER LOADING ALTERNATIVE:
                // component: LoginComponent
            }
        ]
    },

    // =========================================================================
    // ROUTE 3: Use Case 2 - canDeactivate Guard
    // =========================================================================
    // 📍 PATH: /guards/use-case-2
    // 🛡️ GUARD TYPE: canDeactivate
    // PURPOSE: Warn user before leaving a form with unsaved changes.
    {
        path: 'use-case-2',
        // ⏳ LAZY LOADING (Current):
        loadComponent: () => import('./components/use-case-2/form-edit.component').then(m => m.FormEditComponent),

        // � EAGER LOADING ALTERNATIVE:
        // component: FormEditComponent,

        // �🛡️ canDeactivate: "CAN THE USER LEAVE THIS ROUTE?"
        // --------------------------------------------------------
        // This guard runs WHEN the user tries to navigate AWAY.
        // Typical use cases:
        //   - Form has unsaved changes → Show "Are you sure?" dialog.
        //   - Editor has pending work → Block navigation.
        //
        // The guard receives the current component instance as an argument,
        // so it can check `component.hasUnsavedChanges()`.

        // ⏳ LAZY LOADING (Current):
        canDeactivate: [() => import('./components/use-case-2/unsaved-changes.guard').then(m => m.unsavedChangesGuard)]

        // 🚀 EAGER LOADING ALTERNATIVE:
        // canDeactivate: [unsavedChangesGuard]
    },

    // =========================================================================
    // ROUTE 4: Use Case 3 - Resolver (Pre-fetch Data)
    // =========================================================================
    // 📍 PATH: /guards/use-case-3
    // 🛡️ GUARD TYPE: resolve
    // PURPOSE: Fetch user data BEFORE the component is created.
    {
        path: 'use-case-3',

        // ⏳ LAZY LOADING (Current):
        loadComponent: () => import('./components/use-case-3/user-profile.component').then(m => m.UserProfileComponent),

        // � EAGER LOADING ALTERNATIVE:
        // component: UserProfileComponent,

        // �🛡️ resolve: "FETCH DATA BEFORE COMPONENT LOADS"
        // --------------------------------------------------------
        // Resolvers are functions that return Observables or Promises.
        // Angular waits for ALL resolvers to complete before activating the route.
        //
        // WHY USE RESOLVERS?
        // 1. Component never renders in a "loading" state.
        // 2. Data is guaranteed to be available in ngOnInit.
        // 3. If resolver fails, navigation can be cancelled.
        //
        // The key 'userData' will be available in the component via:
        //   this.activatedRoute.data.subscribe(({ userData }) => ...)

        // ⏳ LAZY LOADING (Current):
        resolve: {
            userData: () => import('./components/use-case-3/user.resolver').then(m => m.userResolver)
        }

        // 🚀 EAGER LOADING ALTERNATIVE:
        // resolve: {
        //     userData: userResolver
        // }
    },

    // =========================================================================
    // ROUTE 5: Use Case 4 - canMatch Guard
    // =========================================================================
    // 📍 PATH: /guards/use-case-4
    // 🛡️ GUARD TYPE: canMatch
    // PURPOSE: Role-based route matching - same URL, different components.
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/role-match-demo.component').then(m => m.RoleMatchDemoComponent)
    },

    // =========================================================================
    // ROUTE 6: Use Case 5 - canLoad Guard
    // =========================================================================
    // 📍 PATH: /guards/use-case-5
    // 🛡️ GUARD TYPE: canLoad
    // PURPOSE: Prevent lazy-loaded modules from downloading.
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/can-load-demo.component').then(m => m.CanLoadDemoComponent)
    },

    // =========================================================================
    // ROUTE 7: Use Case 6 - canActivateChild Guard
    // =========================================================================
    // 📍 PATH: /guards/use-case-6
    // 🛡️ GUARD TYPE: canActivateChild
    // PURPOSE: Protect all child routes with a single guard.
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/activate-child-demo.component').then(m => m.ActivateChildDemoComponent)
    },

    // =========================================================================
    // ROUTE 8: Use Case 7 - Combined Guards
    // =========================================================================
    // 📍 PATH: /guards/use-case-7
    // 🛡️ PATTERN: Multiple guards on one route
    // PURPOSE: Chain multiple guards for multi-layer security.
    {
        path: 'use-case-7',
        loadComponent: () => import('./components/use-case-7/combined-guards-demo.component').then(m => m.CombinedGuardsDemoComponent)
    },

    // =========================================================================
    // ROUTE 9: Use Case 8 - Async Guards
    // =========================================================================
    // 📍 PATH: /guards/use-case-8
    // 🛡️ PATTERN: Observable/Promise-based guards
    // PURPOSE: Guards that make API calls and wait for async operations.
    {
        path: 'use-case-8',
        loadComponent: () => import('./components/use-case-8/async-guards-demo.component').then(m => m.AsyncGuardsDemoComponent)
    }
];
