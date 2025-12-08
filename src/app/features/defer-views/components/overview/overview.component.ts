/**
 * ============================================================================
 * DEFER VIEWS FEATURE - OVERVIEW
 * ============================================================================
 * 
 * Angular 17+ @defer blocks for lazy loading template content
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-defer-views-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>⚡ Defer / Lazy Views</h1>
                <p class="subtitle">Angular 17+ &#64;defer Blocks</p>
            </header>

            <section class="intro-card">
                <h2>What is &#64;defer?</h2>
                <p>
                    <strong>&#64;defer</strong> blocks allow you to lazy load parts of your template,
                    reducing initial bundle size and improving performance. Content inside &#64;defer
                    is automatically code-split and loaded when conditions are met.
                </p>
                <div class="benefits">
                    <div class="benefit">
                        <span class="icon">📦</span>
                        <span>Smaller bundles</span>
                    </div>
                    <div class="benefit">
                        <span class="icon">🚀</span>
                        <span>Faster initial load</span>
                    </div>
                    <div class="benefit">
                        <span class="icon">🎯</span>
                        <span>Load on demand</span>
                    </div>
                </div>
            </section>

            <section class="syntax-card">
                <h2>Basic Syntax</h2>
                <pre><code>&#64;defer {{ '{' }}
  &lt;heavy-component /&gt;
{{ '}' }} &#64;placeholder {{ '{' }}
  &lt;p&gt;Loading soon...&lt;/p&gt;
{{ '}' }} &#64;loading {{ '{' }}
  &lt;spinner /&gt;
{{ '}' }} &#64;error {{ '{' }}
  &lt;p&gt;Failed to load&lt;/p&gt;
{{ '}' }}</code></pre>
            </section>

            <section class="use-cases">
                <h2>📚 Use Cases</h2>
                <div class="use-case-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.path" class="use-case-card">
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
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #667eea); margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-secondary, #666); font-size: 1.2rem; }

        .intro-card {
            background: linear-gradient(135deg, #667eea20, #764ba220);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .intro-card h2 { margin-top: 0; }
        .benefits { display: flex; gap: 2rem; margin-top: 1rem; flex-wrap: wrap; }
        .benefit { display: flex; align-items: center; gap: 0.5rem; font-weight: 500; }
        .benefit .icon { font-size: 1.5rem; }

        .syntax-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .syntax-card h2 { margin-top: 0; }
        .syntax-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
        }

        .use-cases h2 { margin-bottom: 1.5rem; }
        .use-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; }
        .use-case-card {
            display: flex; align-items: flex-start; gap: 1rem;
            background: var(--bg-secondary, #f8f9fa); padding: 1.25rem;
            border-radius: 10px; text-decoration: none; transition: all 0.2s;
            border: 1px solid transparent;
        }
        .use-case-card:hover {
            transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-color: var(--primary-color, #667eea);
        }
        .use-case-card .number {
            background: linear-gradient(135deg, #667eea, #764ba2); color: white;
            width: 32px; height: 32px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; flex-shrink: 0;
        }
        .use-case-card .content { flex: 1; }
        .use-case-card h3 { margin: 0 0 0.25rem 0; color: var(--text-primary, #1a1a2e); font-size: 1rem; }
        .use-case-card p { margin: 0 0 0.5rem 0; color: var(--text-secondary, #666); font-size: 0.85rem; }
        .tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
        .tag { background: #e0e7ff; color: #667eea; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }
    `]
})
export class DeferViewsOverviewComponent {
    useCases = [
        {
            id: 1, path: 'use-case-1', icon: '📦',
            title: 'Basic @defer',
            description: 'Simple deferred loading of heavy components',
            tags: ['@defer', 'lazy load', 'code split']
        },
        {
            id: 2, path: 'use-case-2', icon: '⏳',
            title: 'Loading States',
            description: '@loading, @placeholder, and @error blocks',
            tags: ['@loading', '@placeholder', '@error', 'minimum']
        },
        {
            id: 3, path: 'use-case-3', icon: '🎯',
            title: 'Trigger Conditions',
            description: 'on viewport, on interaction, on hover, on idle, on timer',
            tags: ['on viewport', 'on hover', 'on timer']
        },
        {
            id: 4, path: 'use-case-4', icon: '🚀',
            title: 'Prefetching',
            description: 'Prefetch content before it\'s needed',
            tags: ['prefetch on idle', 'prefetch on hover']
        },
        {
            id: 5, path: 'use-case-5', icon: '🔀',
            title: 'When Condition',
            description: 'Conditional defer with when expression',
            tags: ['when', 'conditional', 'dynamic']
        },
        {
            id: 6, path: 'use-case-6', icon: '🌍',
            title: 'Real-world Patterns',
            description: 'Dashboard widgets, comments, charts',
            tags: ['dashboard', 'widgets', 'production']
        }
    ];
}
