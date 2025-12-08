/**
 * ============================================================================
 * DIRECTIVES PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const DIRECTIVES_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./directives-practice.component')
            .then(m => m.DirectivesPracticeComponent),
        children: [
            // Basic Exercises
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-attribute/exercise.component')
                    .then(m => m.Exercise1AttributeComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-structural/exercise.component')
                    .then(m => m.Exercise2StructuralComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-host-binding/exercise.component')
                    .then(m => m.Exercise3HostBindingComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-input/exercise.component')
                    .then(m => m.Exercise4InputComponent)
            },

            // Complex Scenarios
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-tooltip/exercise.component')
                    .then(m => m.Scenario1TooltipComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-permission/exercise.component')
                    .then(m => m.Scenario2PermissionComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-infinite-scroll/exercise.component')
                    .then(m => m.Scenario3InfiniteScrollComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-click-outside/exercise.component')
                    .then(m => m.Scenario4ClickOutsideComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-debounce/exercise.component')
                    .then(m => m.Scenario5DebounceComponent)
            }
        ]
    }
];
