import { Routes } from '@angular/router';
import { WebWorkersOverviewComponent } from './web-workers-overview.component';

export const WEB_WORKERS_ROUTES: Routes = [
    {
        path: '',
        component: WebWorkersOverviewComponent
    },
    {
        path: 'image-processing',
        loadComponent: () => import('./components/use-case-1/image-processing.component').then(m => m.ImageProcessingComponent)
    },
    {
        path: 'data-processing',
        loadComponent: () => import('./components/use-case-2/data-processing.component').then(m => m.DataProcessingComponent)
    },
    {
        path: 'prime-calculation',
        loadComponent: () => import('./components/use-case-3/prime-calculation.component').then(m => m.PrimeCalculationComponent)
    },
    {
        path: 'file-encryption',
        loadComponent: () => import('./components/use-case-4/file-encryption.component').then(m => m.FileEncryptionComponent)
    },
    {
        path: 'worker-pool',
        loadComponent: () => import('./components/use-case-5/worker-pool.component').then(m => m.WorkerPoolComponent)
    }
];
