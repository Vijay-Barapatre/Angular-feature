/**
 * ============================================================================
 * USE CASE 3: TRANSFER STATE COMPONENT
 * ============================================================================
 * 
 * Demonstrates how TransferState shares data between server and client
 * to avoid duplicate API calls and improve performance.
 * 
 * KEY CONCEPTS:
 * 1. TransferState service - Store and retrieve data
 * 2. makeStateKey - Create unique keys for data
 * 3. Automatic HTTP caching - Angular 16+ feature
 * 4. Data serialization - How state is embedded in HTML
 */

import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';

// Mock product interface
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

// Create unique state keys
const PRODUCTS_KEY = makeStateKey<Product[]>('demo-products');
const FETCH_COUNT_KEY = makeStateKey<number>('fetch-count');

@Component({
    selector: 'app-transfer-state',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="transfer-container">
            <header class="header">
                <h1>📦 Transfer State</h1>
                <p class="subtitle">
                    Share data between server and client to avoid duplicate API calls
                </p>
            </header>

            <!-- The Problem Section -->
            <section class="demo-section">
                <h2>🤔 The Problem: Duplicate API Calls</h2>
                <div class="problem-demo">
                    <div class="scenario without">
                        <div class="scenario-header">
                            <span class="icon">❌</span>
                            <h4>Without Transfer State</h4>
                        </div>
                        <div class="api-flow">
                            <div class="flow-step">
                                <span class="step-icon">🖥️</span>
                                <span class="step-label">Server</span>
                                <span class="step-action">GET /api/products</span>
                            </div>
                            <div class="flow-arrow">↓</div>
                            <div class="flow-step">
                                <span class="step-icon">📄</span>
                                <span class="step-label">HTML</span>
                                <span class="step-action">Rendered with data</span>
                            </div>
                            <div class="flow-arrow">↓</div>
                            <div class="flow-step duplicate">
                                <span class="step-icon">🌐</span>
                                <span class="step-label">Browser</span>
                                <span class="step-action">GET /api/products (DUPLICATE!)</span>
                            </div>
                        </div>
                        <p class="scenario-result">
                            <strong>Result:</strong> 2 API calls, wasted bandwidth, potential flicker
                        </p>
                    </div>

                    <div class="scenario with">
                        <div class="scenario-header">
                            <span class="icon">✅</span>
                            <h4>With Transfer State</h4>
                        </div>
                        <div class="api-flow">
                            <div class="flow-step">
                                <span class="step-icon">🖥️</span>
                                <span class="step-label">Server</span>
                                <span class="step-action">GET /api/products</span>
                            </div>
                            <div class="flow-arrow">↓</div>
                            <div class="flow-step">
                                <span class="step-icon">📦</span>
                                <span class="step-label">State</span>
                                <span class="step-action">Store in TransferState</span>
                            </div>
                            <div class="flow-arrow">↓</div>
                            <div class="flow-step cached">
                                <span class="step-icon">🌐</span>
                                <span class="step-label">Browser</span>
                                <span class="step-action">Use cached data ✓</span>
                            </div>
                        </div>
                        <p class="scenario-result">
                            <strong>Result:</strong> 1 API call, instant load, no flicker
                        </p>
                    </div>
                </div>
            </section>

            <!-- Live Demo -->
            <section class="demo-section">
                <h2>🧪 Live Demo</h2>
                <div class="live-demo">
                    <div class="demo-controls">
                        <button class="load-btn" (click)="loadProducts()" [disabled]="loading">
                            {{ loading ? 'Loading...' : 'Fetch Products' }}
                        </button>
                        <button class="reset-btn" (click)="reset()">
                            Reset Demo
                        </button>
                    </div>

                    <div class="demo-status">
                        <div class="status-item">
                            <span class="status-label">Platform:</span>
                            <span class="status-value" [class.browser]="isBrowser" [class.server]="!isBrowser">
                                {{ isBrowser ? '🌐 Browser' : '🖥️ Server' }}
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Data Source:</span>
                            <span class="status-value" [class.cached]="dataSource === 'cache'" 
                                  [class.api]="dataSource === 'api'">
                                {{ dataSource === 'cache' ? '📦 Transfer State (Cached)' : 
                                   dataSource === 'api' ? '🌐 API Call' : '⏳ Not loaded' }}
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">API Calls Saved:</span>
                            <span class="status-value saved">{{ apiCallsSaved }}</span>
                        </div>
                    </div>

                    <div class="products-grid" *ngIf="products.length > 0">
                        <div class="product-card" *ngFor="let product of products">
                            <div class="product-icon">📦</div>
                            <h4>{{ product.name }}</h4>
                            <p class="category">{{ product.category }}</p>
                            <p class="price">\${{ product.price.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- How It Works -->
            <section class="demo-section">
                <h2>⚙️ How It Works</h2>
                <div class="how-it-works">
                    <div class="step-card">
                        <div class="step-number">1</div>
                        <h4>Server Fetches Data</h4>
                        <pre><code>this.http.get('/api/products')
    .subscribe(data => {{ '{' }}
        this.products = data;
    {{ '}' }});</code></pre>
                    </div>
                    <div class="step-card">
                        <div class="step-number">2</div>
                        <h4>Server Stores in TransferState</h4>
                        <pre><code>if (isPlatformServer(this.platformId)) {{ '{' }}
    this.transferState.set(KEY, data);
{{ '}' }}</code></pre>
                    </div>
                    <div class="step-card">
                        <div class="step-number">3</div>
                        <h4>State Embedded in HTML</h4>
                        <pre><code>&lt;script id="ng-state"&gt;
{{ '{' }}"products": [...]{{ '}' }}
&lt;/script&gt;</code></pre>
                    </div>
                    <div class="step-card">
                        <div class="step-number">4</div>
                        <h4>Client Reads Cached Data</h4>
                        <pre><code>const cached = transferState.get(KEY, null);
if (cached) {{ '{' }}
    this.products = cached;
    transferState.remove(KEY);
{{ '}' }}</code></pre>
                    </div>
                </div>
            </section>

            <!-- Implementation Methods -->
            <section class="demo-section">
                <h2>💻 Implementation Methods</h2>
                <div class="methods-tabs">
                    <button class="tab-btn" [class.active]="activeMethod === 'manual'" 
                            (click)="activeMethod = 'manual'">
                        Manual API
                    </button>
                    <button class="tab-btn" [class.active]="activeMethod === 'auto'" 
                            (click)="activeMethod = 'auto'">
                        Automatic HTTP Cache
                    </button>
                </div>

                <div class="method-content" *ngIf="activeMethod === 'manual'">
                    <h4>Method 1: Manual TransferState</h4>
                    <p class="method-desc">
                        Full control over what data is cached and when.
                        Best for complex scenarios or non-HTTP data.
                    </p>
                    <div class="code-block">
                        <div class="code-header">
                            <span>product.service.ts</span>
                        </div>
                        <pre><code>{{ manualCode }}</code></pre>
                    </div>
                </div>

                <div class="method-content" *ngIf="activeMethod === 'auto'">
                    <h4>Method 2: Automatic HTTP Caching (Angular 16+)</h4>
                    <p class="method-desc">
                        Zero code changes needed! HTTP GET responses are automatically cached.
                    </p>
                    <div class="code-block">
                        <div class="code-header">
                            <span>app.config.ts</span>
                        </div>
                        <pre><code>{{ autoCode }}</code></pre>
                    </div>
                </div>
            </section>

            <!-- State Visualization -->
            <section class="demo-section">
                <h2>📊 Transfer State Visualization</h2>
                <div class="state-viz">
                    <div class="state-box">
                        <h4>Current TransferState Contents</h4>
                        <div class="state-content">
                            <pre><code>{{ stateVisualization }}</code></pre>
                        </div>
                        <p class="state-note">
                            This data is embedded as a &lt;script&gt; tag in the HTML and 
                            consumed by the client during hydration.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Common Pitfalls -->
            <section class="demo-section">
                <h2>⚠️ Common Pitfalls</h2>
                <div class="pitfalls-grid">
                    <div class="pitfall-card">
                        <div class="pitfall-header">
                            <span class="icon">🔄</span>
                            <h4>Forgetting to Remove State</h4>
                        </div>
                        <div class="pitfall-code bad">
                            <span class="badge">❌ Wrong</span>
                            <code>const data = this.transferState.get(KEY, null);
this.items = data; // State never removed!</code>
                        </div>
                        <div class="pitfall-code good">
                            <span class="badge">✅ Correct</span>
                            <code>const data = this.transferState.get(KEY, null);
if (data) {{ '{' }}
    this.items = data;
    this.transferState.remove(KEY); // Clean up!
{{ '}' }}</code>
                        </div>
                    </div>

                    <div class="pitfall-card">
                        <div class="pitfall-header">
                            <span class="icon">🔒</span>
                            <h4>Storing Sensitive Data</h4>
                        </div>
                        <div class="pitfall-code bad">
                            <span class="badge">❌ Dangerous</span>
                            <code>// This ends up in HTML source!
transferState.set(KEY, {{ '{' }}
    authToken: 'secret123', // Visible to everyone!
    email: 'user&#64;email.com'
{{ '}' }});</code>
                        </div>
                        <div class="pitfall-code good">
                            <span class="badge">✅ Secure</span>
                            <code>// Never transfer auth data
// Fetch on client only
if (isPlatformBrowser(this.platformId)) {{ '{' }}
    this.loadUserData();
{{ '}' }}</code>
                        </div>
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
        .transfer-container {
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

        /* Problem Demo */
        .problem-demo {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .scenario {
            padding: 1.5rem;
            border-radius: 12px;
        }

        .scenario.without {
            background: #fef2f2;
            border: 2px solid #fca5a5;
        }

        .scenario.with {
            background: #ecfdf5;
            border: 2px solid #6ee7b7;
        }

        .scenario-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .scenario-header .icon {
            font-size: 1.25rem;
        }

        .scenario-header h4 {
            margin: 0;
            font-size: 1rem;
        }

        .api-flow {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .flow-step {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            background: white;
            border-radius: 8px;
            width: 100%;
        }

        .flow-step.duplicate {
            background: #fee2e2;
            border: 2px dashed #ef4444;
        }

        .flow-step.cached {
            background: #d1fae5;
            border: 2px solid #10b981;
        }

        .step-icon {
            font-size: 1.25rem;
        }

        .step-label {
            font-weight: 600;
            min-width: 60px;
        }

        .step-action {
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
        }

        .flow-arrow {
            font-size: 1.25rem;
            color: var(--text-secondary, #64748b);
        }

        .scenario-result {
            margin: 1rem 0 0;
            padding: 0.75rem;
            background: rgba(0,0,0,0.05);
            border-radius: 6px;
            font-size: 0.9rem;
        }

        /* Live Demo */
        .live-demo {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .demo-controls {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .load-btn {
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .load-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .load-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .reset-btn {
            padding: 0.75rem 1.5rem;
            background: transparent;
            color: var(--text-secondary, #64748b);
            border: 2px solid var(--border-color, #e2e8f0);
            border-radius: 8px;
            cursor: pointer;
        }

        .demo-status {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }

        .status-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .status-label {
            font-weight: 500;
            color: var(--text-secondary, #64748b);
        }

        .status-value {
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-weight: 500;
        }

        .status-value.browser { background: #dbeafe; color: #1e40af; }
        .status-value.server { background: #ede9fe; color: #6d28d9; }
        .status-value.cached { background: #d1fae5; color: #047857; }
        .status-value.api { background: #fee2e2; color: #b91c1c; }
        .status-value.saved { background: #d1fae5; color: #047857; }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
        }

        .product-card {
            padding: 1rem;
            background: white;
            border-radius: 8px;
            text-align: center;
            border: 2px solid var(--border-color, #e2e8f0);
        }

        .product-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .product-card h4 {
            margin: 0 0 0.25rem;
            font-size: 0.9rem;
        }

        .product-card .category {
            margin: 0;
            font-size: 0.75rem;
            color: var(--text-secondary, #64748b);
        }

        .product-card .price {
            margin: 0.5rem 0 0;
            font-size: 1rem;
            font-weight: 600;
            color: #10b981;
        }

        /* How It Works */
        .how-it-works {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .step-card {
            padding: 1rem;
            background: var(--bg-secondary, #f8fafc);
            border-radius: 8px;
            border-left: 4px solid #6366f1;
        }

        .step-number {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .step-card h4 {
            margin: 0 0 0.5rem;
            font-size: 0.95rem;
        }

        .step-card pre {
            margin: 0;
            padding: 0.75rem;
            background: #0f172a;
            border-radius: 6px;
            overflow-x: auto;
        }

        .step-card code {
            color: #e2e8f0;
            font-size: 0.75rem;
            font-family: 'Fira Code', monospace;
        }

        /* Methods Tabs */
        .methods-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .tab-btn {
            padding: 0.5rem 1rem;
            background: var(--bg-secondary, #f8fafc);
            border: 2px solid var(--border-color, #e2e8f0);
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
        }

        .tab-btn.active {
            background: #6366f1;
            color: white;
            border-color: #6366f1;
        }

        .method-content h4 {
            margin: 0 0 0.5rem;
        }

        .method-desc {
            margin: 0 0 1rem;
            color: var(--text-secondary, #64748b);
        }

        .code-block {
            background: #0f172a;
            border-radius: 8px;
            overflow: hidden;
        }

        .code-header {
            padding: 0.5rem 1rem;
            background: #1e293b;
            color: #94a3b8;
            font-size: 0.8rem;
        }

        .code-block pre {
            margin: 0;
            padding: 1rem;
            overflow-x: auto;
        }

        .code-block code {
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            white-space: pre-wrap;
        }

        /* State Visualization */
        .state-box {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .state-box h4 {
            margin: 0 0 1rem;
        }

        .state-content {
            background: #0f172a;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
        }

        .state-content pre {
            margin: 0;
        }

        .state-content code {
            color: #a5f3fc;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }

        .state-note {
            margin: 0;
            font-size: 0.85rem;
            color: var(--text-secondary, #64748b);
            font-style: italic;
        }

        /* Pitfalls */
        .pitfalls-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .pitfall-card {
            background: var(--bg-secondary, #f8fafc);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .pitfall-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .pitfall-header .icon {
            font-size: 1.25rem;
        }

        .pitfall-header h4 {
            margin: 0;
        }

        .pitfall-code {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 0.75rem;
        }

        .pitfall-code.bad {
            background: #fef2f2;
            border: 1px solid #fca5a5;
        }

        .pitfall-code.good {
            background: #ecfdf5;
            border: 1px solid #6ee7b7;
        }

        .pitfall-code .badge {
            display: block;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .pitfall-code code {
            display: block;
            font-size: 0.85rem;
            font-family: 'Fira Code', monospace;
            white-space: pre-wrap;
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
            .problem-demo, .how-it-works, .pitfalls-grid {
                grid-template-columns: 1fr;
            }
        }
    `]
})
export class TransferStateComponent implements OnInit {
    private transferState = inject(TransferState);
    private platformId = inject(PLATFORM_ID);

    isBrowser: boolean;
    loading = false;
    products: Product[] = [];
    dataSource: 'none' | 'cache' | 'api' = 'none';
    apiCallsSaved = 0;
    activeMethod = 'manual';

    takeaways = [
        'TransferState prevents duplicate API calls between server and client',
        'Use makeStateKey() to create unique identifiers for cached data',
        'Always call transferState.remove() after consuming cached data',
        'Angular 16+ supports automatic HTTP caching with withHttpTransferCacheOptions()',
        'Never store sensitive data in TransferState - it\'s visible in HTML source'
    ];

    manualCode = `import { TransferState, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';

const PRODUCTS_KEY = makeStateKey<Product[]>('products');

@Injectable({ providedIn: 'root' })
export class ProductService {
    getProducts(): Observable<Product[]> {
        // Check for cached data
        const cached = this.transferState.get(PRODUCTS_KEY, null);
        
        if (cached) {
            this.transferState.remove(PRODUCTS_KEY);
            return of(cached);
        }
        
        return this.http.get<Product[]>('/api/products').pipe(
            tap(data => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(PRODUCTS_KEY, data);
                }
            })
        );
    }
}`;

    autoCode = `import { ApplicationConfig } from '@angular/core';
import { 
    provideClientHydration,
    withHttpTransferCacheOptions 
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(
            withHttpTransferCacheOptions({
                // GET requests are cached automatically
                includePostRequests: false,
                
                // Optional: Filter which requests to cache
                filter: (req) => !req.url.includes('/no-cache')
            })
        )
    ]
};`;

    stateVisualization = '';

    constructor() {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        this.updateStateVisualization();

        // Check for cached data from server
        const cached = this.transferState.get(PRODUCTS_KEY, null);
        if (cached) {
            this.products = cached;
            this.dataSource = 'cache';
            this.apiCallsSaved = 1;
            this.transferState.remove(PRODUCTS_KEY);
        }
    }

    loadProducts(): void {
        this.loading = true;

        // Check transfer state first
        const cached = this.transferState.get(PRODUCTS_KEY, null);

        if (cached) {
            // Use cached data
            setTimeout(() => {
                this.products = cached;
                this.dataSource = 'cache';
                this.apiCallsSaved++;
                this.transferState.remove(PRODUCTS_KEY);
                this.loading = false;
                this.updateStateVisualization();
            }, 300);
        } else {
            // Simulate API call
            setTimeout(() => {
                this.products = this.getMockProducts();
                this.dataSource = 'api';

                // Store in transfer state (simulating server behavior)
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(PRODUCTS_KEY, this.products);
                }

                this.loading = false;
                this.updateStateVisualization();
            }, 800);
        }
    }

    reset(): void {
        this.products = [];
        this.dataSource = 'none';
        this.apiCallsSaved = 0;

        // Simulate storing data for transfer (as if server did)
        this.transferState.set(PRODUCTS_KEY, this.getMockProducts());
        this.updateStateVisualization();
    }

    private getMockProducts(): Product[] {
        return [
            { id: 1, name: 'Widget Pro', price: 29.99, category: 'Tools' },
            { id: 2, name: 'Gadget X', price: 49.99, category: 'Electronics' },
            { id: 3, name: 'Super Item', price: 19.99, category: 'Home' },
            { id: 4, name: 'Mega Thing', price: 99.99, category: 'Premium' },
            { id: 5, name: 'Ultra Gear', price: 79.99, category: 'Sports' },
            { id: 6, name: 'Power Tool', price: 59.99, category: 'Tools' }
        ];
    }

    private updateStateVisualization(): void {
        const cached = this.transferState.get(PRODUCTS_KEY, null);
        if (cached) {
            this.stateVisualization = JSON.stringify({ 'demo-products': cached }, null, 2);
        } else {
            this.stateVisualization = '{ /* TransferState is empty */ }';
        }
    }
}
