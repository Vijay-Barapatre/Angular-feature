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
    }
];
