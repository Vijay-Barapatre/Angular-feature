/**
 * ============================================================================
 * PERFORMANCE OPTIMIZATION FEATURE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const PERFORMANCE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.PerformanceOverviewComponent)
    },
    {
        path: 'onpush-strategy',
        loadComponent: () => import('./components/onpush-strategy/onpush-strategy.component')
            .then(m => m.OnPushStrategyComponent)
    },
    {
        path: 'trackby-optimization',
        loadComponent: () => import('./components/trackby-optimization/trackby-optimization.component')
            .then(m => m.TrackByOptimizationComponent)
    },
    {
        path: 'lazy-loading',
        loadComponent: () => import('./components/lazy-loading/lazy-loading.component')
            .then(m => m.LazyLoadingComponent)
    },
    {
        path: 'bundle-optimization',
        loadComponent: () => import('./components/bundle-optimization/bundle-optimization.component')
            .then(m => m.BundleOptimizationComponent)
    },
    {
        path: 'runtime-performance',
        loadComponent: () => import('./components/runtime-performance/runtime-performance.component')
            .then(m => m.RuntimePerformanceComponent)
    },
    {
        path: 'memory-management',
        loadComponent: () => import('./components/memory-management/memory-management.component')
            .then(m => m.MemoryManagementComponent)
    },
    {
        path: 'profiling-devtools',
        loadComponent: () => import('./components/profiling-devtools/profiling-devtools.component')
            .then(m => m.ProfilingDevToolsComponent)
    }
];
