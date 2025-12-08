/**
 * ============================================================================
 * CONTENT PROJECTION ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const CONTENT_PROJECTION_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.ContentProjectionOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/basic-projection.component')
            .then(m => m.BasicProjectionComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/multi-slot.component')
            .then(m => m.MultiSlotComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/template-outlet.component')
            .then(m => m.TemplateOutletComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/conditional-projection.component')
            .then(m => m.ConditionalProjectionComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/real-world-patterns.component')
            .then(m => m.RealWorldPatternsComponent)
    }
];
