/**
 * ============================================================================
 * USE CASE 3: LAZY LOADING & CODE SPLITTING
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lazy-loading',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 Lazy Loading & Code Splitting</h1>
                <p class="subtitle">Load Only What You Need</p>
            </header>

            <section class="concept-section">
                <h2>How It Works</h2>
                <div class="flow-visual">
                    <div class="step">
                        <span class="num">1</span>
                        <h4>Initial Load</h4>
                        <p>Main bundle loads first</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">2</span>
                        <h4>User Navigates</h4>
                        <p>e.g., clicks "Admin"</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">3</span>
                        <h4>Chunk Loaded</h4>
                        <p>admin-chunk.js fetched</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">4</span>
                        <h4>Render</h4>
                        <p>Admin page appears</p>
                    </div>
                </div>
            </section>

            <section class="methods-section">
                <h2>🛠️ Lazy Loading Methods</h2>
                <div class="method-grid">
                    <div class="method">
                        <h3>1. Route-based Lazy Loading</h3>
                        <pre><code>{{ '{' }}
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes')
    .then(m => m.ADMIN_ROUTES)
{{ '}' }}</code></pre>
                        <span class="impact high">High Impact</span>
                    </div>
                    <div class="method">
                        <h3>2. Component Lazy Loading</h3>
                        <pre><code>{{ '{' }}
  path: 'dashboard',
  loadComponent: () => import('./dashboard.component')
    .then(m => m.DashboardComponent)
{{ '}' }}</code></pre>
                        <span class="impact high">High Impact</span>
                    </div>
                    <div class="method">
                        <h3>3. &#64;defer Blocks</h3>
                        <pre><code>&#64;defer (on viewport) {{ '{' }}
  &lt;heavy-chart /&gt;
{{ '}' }} &#64;placeholder {{ '{' }}
  &lt;skeleton /&gt;
{{ '}' }}</code></pre>
                        <span class="impact medium">Medium Impact</span>
                    </div>
                    <div class="method">
                        <h3>4. Preloading Strategies</h3>
                        <pre><code>provideRouter(routes, 
  withPreloading(PreloadAllModules)
)

// Or custom preload strategy</code></pre>
                        <span class="impact">UX Optimization</span>
                    </div>
                </div>
            </section>

            <section class="bundle-section">
                <h2>📊 Bundle Size Impact</h2>
                <div class="bundle-comparison">
                    <div class="bundle eager">
                        <h4>Without Lazy Loading</h4>
                        <div class="bar" style="width: 100%">
                            <span>main.js - 2.5MB</span>
                        </div>
                    </div>
                    <div class="bundle lazy">
                        <h4>With Lazy Loading</h4>
                        <div class="bar main" style="width: 30%"><span>main - 750KB</span></div>
                        <div class="bar chunk" style="width: 20%"><span>admin</span></div>
                        <div class="bar chunk" style="width: 25%"><span>reports</span></div>
                        <div class="bar chunk" style="width: 15%"><span>settings</span></div>
                    </div>
                </div>
            </section>

            <section class="best-practices">
                <h2>✅ Best Practices</h2>
                <ul>
                    <li>Lazy load all feature modules</li>
                    <li>Use &#64;defer for below-fold content</li>
                    <li>Preload likely-to-visit routes</li>
                    <li>Monitor bundle sizes with <code>ng build --stats-json</code></li>
                    <li>Use <code>source-map-explorer</code> to analyze bundles</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .flow-visual { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }
        .step { background: var(--bg-secondary); padding: 1rem; border-radius: 10px; text-align: center; min-width: 120px; }
        .step .num { display: inline-block; width: 28px; height: 28px; background: #667eea; color: white; border-radius: 50%; line-height: 28px; font-weight: bold; }
        .step h4 { margin: 0.5rem 0 0.25rem; font-size: 0.9rem; }
        .step p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }
        .arrow { font-size: 1.5rem; color: var(--primary-color); }

        .method-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .method { background: var(--bg-secondary); border-radius: 10px; overflow: hidden; position: relative; }
        .method h3 { margin: 0; padding: 1rem; background: #2d2d3f; color: white; font-size: 0.9rem; }
        .method pre { margin: 0; padding: 1rem; background: #1e1e2e; color: #a6e3a1; font-size: 0.75rem; }
        .impact { position: absolute; top: 0.5rem; right: 0.5rem; font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 4px; background: #e5e7eb; }
        .impact.high { background: #dcfce7; color: #16a34a; }
        .impact.medium { background: #fef3c7; color: #d97706; }

        .bundle-comparison { margin-top: 1rem; }
        .bundle { margin-bottom: 1rem; }
        .bundle h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .bundle .bar { height: 40px; border-radius: 6px; display: flex; align-items: center; padding: 0 1rem; color: white; font-size: 0.8rem; margin-bottom: 0.25rem; }
        .eager .bar { background: linear-gradient(90deg, #ef4444, #f59e0b); }
        .lazy .bar.main { background: #667eea; }
        .lazy .bar.chunk { background: #10b981; display: inline-flex; margin-right: 0.25rem; }

        .best-practices { background: linear-gradient(135deg, #10b98120, #14b8a620); padding: 2rem; border-radius: 12px; }
        .best-practices code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }
    `]
})
export class LazyLoadingComponent { }
