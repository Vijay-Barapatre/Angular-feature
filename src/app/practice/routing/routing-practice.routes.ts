/**
 * ============================================================================
 * ROUTING PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const ROUTING_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./routing-practice.component')
            .then(m => m.RoutingPracticeComponent),
        children: [
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('./basic/exercise-1-basic.component')
                    .then(m => m.Exercise1BasicComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('./basic/exercise-2-params.component')
                    .then(m => m.Exercise2ParamsComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('./basic/exercise-3-query.component')
                    .then(m => m.Exercise3QueryComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('./basic/exercise-4-children.component')
                    .then(m => m.Exercise4ChildrenComponent)
            },
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('./complex/scenario-1-guards.component')
                    .then(m => m.Scenario1GuardsComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('./complex/scenario-2-lazy.component')
                    .then(m => m.Scenario2LazyComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('./complex/scenario-3-resolvers.component')
                    .then(m => m.Scenario3ResolversComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('./complex/scenario-4-events.component')
                    .then(m => m.Scenario4EventsComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('./complex/scenario-5-dynamic.component')
                    .then(m => m.Scenario5DynamicComponent)
            },
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
