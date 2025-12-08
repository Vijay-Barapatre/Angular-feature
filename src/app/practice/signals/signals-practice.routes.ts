/**
 * ============================================================================
 * SIGNALS PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const SIGNALS_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./signals-practice.component')
            .then(m => m.SignalsPracticeComponent),
        children: [
            // Basic Exercises
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-creating-signals.component')
                    .then(m => m.Exercise1SignalsComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-computed.component')
                    .then(m => m.Exercise2ComputedComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-effects.component')
                    .then(m => m.Exercise3EffectsComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-updates.component')
                    .then(m => m.Exercise4UpdatesComponent)
            },

            // Complex Scenarios
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-cart.component')
                    .then(m => m.Scenario1CartComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-form.component')
                    .then(m => m.Scenario2FormComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-theme.component')
                    .then(m => m.Scenario3ThemeComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-dashboard.component')
                    .then(m => m.Scenario4DashboardComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-undo.component')
                    .then(m => m.Scenario5UndoComponent)
            },

            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
