/**
 * ============================================================================
 * RXJS PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const RXJS_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./rxjs-practice.component')
            .then(m => m.RxjsPracticeComponent),
        children: [
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-observables.component')
                    .then(m => m.Exercise1ObservablesComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-operators.component')
                    .then(m => m.Exercise2OperatorsComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-subjects.component')
                    .then(m => m.Exercise3SubjectsComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-subscriptions.component')
                    .then(m => m.Exercise4SubscriptionsComponent)
            },
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-typeahead.component')
                    .then(m => m.Scenario1TypeaheadComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-combining.component')
                    .then(m => m.Scenario2CombiningComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-errors.component')
                    .then(m => m.Scenario3ErrorsComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-state.component')
                    .then(m => m.Scenario4StateComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-chat.component')
                    .then(m => m.Scenario5ChatComponent)
            },
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
