import { Routes } from '@angular/router';

export const TYPESCRIPT_FEATURES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.TypeScriptOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/interfaces-types.component').then(m => m.InterfacesTypesComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/generics.component').then(m => m.GenericsComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/decorators.component').then(m => m.DecoratorsComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/union-intersection.component').then(m => m.UnionIntersectionComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/type-guards.component').then(m => m.TypeGuardsComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/utility-types.component').then(m => m.UtilityTypesComponent)
    }
];
