/**
 * ============================================================================
 * USE CASE 1: SSR FUNDAMENTALS COMPONENT
 * ============================================================================
 * 
 * This component demonstrates the core concepts of Server-Side Rendering.
 * It shows how SSR works by displaying information about the rendering
 * environment and comparing CSR vs SSR approaches.
 * 
 * KEY CONCEPTS:
 * 1. Angular Universal - The official SSR solution
 * 2. CommonEngine - Renders Angular apps on the server
 * 3. Request/Response cycle - How pages are served
 * 4. Benefits - SEO, performance, accessibility
 */

import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-ssr-fundamentals',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="fundamentals-container">
            <header class="header">
                <h1>📚 SSR Fundamentals</h1>
                <p class="subtitle">
                    Understanding the basics of Server-Side Rendering with Angular Universal
                </p>
            </header>

            <!-- Current Render Environment -->
            <section class="demo-section">
                <h2>🔍 Current Render Environment</h2>
                <div class="environment-card" [class.browser]="isBrowser" [class.server]="isServer">
                    <div class="env-icon">{{ isBrowser ? '🌐' : '🖥️' }}</div>
                    <div class="env-info">
                        <h3>{{ isBrowser ? 'Browser Rendering' : 'Server Rendering' }}</h3>
                        <p>{{ isBrowser ? 
                            'This page was hydrated in the browser. The Angular application is now fully interactive.' : 
                            'This page is being rendered on the server. HTML will be sent to the browser.' 
                        }}</p>
                    </div>
                    <div class="env-badge">{{ isBrowser ? 'CLIENT' : 'SERVER' }}</div>
                </div>

                <div class="render-info">
                    <div class="info-item">
                        <span class="label">Platform ID:</span>
                        <code>{{ platformId }}</code>
                    </div>
                    <div class="info-item">
                        <span class="label">Render Time:</span>
                        <code>{{ renderTime }}</code>
                    </div>
                    <div class="info-item">
                        <span class="label">User Agent:</span>
                        <code>{{ userAgent }}</code>
                    </div>
                </div>
            </section>

            <!-- CSR vs SSR Comparison -->
            <section class="comparison-section">
                <h2>⚖️ CSR vs SSR Comparison</h2>
                <div class="comparison-grid">
                    <div class="comparison-card csr">
                        <div class="card-header">
                            <span class="icon">🌐</span>
                            <h3>Client-Side Rendering (CSR)</h3>
                        </div>
                        <div class="timeline">
                            <div class="timeline-step">
                                <span class="step-number">1</span>
                                <span class="step-text">Browser requests page</span>
                                <span class="time">0ms</span>
                            </div>
                            <div class="timeline-step">
                                <span class="step-number">2</span>
                                <span class="step-text">Server sends empty HTML</span>
                                <span class="time">~50ms</span>
                            </div>
                            <div class="timeline-step">
                                <span class="step-number">3</span>
                                <span class="step-text">Browser downloads JS (~500KB)</span>
                                <span class="time">~200ms</span>
                            </div>
                            <div class="timeline-step">
                                <span class="step-number">4</span>
                                <span class="step-text">JavaScript parses & executes</span>
                                <span class="time">~500ms</span>
                            </div>
                            <div class="timeline-step highlight">
                                <span class="step-number">5</span>
                                <span class="step-text">Content visible!</span>
                                <span class="time total">~800ms</span>
                            </div>
                        </div>
                    </div>

                    <div class="comparison-card ssr">
                        <div class="card-header">
                            <span class="icon">🖥️</span>
                            <h3>Server-Side Rendering (SSR)</h3>
                        </div>
                        <div class="timeline">
                            <div class="timeline-step">
                                <span class="step-number">1</span>
                                <span class="step-text">Browser requests page</span>
                                <span class="time">0ms</span>
                            </div>
                            <div class="timeline-step">
                                <span class="step-number">2</span>
                                <span class="step-text">Server renders HTML</span>
                                <span class="time">~100ms</span>
                            </div>
                            <div class="timeline-step highlight">
                                <span class="step-number">3</span>
                                <span class="step-text">Content visible!</span>
                                <span class="time total">~150ms</span>
                            </div>
                            <div class="timeline-step">
                                <span class="step-number">4</span>
                                <span class="step-text">Browser downloads JS</span>
                                <span class="time">~200ms</span>
                            </div>
                            <div class="timeline-step">
                                <span class="step-number">5</span>
                                <span class="step-text">Hydration complete</span>
                                <span class="time">~400ms</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="comparison-summary">
                    <p>
                        <strong>Key Insight:</strong> With SSR, users see content 
                        <span class="highlight-text">5x faster</span> (150ms vs 800ms). 
                        The page becomes interactive shortly after as JavaScript hydrates the application.
                    </p>
                </div>
            </section>

            <!-- Benefits Grid -->
            <section class="benefits-section">
                <h2>✨ Benefits of SSR</h2>
                <div class="benefits-grid">
                    <div class="benefit-card" *ngFor="let benefit of benefits">
                        <span class="benefit-icon">{{ benefit.icon }}</span>
                        <h4>{{ benefit.title }}</h4>
                        <p>{{ benefit.description }}</p>
                        <div class="metric" *ngIf="benefit.metric">
                            <span class="metric-value">{{ benefit.metric.value }}</span>
                            <span class="metric-label">{{ benefit.metric.label }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Setup Guide -->
            <section class="setup-section">
                <h2>🛠️ Quick Setup Guide</h2>
                <div class="setup-steps">
                    <div class="setup-step" *ngFor="let step of setupSteps; let i = index">
                        <div class="step-header">
                            <span class="step-num">{{ i + 1 }}</span>
                            <h4>{{ step.title }}</h4>
                        </div>
                        <div class="code-block">
                            <div class="code-header">
                                <span class="code-lang">{{ step.language }}</span>
                                <button class="copy-btn" (click)="copyCode(step.code)">
                                    {{ copiedIndex === i ? '✓ Copied' : 'Copy' }}
                                </button>
                            </div>
                            <pre><code>{{ step.code }}</code></pre>
                        </div>
                        <p class="step-note">{{ step.note }}</p>
                    </div>
                </div>
            </section>

            <!-- When to Use SSR -->
            <section class="use-cases-section">
                <h2>📋 When to Use SSR</h2>
                <div class="use-cases-grid">
                    <div class="use-case-list good">
                        <h4>✅ Good Use Cases</h4>
                        <ul>
                            <li>
                                <strong>Content Sites</strong>
                                <span>Blogs, news, documentation</span>
                            </li>
                            <li>
                                <strong>E-commerce</strong>
                                <span>Product pages need SEO</span>
                            </li>
                            <li>
                                <strong>Marketing</strong>
                                <span>Landing pages, campaigns</span>
                            </li>
                            <li>
                                <strong>Social Sharing</strong>
                                <span>Open Graph, Twitter cards</span>
                            </li>
                        </ul>
                    </div>
                    <div class="use-case-list bad">
                        <h4>❌ Consider Alternatives</h4>
                        <ul>
                            <li>
                                <strong>Dashboards</strong>
                                <span>Behind auth, no SEO needed</span>
                            </li>
                            <li>
                                <strong>Real-time Apps</strong>
                                <span>Chat, live collaboration</span>
                            </li>
                            <li>
                                <strong>Heavy SPAs</strong>
                                <span>Complex state, many routes</span>
                            </li>
                            <li>
                                <strong>Offline-first PWAs</strong>
                                <span>Service worker handles this</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Key Takeaways -->
            <section class="takeaways-section">
                <h2>🎯 Key Takeaways</h2>
                <div class="takeaways-list">
                    <div class="takeaway" *ngFor="let takeaway of takeaways; let i = index">
                        <span class="takeaway-num">{{ i + 1 }}</span>
                        <p>{{ takeaway }}</p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .fundamentals-container {
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

        /* Demo Section */
        .demo-section {
            margin-bottom: 2.5rem;
        }

        h2 {
            font-size: 1.3rem;
            color: var(--text-primary, #1f2937);
            margin-bottom: 1rem;
        }

        .environment-card {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1rem;
            position: relative;
        }

        .environment-card.browser {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border: 2px solid #3b82f6;
        }

        .environment-card.server {
            background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
            border: 2px solid #8b5cf6;
        }

        .env-icon {
            font-size: 2.5rem;
        }

        .env-info h3 {
            margin: 0 0 0.25rem;
            font-size: 1.2rem;
            color: var(--text-primary, #1f2937);
        }

        .env-info p {
            margin: 0;
            color: var(--text-secondary, #64748b);
            font-size: 0.9rem;
        }

        .env-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            background: rgba(0,0,0,0.1);
        }

        .render-info {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 8px;
        }

        .info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .info-item .label {
            font-weight: 500;
            color: var(--text-secondary, #64748b);
        }

        .info-item code {
            background: var(--bg-tertiary, #e2e8f0);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }

        /* Comparison Section */
        .comparison-section {
            margin-bottom: 2.5rem;
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            margin-bottom: 1rem;
        }

        .comparison-card {
            padding: 1.5rem;
            border-radius: 12px;
            border: 2px solid;
        }

        .comparison-card.csr {
            background: #fef2f2;
            border-color: #fca5a5;
        }

        .comparison-card.ssr {
            background: #ecfdf5;
            border-color: #6ee7b7;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        .card-header .icon {
            font-size: 1.5rem;
        }

        .card-header h3 {
            margin: 0;
            font-size: 1rem;
        }

        .timeline {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .timeline-step {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem;
            background: rgba(255,255,255,0.5);
            border-radius: 6px;
        }

        .timeline-step.highlight {
            background: rgba(0,0,0,0.05);
            font-weight: 500;
        }

        .step-number {
            width: 24px;
            height: 24px;
            background: var(--text-secondary, #64748b);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            flex-shrink: 0;
        }

        .step-text {
            flex: 1;
            font-size: 0.85rem;
        }

        .time {
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
            font-family: monospace;
        }

        .time.total {
            color: #16a34a;
            font-weight: 600;
        }

        .comparison-summary {
            padding: 1rem;
            background: #eff6ff;
            border-radius: 8px;
            text-align: center;
        }

        .comparison-summary p {
            margin: 0;
            color: var(--text-primary, #1f2937);
        }

        .highlight-text {
            color: #16a34a;
            font-weight: 600;
        }

        /* Benefits Section */
        .benefits-section {
            margin-bottom: 2.5rem;
        }

        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }

        .benefit-card {
            padding: 1.25rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            text-align: center;
            transition: transform 0.2s;
        }

        .benefit-card:hover {
            transform: translateY(-2px);
        }

        .benefit-icon {
            font-size: 1.5rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .benefit-card h4 {
            margin: 0 0 0.25rem;
            font-size: 0.95rem;
            color: var(--text-primary, #1f2937);
        }

        .benefit-card p {
            margin: 0;
            font-size: 0.8rem;
            color: var(--text-secondary, #64748b);
        }

        .metric {
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid var(--border-color, #e2e8f0);
        }

        .metric-value {
            display: block;
            font-size: 1.25rem;
            font-weight: bold;
            color: #16a34a;
        }

        .metric-label {
            font-size: 0.7rem;
            color: var(--text-secondary, #64748b);
        }

        /* Setup Section */
        .setup-section {
            margin-bottom: 2.5rem;
        }

        .setup-steps {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .setup-step {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            overflow: hidden;
        }

        .step-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
        }

        .step-num {
            width: 28px;
            height: 28px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        .step-header h4 {
            margin: 0;
            font-size: 1rem;
        }

        .code-block {
            margin: 0;
        }

        .code-header {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            background: #1e293b;
        }

        .code-lang {
            color: #94a3b8;
            font-size: 0.75rem;
        }

        .copy-btn {
            background: transparent;
            border: 1px solid #64748b;
            color: #94a3b8;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
        }

        .copy-btn:hover {
            background: rgba(255,255,255,0.1);
        }

        pre {
            margin: 0;
            padding: 1rem;
            background: #0f172a;
            overflow-x: auto;
        }

        pre code {
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }

        .step-note {
            padding: 1rem;
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
            border-top: 1px solid var(--border-color, #e2e8f0);
        }

        /* Use Cases Section */
        .use-cases-section {
            margin-bottom: 2.5rem;
        }

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
            font-size: 1rem;
        }

        .use-case-list ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .use-case-list li {
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .use-case-list li:last-child {
            border-bottom: none;
        }

        .use-case-list li strong {
            display: block;
            font-size: 0.9rem;
            color: var(--text-primary, #1f2937);
        }

        .use-case-list li span {
            font-size: 0.8rem;
            color: var(--text-secondary, #64748b);
        }

        /* Takeaways Section */
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

        .takeaways-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .takeaway {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
        }

        .takeaway-num {
            width: 28px;
            height: 28px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }

        .takeaway p {
            margin: 0;
            line-height: 1.5;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .comparison-grid, .use-cases-grid {
                grid-template-columns: 1fr;
            }
            .benefits-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `]
})
export class SsrFundamentalsComponent implements OnInit {
    isBrowser: boolean;
    isServer: boolean;
    platformId: string;
    renderTime: string;
    userAgent: string = 'N/A';
    copiedIndex: number | null = null;

    benefits = [
        {
            icon: '🔍',
            title: 'SEO Optimization',
            description: 'Search engines can crawl and index full content',
            metric: { value: '+60%', label: 'Crawlability' }
        },
        {
            icon: '⚡',
            title: 'Faster FCP',
            description: 'First Contentful Paint happens immediately',
            metric: { value: '~150ms', label: 'Time to First Paint' }
        },
        {
            icon: '📱',
            title: 'Mobile Performance',
            description: 'Less processing on low-powered devices',
            metric: { value: '-40%', label: 'CPU Usage' }
        },
        {
            icon: '🔗',
            title: 'Social Sharing',
            description: 'Open Graph and Twitter cards work correctly',
            metric: null
        },
        {
            icon: '♿',
            title: 'Accessibility',
            description: 'Content available without JavaScript',
            metric: null
        },
        {
            icon: '📊',
            title: 'Core Web Vitals',
            description: 'Improved LCP, FID, and CLS scores',
            metric: { value: '+25%', label: 'Performance Score' }
        }
    ];

    setupSteps = [
        {
            title: 'Add SSR to your project',
            language: 'bash',
            code: 'ng add @angular/ssr',
            note: 'This command adds all necessary dependencies and configuration files automatically.'
        },
        {
            title: 'Build for production',
            language: 'bash',
            code: 'npm run build',
            note: 'Builds both browser and server bundles in the dist/ folder.'
        },
        {
            title: 'Run the SSR server',
            language: 'bash',
            code: 'npm run serve:ssr:your-app-name',
            note: 'Starts the Express server that renders your Angular app.'
        }
    ];

    takeaways = [
        'SSR renders pages on the server, providing immediate content visibility',
        'Angular Universal uses Node.js and Express to serve pre-rendered HTML',
        'Users see content 5x faster with SSR compared to client-side rendering',
        'SSR is essential for SEO-critical pages like product listings and blogs',
        'The client "hydrates" the app making it fully interactive after initial load',
        'Not all apps need SSR - dashboards and real-time apps may not benefit'
    ];

    constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
        this.isBrowser = isPlatformBrowser(this._platformId);
        this.isServer = isPlatformServer(this._platformId);
        this.platformId = this._platformId.toString();
        this.renderTime = new Date().toISOString();
    }

    ngOnInit(): void {
        if (this.isBrowser) {
            this.userAgent = navigator.userAgent.substring(0, 50) + '...';
        } else {
            this.userAgent = 'Server Environment (No User Agent)';
        }
    }

    copyCode(code: string): void {
        if (this.isBrowser) {
            navigator.clipboard.writeText(code);
            const index = this.setupSteps.findIndex(s => s.code === code);
            this.copiedIndex = index;
            setTimeout(() => this.copiedIndex = null, 2000);
        }
    }
}
