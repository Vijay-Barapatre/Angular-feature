
import { Routes } from '@angular/router';

export const GUARDS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.GuardsOverviewComponent)
    },
    {
        path: 'use-case-1',
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            {
                path: 'admin',
                loadComponent: () => import('./components/use-case-1/admin.component').then(m => m.AdminComponent),
                canActivate: [() => import('./components/use-case-1/auth.guard').then(m => m.authGuard)]
            },
            {
                path: 'login',
                loadComponent: () => import('./components/use-case-1/login.component').then(m => m.LoginComponent)
            }
        ]
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/form-edit.component').then(m => m.FormEditComponent),
        canDeactivate: [() => import('./components/use-case-2/unsaved-changes.guard').then(m => m.unsavedChangesGuard)]
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/user-profile.component').then(m => m.UserProfileComponent),
        resolve: {
            userData: () => import('./components/use-case-3/user.resolver').then(m => m.userResolver)
        }
    }
];
