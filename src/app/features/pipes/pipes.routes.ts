import { Routes } from '@angular/router';

export const PIPES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/built-in-pipes.component').then(m => m.BuiltInPipesComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/custom-pipe.component').then(m => m.CustomPipeComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/pure-impure-pipes.component').then(m => m.PureImpurePipesComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/async-pipe.component').then(m => m.AsyncPipeComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/json-keyvalue-pipe.component').then(m => m.JsonKeyValuePipeComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/chaining-pipes.component').then(m => m.ChainingPipesComponent)
    },
    {
        path: 'exercise',
        loadComponent: () => import('./components/learner-exercise/exercise.component').then(m => m.LearnerExerciseComponent)
    }
];
