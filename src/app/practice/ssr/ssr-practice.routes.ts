/**
 * ============================================================================
 * SSR PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const SSR_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./ssr-practice.component')
            .then(m => m.SsrPracticeComponent),
        children: [
            // Basic Exercises
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('../../features/ssr/practice/basic/exercise-1-platform-detection.component')
                    .then(m => m.ExercisePlatformDetectionComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('../../features/ssr/practice/basic/exercise-2-safe-dom-access.component')
                    .then(m => m.ExerciseSafeDomAccessComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('../../features/ssr/practice/basic/exercise-3-transfer-state.component')
                    .then(m => m.ExerciseTransferStateComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('../../features/ssr/practice/basic/exercise-4-seo-meta-tags.component')
                    .then(m => m.ExerciseSeoMetaTagsComponent)
            },

            // Complex Scenarios
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('../../features/ssr/practice/complex/scenario-1-ssr-data-service.component')
                    .then(m => m.ScenarioSsrDataServiceComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('../../features/ssr/practice/complex/scenario-2-browser-only-component.component')
                    .then(m => m.ScenarioBrowserOnlyComponentComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('../../features/ssr/practice/complex/scenario-3-seo-service.component')
                    .then(m => m.ScenarioSeoServiceComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('../../features/ssr/practice/complex/scenario-4-hybrid-strategy.component')
                    .then(m => m.ScenarioHybridStrategyComponent)
            },

            // Default redirect
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
