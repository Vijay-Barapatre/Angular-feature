import { Routes } from '@angular/router';
import { WebWorkersOverviewComponent } from './web-workers-overview.component';

export const WEB_WORKERS_ROUTES: Routes = [
    {
        path: '',
        component: WebWorkersOverviewComponent
    },
    {
        path: 'image-processing',
        loadComponent: () => import('./components/image-processing/image-processing.component').then(m => m.ImageProcessingComponent)
    },
    {
        path: 'data-processing',
        loadComponent: () => import('./components/data-processing/data-processing.component').then(m => m.DataProcessingComponent)
    },
    {
        path: 'prime-calculation',
        loadComponent: () => import('./components/prime-calculation/prime-calculation.component').then(m => m.PrimeCalculationComponent)
    },
    {
        path: 'file-encryption',
        loadComponent: () => import('./components/file-encryption/file-encryption.component').then(m => m.FileEncryptionComponent)
    },
    {
        path: 'worker-pool',
        loadComponent: () => import('./components/worker-pool/worker-pool.component').then(m => m.WorkerPoolComponent)
    }
];
