/**
 * ============================================================================
 * PERFORMANCE OPTIMIZATION - OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-performance-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>⚡ Performance Optimization</h1>
                <p class="subtitle">Best Practices for Fast Angular Apps</p>
            </header>

            <section class="intro-card">
                <h2>Why Performance Matters</h2>
                <div class="stats-grid">
                    <div class="stat">
                        <span class="value">53%</span>
                        <span class="label">users leave if page takes &gt;3s</span>
                    </div>
                    <div class="stat">
                        <span class="value">100ms</span>
                        <span class="label">delay = 1% conversion drop</span>
                    </div>
                    <div class="stat">
                        <span class="value">🔍</span>
                        <span class="label">SEO ranks fast sites higher</span>
                    </div>
                </div>
            </section>

            <section class="categories">
                <h2>🎯 Optimization Categories</h2>
                <div class="category-grid">
                    <div class="category">
                        <span class="icon">🔄</span>
                        <h3>Change Detection</h3>
                        <p>OnPush, trackBy, detach</p>
                    </div>
                    <div class="category">
                        <span class="icon">📦</span>
                        <h3>Bundle Size</h3>
                        <p>Lazy loading, tree-shaking</p>
                    </div>
                    <div class="category">
                        <span class="icon">🚀</span>
                        <h3>Runtime</h3>
                        <p>Pipes, memoization, VirtualScroll</p>
                    </div>
                    <div class="category">
                        <span class="icon">🧠</span>
                        <h3>Memory</h3>
                        <p>Unsubscribe, WeakRef, cleanup</p>
                    </div>
                </div>
            </section>

            <section class="use-cases">
                <h2>📚 Use Cases</h2>
                <div class="use-case-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.path" class="use-case-card" [class]="useCase.highlight ? 'highlight' : ''">
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
                            @if (useCase.impact) {
                                <span class="impact" [class]="useCase.impact">{{ useCase.impact }}</span>
                            }
                        </a>
                    }
                </div>
            </section>

            <section class="quick-wins">
                <h2>⚡ Quick Wins Checklist</h2>
                <ul>
                    <li>✅ Use <code>OnPush</code> change detection</li>
                    <li>✅ Add <code>trackBy</code> to all loops</li>
                    <li>✅ Lazy load feature modules</li>
                    <li>✅ Use pure pipes instead of methods</li>
                    <li>✅ Unsubscribe from Observables</li>
                    <li>✅ Enable production mode</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #667eea); }

        .intro-card {
            background: linear-gradient(135deg, #ef444420, #f59e0b20);
            padding: 2rem; border-radius: 12px; margin-bottom: 2rem;
        }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 1rem; }
        .stat { text-align: center; }
        .stat .value { display: block; font-size: 2rem; font-weight: bold; color: #ef4444; }
        .stat .label { font-size: 0.85rem; color: var(--text-secondary); }

        .category-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
        .category {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.25rem; border-radius: 10px; text-align: center;
        }
        .category .icon { font-size: 2rem; }
        .category h3 { margin: 0.5rem 0 0.25rem; font-size: 0.95rem; }
        .category p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }

        .use-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; }
        .use-case-card {
            display: flex; align-items: flex-start; gap: 1rem; position: relative;
            background: var(--bg-secondary, #f8f9fa); padding: 1.25rem;
            border-radius: 10px; text-decoration: none; transition: all 0.2s;
            border: 1px solid transparent;
        }
        .use-case-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-color: var(--primary-color, #667eea); }
        .use-case-card.highlight { border-left: 4px solid #10b981; }
        .use-case-card .number {
            background: linear-gradient(135deg, #667eea, #764ba2); color: white;
            width: 32px; height: 32px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; flex-shrink: 0;
        }
        .use-case-card h3 { margin: 0 0 0.25rem 0; color: var(--text-primary, #1a1a2e); font-size: 1rem; }
        .use-case-card p { margin: 0 0 0.5rem 0; color: var(--text-secondary, #666); font-size: 0.85rem; }
        .tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
        .tag { background: #e0e7ff; color: #667eea; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }
        .impact { position: absolute; top: 0.5rem; right: 0.5rem; font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: bold; }
        .impact.high { background: #dcfce7; color: #16a34a; }
        .impact.medium { background: #fef3c7; color: #d97706; }

        .quick-wins {
            background: linear-gradient(135deg, #10b98120, #14b8a620);
            padding: 2rem; border-radius: 12px; margin-top: 2rem;
        }
        .quick-wins ul { columns: 2; list-style: none; padding: 0; }
        .quick-wins li { margin-bottom: 0.5rem; }
        .quick-wins code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }
    `]
})
export class PerformanceOverviewComponent {
    useCases = [
        { id: 1, path: 'onpush-strategy', icon: '🔄', title: 'OnPush Change Detection', description: 'Reduce CD cycles with immutable patterns', tags: ['OnPush', 'markForCheck', 'immutable'], highlight: true, impact: 'high' },
        { id: 2, path: 'trackby-optimization', icon: '📋', title: 'TrackBy Optimization', description: 'Efficient list rendering with identity tracking', tags: ['trackBy', '@for track', 'DOM reuse'], impact: 'high' },
        { id: 3, path: 'lazy-loading', icon: '📦', title: 'Lazy Loading', description: 'Code splitting and @defer blocks', tags: ['loadChildren', '@defer', 'preload'], impact: 'high' },
        { id: 4, path: 'bundle-optimization', icon: '🎯', title: 'Bundle Optimization', description: 'Tree-shaking and import optimization', tags: ['tree-shaking', 'budgets', 'webpack'] },
        { id: 5, path: 'runtime-performance', icon: '🚀', title: 'Runtime Performance', description: 'Pure pipes, memoization, virtual scroll', tags: ['pure pipe', 'memo', 'VirtualScroll'], impact: 'medium' },
        { id: 6, path: 'memory-management', icon: '🧠', title: 'Memory Management', description: 'Prevent leaks with proper cleanup', tags: ['takeUntilDestroyed', 'unsubscribe', 'WeakRef'] },
        { id: 7, path: 'profiling-devtools', icon: '🔍', title: 'Profiling & DevTools', description: 'Measure, debug, and optimize', tags: ['DevTools', 'Lighthouse', 'profiler'] }
    ];
}
