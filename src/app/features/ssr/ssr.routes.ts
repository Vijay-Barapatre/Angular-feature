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
        path: 'ssr-fundamentals',
        loadComponent: () => import('./components/ssr-fundamentals/ssr-fundamentals.component')
            .then(m => m.SsrFundamentalsComponent)
    },
    {
        path: 'hydration',
        loadComponent: () => import('./components/hydration/hydration.component')
            .then(m => m.HydrationComponent)
    },
    {
        path: 'transfer-state',
        loadComponent: () => import('./components/transfer-state/transfer-state.component')
            .then(m => m.TransferStateComponent)
    },
    {
        path: 'platform-detection',
        loadComponent: () => import('./components/platform-detection/platform-detection.component')
            .then(m => m.PlatformDetectionComponent)
    },
    {
        path: 'seo-optimization',
        loadComponent: () => import('./components/seo-optimization/seo-optimization.component')
            .then(m => m.SeoOptimizationComponent)
    },
    {
        path: 'prerendering',
        loadComponent: () => import('./components/prerendering/prerendering.component')
            .then(m => m.PrerenderingComponent)
    }
];
