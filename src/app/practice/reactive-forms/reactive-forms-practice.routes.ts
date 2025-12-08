/**
 * ============================================================================
 * REACTIVE FORMS PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const REACTIVE_FORMS_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./reactive-forms-practice.component')
            .then(m => m.ReactiveFormsPracticeComponent),
        children: [
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-formcontrol.component')
                    .then(m => m.Exercise1FormControlComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-formgroup.component')
                    .then(m => m.Exercise2FormGroupComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-validators.component')
                    .then(m => m.Exercise3ValidatorsComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-custom.component')
                    .then(m => m.Exercise4CustomComponent)
            },
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-registration.component')
                    .then(m => m.Scenario1RegistrationComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-arrays.component')
                    .then(m => m.Scenario2ArraysComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-crossfield.component')
                    .then(m => m.Scenario3CrossfieldComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-async.component')
                    .then(m => m.Scenario4AsyncComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-nested.component')
                    .then(m => m.Scenario5NestedComponent)
            },
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
