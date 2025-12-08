import { Routes } from '@angular/router';
import { ServiceWorkerOverviewComponent } from './service-worker-overview.component';

export const SERVICE_WORKER_ROUTES: Routes = [
    {
        path: '',
        component: ServiceWorkerOverviewComponent
    },
    {
        path: 'update-notification',
        loadComponent: () => import('./components/use-case-1/update-notification.component').then(m => m.UpdateNotificationComponent)
    },
    {
        path: 'caching-strategies',
        loadComponent: () => import('./components/use-case-2/caching-strategies.component').then(m => m.CachingStrategiesComponent)
    },
    {
        path: 'offline-indicator',
        loadComponent: () => import('./components/use-case-3/offline-indicator.component').then(m => m.OfflineIndicatorComponent)
    },
    {
        path: 'push-notifications',
        loadComponent: () => import('./components/use-case-4/push-notifications.component').then(m => m.PushNotificationsComponent)
    },
    {
        path: 'bypass-service-worker',
        loadComponent: () => import('./components/use-case-5/bypass-service-worker.component').then(m => m.BypassServiceWorkerComponent)
    }
];
