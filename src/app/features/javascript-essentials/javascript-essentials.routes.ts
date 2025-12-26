import { Routes } from '@angular/router';

export const JAVASCRIPT_ESSENTIALS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.JavaScriptOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/variables-datatypes.component').then(m => m.VariablesDataTypesComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/spread-rest.component').then(m => m.SpreadRestComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/destructuring.component').then(m => m.DestructuringComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/arrow-functions.component').then(m => m.ArrowFunctionsComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/async-await.component').then(m => m.AsyncAwaitComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/array-methods.component').then(m => m.ArrayMethodsComponent)
    }
];
