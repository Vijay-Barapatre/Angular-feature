/**
 * SERVICES & DI OVERVIEW COMPONENT
 * 
 * Landing page for the Services & Dependency Injection feature module.
 * Displays all use cases with descriptions and navigation.
 * 
 * LEARNING FOCUS:
 * - Understanding Angular's Dependency Injection system
 * - Different ways to provide and inject services
 * - Service scope and lifetime management
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-services-di-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css'
})
export class OverviewComponent {
    /**
     * Use cases with metadata for display
     */
    useCases = [
        {
            id: 1,
            title: 'Basic Service & Injection',
            route: '/services-di/basic-service',
            description: 'Learn the fundamentals of creating @Injectable services and injecting them via constructor.',
            topics: ['@Injectable()', 'Constructor injection', 'Service methods', 'Shared state', 'providedIn: root'],
            difficulty: 'Beginner',
            icon: '💉'
        },
        {
            id: 2,
            title: 'Singleton vs Component-Scoped',
            route: '/services-di/service-scoping',
            description: 'Understand the difference between singleton services (providedIn: root) and component-level providers.',
            topics: ['Singleton pattern', 'Component providers', 'Service lifetime', 'Instance management'],
            difficulty: 'Beginner',
            icon: '🔢'
        },
        {
            id: 3,
            title: 'providedIn Hierarchy',
            route: '/services-di/provided-in-hierarchy',
            description: 'Explore different providedIn options: root, any, platform, and their use cases.',
            topics: ['providedIn: root', 'providedIn: any', 'providedIn: platform', 'Tree-shaking', 'Module boundaries'],
            difficulty: 'Intermediate',
            icon: '🌳'
        },
        {
            id: 4,
            title: 'Injection Tokens',
            route: '/services-di/injection-tokens',
            description: 'Create InjectionTokens for injecting non-class values like configuration objects and primitive values.',
            topics: ['InjectionToken', 'useValue', 'Configuration objects', 'Type safety', 'Non-class dependencies'],
            difficulty: 'Intermediate',
            icon: '🎫'
        },
        {
            id: 5,
            title: 'Factory Providers',
            route: '/services-di/factory-providers',
            description: 'Use useFactory to dynamically create service instances based on runtime conditions.',
            topics: ['useFactory', 'deps array', 'Dynamic creation', 'Conditional services', 'Environment-based config'],
            difficulty: 'Advanced',
            icon: '🏭'
        },
        {
            id: 6,
            title: 'Resolution Modifiers',
            route: '/services-di/resolution-modifiers',
            description: 'Control dependency resolution with @Optional, @Self, @SkipSelf, and @Host decorators.',
            topics: ['@Optional()', '@Self()', '@SkipSelf()', '@Host()', 'Injector hierarchy', 'Resolution control'],
            difficulty: 'Advanced',
            icon: '🎯'
        }
    ];

    /**
     * Additional resources for learners
     */
    resources = [
        { name: 'Mermaid Diagrams', icon: '📊', description: 'Visual diagrams for each use case' },
        { name: 'Learner Exercise', icon: '✏️', description: 'Hands-on practice template', route: '/services-di/exercise' },
        { name: 'Angular Docs', icon: '📚', description: 'Official documentation', external: 'https://angular.io/guide/dependency-injection' }
    ];
}
