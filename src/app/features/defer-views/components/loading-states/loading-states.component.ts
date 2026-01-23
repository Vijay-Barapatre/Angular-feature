/**
 * ============================================================================
 * LOADING STATES
 * ============================================================================
 * 
 * Demonstrates @loading, @placeholder, and @error blocks
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component that might fail to load (for demo)
 */
@Component({
    selector: 'app-slow-component',
    standalone: true,
    template: `
        <div class="slow-content">
            <h3>⏱️ Slow Component Loaded!</h3>
            <p>This took a while to load...</p>
        </div>
    `,
    styles: [`
        .slow-content {
            background: #10b981;
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
        }
    `]
})
export class SlowComponent { }

@Component({
    selector: 'app-loading-states',
    standalone: true,
    imports: [CommonModule, SlowComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>⏳ Loading States</h1>
                <p class="subtitle">&#64;loading, &#64;placeholder, &#64;error</p>
            </header>

            <section class="demo-section">
                <h2>Demo: All Loading States</h2>
                
                <div class="demo-box">
                    <h3>With Placeholder & Loading</h3>
                    @defer (on viewport) {
                        <app-slow-component />
                    } @placeholder {
                        <div class="placeholder">
                            📦 Content will load when in viewport...
                        </div>
                    } @loading (minimum 500ms; after 100ms) {
                        <div class="loading">
                            <span class="spinner"></span>
                            Loading...
                        </div>
                    } @error {
                        <div class="error">
                            ❌ Failed to load component
                        </div>
                    }
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Complete Syntax</h2>
                <pre><code>&#64;defer (on viewport) {{ '{' }}
  &lt;heavy-component /&gt;
{{ '}' }} &#64;placeholder {{ '{' }}
  &lt;p&gt;Waiting to load...&lt;/p&gt;
{{ '}' }} &#64;loading (minimum 500ms; after 100ms) {{ '{' }}
  &lt;spinner /&gt;
{{ '}' }} &#64;error {{ '{' }}
  &lt;p&gt;Failed!&lt;/p&gt;
{{ '}' }}</code></pre>
            </section>

            <section class="blocks-explanation">
                <h2>Block Types</h2>
                <div class="block-grid">
                    <div class="block-card placeholder-card">
                        <h3>&#64;placeholder</h3>
                        <p>Shows before loading starts</p>
                        <code>&#64;placeholder (minimum 200ms)</code>
                    </div>
                    <div class="block-card loading-card">
                        <h3>&#64;loading</h3>
                        <p>Shows during load</p>
                        <code>&#64;loading (after 100ms; minimum 500ms)</code>
                    </div>
                    <div class="block-card error-card">
                        <h3>&#64;error</h3>
                        <p>Shows if load fails</p>
                        <code>&#64;error {{ '{' }} retry message {{ '}' }}</code>
                    </div>
                </div>
            </section>

            <section class="timing-section">
                <h2>⏱️ Timing Parameters</h2>
                <table>
                    <tr>
                        <th>Parameter</th>
                        <th>Block</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td><code>minimum</code></td>
                        <td>&#64;placeholder, &#64;loading</td>
                        <td>Minimum display time (prevents flickering)</td>
                    </tr>
                    <tr>
                        <td><code>after</code></td>
                        <td>&#64;loading</td>
                        <td>Wait before showing (for fast loads)</td>
                    </tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .demo-box { margin-top: 1rem; }
        .demo-box h3 { margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.9rem; }

        .placeholder {
            background: #f3f4f6;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            border: 2px dashed #d1d5db;
        }

        .loading {
            background: #fef3c7;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .spinner {
            width: 20px; height: 20px;
            border: 3px solid #f59e0b;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error {
            background: #fee2e2;
            color: #dc2626;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
        }

        .code-section pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
        }

        .block-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
        .block-card { padding: 1.5rem; border-radius: 8px; }
        .block-card h3 { margin: 0 0 0.5rem 0; }
        .block-card p { margin: 0 0 0.75rem 0; font-size: 0.9rem; }
        .block-card code { font-size: 0.75rem; background: rgba(0,0,0,0.1); padding: 0.25rem 0.5rem; border-radius: 4px; }
        .placeholder-card { background: #f3f4f6; }
        .loading-card { background: #fef3c7; }
        .error-card { background: #fee2e2; }

        .timing-section table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .timing-section th, .timing-section td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .timing-section th { background: var(--bg-secondary, #f8f9fa); }
        .timing-section code { background: #e5e7eb; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.85rem; }
    `]
})
export class LoadingStatesComponent { }
