/**
 * LIFECYCLE HOOKS OVERVIEW COMPONENT
 * 
 * Landing page for the Lifecycle Hooks feature module.
 * Displays all use cases with descriptions and navigation.
 * 
 * LEARNING FOCUS:
 * - Understanding Angular component lifecycle
 * - When each hook is called
 * - Practical use cases for each hook
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lifecycle-hooks-overview',
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
            title: 'ngOnInit & ngOnDestroy',
            route: '/lifecycle-hooks/on-init-on-destroy',
            description: 'Learn component initialization and cleanup. Essential for setting up subscriptions and releasing resources.',
            topics: ['ngOnInit', 'ngOnDestroy', 'Subscriptions', 'Timer cleanup', 'Resource management'],
            difficulty: 'Beginner',
            icon: '🚀'
        },
        {
            id: 2,
            title: 'ngOnChanges',
            route: '/lifecycle-hooks/on-changes',
            description: 'React to @Input property changes with SimpleChanges object. Track previous and current values.',
            topics: ['ngOnChanges', 'SimpleChanges', '@Input tracking', 'isFirstChange()', 'Value comparison'],
            difficulty: 'Beginner',
            icon: '🔄'
        },
        {
            id: 3,
            title: 'View Lifecycle Hooks',
            route: '/lifecycle-hooks/after-view-init',
            description: 'Access child components and DOM elements after view initialization with ngAfterViewInit.',
            topics: ['ngAfterViewInit', 'ngAfterViewChecked', '@ViewChild', 'DOM access', 'Third-party integration'],
            difficulty: 'Intermediate',
            icon: '👁️'
        },
        {
            id: 4,
            title: 'Content Projection Lifecycle',
            route: '/lifecycle-hooks/after-content-init',
            description: 'Handle projected content with ngAfterContentInit and ngAfterContentChecked hooks.',
            topics: ['ngAfterContentInit', 'ngAfterContentChecked', '@ContentChild', 'ng-content', 'Dynamic tabs'],
            difficulty: 'Intermediate',
            icon: '📦'
        },
        {
            id: 5,
            title: 'Custom Change Detection',
            route: '/lifecycle-hooks/do-check',
            description: 'Implement custom change detection with ngDoCheck to catch changes Angular misses.',
            topics: ['ngDoCheck', 'Object mutation', 'Deep comparison', 'Performance', 'KeyValueDiffers'],
            difficulty: 'Advanced',
            icon: '🔍'
        },
        {
            id: 6,
            title: 'Complete Lifecycle Demo',
            route: '/lifecycle-hooks/complete-lifecycle',
            description: 'Visualize all lifecycle hooks in action with an interactive demo showing execution order.',
            topics: ['All hooks', 'Execution order', 'Visual logging', 'Interactive demo', 'Performance metrics'],
            difficulty: 'Advanced',
            icon: '🎬'
        }
    ];

    /**
     * Lifecycle hooks in execution order
     */
    lifecycleOrder = [
        { name: 'constructor', description: 'Class instantiation', phase: 'creation' },
        { name: 'ngOnChanges', description: 'Input property changes', phase: 'creation' },
        { name: 'ngOnInit', description: 'Component initialization', phase: 'creation' },
        { name: 'ngDoCheck', description: 'Custom change detection', phase: 'update' },
        { name: 'ngAfterContentInit', description: 'After content projection', phase: 'content' },
        { name: 'ngAfterContentChecked', description: 'After content check', phase: 'content' },
        { name: 'ngAfterViewInit', description: 'After view initialization', phase: 'view' },
        { name: 'ngAfterViewChecked', description: 'After view check', phase: 'view' },
        { name: 'ngOnDestroy', description: 'Before component destruction', phase: 'destroy' }
    ];

    /**
     * Additional resources for learners
     */
    resources = [
        { name: 'Lifecycle Diagram', icon: '📊', description: 'Visual flow of all hooks' },
        { name: 'Learner Exercise', icon: '✏️', description: 'Hands-on practice template', route: '/lifecycle-hooks/exercise' },
        { name: 'Angular Docs', icon: '📚', description: 'Official documentation', external: 'https://angular.io/guide/lifecycle-hooks' }
    ];
}
