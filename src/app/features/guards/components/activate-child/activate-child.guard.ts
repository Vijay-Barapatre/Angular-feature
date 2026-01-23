/**
 * ============================================================================
 * canActivateChild GUARD
 * ============================================================================
 *
 * 🎯 WHAT IS canActivateChild?
 * canActivateChild protects ALL child routes of a parent route.
 * Instead of adding canActivate to each child, you add ONE guard to the parent.
 *
 * 🆚 canActivate vs canActivateChild:
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  canActivate                    │  canActivateChild                 │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  Protects SINGLE route          │  Protects ALL child routes        │
 * │  Must add to each route         │  Add once to parent               │
 * │  Runs once when navigating      │  Runs for each child navigation   │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * 💡 USE CASE: Admin Section
 * /admin → Parent (no guard needed)
 * /admin/users → Protected by canActivateChild
 * /admin/settings → Protected by canActivateChild
 * /admin/reports → Protected by canActivateChild
 */

import { inject } from '@angular/core';
import { CanActivateChildFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * Simple admin state for demonstration
 */
export const adminAuthState = {
    isLoggedIn: true,
    isAdmin: false
};

/**
 * adminChildGuard
 * 
 * Protects all child routes under the admin section.
 * This guard runs for EVERY child route navigation.
 */
export const adminChildGuard: CanActivateChildFn = (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);

    console.log(`[canActivateChild] Checking access to: ${state.url}`);

    if (!adminAuthState.isLoggedIn) {
        console.log('[canActivateChild] ❌ Not logged in');
        return router.createUrlTree(['/guards/use-case-6'], {
            queryParams: { reason: 'login-required' }
        });
    }

    if (!adminAuthState.isAdmin) {
        console.log('[canActivateChild] ❌ Not an admin');
        return router.createUrlTree(['/guards/use-case-6'], {
            queryParams: { reason: 'admin-required' }
        });
    }

    console.log('[canActivateChild] ✅ Access granted');
    return true;
};

/**
 * logChildNavigationGuard
 * 
 * Example: Audit logging for sensitive sections.
 * This guard just logs but always allows access.
 */
export const logChildNavigationGuard: CanActivateChildFn = (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log(`[AUDIT LOG] User navigating to child route: ${state.url}`);
    console.log(`[AUDIT LOG] Timestamp: ${new Date().toISOString()}`);

    // Always allow, just logging
    return true;
};
