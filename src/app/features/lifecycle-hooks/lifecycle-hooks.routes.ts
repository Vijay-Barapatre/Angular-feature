/**
 * LIFECYCLE HOOKS FEATURE ROUTES
 * 
 * This file defines all routes for the Lifecycle Hooks feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /lifecycle-hooks (base)
 *   ├── / (overview/landing)
 *   ├── /use-case-1 (ngOnInit & ngOnDestroy)
 *   ├── /use-case-2 (ngOnChanges)
 *   ├── /use-case-3 (ngAfterViewInit & ngAfterViewChecked)
 *   ├── /use-case-4 (ngAfterContentInit & ngAfterContentChecked)
 *   ├── /use-case-5 (ngDoCheck)
 *   ├── /use-case-6 (Complete Lifecycle Demo)
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
     * USE CASE 1: ngOnInit & ngOnDestroy
     * Demonstrates:
     * - ngOnInit for initialization logic (fetching data, setting up subscriptions)
     * - ngOnDestroy for cleanup (unsubscribing, clearing timers)
     * - Real-world example: Timer component with proper cleanup
     */
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/parent.component').then(m => m.UseCase1ParentComponent)
    },

    /**
     * USE CASE 2: ngOnChanges
     * Demonstrates:
     * - Reacting to @Input property changes
     * - Using SimpleChanges object
     * - Comparing previousValue and currentValue
     * - First change detection with isFirstChange()
     */
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * USE CASE 3: ngAfterViewInit & ngAfterViewChecked
     * Demonstrates:
     * - ngAfterViewInit for accessing @ViewChild elements
     * - ngAfterViewChecked for post-view-update operations
     * - Real-world example: Chart initialization after view renders
     */
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * USE CASE 4: ngAfterContentInit & ngAfterContentChecked
     * Demonstrates:
     * - ngAfterContentInit for accessing @ContentChild
     * - ngAfterContentChecked for content updates
     * - Real-world example: Dynamic tab container with projected content
     */
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * USE CASE 5: ngDoCheck
     * Demonstrates:
     * - ngDoCheck for custom change detection
     * - Detecting changes Angular misses (object mutations)
     * - Performance considerations
     * - When to use vs. avoid
     */
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * USE CASE 6: Complete Lifecycle Demo
     * Demonstrates:
     * - All hooks in execution order
     * - Visual lifecycle logger
     * - Interactive controls to trigger updates
     * - Performance metrics
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
