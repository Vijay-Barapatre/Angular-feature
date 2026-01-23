/**
 * ============================================================================
 * NGMODULES FEATURE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const NGMODULES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.NgModulesOverviewComponent)
    },
    {
        path: 'module-basics',
        loadComponent: () => import('./components/module-basics/module-basics.component')
            .then(m => m.ModuleBasicsComponent)
    },
    {
        path: 'feature-modules',
        loadComponent: () => import('./components/feature-modules/feature-modules.component')
            .then(m => m.FeatureModulesComponent)
    },
    {
        path: 'shared-modules',
        loadComponent: () => import('./components/shared-modules/shared-modules.component')
            .then(m => m.SharedModulesComponent)
    },
    {
        path: 'providers-di',
        loadComponent: () => import('./components/providers-di/providers-di.component')
            .then(m => m.ProvidersDIComponent)
    },
    {
        path: 'ngmodules-vs-standalone',
        loadComponent: () => import('./components/ngmodules-vs-standalone/ngmodules-vs-standalone.component')
            .then(m => m.NgModulesVsStandaloneComponent)
    }
];
