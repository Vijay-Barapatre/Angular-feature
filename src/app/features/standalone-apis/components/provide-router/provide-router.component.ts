/**
 * ============================================================================
 * PROVIDE ROUTER
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-provide-router',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🛤️ provideRouter</h1>
                <p class="subtitle">Functional Routing Configuration</p>
            </header>

            <section class="basic-section">
                <h2>Basic Usage</h2>
                <pre class="code"><code>import {{ '{' }} provideRouter {{ '}' }} from '&#64;angular/router';
import {{ '{' }} routes {{ '}' }} from './app.routes';

export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideRouter(routes)
  ]
{{ '}' }};</code></pre>
            </section>

            <section class="features-section">
                <h2>🔧 Router Features</h2>
                <div class="feature-grid">
                    <div class="feature">
                        <h3>withPreloading</h3>
                        <code>withPreloading(PreloadAllModules)</code>
                        <p>Preload lazy routes</p>
                    </div>
                    <div class="feature">
                        <h3>withComponentInputBinding</h3>
                        <code>withComponentInputBinding()</code>
                        <p>Bind route params to inputs</p>
                    </div>
                    <div class="feature">
                        <h3>withHashLocation</h3>
                        <code>withHashLocation()</code>
                        <p>Use hash-based routing</p>
                    </div>
                    <div class="feature">
                        <h3>withDebugTracing</h3>
                        <code>withDebugTracing()</code>
                        <p>Debug route events</p>
                    </div>
                    <div class="feature">
                        <h3>withRouterConfig</h3>
                        <code>withRouterConfig({{ '{' }}...{{ '}' }})</code>
                        <p>Advanced configuration</p>
                    </div>
                    <div class="feature">
                        <h3>withViewTransitions</h3>
                        <code>withViewTransitions()</code>
                        <p>Page transition animations</p>
                    </div>
                </div>
            </section>

            <section class="example-section">
                <h2>📝 Full Example</h2>
                <pre class="code"><code>import {{ '{' }} 
  provideRouter,
  withPreloading,
  withComponentInputBinding,
  withViewTransitions,
  PreloadAllModules
{{ '}' }} from '&#64;angular/router';

provideRouter(
  routes,
  withPreloading(PreloadAllModules),
  withComponentInputBinding(),    // route params → &#64;Input()
  withViewTransitions()           // smooth page transitions
)</code></pre>
            </section>

            <section class="input-binding">
                <h2>🎯 withComponentInputBinding</h2>
                <p>Route params automatically bind to component inputs!</p>
                <div class="comparison">
                    <div>
                        <h4>Route</h4>
                        <code>{{ '{' }} path: 'user/:id', component: UserComponent {{ '}' }}</code>
                    </div>
                    <div>
                        <h4>Component</h4>
                        <code>&#64;Input() id!: string;  // Auto-bound!</code>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
        }

        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
        .feature {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1rem; border-radius: 8px;
        }
        .feature h3 { margin: 0 0 0.5rem 0; font-size: 0.9rem; color: var(--primary-color); }
        .feature code { display: block; font-size: 0.7rem; background: #1e1e2e; color: #a6e3a1; padding: 0.4rem; border-radius: 4px; margin-bottom: 0.5rem; }
        .feature p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }

        .example-section, .input-binding { margin-top: 2rem; }
        .input-binding { 
            background: linear-gradient(135deg, #10b98120, #14b8a620);
            padding: 1.5rem; border-radius: 10px;
        }
        .comparison { display: flex; gap: 2rem; margin-top: 1rem; }
        .comparison h4 { margin: 0 0 0.5rem 0; font-size: 0.85rem; }
        .comparison code { background: #1e1e2e; color: #a6e3a1; padding: 0.5rem; border-radius: 4px; font-size: 0.8rem; }
    `]
})
export class ProvideRouterComponent { }
