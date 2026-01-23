import { Routes } from '@angular/router';
import { DynamicComponentsOverviewComponent } from './dynamic-components-overview.component';

export const DYNAMIC_COMPONENTS_ROUTES: Routes = [
    {
        path: '',
        component: DynamicComponentsOverviewComponent
    },
    {
        path: 'basic-creation',
        loadComponent: () => import('./components/basic-creation/basic-creation.component').then(m => m.BasicCreationComponent)
    },
    {
        path: 'inputs-outputs',
        loadComponent: () => import('./components/inputs-outputs/inputs-outputs.component').then(m => m.InputsOutputsComponent)
    },
    {
        path: 'lazy-loading',
        loadComponent: () => import('./components/lazy-loading/lazy-loading.component').then(m => m.LazyLoadingComponent)
    },
    {
        path: 'ng-component-outlet',
        loadComponent: () => import('./components/ng-component-outlet/ng-component-outlet.component').then(m => m.NgComponentOutletComponent)
    },
    {
        path: 'modal-service',
        loadComponent: () => import('./components/modal-demo/modal-demo.component').then(m => m.ModalDemoComponent)
    }
];
