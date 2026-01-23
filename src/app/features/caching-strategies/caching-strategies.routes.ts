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
        path: 'http-caching',
        loadComponent: () => import('./components/http-caching/http-caching.component')
            .then(m => m.HttpCachingComponent)
    },
    {
        path: 'memory-cache',
        loadComponent: () => import('./components/memory-cache/memory-cache.component')
            .then(m => m.MemoryCacheComponent)
    },
    {
        path: 'storage-cache',
        loadComponent: () => import('./components/storage-cache/storage-cache.component')
            .then(m => m.StorageCacheComponent)
    },
    {
        path: 'indexeddb-cache',
        loadComponent: () => import('./components/indexeddb-cache/indexeddb-cache.component')
            .then(m => m.IndexedDbCacheComponent)
    },
    {
        path: 'cache-invalidation',
        loadComponent: () => import('./components/cache-invalidation/cache-invalidation.component')
            .then(m => m.CacheInvalidationComponent)
    }
];
