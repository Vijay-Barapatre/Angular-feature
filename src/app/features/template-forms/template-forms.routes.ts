
import { Routes } from '@angular/router';

export const TEMPLATE_FORMS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.TemplateFormsOverviewComponent)
    },
    {
        path: 'basic-form',
        loadComponent: () => import('./components/basic-form/basic-form.component').then(m => m.BasicFormComponent)
    },
    {
        path: 'validation',
        loadComponent: () => import('./components/validation/validation.component').then(m => m.ValidationComponent)
    },
    {
        path: 'complex-form',
        loadComponent: () => import('./components/complex-form/complex-form.component').then(m => m.ComplexFormComponent)
    },
    {
        path: 'custom-validator',
        loadComponent: () => import('./components/custom-validator/custom-validator.component').then(m => m.CustomValidatorComponent)
    },
    {
        path: 'dynamic-form',
        loadComponent: () => import('./components/dynamic-form/dynamic-form.component').then(m => m.DynamicFormComponent)
    },
    {
        path: 'async-validator',
        loadComponent: () => import('./components/async-validator/async-validator.component').then(m => m.AsyncValidatorComponent)
    },
    {
        path: 'value-changes',
        loadComponent: () => import('./components/value-changes/value-changes.component').then(m => m.ValueChangesComponent)
    },
    {
        path: 'signals-integration',
        loadComponent: () => import('./components/signals-integration/signals-integration.component').then(m => m.SignalsIntegrationComponent)
    }
];
