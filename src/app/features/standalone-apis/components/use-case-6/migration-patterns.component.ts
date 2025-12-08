/**
 * ============================================================================
 * USE CASE 6: MIGRATION PATTERNS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-migration-patterns',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 Migration Patterns</h1>
                <p class="subtitle">From NgModules to Standalone</p>
            </header>

            <section class="strategy-section">
                <h2>Migration Strategies</h2>
                <div class="strategy-grid">
                    <div class="strategy">
                        <span class="badge">1</span>
                        <h3>Gradual (Recommended)</h3>
                        <p>Add standalone: true to new components. Migrate existing over time.</p>
                    </div>
                    <div class="strategy">
                        <span class="badge">2</span>
                        <h3>Full Migration</h3>
                        <p>Use Angular CLI schematics to migrate entire app at once.</p>
                    </div>
                </div>
            </section>

            <section class="bridge-section">
                <h2>🌉 The Bridge: importProvidersFrom</h2>
                <p>Use NgModule providers in standalone apps:</p>
                <pre class="code"><code>import {{ '{' }} importProvidersFrom {{ '}' }} from '&#64;angular/core';
import {{ '{' }} SomeNgModule {{ '}' }} from 'some-library';

export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideRouter(routes),
    // Import providers from NgModule
    importProvidersFrom(SomeNgModule)
  ]
{{ '}' }};</code></pre>
            </section>

            <section class="cli-section">
                <h2>🛠️ CLI Schematics</h2>
                <div class="cli-commands">
                    <div class="command">
                        <code>ng generate &#64;angular/core:standalone</code>
                        <p>Interactive migration wizard</p>
                    </div>
                    <div class="command">
                        <code>ng g &#64;angular/core:standalone --mode convert-to-standalone</code>
                        <p>Convert components to standalone</p>
                    </div>
                    <div class="command">
                        <code>ng g &#64;angular/core:standalone --mode prune-ng-modules</code>
                        <p>Remove unused NgModules</p>
                    </div>
                </div>
            </section>

            <section class="checklist-section">
                <h2>✅ Migration Checklist</h2>
                <ol>
                    <li>Update Angular to 15+ (14+ minimum)</li>
                    <li>Add <code>standalone: true</code> to components</li>
                    <li>Move declarations to <code>imports</code></li>
                    <li>Use <code>importProvidersFrom</code> for NgModule providers</li>
                    <li>Update <code>main.ts</code> to use <code>bootstrapApplication</code></li>
                    <li>Remove empty NgModules</li>
                </ol>
            </section>

            <section class="tips-section">
                <h2>💡 Tips</h2>
                <ul>
                    <li>Start with leaf components (no children)</li>
                    <li>Material/CDK already support standalone</li>
                    <li>Third-party libs may need <code>importProvidersFrom</code></li>
                    <li>Run CLI schematic for automated help</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .strategy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .strategy { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; position: relative; }
        .strategy .badge {
            position: absolute; top: -10px; left: -10px;
            background: var(--primary-color, #667eea); color: white;
            width: 28px; height: 28px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold;
        }
        .strategy h3 { margin-top: 0; }

        section { margin-bottom: 2rem; }

        .code {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
        }

        .cli-commands { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .command { background: #1e1e2e; padding: 1rem; border-radius: 8px; }
        .command code { display: block; color: #f59e0b; margin-bottom: 0.5rem; }
        .command p { margin: 0; color: #a6e3a1; font-size: 0.85rem; }

        .checklist-section ol { padding-left: 1.5rem; }
        .checklist-section li { margin-bottom: 0.5rem; }
        .checklist-section code { background: #e5e7eb; padding: 0.1rem 0.3rem; border-radius: 4px; }

        .tips-section { 
            background: linear-gradient(135deg, #f59e0b20, #eab30820);
            padding: 1.5rem; border-radius: 10px;
        }
        .tips-section ul { padding-left: 1.5rem; margin-bottom: 0; }
    `]
})
export class MigrationPatternsComponent { }
