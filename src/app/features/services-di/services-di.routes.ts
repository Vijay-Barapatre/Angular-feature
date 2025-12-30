/**
 * SERVICES & DEPENDENCY INJECTION FEATURE ROUTES
 * 
 * This file defines all routes for the Services & DI feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /services-di (base)
 *   ├── / (overview/landing)
 *   ├── /use-case-1 (Basic Service & Injection)
 *   ├── /use-case-2 (Singleton vs Component-Scoped)
 *   ├── /use-case-3 (providedIn Hierarchy)
 *   ├── /use-case-4 (Injection Tokens)
 *   ├── /use-case-5 (Factory Providers)
 *   ├── /use-case-6 (Resolution Modifiers)
 *   └── /exercise (Learner practice template)
 */

import { Routes } from '@angular/router';

export const SERVICES_DI_ROUTES: Routes = [
    /**
     * DEFAULT ROUTE - Overview Page
     * Shows all use cases and navigation
     */
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
    },

    /**
     * USE CASE 1: Basic Service & Injection
     * Demonstrates:
     * - Creating an @Injectable service
     * - Injecting service via constructor
     * - Sharing data between components via service
     * - Service methods and state management
     */
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/sender.component').then(m => m.SenderComponent)
    },

    /**
     * USE CASE 2: Singleton vs Component-Scoped Services
     * Demonstrates:
     * - providedIn: 'root' creates singleton
     * - Component-level providers create new instances
     * - Understanding service scope and lifetime
     */
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * USE CASE 3: providedIn Hierarchy
     * Demonstrates:
     * - providedIn: 'root' (application-wide singleton)
     * - providedIn: 'any' (lazy module singleton)
     * - providedIn: 'platform' (cross-application singleton)
     */
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * USE CASE 4: Injection Tokens
     * Demonstrates:
     * - Creating InjectionToken for non-class values
     * - Using useValue for configuration objects
     * - Type-safe injection of primitives and objects
     */
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * USE CASE 5: Factory Providers
     * Demonstrates:
     * - useFactory for dynamic service creation
     * - Injecting dependencies into factory functions
     * - Conditional service instantiation
     */
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * USE CASE 6: Resolution Modifiers
     * Demonstrates:
     * - @Optional() for optional dependencies
     * - @Self() to restrict to current injector
     * - @SkipSelf() to skip current injector
     * - @Host() for host element injection
     */
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/parent.component').then(m => m.UseCase6ParentComponent)
    },

    /**
     * USE CASE 7: useFactory Provider
     * Demonstrates:
     * - useFactory for conditional service creation
     * - Injecting dependencies into factory functions
     * - Runtime service instantiation based on config
     */
    {
        path: 'use-case-7',
        loadComponent: () => import('./components/use-case-7/use-factory-example.component').then(m => m.UseFactoryExampleComponent)
    },

    /**
     * USE CASE 8: Multi-Providers
     * Demonstrates:
     * - Using multi: true for plugin systems
     * - Injecting arrays of services under same token
     * - Building extensible plugin architectures
     */
    {
        path: 'use-case-8',
        loadComponent: () => import('./components/use-case-8/multi-provider-example.component').then(m => m.MultiProviderExampleComponent)
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
