/**
 * ============================================================================
 * HTTP CLIENT FEATURE ROUTES
 * ============================================================================
 * 
 * 💡 WHAT IS HttpClient?
 * 
 * HttpClient is Angular's mechanism for communicating with backend services
 * over HTTP. It's based on Observables (RxJS), making it reactive and powerful.
 * 
 * KEY FEATURES:
 * - Returns Observable<T> - reactive streams
 * - Typed responses with generics
 * - Interceptors for cross-cutting concerns
 * - Automatic JSON parsing
 * - Error handling with RxJS operators
 * 
 * Observable vs Promise:
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │  Observable                          │  Promise                        │
 * ├────────────────────────────────────────────────────────────────────────┤
 * │  Lazy (doesn't execute until sub)   │  Eager (executes immediately)   │
 * │  Can emit multiple values           │  Single value only              │
 * │  Cancellable (unsubscribe)          │  Cannot be cancelled            │
 * │  Has operators (map, filter, etc)   │  Limited chaining               │
 * │  Built-in retry, debounce           │  Manual implementation          │
 * └────────────────────────────────────────────────────────────────────────┘
 */

import { Routes } from '@angular/router';

export const HTTP_CLIENT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.HttpClientOverviewComponent),
        title: 'HttpClient & Observables'
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/basic-get.component')
            .then(m => m.BasicGetComponent),
        title: 'Basic GET with Observable'
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/crud.component')
            .then(m => m.CrudComponent),
        title: 'CRUD Operations'
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/error-handling.component')
            .then(m => m.ErrorHandlingComponent),
        title: 'Error Handling & Retry'
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/interceptors.component')
            .then(m => m.InterceptorsComponent),
        title: 'HTTP Interceptors'
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/promises.component')
            .then(m => m.PromisesComponent),
        title: 'Promise-based Requests'
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/rxjs-operators.component')
            .then(m => m.RxjsOperatorsComponent),
        title: 'RxJS Operators'
    },
    {
        path: 'use-case-7',
        loadComponent: () => import('./components/use-case-7/caching.component')
            .then(m => m.CachingComponent),
        title: 'Caching Strategies'
    },
    {
        path: 'use-case-8',
        loadComponent: () => import('./components/use-case-8/file-operations.component')
            .then(m => m.FileOperationsComponent),
        title: 'File Upload/Download'
    }
];
