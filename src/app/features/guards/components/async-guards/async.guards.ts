/**
 * ============================================================================
 * ASYNC GUARDS
 * ============================================================================
 *
 * 🎯 WHAT ARE ASYNC GUARDS?
 * Guards can return Observables or Promises instead of just boolean values.
 * This allows guards to make API calls, check server-side permissions, etc.
 *
 * 🔄 RETURN TYPES:
 * - boolean → Sync check
 * - UrlTree → Redirect
 * - Observable<boolean | UrlTree> → Async check
 * - Promise<boolean | UrlTree> → Async check
 *
 * 💡 USE CASES:
 * 1. Check permissions from API
 * 2. Validate tokens with server
 * 3. Check resource availability
 * 4. Load required data before navigation
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

/**
 * Simulated API state
 */
export const asyncGuardState = {
    serverAvailable: true,
    hasPermission: true,
    responseDelay: 1000  // Simulate network delay
};

/**
 * asyncPermissionGuard
 * 
 * Checks permissions from a server (simulated).
 * Returns an Observable that resolves after an API call.
 */
export const asyncPermissionGuard: CanActivateFn = (
    route,
    state
): Observable<boolean> => {
    const router = inject(Router);

    console.log('[AsyncGuard] 🔄 Checking permissions from server...');

    // Simulate API call with delay
    return timer(asyncGuardState.responseDelay).pipe(
        map(() => {
            if (!asyncGuardState.serverAvailable) {
                console.log('[AsyncGuard] ❌ Server unavailable');
                return false;
            }

            if (!asyncGuardState.hasPermission) {
                console.log('[AsyncGuard] ❌ Permission denied by server');
                return false;
            }

            console.log('[AsyncGuard] ✅ Permission granted by server');
            return true;
        }),
        catchError(error => {
            console.error('[AsyncGuard] ❌ Error checking permissions:', error);
            return of(false);
        })
    );
};

/**
 * tokenValidationGuard
 * 
 * Validates the auth token with the server.
 * In a real app, this would call an API endpoint.
 */
export const tokenValidationGuard: CanActivateFn = (
    route,
    state
): Observable<boolean> => {
    const router = inject(Router);

    console.log('[TokenGuard] 🔄 Validating token with server...');

    return timer(500).pipe(
        map(() => {
            // Simulate token validation
            const isValid = Math.random() > 0.2; // 80% success rate for demo

            if (!isValid) {
                console.log('[TokenGuard] ❌ Token expired or invalid');
                return false;
            }

            console.log('[TokenGuard] ✅ Token is valid');
            return true;
        })
    );
};

/**
 * asyncResourceGuard
 * 
 * Checks if a required resource exists before allowing navigation.
 * Returns UrlTree for redirect on failure.
 */
export const asyncResourceGuard: CanActivateFn = (
    route,
    state
): Observable<boolean | import('@angular/router').UrlTree> => {
    const router = inject(Router);
    const resourceId = route.params['id'];

    console.log(`[ResourceGuard] 🔄 Checking if resource ${resourceId} exists...`);

    return timer(800).pipe(
        map(() => {
            // Simulate resource check
            const exists = resourceId && parseInt(resourceId) < 100;

            if (!exists) {
                console.log('[ResourceGuard] ❌ Resource not found');
                return router.createUrlTree(['/guards/use-case-8'], {
                    queryParams: { error: 'not-found', id: resourceId }
                });
            }

            console.log('[ResourceGuard] ✅ Resource exists');
            return true;
        })
    );
};
