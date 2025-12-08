import { Routes } from '@angular/router';
import { RoutingOverviewComponent } from './routing-overview.component';

export const ROUTING_ROUTES: Routes = [
    {
        path: '',
        component: RoutingOverviewComponent
    },
    {
        path: 'basic-navigation',
        loadComponent: () => import('./components/use-case-1/basic-navigation.component').then(m => m.BasicNavigationComponent)
    },
    {
        path: 'route-parameters',
        loadComponent: () => import('./components/use-case-2/route-parameters.component').then(m => m.RouteParametersComponent)
    },
    {
        path: 'route-parameters/user/:id',
        loadComponent: () => import('./components/use-case-2/user-profile.component').then(m => m.UserProfileComponent)
    },
    {
        path: 'query-parameters',
        loadComponent: () => import('./components/use-case-3/query-parameters.component').then(m => m.QueryParametersComponent)
    },
    {
        path: 'child-routes',
        loadComponent: () => import('./components/use-case-4/child-routes.component').then(m => m.ChildRoutesComponent),
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'overview',
                loadComponent: () => import('./components/use-case-4/dashboard-overview.component').then(m => m.DashboardOverviewComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./components/use-case-4/dashboard-settings.component').then(m => m.DashboardSettingsComponent)
            }
        ]
    },
    {
        path: 'programmatic-navigation',
        loadComponent: () => import('./components/use-case-5/programmatic-navigation.component').then(m => m.ProgrammaticNavigationComponent)
    }
];
