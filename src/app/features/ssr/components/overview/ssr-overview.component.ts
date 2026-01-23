/**
 * ============================================================================
 * SSR OVERVIEW COMPONENT
 * ============================================================================
 * 
 * Landing page for the Server-Side Rendering feature module.
 * Provides an overview of SSR concepts and navigation to use cases.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ssr-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="overview-container">
            <!-- Hero Section -->
            <header class="hero">
                <div class="hero-content">
                    <h1>🖥️ Server-Side Rendering (SSR)</h1>
                    <p class="subtitle">
                        Master Angular Universal for SEO, performance, and better user experience.
                        Learn how to render Angular applications on the server.
                    </p>
                    <div class="hero-stats">
                        <div class="stat">
                            <span class="stat-value">6</span>
                            <span class="stat-label">Use Cases</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">Angular 17+</span>
                            <span class="stat-label">Version</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">Advanced</span>
                            <span class="stat-label">Level</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- What is SSR Section -->
            <section class="info-section">
                <h2>📚 What is Server-Side Rendering?</h2>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-icon">🌐</div>
                        <h3>Traditional SPA</h3>
                        <p>
                            Single Page Applications render entirely in the browser.
                            The server sends an empty HTML shell, and JavaScript builds the UI.
                        </p>
                        <div class="code-example">
                            <code>&lt;app-root&gt;&lt;/app-root&gt;</code>
                            <span class="code-note">Empty until JS loads</span>
                        </div>
                    </div>
                    <div class="info-card highlight">
                        <div class="info-icon">🖥️</div>
                        <h3>Server-Side Rendering</h3>
                        <p>
                            HTML is generated on the server with full content.
                            The browser receives ready-to-display HTML immediately.
                        </p>
                        <div class="code-example">
                            <code>&lt;app-root&gt;Full Content Here&lt;/app-root&gt;</code>
                            <span class="code-note">Content visible immediately</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Benefits Section -->
            <section class="benefits-section">
                <h2>✨ Why Use SSR?</h2>
                <div class="benefits-grid">
                    <div class="benefit-card">
                        <span class="benefit-icon">🔍</span>
                        <h4>SEO Optimization</h4>
                        <p>Search engines can crawl and index your content properly</p>
                    </div>
                    <div class="benefit-card">
                        <span class="benefit-icon">⚡</span>
                        <h4>Faster FCP</h4>
                        <p>First Contentful Paint happens immediately without waiting for JS</p>
                    </div>
                    <div class="benefit-card">
                        <span class="benefit-icon">📱</span>
                        <h4>Better Mobile Performance</h4>
                        <p>Less processing required on low-powered devices</p>
                    </div>
                    <div class="benefit-card">
                        <span class="benefit-icon">🔗</span>
                        <h4>Social Media Sharing</h4>
                        <p>Open Graph and Twitter cards work correctly</p>
                    </div>
                    <div class="benefit-card">
                        <span class="benefit-icon">♿</span>
                        <h4>Accessibility</h4>
                        <p>Content available even when JavaScript fails</p>
                    </div>
                    <div class="benefit-card">
                        <span class="benefit-icon">📊</span>
                        <h4>Core Web Vitals</h4>
                        <p>Improved LCP, FID, and CLS scores</p>
                    </div>
                </div>
            </section>

            <!-- SSR Flow Diagram -->
            <section class="flow-section">
                <h2>🔄 How SSR Works</h2>
                <div class="flow-diagram">
                    <div class="flow-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Request</h4>
                            <p>User requests a page</p>
                        </div>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Server Render</h4>
                            <p>Angular renders HTML on server</p>
                        </div>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Send HTML</h4>
                            <p>Full HTML sent to browser</p>
                        </div>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Hydration</h4>
                            <p>Client-side Angular takes over</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Use Cases Section -->
            <section class="use-cases-section">
                <h2>📖 Use Cases</h2>
                <div class="use-cases-grid">
                    <a *ngFor="let useCase of useCases" 
                       [routerLink]="useCase.route" 
                       class="use-case-card">
                        <div class="use-case-header">
                            <span class="use-case-icon">{{ useCase.icon }}</span>
                            <span class="use-case-number">{{ useCase.number }}</span>
                        </div>
                        <h3>{{ useCase.title }}</h3>
                        <p>{{ useCase.description }}</p>
                        <div class="use-case-tags">
                            <span *ngFor="let tag of useCase.tags" class="tag">{{ tag }}</span>
                        </div>
                    </a>
                </div>
            </section>

            <!-- Angular 17+ Note -->
            <section class="version-note">
                <div class="note-content">
                    <span class="note-icon">💡</span>
                    <div>
                        <h4>Angular 17+ SSR Improvements</h4>
                        <p>
                            Angular 17 introduced significant SSR improvements including:
                            <strong>Non-destructive Hydration</strong>, 
                            <strong>Event Replay</strong>, and 
                            <strong>Improved Developer Experience</strong> with the new 
                            <code>&#64;angular/ssr</code> package.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .overview-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
            border-radius: 20px;
            padding: 3rem;
            color: white;
            margin-bottom: 2rem;
            text-align: center;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin: 0 0 1rem;
        }

        .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            max-width: 700px;
            margin: 0 auto 2rem;
            line-height: 1.6;
        }

        .hero-stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
        }

        .stat {
            text-align: center;
        }

        .stat-value {
            display: block;
            font-size: 1.8rem;
            font-weight: bold;
        }

        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* Info Section */
        .info-section {
            margin-bottom: 2rem;
        }

        h2 {
            font-size: 1.5rem;
            color: var(--text-primary, #1f2937);
            margin-bottom: 1.5rem;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .info-card {
            background: var(--bg-secondary, #f8fafc);
            padding: 1.5rem;
            border-radius: 12px;
            border: 2px solid var(--border-color, #e2e8f0);
        }

        .info-card.highlight {
            border-color: #8b5cf6;
            background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
        }

        .info-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .info-card h3 {
            margin: 0 0 0.5rem;
            font-size: 1.2rem;
            color: var(--text-primary, #1f2937);
        }

        .info-card p {
            margin: 0 0 1rem;
            color: var(--text-secondary, #64748b);
            line-height: 1.5;
        }

        .code-example {
            background: var(--bg-tertiary, #1e293b);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
        }

        .code-example code {
            color: #e879f9;
            font-size: 0.85rem;
        }

        .code-note {
            display: block;
            color: #94a3b8;
            font-size: 0.75rem;
            margin-top: 0.5rem;
        }

        /* Benefits Section */
        .benefits-section {
            margin-bottom: 2rem;
        }

        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }

        .benefit-card {
            background: var(--bg-secondary, #f8fafc);
            padding: 1.25rem;
            border-radius: 12px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .benefit-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
        }

        .benefit-icon {
            font-size: 1.5rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .benefit-card h4 {
            margin: 0 0 0.25rem;
            font-size: 1rem;
            color: var(--text-primary, #1f2937);
        }

        .benefit-card p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
        }

        /* Flow Diagram */
        .flow-section {
            margin-bottom: 2rem;
        }

        .flow-diagram {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 2rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            overflow-x: auto;
        }

        .flow-step {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
            min-width: 150px;
        }

        .step-number {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }

        .step-content h4 {
            margin: 0;
            font-size: 0.9rem;
            color: var(--text-primary, #1f2937);
        }

        .step-content p {
            margin: 0;
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
        }

        .flow-arrow {
            font-size: 1.5rem;
            color: #8b5cf6;
            font-weight: bold;
        }

        /* Use Cases Section */
        .use-cases-section {
            margin-bottom: 2rem;
        }

        .use-cases-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }

        .use-case-card {
            display: block;
            padding: 1.5rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            text-decoration: none;
            color: inherit;
            border: 2px solid transparent;
            transition: all 0.2s ease;
        }

        .use-case-card:hover {
            border-color: #8b5cf6;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
        }

        .use-case-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .use-case-icon {
            font-size: 1.5rem;
        }

        .use-case-number {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .use-case-card h3 {
            margin: 0 0 0.5rem;
            font-size: 1.1rem;
            color: var(--text-primary, #1f2937);
        }

        .use-case-card p {
            margin: 0 0 1rem;
            font-size: 0.9rem;
            color: var(--text-secondary, #64748b);
            line-height: 1.5;
        }

        .use-case-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tag {
            background: #ede9fe;
            color: #7c3aed;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
        }

        /* Version Note */
        .version-note {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12px;
            padding: 1.5rem;
            border-left: 4px solid #f59e0b;
        }

        .note-content {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }

        .note-icon {
            font-size: 1.5rem;
        }

        .note-content h4 {
            margin: 0 0 0.5rem;
            color: #92400e;
        }

        .note-content p {
            margin: 0;
            color: #78350f;
            line-height: 1.6;
        }

        .note-content code {
            background: rgba(0,0,0,0.1);
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .info-grid, .benefits-grid {
                grid-template-columns: 1fr;
            }
            .hero-stats {
                flex-wrap: wrap;
                gap: 1.5rem;
            }
            .flow-diagram {
                flex-direction: column;
            }
            .flow-arrow {
                transform: rotate(90deg);
            }
        }
    `]
})
export class SsrOverviewComponent {
    useCases = [
        {
            number: '',
            icon: '📚',
            title: 'SSR Fundamentals',
            route: 'ssr-fundamentals',
            description: 'Understand the basics of Angular Universal, how SSR works, and when to use it.',
            tags: ['Angular Universal', '@angular/ssr', 'Setup']
        },
        {
            number: '',
            icon: '💧',
            title: 'Hydration',
            route: 'hydration',
            description: 'Learn how the client takes over from server-rendered HTML without flickering.',
            tags: ['Client Hydration', 'Event Replay', 'Non-destructive']
        },
        {
            number: '',
            icon: '📦',
            title: 'Transfer State',
            route: 'transfer-state',
            description: 'Share data between server and client to avoid duplicate API calls.',
            tags: ['TransferState', 'State Transfer', 'API Caching']
        },
        {
            number: '',
            icon: '🔍',
            title: 'Platform Detection',
            route: 'platform-detection',
            description: 'Handle browser-only APIs and code that cannot run on the server.',
            tags: ['isPlatformBrowser', 'isPlatformServer', 'DOM APIs']
        },
        {
            number: '',
            icon: '🔍',
            title: 'SEO Optimization',
            route: 'seo-optimization',
            description: 'Implement meta tags, Open Graph, and structured data for search engines.',
            tags: ['Meta Tags', 'Structured Data', 'Social Sharing']
        },
        {
            number: '',
            icon: '📄',
            title: 'Prerendering (SSG)',
            route: 'prerendering',
            description: 'Generate static HTML at build time for even faster page loads.',
            tags: ['Static Generation', 'Build Time', 'Edge Caching']
        }
    ];
}
