/**
 * VIEWCHILD AND CONTENTCHILD FEATURE ROUTES
 * 
 * This file defines all routes for the ViewChild/ContentChild feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /viewchild-contentchild (base)
 *   ├── / (overview/landing)
 *   ├── /use-case-1 (Basic @ViewChild)
 *   ├── /use-case-2 (@ViewChild with template references)
 *   ├── /use-case-3 (@ViewChildren)
 *   ├── /use-case-4 (Basic @ContentChild)
 *   ├── /use-case-5 (@ContentChildren)
 *   ├── /use-case-6 (Lifecycle timing)
 *   └── /exercise (Learner practice template)
 */

import { Routes } from '@angular/router';

export const VIEWCHILD_CONTENTCHILD_ROUTES: Routes = [
    /**
     * DEFAULT ROUTE - Overview Page
     * Shows all use cases and navigation
     */
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },

    /**
     * USE CASE 1: Basic @ViewChild
     * Demonstrates:
     * - Accessing child component instances
     * - Calling child methods from parent
     * - Reading child properties
     * - AfterViewInit lifecycle hook
     */
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/parent.component').then(m => m.UseCase1ParentComponent)
    },

    /**
     * USE CASE 2: @ViewChild with Template References
     * Demonstrates:
     * - Accessing DOM elements via template references
     * - Using ElementRef for DOM manipulation
     * - Focus management, scrolling, measuring
     * - Type-safe element access
     */
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * USE CASE 3: @ViewChildren
     * Demonstrates:
     * - Accessing multiple child components
     * - Working with QueryList API
     * - Subscribing to children changes
     * - Dynamic child management
     */
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * USE CASE 4: Basic @ContentChild
     * Demonstrates:
     * - Content projection with ng-content
     * - Accessing projected components
     * - AfterContentInit lifecycle hook
     * - View vs Content children difference
     */
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * USE CASE 5: @ContentChildren
     * Demonstrates:
     * - Accessing multiple projected children
     * - Multiple ng-content with select attribute
     * - Managing projected component state
     * - Advanced content projection patterns
     */
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * USE CASE 6: Lifecycle Timing
     * Demonstrates:
     * - When @ViewChild and @ContentChild are available
     * - Lifecycle hook execution order
     * - Common timing mistakes and solutions
     * - Best practices for component queries
     */
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/parent.component').then(m => m.UseCase6ParentComponent)
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
