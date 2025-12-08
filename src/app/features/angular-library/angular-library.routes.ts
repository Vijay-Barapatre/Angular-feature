/**
 * ============================================================================
 * ANGULAR LIBRARY FEATURE ROUTES
 * ============================================================================
 * Demonstrates creating, building, publishing, and consuming Angular libraries
 */

import { Routes } from '@angular/router';

export const ANGULAR_LIBRARY_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.AngularLibraryOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/library-basics.component')
            .then(m => m.LibraryBasicsComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/components-services.component')
            .then(m => m.ComponentsServicesComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/building-publishing.component')
            .then(m => m.BuildingPublishingComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/consuming-libraries.component')
            .then(m => m.ConsumingLibrariesComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/testing-libraries.component')
            .then(m => m.TestingLibrariesComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/versioning-updates.component')
            .then(m => m.VersioningUpdatesComponent)
    }
];
