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
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/module-basics.component')
            .then(m => m.ModuleBasicsComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/feature-modules.component')
            .then(m => m.FeatureModulesComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/shared-modules.component')
            .then(m => m.SharedModulesComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/providers-di.component')
            .then(m => m.ProvidersDIComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/ngmodules-vs-standalone.component')
            .then(m => m.NgModulesVsStandaloneComponent)
    }
];
