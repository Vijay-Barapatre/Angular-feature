/**
 * ============================================================================
 * USE CASE 4: BUNDLE OPTIMIZATION
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bundle-optimization',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎯 Bundle Optimization</h1>
                <p class="subtitle">Smaller Bundles, Faster Loads</p>
            </header>

            <section class="techniques-section">
                <h2>🛠️ Optimization Techniques</h2>
                <div class="tech-grid">
                    <div class="tech-card">
                        <h3>1. Tree Shaking</h3>
                        <p>Dead code elimination</p>
                        <pre><code>// ✅ Import only what you need
import {{ '{' }} map {{ '}' }} from 'rxjs/operators';

// ❌ Avoid full imports
import * as _ from 'lodash';</code></pre>
                    </div>
                    <div class="tech-card">
                        <h3>2. Production Mode</h3>
                        <p>Enable AOT and optimizations</p>
                        <pre><code>ng build --configuration=production

// Enables:
// - AOT compilation
// - Minification
// - Dead code elimination</code></pre>
                    </div>
                    <div class="tech-card">
                        <h3>3. Bundle Budgets</h3>
                        <p>Set size limits in angular.json</p>
                        <pre><code>"budgets": [
  {{ '{' }}
    "type": "initial",
    "maximumWarning": "500kb",
    "maximumError": "1mb"
  {{ '}' }}
]</code></pre>
                    </div>
                    <div class="tech-card">
                        <h3>4. Differential Loading</h3>
                        <p>Modern browsers get smaller bundles</p>
                        <pre><code>// angular.json browserslist
"browserslist": [
  "last 2 Chrome versions",
  "last 2 Firefox versions"
]</code></pre>
                    </div>
                </div>
            </section>

            <section class="imports-section">
                <h2>📦 Import Best Practices</h2>
                <div class="import-comparison">
                    <div class="bad">
                        <h4>❌ Bad</h4>
                        <code>import * as moment from 'moment';</code>
                        <span class="size">~300KB</span>
                    </div>
                    <div class="good">
                        <h4>✅ Better</h4>
                        <code>import {{ '{' }} format {{ '}' }} from 'date-fns';</code>
                        <span class="size">~2KB</span>
                    </div>
                </div>
                <div class="import-comparison">
                    <div class="bad">
                        <h4>❌ Bad</h4>
                        <code>import _ from 'lodash';</code>
                        <span class="size">~70KB</span>
                    </div>
                    <div class="good">
                        <h4>✅ Better</h4>
                        <code>import debounce from 'lodash-es/debounce';</code>
                        <span class="size">~1KB</span>
                    </div>
                </div>
            </section>

            <section class="tools-section">
                <h2>🔍 Analysis Tools</h2>
                <div class="tool-list">
                    <div class="tool">
                        <code>ng build --stats-json</code>
                        <p>Generate bundle stats</p>
                    </div>
                    <div class="tool">
                        <code>npx webpack-bundle-analyzer dist/stats.json</code>
                        <p>Visualize bundle contents</p>
                    </div>
                    <div class="tool">
                        <code>npx source-map-explorer dist/*.js</code>
                        <p>Explore what's in each file</p>
                    </div>
                </div>
            </section>

            <section class="checklist">
                <h2>✅ Optimization Checklist</h2>
                <ul>
                    <li>Use production builds for deployment</li>
                    <li>Set appropriate bundle budgets</li>
                    <li>Avoid barrel file re-exports</li>
                    <li>Use ES modules for tree-shaking</li>
                    <li>Regularly analyze bundle sizes</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .tech-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .tech-card { background: var(--bg-secondary); border-radius: 10px; overflow: hidden; }
        .tech-card h3 { margin: 0; padding: 1rem; background: #2d2d3f; color: white; font-size: 0.9rem; }
        .tech-card p { margin: 0; padding: 0.5rem 1rem; font-size: 0.85rem; color: var(--text-secondary); }
        .tech-card pre { margin: 0; padding: 1rem; background: #1e1e2e; color: #a6e3a1; font-size: 0.75rem; }

        .import-comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
        .bad, .good { padding: 1rem; border-radius: 8px; }
        .bad { background: #fee2e2; }
        .good { background: #dcfce7; }
        .bad h4, .good h4 { margin: 0 0 0.5rem; font-size: 0.85rem; }
        .bad code, .good code { display: block; font-size: 0.8rem; margin-bottom: 0.5rem; }
        .size { font-size: 0.75rem; font-weight: bold; }
        .bad .size { color: #dc2626; }
        .good .size { color: #16a34a; }

        .tool-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .tool { background: #1e1e2e; padding: 1rem; border-radius: 8px; }
        .tool code { color: #f59e0b; display: block; margin-bottom: 0.25rem; }
        .tool p { margin: 0; color: #a6e3a1; font-size: 0.85rem; }

        .checklist { background: linear-gradient(135deg, #10b98120, #14b8a620); padding: 2rem; border-radius: 12px; }
    `]
})
export class BundleOptimizationComponent { }
