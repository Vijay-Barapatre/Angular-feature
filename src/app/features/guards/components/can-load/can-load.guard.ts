/**
 * ============================================================================
 * canLoad GUARD
 * ============================================================================
 *
 * 🎯 WHAT IS canLoad?
 * canLoad prevents a lazy-loaded module from being DOWNLOADED at all.
 * If canLoad returns false, the module code is never fetched.
 *
 * 🆚 canLoad vs canActivate:
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  canActivate                    │  canLoad                          │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  Module already downloaded      │  Module NOT downloaded yet        │
 * │  Blocks access to route         │  Prevents download entirely       │
 * │  Good for route-level control   │  Good for feature-level control   │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * 💡 USE CASE: Premium Feature Module
 * Free users → Don't even download the premium module code
 * Premium users → Download and access the module
 */

import { inject } from '@angular/core';
import { CanLoadFn, Route, UrlSegment, Router } from '@angular/router';

/**
 * Simple auth state for demonstration
 */
export const canLoadAuthState = {
    isLoggedIn: true,
    isPremium: false
};

/**
 * premiumLoadGuard
 * 
 * Prevents the Premium Features module from loading for non-premium users.
 * This saves bandwidth and keeps premium code hidden from free users.
 */
export const premiumLoadGuard: CanLoadFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    const router = inject(Router);

    if (!canLoadAuthState.isLoggedIn) {
        console.log('[canLoad] ❌ Not logged in - module will NOT load');
        return router.createUrlTree(['/guards/use-case-5']);
    }

    if (!canLoadAuthState.isPremium) {
        console.log('[canLoad] ❌ Not premium - module will NOT load');
        // Return false to simply block, or UrlTree to redirect
        return router.createUrlTree(['/guards/use-case-5'], {
            queryParams: { reason: 'premium-required' }
        });
    }

    console.log('[canLoad] ✅ Premium user - module will load');
    return true;
};

/**
 * adminLoadGuard
 * 
 * Only allows the Admin module to load for admin users.
 */
export const adminLoadGuard: CanLoadFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    // In a real app, check from AuthService or token
    const isAdmin = false; // Demo: hardcoded

    if (!isAdmin) {
        console.log('[canLoad] ❌ Not admin - admin module will NOT load');
        return false;
    }

    return true;
};
