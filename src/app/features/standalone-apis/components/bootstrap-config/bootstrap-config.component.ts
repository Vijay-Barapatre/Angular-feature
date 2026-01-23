/**
 * ============================================================================
 * BOOTSTRAP APPLICATION & APP.CONFIG.TS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bootstrap-config',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>⚡ bootstrapApplication</h1>
                <p class="subtitle">Modern App Bootstrapping</p>
            </header>

            <section class="comparison-section">
                <h2>Old vs New Bootstrapping</h2>
                <div class="comparison">
                    <div class="old">
                        <h3>❌ main.ts (NgModule)</h3>
                        <pre><code>import {{ '{' }} platformBrowserDynamic {{ '}' }} from
  '&#64;angular/platform-browser-dynamic';
import {{ '{' }} AppModule {{ '}' }} from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule);</code></pre>
                    </div>
                    <div class="new">
                        <h3>✅ main.ts (Standalone)</h3>
                        <pre><code>import {{ '{' }} bootstrapApplication {{ '}' }} from
  '&#64;angular/platform-browser';
import {{ '{' }} AppComponent {{ '}' }} from './app/app.component';
import {{ '{' }} appConfig {{ '}' }} from './app/app.config';

bootstrapApplication(AppComponent, appConfig);</code></pre>
                    </div>
                </div>
            </section>

            <section class="config-section">
                <h2>📄 app.config.ts Structure</h2>
                <pre class="code-block"><code>import {{ '{' }} ApplicationConfig {{ '}' }} from '&#64;angular/core';
import {{ '{' }} provideRouter {{ '}' }} from '&#64;angular/router';
import {{ '{' }} provideHttpClient {{ '}' }} from '&#64;angular/common/http';
import {{ '{' }} provideAnimations {{ '}' }} from '&#64;angular/platform-browser/animations';
import {{ '{' }} routes {{ '}' }} from './app.routes';

export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // Add more providers here
  ]
{{ '}' }};</code></pre>
            </section>

            <section class="benefits-section">
                <h2>✨ Benefits</h2>
                <div class="benefit-grid">
                    <div class="benefit">
                        <span class="icon">🌳</span>
                        <h4>Tree-shakable</h4>
                        <p>Only include what you use</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">📦</span>
                        <h4>Smaller bundles</h4>
                        <p>No NgModule overhead</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">🎯</span>
                        <h4>Explicit</h4>
                        <p>Clear dependency graph</p>
                    </div>
                    <div class="benefit">
                        <span class="icon">🔧</span>
                        <h4>Composable</h4>
                        <p>Functional configuration</p>
                    </div>
                </div>
            </section>

            <section class="your-config">
                <h2>📁 Your Project's app.config.ts</h2>
                <p>Check <code>src/app/app.config.ts</code> in this project!</p>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem; }
        .old, .new { border-radius: 10px; overflow: hidden; }
        .old h3, .new h3 { margin: 0; padding: 0.75rem 1rem; font-size: 0.9rem; }
        .old h3 { background: #fee2e2; color: #dc2626; }
        .new h3 { background: #dcfce7; color: #16a34a; }
        .old pre, .new pre { margin: 0; padding: 1rem; background: #1e1e2e; }
        .old code, .new code { color: #a6e3a1; font-size: 0.75rem; }

        .config-section { margin: 2rem 0; }
        .code-block {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
        }

        .benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
        .benefit {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.25rem; border-radius: 10px; text-align: center;
        }
        .benefit .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .benefit h4 { margin: 0 0 0.25rem 0; }
        .benefit p { margin: 0; font-size: 0.85rem; color: var(--text-secondary); }

        .your-config {
            background: linear-gradient(135deg, #667eea20, #764ba220);
            padding: 1.5rem; border-radius: 10px; text-align: center;
        }
        .your-config code { background: rgba(0,0,0,0.1); padding: 0.2rem 0.5rem; border-radius: 4px; }
    `]
})
export class BootstrapConfigComponent { }
