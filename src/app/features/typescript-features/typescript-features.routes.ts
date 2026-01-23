import { Routes } from '@angular/router';

export const TYPESCRIPT_FEATURES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.TypeScriptOverviewComponent)
    },
    {
        path: 'interfaces-types',
        loadComponent: () => import('./components/interfaces-types/interfaces-types.component').then(m => m.InterfacesTypesComponent)
    },
    {
        path: 'generics',
        loadComponent: () => import('./components/generics/generics.component').then(m => m.GenericsComponent)
    },
    {
        path: 'decorators',
        loadComponent: () => import('./components/decorators/decorators.component').then(m => m.DecoratorsComponent)
    },
    {
        path: 'union-intersection',
        loadComponent: () => import('./components/union-intersection/union-intersection.component').then(m => m.UnionIntersectionComponent)
    },
    {
        path: 'type-guards',
        loadComponent: () => import('./components/type-guards/type-guards.component').then(m => m.TypeGuardsComponent)
    },
    {
        path: 'utility-types',
        loadComponent: () => import('./components/utility-types/utility-types.component').then(m => m.UtilityTypesComponent)
    }
];
