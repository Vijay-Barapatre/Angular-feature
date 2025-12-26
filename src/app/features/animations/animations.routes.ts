/**
 * ANIMATIONS FEATURE - Routes Configuration
 */
import { Routes } from '@angular/router';

export const ANIMATIONS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.AnimationsOverviewComponent),
        children: [
            {
                path: 'use-case-1',
                loadComponent: () => import('./components/use-case-1/basic-state-animation.component')
                    .then(m => m.BasicStateAnimationComponent),
                data: {
                    title: 'Basic State Animations',
                    animation: 'UseCase1'
                }
            },
            {
                path: 'use-case-2',
                loadComponent: () => import('./components/use-case-2/enter-leave-animation.component')
                    .then(m => m.EnterLeaveAnimationComponent),
                data: {
                    title: 'Enter/Leave Animations',
                    animation: 'UseCase2'
                }
            },
            {
                path: 'use-case-3',
                loadComponent: () => import('./components/use-case-3/keyframes-animation.component')
                    .then(m => m.KeyframesAnimationComponent),
                data: {
                    title: 'Keyframes Animations',
                    animation: 'UseCase3'
                }
            },
            {
                path: 'use-case-4',
                loadComponent: () => import('./components/use-case-4/query-stagger-animation.component')
                    .then(m => m.QueryStaggerAnimationComponent),
                data: {
                    title: 'Query & Stagger',
                    animation: 'UseCase4'
                }
            },
            {
                path: 'use-case-5',
                loadComponent: () => import('./components/use-case-5/route-animation.component')
                    .then(m => m.RouteAnimationComponent),
                data: {
                    title: 'Route Animations',
                    animation: 'UseCase5'
                }
            }
        ]
    }
];
