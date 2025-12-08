/**
 * ============================================================================
 * TESTING PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const TESTING_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./testing-practice.component')
            .then(m => m.TestingPracticeComponent),
        children: [
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-component.component')
                    .then(m => m.Exercise1ComponentTestingComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-service.component')
                    .then(m => m.Exercise2ServiceTestingComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-pipe.component')
                    .then(m => m.Exercise3PipeTestingComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-directive.component')
                    .then(m => m.Exercise4DirectiveTestingComponent)
            },
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-http.component')
                    .then(m => m.Scenario1HttpTestingComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-integration.component')
                    .then(m => m.Scenario2IntegrationComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-async.component')
                    .then(m => m.Scenario3AsyncComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-forms.component')
                    .then(m => m.Scenario4FormsComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-router.component')
                    .then(m => m.Scenario5RouterComponent)
            },
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
