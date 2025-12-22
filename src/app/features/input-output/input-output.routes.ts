/**
 * INPUT/OUTPUT FEATURE ROUTES
 * 
 * This file defines all routes for the Input/Output feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /input-output (base)
 *   ├── / (overview/landing)
 *   ├── /use-case-1 (Basic parent-child data passing)
 *   ├── /use-case-2 (Two-way binding)
 *   ├── /use-case-3 (Complex objects & immutability)
 *   ├── /use-case-4 (Custom events with payloads)
 *   ├── /use-case-5 (Input transforms & validation)
 *   ├── /use-case-6 (Multiple inputs/outputs)
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
     * USE CASE 1: Basic @Input() and @Output()
     * Demonstrates:
     * - Simple data passing from parent to child via @Input()
     * - Event emission from child to parent via @Output()
     * - Primitive data types (string, number, boolean)
     */
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/parent.component').then(m => m.UseCase1ParentComponent)
    },

    /**
     * USE CASE 2: Two-Way Binding Pattern
     * Demonstrates:
     * - Implementing two-way binding with @Input() and @Output()
     * - Using the [()] banana-in-a-box syntax
     * - Change suffix naming convention
     */
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * USE CASE 3: Complex Objects & Immutability
     * Demonstrates:
     * - Passing complex objects (arrays, nested objects)
     * - Change detection with OnPush strategy
     * - Immutability patterns for performance
     * - Object reference vs value changes
     */
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * USE CASE 4: Custom Event Payloads
     * Demonstrates:
     * - EventEmitter with custom data types
     * - Multiple event types from single component
     * - Type-safe event handling
     * - Real-world shopping cart scenario
     */
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * USE CASE 5: Input Transforms & Validation
     * Demonstrates:
     * - Angular's transform option for @Input()
     * - Input setters for validation
     * - Type coercion and sanitization
     * - Input getters for computed values
     */
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * USE CASE 6: Multiple Inputs/Outputs
     * Demonstrates:
     * - Components with multiple @Input() decorators
     * - Components with multiple @Output() decorators
     * - Real-world user profile editor scenario
     * - Complex component communication patterns
     */
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/parent.component').then(m => m.UseCase6ParentComponent)
    },

    /**
     * USE CASE 7: Input Setters (Validation & Side Effects)
     * Demonstrates:
     * - Using TypeScript setters for @Input interception
     * - Validation and Sanitization logic within the child
     * - Derived state updates
     */
    {
        path: 'use-case-7',
        loadComponent: () => import('./components/use-case-7/parent.component').then(m => m.UseCase7ParentComponent)
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
