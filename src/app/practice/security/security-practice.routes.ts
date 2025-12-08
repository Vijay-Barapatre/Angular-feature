/**
 * ============================================================================
 * SECURITY PRACTICE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const SECURITY_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./security-practice.component')
            .then(m => m.SecurityPracticeComponent),
        children: [
            // Basic Exercises - Load from features/security/practice
            {
                path: 'basic/exercise-1',
                loadComponent: () => import('../../features/security/practice/basic/exercise-1-safe-html.component')
                    .then(m => m.ExerciseSafeHtmlComponent)
            },
            {
                path: 'basic/exercise-2',
                loadComponent: () => import('../../features/security/practice/basic/exercise-2-input-validation.component')
                    .then(m => m.ExerciseInputValidationComponent)
            },
            {
                path: 'basic/exercise-3',
                loadComponent: () => import('../../features/security/practice/basic/exercise-3-xsrf-config.component')
                    .then(m => m.ExerciseXsrfConfigComponent)
            },
            {
                path: 'basic/exercise-4',
                loadComponent: () => import('../../features/security/practice/basic/exercise-4-secure-storage.component')
                    .then(m => m.ExerciseSecureStorageComponent)
            },

            // Complex Scenarios
            {
                path: 'complex/scenario-1',
                loadComponent: () => import('../../features/security/practice/complex/scenario-1-xss-demo.component')
                    .then(m => m.ScenarioXssDemoComponent)
            },
            {
                path: 'complex/scenario-2',
                loadComponent: () => import('../../features/security/practice/complex/scenario-2-jwt-refresh.component')
                    .then(m => m.ScenarioJwtRefreshComponent)
            },
            {
                path: 'complex/scenario-3',
                loadComponent: () => import('../../features/security/practice/complex/scenario-3-rbac.component')
                    .then(m => m.ScenarioRbacComponent)
            },
            {
                path: 'complex/scenario-4',
                loadComponent: () => import('../../features/security/practice/complex/scenario-4-secure-form.component')
                    .then(m => m.ScenarioSecureFormComponent)
            },
            {
                path: 'complex/scenario-5',
                loadComponent: () => import('../../features/security/practice/complex/scenario-5-audit-logger.component')
                    .then(m => m.ScenarioAuditLoggerComponent)
            },

            // Default redirect
            { path: '', redirectTo: 'basic/exercise-1', pathMatch: 'full' }
        ]
    }
];
