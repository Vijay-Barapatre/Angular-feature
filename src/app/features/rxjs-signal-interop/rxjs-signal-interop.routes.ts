/**
 * ============================================================================
 * RXJS-SIGNAL INTEROP FEATURE ROUTES
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const RXJS_SIGNAL_INTEROP_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.RxjsSignalOverviewComponent)
    },
    {
        path: 'to-signal',
        loadComponent: () => import('./components/to-signal/to-signal.component')
            .then(m => m.ToSignalComponent)
    },
    {
        path: 'to-observable',
        loadComponent: () => import('./components/to-observable/to-observable.component')
            .then(m => m.ToObservableComponent)
    },
    {
        path: 'effect-signals',
        loadComponent: () => import('./components/effect-signals/effect-signals.component')
            .then(m => m.EffectSignalsComponent)
    },
    {
        path: 'computed-async',
        loadComponent: () => import('./components/computed-async/computed-async.component')
            .then(m => m.ComputedAsyncComponent)
    },
    {
        path: 'real-world-patterns',
        loadComponent: () => import('./components/real-world-patterns/real-world-patterns.component')
            .then(m => m.RealWorldPatternsComponent)
    }
];
