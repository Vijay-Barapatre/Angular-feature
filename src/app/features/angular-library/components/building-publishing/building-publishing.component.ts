/**
 * ============================================================================
 * BUILDING & PUBLISHING
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-building-publishing',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🚀 Building & Publishing</h1>
                <p class="subtitle">From Source to npm Registry</p>
            </header>

            <section class="build-section">
                <h2>🔨 Building the Library</h2>
                <pre class="code terminal"><code># Build the library
ng build my-ui-kit

# Build in watch mode (development)
ng build my-ui-kit --watch

# Output location: dist/my-ui-kit/</code></pre>
            </section>

            <section class="output-section">
                <h2>📁 Build Output Structure</h2>
                <pre class="code"><code>dist/my-ui-kit/
├── bundles/                    # UMD bundles (legacy)
├── esm2022/                    # ES modules (modern)
├── fesm2022/                   # Flat ES modules
├── lib/                        # Type definitions
│   ├── button/
│   │   └── button.component.d.ts
│   └── notification.service.d.ts
├── package.json                # 📋 Ready for npm
├── public-api.d.ts             # TypeScript definitions
└── README.md                   # From library root</code></pre>
            </section>

            <section class="package-section">
                <h2>📋 Configure package.json for Publishing</h2>
                <pre class="code"><code>// projects/my-ui-kit/package.json
{{ '{' }}
  "name": "&#64;myorg/ui-kit",         // 🛡️ Scoped package name
  "version": "1.0.0",
  "description": "My awesome UI component library",
  "keywords": ["angular", "ui", "components"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {{ '{' }}
    "type": "git",
    "url": "https://github.com/myorg/ui-kit"
  {{ '}' }},
  "peerDependencies": {{ '{' }}
    "&#64;angular/common": "^17.0.0 || ^18.0.0",  // Version range
    "&#64;angular/core": "^17.0.0 || ^18.0.0"
  {{ '}' }},
  "sideEffects": false           // 🌲 Enable tree-shaking
{{ '}' }}</code></pre>
            </section>

            <section class="npm-section">
                <h2>📦 Publishing to npm</h2>
                <div class="steps">
                    <div class="step">
                        <span class="num">1</span>
                        <h4>Build for Production</h4>
                        <pre class="code terminal"><code>ng build my-ui-kit --configuration=production</code></pre>
                    </div>
                    <div class="step">
                        <span class="num">2</span>
                        <h4>Navigate to dist</h4>
                        <pre class="code terminal"><code>cd dist/my-ui-kit</code></pre>
                    </div>
                    <div class="step">
                        <span class="num">3</span>
                        <h4>Login to npm</h4>
                        <pre class="code terminal"><code>npm login</code></pre>
                    </div>
                    <div class="step">
                        <span class="num">4</span>
                        <h4>Publish!</h4>
                        <pre class="code terminal"><code># Public package
npm publish --access public

# Scoped package (first time)
npm publish --access public</code></pre>
                    </div>
                </div>
            </section>

            <section class="peer-deps-section">
                <h2>⚠️ Peer Dependencies Explained</h2>
                <div class="comparison">
                    <div class="dep-type">
                        <h4>dependencies</h4>
                        <p class="bad">❌ Bundled with library</p>
                        <p>Duplicate Angular in consumer's bundle!</p>
                    </div>
                    <div class="dep-type">
                        <h4>peerDependencies</h4>
                        <p class="good">✅ Consumer provides</p>
                        <p>Single Angular instance, smaller bundles</p>
                    </div>
                </div>
                <pre class="code"><code>// Good: Peer dependencies
{{ '{' }}
  "peerDependencies": {{ '{' }}
    "&#64;angular/core": "^17.0.0",    // Consumer must have
    "&#64;angular/common": "^17.0.0"
  {{ '}' }},
  "dependencies": {{ '{' }}
    "tslib": "^2.3.0"              // OK: Runtime helper
  {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="private-section">
                <h2>🏢 Private npm Registry</h2>
                <pre class="code terminal"><code># Set registry (Verdaccio, Artifactory, etc.)
npm config set registry https://registry.mycompany.com/

# Or use .npmrc file
echo "registry=https://registry.mycompany.com/" > .npmrc

# Publish to private registry
npm publish</code></pre>
            </section>

            <section class="github-packages">
                <h2>📦 GitHub Packages</h2>
                <pre class="code"><code>// package.json
{{ '{' }}
  "name": "&#64;myorg/ui-kit",
  "publishConfig": {{ '{' }}
    "registry": "https://npm.pkg.github.com"
  {{ '}' }}
{{ '}' }}</code></pre>
                <pre class="code terminal"><code># Publish to GitHub Packages
npm publish</code></pre>
            </section>

            <section class="checklist">
                <h2>✅ Pre-publish Checklist</h2>
                <table>
                    <tr><td>☐</td><td>Version bumped appropriately</td></tr>
                    <tr><td>☐</td><td>CHANGELOG.md updated</td></tr>
                    <tr><td>☐</td><td>README.md complete</td></tr>
                    <tr><td>☐</td><td>All tests passing</td></tr>
                    <tr><td>☐</td><td>Peer dependencies correct</td></tr>
                    <tr><td>☐</td><td>Build successful</td></tr>
                    <tr><td>☐</td><td>License file included</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; margin: 0.5rem 0; }
        .code.terminal { background: #0d1117; color: #58a6ff; }

        section { margin-bottom: 2rem; }

        .steps { display: flex; flex-direction: column; gap: 1rem; }
        .step { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; position: relative; }
        .step .num { position: absolute; top: -8px; left: -8px; width: 24px; height: 24px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
        .step h4 { margin: 0 0 0.5rem; }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .dep-type { padding: 1rem; border-radius: 8px; background: var(--bg-secondary); }
        .dep-type h4 { margin: 0 0 0.5rem; font-family: monospace; }
        .dep-type .bad { color: #dc2626; font-weight: bold; margin: 0; }
        .dep-type .good { color: #16a34a; font-weight: bold; margin: 0; }

        table { width: 100%; border-collapse: collapse; }
        td { padding: 0.5rem; border-bottom: 1px solid #e5e7eb; }
        td:first-child { width: 30px; }
    `]
})
export class BuildingPublishingComponent { }
