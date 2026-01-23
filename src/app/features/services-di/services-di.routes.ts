/**
 * SERVICES & DEPENDENCY INJECTION FEATURE ROUTES
 * 
 * This file defines all routes for the Services & DI feature module.
 * Each use case has its own route for independent learning and testing.
 * 
 * ROUTE STRUCTURE:
 * /services-di (base)
 *   ├── / (overview/landing)
 *   ├── /basic-service (Basic Service & Injection)
 *   ├── /service-scoping (Singleton vs Component-Scoped)
 *   ├── /provided-in-hierarchy (providedIn Hierarchy)
 *   ├── /injection-tokens (Injection Tokens)
 *   ├── /factory-providers (Factory Providers)
 *   ├── /resolution-modifiers (Resolution Modifiers)
 *   ├── /use-factory (useFactory Implementation)
 *   ├── /multi-providers (Multi Providers)
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
     * Basic Service & Injection
     * Demonstrates:
     * - Creating an @Injectable service
     * - Injecting service via constructor
     * - Sharing data between components via service
     * - Service methods and state management
     */
    {
        path: 'basic-service',
        loadComponent: () => import('./components/basic-service/sender.component').then(m => m.SenderComponent)
    },

    /**
     * Singleton vs Component-Scoped Services
     * Demonstrates:
     * - providedIn: 'root' creates singleton
     * - Component-level providers create new instances
     * - Understanding service scope and lifetime
     */
    {
        path: 'service-scoping',
        loadComponent: () => import('./components/service-scoping/parent.component').then(m => m.UseCase2ParentComponent)
    },

    /**
     * providedIn Hierarchy
     * Demonstrates:
     * - providedIn: 'root' (application-wide singleton)
     * - providedIn: 'any' (lazy module singleton)
     * - providedIn: 'platform' (cross-application singleton)
     */
    {
        path: 'provided-in-hierarchy',
        loadComponent: () => import('./components/provided-in-hierarchy/parent.component').then(m => m.UseCase3ParentComponent)
    },

    /**
     * Injection Tokens
     * Demonstrates:
     * - Creating InjectionToken for non-class values
     * - Using useValue for configuration objects
     * - Type-safe injection of primitives and objects
     */
    {
        path: 'injection-tokens',
        loadComponent: () => import('./components/injection-tokens/parent.component').then(m => m.UseCase4ParentComponent)
    },

    /**
     * Factory Providers
     * Demonstrates:
     * - useFactory for dynamic service creation
     * - Injecting dependencies into factory functions
     * - Conditional service instantiation
     */
    {
        path: 'factory-providers',
        loadComponent: () => import('./components/factory-providers/parent.component').then(m => m.UseCase5ParentComponent)
    },

    /**
     * Resolution Modifiers
     * Demonstrates:
     * - @Optional() for optional dependencies
     * - @Self() to restrict to current injector
     * - @SkipSelf() to skip current injector
     * - @Host() for host element injection
     */
    {
        path: 'resolution-modifiers',
        loadComponent: () => import('./components/resolution-modifiers/parent.component').then(m => m.UseCase6ParentComponent)
    },

    /**
     * useFactory Provider
     * Demonstrates:
     * - useFactory for conditional service creation
     * - Injecting dependencies into factory functions
     * - Runtime service instantiation based on config
     */
    {
        path: 'use-factory',
        loadComponent: () => import('./components/use-factory/use-factory-example.component').then(m => m.UseFactoryExampleComponent)
    },

    /**
     * Multi-Providers
     * Demonstrates:
     * - Using multi: true for plugin systems
     * - Injecting arrays of services under same token
     * - Building extensible plugin architectures
     */
    {
        path: 'multi-providers',
        loadComponent: () => import('./components/multi-providers/multi-provider-example.component').then(m => m.MultiProviderExampleComponent)
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
