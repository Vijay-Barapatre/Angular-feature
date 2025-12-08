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
 * /reactive-forms/use-case-1 -> Basic FormControl & FormGroup
 * /reactive-forms/use-case-2 -> Nested FormGroups
 * /reactive-forms/use-case-3 -> FormArray (Dynamic Fields)
 * /reactive-forms/use-case-4 -> Built-in Validators
 * /reactive-forms/use-case-5 -> Custom Validators (Sync & Async)
 * /reactive-forms/use-case-6 -> Cross-Field Validation
 * /reactive-forms/use-case-7 -> Dynamic Form Generation
 * /reactive-forms/use-case-8 -> Value Changes & Status Observables
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
     * USE CASE 1: Basic FormControl & FormGroup
     * Foundation of Reactive Forms - creating and binding form controls.
     */
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/basic-reactive.component').then(m => m.BasicReactiveComponent)
    },

    /**
     * USE CASE 2: Nested FormGroups
     * Organizing complex forms with nested groups (e.g., address within user).
     */
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/nested-groups.component').then(m => m.NestedGroupsComponent)
    },

    /**
     * USE CASE 3: FormArray (Dynamic Fields)
     * Adding and removing form controls dynamically at runtime.
     */
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/form-array.component').then(m => m.FormArrayComponent)
    },

    /**
     * USE CASE 4: Built-in Validators
     * Using Angular's built-in validators (required, minLength, pattern, etc.).
     */
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/built-in-validators.component').then(m => m.BuiltInValidatorsComponent)
    },

    /**
     * USE CASE 5: Custom Validators (Sync & Async)
     * Creating your own validation logic, including async validators.
     */
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/custom-validators.component').then(m => m.CustomValidatorsComponent)
    },

    /**
     * USE CASE 6: Cross-Field Validation
     * Validating fields that depend on each other (password confirmation, date ranges).
     */
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/cross-field.component').then(m => m.CrossFieldComponent)
    },

    /**
     * USE CASE 7: Dynamic Form Generation
     * Generating forms from JSON configuration at runtime.
     */
    {
        path: 'use-case-7',
        loadComponent: () => import('./components/use-case-7/dynamic-form.component').then(m => m.DynamicFormComponent)
    },

    /**
     * USE CASE 8: Value Changes & Status Observables
     * Reacting to form value and status changes using RxJS.
     */
    {
        path: 'use-case-8',
        loadComponent: () => import('./components/use-case-8/value-changes.component').then(m => m.ValueChangesComponent)
    }
];
