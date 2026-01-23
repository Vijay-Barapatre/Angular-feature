/**
 * LIFECYCLE HOOKS FEATURE ROUTES
 * 
 * This file defines all routes for the Lifecycle Hooks feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /lifecycle-hooks (base)
 *   ├── / (overview/landing)
 *   ├── /on-init-on-destroy (ngOnInit & ngOnDestroy)
 *   ├── /on-changes (ngOnChanges)
 *   ├── /after-view-init (ngAfterViewInit & ngAfterViewChecked)
 *   ├── /after-content-init (ngAfterContentInit & ngAfterContentChecked)
 *   ├── /do-check (ngDoCheck)
 *   ├── /complete-lifecycle (Complete Lifecycle Demo)
 *   └── /exercise (Learner practice template)
 * 
 * LIFECYCLE HOOKS ORDER:
 * 1. constructor
 * 2. ngOnChanges (if inputs exist)
 * 3. ngOnInit
 * 4. ngDoCheck
 * 5. ngAfterContentInit
 * 6. ngAfterContentChecked
 * 7. ngAfterViewInit
 * 8. ngAfterViewChecked
 * 9. ngOnDestroy
 */

import { Routes } from '@angular/router';

export const LIFECYCLE_HOOKS_ROUTES: Routes = [
    /**
     * DEFAULT ROUTE - Overview Page
     * Shows all use cases and navigation
     */
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },

    /**
     * ngOnInit & ngOnDestroy
     * Demonstrates:
     * - ngOnInit for initialization logic (fetching data, setting up subscriptions)
     * - ngOnDestroy for cleanup (unsubscribing, clearing timers)
     * - Real-world example: Timer component with proper cleanup
     */
    {
        path: 'on-init-on-destroy',
        loadComponent: () => import('./components/on-init-on-destroy/parent.component').then(m => m.UseCase1ParentComponent)
    },

    /**
     * ngOnChanges
     * Demonstrates:
     * - Reacting to @Input property changes
     * - Using SimpleChanges object
     * - Comparing previousValue and currentValue
     * - First change detection with isFirstChange()
     */
    {
        path: 'on-changes',
        loadComponent: () => import('./components/on-changes/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * ngAfterViewInit & ngAfterViewChecked
     * Demonstrates:
     * - ngAfterViewInit for accessing @ViewChild elements
     * - ngAfterViewChecked for post-view-update operations
     * - Real-world example: Chart initialization after view renders
     */
    {
        path: 'after-view-init',
        loadComponent: () => import('./components/after-view-init/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * ngAfterContentInit & ngAfterContentChecked
     * Demonstrates:
     * - ngAfterContentInit for accessing @ContentChild
     * - ngAfterContentChecked for content updates
     * - Real-world example: Dynamic tab container with projected content
     */
    {
        path: 'after-content-init',
        loadComponent: () => import('./components/after-content-init/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * ngDoCheck
     * Demonstrates:
     * - ngDoCheck for custom change detection
     * - Detecting changes Angular misses (object mutations)
     * - Performance considerations
     * - When to use vs. avoid
     */
    {
        path: 'do-check',
        loadComponent: () => import('./components/do-check/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * Complete Lifecycle Demo
     * Demonstrates:
     * - All hooks in execution order
     * - Visual lifecycle logger
     * - Interactive controls to trigger updates
     * - Performance metrics
     */
    {
        path: 'complete-lifecycle',
        loadComponent: () => import('./components/complete-lifecycle/parent.component').then(m => m.UseCase6ParentComponent)
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
