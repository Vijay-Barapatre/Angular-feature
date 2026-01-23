/**
 * ============================================================================
 * PROVIDERS AND DEPENDENCY INJECTION
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-providers-di',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>💉 Providers &amp; DI</h1>
                <p class="subtitle">How Services are Provided in NgModules</p>
            </header>

            <section class="ways-section">
                <h2>3 Ways to Provide Services</h2>
                <div class="ways-grid">
                    <div class="way recommended">
                        <h3>✅ providedIn: 'root'</h3>
                        <p class="badge">Recommended</p>
                        <pre class="code"><code>&#64;Injectable({{ '{' }}
  providedIn: 'root'
{{ '}' }})
export class UserService {{ '{' }} {{ '}' }}</code></pre>
                        <ul>
                            <li>Singleton across entire app</li>
                            <li>Tree-shakable</li>
                            <li>No module import needed</li>
                        </ul>
                    </div>
                    <div class="way">
                        <h3>📦 Module providers</h3>
                        <p class="badge">Legacy</p>
                        <pre class="code"><code>&#64;NgModule({{ '{' }}
  providers: [UserService]
{{ '}' }})
export class AppModule {{ '{' }} {{ '}' }}</code></pre>
                        <ul>
                            <li>⚠️ NOT tree-shakable</li>
                            <li>Scope depends on where imported</li>
                        </ul>
                    </div>
                    <div class="way">
                        <h3>🧩 Component providers</h3>
                        <p class="badge">Use case specific</p>
                        <pre class="code"><code>&#64;Component({{ '{' }}
  providers: [UserService]
{{ '}' }})
export class UserComponent {{ '{' }} {{ '}' }}</code></pre>
                        <ul>
                            <li>New instance per component</li>
                            <li>Scoped to component tree</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="hierarchical-section">
                <h2>🌳 Hierarchical Injection</h2>
                <div class="hierarchy-visual">
                    <div class="level root">
                        <code>Root Injector</code>
                        <span>providedIn: 'root'</span>
                    </div>
                    <div class="arrow">↓</div>
                    <div class="level module">
                        <code>Module Injector</code>
                        <span>Lazy-loaded modules</span>
                    </div>
                    <div class="arrow">↓</div>
                    <div class="level component">
                        <code>Element Injector</code>
                        <span>Component providers</span>
                    </div>
                </div>
                <p class="note">Angular walks UP the tree to find providers</p>
            </section>

            <section class="lazy-module-section">
                <h2>⚠️ Lazy Module Service Gotcha</h2>
                <pre class="code"><code>// In a lazy-loaded module
&#64;NgModule({{ '{' }}
  providers: [DataService]  // Creates separate instance!
{{ '}' }})
export class AdminModule {{ '{' }} {{ '}' }}

// Better: Use providedIn
&#64;Injectable({{ '{' }}
  providedIn: 'root'  // Same instance everywhere
{{ '}' }})
export class DataService {{ '{' }} {{ '}' }}</code></pre>
                <div class="warning">
                    Services in lazy module providers get their own instance!
                </div>
            </section>

            <section class="forroot-section">
                <h2>🔧 forRoot / forChild Pattern</h2>
                <pre class="code"><code>&#64;NgModule({{ '{' }}{{ '}' }})
export class MyModule {{ '{' }}
  // Use in AppModule - provides singleton services
  static forRoot(config: Config): ModuleWithProviders&lt;MyModule&gt; {{ '{' }}
    return {{ '{' }}
      ngModule: MyModule,
      providers: [
        MyService,
        {{ '{' }} provide: CONFIG, useValue: config {{ '}' }}
      ]
    {{ '}' }};
  {{ '}' }}

  // Use in feature modules - no providers
  static forChild(): ModuleWithProviders&lt;MyModule&gt; {{ '{' }}
    return {{ '{' }}
      ngModule: MyModule,
      providers: []  // No services, just module
    {{ '}' }};
  {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="injection-tokens">
                <h2>🎫 Injection Tokens</h2>
                <pre class="code"><code>// Define token
export const API_URL = new InjectionToken&lt;string&gt;('API URL');

// Provide in module
providers: [
  {{ '{' }} provide: API_URL, useValue: 'https://api.example.com' {{ '}' }}
]

// Inject in service
constructor(&#64;Inject(API_URL) private apiUrl: string) {{ '{' }} {{ '}' }}</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.8rem; margin: 0.5rem 0; }

        section { margin-bottom: 2rem; }

        .ways-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .way { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; }
        .way.recommended { border: 2px solid #22c55e; }
        .way h3 { margin: 0 0 0.25rem; font-size: 0.95rem; }
        .way .badge { margin: 0 0 0.5rem; font-size: 0.7rem; color: var(--text-secondary); }
        .way ul { margin: 0.5rem 0 0; padding-left: 1rem; font-size: 0.75rem; }

        .hierarchy-visual { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin: 1rem 0; }
        .level { padding: 1rem 2rem; border-radius: 8px; text-align: center; }
        .level.root { background: #dcfce7; }
        .level.module { background: #dbeafe; }
        .level.component { background: #fef3c7; }
        .level code { display: block; font-weight: bold; }
        .level span { font-size: 0.8rem; color: var(--text-secondary); }
        .arrow { font-size: 1.5rem; color: var(--text-secondary); }

        .note { background: #e5e7eb; padding: 0.75rem; border-radius: 6px; text-align: center; }
        .warning { background: #fee2e2; padding: 0.75rem; border-radius: 6px; margin-top: 1rem; }
    `]
})
export class ProvidersDIComponent { }
