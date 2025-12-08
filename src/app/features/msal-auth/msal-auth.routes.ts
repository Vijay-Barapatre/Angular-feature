/**
 * ============================================================================
 * MSAL AUTHENTICATION ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const MSAL_AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.MsalAuthOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/msal-setup.component')
            .then(m => m.MsalSetupComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/login-flows.component')
            .then(m => m.LoginFlowsComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/auth-guard.component')
            .then(m => m.AuthGuardComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/http-interceptor.component')
            .then(m => m.HttpInterceptorComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/user-profile.component')
            .then(m => m.UserProfileComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/token-management.component')
            .then(m => m.TokenManagementComponent)
    }
];
