/**
 * Resolution Modifiers
 * 
 * Demonstrates decorators that control how Angular resolves dependencies:
 * - @Optional() - Don't throw if dependency not found
 * - @Self() - Only look in current injector
 * - @SkipSelf() - Skip current injector, look in parent
 * - @Host() - Stop at host element boundary
 */

import { Component, Injectable, Optional, Self, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * A simple service we'll use to demonstrate resolution modifiers
 */
@Injectable()
export class ModifierDemoService {
    readonly id: string;

    constructor() {
        this.id = Math.random().toString(36).substring(2, 6).toUpperCase();
        console.log(`[ModifierDemoService] Created: ${this.id}`);
    }
}

/**
 * Optional service that might not be provided
 */
@Injectable()
export class OptionalService {
    getMessage(): string {
        return 'Optional service is available!';
    }
}

@Component({
    selector: 'app-use-case-6-child',
    standalone: true,
    template: `
        <div class="child-panel">
            <div class="panel-header">
                <span class="icon">👶</span>
                <h4>Child Component</h4>
            </div>
            <div class="panel-body">
                <div class="modifier-demo">
                    <div class="demo-item">
                        <h5>&#64;SkipSelf() Service ID:</h5>
                        <code>{{ skipSelfService?.id || 'NOT FOUND' }}</code>
                        <p class="hint">Skipped own provider, got parent's instance</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .child-panel { background: var(--bg-card); border-radius: var(--radius-md); margin-top: var(--spacing-lg); border: 1px solid var(--primary-color); }
        .panel-header { display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-md); background: var(--primary-color); }
        .panel-header .icon { font-size: 1.25rem; }
        .panel-header h4 { margin: 0; font-size: 1rem; }
        .panel-body { padding: var(--spacing-md); }
        .demo-item { margin-bottom: var(--spacing-md); }
        .demo-item h5 { margin-bottom: var(--spacing-xs); font-size: 0.875rem; color: var(--text-secondary); }
        .demo-item code { background: var(--bg-secondary); padding: 4px 8px; border-radius: 4px; font-family: monospace; color: var(--primary-light); }
        .hint { font-size: 0.75rem; color: var(--text-muted); margin-top: var(--spacing-xs); }
    `],
    providers: [ModifierDemoService] // Child has its own provider
})
export class UseCase6ChildComponent {
    /**
     * @SkipSelf() tells Angular to skip this component's injector
     * and look for the service in parent injectors instead.
     */
    constructor(
        @SkipSelf() @Optional() public skipSelfService: ModifierDemoService | null
    ) {
        console.log('[Child] @SkipSelf service:', this.skipSelfService?.id);
    }
}

