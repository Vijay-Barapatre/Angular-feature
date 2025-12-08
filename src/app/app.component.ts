/**
 * ROOT APPLICATION COMPONENT
 * 
 * This is the main component that serves as the shell for the entire application.
 * It provides:
 * - Navigation bar for accessing different Angular features
 * - Router outlet for displaying feature modules
 * - Consistent layout across all pages
 * 
 * LEARNING NOTES:
 * - Standalone component (no NgModule required in Angular 17+)
 * - Uses RouterOutlet for routing
 * - Uses RouterLink for navigation
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * @Component Decorator
 * Defines metadata for the component
 * 
 * - selector: HTML tag used to render this component (<app-root></app-root>)
 * - standalone: true = This component doesn't need a NgModule
 * - imports: Other modules/components this component depends on
 * - templateUrl: Path to the HTML template
 * - styleUrl: Path to the component-specific styles
 */
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,      // Provides common directives like ngIf, ngFor
        RouterOutlet,      // Directive for displaying routed components
        RouterLink         // Directive for navigation links
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    /**
     * Component Properties
     */
    title = 'Angular Features Learning Platform';

    /**
     * Feature Categories
     * Each category contains a list of Angular features to learn
     * This can be expanded as new feature modules are added
     */
    featureCategories = [
        {
            name: 'Component Communication',
            icon: '🔄',
            features: [
                {
                    name: 'Input & Output',
                    route: '/input-output',
                    description: 'Parent-child component communication',
                    status: 'active'
                },
                {
                    name: 'ViewChild & ContentChild',
                    route: '/view-content-child',
                    description: 'Accessing child components and projected content',
                    status: 'coming-soon'
                }
            ]
        },
        {
            name: 'State Management',
            icon: '📊',
            features: [
                {
                    name: 'Services & Dependency Injection',
                    route: '/services-di',
                    description: 'Sharing data across components',
                    status: 'coming-soon'
                },
                {
                    name: 'Signals (Angular 17+)',
                    route: '/signals',
                    description: 'Modern reactive state management',
                    status: 'coming-soon'
                }
            ]
        },
        {
            name: 'Directives',
            icon: '⚡',
            features: [
                {
                    name: 'Built-in Directives',
                    route: '/directives-builtin',
                    description: 'ngIf, ngFor, ngClass, etc.',
                    status: 'coming-soon'
                },
                {
                    name: 'Custom Directives',
                    route: '/directives-custom',
                    description: 'Creating your own directives',
                    status: 'coming-soon'
                }
            ]
        }
    ];

    /**
     * Get Angular version for display in footer
     */
    getAngularVersion(): string {
        return '17+';
    }
}
