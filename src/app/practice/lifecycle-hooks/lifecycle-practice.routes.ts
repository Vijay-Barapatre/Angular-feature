/**
 * ============================================================================
 * LIFECYCLE HOOKS PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const LIFECYCLE_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./lifecycle-practice.component')
            .then(m => m.LifecyclePracticeComponent),
        children: [
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-init-destroy/exercise.component')
                    .then(m => m.Exercise1InitDestroyComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-onchanges/exercise.component')
                    .then(m => m.Exercise2OnChangesComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-afterviewinit/exercise.component')
                    .then(m => m.Exercise3AfterViewInitComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-aftercontentinit/exercise.component')
                    .then(m => m.Exercise4AfterContentInitComponent)
            },
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-timer/exercise.component')
                    .then(m => m.Scenario1TimerComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenarios.component')
                    .then(m => m.Scenario2LazyComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenarios.component')
                    .then(m => m.Scenario3FormComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenarios.component')
                    .then(m => m.Scenario4AnimationComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenarios.component')
                    .then(m => m.Scenario5PerformanceComponent)
            }
        ]
    }
];
