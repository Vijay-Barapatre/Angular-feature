/**
 * ============================================================================
 * USE CASE 4: PLATFORM DETECTION COMPONENT
 * ============================================================================
 * 
 * Demonstrates how to detect whether code is running on server or browser
 * and handle browser-only APIs safely in SSR applications.
 * 
 * KEY CONCEPTS:
 * 1. PLATFORM_ID injection token
 * 2. isPlatformBrowser / isPlatformServer functions
 * 3. Handling browser-only APIs
 * 4. Renderer2 for cross-platform DOM manipulation
 */

import {
    Component,
    OnInit,
    OnDestroy,
    PLATFORM_ID,
    Inject,
    Renderer2,
    ElementRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-platform-detection',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="platform-container">
            <header class="header">
                <h1>🔍 Platform Detection</h1>
                <p class="subtitle">
                    Handle browser-only APIs safely in SSR applications
                </p>
            </header>

            <!-- Current Platform -->
            <section class="demo-section">
                <h2>🖥️ Current Platform</h2>
                <div class="platform-card" [class.browser]="isBrowser" [class.server]="isServer">
                    <div class="platform-icon">{{ isBrowser ? '🌐' : '🖥️' }}</div>
                    <div class="platform-info">
                        <h3>{{ isBrowser ? 'Browser' : 'Server' }} Environment</h3>
                        <p>Platform ID: <code>{{ platformIdString }}</code></p>
                    </div>
                    <div class="platform-badge">{{ isBrowser ? 'CLIENT' : 'SERVER' }}</div>
                </div>
            </section>

            <!-- Browser APIs Demo -->
            <section class="demo-section">
                <h2>🌐 Browser APIs</h2>
                <p class="section-desc">
                    These APIs are only available in the browser. On the server, they return fallback values.
                </p>
                <div class="api-grid">
                    <div class="api-card" *ngFor="let api of browserApis">
                        <div class="api-header">
                            <span class="api-icon">{{ api.icon }}</span>
                            <h4>{{ api.name }}</h4>
                        </div>
                        <div class="api-value">
                            <code>{{ api.value }}</code>
                        </div>
                        <div class="api-status" [class.available]="api.available" 
                             [class.unavailable]="!api.available">
                            {{ api.available ? '✓ Available' : '✗ Server fallback' }}
                        </div>
                    </div>
                </div>
            </section>

            <!-- The Problem -->
            <section class="demo-section">
                <h2>⚠️ The Problem</h2>
                <div class="problem-demo">
                    <div class="code-comparison">
                        <div class="code-block bad">
                            <div class="code-header">
                                <span class="badge">❌ Will crash on server</span>
                            </div>
                            <pre><code>{{ badCode }}</code></pre>
                            <div class="error-message">
                                💥 ReferenceError: window is not defined
                            </div>
                        </div>
                        <div class="code-block good">
                            <div class="code-header">
                                <span class="badge">✅ Platform-safe</span>
                            </div>
                            <pre><code>{{ goodCode }}</code></pre>
                            <div class="success-message">
                                ✓ Works on both server and browser
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Interactive Demo -->
            <section class="demo-section">
                <h2>🧪 Interactive Demo</h2>
                <div class="interactive-demo">
                    <div class="demo-row">
                        <h4>Window Resize Listener</h4>
                        <p class="demo-desc">
                            This listener only activates in the browser.
                            Try resizing your window!
                        </p>
                        <div class="resize-display" *ngIf="isBrowser">
                            <span class="dimension">Width: {{ windowWidth }}px</span>
                            <span class="separator">×</span>
                            <span class="dimension">Height: {{ windowHeight }}px</span>
                        </div>
                        <div class="server-note" *ngIf="!isBrowser">
                            Window dimensions not available on server
                        </div>
                    </div>

                    <div class="demo-row">
                        <h4>Local Storage Test</h4>
                        <p class="demo-desc">
                            localStorage is browser-only. We use a fallback on server.
                        </p>
                        <div class="storage-demo" *ngIf="isBrowser">
                            <input 
                                type="text" 
                                [(ngModel)]="storageValue"
                                placeholder="Enter a value"
                                class="storage-input">
                            <button (click)="saveToStorage()" class="storage-btn save">
                                Save
                            </button>
                            <button (click)="loadFromStorage()" class="storage-btn load">
                                Load
                            </button>
                            <span class="storage-result" *ngIf="storageResult">
                                {{ storageResult }}
                            </span>
                        </div>
                    </div>

                    <div class="demo-row">
                        <h4>Navigator Info</h4>
                        <div class="navigator-info" *ngIf="isBrowser">
                            <div class="info-item">
                                <span class="label">Language:</span>
                                <span class="value">{{ navigatorInfo.language }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Cookies Enabled:</span>
                                <span class="value">{{ navigatorInfo.cookiesEnabled }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Online:</span>
                                <span class="value">{{ navigatorInfo.online }}</span>
                            </div>
                        </div>
                        <div class="server-note" *ngIf="!isBrowser">
                            Navigator info not available on server
                        </div>
                    </div>
                </div>
            </section>

            <!-- Safe Patterns -->
            <section class="demo-section">
                <h2>✅ Safe Patterns</h2>
                <div class="patterns-grid">
                    <div class="pattern-card" *ngFor="let pattern of safePatterns">
                        <div class="pattern-header">
                            <span class="pattern-icon">{{ pattern.icon }}</span>
                            <h4>{{ pattern.title }}</h4>
                        </div>
                        <p class="pattern-desc">{{ pattern.description }}</p>
                        <div class="pattern-code">
                            <pre><code>{{ pattern.code }}</code></pre>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Browser-Only APIs List -->
            <section class="demo-section">
                <h2>📋 Common Browser-Only APIs</h2>
                <div class="api-list">
                    <div class="api-item" *ngFor="let item of browserOnlyApis">
                        <span class="api-name">{{ item.name }}</span>
                        <span class="api-alternative">{{ item.alternative }}</span>
                    </div>
                </div>
            </section>

            <!-- Decision Flowchart -->
            <section class="demo-section">
                <h2>🔀 Decision Flowchart</h2>
                <div class="flowchart">
                    <div class="flow-node start">
                        Need Browser API?
                    </div>
                    <div class="flow-branch">
                        <div class="flow-path yes">
                            <span class="path-label">Yes</span>
                            <div class="flow-node decision">
                                Angular alternative?
                            </div>
                            <div class="flow-branch">
                                <div class="flow-path yes">
                                    <span class="path-label">Yes</span>
                                    <div class="flow-node action">
                                        Use Renderer2, DOCUMENT
                                    </div>
                                </div>
                                <div class="flow-path no">
                                    <span class="path-label">No</span>
                                    <div class="flow-node action">
                                        isPlatformBrowser guard
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flow-path no">
                            <span class="path-label">No</span>
                            <div class="flow-node action success">
                                Proceed normally
                            </div>
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
        .platform-container {
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

        /* Platform Card */
        .platform-card {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem;
            border-radius: 12px;
            position: relative;
        }

        .platform-card.browser {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border: 2px solid #3b82f6;
        }

        .platform-card.server {
            background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
            border: 2px solid #8b5cf6;
        }

        .platform-icon {
            font-size: 2.5rem;
        }

        .platform-info h3 {
            margin: 0 0 0.25rem;
            font-size: 1.2rem;
        }

        .platform-info p {
            margin: 0;
            color: var(--text-secondary, #64748b);
        }

        .platform-info code {
            background: rgba(0,0,0,0.1);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }

        .platform-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.25rem 0.75rem;
            background: rgba(0,0,0,0.1);
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        /* API Grid */
        .api-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
        }

        .api-card {
            padding: 1rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 8px;
            border: 2px solid var(--border-color, #e2e8f0);
        }

        .api-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
        }

        .api-icon {
            font-size: 1.25rem;
        }

        .api-card h4 {
            margin: 0;
            font-size: 0.9rem;
        }

        .api-value {
            margin-bottom: 0.5rem;
        }

        .api-value code {
            display: block;
            padding: 0.5rem;
            background: #1e293b;
            color: #e879f9;
            border-radius: 4px;
            font-size: 0.75rem;
            word-break: break-all;
        }

        .api-status {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            text-align: center;
        }

        .api-status.available {
            background: #d1fae5;
            color: #047857;
        }

        .api-status.unavailable {
            background: #fef3c7;
            color: #92400e;
        }

        /* Problem Demo */
        .code-comparison {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .code-block {
            border-radius: 8px;
            overflow: hidden;
        }

        .code-block.bad {
            border: 2px solid #fca5a5;
        }

        .code-block.good {
            border: 2px solid #6ee7b7;
        }

        .code-header {
            padding: 0.5rem 1rem;
            background: #1e293b;
        }

        .code-header .badge {
            font-size: 0.75rem;
            font-weight: 600;
        }

        .code-block.bad .badge { color: #fca5a5; }
        .code-block.good .badge { color: #6ee7b7; }

        .code-block pre {
            margin: 0;
            padding: 1rem;
            background: #0f172a;
            overflow-x: auto;
        }

        .code-block code {
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.8rem;
            white-space: pre-wrap;
        }

        .error-message {
            padding: 0.75rem 1rem;
            background: #fef2f2;
            color: #b91c1c;
            font-size: 0.85rem;
        }

        .success-message {
            padding: 0.75rem 1rem;
            background: #ecfdf5;
            color: #047857;
            font-size: 0.85rem;
        }

        /* Interactive Demo */
        .interactive-demo {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .demo-row {
            padding: 1rem 0;
            border-bottom: 1px solid var(--border-color, #e2e8f0);
        }

        .demo-row:last-child {
            border-bottom: none;
        }

        .demo-row h4 {
            margin: 0 0 0.25rem;
        }

        .demo-desc {
            margin: 0 0 0.75rem;
            font-size: 0.9rem;
            color: var(--text-secondary, #64748b);
        }

        .resize-display {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: white;
            border-radius: 8px;
            font-family: monospace;
        }

        .dimension {
            padding: 0.5rem 1rem;
            background: #ede9fe;
            border-radius: 4px;
            color: #6d28d9;
            font-weight: 500;
        }

        .separator {
            color: var(--text-secondary, #64748b);
        }

        .server-note {
            padding: 1rem;
            background: #fef3c7;
            border-radius: 8px;
            color: #92400e;
            font-size: 0.9rem;
        }

        .storage-demo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .storage-input {
            padding: 0.5rem 0.75rem;
            border: 2px solid var(--border-color, #e2e8f0);
            border-radius: 6px;
            font-size: 0.9rem;
        }

        .storage-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
        }

        .storage-btn.save {
            background: #6366f1;
            color: white;
        }

        .storage-btn.load {
            background: #10b981;
            color: white;
        }

        .storage-result {
            padding: 0.5rem 0.75rem;
            background: #d1fae5;
            border-radius: 6px;
            color: #047857;
            font-size: 0.85rem;
        }

        .navigator-info {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }

        .info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .info-item .label {
            color: var(--text-secondary, #64748b);
        }

        .info-item .value {
            font-weight: 500;
        }

        /* Patterns Grid */
        .patterns-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .pattern-card {
            padding: 1.25rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 10px;
            border-left: 4px solid #10b981;
        }

        .pattern-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .pattern-icon {
            font-size: 1.25rem;
        }

        .pattern-card h4 {
            margin: 0;
            font-size: 0.95rem;
        }

        .pattern-desc {
            margin: 0 0 0.75rem;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
        }

        .pattern-code {
            background: #0f172a;
            border-radius: 6px;
            padding: 0.75rem;
            overflow-x: auto;
        }

        .pattern-code pre {
            margin: 0;
        }

        .pattern-code code {
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.75rem;
            white-space: pre-wrap;
        }

        /* API List */
        .api-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 0.5rem;
        }

        .api-item {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 1rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 6px;
        }

        .api-name {
            font-weight: 500;
            color: var(--text-primary, #1f2937);
        }

        .api-alternative {
            font-size: 0.85rem;
            color: #10b981;
        }

        /* Flowchart */
        .flowchart {
            padding: 2rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            text-align: center;
        }

        .flow-node {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        .flow-node.start {
            background: #dbeafe;
            color: #1e40af;
        }

        .flow-node.decision {
            background: #fef3c7;
            color: #92400e;
        }

        .flow-node.action {
            background: #ede9fe;
            color: #6d28d9;
        }

        .flow-node.action.success {
            background: #d1fae5;
            color: #047857;
        }

        .flow-branch {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
        }

        .flow-path {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .path-label {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            margin-bottom: 0.5rem;
        }

        .flow-path.yes .path-label {
            background: #d1fae5;
            color: #047857;
        }

        .flow-path.no .path-label {
            background: #fee2e2;
            color: #b91c1c;
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
            .code-comparison, .patterns-grid {
                grid-template-columns: 1fr;
            }
            .flow-branch {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `]
})
export class PlatformDetectionComponent implements OnInit, OnDestroy {
    isBrowser: boolean;
    isServer: boolean;
    platformIdString: string;

    windowWidth = 0;
    windowHeight = 0;

    storageValue = '';
    storageResult = '';

    navigatorInfo = {
        language: 'N/A',
        cookiesEnabled: 'N/A',
        online: 'N/A'
    };

    browserApis: Array<{
        icon: string;
        name: string;
        value: string;
        available: boolean;
    }> = [];

    private destroy$ = new Subject<void>();

    badCode = `// ❌ This will crash on server!
export class BadComponent {
    // Error: window is not defined
    windowWidth = window.innerWidth;
    
    ngOnInit() {
        // Error: localStorage is not defined
        const token = localStorage.getItem('token');
    }
}`;

    goodCode = `// ✅ Platform-safe code
export class GoodComponent {
    private platformId = inject(PLATFORM_ID);
    windowWidth: number | null = null;
    
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.windowWidth = window.innerWidth;
            const token = localStorage.getItem('token');
        }
    }
}`;

    safePatterns = [
        {
            icon: '🛡️',
            title: 'Platform Guard',
            description: 'Wrap browser code in isPlatformBrowser check',
            code: `if (isPlatformBrowser(this.platformId)) {
    window.scrollTo(0, 0);
}`
        },
        {
            icon: '⏰',
            title: 'afterNextRender',
            description: 'Run code after first render (browser only)',
            code: `afterNextRender(() => {
    this.initChart();
});`
        },
        {
            icon: '🎨',
            title: 'Renderer2',
            description: 'Cross-platform DOM manipulation',
            code: `this.renderer.addClass(
    this.el.nativeElement, 'active'
);`
        },
        {
            icon: '📄',
            title: 'DOCUMENT Token',
            description: 'Inject document safely',
            code: `private document = inject(DOCUMENT);
this.document.title = 'New Title';`
        }
    ];

    browserOnlyApis = [
        { name: 'window', alternative: '→ isPlatformBrowser guard' },
        { name: 'document', alternative: '→ DOCUMENT token + Renderer2' },
        { name: 'localStorage', alternative: '→ Service wrapper with fallback' },
        { name: 'sessionStorage', alternative: '→ Service wrapper with fallback' },
        { name: 'navigator', alternative: '→ isPlatformBrowser guard' },
        { name: 'location', alternative: '→ DOCUMENT.location' },
        { name: 'setTimeout/setInterval', alternative: '→ Guard + cleanup' },
        { name: 'requestAnimationFrame', alternative: '→ afterNextRender' }
    ];

    takeaways = [
        { icon: '🔍', text: 'Use isPlatformBrowser() to detect browser environment' },
        { icon: '🚫', text: 'Never access window/document directly in SSR apps' },
        { icon: '🎨', text: 'Use Renderer2 for cross-platform DOM manipulation' },
        { icon: '⏰', text: 'afterNextRender() runs only in browser after render' },
        { icon: '🧹', text: 'Always clean up subscriptions and timers' }
    ];

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.isServer = isPlatformServer(this.platformId);
        this.platformIdString = this.platformId.toString();
    }

    ngOnInit(): void {
        this.initBrowserApis();

        if (this.isBrowser) {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            this.navigatorInfo = {
                language: navigator.language,
                cookiesEnabled: navigator.cookieEnabled ? 'Yes' : 'No',
                online: navigator.onLine ? 'Yes' : 'No'
            };

            // Window resize listener (browser only)
            fromEvent(window, 'resize').pipe(
                debounceTime(100),
                takeUntil(this.destroy$)
            ).subscribe(() => {
                this.windowWidth = window.innerWidth;
                this.windowHeight = window.innerHeight;
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initBrowserApis(): void {
        if (this.isBrowser) {
            this.browserApis = [
                {
                    icon: '📐',
                    name: 'window.innerWidth',
                    value: `${window.innerWidth}px`,
                    available: true
                },
                {
                    icon: '🌐',
                    name: 'navigator.userAgent',
                    value: navigator.userAgent.substring(0, 30) + '...',
                    available: true
                },
                {
                    icon: '💾',
                    name: 'localStorage',
                    value: 'Available',
                    available: true
                },
                {
                    icon: '📍',
                    name: 'location.href',
                    value: location.href.substring(0, 35) + '...',
                    available: true
                }
            ];
        } else {
            this.browserApis = [
                { icon: '📐', name: 'window.innerWidth', value: 'N/A (server)', available: false },
                { icon: '🌐', name: 'navigator.userAgent', value: 'N/A (server)', available: false },
                { icon: '💾', name: 'localStorage', value: 'N/A (server)', available: false },
                { icon: '📍', name: 'location.href', value: 'N/A (server)', available: false }
            ];
        }
    }

    saveToStorage(): void {
        if (this.isBrowser && this.storageValue) {
            localStorage.setItem('demo-value', this.storageValue);
            this.storageResult = '✓ Saved!';
            setTimeout(() => this.storageResult = '', 2000);
        }
    }

    loadFromStorage(): void {
        if (this.isBrowser) {
            const value = localStorage.getItem('demo-value');
            if (value) {
                this.storageValue = value;
                this.storageResult = '✓ Loaded!';
            } else {
                this.storageResult = 'No value found';
            }
            setTimeout(() => this.storageResult = '', 2000);
        }
    }
}
