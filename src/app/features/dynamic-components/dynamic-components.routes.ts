import { Routes } from '@angular/router';
import { DynamicComponentsOverviewComponent } from './dynamic-components-overview.component';

export const DYNAMIC_COMPONENTS_ROUTES: Routes = [
    {
        path: '',
        component: DynamicComponentsOverviewComponent
    },
    {
        path: 'basic-creation',
        loadComponent: () => import('./components/use-case-1/basic-creation.component').then(m => m.BasicCreationComponent)
    },
    {
        path: 'inputs-outputs',
        loadComponent: () => import('./components/use-case-2/inputs-outputs.component').then(m => m.InputsOutputsComponent)
    },
    {
        path: 'lazy-loading',
        loadComponent: () => import('./components/use-case-3/lazy-loading.component').then(m => m.LazyLoadingComponent)
    },
    {
        path: 'ng-component-outlet',
        loadComponent: () => import('./components/use-case-4/ng-component-outlet.component').then(m => m.NgComponentOutletComponent)
    },
    {
        path: 'modal-service',
        loadComponent: () => import('./components/use-case-5/modal-demo.component').then(m => m.ModalDemoComponent)
    }
];
