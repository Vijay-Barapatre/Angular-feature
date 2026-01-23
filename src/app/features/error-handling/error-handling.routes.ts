/**
 * ============================================================================
 * ERROR HANDLING ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const ERROR_HANDLING_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.ErrorHandlingOverviewComponent)
    },
    {
        path: 'global-error-handler',
        loadComponent: () => import('./components/global-error-handler/global-error-handler.component')
            .then(m => m.GlobalErrorHandlerComponent)
    },
    {
        path: 'http-error-interceptor',
        loadComponent: () => import('./components/http-error-interceptor/http-error-interceptor.component')
            .then(m => m.HttpErrorInterceptorComponent)
    },
    {
        path: 'error-notification',
        loadComponent: () => import('./components/error-notification/error-notification.component')
            .then(m => m.ErrorNotificationComponent)
    },
    {
        path: 'retry-recovery',
        loadComponent: () => import('./components/retry-recovery/retry-recovery.component')
            .then(m => m.RetryRecoveryComponent)
    },
    {
        path: 'error-boundaries',
        loadComponent: () => import('./components/error-boundaries/error-boundaries.component')
            .then(m => m.ErrorBoundariesComponent)
    }
];
