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
        path: 'basic-projection',
        loadComponent: () => import('./components/basic-projection/basic-projection.component')
            .then(m => m.BasicProjectionComponent)
    },
    {
        path: 'multi-slot',
        loadComponent: () => import('./components/multi-slot/multi-slot.component')
            .then(m => m.MultiSlotComponent)
    },
    {
        path: 'template-outlet',
        loadComponent: () => import('./components/template-outlet/template-outlet.component')
            .then(m => m.TemplateOutletComponent)
    },
    {
        path: 'conditional-projection',
        loadComponent: () => import('./components/conditional-projection/conditional-projection.component')
            .then(m => m.ConditionalProjectionComponent)
    },
    {
        path: 'real-world-patterns',
        loadComponent: () => import('./components/real-world-patterns/real-world-patterns.component')
            .then(m => m.RealWorldPatternsComponent)
    }
];
