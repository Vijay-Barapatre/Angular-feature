/**
 * ============================================================================
 * USE CASE 3: SHARED MODULES
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-shared-modules',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 Shared Modules</h1>
                <p class="subtitle">Reusable Components Across Features</p>
            </header>

            <section class="problem-section">
                <h2>The Problem</h2>
                <p>
                    You have common components (buttons, cards, modals) needed across 
                    multiple feature modules. Without a SharedModule, you'd have to 
                    import each component individually everywhere.
                </p>
            </section>

            <section class="solution-section">
                <h2>✅ The Solution: SharedModule</h2>
                <pre class="code"><code>// shared.module.ts
&#64;NgModule({{ '{' }}
  declarations: [
    ButtonComponent,
    CardComponent,
    ModalComponent,
    HighlightDirective,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    // Export what other modules need
    CommonModule,        // Re-export for convenience
    FormsModule,         // Re-export for convenience
    ButtonComponent,
    CardComponent,
    ModalComponent,
    HighlightDirective,
    TruncatePipe
  ]
{{ '}' }})
export class SharedModule {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="usage-section">
                <h2>📦 Using the SharedModule</h2>
                <pre class="code"><code>// Any feature module
&#64;NgModule({{ '{' }}
  declarations: [
    DashboardComponent,
    ReportsComponent
  ],
  imports: [
    SharedModule  // One import = all shared components!
  ]
{{ '}' }})
export class AdminModule {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="pattern-section">
                <h2>🎯 What Goes in SharedModule?</h2>
                <div class="pattern-grid">
                    <div class="include">
                        <h3>✅ Include</h3>
                        <ul>
                            <li>UI components (buttons, cards, modals)</li>
                            <li>Common directives</li>
                            <li>Common pipes</li>
                            <li>Re-exports of CommonModule, FormsModule</li>
                        </ul>
                    </div>
                    <div class="exclude">
                        <h3>❌ Don't Include</h3>
                        <ul>
                            <li>Singleton services (use providedIn: 'root')</li>
                            <li>Feature-specific components</li>
                            <li>App-wide providers</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="coremodule-section">
                <h2>🏠 CoreModule (Bonus Pattern)</h2>
                <pre class="code"><code>// core.module.ts - Import ONCE in AppModule
&#64;NgModule({{ '{' }}
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavComponent
  ]
{{ '}' }})
export class CoreModule {{ '{' }}
  // Prevent re-import
  constructor(&#64;Optional() &#64;SkipSelf() parent: CoreModule) {{ '{' }}
    if (parent) {{ '{' }}
      throw new Error('CoreModule already loaded!');
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
                <p class="note">CoreModule = app-wide singletons, import only in AppModule</p>
            </section>

            <section class="summary">
                <h2>📊 SharedModule vs CoreModule</h2>
                <table>
                    <tr><th></th><th>SharedModule</th><th>CoreModule</th></tr>
                    <tr><td>Import in</td><td>Many feature modules</td><td>Only AppModule</td></tr>
                    <tr><td>Contains</td><td>Reusable UI</td><td>App-wide singletons</td></tr>
                    <tr><td>Providers</td><td>No services</td><td>Singleton services</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; font-size: 0.85rem; }

        section { margin-bottom: 2rem; }

        .pattern-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .include, .exclude { padding: 1.5rem; border-radius: 10px; }
        .include { background: #dcfce7; }
        .exclude { background: #fee2e2; }
        .include h3, .exclude h3 { margin-top: 0; font-size: 1rem; }
        .include ul, .exclude ul { margin: 0; padding-left: 1.25rem; }

        .note { background: #fef3c7; padding: 0.75rem; border-radius: 6px; margin-top: 1rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class SharedModulesComponent { }
