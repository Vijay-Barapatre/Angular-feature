/**
 * ============================================================================
 * PRERENDERING (SSG) COMPONENT
 * ============================================================================
 * 
 * Demonstrates Static Site Generation (SSG) / Prerendering concepts.
 * Prerendering generates HTML at build time for maximum performance.
 * 
 * KEY CONCEPTS:
 * 1. SSR vs SSG differences
 * 2. Build-time rendering
 * 3. CDN deployment benefits
 * 4. Dynamic route prerendering
 */

import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-prerendering',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="prerender-container">
            <header class="header">
                <h1>📄 Prerendering (SSG)</h1>
                <p class="subtitle">
                    Generate static HTML at build time for maximum performance
                </p>
            </header>

            <!-- SSR vs SSG Comparison -->
            <section class="demo-section">
                <h2>🔄 SSR vs SSG (Prerendering)</h2>
                <div class="comparison-grid">
                    <div class="comparison-card ssr-card">
                        <div class="card-header">
                            <span class="icon">🖥️</span>
                            <h3>Server-Side Rendering (SSR)</h3>
                        </div>
                        <div class="card-body">
                            <div class="process-flow">
                                <div class="flow-item">
                                    <span class="step">1</span>
                                    <span>User requests page</span>
                                </div>
                                <div class="flow-arrow">↓</div>
                                <div class="flow-item">
                                    <span class="step">2</span>
                                    <span>Server renders HTML</span>
                                </div>
                                <div class="flow-arrow">↓</div>
                                <div class="flow-item">
                                    <span class="step">3</span>
                                    <span>Response sent</span>
                                </div>
                            </div>
                            <div class="timing">
                                <span class="timing-label">Render time:</span>
                                <span class="timing-value ssr">~100-500ms per request</span>
                            </div>
                        </div>
                    </div>

                    <div class="comparison-card ssg-card">
                        <div class="card-header">
                            <span class="icon">📄</span>
                            <h3>Static Site Generation (SSG)</h3>
                        </div>
                        <div class="card-body">
                            <div class="process-flow">
                                <div class="flow-item">
                                    <span class="step">1</span>
                                    <span>Build runs once</span>
                                </div>
                                <div class="flow-arrow">↓</div>
                                <div class="flow-item">
                                    <span class="step">2</span>
                                    <span>All pages pre-rendered</span>
                                </div>
                                <div class="flow-arrow">↓</div>
                                <div class="flow-item">
                                    <span class="step">3</span>
                                    <span>Served from CDN instantly</span>
                                </div>
                            </div>
                            <div class="timing">
                                <span class="timing-label">Response time:</span>
                                <span class="timing-value ssg">~10-50ms (CDN cache)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Performance Comparison -->
            <section class="demo-section">
                <h2>⚡ Performance Comparison</h2>
                <div class="performance-chart">
                    <div class="chart-row" *ngFor="let metric of performanceMetrics">
                        <span class="metric-name">{{ metric.name }}</span>
                        <div class="bars">
                            <div class="bar-group">
                                <div class="bar csr" [style.width.%]="metric.csr">
                                    <span class="bar-label">{{ metric.csrValue }}</span>
                                </div>
                                <span class="bar-type">CSR</span>
                            </div>
                            <div class="bar-group">
                                <div class="bar ssr" [style.width.%]="metric.ssr">
                                    <span class="bar-label">{{ metric.ssrValue }}</span>
                                </div>
                                <span class="bar-type">SSR</span>
                            </div>
                            <div class="bar-group">
                                <div class="bar ssg" [style.width.%]="metric.ssg">
                                    <span class="bar-label">{{ metric.ssgValue }}</span>
                                </div>
                                <span class="bar-type">SSG</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="chart-note">
                    Lower is better. SSG achieves the fastest times due to pre-built HTML and CDN caching.
                </p>
            </section>

            <!-- When to Use -->
            <section class="demo-section">
                <h2>📋 When to Use SSG</h2>
                <div class="use-cases-grid">
                    <div class="use-case-list good">
                        <h4>✅ Great for SSG</h4>
                        <ul>
                            <li *ngFor="let item of goodUseCases">
                                <span class="use-icon">{{ item.icon }}</span>
                                <div>
                                    <strong>{{ item.title }}</strong>
                                    <span>{{ item.desc }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="use-case-list bad">
                        <h4>❌ Use SSR Instead</h4>
                        <ul>
                            <li *ngFor="let item of badUseCases">
                                <span class="use-icon">{{ item.icon }}</span>
                                <div>
                                    <strong>{{ item.title }}</strong>
                                    <span>{{ item.desc }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Configuration -->
            <section class="demo-section">
                <h2>⚙️ Configuration</h2>
                <div class="config-demo">
                    <div class="config-tabs">
                        <button class="tab-btn" [class.active]="activeTab === 'angular'" 
                                (click)="activeTab = 'angular'">
                            angular.json
                        </button>
                        <button class="tab-btn" [class.active]="activeTab === 'routes'" 
                                (click)="activeTab = 'routes'">
                            routes.txt
                        </button>
                        <button class="tab-btn" [class.active]="activeTab === 'build'" 
                                (click)="activeTab = 'build'">
                            Build Command
                        </button>
                    </div>

                    <div class="config-content" *ngIf="activeTab === 'angular'">
                        <div class="code-block">
                            <div class="code-header">angular.json</div>
                            <pre><code>{{ angularJsonCode }}</code></pre>
                        </div>
                    </div>

                    <div class="config-content" *ngIf="activeTab === 'routes'">
                        <div class="code-block">
                            <div class="code-header">routes.txt</div>
                            <pre><code>{{ routesTxtCode }}</code></pre>
                        </div>
                        <p class="config-note">
                            List all routes to prerender, one per line. For dynamic routes,
                            generate this file with a script before building.
                        </p>
                    </div>

                    <div class="config-content" *ngIf="activeTab === 'build'">
                        <div class="code-block">
                            <div class="code-header">Terminal</div>
                            <pre><code>{{ buildCommands }}</code></pre>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Output Structure -->
            <section class="demo-section">
                <h2>📁 Build Output</h2>
                <div class="output-demo">
                    <div class="folder-tree">
                        <div class="tree-item folder">
                            <span class="icon">📁</span> dist/your-app/browser/
                        </div>
                        <div class="tree-item file">
                            <span class="icon">📄</span> index.html
                            <span class="tag home">Home Page</span>
                        </div>
                        <div class="tree-item folder nested">
                            <span class="icon">📁</span> about/
                        </div>
                        <div class="tree-item file nested-2">
                            <span class="icon">📄</span> index.html
                            <span class="tag">Prerendered</span>
                        </div>
                        <div class="tree-item folder nested">
                            <span class="icon">📁</span> products/
                        </div>
                        <div class="tree-item file nested-2">
                            <span class="icon">📄</span> index.html
                            <span class="tag">Prerendered</span>
                        </div>
                        <div class="tree-item folder nested-2">
                            <span class="icon">📁</span> widget-pro/
                        </div>
                        <div class="tree-item file nested-3">
                            <span class="icon">📄</span> index.html
                            <span class="tag">Prerendered</span>
                        </div>
                        <div class="tree-item file">
                            <span class="icon">📦</span> main.*.js
                            <span class="tag js">Bundle</span>
                        </div>
                        <div class="tree-item file">
                            <span class="icon">🎨</span> styles.*.css
                            <span class="tag css">Styles</span>
                        </div>
                    </div>
                    <p class="output-note">
                        Each route becomes a directory with an index.html file containing
                        the fully rendered page content.
                    </p>
                </div>
            </section>

            <!-- Deployment Options -->
            <section class="demo-section">
                <h2>🚀 Deployment Options</h2>
                <div class="deployment-grid">
                    <div class="deploy-card" *ngFor="let provider of deploymentProviders">
                        <span class="deploy-icon">{{ provider.icon }}</span>
                        <h4>{{ provider.name }}</h4>
                        <ul>
                            <li *ngFor="let feature of provider.features">{{ feature }}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Hybrid Approach -->
            <section class="demo-section">
                <h2>🔀 Hybrid Approach: SSR + SSG</h2>
                <div class="hybrid-demo">
                    <p class="hybrid-desc">
                        Combine SSR and SSG for optimal performance. Pre-render static pages,
                        use SSR for dynamic content.
                    </p>
                    <div class="hybrid-diagram">
                        <div class="hybrid-row">
                            <span class="label">Static Pages (SSG)</span>
                            <div class="pages">
                                <span class="page ssg">Home</span>
                                <span class="page ssg">About</span>
                                <span class="page ssg">Pricing</span>
                                <span class="page ssg">Docs</span>
                            </div>
                            <span class="delivery">→ CDN (instant)</span>
                        </div>
                        <div class="hybrid-row">
                            <span class="label">Dynamic Pages (SSR)</span>
                            <div class="pages">
                                <span class="page ssr">Dashboard</span>
                                <span class="page ssr">Search</span>
                                <span class="page ssr">Cart</span>
                                <span class="page ssr">Profile</span>
                            </div>
                            <span class="delivery">→ Server (rendered)</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Common Pitfalls -->
            <section class="demo-section">
                <h2>⚠️ Common Pitfalls</h2>
                <div class="pitfalls-list">
                    <div class="pitfall" *ngFor="let pitfall of pitfalls">
                        <div class="pitfall-header">
                            <span class="pitfall-icon">{{ pitfall.icon }}</span>
                            <h4>{{ pitfall.title }}</h4>
                        </div>
                        <p>{{ pitfall.description }}</p>
                        <div class="pitfall-solution">
                            <strong>Solution:</strong> {{ pitfall.solution }}
                        </div>
                    </div>
                </div>
            </section>

            <!-- Key Takeaways -->
            <section class="takeaways-section">
                <h2>🎯 Key Takeaways</h2>
                <div class="takeaways-grid">
                    <div class="takeaway-card" *ngFor="let takeaway of takeaways">
                        <span class="takeaway-icon">{{ takeaway.icon }}</span>
                        <p>{{ takeaway.text }}</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .prerender-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 2rem;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .header h1 {
            font-size: 2rem;
            color: var(--text-primary, #1f2937);
            margin: 0 0 0.5rem;
        }

        .subtitle {
            color: var(--text-secondary, #64748b);
            font-size: 1.1rem;
            margin: 0;
        }

        .demo-section {
            margin-bottom: 2.5rem;
        }

        h2 {
            font-size: 1.3rem;
            color: var(--text-primary, #1f2937);
            margin-bottom: 1rem;
        }

        /* Comparison Grid */
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .comparison-card {
            padding: 1.5rem;
            border-radius: 12px;
        }

        .ssr-card {
            background: #dbeafe;
            border: 2px solid #3b82f6;
        }

        .ssg-card {
            background: #d1fae5;
            border: 2px solid #10b981;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .card-header .icon {
            font-size: 1.5rem;
        }

        .card-header h3 {
            margin: 0;
            font-size: 1rem;
        }

        .process-flow {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            margin-bottom: 1rem;
        }

        .flow-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: rgba(255,255,255,0.5);
            border-radius: 6px;
        }

        .flow-item .step {
            width: 22px;
            height: 22px;
            background: rgba(0,0,0,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
        }

        .flow-arrow {
            text-align: center;
            color: var(--text-secondary, #64748b);
        }

        .timing {
            padding: 0.75rem;
            background: rgba(0,0,0,0.05);
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
        }

        .timing-label {
            color: var(--text-secondary, #64748b);
        }

        .timing-value {
            font-weight: 600;
        }

        .timing-value.ssr { color: #3b82f6; }
        .timing-value.ssg { color: #10b981; }

        /* Performance Chart */
        .performance-chart {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .chart-row {
            margin-bottom: 1.25rem;
        }

        .chart-row:last-child {
            margin-bottom: 0;
        }

        .metric-name {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }

        .bars {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .bar-group {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .bar {
            height: 24px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 0.5rem;
            min-width: 50px;
            transition: width 0.5s ease;
        }

        .bar.csr { background: #fca5a5; }
        .bar.ssr { background: #93c5fd; }
        .bar.ssg { background: #6ee7b7; }

        .bar-label {
            font-size: 0.7rem;
            font-weight: 600;
            color: rgba(0,0,0,0.7);
        }

        .bar-type {
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
            min-width: 30px;
        }

        .chart-note {
            margin: 1rem 0 0;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
            text-align: center;
        }

        /* Use Cases Grid */
        .use-cases-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .use-case-list {
            padding: 1.5rem;
            border-radius: 12px;
        }

        .use-case-list.good {
            background: #ecfdf5;
            border: 2px solid #6ee7b7;
        }

        .use-case-list.bad {
            background: #fef2f2;
            border: 2px solid #fca5a5;
        }

        .use-case-list h4 {
            margin: 0 0 1rem;
        }

        .use-case-list ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .use-case-list li {
            display: flex;
            gap: 0.75rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .use-case-list li:last-child {
            border-bottom: none;
        }

        .use-icon {
            font-size: 1.25rem;
        }

        .use-case-list li strong {
            display: block;
            font-size: 0.9rem;
        }

        .use-case-list li span {
            font-size: 0.8rem;
            color: var(--text-secondary, #64748b);
        }

        /* Config Demo */
        .config-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .tab-btn {
            padding: 0.5rem 1rem;
            background: var(--bg-secondary, #f8fafc);
            border: 2px solid var(--border-color, #e2e8f0);
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
        }

        .tab-btn.active {
            background: #6366f1;
            color: white;
            border-color: #6366f1;
        }

        .code-block {
            background: #0f172a;
            border-radius: 8px;
            overflow: hidden;
        }

        .code-header {
            padding: 0.5rem 1rem;
            background: #1e293b;
            color: #94a3b8;
            font-size: 0.8rem;
        }

        .code-block pre {
            margin: 0;
            padding: 1rem;
            overflow-x: auto;
        }

        .code-block code {
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.8rem;
            white-space: pre-wrap;
        }

        .config-note {
            margin: 1rem 0 0;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
        }

        /* Output Demo */
        .output-demo {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .folder-tree {
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }

        .tree-item {
            padding: 0.4rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .tree-item.nested { padding-left: 1.5rem; }
        .tree-item.nested-2 { padding-left: 3rem; }
        .tree-item.nested-3 { padding-left: 4.5rem; }

        .tree-item .icon {
            font-size: 1rem;
        }

        .tag {
            font-size: 0.65rem;
            padding: 0.15rem 0.4rem;
            border-radius: 3px;
            margin-left: auto;
        }

        .tag { background: #d1fae5; color: #047857; }
        .tag.home { background: #dbeafe; color: #1e40af; }
        .tag.js { background: #fef3c7; color: #92400e; }
        .tag.css { background: #ede9fe; color: #6d28d9; }

        .output-note {
            margin: 1rem 0 0;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
        }

        /* Deployment Grid */
        .deployment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
        }

        .deploy-card {
            padding: 1.25rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            text-align: center;
        }

        .deploy-icon {
            font-size: 2rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .deploy-card h4 {
            margin: 0 0 0.75rem;
        }

        .deploy-card ul {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: left;
        }

        .deploy-card li {
            font-size: 0.8rem;
            color: var(--text-secondary, #64748b);
            padding: 0.25rem 0;
        }

        .deploy-card li::before {
            content: '✓ ';
            color: #10b981;
        }

        /* Hybrid Demo */
        .hybrid-demo {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .hybrid-desc {
            margin: 0 0 1rem;
            color: var(--text-secondary, #64748b);
        }

        .hybrid-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border-color, #e2e8f0);
        }

        .hybrid-row:last-child {
            border-bottom: none;
        }

        .hybrid-row .label {
            min-width: 160px;
            font-weight: 500;
        }

        .pages {
            display: flex;
            gap: 0.5rem;
            flex: 1;
        }

        .page {
            padding: 0.4rem 0.75rem;
            border-radius: 4px;
            font-size: 0.8rem;
        }

        .page.ssg { background: #d1fae5; color: #047857; }
        .page.ssr { background: #dbeafe; color: #1e40af; }

        .delivery {
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
        }

        /* Pitfalls */
        .pitfalls-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .pitfall {
            padding: 1.25rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 10px;
            border-left: 4px solid #f59e0b;
        }

        .pitfall-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .pitfall-icon {
            font-size: 1.25rem;
        }

        .pitfall-header h4 {
            margin: 0;
        }

        .pitfall p {
            margin: 0 0 0.75rem;
            color: var(--text-secondary, #64748b);
        }

        .pitfall-solution {
            padding: 0.75rem;
            background: #ecfdf5;
            border-radius: 6px;
            font-size: 0.9rem;
        }

        /* Takeaways */
        .takeaways-section {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            padding: 2rem;
            border-radius: 16px;
            color: white;
        }

        .takeaways-section h2 {
            color: white;
            margin-bottom: 1.5rem;
        }

        .takeaways-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .takeaway-card {
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
            text-align: center;
        }

        .takeaway-icon {
            font-size: 1.5rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .takeaway-card p {
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .comparison-grid, .use-cases-grid {
                grid-template-columns: 1fr;
            }
            .hybrid-row {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    `]
})
export class PrerenderingComponent implements OnInit {
    isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    activeTab = 'angular';

    performanceMetrics = [
        { name: 'Time to First Byte (TTFB)', csr: 100, ssr: 40, ssg: 8, csrValue: '500ms', ssrValue: '200ms', ssgValue: '20ms' },
        { name: 'First Contentful Paint (FCP)', csr: 100, ssr: 27, ssg: 7, csrValue: '1.5s', ssrValue: '400ms', ssgValue: '100ms' },
        { name: 'Largest Contentful Paint (LCP)', csr: 100, ssr: 30, ssg: 10, csrValue: '2s', ssrValue: '600ms', ssgValue: '200ms' },
        { name: 'Time to Interactive (TTI)', csr: 100, ssr: 32, ssg: 20, csrValue: '2.5s', ssrValue: '800ms', ssgValue: '500ms' }
    ];

    goodUseCases = [
        { icon: '🏠', title: 'Marketing Pages', desc: 'Landing, pricing, features' },
        { icon: '📚', title: 'Documentation', desc: 'Help docs, tutorials' },
        { icon: '📝', title: 'Blog Articles', desc: 'News, posts (rebuild on publish)' },
        { icon: '🛍️', title: 'Product Catalog', desc: 'Category and product pages' },
        { icon: '📜', title: 'Legal Pages', desc: 'Terms, privacy, policies' }
    ];

    badUseCases = [
        { icon: '📊', title: 'Dashboards', desc: 'Personalized, real-time data' },
        { icon: '🔍', title: 'Search Results', desc: 'Dynamic query responses' },
        { icon: '🛒', title: 'Shopping Cart', desc: 'User-specific state' },
        { icon: '💬', title: 'Real-time Apps', desc: 'Chat, live updates' }
    ];

    deploymentProviders = [
        { icon: '▲', name: 'Vercel', features: ['Edge caching', 'ISR support', 'Analytics'] },
        { icon: '◆', name: 'Netlify', features: ['Edge functions', 'Instant rollback', 'Forms'] },
        { icon: '☁️', name: 'Cloudflare', features: ['Global CDN', 'Workers', 'Web Analytics'] },
        { icon: '🔥', name: 'Firebase', features: ['Google CDN', 'Easy setup', 'Functions'] }
    ];

    pitfalls = [
        {
            icon: '⏰',
            title: 'Stale Dynamic Data',
            description: 'Content that changes frequently will be outdated until next build.',
            solution: 'Use client-side hydration to fetch fresh data, or implement ISR (Incremental Static Regeneration).'
        },
        {
            icon: '🔗',
            title: 'Missing Routes',
            description: 'Dynamic routes not in prerender list will return 404 or fallback to CSR.',
            solution: 'Generate routes.txt dynamically before build with a script that fetches all slugs.'
        },
        {
            icon: '🌐',
            title: 'API Not Available During Build',
            description: 'If your API requires authentication or is not accessible at build time, prerendering fails.',
            solution: 'Use environment variables, mock data during build, or pre-fetch and cache API responses.'
        }
    ];

    takeaways = [
        { icon: '📄', text: 'SSG generates HTML at build time, not per request' },
        { icon: '⚡', text: 'Pre-rendered pages load 10x faster from CDN' },
        { icon: '🔀', text: 'Combine SSG + SSR for optimal hybrid architecture' },
        { icon: '📝', text: 'Use routes.txt to specify pages to prerender' },
        { icon: '🔄', text: 'Rebuild to update content, or use ISR' }
    ];

    angularJsonCode = `{
    "architect": {
        "prerender": {
            "builder": "@angular-devkit/build-angular:prerender",
            "options": {
                "routes": [
                    "/",
                    "/about",
                    "/products",
                    "/contact"
                ]
            },
            "configurations": {
                "production": {
                    "browserTarget": "app:build:production",
                    "serverTarget": "app:server:production"
                }
            }
        }
    }
}`;

    routesTxtCode = `# Static pages
/
/about
/pricing
/contact

# Blog posts (generated dynamically)
/blog/getting-started
/blog/advanced-tips
/blog/best-practices

# Product pages
/products/widget-pro
/products/gadget-x
/products/super-tool`;

    buildCommands = `# Generate routes dynamically (optional)
$ npx ts-node scripts/generate-routes.ts

# Run prerender build
$ ng run your-app:prerender

# Or with npm script
$ npm run prerender

# Output in dist/your-app/browser/
# Each route becomes a folder with index.html`;

    ngOnInit(): void {
        // Component initialization
    }
}
