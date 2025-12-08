/**
 * ============================================================================
 * CACHING STRATEGIES ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const CACHING_STRATEGIES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.CachingOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/http-caching.component')
            .then(m => m.HttpCachingComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/memory-cache.component')
            .then(m => m.MemoryCacheComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/storage-cache.component')
            .then(m => m.StorageCacheComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/indexeddb-cache.component')
            .then(m => m.IndexedDbCacheComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/cache-invalidation.component')
            .then(m => m.CacheInvalidationComponent)
    }
];
