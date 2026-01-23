/**
 * ============================================================================
 * ANGULAR DIRECTIVES FEATURE - ROUTES
 * ============================================================================
 * 
 * 📚 WHAT ARE DIRECTIVES?
 * Directives are classes that add behavior to elements in Angular applications.
 * 
 * THREE TYPES OF DIRECTIVES:
 * 1. COMPONENTS - Directives with a template (@Component)
 * 2. ATTRIBUTE DIRECTIVES - Change appearance/behavior (ngClass, ngStyle)
 * 3. STRUCTURAL DIRECTIVES - Change DOM structure (*ngIf, *ngFor)
 * 
 * ============================================================================
 */

import { Routes } from '@angular/router';

export const DIRECTIVES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.DirectivesOverviewComponent),
        title: 'Angular Directives'
    },
    {
        path: 'basic-attribute',
        loadComponent: () => import('./components/basic-attribute/basic-attribute.component')
            .then(m => m.BasicAttributeComponent),
        title: 'Basic Attribute Directives'
    },
    {
        path: 'directive-inputs',
        loadComponent: () => import('./components/directive-inputs/directive-inputs.component')
            .then(m => m.DirectiveInputsComponent),
        title: 'Directive with @Input'
    },
    {
        path: 'host-listener',
        loadComponent: () => import('./components/host-listener/host-listener.component')
            .then(m => m.HostListenerDirectiveComponent),
        title: '@HostListener in Directives'
    },
    {
        path: 'host-binding',
        loadComponent: () => import('./components/host-binding/host-binding.component')
            .then(m => m.HostBindingDirectiveComponent),
        title: '@HostBinding in Directives'
    },
    {
        path: 'structural-basics',
        loadComponent: () => import('./components/structural-basics/structural-basics.component')
            .then(m => m.StructuralBasicsComponent),
        title: 'Structural Directive Basics'
    },
    {
        path: 'custom-structural',
        loadComponent: () => import('./components/custom-structural/custom-structural.component')
            .then(m => m.CustomStructuralComponent),
        title: 'Custom Structural Directives'
    },
    {
        path: 'directive-composition',
        loadComponent: () => import('./components/directive-composition/directive-composition.component')
            .then(m => m.DirectiveCompositionComponent),
        title: 'Directive Composition'
    },
    {
        path: 'real-world',
        loadComponent: () => import('./components/real-world/real-world.component')
            .then(m => m.RealWorldDirectivesComponent),
        title: 'Real-world Directives'
    }
];
