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
                path: 'if-control-flow',
                loadComponent: () => import('./components/if-control-flow/if-control-flow.component')
                    .then(m => m.IfControlFlowComponent),
                data: { title: '@if Conditional Rendering' }
            },
            {
                path: 'for-control-flow',
                loadComponent: () => import('./components/for-control-flow/for-control-flow.component')
                    .then(m => m.ForControlFlowComponent),
                data: { title: '@for Loop Rendering' }
            },
            {
                path: 'switch-control-flow',
                loadComponent: () => import('./components/switch-control-flow/switch-control-flow.component')
                    .then(m => m.SwitchControlFlowComponent),
                data: { title: '@switch Multi-Condition' }
            }
        ]
    }
];
