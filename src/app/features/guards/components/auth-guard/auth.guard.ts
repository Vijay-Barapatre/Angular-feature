
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * FUNCTIONAL GUARD: authGuard
 * 
 * Replaces the old class-based CanActivate interface.
 * It's just a constant function!
 */
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        console.log('✅ Guard: User is authorized');
        return true;
    } else {
        console.log('🛑 Guard: User is unauthorized, redirecting to login...');
        // Redirect to login page
        // Note: In a real app, you might pass a returnUrl query param
        return router.createUrlTree(['/guards/use-case-1/login']);
    }
};
