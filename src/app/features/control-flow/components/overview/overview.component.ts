/**
 * CONTROL FLOW FEATURE - Overview Component
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-control-flow-overview',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="overview-container">
            <header class="overview-header">
                <a routerLink="/features" class="back-link">← Back to Features</a>
                <h1>🔀 Angular Control Flow</h1>
                <p class="subtitle">Angular 17+ built-in control flow syntax - cleaner, faster, better!</p>
            </header>

            <section class="intro-section">
                <div class="highlight-card">
                    <h2>🆕 What's New in Angular 17+</h2>
                    <p>Built-in control flow replaces structural directives with cleaner block syntax:</p>
                    <div class="comparison">
                        <div class="old">
                            <h4>❌ Old Way</h4>
                            <code>*ngIf, *ngFor, *ngSwitch</code>
                        </div>
                        <div class="arrow">→</div>
                        <div class="new">
                            <h4>✅ New Way</h4>
                            <code>&#64;if, &#64;for, &#64;switch</code>
                        </div>
                    </div>
                </div>
            </section>

            <nav class="use-cases-nav">
                <h2>📚 Use Cases</h2>
                <div class="use-cases-grid">
                    <a routerLink="use-case-1" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🎯</div>
                        <h3></h3>
                        <p>Conditional</p>
                        <span class="topics">if, else, else if, as</span>
                    </a>

                    <a routerLink="use-case-2" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🔄</div>
                        <h3></h3>
                        <p>Loop</p>
                        <span class="topics">track, $index, empty</span>
                    </a>

                    <a routerLink="use-case-3" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🔀</div>
                        <h3></h3>
                        <p>Switch Multi-Condition</p>
                        <span class="topics">case, default</span>
                    </a>
                </div>
            </nav>

            <section class="quick-reference">
                <h2>🔧 Quick Reference</h2>
                <div class="reference-grid">
                    <div class="reference-card if">
                        <h4>Conditional</h4>
                        <div class="syntax-text">
                            <code>&#64;if (condition) &#123;...&#125;</code><br>
                            <code>&#64;else &#123;...&#125;</code>
                        </div>
                    </div>
                    <div class="reference-card for">
                        <h4>Loop</h4>
                        <div class="syntax-text">
                            <code>&#64;for (item of items; track item.id) &#123;...&#125;</code><br>
                            <code>&#64;empty &#123;...&#125;</code>
                        </div>
                    </div>
                    <div class="reference-card switch">
                        <h4>Switch</h4>
                        <div class="syntax-text">
                            <code>&#64;switch (value) &#123;...&#125;</code><br>
                            <code>&#64;case (x) &#123;...&#125;</code><br>
                            <code>&#64;default &#123;...&#125;</code>
                        </div>
                    </div>
                </div>
            </section>

            <section class="benefits-section">
                <h2>✨ Benefits</h2>
                <div class="benefits-grid">
                    <div class="benefit">
                        <span class="emoji">🚀</span>
                        <h4>Better Performance</h4>
                        <p>Optimized change detection with required track</p>
                    </div>
                    <div class="benefit">
                        <span class="emoji">📖</span>
                        <h4>Cleaner Syntax</h4>
                        <p>No ng-template for else, inline empty blocks</p>
                    </div>
                    <div class="benefit">
                        <span class="emoji">🎯</span>
                        <h4>Type Safety</h4>
                        <p>Better type narrowing in conditional blocks</p>
                    </div>
                    <div class="benefit">
                        <span class="emoji">📦</span>
                        <h4>Smaller Bundles</h4>
                        <p>Built-in = no directive imports needed</p>
                    </div>
                </div>
            </section>

            <main class="content-area">
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    styles: [`
        .overview-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .overview-header { margin-bottom: 2rem; }

        .back-link {
            color: #22c55e;
            text-decoration: none;
        }

        h1 {
            font-size: 2.5rem;
            margin: 0.5rem 0;
            background: linear-gradient(135deg, #22c55e, #14b8a6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle { color: #a0a0a0; margin: 0; }

        .intro-section { margin-bottom: 2rem; }

        .highlight-card {
            background: linear-gradient(135deg, #22c55e, #14b8a6);
            padding: 1.5rem;
            border-radius: 12px;
            color: white;
        }

        .highlight-card h2 { margin: 0 0 0.5rem; }
        .highlight-card p { margin: 0 0 1rem; opacity: 0.9; }

        .comparison {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: rgba(0,0,0,0.2);
            padding: 1rem;
            border-radius: 8px;
        }

        .old, .new { flex: 1; text-align: center; }
        .old h4, .new h4 { margin: 0 0 0.5rem; }
        .old code, .new code {
            background: rgba(0,0,0,0.3);
            padding: 0.5rem;
            border-radius: 4px;
            display: block;
        }
        .arrow { font-size: 1.5rem; }

        .use-cases-nav h2, .quick-reference h2, .benefits-section h2 {
            color: #f5f5f5;
            margin-bottom: 1rem;
        }

        .use-cases-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .use-case-card {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .use-case-card:hover {
            transform: translateY(-4px);
            border-color: #22c55e;
            box-shadow: 0 8px 24px rgba(34, 197, 94, 0.2);
        }

        .use-case-card.active {
            border-color: #22c55e;
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(20, 184, 166, 0.1));
        }

        .use-case-card .icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .use-case-card h3 { margin: 0 0 0.25rem; color: #22c55e; }
        .use-case-card p { margin: 0 0 0.5rem; color: #f5f5f5; }
        .use-case-card .topics { font-size: 0.8rem; color: #a0a0a0; }

        .reference-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .reference-card {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid;
        }

        .reference-card.if { border-color: #22c55e; }
        .reference-card.for { border-color: #3b82f6; }
        .reference-card.switch { border-color: #a855f7; }

        .reference-card h4 { margin: 0 0 0.5rem; color: #f5f5f5; }
        .reference-card pre {
            background: #0d0d0d;
            padding: 0.75rem;
            border-radius: 6px;
            margin: 0;
            overflow-x: auto;
        }
        .reference-card code {
            color: #a6e3a1;
            font-family: 'Fira Code', monospace;
            font-size: 0.8rem;
        }

        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .benefit {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
        }

        .benefit .emoji { font-size: 2rem; }
        .benefit h4 { margin: 0.5rem 0; color: #22c55e; }
        .benefit p { margin: 0; color: #a0a0a0; font-size: 0.9rem; }

        .content-area {
            background: var(--bg-secondary, #1e1e2e);
            border-radius: 12px;
            min-height: 200px;
        }
    `]
})
export class ControlFlowOverviewComponent { }
