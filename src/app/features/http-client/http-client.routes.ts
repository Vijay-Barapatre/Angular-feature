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
        path: 'basic-get',
        loadComponent: () => import('./components/basic-get/basic-get.component')
            .then(m => m.BasicGetComponent),
        title: 'Basic GET with Observable'
    },
    {
        path: 'crud',
        loadComponent: () => import('./components/crud/crud.component')
            .then(m => m.CrudComponent),
        title: 'CRUD Operations'
    },
    {
        path: 'error-handling',
        loadComponent: () => import('./components/error-handling/error-handling.component')
            .then(m => m.ErrorHandlingComponent),
        title: 'Error Handling & Retry'
    },
    {
        path: 'interceptors',
        loadComponent: () => import('./components/interceptors/interceptors.component')
            .then(m => m.InterceptorsComponent),
        title: 'HTTP Interceptors'
    },
    {
        path: 'promises',
        loadComponent: () => import('./components/promises/promises.component')
            .then(m => m.PromisesComponent),
        title: 'Promise-based Requests'
    },
    {
        path: 'rxjs-operators',
        loadComponent: () => import('./components/rxjs-operators/rxjs-operators.component')
            .then(m => m.RxjsOperatorsComponent),
        title: 'RxJS Operators'
    },
    {
        path: 'caching',
        loadComponent: () => import('./components/caching/caching.component')
            .then(m => m.CachingComponent),
        title: 'Caching Strategies'
    },
    {
        path: 'file-operations',
        loadComponent: () => import('./components/file-operations/file-operations.component')
            .then(m => m.FileOperationsComponent),
        title: 'File Upload/Download'
    },
    {
        path: 'promise-patterns',
        loadComponent: () => import('./components/promise-patterns/promise-patterns.component')
            .then(m => m.PromisePatternsComponent),
        title: 'Advanced Promise Patterns'
    }
];
