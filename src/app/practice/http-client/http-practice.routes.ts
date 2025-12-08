/**
 * ============================================================================
 * HTTP CLIENT PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const HTTP_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./http-practice.component')
            .then(m => m.HttpPracticeComponent),
        children: [
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-get.component')
                    .then(m => m.Exercise1GetComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-mutations.component')
                    .then(m => m.Exercise2MutationsComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-params.component')
                    .then(m => m.Exercise3ParamsComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-errors.component')
                    .then(m => m.Exercise4ErrorsComponent)
            },
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-crud.component')
                    .then(m => m.Scenario1CrudComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-interceptor.component')
                    .then(m => m.Scenario2InterceptorComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-caching.component')
                    .then(m => m.Scenario3CachingComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-upload.component')
                    .then(m => m.Scenario4UploadComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-polling.component')
                    .then(m => m.Scenario5PollingComponent)
            },
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
