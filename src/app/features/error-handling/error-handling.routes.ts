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
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/global-error-handler.component')
            .then(m => m.GlobalErrorHandlerComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/http-error-interceptor.component')
            .then(m => m.HttpErrorInterceptorComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/error-notification.component')
            .then(m => m.ErrorNotificationComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/retry-recovery.component')
            .then(m => m.RetryRecoveryComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/error-boundaries.component')
            .then(m => m.ErrorBoundariesComponent)
    }
];
