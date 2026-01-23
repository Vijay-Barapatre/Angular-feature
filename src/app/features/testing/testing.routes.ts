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
        path: 'component-testing',
        loadComponent: () => import('./components/component-testing/component-testing.component')
            .then(m => m.ComponentTestingComponent)
    },
    {
        path: 'service-testing',
        loadComponent: () => import('./components/service-testing/service-testing.component')
            .then(m => m.ServiceTestingComponent)
    },
    {
        path: 'mocking-demo',
        loadComponent: () => import('./components/mocking-demo/mocking-demo.component')
            .then(m => m.MockingDemoComponent)
    },
    {
        path: 'async-testing',
        loadComponent: () => import('./components/async-testing/async-testing.component')
            .then(m => m.AsyncTestingComponent)
    },
    {
        path: 'http-testing',
        loadComponent: () => import('./components/http-testing/http-testing.component')
            .then(m => m.HttpTestingComponent)
    },
    {
        path: 'performance-testing',
        loadComponent: () => import('./components/performance-testing/performance-testing.component')
            .then(m => m.PerformanceTestingComponent)
    },
    {
        path: 'reusable-utils',
        loadComponent: () => import('./components/reusable-utils/reusable-utils.component')
            .then(m => m.ReusableUtilsComponent)
    }
];
