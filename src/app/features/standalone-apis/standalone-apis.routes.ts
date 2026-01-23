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
        path: 'bootstrap-config',
        loadComponent: () => import('./components/bootstrap-config/bootstrap-config.component')
            .then(m => m.BootstrapConfigComponent)
    },
    {
        path: 'provide-router',
        loadComponent: () => import('./components/provide-router/provide-router.component')
            .then(m => m.ProvideRouterComponent)
    },
    {
        path: 'provide-http',
        loadComponent: () => import('./components/provide-http/provide-http.component')
            .then(m => m.ProvideHttpComponent)
    },
    {
        path: 'standalone-components',
        loadComponent: () => import('./components/standalone-components/standalone-components.component')
            .then(m => m.StandaloneComponentsComponent)
    },
    {
        path: 'standalone-directives',
        loadComponent: () => import('./components/standalone-directives/standalone-directives.component')
            .then(m => m.StandaloneDirectivesComponent)
    },
    {
        path: 'migration-patterns',
        loadComponent: () => import('./components/migration-patterns/migration-patterns.component')
            .then(m => m.MigrationPatternsComponent)
    }
];
