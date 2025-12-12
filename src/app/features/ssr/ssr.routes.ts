/**
 * ============================================================================
 * SERVER-SIDE RENDERING (SSR) FEATURE ROUTES
 * ============================================================================
 * 
 * This file defines all routes for the SSR/Angular Universal feature module.
 * 
 * SSR OVERVIEW:
 * Server-Side Rendering (SSR) is a technique where Angular renders pages on
 * the server instead of in the browser. This provides:
 * - Better SEO (search engines can index content)
 * - Faster First Contentful Paint (FCP)
 * - Improved performance on slow devices
 * - Better social media sharing (meta tags are pre-rendered)
 * 
 * ANGULAR UNIVERSAL:
 * Angular Universal is the official SSR solution for Angular applications.
 * It uses Node.js to render Angular apps on the server.
 */

import { Routes } from '@angular/router';

export const SSR_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/ssr-overview.component')
            .then(m => m.SsrOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/ssr-fundamentals.component')
            .then(m => m.SsrFundamentalsComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/hydration.component')
            .then(m => m.HydrationComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/transfer-state.component')
            .then(m => m.TransferStateComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/platform-detection.component')
            .then(m => m.PlatformDetectionComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/seo-optimization.component')
            .then(m => m.SeoOptimizationComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/prerendering.component')
            .then(m => m.PrerenderingComponent)
    }
];
