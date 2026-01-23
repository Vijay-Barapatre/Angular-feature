/**
 * ============================================================================
 * REACTIVE FORMS ROUTES CONFIGURATION
 * ============================================================================
 * 
 * This file defines the routing configuration for the Reactive Forms feature.
 * 
 * WHAT ARE REACTIVE FORMS?
 * - Reactive Forms are Angular's model-driven approach to handling form inputs.
 * - Unlike Template Driven Forms (where ngModel controls state), Reactive Forms
 *   give you full programmatic control over the form model in your TypeScript.
 * 
 * KEY DIFFERENCES FROM TEMPLATE FORMS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Template Forms           │  Reactive Forms                            │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  FormsModule              │  ReactiveFormsModule                       │
 * │  ngModel directive        │  formControlName directive                 │
 * │  Two-way binding [(x)]    │  One-way binding [formControl]             │
 * │  Implicit FormControl     │  Explicit FormControl instances            │
 * │  Template is source       │  Component class is source of truth        │
 * │  Less testable            │  Highly testable (no DOM needed)           │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ROUTE STRUCTURE:
 * /reactive-forms           -> Overview (landing page)
 * /reactive-forms/basic-reactive           -> Basic FormControl & FormGroup
 * /reactive-forms/nested-groups            -> Nested FormGroups
 * /reactive-forms/form-array               -> FormArray (Dynamic Fields)
 * /reactive-forms/built-in-validators      -> Built-in Validators
 * /reactive-forms/custom-validators       -> Custom Validators (Sync & Async)
 * /reactive-forms/cross-field              -> Cross-Field Validation
 * /reactive-forms/dynamic-form             -> Dynamic Form Generation
 * /reactive-forms/value-changes            -> Value Changes & Status Observables
 * /reactive-forms/typed-forms               -> Strongly Typed Forms
 * /reactive-forms/signals-interop          -> Reactive Forms + Signals (Interop)
 */

import { Routes } from '@angular/router';

export const REACTIVE_FORMS_ROUTES: Routes = [
    /**
     * OVERVIEW ROUTE
     * Landing page for the Reactive Forms feature.
     * Provides navigation to all use cases with brief descriptions.
     */
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.ReactiveFormsOverviewComponent)
    },

    /**
     * Basic FormControl & FormGroup
     */
    {
        path: 'basic-reactive',
        loadComponent: () => import('./components/basic-reactive/basic-reactive.component').then(m => m.BasicReactiveComponent)
    },

    /**
     * Nested FormGroups
     */
    {
        path: 'nested-groups',
        loadComponent: () => import('./components/nested-groups/nested-groups.component').then(m => m.NestedGroupsComponent)
    },

    /**
     * FormArray (Dynamic Fields)
     */
    {
        path: 'form-array',
        loadComponent: () => import('./components/form-array/form-array.component').then(m => m.FormArrayComponent)
    },

    /**
     * Built-in Validators
     */
    {
        path: 'built-in-validators',
        loadComponent: () => import('./components/built-in-validators/built-in-validators.component').then(m => m.BuiltInValidatorsComponent)
    },

    /**
     * Custom Validators (Sync & Async)
     */
    {
        path: 'custom-validators',
        loadComponent: () => import('./components/custom-validators/custom-validators.component').then(m => m.CustomValidatorsComponent)
    },

    /**
     * Cross-Field Validation
     */
    {
        path: 'cross-field',
        loadComponent: () => import('./components/cross-field/cross-field.component').then(m => m.CrossFieldComponent)
    },

    /**
     * Dynamic Form Generation
     */
    {
        path: 'dynamic-form',
        loadComponent: () => import('./components/dynamic-form/dynamic-form.component').then(m => m.DynamicFormComponent)
    },

    /**
     * Value Changes & Status Observables
     */
    {
        path: 'value-changes',
        loadComponent: () => import('./components/value-changes/value-changes.component').then(m => m.ValueChangesComponent)
    },

    /**
     * Strongly Typed Forms (Angular 14+)
     */
    {
        path: 'typed-forms',
        loadComponent: () => import('./components/typed-forms/typed-forms.component').then(m => m.TypedFormsComponent)
    },

    /**
     * Reactive Forms + Signals (Interop)
     */
    {
        path: 'signals-interop',
        loadComponent: () => import('./components/signals-interop/signals-interop.component').then(m => m.SignalsInteropComponent)
    }
];
