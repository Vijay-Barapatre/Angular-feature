import { Routes } from '@angular/router';
import { RoutingOverviewComponent } from './routing-overview.component';

export const ROUTING_ROUTES: Routes = [
    {
        path: '',
        component: RoutingOverviewComponent
    },
    {
        path: 'basic-navigation',
        loadComponent: () => import('./components/basic-navigation/basic-navigation.component').then(m => m.BasicNavigationComponent)
    },
    {
        path: 'route-parameters',
        loadComponent: () => import('./components/route-parameters/route-parameters.component').then(m => m.RouteParametersComponent)
    },
    {
        path: 'route-parameters/user/:id',
        loadComponent: () => import('./components/route-parameters/user-profile.component').then(m => m.UserProfileComponent)
    },
    {
        path: 'query-parameters',
        loadComponent: () => import('./components/query-parameters/query-parameters.component').then(m => m.QueryParametersComponent)
    },
    {
        path: 'child-routes',
        loadComponent: () => import('./components/child-routes/child-routes.component').then(m => m.ChildRoutesComponent),
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'overview',
                loadComponent: () => import('./components/child-routes/dashboard-overview.component').then(m => m.DashboardOverviewComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./components/child-routes/dashboard-settings.component').then(m => m.DashboardSettingsComponent)
            }
        ]
    },
    {
        path: 'programmatic-navigation',
        loadComponent: () => import('./components/programmatic-navigation/programmatic-navigation.component').then(m => m.ProgrammaticNavigationComponent)
    }
];
