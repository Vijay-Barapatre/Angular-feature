/**
 * ============================================================================
 * REACTIVE FORMS OVERVIEW COMPONENT
 * ============================================================================
 * 
 * This is the landing page for the Reactive Forms feature module.
 * It provides navigation to all 8 use cases with brief descriptions.
 * 
 * LEARNING OBJECTIVES:
 * - Understand what Reactive Forms are and when to use them.
 * - Navigate through progressively complex use cases.
 * - See the key differences from Template Driven Forms.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * UseCase Interface
 * Defines the structure for each use case card displayed on this page.
 */
interface UseCase {
    id: number;
    title: string;
    description: string;
    path: string;
    icon: string;
}

@Component({
    selector: 'app-reactive-forms-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <!-- 
            TEMPLATE STRUCTURE:
            1. Header section with title and introduction
            2. Grid of use case cards
            3. Each card links to its respective use case route
        -->
        <div class="overview-container">
            <!-- Header Section -->
            <header class="header">
                <h1>📝 Reactive Forms</h1>
                <p class="subtitle">
                    Master Angular's model-driven approach to form handling.
                    Reactive Forms give you <strong>full programmatic control</strong> 
                    over your form model.
                </p>
            </header>

            <!-- Key Benefits Section -->
            <section class="benefits">
                <h2>✨ Why Reactive Forms?</h2>
                <div class="benefits-grid">
                    <div class="benefit-card">
                        <span class="icon">🎯</span>
                        <h3>Explicit Control</h3>
                        <p>Define form structure in TypeScript, not template.</p>
                    </div>
                    <div class="benefit-card">
                        <span class="icon">🧪</span>
                        <h3>Testable</h3>
                        <p>Test form logic without DOM interaction.</p>
                    </div>
                    <div class="benefit-card">
                        <span class="icon">📡</span>
                        <h3>Reactive</h3>
                        <p>RxJS Observables for value/status changes.</p>
                    </div>
                    <div class="benefit-card">
                        <span class="icon">🔄</span>
                        <h3>Immutable</h3>
                        <p>Predictable state changes with setValue/patchValue.</p>
                    </div>
                </div>
            </section>

            <!-- Use Cases Grid -->
            <section class="use-cases">
                <h2>📚 Use Cases</h2>
                <div class="use-cases-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.path" class="use-case-card">
                            <div class="card-header">
                                <span class="use-case-icon">{{ useCase.icon }}</span>
                                <span class="use-case-number">Use Case {{ useCase.id }}</span>
                            </div>
                            <h3>{{ useCase.title }}</h3>
                            <p>{{ useCase.description }}</p>
                        </a>
                    }
                </div>
            </section>
        </div>
    `,
    styles: [`
        /* Container */
        .overview-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .header h1 {
            font-size: 2.5rem;
            color: #1a1a2e;
            margin-bottom: 1rem;
        }

        .subtitle {
            font-size: 1.2rem;
            color: #666;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Benefits Section */
        .benefits {
            margin-bottom: 3rem;
        }

        .benefits h2 {
            text-align: center;
            margin-bottom: 1.5rem;
            color: #1a1a2e;
        }

        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }

        .benefit-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
        }

        .benefit-card .icon {
            font-size: 2rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .benefit-card h3 {
            margin: 0.5rem 0;
            font-size: 1.1rem;
        }

        .benefit-card p {
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.9;
        }

        /* Use Cases Section */
        .use-cases h2 {
            text-align: center;
            margin-bottom: 1.5rem;
            color: #1a1a2e;
        }

        .use-cases-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .use-case-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            padding: 1.5rem;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .use-case-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
            border-color: #667eea;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
        }

        .use-case-icon {
            font-size: 1.5rem;
        }

        .use-case-number {
            font-size: 0.85rem;
            color: #667eea;
            font-weight: 600;
        }

        .use-case-card h3 {
            margin: 0 0 0.5rem 0;
            color: #1a1a2e;
            font-size: 1.1rem;
        }

        .use-case-card p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
            line-height: 1.5;
        }
    `]
})
export class ReactiveFormsOverviewComponent {
    /**
     * USE CASES DATA
     * 
     * Each use case is defined with:
     * - id: Unique identifier and order number
     * - title: Short, descriptive title
     * - description: Brief explanation of what the use case covers
     * - path: Router link path (relative to /reactive-forms/)
     * - icon: Emoji for visual identification
     */
    useCases: UseCase[] = [
        {
            id: 1,
            title: 'Basic FormControl & FormGroup',
            description: 'Foundation of Reactive Forms. Create controls, bind them, and access values.',
            path: 'use-case-1',
            icon: '🎯'
        },
        {
            id: 2,
            title: 'Nested FormGroups',
            description: 'Organize complex forms with nested groups like address within user profile.',
            path: 'use-case-2',
            icon: '📦'
        },
        {
            id: 3,
            title: 'FormArray (Dynamic Fields)',
            description: 'Add and remove form controls dynamically at runtime.',
            path: 'use-case-3',
            icon: '➕'
        },
        {
            id: 4,
            title: 'Built-in Validators',
            description: 'Use Angular\'s validators: required, minLength, maxLength, pattern, email.',
            path: 'use-case-4',
            icon: '✅'
        },
        {
            id: 5,
            title: 'Custom Validators',
            description: 'Create sync and async validators for custom validation logic.',
            path: 'use-case-5',
            icon: '🛡️'
        },
        {
            id: 6,
            title: 'Cross-Field Validation',
            description: 'Validate fields that depend on each other: password match, date range.',
            path: 'use-case-6',
            icon: '🔗'
        },
        {
            id: 7,
            title: 'Dynamic Form Generation',
            description: 'Generate entire forms from JSON configuration at runtime.',
            path: 'use-case-7',
            icon: '⚡'
        },
        {
            id: 8,
            title: 'Value Changes & Status',
            description: 'React to form changes using RxJS Observables.',
            path: 'use-case-8',
            icon: '📡'
        }
    ];
}
