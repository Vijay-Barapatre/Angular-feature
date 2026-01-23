/**
 * SIGNALS FEATURE ROUTES
 * 
 * Angular 17+ Signals - Modern reactive state management
 * 
 * ROUTE STRUCTURE:
 * /signals (base)
 *   ├── / (overview)
 *   ├── /basic-signals (Basic Signals)
 *   ├── /computed-signals (Computed Signals)
 *   ├── /effects (Effects)
 *   ├── /signal-inputs (Signal Inputs)
 *   ├── /model-signals (Model Signals)
 *   ├── /signals-vs-observables (Signals vs Observables)
 *   └── /exercise (Learner practice)
 */

import { Routes } from '@angular/router';

export const SIGNALS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'basic-signals',
        loadComponent: () => import('./components/basic-signals/demo.component').then(m => m.UseCase1DemoComponent)
    },
    {
        path: 'computed-signals',
        loadComponent: () => import('./components/computed-signals/demo.component').then(m => m.UseCase2DemoComponent)
    },
    {
        path: 'effects',
        loadComponent: () => import('./components/effects/demo.component').then(m => m.UseCase3DemoComponent)
    },
    {
        path: 'signal-inputs',
        loadComponent: () => import('./components/signal-inputs/demo.component').then(m => m.UseCase4DemoComponent)
    },
    {
        path: 'model-signals',
        loadComponent: () => import('./components/model-signals/demo.component').then(m => m.UseCase5DemoComponent)
    },
    {
        path: 'signals-vs-observables',
        loadComponent: () => import('./components/signals-vs-observables/demo.component').then(m => m.UseCase6DemoComponent)
    },
    {
        path: 'exercise',
        loadComponent: () => import('./components/learner-exercise/exercise.component').then(m => m.LearnerExerciseComponent)
    }
];
