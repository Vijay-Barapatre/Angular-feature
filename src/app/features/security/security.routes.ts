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
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/xss-prevention.component')
            .then(m => m.XssPreventionComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/csrf-protection.component')
            .then(m => m.CsrfProtectionComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/csp.component')
            .then(m => m.CspComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/auth-security.component')
            .then(m => m.AuthSecurityComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/input-validation.component')
            .then(m => m.InputValidationComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/security-checklist.component')
            .then(m => m.SecurityChecklistComponent)
    }
];
