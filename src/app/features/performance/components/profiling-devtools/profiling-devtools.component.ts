/**
 * ============================================================================
 * PROFILING & DEVTOOLS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profiling-devtools',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔍 Profiling & DevTools</h1>
                <p class="subtitle">Measure, Analyze, Optimize</p>
            </header>

            <section class="tools-section">
                <h2>🛠️ Essential Tools</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Angular DevTools</h3>
                        <p>Chrome/Firefox extension</p>
                        <ul>
                            <li>Component tree inspection</li>
                            <li>Change detection profiler</li>
                            <li>Dependency injection explorer</li>
                        </ul>
                        <a href="https://angular.dev/tools/devtools" target="_blank">Install →</a>
                    </div>
                    <div class="tool-card">
                        <h3>Chrome DevTools</h3>
                        <p>Built-in browser tools</p>
                        <ul>
                            <li>Performance tab (profiling)</li>
                            <li>Memory tab (heap snapshots)</li>
                            <li>Lighthouse (audits)</li>
                        </ul>
                    </div>
                    <div class="tool-card">
                        <h3>Lighthouse</h3>
                        <p>Performance auditing</p>
                        <ul>
                            <li>Performance score</li>
                            <li>Core Web Vitals</li>
                            <li>Recommendations</li>
                        </ul>
                    </div>
                    <div class="tool-card">
                        <h3>webpack-bundle-analyzer</h3>
                        <p>Bundle visualization</p>
                        <ul>
                            <li>Visual size breakdown</li>
                            <li>Identify large modules</li>
                            <li>Find duplicates</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="metrics-section">
                <h2>📊 Key Metrics</h2>
                <div class="metrics-grid">
                    <div class="metric">
                        <h4>LCP</h4>
                        <p>Largest Contentful Paint</p>
                        <span class="target">&lt; 2.5s</span>
                    </div>
                    <div class="metric">
                        <h4>FID</h4>
                        <p>First Input Delay</p>
                        <span class="target">&lt; 100ms</span>
                    </div>
                    <div class="metric">
                        <h4>CLS</h4>
                        <p>Cumulative Layout Shift</p>
                        <span class="target">&lt; 0.1</span>
                    </div>
                    <div class="metric">
                        <h4>TTI</h4>
                        <p>Time to Interactive</p>
                        <span class="target">&lt; 3.8s</span>
                    </div>
                </div>
            </section>

            <section class="workflow-section">
                <h2>🔄 Optimization Workflow</h2>
                <div class="workflow">
                    <div class="step">
                        <span class="num">1</span>
                        <h4>Measure</h4>
                        <p>Lighthouse, DevTools profiler</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">2</span>
                        <h4>Identify</h4>
                        <p>Find bottlenecks</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">3</span>
                        <h4>Optimize</h4>
                        <p>Apply fixes</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">4</span>
                        <h4>Verify</h4>
                        <p>Re-measure</p>
                    </div>
                </div>
            </section>

            <section class="commands-section">
                <h2>💻 Useful Commands</h2>
                <div class="command-list">
                    <div class="command">
                        <code>ng build --configuration=production --stats-json</code>
                        <p>Generate bundle stats for analysis</p>
                    </div>
                    <div class="command">
                        <code>npm run build && npx lighthouse http://localhost:4200 --view</code>
                        <p>Run Lighthouse audit</p>
                    </div>
                    <div class="command">
                        <code>npx webpack-bundle-analyzer dist/*/stats.json</code>
                        <p>Visualize bundle contents</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .tool-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .tool-card { background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; }
        .tool-card h3 { margin: 0 0 0.25rem; color: var(--primary-color); }
        .tool-card p { margin: 0 0 1rem; font-size: 0.85rem; color: var(--text-secondary); }
        .tool-card ul { margin: 0; padding-left: 1.25rem; font-size: 0.85rem; }
        .tool-card li { margin-bottom: 0.25rem; }
        .tool-card a { color: var(--primary-color); text-decoration: none; font-size: 0.85rem; }

        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
        .metric { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1.25rem; border-radius: 10px; text-align: center; }
        .metric h4 { margin: 0; font-size: 1.5rem; }
        .metric p { margin: 0.25rem 0; font-size: 0.75rem; opacity: 0.9; }
        .metric .target { font-size: 0.9rem; font-weight: bold; background: rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 4px; }

        .workflow { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }
        .step { background: var(--bg-secondary); padding: 1rem 1.5rem; border-radius: 10px; text-align: center; }
        .step .num { display: inline-block; width: 28px; height: 28px; background: #667eea; color: white; border-radius: 50%; line-height: 28px; font-weight: bold; }
        .step h4 { margin: 0.5rem 0 0.25rem; }
        .step p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }
        .arrow { font-size: 1.5rem; color: var(--primary-color); }

        .command-list { display: flex; flex-direction: column; gap: 1rem; }
        .command { background: #1e1e2e; padding: 1rem; border-radius: 8px; }
        .command code { display: block; color: #f59e0b; margin-bottom: 0.5rem; font-size: 0.85rem; }
        .command p { margin: 0; color: #a6e3a1; font-size: 0.8rem; }
    `]
})
export class ProfilingDevToolsComponent { }
