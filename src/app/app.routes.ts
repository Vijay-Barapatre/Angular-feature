/**
 * APPLICATION ROUTES CONFIGURATION
 * 
 * This file defines all the routes for the Angular application.
 * 
 * ROUTING CONCEPTS:
 * - Routes: Array of route definitions
 * - Path: URL pattern to match
 * - Component: Component to display when route matches
 * - Lazy Loading: Load feature modules only when needed (improves performance)
 * - loadChildren: Function that returns a promise of routes (lazy loading)
 * 
 * LEARNING NOTES:
 * - Routes are matched in order (first match wins)
 * - Empty path '' is the default/home route
 * - '**' wildcard matches any route (used for 404 pages)
 */

import { Routes } from '@angular/router';

export const routes: Routes = [
    /**
     * HOME ROUTE
     * Displays the landing page with feature categories
     */
    {
        path: 'rxjs-subjects',
        loadChildren: () => import('./features/rxjs-subjects/rxjs-subjects.routes').then(m => m.RXJS_SUBJECTS_ROUTES)
    },
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },

    /**
     * INPUT/OUTPUT FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /input-output/*
     * This improves initial load time
     */
    {
        path: 'input-output',
        loadChildren: () => import('./features/input-output/input-output.routes').then(m => m.INPUT_OUTPUT_ROUTES)
    },

    /**
     * VIEWCHILD/CONTENTCHILD FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /viewchild-contentchild/*
     * Demonstrates component querying and content projection
     */
    {
        path: 'viewchild-contentchild',
        loadChildren: () => import('./features/viewchild-contentchild/viewchild-contentchild.routes').then(m => m.VIEWCHILD_CONTENTCHILD_ROUTES)
    },

    /**
     * SERVICES & DEPENDENCY INJECTION FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /services-di/*
     * Demonstrates Angular's DI system, service scopes, and provider patterns
     */
    {
        path: 'services-di',
        loadChildren: () => import('./features/services-di/services-di.routes').then(m => m.SERVICES_DI_ROUTES)
    },

    /**
     * LIFECYCLE HOOKS FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /lifecycle-hooks/*
     * Demonstrates Angular's component lifecycle management
     */
    {
        path: 'lifecycle-hooks',
        loadChildren: () => import('./features/lifecycle-hooks/lifecycle-hooks.routes').then(m => m.LIFECYCLE_HOOKS_ROUTES)
    },

    /**
     * GUARDS FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /guards/*
     * Demonstrates Functional Route Guards and Resolvers
     */
    {
        path: 'guards',
        loadChildren: () => import('./features/guards/guards.routes').then(m => m.GUARDS_ROUTES)
    },

    /**
     * TEMPLATE DRIVEN FORMS FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /template-forms/*
     * Demonstrates handling forms with ngModel and directives
     */
    {
        path: 'template-forms',
        loadChildren: () => import('./features/template-forms/template-forms.routes').then(m => m.TEMPLATE_FORMS_ROUTES)
    },

    /**
     * REACTIVE FORMS FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /reactive-forms/*
     * Demonstrates Angular's model-driven forms approach
     */
    {
        path: 'reactive-forms',
        loadChildren: () => import('./features/reactive-forms/reactive-forms.routes').then(m => m.REACTIVE_FORMS_ROUTES)
    },

    /**
     * HOST LISTENER & HOST BINDING FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /host-listener/*
     * Demonstrates @HostListener and @HostBinding decorators
     */
    {
        path: 'host-listener',
        loadChildren: () => import('./features/host-listener/host-listener.routes').then(m => m.HOST_LISTENER_ROUTES)
    },

    /**
     * HTTP CLIENT FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /http-client/*
     * Demonstrates HttpClient, Observables, Promises, and RxJS patterns
     */
    {
        path: 'http-client',
        loadChildren: () => import('./features/http-client/http-client.routes').then(m => m.HTTP_CLIENT_ROUTES)
    },

    /**
     * DIRECTIVES FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /directives/*
     * Demonstrates attribute and structural directives
     */
    {
        path: 'directives',
        loadChildren: () => import('./features/directives/directives.routes').then(m => m.DIRECTIVES_ROUTES)
    },

    /**
     * SIGNALS FEATURE MODULE (Angular 17+)
     * Lazy-loaded: Only loads when user navigates to /signals/*
     * Demonstrates modern reactive state management with signals
     */
    {
        path: 'signals',
        loadChildren: () => import('./features/signals/signals.routes').then(m => m.SIGNALS_ROUTES)
    },

    /**
     * NGRX STATE MANAGEMENT FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /ngrx/*
     * Demonstrates Redux pattern with NgRx
     */
    {
        path: 'ngrx',
        loadChildren: () => import('./features/ngrx/ngrx.routes').then(m => m.NGRX_ROUTES)
    },

    /**
     * PIPES FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /pipes/*
     * Demonstrates Angular's data transformation pipes
     */
    {
        path: 'pipes',
        loadChildren: () => import('./features/pipes/pipes.routes').then(m => m.PIPES_ROUTES)
    },

    /**
     * ZONE.JS & CHANGE DETECTION FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /zone-cd/*
     * Demonstrates Angular's core change detection mechanism
     */
    {
        path: 'zone-cd',
        loadChildren: () => import('./features/zone-cd/zone-cd.routes').then(m => m.ZONE_CD_ROUTES)
    },

    /**
     * ROUTING FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /routing/*
     * Demonstrates Angular Router Features
     */
    {
        path: 'routing',
        loadChildren: () => import('./features/routing/routing.routes').then(m => m.ROUTING_ROUTES)
    },

    /**
     * SERVICE WORKER (PWA) FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /service-worker/*
     * Demonstrates PWA capabilities
     */
    {
        path: 'service-worker',
        loadChildren: () => import('./features/service-worker/service-worker.routes').then(m => m.SERVICE_WORKER_ROUTES)
    },

    /**
     * DYNAMIC COMPONENTS FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /dynamic-components/*
     * Demonstrates runtime component creation
     */
    {
        path: 'dynamic-components',
        loadChildren: () => import('./features/dynamic-components/dynamic-components.routes').then(m => m.DYNAMIC_COMPONENTS_ROUTES)
    },

    /**
     * TESTING FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /testing/*
     * Demonstrates Angular testing patterns with Jasmine and Karma
     */
    {
        path: 'testing',
        loadChildren: () => import('./features/testing/testing.routes').then(m => m.TESTING_ROUTES)
    },

    /**
     * DEFER VIEWS FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /defer-views/*
     * Demonstrates Angular 17+ @defer blocks for lazy loading content
     */
    {
        path: 'defer-views',
        loadChildren: () => import('./features/defer-views/defer-views.routes').then(m => m.DEFER_VIEWS_ROUTES)
    },

    /**
     * STANDALONE APIS FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /standalone-apis/*
     * Demonstrates modern Angular standalone components, directives, and provider functions
     */
    {
        path: 'standalone-apis',
        loadChildren: () => import('./features/standalone-apis/standalone-apis.routes').then(m => m.STANDALONE_APIS_ROUTES)
    },

    /**
     * PERFORMANCE OPTIMIZATION FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /performance/*
     * Demonstrates Angular performance optimization best practices
     */
    {
        path: 'performance',
        loadChildren: () => import('./features/performance/performance.routes').then(m => m.PERFORMANCE_ROUTES)
    },

    /**
     * RXJS-SIGNAL INTEROP FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /rxjs-signal-interop/*
     * Demonstrates toSignal, toObservable, and hybrid patterns
     */
    {
        path: 'rxjs-signal-interop',
        loadChildren: () => import('./features/rxjs-signal-interop/rxjs-signal-interop.routes').then(m => m.RXJS_SIGNAL_INTEROP_ROUTES)
    },

    /**
     * NGMODULES FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /ngmodules/*
     * Demonstrates NgModule patterns, providers, and comparison with standalone
     */
    {
        path: 'ngmodules',
        loadChildren: () => import('./features/ngmodules/ngmodules.routes').then(m => m.NGMODULES_ROUTES)
    },

    /**
     * ANGULAR LIBRARY FEATURE MODULE
     * Lazy-loaded: Only loads when user navigates to /angular-library/*
     * Demonstrates creating, building, and publishing Angular libraries
     */
    {
        path: 'angular-library',
        loadChildren: () => import('./features/angular-library/angular-library.routes').then(m => m.ANGULAR_LIBRARY_ROUTES)
    },

    /**
     * MSAL AUTHENTICATION FEATURE MODULE
     * Demonstrates Azure AD authentication with MSAL
     */
    {
        path: 'msal-auth',
        loadChildren: () => import('./features/msal-auth/msal-auth.routes').then(m => m.MSAL_AUTH_ROUTES)
    },

    /**
     * CONTENT PROJECTION FEATURE
     */
    {
        path: 'content-projection',
        loadChildren: () => import('./features/content-projection/content-projection.routes').then(m => m.CONTENT_PROJECTION_ROUTES)
    },

    /**
     * CACHING STRATEGIES FEATURE
     */
    {
        path: 'caching-strategies',
        loadChildren: () => import('./features/caching-strategies/caching-strategies.routes').then(m => m.CACHING_STRATEGIES_ROUTES)
    },

    /**
     * ERROR HANDLING FEATURE
     */
    {
        path: 'error-handling',
        loadChildren: () => import('./features/error-handling/error-handling.routes').then(m => m.ERROR_HANDLING_ROUTES)
    },

    /**
     * SECURITY FEATURE
     */
    {
        path: 'security',
        loadChildren: () => import('./features/security/security.routes').then(m => m.SECURITY_ROUTES)
    },

    /**
     * SERVER-SIDE RENDERING (SSR) FEATURE
     * Demonstrates Angular Universal, hydration, transfer state, and prerendering
     */
    {
        path: 'ssr',
        loadChildren: () => import('./features/ssr/ssr.routes').then(m => m.SSR_ROUTES)
    },

    /**
     * ANIMATIONS FEATURE MODULE (NEW!)
     * Lazy-loaded: Only loads when user navigates to /animations/*
     * Demonstrates Angular's built-in animation system
     */
    {
        path: 'animations',
        loadChildren: () => import('./features/animations/animations.routes').then(m => m.ANIMATIONS_ROUTES)
    },

    /**
     * CONTROL FLOW FEATURE MODULE (Angular 17+ NEW!)
     * Lazy-loaded: Only loads when user navigates to /control-flow/*
     * Demonstrates @if, @for, @switch built-in control flow syntax
     */
    {
        path: 'control-flow',
        loadChildren: () => import('./features/control-flow/control-flow.routes').then(m => m.CONTROL_FLOW_ROUTES)
    },

    /**
     * JAVASCRIPT ESSENTIALS FEATURE MODULE
     * Core JavaScript concepts essential for Angular development
     */
    {
        path: 'javascript-essentials',
        loadChildren: () => import('./features/javascript-essentials/javascript-essentials.routes').then(m => m.JAVASCRIPT_ESSENTIALS_ROUTES)
    },

    /**
     * TYPESCRIPT FEATURES MODULE
     * TypeScript-specific features for robust Angular development
     */
    {
        path: 'typescript-features',
        loadChildren: () => import('./features/typescript-features/typescript-features.routes').then(m => m.TYPESCRIPT_FEATURES_ROUTES)
    },

    /**
     * PRACTICE EXERCISES
     * Centralized practice section for all features
     */
    {
        path: 'practice',
        loadChildren: () => import('./practice/practice.routes').then(m => m.PRACTICE_ROUTES)
    },

    /**
     * WILDCARD ROUTE (404 Not Found)
     * MUST be last in the array
     * Catches any unmatched routes
     */
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
