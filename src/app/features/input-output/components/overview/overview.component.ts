/**
 * INPUT/OUTPUT OVERVIEW COMPONENT
 * 
 * Landing page for the Input/Output feature module.
 * Displays all use cases with descriptions and navigation.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-io-overview',
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
            title: 'Basic @Input() & @Output()',
            route: '/input-output/use-case-1',
            description: 'Learn the fundamentals of parent-child communication with simple data passing and event emission.',
            topics: ['@Input() decorator', '@Output() decorator', 'EventEmitter', 'Property binding', 'Event binding'],
            difficulty: 'Beginner',
            icon: '📥📤'
        },
        {
            id: 2,
            title: 'Two-Way Binding',
            route: '/input-output/use-case-2',
            description: 'Implement two-way data binding using the [()] syntax and understand the naming convention.',
            topics: ['Two-way binding', 'Banana-in-a-box syntax', 'Change suffix', 'ngModel pattern'],
            difficulty: 'Beginner',
            icon: '🔄'
        },
        {
            id: 3,
            title: 'Complex Objects & Immutability',
            route: '/input-output/use-case-3',
            description: 'Pass complex objects, understand change detection, and learn immutability patterns for performance.',
            topics: ['Object passing', 'OnPush strategy', 'Immutability', 'Change detection', 'Reference vs value'],
            difficulty: 'Intermediate',
            icon: '📦'
        },
        {
            id: 4,
            title: 'Custom Event Payloads',
            route: '/input-output/use-case-4',
            description: 'Create type-safe custom events with complex data payloads in a real-world shopping cart scenario.',
            topics: ['Custom types', 'Type safety', 'Multiple events', 'Shopping cart pattern'],
            difficulty: 'Intermediate',
            icon: '🛒'
        },
        {
            id: 5,
            title: 'Input Transforms & Validation',
            route: '/input-output/use-case-5',
            description: 'Use Angular 16+ transform feature, input setters, and validation to sanitize and validate inputs.',
            topics: ['Transform option', 'Input setters', 'Validation', 'Type coercion', 'Computed properties'],
            difficulty: 'Advanced',
            icon: '⚙️'
        },
        {
            id: 6,
            title: 'Multiple Inputs & Outputs',
            route: '/input-output/use-case-6',
            description: 'Build complex components with multiple inputs and outputs in a user profile editor scenario.',
            topics: ['Multiple @Input()', 'Multiple @Output()', 'Component composition', 'Form patterns'],
            difficulty: 'Advanced',
            icon: '👤'
        }
    ];

    /**
     * Additional resources for learners
     */
    resources = [
        { name: 'Mermaid Diagrams', icon: '📊', description: 'Visual diagrams for each use case' },
        { name: 'Learner Exercise', icon: '✏️', description: 'Hands-on practice template', route: '/input-output/exercise' },
        { name: 'Angular Docs', icon: '📚', description: 'Official documentation', external: 'https://angular.io/guide/inputs-outputs' }
    ];
}
