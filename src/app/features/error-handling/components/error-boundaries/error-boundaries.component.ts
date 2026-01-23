/**
 * ============================================================================
 * ERROR BOUNDARIES
 * ============================================================================
 */

import { Component, Input, ErrorHandler, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-error-boundaries',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🛡️ Error Boundaries</h1>
                <p class="subtitle">Component-Level Error Isolation</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    Error boundaries prevent a single component's error from crashing the entire app.
                    Unlike React's built-in error boundaries, Angular requires custom implementation
                    using try/catch, error states, and wrapper components.
                </p>
            </section>

            <section class="pattern-section">
                <h2>💻 Error State Pattern</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
    template: &#96;
        &#64;if (error) {{ '{' }}
            &lt;div class="error-state"&gt;
                &lt;h3&gt;⚠️ Something went wrong&lt;/h3&gt;
                &lt;p&gt;{{ '{{' }} error {{ '}}' }}&lt;/p&gt;
                &lt;button (click)="retry()"&gt;Try Again&lt;/button&gt;
            &lt;/div&gt;
        {{ '}' }} &#64;else {{ '{' }}
            &lt;!-- Normal content --&gt;
            &#64;for (item of items(); track item.id) {{ '{' }}
                &lt;app-item [data]="item"&gt;&lt;/app-item&gt;
            {{ '}' }}
        {{ '}' }}
    &#96;
{{ '}' }})
export class ListComponent {{ '{' }}
    items = signal&lt;Item[]&gt;([]);
    error: string | null = null;
    
    loadItems() {{ '{' }}
        this.dataService.getItems().subscribe({{ '{' }}
            next: items => this.items.set(items),
            error: err => this.error = err.message
        {{ '}' }});
    {{ '}' }}
    
    retry() {{ '{' }}
        this.error = null;
        this.loadItems();
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="wrapper-section">
                <h2>💻 Error Boundary Wrapper</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
    selector: 'app-error-boundary',
    template: &#96;
        &#64;if (hasError) {{ '{' }}
            &lt;div class="error-boundary"&gt;
                &lt;ng-content select="[error-fallback]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
        {{ '}' }} &#64;else {{ '{' }}
            &lt;ng-content&gt;&lt;/ng-content&gt;
        {{ '}' }}
    &#96;
{{ '}' }})
export class ErrorBoundaryComponent {{ '{' }}
    &#64;Input() hasError = false;
{{ '}' }}

// Usage
&lt;app-error-boundary [hasError]="loadFailed"&gt;
    &lt;app-dashboard&gt;&lt;/app-dashboard&gt;
    
    &lt;div error-fallback&gt;
        &lt;h3&gt;Dashboard unavailable&lt;/h3&gt;
        &lt;button (click)="reload()"&gt;Reload&lt;/button&gt;
    &lt;/div&gt;
&lt;/app-error-boundary&gt;</code></pre>
            </section>

            <section class="async-section">
                <h2>💻 Async Pipe Error Handling</h2>
                <pre class="code"><code>// Component
users$ = this.userService.getUsers().pipe(
    catchError(error => {{ '{' }}
        this.error = error.message;
        return of([]); // Return empty array as fallback
    {{ '}' }})
);

// Template
&#64;if (error) {{ '{' }}
    &lt;app-error-message [message]="error"&gt;&lt;/app-error-message&gt;
{{ '}' }} &#64;else {{ '{' }}
    &#64;for (user of users$ | async; track user.id) {{ '{' }}
        &lt;app-user-card [user]="user"&gt;&lt;/app-user-card&gt;
    {{ '}' }} &#64;empty {{ '{' }}
        &lt;p&gt;No users found&lt;/p&gt;
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-box">
                    <div class="demo-grid">
                        <div class="widget" [class.error]="widget1Error">
                            @if (widget1Error) {
                                <div class="error-state">
                                    <span>⚠️</span>
                                    <p>Widget 1 Failed</p>
                                    <button (click)="widget1Error = false">Retry</button>
                                </div>
                            } @else {
                                <h4>Widget 1</h4>
                                <p>Working normally</p>
                                <button (click)="widget1Error = true">Simulate Error</button>
                            }
                        </div>
                        
                        <div class="widget" [class.error]="widget2Error">
                            @if (widget2Error) {
                                <div class="error-state">
                                    <span>⚠️</span>
                                    <p>Widget 2 Failed</p>
                                    <button (click)="widget2Error = false">Retry</button>
                                </div>
                            } @else {
                                <h4>Widget 2</h4>
                                <p>Working normally</p>
                                <button (click)="widget2Error = true">Simulate Error</button>
                            }
                        </div>
                        
                        <div class="widget">
                            <h4>Widget 3</h4>
                            <p>Always working! (Not affected by errors in other widgets)</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Track error state at component level</li>
                    <li>Provide retry mechanism for users</li>
                    <li>Use catchError to prevent Observable errors from propagating</li>
                    <li>Show meaningful fallback UI</li>
                    <li>Isolate critical components from each other</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #ef4444; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        .demo-box { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; }
        .demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .widget { background: white; padding: 1.25rem; border-radius: 8px; text-align: center; transition: all 0.3s; }
        .widget h4 { margin: 0 0 0.5rem; color: #22c55e; }
        .widget.error { background: #fef2f2; border: 1px solid #ef4444; }
        .widget.error h4 { color: #ef4444; }
        .widget button { margin-top: 0.75rem; padding: 0.4rem 0.75rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
        
        .error-state { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .error-state span { font-size: 2rem; }
        .error-state p { margin: 0; color: #ef4444; font-weight: 500; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class ErrorBoundariesComponent {
    widget1Error = false;
    widget2Error = false;
}
