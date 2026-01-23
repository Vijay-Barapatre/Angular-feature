/**
 * ANIMATIONS FEATURE - Overview Component
 * 
 * Main navigation hub for all animation use cases
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-animations-overview',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="overview-container">
            <header class="overview-header">
                <a routerLink="/features" class="back-link">← Back to Features</a>
                <h1>🎬 Angular Animations</h1>
                <p class="subtitle">Create smooth, professional animations with Angular's built-in animation system</p>
            </header>

            <section class="intro-section">
                <div class="intro-card">
                    <h2>What You'll Learn</h2>
                    <ul>
                        <li>✨ State-based animations with triggers</li>
                        <li>🚪 Enter/leave animations for DOM changes</li>
                        <li>🎬 Multi-step keyframes animations</li>
                        <li>🎭 Query & stagger for list animations</li>
                        <li>🛤️ Route transition animations</li>
                    </ul>
                </div>

                <div class="setup-card">
                    <h2>⚙️ Setup Required</h2>
                    <pre><code>// main.ts (Standalone)
import &#123; provideAnimations &#125; from '&#64;angular/platform-browser/animations';

bootstrapApplication(AppComponent, &#123;
  providers: [provideAnimations()]
&#125;);

// Or for NgModule
import &#123; BrowserAnimationsModule &#125; from '&#64;angular/platform-browser/animations';

&#64;NgModule(&#123;
  imports: [BrowserAnimationsModule]
&#125;)</code></pre>
                </div>
            </section>

            <nav class="use-cases-nav">
                <h2>📚 Use Cases</h2>
                <div class="use-cases-grid">
                    <a routerLink="basic-state-animation" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🎯</div>
                        <h3></h3>
                        <p>Basic State Animations</p>
                        <span class="topics">trigger, state, transition, animate</span>
                    </a>

                    <a routerLink="enter-leave-animation" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🚪</div>
                        <h3></h3>
                        <p>Enter/Leave Animations</p>
                        <span class="topics">:enter, :leave, void, *</span>
                    </a>

                    <a routerLink="keyframes-animation" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🎬</div>
                        <h3></h3>
                        <p>Keyframes Animations</p>
                        <span class="topics">keyframes, offset, multi-step</span>
                    </a>

                    <a routerLink="query-stagger-animation" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🎭</div>
                        <h3></h3>
                        <p>Query & Stagger</p>
                        <span class="topics">query, stagger, group</span>
                    </a>

                    <a routerLink="route-animation" class="use-case-card" routerLinkActive="active">
                        <div class="icon">🛤️</div>
                        <h3></h3>
                        <p>Route Animations</p>
                        <span class="topics">page transitions, router outlet</span>
                    </a>
                </div>
            </nav>

            <section class="quick-reference">
                <h2>🔧 Quick Reference</h2>
                <div class="reference-grid">
                    <div class="reference-card">
                        <h4>Animation Functions</h4>
                        <ul>
                            <li><code>trigger()</code> - Names the animation</li>
                            <li><code>state()</code> - Defines style states</li>
                            <li><code>style()</code> - CSS properties</li>
                            <li><code>transition()</code> - When to animate</li>
                            <li><code>animate()</code> - Duration & timing</li>
                        </ul>
                    </div>
                    <div class="reference-card">
                        <h4>Advanced Functions</h4>
                        <ul>
                            <li><code>keyframes()</code> - Multi-step animations</li>
                            <li><code>query()</code> - Select children</li>
                            <li><code>stagger()</code> - Delay between items</li>
                            <li><code>group()</code> - Parallel animations</li>
                            <li><code>sequence()</code> - Serial animations</li>
                        </ul>
                    </div>
                    <div class="reference-card">
                        <h4>Special States</h4>
                        <ul>
                            <li><code>void</code> - Not in DOM</li>
                            <li><code>*</code> - Any state (wildcard)</li>
                            <li><code>:enter</code> - void => *</li>
                            <li><code>:leave</code> - * => void</li>
                            <li><code>:increment</code> - Value increased</li>
                        </ul>
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

        .overview-header {
            margin-bottom: 2rem;
        }

        .back-link {
            color: #a855f7;
            text-decoration: none;
            font-size: 0.9rem;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        h1 {
            font-size: 2.5rem;
            margin: 0.5rem 0;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            color: #a0a0a0;
            font-size: 1.1rem;
            margin: 0;
        }

        .intro-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .intro-card, .setup-card {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
        }

        .intro-card h2, .setup-card h2 {
            margin: 0 0 1rem;
            color: #f5f5f5;
        }

        .intro-card ul {
            margin: 0;
            padding-left: 0;
            list-style: none;
        }

        .intro-card li {
            padding: 0.5rem 0;
            color: #e0e0e0;
        }

        .setup-card pre {
            background: #0d0d0d;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 0;
        }

        .setup-card code {
            color: #a6e3a1;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }

        .use-cases-nav h2, .quick-reference h2 {
            color: #f5f5f5;
            margin-bottom: 1rem;
        }

        .use-cases-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
            border-color: #a855f7;
            box-shadow: 0 8px 24px rgba(168, 85, 247, 0.2);
        }

        .use-case-card.active {
            border-color: #a855f7;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.1));
        }

        .use-case-card .icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .use-case-card h3 {
            margin: 0 0 0.25rem;
            color: #a855f7;
        }

        .use-case-card p {
            margin: 0 0 0.5rem;
            color: #f5f5f5;
        }

        .use-case-card .topics {
            font-size: 0.8rem;
            color: #a0a0a0;
        }

        .quick-reference {
            margin-bottom: 2rem;
        }

        .reference-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }

        .reference-card {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1rem;
            border-radius: 8px;
        }

        .reference-card h4 {
            margin: 0 0 0.75rem;
            color: #a855f7;
        }

        .reference-card ul {
            margin: 0;
            padding-left: 0;
            list-style: none;
        }

        .reference-card li {
            padding: 0.3rem 0;
            color: #e0e0e0;
            font-size: 0.9rem;
        }

        .reference-card code {
            background: #0d0d0d;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.85rem;
            color: #a6e3a1;
        }

        .content-area {
            background: var(--bg-secondary, #1e1e2e);
            border-radius: 12px;
            min-height: 200px;
        }

        @media (max-width: 768px) {
            .intro-section {
                grid-template-columns: 1fr;
            }
        }
    `]
})
export class AnimationsOverviewComponent { }
