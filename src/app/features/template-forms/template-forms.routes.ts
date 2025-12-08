
import { Routes } from '@angular/router';

export const TEMPLATE_FORMS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.TemplateFormsOverviewComponent)
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/basic-form.component').then(m => m.BasicFormComponent)
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/validation.component').then(m => m.ValidationComponent)
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/complex-form.component').then(m => m.ComplexFormComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/custom-validator.component').then(m => m.CustomValidatorComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/dynamic-form.component').then(m => m.DynamicFormComponent)
    }
];
