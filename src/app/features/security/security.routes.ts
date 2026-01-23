/**
 * ============================================================================
 * SECURITY FEATURES ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const SECURITY_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.SecurityOverviewComponent)
    },
    {
        path: 'xss-prevention',
        loadComponent: () => import('./components/xss-prevention/xss-prevention.component')
            .then(m => m.XssPreventionComponent)
    },
    {
        path: 'csrf-protection',
        loadComponent: () => import('./components/csrf-protection/csrf-protection.component')
            .then(m => m.CsrfProtectionComponent)
    },
    {
        path: 'content-security-policy',
        loadComponent: () => import('./components/content-security-policy/csp.component')
            .then(m => m.CspComponent)
    },
    {
        path: 'auth-security',
        loadComponent: () => import('./components/auth-security/auth-security.component')
            .then(m => m.AuthSecurityComponent)
    },
    {
        path: 'input-validation',
        loadComponent: () => import('./components/input-validation/input-validation.component')
            .then(m => m.InputValidationComponent)
    },
    {
        path: 'security-checklist',
        loadComponent: () => import('./components/security-checklist/security-checklist.component')
            .then(m => m.SecurityChecklistComponent)
    },

    // Practice Exercises
    {
        path: 'practice',
        loadChildren: () => import('./practice/practice.routes').then(m => m.SECURITY_PRACTICE_ROUTES)
    }
];
