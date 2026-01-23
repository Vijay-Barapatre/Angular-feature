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
        path: 'basic-defer',
        loadComponent: () => import('./components/basic-defer/basic-defer.component')
            .then(m => m.BasicDeferComponent)
    },
    {
        path: 'loading-states',
        loadComponent: () => import('./components/loading-states/loading-states.component')
            .then(m => m.LoadingStatesComponent)
    },
    {
        path: 'trigger-conditions',
        loadComponent: () => import('./components/trigger-conditions/trigger-conditions.component')
            .then(m => m.TriggerConditionsComponent)
    },
    {
        path: 'prefetching',
        loadComponent: () => import('./components/prefetching/prefetching.component')
            .then(m => m.PrefetchingComponent)
    },
    {
        path: 'when-condition',
        loadComponent: () => import('./components/when-condition/when-condition.component')
            .then(m => m.WhenConditionComponent)
    },
    {
        path: 'real-world',
        loadComponent: () => import('./components/real-world/real-world.component')
            .then(m => m.RealWorldComponent)
    }
];
