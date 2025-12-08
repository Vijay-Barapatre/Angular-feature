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
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/onpush-strategy.component')
            .then(m => m.OnPushStrategyComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/trackby-optimization.component')
            .then(m => m.TrackByOptimizationComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/lazy-loading.component')
            .then(m => m.LazyLoadingComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/bundle-optimization.component')
            .then(m => m.BundleOptimizationComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/runtime-performance.component')
            .then(m => m.RuntimePerformanceComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/memory-management.component')
            .then(m => m.MemoryManagementComponent)
    },
    {
        path: 'use-case-7',
        loadComponent: () => import('./components/use-case-7/profiling-devtools.component')
            .then(m => m.ProfilingDevToolsComponent)
    }
];
