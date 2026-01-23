import { Routes } from '@angular/router';

export const E2E_TESTING_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.E2EOverviewComponent),
        title: 'E2E Testing Overview'
    },
    {
        path: 'playwright-setup',
        loadComponent: () => import('./components/playwright-setup/playwright-setup.component').then(m => m.PlaywrightSetupComponent),
        title: 'Playwright Setup & Configuration'
    },
    {
        path: 'basic-e2e',
        loadComponent: () => import('./components/basic-e2e/basic-e2e.component').then(m => m.BasicE2EComponent),
        title: 'Basic E2E Tests'
    },
    {
        path: 'page-object-model',
        loadComponent: () => import('./components/page-object-model/page-object-model.component').then(m => m.PageObjectModelComponent),
        title: 'Page Object Model'
    },
    {
        path: 'api-mocking',
        loadComponent: () => import('./components/api-mocking/api-mocking.component').then(m => m.ApiMockingComponent),
        title: 'API Mocking & Network'
    },
    {
        path: 'component-testing',
        loadComponent: () => import('./components/component-testing/component-testing.component').then(m => m.ComponentTestingComponent),
        title: 'Component Testing'
    },
    {
        path: 'visual-regression',
        loadComponent: () => import('./components/visual-regression/visual-regression.component').then(m => m.VisualRegressionComponent),
        title: 'Visual Regression Testing'
    },
    {
        path: 'cicd-integration',
        loadComponent: () => import('./components/cicd-integration/cicd-integration.component').then(m => m.CicdIntegrationComponent),
        title: 'CI/CD Integration'
    }
];
