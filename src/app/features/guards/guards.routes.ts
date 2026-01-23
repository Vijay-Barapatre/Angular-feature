/**
 * ============================================================================
 * GUARDS ROUTES CONFIGURATION
 * ============================================================================
 *
 * 🛡️ WHAT ARE ROUTE GUARDS?
 * Route Guards are "Security Checkpoints" that run BEFORE or AFTER navigation.
 * They can:
 * - Block access to a route (auth-guard)
 * - Prevent leaving a route (unsaved-changes-guard)
 * - Pre-fetch data before loading (user-resolver)
 * - Load child routes conditionally (can-load)
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
 * import { AdminComponent } from './components/auth-guard/admin.component';
 * import { authGuard } from './components/auth-guard/auth.guard';
 * import { userResolver } from './components/user-resolver/user.resolver';
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
// import { AdminComponent } from './components/auth-guard/admin.component';
// import { LoginComponent } from './components/auth-guard/login.component';
// import { FormEditComponent } from './components/unsaved-changes-guard/form-edit.component';
// import { UserProfileComponent } from './components/user-resolver/user-profile.component';
// import { authGuard } from './components/auth-guard/auth.guard';
// import { unsavedChangesGuard } from './components/unsaved-changes-guard/unsaved-changes.guard';
// import { userResolver } from './components/user-resolver/user.resolver';

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
    // ROUTE 2: Auth Guard (canActivate)
    // =========================================================================
    // 📍 PATH: /guards/auth-guard/admin
    // 🛡️ GUARD TYPE: auth-guard
    // PURPOSE: Block unauthorized users from accessing the Admin page.
    {
        path: 'auth-guard',
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            {
                path: 'admin',
                loadComponent: () => import('./components/auth-guard/admin.component').then(m => m.AdminComponent),
                canActivate: [() => import('./components/auth-guard/auth.guard').then(m => m.authGuard)]
            },
            {
                path: 'login',
                loadComponent: () => import('./components/auth-guard/login.component').then(m => m.LoginComponent)
            }
        ]
    },
    {
        path: 'unsaved-changes-guard',
        loadComponent: () => import('./components/unsaved-changes-guard/form-edit.component').then(m => m.FormEditComponent),
        canDeactivate: [() => import('./components/unsaved-changes-guard/unsaved-changes.guard').then(m => m.unsavedChangesGuard)]
    },
    {
        path: 'user-resolver',
        loadComponent: () => import('./components/user-resolver/user-profile.component').then(m => m.UserProfileComponent),
        resolve: {
            userData: () => import('./components/user-resolver/user.resolver').then(m => m.userResolver)
        }
    },
    {
        path: 'role-match',
        loadComponent: () => import('./components/role-match/role-match-demo.component').then(m => m.RoleMatchDemoComponent)
    },
    {
        path: 'can-load',
        loadComponent: () => import('./components/can-load/can-load-demo.component').then(m => m.CanLoadDemoComponent)
    },
    {
        path: 'activate-child',
        loadComponent: () => import('./components/activate-child/activate-child-demo.component').then(m => m.ActivateChildDemoComponent)
    },
    {
        path: 'combined-guards',
        loadComponent: () => import('./components/combined-guards/combined-guards-demo.component').then(m => m.CombinedGuardsDemoComponent)
    },
    {
        path: 'async-guards',
        loadComponent: () => import('./components/async-guards/async-guards-demo.component').then(m => m.AsyncGuardsDemoComponent)
    }
];
