/**
 * CONTROL FLOW FEATURE - Routes Configuration
 */
import { Routes } from '@angular/router';

export const CONTROL_FLOW_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.ControlFlowOverviewComponent),
        children: [
            {
                path: 'use-case-1',
                loadComponent: () => import('./components/use-case-1/if-control-flow.component')
                    .then(m => m.IfControlFlowComponent),
                data: { title: '@if Conditional Rendering' }
            },
            {
                path: 'use-case-2',
                loadComponent: () => import('./components/use-case-2/for-control-flow.component')
                    .then(m => m.ForControlFlowComponent),
                data: { title: '@for Loop Rendering' }
            },
            {
                path: 'use-case-3',
                loadComponent: () => import('./components/use-case-3/switch-control-flow.component')
                    .then(m => m.SwitchControlFlowComponent),
                data: { title: '@switch Multi-Condition' }
            }
        ]
    }
];
