import { Routes } from '@angular/router';

export const JAVASCRIPT_ESSENTIALS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.JavaScriptOverviewComponent)
    },
    {
        path: 'variables-datatypes',
        loadComponent: () => import('./components/variables-datatypes/variables-datatypes.component').then(m => m.VariablesDataTypesComponent)
    },
    {
        path: 'spread-rest',
        loadComponent: () => import('./components/spread-rest/spread-rest.component').then(m => m.SpreadRestComponent)
    },
    {
        path: 'destructuring',
        loadComponent: () => import('./components/destructuring/destructuring.component').then(m => m.DestructuringComponent)
    },
    {
        path: 'arrow-functions',
        loadComponent: () => import('./components/arrow-functions/arrow-functions.component').then(m => m.ArrowFunctionsComponent)
    },
    {
        path: 'async-await',
        loadComponent: () => import('./components/async-await/async-await.component').then(m => m.AsyncAwaitComponent)
    },
    {
        path: 'array-methods',
        loadComponent: () => import('./components/array-methods/array-methods.component').then(m => m.ArrayMethodsComponent)
    }
];
