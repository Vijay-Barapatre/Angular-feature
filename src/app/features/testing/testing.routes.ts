/**
 * ============================================================================
 * TESTING FEATURE ROUTES
 * ============================================================================
 * 
 * Route configuration for the Angular Testing feature module.
 * Demonstrates testing patterns with Jasmine and Karma.
 */

import { Routes } from '@angular/router';

export const TESTING_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.TestingOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/component-testing.component')
            .then(m => m.ComponentTestingComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/service-testing.component')
            .then(m => m.ServiceTestingComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/mocking-demo.component')
            .then(m => m.MockingDemoComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/async-testing.component')
            .then(m => m.AsyncTestingComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/http-testing.component')
            .then(m => m.HttpTestingComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/performance-testing.component')
            .then(m => m.PerformanceTestingComponent)
    },
    {
        path: 'use-case-7',
        loadComponent: () => import('./components/use-case-7/reusable-utils.component')
            .then(m => m.ReusableUtilsComponent)
    }
];
