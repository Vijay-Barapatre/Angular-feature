/**
 * ============================================================================
 * MODULE BASICS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-module-basics',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📋 Module Basics</h1>
                <p class="subtitle">declarations, imports, exports, providers</p>
            </header>

            <section class="structure-section">
                <h2>&#64;NgModule Structure</h2>
                <pre class="code"><code>import {{ '{' }} NgModule {{ '}' }} from '&#64;angular/core';
import {{ '{' }} CommonModule {{ '}' }} from '&#64;angular/common';
import {{ '{' }} MyComponent {{ '}' }} from './my.component';
import {{ '{' }} MyDirective {{ '}' }} from './my.directive';
import {{ '{' }} MyPipe {{ '}' }} from './my.pipe';
import {{ '{' }} MyService {{ '}' }} from './my.service';

&#64;NgModule({{ '{' }}
  declarations: [
    MyComponent,     // Components this module owns
    MyDirective,     // Directives this module owns
    MyPipe           // Pipes this module owns
  ],
  imports: [
    CommonModule     // Other modules we need
  ],
  exports: [
    MyComponent      // What we expose to other modules
  ],
  providers: [
    MyService        // Services (usually use providedIn instead)
  ]
{{ '}' }})
export class MyModule {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="properties-section">
                <h2>🔧 Module Properties Explained</h2>
                <div class="property-grid">
                    <div class="property">
                        <h3>declarations</h3>
                        <p class="what">What it contains:</p>
                        <ul>
                            <li>Components</li>
                            <li>Directives</li>
                            <li>Pipes</li>
                        </ul>
                        <p class="rule">⚠️ Each item can only be in ONE module</p>
                    </div>
                    <div class="property">
                        <h3>imports</h3>
                        <p class="what">What we need from outside:</p>
                        <ul>
                            <li>Other NgModules</li>
                            <li>Their exported members</li>
                        </ul>
                        <p class="example">CommonModule, FormsModule, RouterModule</p>
                    </div>
                    <div class="property">
                        <h3>exports</h3>
                        <p class="what">What we share:</p>
                        <ul>
                            <li>Declarations others can use</li>
                            <li>Re-exported modules</li>
                        </ul>
                        <p class="rule">💡 Not exported = private to module</p>
                    </div>
                    <div class="property">
                        <h3>providers</h3>
                        <p class="what">Services for DI:</p>
                        <ul>
                            <li>Available to this module</li>
                            <li>And child modules</li>
                        </ul>
                        <p class="modern">✅ Modern: Use <code>providedIn: 'root'</code> instead</p>
                    </div>
                </div>
            </section>

            <section class="appmodule-section">
                <h2>🏠 The Root AppModule</h2>
                <pre class="code"><code>&#64;NgModule({{ '{' }}
  declarations: [AppComponent],
  imports: [
    BrowserModule,      // Required for browser apps
    AppRoutingModule,   // Routing
    HttpClientModule    // HTTP
  ],
  providers: [],
  bootstrap: [AppComponent]  // Root component to start
{{ '}' }})
export class AppModule {{ '{' }} {{ '}' }}</code></pre>
                <p class="note"><code>bootstrap</code> is only used in the root module!</p>
            </section>

            <section class="common-imports">
                <h2>📦 Common Module Imports</h2>
                <table>
                    <tr><th>Module</th><th>Provides</th></tr>
                    <tr><td>BrowserModule</td><td>Essential browser features (root only)</td></tr>
                    <tr><td>CommonModule</td><td>*ngIf, *ngFor, pipes (feature modules)</td></tr>
                    <tr><td>FormsModule</td><td>Template-driven forms, ngModel</td></tr>
                    <tr><td>ReactiveFormsModule</td><td>Reactive forms</td></tr>
                    <tr><td>HttpClientModule</td><td>HTTP client</td></tr>
                    <tr><td>RouterModule</td><td>Routing</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; font-size: 0.85rem; }

        .property-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .property { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; }
        .property h3 { margin: 0 0 0.5rem; color: var(--primary-color); }
        .property .what { margin: 0 0 0.5rem; font-weight: bold; font-size: 0.85rem; }
        .property ul { margin: 0 0 0.5rem; padding-left: 1.25rem; font-size: 0.85rem; }
        .property .rule, .property .example, .property .modern { font-size: 0.8rem; margin: 0; padding: 0.5rem; background: #e5e7eb; border-radius: 4px; }
        .property .modern code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }

        section { margin-bottom: 2rem; }
        .note { background: #fef3c7; padding: 0.75rem; border-radius: 6px; margin-top: 1rem; }
        .note code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }

        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class ModuleBasicsComponent { }
