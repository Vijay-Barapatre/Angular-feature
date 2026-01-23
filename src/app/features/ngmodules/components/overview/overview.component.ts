/**
 * ============================================================================
 * NGMODULES - OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ngmodules-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 NgModules</h1>
                <p class="subtitle">Understanding Angular's Module Architecture</p>
            </header>

            <section class="status-banner">
                <div class="legacy">
                    <span class="badge">Legacy Pattern</span>
                    <p>NgModules are still supported but <strong>standalone components</strong> 
                    are now the recommended approach (Angular 15+)</p>
                </div>
            </section>

            <section class="intro-card">
                <h2>What are NgModules?</h2>
                <p>
                    NgModules are containers that group related components, directives, pipes, 
                    and services. They were the <strong>only way</strong> to organize Angular apps 
                    before standalone components.
                </p>
                <pre class="code"><code>&#64;NgModule({{ '{' }}
  declarations: [MyComponent],  // What this module owns
  imports: [CommonModule],      // Other modules needed
  exports: [MyComponent],       // What others can use
  providers: [MyService]        // Services for DI
{{ '}' }})
export class MyModule {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="anatomy-section">
                <h2>🔍 Module Anatomy</h2>
                <div class="anatomy-grid">
                    <div class="part">
                        <h4>declarations</h4>
                        <p>Components, directives, pipes owned by this module</p>
                    </div>
                    <div class="part">
                        <h4>imports</h4>
                        <p>Other modules whose exports we need</p>
                    </div>
                    <div class="part">
                        <h4>exports</h4>
                        <p>What this module makes available to others</p>
                    </div>
                    <div class="part">
                        <h4>providers</h4>
                        <p>Services for dependency injection</p>
                    </div>
                    <div class="part">
                        <h4>bootstrap</h4>
                        <p>Root component (AppModule only)</p>
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

            <section class="why-learn">
                <h2>🎯 Why Learn NgModules?</h2>
                <ul>
                    <li><strong>Legacy codebases</strong> - Most existing apps use NgModules</li>
                    <li><strong>Third-party libraries</strong> - Many still export NgModules</li>
                    <li><strong>Interview questions</strong> - Common Angular interview topic</li>
                    <li><strong>Migration</strong> - Understanding helps migrate to standalone</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #667eea); }

        .status-banner { margin-bottom: 2rem; }
        .legacy { background: linear-gradient(135deg, #f59e0b20, #eab30820); padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 1rem; }
        .badge { background: #f59e0b; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; white-space: nowrap; }
        .legacy p { margin: 0; }

        .intro-card { background: var(--bg-secondary, #f8f9fa); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; }
        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; }

        .anatomy-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 1rem; }
        .part { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 8px; text-align: center; }
        .part h4 { margin: 0 0 0.5rem; color: var(--primary-color); font-size: 0.9rem; }
        .part p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }

        .use-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
        .use-case-card {
            display: flex; align-items: flex-start; gap: 1rem;
            background: var(--bg-secondary, #f8f9fa); padding: 1.25rem;
            border-radius: 10px; text-decoration: none; transition: all 0.2s;
            border: 1px solid transparent;
        }
        .use-case-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-color: var(--primary-color); }
        .use-case-card .number {
            background: linear-gradient(135deg, #667eea, #764ba2); color: white;
            width: 32px; height: 32px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; flex-shrink: 0;
        }
        .use-case-card h3 { margin: 0 0 0.25rem; color: var(--text-primary); font-size: 1rem; }
        .use-case-card p { margin: 0 0 0.5rem; color: var(--text-secondary); font-size: 0.85rem; }
        .tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
        .tag { background: #e0e7ff; color: #667eea; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }

        .why-learn { background: linear-gradient(135deg, #10b98120, #14b8a620); padding: 2rem; border-radius: 12px; }
        .why-learn ul { padding-left: 1.5rem; }
        .why-learn li { margin-bottom: 0.5rem; }
    `]
})
export class NgModulesOverviewComponent {
    useCases = [
        { id: 1, path: 'module-basics', icon: '📋', title: 'Module Basics', description: 'declarations, imports, exports, providers', tags: ['@NgModule', 'metadata', 'structure'] },
        { id: 2, path: 'feature-modules', icon: '📦', title: 'Feature Modules', description: 'Organize app into feature areas', tags: ['lazy loading', 'feature', 'organization'] },
        { id: 3, path: 'shared-modules', icon: '🔄', title: 'Shared Modules', description: 'Reusable components across features', tags: ['SharedModule', 'reuse', 'CommonModule'] },
        { id: 4, path: 'providers-di', icon: '💉', title: 'Providers & DI', description: 'Service scoping with modules', tags: ['providers', 'forRoot', 'injector'] },
        { id: 5, path: 'ngmodules-vs-standalone', icon: '⚖️', title: 'NgModules vs Standalone', description: 'Compare and migrate', tags: ['standalone', 'migration', 'comparison'] }
    ];
}
