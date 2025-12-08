/**
 * ============================================================================
 * GUARDS PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const GUARDS_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./guards-practice.component')
            .then(m => m.GuardsPracticeComponent),
        children: [
            // Basic Exercises
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-auth/exercise.component')
                    .then(m => m.Exercise1AuthComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-role/exercise.component')
                    .then(m => m.Exercise2RoleComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-deactivate/exercise.component')
                    .then(m => m.Exercise3DeactivateComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-resolve/exercise.component')
                    .then(m => m.Exercise4ResolveComponent)
            },

            // Complex Scenarios
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-multi-guard/exercise.component')
                    .then(m => m.Scenario1MultiGuardComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-lazy-guard/exercise.component')
                    .then(m => m.Scenario2LazyGuardComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-permission/exercise.component')
                    .then(m => m.Scenario3PermissionComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-form-dirty/exercise.component')
                    .then(m => m.Scenario4FormDirtyComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-feature-flag/exercise.component')
                    .then(m => m.Scenario5FeatureFlagComponent)
            }
        ]
    }
];
