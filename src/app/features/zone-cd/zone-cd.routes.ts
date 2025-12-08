import { Routes } from '@angular/router';

export const ZONE_CD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/zone-execution.component').then(m => m.ZoneExecutionComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/run-outside.component').then(m => m.RunOutsideComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/strategies.component').then(m => m.StrategiesComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/manual-detection.component').then(m => m.ManualDetectionComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/detach-reattach.component').then(m => m.DetachReattachComponent)
    },
    {
        path: 'exercise',
        loadComponent: () => import('./components/learner-exercise/exercise.component').then(m => m.LearnerExerciseComponent)
    }
];
