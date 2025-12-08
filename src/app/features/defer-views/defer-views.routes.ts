/**
 * ============================================================================
 * DEFER VIEWS FEATURE ROUTES
 * ============================================================================
 * 
 * Route configuration for Angular 17+ @defer blocks feature.
 * Demonstrates lazy loading content with various trigger conditions.
 */

import { Routes } from '@angular/router';

export const DEFER_VIEWS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.DeferViewsOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/basic-defer.component')
            .then(m => m.BasicDeferComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/loading-states.component')
            .then(m => m.LoadingStatesComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/trigger-conditions.component')
            .then(m => m.TriggerConditionsComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/prefetching.component')
            .then(m => m.PrefetchingComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/when-condition.component')
            .then(m => m.WhenConditionComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/real-world.component')
            .then(m => m.RealWorldComponent)
    }
];
