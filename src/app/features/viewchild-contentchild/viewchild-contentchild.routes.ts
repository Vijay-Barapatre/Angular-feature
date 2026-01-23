/**
 * VIEWCHILD AND CONTENTCHILD FEATURE ROUTES
 * 
 * This file defines all routes for the ViewChild/ContentChild feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /viewchild-contentchild (base)
 *   ├── / (overview/landing)
 *   ├── /basic-viewchild (Basic @ViewChild)
 *   ├── /template-references (@ViewChild with template references)
 *   ├── /viewchildren (@ViewChildren)
 *   ├── /basic-contentchild (Basic @ContentChild)
 *   ├── /contentchildren (@ContentChildren)
 *   ├── /lifecycle-timing (Lifecycle timing)
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
     * Basic @ViewChild
     * Demonstrates:
     * - Accessing child component instances
     * - Calling child methods from parent
     * - Reading child properties
     * - AfterViewInit lifecycle hook
     */
    {
        path: 'basic-viewchild',
        loadComponent: () => import('./components/basic-viewchild/parent.component').then(m => m.UseCase1ParentComponent)
    },

    /**
     * @ViewChild with Template References
     * Demonstrates:
     * - Accessing DOM elements via template references
     * - Using ElementRef for DOM manipulation
     * - Focus management, scrolling, measuring
     * - Type-safe element access
     */
    {
        path: 'template-references',
        loadComponent: () => import('./components/template-references/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * @ViewChildren
     * Demonstrates:
     * - Accessing multiple child components
     * - Working with QueryList API
     * - Subscribing to children changes
     * - Dynamic child management
     */
    {
        path: 'viewchildren',
        loadComponent: () => import('./components/viewchildren/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * Basic @ContentChild
     * Demonstrates:
     * - Content projection with ng-content
     * - Accessing projected components
     * - AfterContentInit lifecycle hook
     * - View vs Content children difference
     */
    {
        path: 'basic-contentchild',
        loadComponent: () => import('./components/basic-contentchild/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * @ContentChildren
     * Demonstrates:
     * - Accessing multiple projected children
     * - Multiple ng-content with select attribute
     * - Managing projected component state
     * - Advanced content projection patterns
     */
    {
        path: 'contentchildren',
        loadComponent: () => import('./components/contentchildren/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * Lifecycle Timing
     * Demonstrates:
     * - When @ViewChild and @ContentChild are available
     * - Lifecycle hook execution order
     * - Common timing mistakes and solutions
     * - Best practices for component queries
     */
    {
        path: 'lifecycle-timing',
        loadComponent: () => import('./components/lifecycle-timing/parent.component').then(m => m.UseCase6ParentComponent)
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
