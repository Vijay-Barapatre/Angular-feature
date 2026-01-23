/**
 * ============================================================================
 * STANDALONE APIS - OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-standalone-apis-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>🚀 Standalone APIs</h1>
                <p class="subtitle">Modern Angular without NgModules</p>
            </header>

            <section class="intro-card">
                <h2>What are Standalone APIs?</h2>
                <p>
                    Angular 14+ introduced <strong>standalone components</strong> - components that don't 
                    need NgModules. Angular 15+ brought <strong>standalone APIs</strong> for routing, HTTP, 
                    and more. This is the modern way to build Angular apps!
                </p>
                <div class="comparison">
                    <div class="old">
                        <h4>❌ Old Way (NgModules)</h4>
                        <code>&#64;NgModule({{ '{' }} imports: [...] {{ '}' }})</code>
                    </div>
                    <div class="new">
                        <h4>✅ New Way (Standalone)</h4>
                        <code>&#64;Component({{ '{' }} standalone: true {{ '}' }})</code>
                    </div>
                </div>
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

            <section class="key-providers">
                <h2>🔧 Key Provider Functions</h2>
                <div class="provider-grid">
                    <div class="provider">
                        <code>provideRouter()</code>
                        <span>Configure routing</span>
                    </div>
                    <div class="provider">
                        <code>provideHttpClient()</code>
                        <span>HTTP client setup</span>
                    </div>
                    <div class="provider">
                        <code>provideAnimations()</code>
                        <span>Animation support</span>
                    </div>
                    <div class="provider">
                        <code>provideStore()</code>
                        <span>NgRx state</span>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #667eea); }

        .intro-card {
            background: linear-gradient(135deg, #667eea20, #764ba220);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .comparison { display: flex; gap: 2rem; margin-top: 1.5rem; }
        .old, .new { flex: 1; padding: 1rem; border-radius: 8px; }
        .old { background: #fee2e2; }
        .new { background: #dcfce7; }
        .old h4, .new h4 { margin: 0 0 0.5rem 0; font-size: 0.9rem; }
        .old code, .new code { font-size: 0.8rem; }

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
        .use-case-card h3 { margin: 0 0 0.25rem 0; color: var(--text-primary, #1a1a2e); font-size: 1rem; }
        .use-case-card p { margin: 0 0 0.5rem 0; color: var(--text-secondary, #666); font-size: 0.85rem; }
        .tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
        .tag { background: #e0e7ff; color: #667eea; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }

        .key-providers { margin-top: 2rem; }
        .provider-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
        .provider {
            background: #1e1e2e; color: white; padding: 1rem;
            border-radius: 8px; text-align: center;
        }
        .provider code { display: block; color: #a6e3a1; font-size: 0.85rem; margin-bottom: 0.5rem; }
        .provider span { font-size: 0.75rem; opacity: 0.8; }
    `]
})
export class StandaloneApisOverviewComponent {
    useCases = [
        {
            id: 1, path: 'bootstrap-config', icon: '⚡',
            title: 'bootstrapApplication',
            description: 'Modern app bootstrapping with app.config.ts',
            tags: ['bootstrapApplication', 'app.config.ts', 'ApplicationConfig']
        },
        {
            id: 2, path: 'provide-router', icon: '🛤️',
            title: 'provideRouter',
            description: 'Functional routing with features like preloading',
            tags: ['provideRouter', 'withPreloading', 'withComponentInputBinding']
        },
        {
            id: 3, path: 'provide-http', icon: '🌐',
            title: 'provideHttpClient',
            description: 'HTTP client with functional interceptors',
            tags: ['provideHttpClient', 'withInterceptors', 'withFetch']
        },
        {
            id: 4, path: 'standalone-components', icon: '📦',
            title: 'Standalone Components',
            description: 'Components without NgModules',
            tags: ['standalone: true', 'imports', 'self-contained']
        },
        {
            id: 5, path: 'standalone-directives', icon: '🎯',
            title: 'Standalone Directives & Pipes',
            description: 'Reusable standalone utilities',
            tags: ['standalone directive', 'standalone pipe']
        },
        {
            id: 6, path: 'migration-patterns', icon: '🔄',
            title: 'Migration Patterns',
            description: 'Migrate from NgModules to Standalone',
            tags: ['importProvidersFrom', 'migration', 'hybrid']
        }
    ];
}
