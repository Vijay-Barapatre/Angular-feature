import { Routes } from '@angular/router';

export const PIPES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'built-in-pipes',
        loadComponent: () => import('./components/built-in-pipes/built-in-pipes.component').then(m => m.BuiltInPipesComponent)
    },
    {
        path: 'custom-pipe',
        loadComponent: () => import('./components/custom-pipe/custom-pipe.component').then(m => m.CustomPipeComponent)
    },
    {
        path: 'pure-impure-pipes',
        loadComponent: () => import('./components/pure-impure-pipes/pure-impure-pipes.component').then(m => m.PureImpurePipesComponent)
    },
    {
        path: 'async-pipe',
        loadComponent: () => import('./components/async-pipe/async-pipe.component').then(m => m.AsyncPipeComponent)
    },
    {
        path: 'json-keyvalue-pipe',
        loadComponent: () => import('./components/json-keyvalue-pipe/json-keyvalue-pipe.component').then(m => m.JsonKeyValuePipeComponent)
    },
    {
        path: 'chaining-pipes',
        loadComponent: () => import('./components/chaining-pipes/chaining-pipes.component').then(m => m.ChainingPipesComponent)
    },
    {
        path: 'exercise',
        loadComponent: () => import('./components/learner-exercise/exercise.component').then(m => m.LearnerExerciseComponent)
    }
];
