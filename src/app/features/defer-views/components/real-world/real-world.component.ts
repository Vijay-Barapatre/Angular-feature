/**
 * ============================================================================
 * REAL-WORLD PATTERNS
 * ============================================================================
 * 
 * Production patterns for @defer:
 * - Dashboard widgets
 * - Comments section
 * - Chart components
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Simulated heavy widget components
@Component({
    selector: 'app-analytics-widget',
    standalone: true,
    template: `<div class="widget analytics"><h4>📊 Analytics</h4><p>1,234 visitors today</p></div>`,
    styles: [`.widget { padding: 1.5rem; border-radius: 8px; }  .analytics { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }`]
})
export class AnalyticsWidget { }

@Component({
    selector: 'app-revenue-widget',
    standalone: true,
    template: `<div class="widget revenue"><h4>💰 Revenue</h4><p>$12,345 this month</p></div>`,
    styles: [`.widget { padding: 1.5rem; border-radius: 8px; } .revenue { background: linear-gradient(135deg, #10b981, #14b8a6); color: white; }`]
})
export class RevenueWidget { }

@Component({
    selector: 'app-comments-section',
    standalone: true,
    template: `
        <div class="comments">
            <h4>💬 Comments (3)</h4>
            <div class="comment">Great article! - Alice</div>
            <div class="comment">Very helpful - Bob</div>
            <div class="comment">Thanks for sharing! - Carol</div>
        </div>
    `,
    styles: [`
        .comments { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; }
        .comment { padding: 0.5rem; background: white; border-radius: 4px; margin-top: 0.5rem; font-size: 0.9rem; }
    `]
})
export class CommentsSection { }

@Component({
    selector: 'app-real-world',
    standalone: true,
    imports: [CommonModule, AnalyticsWidget, RevenueWidget, CommentsSection],
    template: `
        <div class="container">
            <header class="header">
                <h1>🌍 Real-world Patterns</h1>
                <p class="subtitle">Production-ready &#64;defer examples</p>
            </header>

            <!-- PATTERN 1: DASHBOARD -->
            <section class="pattern-section">
                <h2>📊 Pattern 1: Dashboard Widgets</h2>
                <p class="pattern-desc">Load widgets as they enter viewport</p>
                
                <div class="dashboard-grid">
                    @defer (on viewport; prefetch on idle) {
                        <app-analytics-widget />
                    } @placeholder {
                        <div class="widget-placeholder">📊 Analytics loading...</div>
                    } @loading (minimum 300ms) {
                        <div class="widget-loading"><span class="spinner"></span></div>
                    }

                    @defer (on viewport; prefetch on idle) {
                        <app-revenue-widget />
                    } @placeholder {
                        <div class="widget-placeholder">💰 Revenue loading...</div>
                    } @loading (minimum 300ms) {
                        <div class="widget-loading"><span class="spinner"></span></div>
                    }
                </div>

                <pre class="code"><code>&#64;defer (on viewport; prefetch on idle) {{ '{' }}
  &lt;analytics-widget /&gt;
{{ '}' }} &#64;placeholder {{ '{' }}
  &lt;skeleton /&gt;
{{ '}' }}</code></pre>
            </section>

            <!-- PATTERN 2: COMMENTS -->
            <section class="pattern-section">
                <h2>💬 Pattern 2: Comments Section</h2>
                <p class="pattern-desc">Scroll down - comments load when visible</p>
                
                <div class="spacer">👇 Scroll to load comments</div>
                
                @defer (on viewport) {
                    <app-comments-section />
                } @placeholder {
                    <div class="comments-placeholder">
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line short"></div>
                        <div class="skeleton-line"></div>
                    </div>
                }

                <pre class="code"><code>&#64;defer (on viewport) {{ '{' }}
  &lt;comments-section /&gt;
{{ '}' }}</code></pre>
            </section>

            <!-- PATTERN 3: MODAL -->
            <section class="pattern-section">
                <h2>🪟 Pattern 3: Heavy Modal</h2>
                <p class="pattern-desc">Prefetch on hover, show on click</p>
                
                <div class="modal-demo" #modalTrigger>
                    @defer (on interaction(modalTrigger); prefetch on hover(modalTrigger)) {
                        <div class="modal-content">
                            <h4>✨ Modal Loaded!</h4>
                            <p>This heavy modal was prefetched on hover.</p>
                        </div>
                    } @placeholder {
                        <button class="modal-btn">Click to Open Modal</button>
                    } @loading {
                        <button class="modal-btn loading">Opening...</button>
                    }
                </div>

                <pre class="code"><code>&#64;defer (on interaction; prefetch on hover) {{ '{' }}
  &lt;heavy-modal /&gt;
{{ '}' }}</code></pre>
            </section>

            <!-- Best Practices -->
            <section class="best-practices">
                <h2>✅ Best Practices</h2>
                <ul>
                    <li>Use <code>on viewport</code> for below-fold content</li>
                    <li>Add <code>prefetch on idle</code> for likely-viewed content</li>
                    <li>Use <code>minimum</code> on &#64;loading to prevent flicker</li>
                    <li>Provide meaningful &#64;placeholder for better UX</li>
                    <li>Use skeleton loaders instead of spinners when possible</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .pattern-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .pattern-section h2 { margin-top: 0; }
        .pattern-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }

        .dashboard-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .widget-placeholder {
            background: #e5e7eb;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            animation: pulse 1.5s infinite;
        }
        .widget-loading {
            background: #e5e7eb;
            padding: 2rem;
            border-radius: 8px;
            display: flex;
            justify-content: center;
        }
        .spinner {
            width: 24px; height: 24px;
            border: 3px solid #667eea;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

        .spacer {
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
            font-size: 1.2rem;
        }
        .comments-placeholder { background: #f3f4f6; padding: 1.5rem; border-radius: 8px; }
        .skeleton-line {
            height: 1rem;
            background: #e5e7eb;
            border-radius: 4px;
            margin-bottom: 0.75rem;
            animation: pulse 1.5s infinite;
        }
        .skeleton-line.short { width: 60%; }

        .modal-demo { margin-bottom: 1.5rem; }
        .modal-btn {
            width: 100%;
            padding: 1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
        }
        .modal-btn.loading { opacity: 0.7; }
        .modal-content {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
        }

        .code {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.85rem;
        }

        .best-practices {
            background: linear-gradient(135deg, #10b98120, #14b8a620);
            padding: 2rem;
            border-radius: 12px;
        }
        .best-practices h2 { margin-top: 0; }
        .best-practices li { margin-bottom: 0.5rem; }
        .best-practices code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }
    `]
})
export class RealWorldComponent { }
