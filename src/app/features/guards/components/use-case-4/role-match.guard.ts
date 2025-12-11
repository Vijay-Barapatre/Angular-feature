/**
 * ============================================================================
 * USE CASE 4: canMatch GUARD
 * ============================================================================
 *
 * 🎯 WHAT IS canMatch?
 * canMatch is Angular's newest guard (introduced in Angular 14.1+).
 * It determines whether a route should even be MATCHED in the first place.
 *
 * 🆚 canMatch vs canActivate:
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  canActivate                    │  canMatch                         │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │  Runs AFTER route matches       │  Runs BEFORE route matches        │
 * │  Blocks navigation (redirects)  │  Skips route, tries next match    │
 * │  User sees redirect happening   │  User never knows route existed   │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * 💡 USE CASE: Role-Based Route Matching
 * Admin navigates to /dashboard → Sees AdminDashboard
 * Regular user navigates to /dashboard → Sees UserDashboard
 * (Same URL, different component based on role!)
 */

import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { RoleService } from './role.service';

/**
 * adminMatchGuard
 * 
 * Returns true if user is an Admin → This route matches.
 * Returns false if user is NOT an Admin → Router skips this route and tries the next one.
 */
export const adminMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    const roleService = inject(RoleService);

    // 🛡️ CRITICAL: Return true to match, false to skip
    const isAdmin = roleService.hasRole('admin');

    console.log(`[canMatch] Admin check for route "${route.path}": ${isAdmin ? '✅ MATCHED' : '❌ SKIPPED'}`);

    return isAdmin;
};

/**
 * premiumMatchGuard
 * 
 * Only matches if user has premium subscription.
 */
export const premiumMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    const roleService = inject(RoleService);

    const isPremium = roleService.hasRole('premium');

    console.log(`[canMatch] Premium check: ${isPremium ? '✅ MATCHED' : '❌ SKIPPED'}`);

    return isPremium;
};
