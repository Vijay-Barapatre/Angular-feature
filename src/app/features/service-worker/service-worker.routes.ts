import { Routes } from '@angular/router';
import { ServiceWorkerOverviewComponent } from './service-worker-overview.component';

export const SERVICE_WORKER_ROUTES: Routes = [
    {
        path: '',
        component: ServiceWorkerOverviewComponent
    },
    {
        path: 'update-notification',
        loadComponent: () => import('./components/update-notification/update-notification.component').then(m => m.UpdateNotificationComponent)
    },
    {
        path: 'caching-strategies',
        loadComponent: () => import('./components/caching-strategies/caching-strategies.component').then(m => m.CachingStrategiesComponent)
    },
    {
        path: 'offline-indicator',
        loadComponent: () => import('./components/offline-indicator/offline-indicator.component').then(m => m.OfflineIndicatorComponent)
    },
    {
        path: 'push-notifications',
        loadComponent: () => import('./components/push-notifications/push-notifications.component').then(m => m.PushNotificationsComponent)
    },
    {
        path: 'bypass-service-worker',
        loadComponent: () => import('./components/bypass-service-worker/bypass-service-worker.component').then(m => m.BypassServiceWorkerComponent)
    }
];
