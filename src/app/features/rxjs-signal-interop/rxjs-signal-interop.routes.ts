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
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/to-signal.component')
            .then(m => m.ToSignalComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/to-observable.component')
            .then(m => m.ToObservableComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/effect-signals.component')
            .then(m => m.EffectSignalsComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/computed-async.component')
            .then(m => m.ComputedAsyncComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/real-world-patterns.component')
            .then(m => m.RealWorldPatternsComponent)
    }
];
