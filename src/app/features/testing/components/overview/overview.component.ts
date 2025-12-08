/**
 * ============================================================================
 * TESTING FEATURE - OVERVIEW COMPONENT
 * ============================================================================
 * 
 * Landing page for the Angular Testing feature module.
 * Provides navigation to all 7 testing use cases.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-testing-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>🧪 Angular Testing</h1>
                <p class="subtitle">
                    Master unit testing with Jasmine & Karma
                </p>
            </header>

            <section class="intro-card">
                <h2>Why Test?</h2>
                <p>
                    Tests provide <strong>confidence</strong> that your code works as expected,
                    enable <strong>safe refactoring</strong>, and serve as living <strong>documentation</strong>.
                </p>
                <div class="tech-stack">
                    <span class="tech">Jasmine</span>
                    <span class="tech">Karma</span>
                    <span class="tech">TestBed</span>
                </div>
            </section>

            <section class="use-cases">
                <h2>📚 Use Cases</h2>
                <div class="use-case-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.path" class="use-case-card" [class]="useCase.highlight">
                            <span class="number">{{ useCase.id }}</span>
                            <div class="content">
                                <h3>{{ useCase.icon }} {{ useCase.title }}</h3>
                                <p>{{ useCase.description }}</p>
                                <div class="tags">
                                    @for (tag of useCase.tags; track tag) {
                                        <span class="tag">{{ tag }}</span>
                                    }
                                </div>
                            </div>
                        </a>
                    }
                </div>
            </section>

            <section class="quick-start">
                <h2>🚀 Quick Start</h2>
                <div class="code-block">
                    <code>ng test</code>
                    <span class="comment"># Run all tests with Karma</span>
                </div>
                <div class="code-block">
                    <code>ng test --watch=false --browsers=ChromeHeadless</code>
                    <span class="comment"># CI-friendly headless mode</span>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #667eea); margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-secondary, #666); font-size: 1.2rem; }

        .intro-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            border-left: 5px solid #10b981;
        }
        .intro-card h2 { margin-top: 0; color: var(--text-primary, #1a1a2e); }
        .tech-stack { display: flex; gap: 0.5rem; margin-top: 1rem; }
        .tech {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .use-cases h2 { color: var(--text-primary, #1a1a2e); margin-bottom: 1.5rem; }
        .use-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem; }
        
        .use-case-card {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.25rem;
            border-radius: 10px;
            text-decoration: none;
            transition: all 0.2s;
            border: 1px solid transparent;
        }
        .use-case-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-color: var(--primary-color, #667eea);
        }
        .use-case-card.highlight-perf { border-left: 4px solid #f59e0b; }
        .use-case-card.highlight-reuse { border-left: 4px solid #10b981; }
        
        .use-case-card .number {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        .use-case-card .content { flex: 1; }
        .use-case-card h3 { margin: 0 0 0.25rem 0; color: var(--text-primary, #1a1a2e); font-size: 1rem; }
        .use-case-card p { margin: 0 0 0.5rem 0; color: var(--text-secondary, #666); font-size: 0.85rem; }
        
        .tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
        .tag { background: #e0e7ff; color: #667eea; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }

        .quick-start { margin-top: 2rem; }
        .quick-start h2 { color: var(--text-primary, #1a1a2e); }
        .code-block {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .code-block .comment { color: #6c7086; font-size: 0.85rem; }
    `]
})
export class TestingOverviewComponent {
    useCases = [
        {
            id: 1,
            path: 'use-case-1',
            icon: '🧩',
            title: 'Component Testing Basics',
            description: 'TestBed setup, fixtures, DOM queries, and event testing',
            tags: ['TestBed', 'ComponentFixture', 'detectChanges']
        },
        {
            id: 2,
            path: 'use-case-2',
            icon: '⚙️',
            title: 'Service Testing',
            description: 'Testing isolated services with state and methods',
            tags: ['inject', 'providers', 'state']
        },
        {
            id: 3,
            path: 'use-case-3',
            icon: '🎭',
            title: 'Mocking Dependencies',
            description: 'Spy objects, mock providers, and dependency isolation',
            tags: ['createSpyObj', 'useValue', 'mock']
        },
        {
            id: 4,
            path: 'use-case-4',
            icon: '⏱️',
            title: 'Async Testing',
            description: 'Testing Promises, Observables, and timers',
            tags: ['fakeAsync', 'tick', 'whenStable']
        },
        {
            id: 5,
            path: 'use-case-5',
            icon: '🌐',
            title: 'HTTP Testing',
            description: 'HttpClientTestingModule and request verification',
            tags: ['HttpTestingController', 'expectOne', 'flush']
        },
        {
            id: 6,
            path: 'use-case-6',
            icon: '⚡',
            title: 'Performance-Aware Testing',
            description: 'Optimizing test speed and testing OnPush components',
            tags: ['OnPush', 'minimal TestBed', 'CD control'],
            highlight: 'highlight-perf'
        },
        {
            id: 7,
            path: 'use-case-7',
            icon: '🔧',
            title: 'Reusable Testing Utilities',
            description: 'Factory functions, harnesses, and shared mocks',
            tags: ['factory', 'harness', 'page object'],
            highlight: 'highlight-reuse'
        }
    ];
}
