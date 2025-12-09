/**
 * ============================================================================
 * DIRECTIVES FEATURE - OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-directives-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎯 Angular Directives</h1>
                <p class="subtitle">
                    Classes that add behavior to elements in your templates
                </p>
            </header>

            <section class="directive-types">
                <div class="type-card component">
                    <span class="icon">🧩</span>
                    <h3>Components</h3>
                    <p>Directives with templates (&#64;Component)</p>
                    <code>&#64;Component({{ '{' }} template: '...' {{ '}' }})</code>
                </div>
                <div class="type-card attribute">
                    <span class="icon">🎨</span>
                    <h3>Attribute Directives</h3>
                    <p>Change appearance or behavior</p>
                    <code>[ngClass], [ngStyle], [appHighlight]</code>
                </div>
                <div class="type-card structural">
                    <span class="icon">🔧</span>
                    <h3>Structural Directives</h3>
                    <p>Change DOM structure</p>
                    <code>*ngIf, *ngFor, *ngSwitch</code>
                </div>
            </section>

            <section class="builtin-directives">
                <h2>🛠️ Built-in Directives</h2>
                <div class="builtin-grid">
                    <div class="builtin-card">
                        <h3>Attribute</h3>
                        <ul>
                            <li><code>[ngClass]</code> - Add/remove classes dynamically</li>
                            <li><code>[ngStyle]</code> - Apply inline styles dynamically</li>
                            <li><code>[(ngModel)]</code> - Two-way data binding</li>
                        </ul>
                    </div>
                    <div class="builtin-card">
                        <h3>Structural (Classic)</h3>
                        <ul>
                            <li><code>*ngIf</code> - Conditionally identify elements</li>
                            <li><code>*ngFor</code> - Loop over a list</li>
                            <li><code>*ngSwitch</code> - Switch between views</li>
                        </ul>
                    </div>
                    <div class="builtin-card modern">
                        <h3>Structural (Modern ✨)</h3>
                        <ul>
                            <li><code>&#64;if</code> - Build-in control flow</li>
                            <li><code>&#64;for</code> - Built-in loop (faster)</li>
                            <li><code>&#64;switch</code> - Built-in switch block</li>
                        </ul>
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
                                <h3>{{ useCase.title }}</h3>
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
        
        .header { text-align: center; margin-bottom: 3rem; }
        .header h1 { font-size: 2.5rem; color: #1a1a2e; margin-bottom: 0.5rem; }
        .subtitle { color: #666; font-size: 1.2rem; }

        .directive-types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .type-card { background: white; padding: 1.5rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .type-card .icon { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
        .type-card h3 { margin: 0 0 0.5rem 0; color: #1a1a2e; }
        .type-card p { color: #666; margin: 0 0 1rem 0; font-size: 0.9rem; }
        .type-card code { background: #f8f9fa; padding: 0.5rem; border-radius: 4px; font-size: 0.8rem; display: block; }
        .type-card.component { border-top: 4px solid #667eea; }
        .type-card.attribute { border-top: 4px solid #4ade80; }
        .type-card.structural { border-top: 4px solid #f59e0b; }

        .builtin-directives { margin-bottom: 3rem; }
        .builtin-directives h2 { color: #1a1a2e; margin-bottom: 1.5rem; text-align: center; }
        .builtin-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .builtin-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #667eea; }
        .builtin-card.modern { border-left-color: #f43f5e; background: #fff1f2; }
        .builtin-card h3 { margin-top: 0; color: #1a1a2e; border-bottom: 2px solid #f0f0f0; padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .builtin-card ul { padding-left: 1.2rem; margin: 0; color: #555; }
        .builtin-card li { margin-bottom: 0.5rem; }
        .builtin-card code { background: #e0e7ff; color: #4338ca; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9rem; }
        .builtin-card.modern code { background: #ffe4e6; color: #be123c; }

        .use-cases h2 { color: #1a1a2e; margin-bottom: 1.5rem; }
        .use-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem; }
        .use-case-card { display: flex; align-items: flex-start; gap: 1rem; background: #f8f9fa; padding: 1.25rem; border-radius: 10px; text-decoration: none; transition: all 0.2s; }
        .use-case-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .use-case-card .number { background: linear-gradient(135deg, #667eea, #764ba2); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
        .use-case-card .content { flex: 1; }
        .use-case-card h3 { margin: 0 0 0.25rem 0; color: #1a1a2e; font-size: 1rem; }
        .use-case-card p { margin: 0 0 0.5rem 0; color: #666; font-size: 0.85rem; }
        .tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
        .tag { background: #e0e7ff; color: #667eea; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }
    `]
})
export class DirectivesOverviewComponent {
    useCases = [
        {
            id: 1, path: 'use-case-1',
            title: 'Basic Attribute Directives',
            description: 'Create simple directives that change element appearance',
            tags: ['appHighlight', 'appTooltip', 'Renderer2']
        },
        {
            id: 2, path: 'use-case-2',
            title: 'Directive with @Input',
            description: 'Pass data to directives for dynamic behavior',
            tags: ['@Input', 'dynamic styling', 'configuration']
        },
        {
            id: 3, path: 'use-case-3',
            title: '@HostListener in Directives',
            description: 'Listen to events on the host element',
            tags: ['@HostListener', 'click', 'hover', 'events']
        },
        {
            id: 4, path: 'use-case-4',
            title: '@HostBinding in Directives',
            description: 'Bind to host element properties',
            tags: ['@HostBinding', 'class', 'style', 'disabled']
        },
        {
            id: 5, path: 'use-case-5',
            title: 'Structural Directive Basics',
            description: 'Understand how *ngIf and *ngFor work internally',
            tags: ['TemplateRef', 'ViewContainerRef', '*appIf']
        },
        {
            id: 6, path: 'use-case-6',
            title: 'Custom Structural Directives',
            description: 'Build custom structural directives like *appRepeat',
            tags: ['*appRepeat', '*appLet', 'context']
        },
        {
            id: 7, path: 'use-case-7',
            title: 'Directive Composition',
            description: 'Combine multiple directives for complex behavior',
            tags: ['hostDirectives', 'composition', 'DRY']
        },
        {
            id: 8, path: 'use-case-8',
            title: 'Real-world Directives',
            description: 'Production-ready patterns and best practices',
            tags: ['*appPermission', 'lazyLoad', 'infiniteScroll']
        }
    ];
}
