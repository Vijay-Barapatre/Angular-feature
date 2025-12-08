/**
 * ============================================================================
 * USE CASE 4: PREFETCHING STRATEGIES
 * ============================================================================
 * 
 * Demonstrates prefetch options:
 * - prefetch on idle
 * - prefetch on hover
 * - prefetch on viewport
 * - prefetch on interaction
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-prefetch-demo',
    standalone: true,
    template: `
        <div class="prefetch-content">
            <h3>✨ Prefetched Content</h3>
            <p>This was already loaded in the background!</p>
        </div>
    `,
    styles: [`
        .prefetch-content {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
        }
    `]
})
export class PrefetchDemoContent { }

@Component({
    selector: 'app-prefetching',
    standalone: true,
    imports: [CommonModule, PrefetchDemoContent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🚀 Prefetching</h1>
                <p class="subtitle">Load content before it's needed</p>
            </header>

            <section class="concept-section">
                <h2>What is Prefetching?</h2>
                <div class="concept-box">
                    <p>
                        Prefetching downloads the code <strong>before</strong> the trigger fires.
                        When the user finally triggers the content, it appears <strong>instantly</strong>!
                    </p>
                </div>
            </section>

            <section class="demo-section">
                <h2>Demo: Prefetch on Hover, Show on Click</h2>
                <div class="demo-area" #prefetchArea>
                    @defer (on interaction(prefetchArea); prefetch on hover(prefetchArea)) {
                        <app-prefetch-demo />
                    } @placeholder {
                        <div class="placeholder">
                            <p>👆 Hover to prefetch, click to show</p>
                            <small>Code downloads on hover, appears on click</small>
                        </div>
                    } @loading {
                        <div class="loading">Rendering...</div>
                    }
                </div>
            </section>

            <section class="strategies-section">
                <h2>📋 Prefetch Strategies</h2>
                <div class="strategy-grid">
                    <div class="strategy-card">
                        <h3>prefetch on idle</h3>
                        <p>Downloads when browser is idle</p>
                        <code>prefetch on idle</code>
                        <span class="use-case">Best for: likely-to-view content</span>
                    </div>
                    <div class="strategy-card">
                        <h3>prefetch on hover</h3>
                        <p>Downloads when user hovers</p>
                        <code>prefetch on hover</code>
                        <span class="use-case">Best for: interactive elements</span>
                    </div>
                    <div class="strategy-card">
                        <h3>prefetch on viewport</h3>
                        <p>Downloads when trigger enters viewport</p>
                        <code>prefetch on viewport</code>
                        <span class="use-case">Best for: scrollable content</span>
                    </div>
                    <div class="strategy-card">
                        <h3>prefetch on immediate</h3>
                        <p>Downloads immediately</p>
                        <code>prefetch on immediate</code>
                        <span class="use-case">Best for: critical path</span>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Code Example</h2>
                <pre><code>// Prefetch on hover, show on click
&#64;defer (on interaction; prefetch on hover) {{ '{' }}
  &lt;heavy-modal /&gt;
{{ '}' }}

// Prefetch on idle, show on viewport
&#64;defer (on viewport; prefetch on idle) {{ '{' }}
  &lt;image-gallery /&gt;
{{ '}' }}</code></pre>
            </section>

            <section class="timeline-section">
                <h2>⏱️ Timeline Comparison</h2>
                <div class="timeline">
                    <div class="timeline-row">
                        <span class="label">Without prefetch:</span>
                        <div class="bar">
                            <div class="segment trigger">Trigger</div>
                            <div class="segment download">Download</div>
                            <div class="segment render">Render</div>
                        </div>
                    </div>
                    <div class="timeline-row">
                        <span class="label">With prefetch:</span>
                        <div class="bar">
                            <div class="segment prefetch">Prefetch (background)</div>
                            <div class="segment gap"></div>
                            <div class="segment trigger small">Trigger</div>
                            <div class="segment render">Render</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .concept-section { margin-bottom: 2rem; }
        .concept-box {
            background: linear-gradient(135deg, #667eea15, #764ba215);
            padding: 1.5rem;
            border-radius: 12px;
            border-left: 4px solid #667eea;
        }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .demo-area { cursor: pointer; }
        .placeholder {
            background: white; padding: 2rem; border-radius: 8px;
            text-align: center; border: 2px dashed #d1d5db;
            transition: border-color 0.2s;
        }
        .placeholder:hover { border-color: #667eea; }
        .placeholder small { display: block; margin-top: 0.5rem; color: var(--text-secondary); }
        .loading { background: #fef3c7; padding: 1rem; border-radius: 8px; text-align: center; }

        .strategy-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem; }
        .strategy-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.25rem; border-radius: 10px;
        }
        .strategy-card h3 { margin: 0 0 0.25rem 0; color: var(--primary-color, #667eea); font-size: 0.95rem; }
        .strategy-card p { margin: 0 0 0.75rem 0; font-size: 0.85rem; color: var(--text-secondary); }
        .strategy-card code { display: block; background: #1e1e2e; color: #a6e3a1; padding: 0.4rem; border-radius: 4px; font-size: 0.75rem; margin-bottom: 0.5rem; }
        .strategy-card .use-case { font-size: 0.75rem; color: #10b981; font-style: italic; }

        .code-section { margin: 2rem 0; }
        .code-section pre { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 8px; overflow-x: auto; }

        .timeline-section { margin-top: 2rem; }
        .timeline { margin-top: 1rem; }
        .timeline-row { display: flex; align-items: center; margin-bottom: 1rem; }
        .timeline-row .label { width: 140px; font-size: 0.85rem; font-weight: 500; }
        .timeline-row .bar { display: flex; flex: 1; height: 32px; }
        .segment { padding: 0 0.75rem; display: flex; align-items: center; font-size: 0.75rem; color: white; }
        .segment.trigger { background: #f59e0b; flex: 1; }
        .segment.download { background: #ef4444; flex: 2; }
        .segment.render { background: #10b981; flex: 1; }
        .segment.prefetch { background: #667eea; flex: 2; }
        .segment.gap { flex: 1; }
        .segment.small { flex: 0.5; }
    `]
})
export class PrefetchingComponent { }
