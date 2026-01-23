import { Routes } from '@angular/router';

export const ZONE_CD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'zone-execution',
        loadComponent: () => import('./components/zone-execution/zone-execution.component').then(m => m.ZoneExecutionComponent)
    },
    {
        path: 'run-outside',
        loadComponent: () => import('./components/run-outside/run-outside.component').then(m => m.RunOutsideComponent)
    },
    {
        path: 'strategies',
        loadComponent: () => import('./components/strategies/strategies.component').then(m => m.StrategiesComponent)
    },
    {
        path: 'manual-detection',
        loadComponent: () => import('./components/manual-detection/manual-detection.component').then(m => m.ManualDetectionComponent)
    },
    {
        path: 'detach-reattach',
        loadComponent: () => import('./components/detach-reattach/detach-reattach.component').then(m => m.DetachReattachComponent)
    },
    {
        path: 'exercise',
        loadComponent: () => import('./components/learner-exercise/exercise.component').then(m => m.LearnerExerciseComponent)
    }
];
