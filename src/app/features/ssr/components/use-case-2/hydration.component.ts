/**
 * ============================================================================
 * USE CASE 2: HYDRATION COMPONENT
 * ============================================================================
 * 
 * Demonstrates Angular's hydration process - how the client "takes over"
 * server-rendered HTML without destroying and re-creating the DOM.
 * 
 * KEY CONCEPTS:
 * 1. Non-destructive hydration (Angular 16+)
 * 2. Event replay during hydration
 * 3. Skip hydration for dynamic content
 * 4. Hydration mismatch debugging
 */

import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-hydration',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="hydration-container">
            <header class="header">
                <h1>💧 Hydration</h1>
                <p class="subtitle">
                    How Angular takes over server-rendered HTML seamlessly
                </p>
            </header>

            <!-- Hydration Status Demo -->
            <section class="demo-section">
                <h2>🔄 Hydration Status</h2>
                <div class="status-card" [class.hydrated]="isHydrated" [class.pending]="!isHydrated">
                    <div class="status-indicator">
                        <span class="pulse" *ngIf="!isHydrated"></span>
                        <span class="icon">{{ isHydrated ? '✅' : '⏳' }}</span>
                    </div>
                    <div class="status-info">
                        <h3>{{ isHydrated ? 'Fully Hydrated!' : 'Hydration in Progress...' }}</h3>
                        <p *ngIf="!isHydrated">
                            The server-rendered HTML is being made interactive...
                        </p>
                        <p *ngIf="isHydrated">
                            The app is now fully interactive. Events are working!
                        </p>
                    </div>
                    <div class="status-stats" *ngIf="isHydrated">
                        <div class="stat">
                            <span class="stat-value">{{ hydrationTime }}ms</span>
                            <span class="stat-label">Hydration Time</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Interactive Test -->
            <section class="demo-section">
                <h2>🧪 Interactivity Test</h2>
                <p class="section-desc">
                    Click the button below to verify hydration is complete. 
                    With event replay, clicks before hydration still work!
                </p>
                <div class="interactive-demo">
                    <button 
                        class="click-btn" 
                        [class.clicked]="clickCount > 0"
                        (click)="handleClick()">
                        {{ clickCount === 0 ? 'Click Me!' : 'Clicked ' + clickCount + ' times' }}
                    </button>
                    <div class="click-feedback" *ngIf="clickCount > 0">
                        <span class="checkmark">✓</span>
                        <span>Hydration confirmed! Events are working.</span>
                    </div>
                </div>
            </section>

            <!-- How Hydration Works -->
            <section class="demo-section">
                <h2>📚 How Hydration Works</h2>
                <div class="process-timeline">
                    <div class="timeline-item" *ngFor="let step of hydrationSteps; let i = index"
                         [class.completed]="currentStep > i"
                         [class.active]="currentStep === i">
                        <div class="timeline-marker">
                            <span *ngIf="currentStep > i">✓</span>
                            <span *ngIf="currentStep <= i">{{ i + 1 }}</span>
                        </div>
                        <div class="timeline-content">
                            <h4>{{ step.title }}</h4>
                            <p>{{ step.description }}</p>
                            <code *ngIf="step.code">{{ step.code }}</code>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Destructive vs Non-destructive -->
            <section class="demo-section">
                <h2>⚔️ Destructive vs Non-Destructive Hydration</h2>
                <div class="comparison-grid">
                    <div class="comparison-card destructive">
                        <div class="card-header">
                            <span class="icon">💥</span>
                            <h3>Destructive (Pre-Angular 16)</h3>
                        </div>
                        <div class="card-body">
                            <ul>
                                <li>
                                    <span class="icon">❌</span>
                                    Destroys server-rendered DOM
                                </li>
                                <li>
                                    <span class="icon">❌</span>
                                    Re-renders everything from scratch
                                </li>
                                <li>
                                    <span class="icon">❌</span>
                                    Causes visible flickering
                                </li>
                                <li>
                                    <span class="icon">❌</span>
                                    Loses scroll position
                                </li>
                                <li>
                                    <span class="icon">❌</span>
                                    Poor CLS score
                                </li>
                            </ul>
                        </div>
                        <div class="visual-demo">
                            <div class="demo-screen flicker">
                                <div class="content-block"></div>
                                <div class="content-block"></div>
                                <div class="content-block"></div>
                            </div>
                            <span class="demo-label">Flicker animation</span>
                        </div>
                    </div>

                    <div class="comparison-card non-destructive">
                        <div class="card-header">
                            <span class="icon">💧</span>
                            <h3>Non-Destructive (Angular 16+)</h3>
                        </div>
                        <div class="card-body">
                            <ul>
                                <li>
                                    <span class="icon">✅</span>
                                    Preserves server-rendered DOM
                                </li>
                                <li>
                                    <span class="icon">✅</span>
                                    Only attaches event listeners
                                </li>
                                <li>
                                    <span class="icon">✅</span>
                                    No visible changes
                                </li>
                                <li>
                                    <span class="icon">✅</span>
                                    Scroll position maintained
                                </li>
                                <li>
                                    <span class="icon">✅</span>
                                    Excellent CLS score (0)
                                </li>
                            </ul>
                        </div>
                        <div class="visual-demo">
                            <div class="demo-screen smooth">
                                <div class="content-block"></div>
                                <div class="content-block"></div>
                                <div class="content-block"></div>
                            </div>
                            <span class="demo-label">Seamless transition</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Event Replay Demo -->
            <section class="demo-section">
                <h2>🎮 Event Replay</h2>
                <div class="event-replay-demo">
                    <div class="replay-info">
                        <h4>What is Event Replay?</h4>
                        <p>
                            Even if a user clicks before hydration completes, Angular captures
                            and queues those events. Once hydration finishes, events are 
                            "replayed" so users don't lose their interactions.
                        </p>
                    </div>
                    <div class="replay-sequence">
                        <div class="sequence-item">
                            <span class="seq-icon">👆</span>
                            <span class="seq-text">User clicks button</span>
                            <span class="seq-time">0ms</span>
                        </div>
                        <div class="sequence-arrow">→</div>
                        <div class="sequence-item">
                            <span class="seq-icon">📦</span>
                            <span class="seq-text">Event queued</span>
                            <span class="seq-time">5ms</span>
                        </div>
                        <div class="sequence-arrow">→</div>
                        <div class="sequence-item">
                            <span class="seq-icon">💧</span>
                            <span class="seq-text">Hydration completes</span>
                            <span class="seq-time">200ms</span>
                        </div>
                        <div class="sequence-arrow">→</div>
                        <div class="sequence-item">
                            <span class="seq-icon">🎯</span>
                            <span class="seq-text">Event replayed!</span>
                            <span class="seq-time">205ms</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Skip Hydration -->
            <section class="demo-section">
                <h2>⏭️ ngSkipHydration</h2>
                <div class="skip-hydration-demo">
                    <div class="code-example">
                        <div class="code-header">
                            <span>HTML Template</span>
                        </div>
                        <pre><code>&lt;!-- Skip hydration for dynamic content --&gt;