@Component({
    selector: 'app-use-case-6-parent',
    standalone: true,
    imports: [CommonModule, RouterLink, UseCase6ChildComponent],
    providers: [ModifierDemoService], // Parent provides the service
    template: `
        <div class="use-case-container fade-in">
            <div class="page-header">
                <a routerLink="/services-di" class="back-link">← Back to Overview</a>
                <h1>🎯 Resolution Modifiers</h1>
                <p class="header-description">
                    Control how Angular looks up dependencies with &#64;Optional, &#64;Self, &#64;SkipSelf, and &#64;Host.
                </p>
            </div>

            <section class="modifiers-section">
                <h2>📚 Resolution Modifiers</h2>
                
                <div class="modifiers-grid">
                    <div class="modifier-card optional">
                        <div class="card-header">
                            <span class="icon">❓</span>
                            <h3>&#64;Optional()</h3>
                        </div>
                        <p class="description">Don't throw error if dependency is not found. Returns null instead.</p>
                        <pre><code>constructor(
  &#64;Optional() svc: MyService
) &#123;
  // svc is null if not provided
&#125;</code></pre>
                    </div>

                    <div class="modifier-card self">
                        <div class="card-header">
                            <span class="icon">📍</span>
                            <h3>&#64;Self()</h3>
                        </div>
                        <p class="description">Only look in the current component's injector. Don't climb up.</p>
                        <pre><code>constructor(
  &#64;Self() svc: MyService
) &#123;
  // Error if not in THIS component
&#125;</code></pre>
                    </div>

                    <div class="modifier-card skipself">
                        <div class="card-header">
                            <span class="icon">⬆️</span>
                            <h3>&#64;SkipSelf()</h3>
                        </div>
                        <p class="description">Skip current injector, start looking from parent.</p>
                        <pre><code>constructor(
  &#64;SkipSelf() svc: MyService
) &#123;
  // Gets parent's instance
&#125;</code></pre>
                    </div>

                    <div class="modifier-card host">
                        <div class="card-header">
                            <span class="icon">🏠</span>
                            <h3>&#64;Host()</h3>
                        </div>
                        <p class="description">Stop searching at the host element boundary.</p>
                        <pre><code>constructor(
  &#64;Host() svc: MyService
) &#123;
  // For directives, stops at host
&#125;</code></pre>
                    </div>
                </div>
            </section>

            <section class="demo-section">
                <h2>🧪 Live Demo</h2>
                
                <div class="demo-panel">
                    <div class="panel-header">
                        <span class="icon">👨‍💼</span>
                        <h3>Parent Component</h3>
                    </div>
                    <div class="panel-body">
                        <div class="demo-row">
                            <div class="demo-item">
                                <h5>&#64;Self() Service ID:</h5>
                                <code>{{ selfService.id || 'NOT FOUND' }}</code>
                                <p class="hint">Must be provided in THIS component</p>
                            </div>
                            <div class="demo-item">
                                <h5>&#64;Optional() Service:</h5>
                                <code>{{ optionalService?.getMessage() || 'null (not provided)' }}</code>
                                <p class="hint">Returns null instead of throwing</p>
                            </div>
                        </div>
                        
                        <app-use-case-6-child></app-use-case-6-child>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .use-case-container { max-width: 1100px; margin: 0 auto; }
        .page-header { text-align: center; margin-bottom: var(--spacing-2xl); }
        .back-link { display: inline-block; color: var(--primary-light); text-decoration: none; margin-bottom: var(--spacing-md); }
        .back-link:hover { color: var(--accent-color); }
        .page-header h1 { font-size: 2.25rem; margin-bottom: var(--spacing-md); }
        .header-description { font-size: 1.125rem; color: var(--text-secondary); max-width: 700px; margin: 0 auto; }
        section { margin-bottom: var(--spacing-2xl); }
        section h2 { font-size: 1.75rem; margin-bottom: var(--spacing-xl); border-left: 4px solid var(--primary-color); padding-left: var(--spacing-lg); }
        
        .modifiers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); }
        .modifier-card { background: var(--bg-secondary); border-radius: var(--radius-lg); overflow: hidden; }
        .modifier-card .card-header { display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-md); }
        .modifier-card.optional .card-header { background: var(--warning); color: var(--bg-primary); }
        .modifier-card.self .card-header { background: var(--error); }
        .modifier-card.skipself .card-header { background: var(--primary-color); }
        .modifier-card.host .card-header { background: var(--accent-color); color: var(--bg-primary); }
        .modifier-card .icon { font-size: 1.25rem; }
        .modifier-card h3 { margin: 0; font-size: 1rem; }
        .modifier-card .description { padding: var(--spacing-md); color: var(--text-secondary); font-size: 0.875rem; margin: 0; }
        .modifier-card pre { margin: 0; padding: var(--spacing-md); background: var(--bg-card); }
        .modifier-card code { font-family: monospace; font-size: 0.75rem; line-height: 1.5; }
        
        .demo-panel { background: var(--bg-secondary); border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--primary-color); }
        .demo-panel > .panel-header { display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-lg); background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); }
        .demo-panel > .panel-header .icon { font-size: 1.5rem; }
        .demo-panel > .panel-header h3 { margin: 0; }
        .demo-panel > .panel-body { padding: var(--spacing-xl); }
        .demo-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); }
        .demo-item { background: var(--bg-card); padding: var(--spacing-md); border-radius: var(--radius-md); }
        .demo-item h5 { margin: 0 0 var(--spacing-sm) 0; font-size: 0.875rem; color: var(--text-secondary); }
        .demo-item code { background: var(--bg-secondary); padding: 4px 8px; border-radius: 4px; font-family: monospace; color: var(--primary-light); }
        .hint { font-size: 0.75rem; color: var(--text-muted); margin-top: var(--spacing-sm); }
    `]
})
export class UseCase6ParentComponent {
    constructor(
        @Self() public selfService: ModifierDemoService,
        @Optional() public optionalService: OptionalService | null
    ) {
        console.log('[Parent] @Self service:', this.selfService.id);
        console.log('[Parent] @Optional service:', this.optionalService);
    }
}
