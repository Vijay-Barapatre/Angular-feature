/**
 * ============================================================================
 * PIPES PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const PIPES_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pipes-practice.component')
            .then(m => m.PipesPracticeComponent),
        children: [
            // Basic Exercises
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-custom/exercise.component')
                    .then(m => m.Exercise1CustomComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-arguments/exercise.component')
                    .then(m => m.Exercise2ArgumentsComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-pure-impure/exercise.component')
                    .then(m => m.Exercise3PureImpureComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-async/exercise.component')
                    .then(m => m.Exercise4AsyncComponent)
            },

            // Complex Scenarios
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-search/exercise.component')
                    .then(m => m.Scenario1SearchComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-sorting/exercise.component')
                    .then(m => m.Scenario2SortingComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-time-ago/exercise.component')
                    .then(m => m.Scenario3TimeAgoComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-file-size/exercise.component')
                    .then(m => m.Scenario4FileSizeComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-memoization/exercise.component')
                    .then(m => m.Scenario5MemoizationComponent)
            }
        ]
    }
];
