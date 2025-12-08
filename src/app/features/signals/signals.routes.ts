/**
 * SIGNALS FEATURE ROUTES
 * 
 * Angular 17+ Signals - Modern reactive state management
 * 
 * ROUTE STRUCTURE:
 * /signals (base)
 *   ├── / (overview)
 *   ├── /use-case-1 (Basic Signals)
 *   ├── /use-case-2 (Computed Signals)
 *   ├── /use-case-3 (Effects)
 *   ├── /use-case-4 (Signal Inputs)
 *   ├── /use-case-5 (Model Signals)
 *   ├── /use-case-6 (Signals vs Observables)
 *   └── /exercise (Learner practice)
 */

import { Routes } from '@angular/router';

export const SIGNALS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/demo.component').then(m => m.UseCase1DemoComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/demo.component').then(m => m.UseCase2DemoComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/demo.component').then(m => m.UseCase3DemoComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/demo.component').then(m => m.UseCase4DemoComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/demo.component').then(m => m.UseCase5DemoComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/demo.component').then(m => m.UseCase6DemoComponent)
    },
    {
        path: 'exercise',
        loadComponent: () => import('./components/learner-exercise/exercise.component').then(m => m.LearnerExerciseComponent)
    }
];
