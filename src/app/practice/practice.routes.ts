/**
 * ============================================================================
 * PRACTICE ROUTES
 * ============================================================================
 * 
 * Central routing for all practice exercises organized by feature.
 */

import { Routes } from '@angular/router';

export const PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./practice-home.component')
            .then(m => m.PracticeHomeComponent)
    },

    // Input/Output Practice
    {
        path: 'input-output',
        loadChildren: () => import('./input-output/input-output-practice.routes')
            .then(m => m.INPUT_OUTPUT_PRACTICE_ROUTES)
    },

    // Security Practice
    {
        path: 'security',
        loadChildren: () => import('./security/security-practice.routes')
            .then(m => m.SECURITY_PRACTICE_ROUTES)
    },

    // Signals Practice
    {
        path: 'signals',
        loadChildren: () => import('./signals/signals-practice.routes')
            .then(m => m.SIGNALS_PRACTICE_ROUTES)
    },

    // Reactive Forms Practice
    {
        path: 'reactive-forms',
        loadChildren: () => import('./reactive-forms/reactive-forms-practice.routes')
            .then(m => m.REACTIVE_FORMS_PRACTICE_ROUTES)
    },

    // HTTP Client Practice
    {
        path: 'http-client',
        loadChildren: () => import('./http-client/http-practice.routes')
            .then(m => m.HTTP_PRACTICE_ROUTES)
    },

    // RxJS Practice
    {
        path: 'rxjs',
        loadChildren: () => import('./rxjs/rxjs-practice.routes')
            .then(m => m.RXJS_PRACTICE_ROUTES)
    },

    // Routing Practice
    {
        path: 'routing',
        loadChildren: () => import('./routing/routing-practice.routes')
            .then(m => m.ROUTING_PRACTICE_ROUTES)
    },

    // Testing Practice
    {
        path: 'testing',
        loadChildren: () => import('./testing/testing-practice.routes')
            .then(m => m.TESTING_PRACTICE_ROUTES)
    },

    // Guards Practice
    {
        path: 'guards',
        loadChildren: () => import('./guards/guards-practice.routes')
            .then(m => m.GUARDS_PRACTICE_ROUTES)
    },

    // Directives Practice
    {
        path: 'directives',
        loadChildren: () => import('./directives/directives-practice.routes')
            .then(m => m.DIRECTIVES_PRACTICE_ROUTES)
    },

    // Pipes Practice
    {
        path: 'pipes',
        loadChildren: () => import('./pipes/pipes-practice.routes')
            .then(m => m.PIPES_PRACTICE_ROUTES)
    },

    // Lifecycle Hooks Practice
    {
        path: 'lifecycle-hooks',
        loadChildren: () => import('./lifecycle-hooks/lifecycle-practice.routes')
            .then(m => m.LIFECYCLE_PRACTICE_ROUTES)
    },

    // Services & DI Practice
    {
        path: 'services-di',
        loadChildren: () => import('./services-di/services-practice.component')
            .then(m => m.SERVICES_PRACTICE_ROUTES)
    },

    // Template Forms Practice
    {
        path: 'template-forms',
        loadChildren: () => import('./template-forms/template-forms-practice.component')
            .then(m => m.TEMPLATE_FORMS_PRACTICE_ROUTES)
    },

    // Content Projection Practice
    {
        path: 'content-projection',
        loadChildren: () => import('./content-projection/content-projection-practice.component')
            .then(m => m.CONTENT_PROJECTION_PRACTICE_ROUTES)
    },

    // ViewChild/ContentChild Practice
    {
        path: 'viewchild-contentchild',
        loadChildren: () => import('./viewchild-contentchild/viewchild-practice.component')
            .then(m => m.VIEWCHILD_PRACTICE_ROUTES)
    },

    // Error Handling Practice
    {
        path: 'error-handling',
        loadChildren: () => import('./error-handling/error-handling-practice.component')
            .then(m => m.ERROR_HANDLING_PRACTICE_ROUTES)
    },

    // Dynamic Components Practice
    {
        path: 'dynamic-components',
        loadChildren: () => import('./dynamic-components/dynamic-components-practice.component')
            .then(m => m.DYNAMIC_COMPONENTS_PRACTICE_ROUTES)
    },

    // Host Binding Practice
    {
        path: 'host-binding',
        loadChildren: () => import('./host-binding/host-binding-practice.component')
            .then(m => m.HOST_BINDING_PRACTICE_ROUTES)
    },

    // Defer Views Practice
    {
        path: 'defer-views',
        loadChildren: () => import('./defer-views/defer-views-practice.component')
            .then(m => m.DEFER_VIEWS_PRACTICE_ROUTES)
    },

    // Performance Practice
    {
        path: 'performance',
        loadChildren: () => import('./performance/performance-practice.component')
            .then(m => m.PERFORMANCE_PRACTICE_ROUTES)
    },

    // Animations Practice
    {
        path: 'animations',
        loadChildren: () => import('./animations/animations-practice.component')
            .then(m => m.ANIMATIONS_PRACTICE_ROUTES)
    },

    // Change Detection Practice
    {
        path: 'change-detection',
        loadChildren: () => import('./change-detection/change-detection-practice.component')
            .then(m => m.CHANGE_DETECTION_PRACTICE_ROUTES)
    },

    // Control Flow Practice
    {
        path: 'control-flow',
        loadChildren: () => import('./control-flow/control-flow-practice.component')
            .then(m => m.CONTROL_FLOW_PRACTICE_ROUTES)
    },

    // Standalone Components Practice
    {
        path: 'standalone-components',
        loadChildren: () => import('./standalone-components/standalone-practice.component')
            .then(m => m.STANDALONE_PRACTICE_ROUTES)
    },

    // NgRx Practice
    {
        path: 'ngrx',
        loadChildren: () => import('./ngrx/ngrx-practice.component')
            .then(m => m.NGRX_PRACTICE_ROUTES)
    },

    // MSAL Auth Practice
    {
        path: 'msal-auth',
        loadChildren: () => import('./msal-auth/msal-auth-practice.component')
            .then(m => m.MSAL_AUTH_PRACTICE_ROUTES)
    },

    // NgModule Practice
    {
        path: 'ngmodule',
        loadChildren: () => import('./ngmodule/ngmodule-practice.component')
            .then(m => m.NGMODULE_PRACTICE_ROUTES)
    },

    // i18n Practice
    {
        path: 'i18n',
        loadChildren: () => import('./i18n/i18n-practice.component')
            .then(m => m.I18N_PRACTICE_ROUTES)
    },

    // SSR Practice
    {
        path: 'ssr',
        loadChildren: () => import('./ssr/ssr-practice.routes')
            .then(m => m.SSR_PRACTICE_ROUTES)
    }
];
