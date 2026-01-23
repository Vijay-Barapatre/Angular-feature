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
                path: 'basic-state-animation',
                loadComponent: () => import('./components/basic-state-animation/basic-state-animation.component')
                    .then(m => m.BasicStateAnimationComponent),
                data: {
                    title: 'Basic State Animations',
                    animation: 'UseCase1'
                }
            },
            {
                path: 'enter-leave-animation',
                loadComponent: () => import('./components/enter-leave-animation/enter-leave-animation.component')
                    .then(m => m.EnterLeaveAnimationComponent),
                data: {
                    title: 'Enter/Leave Animations',
                    animation: 'UseCase2'
                }
            },
            {
                path: 'keyframes-animation',
                loadComponent: () => import('./components/keyframes-animation/keyframes-animation.component')
                    .then(m => m.KeyframesAnimationComponent),
                data: {
                    title: 'Keyframes Animations',
                    animation: 'UseCase3'
                }
            },
            {
                path: 'query-stagger-animation',
                loadComponent: () => import('./components/query-stagger-animation/query-stagger-animation.component')
                    .then(m => m.QueryStaggerAnimationComponent),
                data: {
                    title: 'Query & Stagger',
                    animation: 'UseCase4'
                }
            },
            {
                path: 'route-animation',
                loadComponent: () => import('./components/route-animation/route-animation.component')
                    .then(m => m.RouteAnimationComponent),
                data: {
                    title: 'Route Animations',
                    animation: 'UseCase5'
                }
            }
        ]
    }
];
