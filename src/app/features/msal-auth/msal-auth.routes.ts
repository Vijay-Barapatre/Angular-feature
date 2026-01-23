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
        path: 'msal-setup',
        loadComponent: () => import('./components/msal-setup/msal-setup.component')
            .then(m => m.MsalSetupComponent)
    },
    {
        path: 'login-flows',
        loadComponent: () => import('./components/login-flows/login-flows.component')
            .then(m => m.LoginFlowsComponent)
    },
    {
        path: 'auth-guard',
        loadComponent: () => import('./components/auth-guard/auth-guard.component')
            .then(m => m.AuthGuardComponent)
    },
    {
        path: 'http-interceptor',
        loadComponent: () => import('./components/http-interceptor/http-interceptor.component')
            .then(m => m.HttpInterceptorComponent)
    },
    {
        path: 'user-profile',
        loadComponent: () => import('./components/user-profile/user-profile.component')
            .then(m => m.UserProfileComponent)
    },
    {
        path: 'token-management',
        loadComponent: () => import('./components/token-management/token-management.component')
            .then(m => m.TokenManagementComponent)
    }
];
