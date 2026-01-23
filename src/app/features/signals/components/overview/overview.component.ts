/**
 * SIGNALS OVERVIEW COMPONENT
 * 
 * Landing page for the Signals feature module.
 * Displays all use cases with descriptions.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signals-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="overview-container">
            <header class="overview-header">
                <a routerLink="/" class="back-link">← Back to Home</a>
                <h1>🚦 Signals (Angular 17+)</h1>
                <p class="header-description">
                    Master Angular's modern reactive state management system.
                    Signals provide fine-grained reactivity with simpler syntax than Observables.
                </p>
            </header>

            <section class="use-cases-section">
                <h2>📚 Use Cases</h2>
                <div class="use-case-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.route" class="use-case-card">
                            <div class="card-icon">{{ useCase.icon }}</div>
                            <h3>{{ useCase.title }}</h3>
                            <p>{{ useCase.description }}</p>
                            <div class="card-concepts">
                                @for (concept of useCase.concepts; track concept) {
                                    <span class="concept-tag">{{ concept }}</span>
                                }
                            </div>
                        </a>
                    }
                </div>
            </section>

            <section class="key-concepts">
                <h2>🎯 Key Concepts</h2>
                <div class="concept-grid">
                    <div class="concept-card">
                        <span class="icon">📡</span>
                        <h4>signal()</h4>
                        <p>Writable reactive value</p>
                    </div>
                    <div class="concept-card">
                        <span class="icon">🧮</span>
                        <h4>computed()</h4>
                        <p>Derived read-only signal</p>
                    </div>
                    <div class="concept-card">
                        <span class="icon">⚡</span>
                        <h4>effect()</h4>
                        <p>Side effects on signal changes</p>
                    </div>
                    <div class="concept-card">
                        <span class="icon">📥</span>
                        <h4>input()</h4>
                        <p>Signal-based component inputs</p>
                    </div>
                </div>
            </section>

            <a routerLink="exercise" class="exercise-link">
                🎯 Try the Learner Exercise →
            </a>
        </div>
    `,
    styles: [`
        .overview-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .overview-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .back-link {
            color: var(--primary-light);
            text-decoration: none;
            display: inline-block;
            margin-bottom: 1rem;
        }

        h1 {
            font-size: 2.5rem;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header-description {
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto;
        }

        .use-cases-section h2, .key-concepts h2 {
            color: var(--primary-light);
            margin-bottom: 1.5rem;
        }

        .use-case-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .use-case-card {
            background: var(--bg-card);
            border-radius: 12px;
            padding: 1.5rem;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .use-case-card:hover {
            transform: translateY(-4px);
            border-color: var(--primary-color);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
        }

        .card-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .use-case-card h3 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }

        .use-case-card p {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .card-concepts {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .concept-tag {
            background: rgba(102, 126, 234, 0.1);
            color: var(--primary-light);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
        }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .concept-card {
            background: var(--bg-card);
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }

        .concept-card .icon {
            font-size: 1.5rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .concept-card h4 {
            color: var(--primary-light);
            margin-bottom: 0.25rem;
        }

        .concept-card p {
            color: var(--text-secondary);
            font-size: 0.85rem;
        }

        .exercise-link {
            display: block;
            text-align: center;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s;
        }

        .exercise-link:hover {
            transform: scale(1.02);
        }
    `]
})
export class OverviewComponent {
    useCases = [
        {
            id: 1,
            route: 'basic-signals',
            icon: '📡',
            title: 'Basic Signals',
            description: 'Create and update reactive signals with signal(), set(), and update()',
            concepts: ['signal()', 'set()', 'update()']
        },
        {
            id: 2,
            route: 'computed-signals',
            icon: '🧮',
            title: 'Computed Signals',
            description: 'Derive read-only values that auto-update when dependencies change',
            concepts: ['computed()', 'derived state', 'auto-tracking']
        },
        {
            id: 3,
            route: 'effects',
            icon: '⚡',
            title: 'Effects',
            description: 'Run side effects when signal values change',
            concepts: ['effect()', 'cleanup', 'untracked()']
        },
        {
            id: 4,
            route: 'signal-inputs',
            icon: '📥',
            title: 'Signal Inputs',
            description: 'Use input() and input.required() for reactive component inputs',
            concepts: ['input()', 'input.required()', 'transform']
        },
        {
            id: 5,
            route: 'model-signals',
            icon: '🔄',
            title: 'Model Signals',
            description: 'Two-way binding with model() for parent-child sync',
            concepts: ['model()', 'two-way binding', 'writeable']
        },
        {
            id: 6,
            route: 'signals-vs-observables',
            icon: '⚖️',
            title: 'Signals vs Observables',
            description: 'When to use each and how to convert between them',
            concepts: ['toSignal()', 'toObservable()', 'comparison']
        }
    ];
}
