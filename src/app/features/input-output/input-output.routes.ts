/**
 * INPUT/OUTPUT FEATURE ROUTES
 * 
 * This file defines all routes for the Input/Output feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /input-output (base)
 *   ├── / (overview/landing)
 *   ├── /basic-input-output (Basic parent-child data passing)
 *   ├── /two-way-binding (Two-way binding)
 *   ├── /complex-objects (Complex objects & immutability)
 *   ├── /custom-events (Custom events with payloads)
 *   ├── /input-transforms (Input transforms & validation)
 *   ├── /multiple-inputs-outputs (Multiple inputs/outputs)
 *   ├── /input-setters (Input setters)
 *   └── /exercise (Learner practice template)
 */

import { Routes } from '@angular/router';

export const INPUT_OUTPUT_ROUTES: Routes = [
    /**
     * DEFAULT ROUTE - Overview Page
     * Shows all use cases and navigation
     */
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },

    /**
     * Basic @Input() and @Output()
     * Demonstrates:
     * - Simple data passing from parent to child via @Input()
     * - Event emission from child to parent via @Output()
     * - Primitive data types (string, number, boolean)
     */
    {
        path: 'basic-input-output',
        loadComponent: () => import('./components/basic-input-output/parent.component').then(m => m.UseCase1ParentComponent)
    },

    /**
     * Two-Way Binding Pattern
     * Demonstrates:
     * - Implementing two-way binding with @Input() and @Output()
     * - Using the [()] banana-in-a-box syntax
     * - Change suffix naming convention
     */
    {
        path: 'two-way-binding',
        loadComponent: () => import('./components/two-way-binding/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * Complex Objects & Immutability
     * Demonstrates:
     * - Passing complex objects (arrays, nested objects)
     * - Change detection with OnPush strategy
     * - Immutability patterns for performance
     * - Object reference vs value changes
     */
    {
        path: 'complex-objects',
        loadComponent: () => import('./components/complex-objects/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * Custom Event Payloads
     * Demonstrates:
     * - EventEmitter with custom data types
     * - Multiple event types from single component
     * - Type-safe event handling
     * - Real-world shopping cart scenario
     */
    {
        path: 'custom-events',
        loadComponent: () => import('./components/custom-events/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * Input Transforms & Validation
     * Demonstrates:
     * - Angular's transform option for @Input()
     * - Input setters for validation
     * - Type coercion and sanitization
     * - Input getters for computed values
     */
    {
        path: 'input-transforms',
        loadComponent: () => import('./components/input-transforms/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * Multiple Inputs/Outputs
     * Demonstrates:
     * - Components with multiple @Input() decorators
     * - Components with multiple @Output() decorators
     * - Real-world user profile editor scenario
     * - Complex component communication patterns
     */
    {
        path: 'multiple-inputs-outputs',
        loadComponent: () => import('./components/multiple-inputs-outputs/parent.component').then(m => m.UseCase6ParentComponent)
    },

    /**
     * Input Setters (Validation & Side Effects)
     * Demonstrates:
     * - Using TypeScript setters for @Input interception
     * - Validation and Sanitization logic within the child
     * - Derived state updates
     */
    {
        path: 'input-setters',
        loadComponent: () => import('./components/input-setters/parent.component').then(m => m.UseCase7ParentComponent)
    },

    /**
     * LEARNER EXERCISE
     * Interactive template for hands-on practice
     * Contains TODO comments and hints
     */
    {
        path: 'exercise',
        loadComponent: () => import('./components/learner-exercise/exercise.component').then(m => m.LearnerExerciseComponent)
    }
];
