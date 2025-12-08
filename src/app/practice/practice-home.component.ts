/**
 * ============================================================================
 * PRACTICE HOME PAGE COMPONENT
 * ============================================================================
 * 
 * Landing page for all practice exercises organized by feature.
 * Provides navigation to feature-specific practice sections.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface PracticeCategory {
    name: string;
    icon: string;
    description: string;
    route: string;
    basicCount: number;
    complexCount: number;
    status: 'available' | 'coming-soon';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

@Component({
    selector: 'app-practice-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="practice-home">
            <header class="hero">
                <h1>🎯 Practice Exercises</h1>
                <p class="subtitle">
                    Hands-on coding challenges to master Angular concepts.
                    Each exercise includes boilerplate code with TODO placeholders.
                </p>
                <div class="stats">
                    <div class="stat">
                        <span class="stat-value">{{ getTotalExercises() }}</span>
                        <span class="stat-label">Total Exercises</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">{{ categories.length }}</span>
                        <span class="stat-label">Categories</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">{{ getAvailableCount() }}</span>
                        <span class="stat-label">Available Now</span>
                    </div>
                </div>
            </header>

            <section class="how-it-works">
                <h2>📚 How It Works</h2>
                <div class="steps">
                    <div class="step">
                        <span class="step-num">1</span>
                        <h4>Choose a Topic</h4>
                        <p>Select a feature category below</p>
                    </div>
                    <div class="step">
                        <span class="step-num">2</span>
                        <h4>Read the Objective</h4>
                        <p>Understand what you need to implement</p>
                    </div>
                    <div class="step">
                        <span class="step-num">3</span>
                        <h4>Complete the TODOs</h4>
                        <p>Fill in the missing logic</p>
                    </div>
                    <div class="step">
                        <span class="step-num">4</span>
                        <h4>Test & Verify</h4>
                        <p>See your implementation work!</p>
                    </div>
                </div>
            </section>

            <section class="categories-section">
                <h2>📂 Practice Categories</h2>
                <div class="categories-grid">
                    <a *ngFor="let category of categories" 
                       [routerLink]="category.route"
                       class="category-card"
                       [class.coming-soon]="category.status === 'coming-soon'">
                        <div class="card-header">
                            <span class="card-icon">{{ category.icon }}</span>
                            <span class="difficulty-badge" [class]="category.difficulty">
                                {{ category.difficulty }}
                            </span>
                        </div>
                        <h3>{{ category.name }}</h3>
                        <p>{{ category.description }}</p>
                        <div class="card-footer">
                            <span class="exercise-count">
                                <span class="basic">{{ category.basicCount }} Basic</span>
                                <span class="divider">|</span>
                                <span class="complex">{{ category.complexCount }} Complex</span>
                            </span>
                            <span class="status-badge" [class]="category.status">
                                {{ category.status === 'available' ? '✅ Available' : '🔜 Coming Soon' }}
                            </span>
                        </div>
                    </a>
                </div>
            </section>

            <section class="tips-section">
                <h2>💡 Tips for Success</h2>
                <div class="tips-grid">
                    <div class="tip">
                        <span class="tip-icon">📖</span>
                        <h4>Read the Comments</h4>
                        <p>Each TODO has hints in comments above it</p>
                    </div>
                    <div class="tip">
                        <span class="tip-icon">🔍</span>
                        <h4>Check the Imports</h4>
                        <p>Required imports are already included</p>
                    </div>
                    <div class="tip">
                        <span class="tip-icon">🧪</span>
                        <h4>Test Incrementally</h4>
                        <p>Complete one TODO at a time and test</p>
                    </div>
                    <div class="tip">
                        <span class="tip-icon">📚</span>
                        <h4>Reference the Guides</h4>
                        <p>Use case docs explain the concepts</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .practice-home {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .hero {
            text-align: center;
            padding: 3rem 2rem;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 16px;
            color: white;
            margin-bottom: 2rem;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin: 0 0 0.5rem;
        }

        .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto 2rem;
        }

        .stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
        }

        .stat {
            text-align: center;
        }

        .stat-value {
            display: block;
            font-size: 2.5rem;
            font-weight: bold;
        }

        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .how-it-works {
            margin-bottom: 2rem;
        }

        h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--text-primary);
        }

        .steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
        }

        .step {
            text-align: center;
            padding: 1.5rem;
            background: var(--bg-secondary);
            border-radius: 12px;
            position: relative;
        }

        .step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background: #10b981;
            color: white;
            border-radius: 50%;
            font-weight: bold;
            margin-bottom: 0.75rem;
        }

        .step h4 {
            margin: 0 0 0.25rem;
            font-size: 1rem;
        }

        .step p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .category-card {
            display: block;
            padding: 1.5rem;
            background: var(--bg-secondary);
            border-radius: 12px;
            text-decoration: none;
            color: inherit;
            border: 2px solid transparent;
            transition: all 0.2s ease;
        }

        .category-card:hover {
            border-color: #10b981;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
        }

        .category-card.coming-soon {
            opacity: 0.6;
            pointer-events: none;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .card-icon {
            font-size: 2rem;
        }

        .difficulty-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 500;
        }

        .difficulty-badge.beginner { background: #dcfce7; color: #16a34a; }
        .difficulty-badge.intermediate { background: #fef3c7; color: #b45309; }
        .difficulty-badge.advanced { background: #fee2e2; color: #dc2626; }

        .category-card h3 {
            margin: 0 0 0.5rem;
            font-size: 1.25rem;
        }

        .category-card p {
            margin: 0 0 1rem;
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 1rem;
            border-top: 1px solid var(--border-color);
        }

        .exercise-count {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }

        .exercise-count .basic { color: #10b981; }
        .exercise-count .complex { color: #ef4444; }
        .exercise-count .divider { margin: 0 0.5rem; }

        .status-badge {
            font-size: 0.75rem;
        }

        .status-badge.available { color: #10b981; }
        .status-badge.coming-soon { color: #6b7280; }

        .tips-section {
            margin-top: 3rem;
        }

        .tips-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
        }

        .tip {
            padding: 1.5rem;
            background: #eff6ff;
            border-radius: 12px;
            text-align: center;
        }

        .tip-icon {
            font-size: 2rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .tip h4 {
            margin: 0 0 0.25rem;
            font-size: 1rem;
        }

        .tip p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        @media (max-width: 768px) {
            .steps, .tips-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .stats {
                flex-wrap: wrap;
                gap: 1.5rem;
            }
        }
    `]
})
export class PracticeHomeComponent {
    categories: PracticeCategory[] = [
        {
            name: 'Input & Output',
            icon: '🔄',
            description: 'Master parent-child communication with @Input and @Output decorators',
            route: '/practice/input-output',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'beginner'
        },
        {
            name: 'Security',
            icon: '🔒',
            description: 'XSS prevention, CSRF protection, JWT handling, and secure forms',
            route: '/practice/security',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'advanced'
        },
        {
            name: 'Signals',
            icon: '📡',
            description: 'Modern reactive state with signals, computed, and effects',
            route: '/practice/signals',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'intermediate'
        },
        {
            name: 'Reactive Forms',
            icon: '📝',
            description: 'Form validation, dynamic forms, and form arrays',
            route: '/practice/reactive-forms',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'intermediate'
        },
        {
            name: 'HTTP Client',
            icon: '🌐',
            description: 'API calls, interceptors, error handling, and caching',
            route: '/practice/http-client',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'intermediate'
        },
        {
            name: 'RxJS',
            icon: '🔄',
            description: 'Operators, subjects, higher-order observables',
            route: '/practice/rxjs',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'advanced'
        },
        {
            name: 'Routing',
            icon: '🛣️',
            description: 'Navigation, guards, resolvers, and lazy loading',
            route: '/practice/routing',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'intermediate'
        },
        {
            name: 'Testing',
            icon: '🧪',
            description: 'Unit tests, component tests, and mocking',
            route: '/practice/testing',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'advanced'
        },
        {
            name: 'Guards',
            icon: '🛡️',
            description: 'Route protection, auth guards, role-based access, and resolvers',
            route: '/practice/guards',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'intermediate'
        },
        {
            name: 'Directives',
            icon: '🎯',
            description: 'Attribute, structural, and custom directives with host bindings',
            route: '/practice/directives',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'intermediate'
        },
        {
            name: 'Pipes',
            icon: '🔧',
            description: 'Data transformation, custom pipes, async pipe, and memoization',
            route: '/practice/pipes',
            basicCount: 4,
            complexCount: 5,
            status: 'available',
            difficulty: 'intermediate'
        }
    ];

    getTotalExercises(): number {
        return this.categories.reduce((sum, cat) => sum + cat.basicCount + cat.complexCount, 0);
    }

    getAvailableCount(): number {
        return this.categories.filter(c => c.status === 'available').length;
    }
}
