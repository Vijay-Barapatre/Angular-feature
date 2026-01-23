/**
 * ============================================================================
 * COMBINED GUARDS
 * ============================================================================
 *
 * 🎯 WHAT ARE COMBINED GUARDS?
 * You can apply MULTIPLE guards to a single route.
 * Guards run in order, and ALL must return true for navigation to proceed.
 *
 * 🔗 HOW THEY WORK:
 * canActivate: [guard1, guard2, guard3]
 * 
 * Execution: guard1 → guard2 → guard3
 * If ANY returns false/UrlTree, navigation stops.
 *
 * 💡 USE CASE: Multi-Layer Security
 * 1. authGuard → Check if logged in
 * 2. roleGuard → Check if has required role
 * 3. featureFlagGuard → Check if feature is enabled
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Combined guards demo state
 */
export const combinedGuardState = {
    isLoggedIn: true,
    role: 'user' as 'guest' | 'user' | 'admin',
    featureEnabled: true,
    maintenanceMode: false
};

/**
 * Guard 1: Authentication Check
 */
export const authCheckGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    console.log('[Guard 1] Checking authentication...');

    if (!combinedGuardState.isLoggedIn) {
        console.log('[Guard 1] ❌ FAILED - Not logged in');
        return router.createUrlTree(['/guards/use-case-7'], {
            queryParams: { failed: 'auth' }
        });
    }

    console.log('[Guard 1] ✅ PASSED - User is logged in');
    return true;
};

/**
 * Guard 2: Role Check
 */
export const roleCheckGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const requiredRole = route.data?.['requiredRole'] || 'admin';

    console.log(`[Guard 2] Checking role (required: ${requiredRole})...`);

    const roleHierarchy = ['guest', 'user', 'admin'];
    const hasRole = roleHierarchy.indexOf(combinedGuardState.role) >=
        roleHierarchy.indexOf(requiredRole);

    if (!hasRole) {
        console.log(`[Guard 2] ❌ FAILED - Role "${combinedGuardState.role}" insufficient`);
        return router.createUrlTree(['/guards/use-case-7'], {
            queryParams: { failed: 'role' }
        });
    }

    console.log('[Guard 2] ✅ PASSED - Role check succeeded');
    return true;
};

/**
 * Guard 3: Feature Flag Check
 */
export const featureFlagGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    console.log('[Guard 3] Checking feature flag...');

    if (!combinedGuardState.featureEnabled) {
        console.log('[Guard 3] ❌ FAILED - Feature is disabled');
        return router.createUrlTree(['/guards/use-case-7'], {
            queryParams: { failed: 'feature' }
        });
    }

    console.log('[Guard 3] ✅ PASSED - Feature is enabled');
    return true;
};

/**
 * Guard 4: Maintenance Mode Check
 */
export const maintenanceModeGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    console.log('[Guard 4] Checking maintenance mode...');

    if (combinedGuardState.maintenanceMode) {
        console.log('[Guard 4] ❌ FAILED - System under maintenance');
        return router.createUrlTree(['/guards/use-case-7'], {
            queryParams: { failed: 'maintenance' }
        });
    }

    console.log('[Guard 4] ✅ PASSED - System operational');
    return true;
};