&lt;div ngSkipHydration&gt;
    &lt;app-live-clock&gt;&lt;/app-live-clock&gt;
    &lt;app-random-ad&gt;&lt;/app-random-ad&gt;
&lt;/div&gt;</code></pre>
                    </div>
                    <div class="skip-info">
                        <h4>When to Use ngSkipHydration</h4>
                        <ul>
                            <li>Live clocks or timers (different on server vs client)</li>
                            <li>Random content (ads, recommendations)</li>
                            <li>User-specific content that wasn't on server</li>
                            <li>Third-party widgets that modify DOM</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Configuration -->
            <section class="demo-section">
                <h2>⚙️ Enabling Hydration</h2>
                <div class="code-example large">
                    <div class="code-header">
                        <span>app.config.ts</span>
                    </div>
                    <pre><code>{{ configCode }}</code></pre>
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
        .hydration-container {
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

        .section-desc {
            color: var(--text-secondary, #64748b);
            margin-bottom: 1rem;
        }

        /* Status Card */
        .status-card {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem;
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .status-card.pending {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #f59e0b;
        }

        .status-card.hydrated {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border: 2px solid #10b981;
        }

        .status-indicator {
            position: relative;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .status-indicator .icon {
            font-size: 2rem;
            z-index: 1;
        }

        .pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #f59e0b;
            opacity: 0.3;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.1; }
            100% { transform: scale(1); opacity: 0.3; }
        }

        .status-info h3 {
            margin: 0 0 0.25rem;
            font-size: 1.2rem;
        }

        .status-info p {
            margin: 0;
            color: var(--text-secondary, #64748b);
        }

        .status-stats {
            margin-left: auto;
            text-align: center;
        }

        .stat-value {
            display: block;
            font-size: 1.5rem;
            font-weight: bold;
            color: #10b981;
        }

        .stat-label {
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
        }

        /* Interactive Demo */
        .interactive-demo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
        }

        .click-btn {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            cursor: pointer;
            transition: all 0.2s;
        }

        .click-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .click-btn.clicked {
            background: linear-gradient(135deg, #10b981, #059669);
        }

        .click-feedback {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #10b981;
            font-weight: 500;
        }

        .checkmark {
            width: 24px;
            height: 24px;
            background: #10b981;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Timeline */
        .process-timeline {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .timeline-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 8px;
            opacity: 0.6;
            transition: all 0.3s;
        }

        .timeline-item.completed,
        .timeline-item.active {
            opacity: 1;
        }

        .timeline-item.active {
            border-left: 3px solid #6366f1;
        }

        .timeline-marker {
            width: 32px;
            height: 32px;
            background: var(--text-secondary, #94a3b8);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .timeline-item.completed .timeline-marker {
            background: #10b981;
        }

        .timeline-item.active .timeline-marker {
            background: #6366f1;
        }

        .timeline-content h4 {
            margin: 0 0 0.25rem;
            font-size: 1rem;
        }

        .timeline-content p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--text-secondary, #64748b);
        }

        .timeline-content code {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 0.25rem 0.5rem;
            background: #1e293b;
            color: #e879f9;
            border-radius: 4px;
            font-size: 0.8rem;
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

        .comparison-card.destructive {
            background: #fef2f2;
            border: 2px solid #fca5a5;
        }

        .comparison-card.non-destructive {
            background: #ecfdf5;
            border: 2px solid #6ee7b7;
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

        .card-body ul {
            list-style: none;
            padding: 0;
            margin: 0 0 1rem;
        }

        .card-body li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }

        .visual-demo {
            text-align: center;
        }

        .demo-screen {
            width: 100%;
            height: 100px;
            background: white;
            border-radius: 8px;
            padding: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .content-block {
            height: 20px;
            background: #e2e8f0;
            border-radius: 4px;
        }

        .demo-screen.flicker .content-block {
            animation: flicker 0.5s ease-in-out infinite alternate;
        }

        @keyframes flicker {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }

        .demo-label {
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
            display: block;
            margin-top: 0.5rem;
        }

        /* Event Replay */
        .event-replay-demo {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .replay-info h4 {
            margin: 0 0 0.5rem;
        }

        .replay-info p {
            margin: 0 0 1.5rem;
            color: var(--text-secondary, #64748b);
        }

        .replay-sequence {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .sequence-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            background: white;
            border-radius: 8px;
            min-width: 120px;
        }

        .seq-icon {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        .seq-text {
            font-size: 0.8rem;
            color: var(--text-primary, #1f2937);
        }

        .seq-time {
            font-size: 0.7rem;
            color: #6366f1;
            font-family: monospace;
        }

        .sequence-arrow {
            font-size: 1.5rem;
            color: #6366f1;
        }

        /* Skip Hydration */
        .skip-hydration-demo {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .code-example {
            background: #0f172a;
            border-radius: 8px;
            overflow: hidden;
        }

        .code-example.large {
            grid-column: span 2;
        }

        .code-header {
            padding: 0.5rem 1rem;
            background: #1e293b;
            color: #94a3b8;
            font-size: 0.8rem;
        }

        .code-example pre {
            margin: 0;
            padding: 1rem;
            overflow-x: auto;
        }

        .code-example code {
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            white-space: pre-wrap;
        }

        .skip-info h4 {
            margin: 0 0 0.75rem;
        }

        .skip-info ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .skip-info li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            font-size: 0.9rem;
            color: var(--text-secondary, #64748b);
        }

        .skip-info li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #6366f1;
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
            .comparison-grid, .skip-hydration-demo {
                grid-template-columns: 1fr;
            }
            .replay-sequence {
                flex-direction: column;
            }
            .sequence-arrow {
                transform: rotate(90deg);
            }
            .code-example.large {
                grid-column: span 1;
            }
        }
    `]
})
export class HydrationComponent implements OnInit, AfterViewInit {
    isBrowser: boolean;
    isHydrated = false;
    hydrationTime = 0;
    clickCount = 0;
    currentStep = 0;
    private startTime: number;

    hydrationSteps = [
        {
            title: 'Server Renders HTML',
            description: 'Angular Universal renders components to HTML on the server',
            code: 'CommonEngine.render({ bootstrap, url })'
        },
        {
            title: 'HTML Sent to Browser',
            description: 'Full HTML response delivered to the client',
            code: null
        },
        {
            title: 'Content Displayed',
            description: 'Browser paints the HTML immediately - user sees content',
            code: null
        },
        {
            title: 'JavaScript Loads',
            description: 'Angular bundles download and parse',
            code: null
        },
        {
            title: 'Hydration Begins',
            description: 'Angular matches DOM nodes and attaches event listeners',
            code: 'provideClientHydration()'
        },
        {
            title: 'App Interactive!',
            description: 'All events work, state is synchronized',
            code: null
        }
    ];

    takeaways = [
        { icon: '💧', text: 'Hydration preserves server-rendered DOM instead of destroying it' },
        { icon: '🎮', text: 'Event replay captures clicks before hydration and replays them' },
        { icon: '⏭️', text: 'Use ngSkipHydration for content that differs between server and client' },
        { icon: '📊', text: 'Proper hydration results in CLS score of 0 (excellent)' },
        { icon: '⚙️', text: 'Enable with provideClientHydration() in app.config.ts' }
    ];

    configCode = `import { ApplicationConfig } from '@angular/core';
import { 
    provideClientHydration,
    withEventReplay 
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(
            withEventReplay()  // Enable event replay
        )
    ]
};`;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.startTime = Date.now();
    }

    ngOnInit(): void {
        // Simulate hydration steps
        if (this.isBrowser) {
            this.simulateHydrationSteps();
        }
    }

    ngAfterViewInit(): void {
        if (this.isBrowser) {
            // Mark as hydrated after view init
            setTimeout(() => {
                this.isHydrated = true;
                this.hydrationTime = Date.now() - this.startTime;
                this.currentStep = this.hydrationSteps.length;
            }, 500);
        }
    }

    private simulateHydrationSteps(): void {
        const stepDelay = 100;
        this.hydrationSteps.forEach((_, index) => {
            setTimeout(() => {
                this.currentStep = index + 1;
            }, (index + 1) * stepDelay);
        });
    }

    handleClick(): void {
        this.clickCount++;
    }
}
