/**
 * ============================================================================
 * STANDALONE APIS FEATURE ROUTES
 * ============================================================================
 * 
 * Demonstrates Angular Standalone APIs and functional provider patterns
 */

import { Routes } from '@angular/router';

export const STANDALONE_APIS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.StandaloneApisOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/bootstrap-config.component')
            .then(m => m.BootstrapConfigComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/provide-router.component')
            .then(m => m.ProvideRouterComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/provide-http.component')
            .then(m => m.ProvideHttpComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/standalone-components.component')
            .then(m => m.StandaloneComponentsComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/standalone-directives.component')
            .then(m => m.StandaloneDirectivesComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/migration-patterns.component')
            .then(m => m.MigrationPatternsComponent)
    }
];
