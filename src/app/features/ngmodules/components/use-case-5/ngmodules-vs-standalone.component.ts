/**
 * ============================================================================
 * USE CASE 5: NGMODULES VS STANDALONE
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ngmodules-vs-standalone',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>⚖️ NgModules vs Standalone</h1>
                <p class="subtitle">Understanding Both Approaches</p>
            </header>

            <section class="comparison-section">
                <h2>Side-by-Side Comparison</h2>
                <div class="comparison-grid">
                    <div class="approach ngmodules">
                        <h3>📦 NgModules</h3>
                        <pre class="code"><code>// user.component.ts
&#64;Component({{ '{' }}
  selector: 'app-user'
{{ '}' }})
export class UserComponent {{ '{' }} {{ '}' }}

// user.module.ts
&#64;NgModule({{ '{' }}
  declarations: [UserComponent],
  imports: [CommonModule],
  exports: [UserComponent]
{{ '}' }})
export class UserModule {{ '{' }} {{ '}' }}</code></pre>
                    </div>
                    <div class="approach standalone">
                        <h3>🧩 Standalone</h3>
                        <pre class="code"><code>// user.component.ts
&#64;Component({{ '{' }}
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule]
{{ '}' }})
export class UserComponent {{ '{' }} {{ '}' }}

// No module needed!</code></pre>
                    </div>
                </div>
            </section>

            <section class="bootstrap-section">
                <h2>🚀 Bootstrapping</h2>
                <div class="comparison-grid">
                    <div class="approach ngmodules">
                        <h3>NgModule-based</h3>
                        <pre class="code"><code>// main.ts
platformBrowserDynamic()
  .bootstrapModule(AppModule);

// app.module.ts
&#64;NgModule({{ '{' }}
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
{{ '}' }})
export class AppModule {{ '{' }} {{ '}' }}</code></pre>
                    </div>
                    <div class="approach standalone">
                        <h3>Standalone</h3>
                        <pre class="code"><code>// main.ts
bootstrapApplication(AppComponent, {{ '{' }}
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
{{ '}' }});

// app.config.ts
export const appConfig = {{ '{' }}
  providers: [...]
{{ '}' }};</code></pre>
                    </div>
                </div>
            </section>

            <section class="pros-cons">
                <h2>✨ Pros & Cons</h2>
                <table>
                    <tr>
                        <th></th>
                        <th>NgModules</th>
                        <th>Standalone</th>
                    </tr>
                    <tr>
                        <td>Boilerplate</td>
                        <td>❌ More files</td>
                        <td>✅ Less code</td>
                    </tr>
                    <tr>
                        <td>Learning curve</td>
                        <td>❌ Module system</td>
                        <td>✅ Simpler mental model</td>
                    </tr>
                    <tr>
                        <td>Tree-shaking</td>
                        <td>⚠️ Module-level</td>
                        <td>✅ Component-level</td>
                    </tr>
                    <tr>
                        <td>Legacy support</td>
                        <td>✅ Full ecosystem</td>
                        <td>⚠️ Growing</td>
                    </tr>
                    <tr>
                        <td>Lazy loading</td>
                        <td>loadChildren → Module</td>
                        <td>loadComponent / loadChildren</td>
                    </tr>
                </table>
            </section>

            <section class="when-section">
                <h2>🎯 When to Use What?</h2>
                <div class="when-grid">
                    <div class="when">
                        <h4>Use Standalone When:</h4>
                        <ul>
                            <li>✅ Starting new Angular 15+ project</li>
                            <li>✅ Building reusable components</li>
                            <li>✅ Want simpler architecture</li>
                            <li>✅ Migrating incrementally</li>
                        </ul>
                    </div>
                    <div class="when">
                        <h4>Keep NgModules When:</h4>
                        <ul>
                            <li>📦 Large existing codebase</li>
                            <li>📦 Using libraries that require modules</li>
                            <li>📦 Team familiar with modules</li>
                            <li>📦 Complex provider configurations</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="migration-section">
                <h2>🔄 Migration Path</h2>
                <div class="migration-steps">
                    <div class="step">
                        <span class="num">1</span>
                        <p>Add <code>standalone: true</code> to components</p>
                    </div>
                    <div class="step">
                        <span class="num">2</span>
                        <p>Move imports from module to component</p>
                    </div>
                    <div class="step">
                        <span class="num">3</span>
                        <p>Remove from module declarations</p>
                    </div>
                    <div class="step">
                        <span class="num">4</span>
                        <p>Eventually remove empty modules</p>
                    </div>
                </div>
                <pre class="code"><code>// Angular CLI schematic
ng generate &#64;angular/core:standalone</code></pre>
            </section>

            <section class="future-section">
                <h2>🔮 The Future</h2>
                <p class="highlight">
                    Standalone is the <strong>recommended approach</strong> for new Angular apps.
                    NgModules remain supported for backwards compatibility.
                </p>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .approach { padding: 1rem; border-radius: 10px; }
        .approach.ngmodules { background: #fef3c7; }
        .approach.standalone { background: #dcfce7; }
        .approach h3 { margin: 0 0 0.75rem; font-size: 1rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }

        .when-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .when { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; }
        .when h4 { margin: 0 0 0.5rem; }
        .when ul { margin: 0; padding-left: 1.25rem; font-size: 0.85rem; }

        .migration-steps { display: flex; gap: 1rem; margin: 1rem 0; }
        .step { flex: 1; background: var(--bg-secondary); padding: 1rem; border-radius: 8px; text-align: center; }
        .step .num { display: inline-block; width: 24px; height: 24px; background: var(--primary-color, #667eea); color: white; border-radius: 50%; line-height: 24px; margin-bottom: 0.5rem; }
        .step p { margin: 0; font-size: 0.8rem; }
        .step code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }

        .highlight { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 10px; text-align: center; }
    `]
})
export class NgModulesVsStandaloneComponent { }
