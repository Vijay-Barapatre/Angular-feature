/**
 * ============================================================================
 * INPUT/OUTPUT PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const INPUT_OUTPUT_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./input-output-practice.component')
            .then(m => m.InputOutputPracticeComponent),
        children: [
            // Basic Exercises
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-simple-input.component')
                    .then(m => m.Exercise1SimpleInputComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-output-events.component')
                    .then(m => m.Exercise2OutputEventsComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-two-way.component')
                    .then(m => m.Exercise3TwoWayComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-transform.component')
                    .then(m => m.Exercise4TransformComponent)
            },

            // Complex Scenarios
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-shopping-cart.component')
                    .then(m => m.Scenario1ShoppingCartComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-form-wizard.component')
                    .then(m => m.Scenario2FormWizardComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-data-table.component')
                    .then(m => m.Scenario3DataTableComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-modal.component')
                    .then(m => m.Scenario4ModalComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-tabs.component')
                    .then(m => m.Scenario5TabsComponent)
            },

            // Default redirect
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
