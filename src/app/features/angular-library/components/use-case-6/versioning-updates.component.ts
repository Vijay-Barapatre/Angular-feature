/**
 * ============================================================================
 * USE CASE 6: VERSIONING & UPDATES
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-versioning-updates',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 Versioning & Updates</h1>
                <p class="subtitle">Semantic Versioning & Breaking Changes</p>
            </header>

            <section class="semver-section">
                <h2>🔢 Semantic Versioning (SemVer)</h2>
                <div class="version-visual">
                    <div class="version-box">
                        <span class="major">1</span>.<span class="minor">2</span>.<span class="patch">3</span>
                    </div>
                    <div class="version-labels">
                        <span class="label major">MAJOR<br/>Breaking</span>
                        <span class="label minor">MINOR<br/>Features</span>
                        <span class="label patch">PATCH<br/>Fixes</span>
                    </div>
                </div>
                <table class="semver-table">
                    <tr><th>Bump</th><th>When</th><th>Example</th></tr>
                    <tr><td>MAJOR</td><td>Breaking API changes</td><td>1.0.0 → 2.0.0</td></tr>
                    <tr><td>MINOR</td><td>New features (backwards compatible)</td><td>1.0.0 → 1.1.0</td></tr>
                    <tr><td>PATCH</td><td>Bug fixes only</td><td>1.0.0 → 1.0.1</td></tr>
                </table>
            </section>

            <section class="version-commands">
                <h2>📝 Updating Version</h2>
                <pre class="code terminal"><code># Bump patch version (1.0.0 → 1.0.1)
npm version patch

# Bump minor version (1.0.0 → 1.1.0)
npm version minor

# Bump major version (1.0.0 → 2.0.0)
npm version major

# Set specific version
npm version 2.0.0-beta.1</code></pre>
            </section>

            <section class="breaking-section">
                <h2>⚠️ Breaking Changes</h2>
                <div class="breaking-examples">
                    <div class="breaking">
                        <h4>❌ Breaking Changes (Major Bump)</h4>
                        <ul>
                            <li>Removing or renaming public exports</li>
                            <li>Changing component selectors</li>
                            <li>Removing &#64;Input() or &#64;Output()</li>
                            <li>Changing required inputs</li>
                            <li>Updating peerDependencies to incompatible version</li>
                        </ul>
                    </div>
                    <div class="non-breaking">
                        <h4>✅ Non-Breaking (Minor/Patch)</h4>
                        <ul>
                            <li>Adding new components</li>
                            <li>Adding optional &#64;Input()</li>
                            <li>Adding new exports</li>
                            <li>Bug fixes</li>
                            <li>Performance improvements</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="changelog-section">
                <h2>📋 Maintaining CHANGELOG</h2>
                <pre class="code"><code># CHANGELOG.md

## [2.0.0] - 2024-01-15

### ⚠️ BREAKING CHANGES
- Renamed &#96;ui-btn&#96; selector to &#96;ui-button&#96;
- Removed deprecated &#96;ThemeService&#96;

### ✨ Features
- Added &#96;ui-modal&#96; component
- Added &#96;size&#96; input to ButtonComponent

### 🐛 Bug Fixes
- Fixed button click not emitting on disabled state

## [1.2.0] - 2024-01-01

### ✨ Features
- Added CardComponent
- Added TruncatePipe</code></pre>
            </section>

            <section class="migration-section">
                <h2>🔄 Migration Guides</h2>
                <pre class="code"><code># MIGRATION.md

## Upgrading from v1.x to v2.x

### Breaking: Selector renamed
Before:
&#96;&#96;&#96;html
&lt;ui-btn&gt;Click&lt;/ui-btn&gt;
&#96;&#96;&#96;

After:
&#96;&#96;&#96;html
&lt;ui-button&gt;Click&lt;/ui-button&gt;
&#96;&#96;&#96;

### Breaking: ThemeService removed
Use CSS custom properties instead:
&#96;&#96;&#96;css
:root {{ '{' }} --ui-primary: #667eea; {{ '}' }}
&#96;&#96;&#96;</code></pre>
            </section>

            <section class="deprecation-section">
                <h2>🚧 Deprecation Strategy</h2>
                <pre class="code"><code>// Deprecate before removing
/**
 * &#64;deprecated Use ButtonComponent instead. Will be removed in v3.0.0
 */
export class OldButtonComponent {{ '{' }} {{ '}' }}

// Console warning
constructor() {{ '{' }}
    console.warn('OldButtonComponent is deprecated. Use ButtonComponent.');
{{ '}' }}</code></pre>
                <div class="timeline">
                    <div class="phase">v1.x: Feature works</div>
                    <div class="arrow">→</div>
                    <div class="phase warn">v2.x: Deprecated + Warning</div>
                    <div class="arrow">→</div>
                    <div class="phase remove">v3.x: Removed</div>
                </div>
            </section>

            <section class="prerelease-section">
                <h2>🧪 Pre-release Versions</h2>
                <pre class="code terminal"><code># Alpha (unstable)
npm version 2.0.0-alpha.1
npm publish --tag alpha

# Beta (feature complete)
npm version 2.0.0-beta.1
npm publish --tag beta

# Release candidate
npm version 2.0.0-rc.1
npm publish --tag next</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; margin: 0.5rem 0; }
        .code.terminal { background: #0d1117; color: #58a6ff; }

        section { margin-bottom: 2rem; }

        .version-visual { display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 1rem 0; }
        .version-box { font-size: 3rem; font-family: monospace; font-weight: bold; }
        .version-box .major { color: #dc2626; }
        .version-box .minor { color: #f59e0b; }
        .version-box .patch { color: #22c55e; }
        .version-labels { display: flex; gap: 2rem; text-align: center; }
        .version-labels .label { font-size: 0.75rem; padding: 0.5rem; border-radius: 4px; }
        .version-labels .label.major { background: #fee2e2; color: #dc2626; }
        .version-labels .label.minor { background: #fef3c7; color: #f59e0b; }
        .version-labels .label.patch { background: #dcfce7; color: #22c55e; }

        .semver-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .semver-table th, .semver-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .semver-table th { background: var(--bg-secondary); }

        .breaking-examples { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .breaking, .non-breaking { padding: 1rem; border-radius: 8px; }
        .breaking { background: #fee2e2; }
        .non-breaking { background: #dcfce7; }
        .breaking h4, .non-breaking h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .breaking ul, .non-breaking ul { margin: 0; padding-left: 1.25rem; font-size: 0.8rem; }

        .timeline { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1rem; }
        .phase { padding: 0.5rem 1rem; border-radius: 6px; background: var(--bg-secondary); font-size: 0.8rem; }
        .phase.warn { background: #fef3c7; }
        .phase.remove { background: #fee2e2; }
        .arrow { color: var(--text-secondary); }
    `]
})
export class VersioningUpdatesComponent { }
