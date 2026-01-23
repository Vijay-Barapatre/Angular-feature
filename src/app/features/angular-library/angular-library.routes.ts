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
        path: 'library-basics',
        loadComponent: () => import('./components/library-basics/library-basics.component')
            .then(m => m.LibraryBasicsComponent)
    },
    {
        path: 'components-services',
        loadComponent: () => import('./components/components-services/components-services.component')
            .then(m => m.ComponentsServicesComponent)
    },
    {
        path: 'building-publishing',
        loadComponent: () => import('./components/building-publishing/building-publishing.component')
            .then(m => m.BuildingPublishingComponent)
    },
    {
        path: 'consuming-libraries',
        loadComponent: () => import('./components/consuming-libraries/consuming-libraries.component')
            .then(m => m.ConsumingLibrariesComponent)
    },
    {
        path: 'testing-libraries',
        loadComponent: () => import('./components/testing-libraries/testing-libraries.component')
            .then(m => m.TestingLibrariesComponent)
    },
    {
        path: 'versioning-updates',
        loadComponent: () => import('./components/versioning-updates/versioning-updates.component')
            .then(m => m.VersioningUpdatesComponent)
    }
];
