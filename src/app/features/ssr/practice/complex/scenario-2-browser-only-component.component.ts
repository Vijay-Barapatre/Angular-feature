/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: BROWSER-ONLY COMPONENT
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Create a component that uses browser-only APIs (like a charting library)
 * that gracefully degrades during SSR with a placeholder.
 * 
 * 📝 SCENARIO:
 * You're building a dashboard with interactive charts. The chart library
 * requires the DOM and window object, which don't exist on the server.
 * You must show a loading placeholder during SSR and initialize the
 * chart only after hydration.
 * 
 * ✅ REQUIREMENTS:
 * 1. Show a loading skeleton during SSR
 * 2. Initialize chart only on browser
 * 3. Use afterNextRender or afterRender for client initialization
 * 4. Consider using ngSkipHydration if needed
 * 5. Clean up resources on destroy
 * 
 * 🎯 SKILLS TESTED:
 * - afterNextRender lifecycle
 * - Platform detection
 * - Lazy initialization
 * - Resource cleanup
 */

import {
    Component,
    OnInit,
    OnDestroy,
    PLATFORM_ID,
    inject,
    afterNextRender,
    ElementRef,
    ViewChild,
    Injector
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ChartData {
    label: string;
    value: number;
    color: string;
}

@Component({
    selector: 'app-scenario-browser-only-component',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario-container">
            <h2>📊 Scenario 2: Browser-Only Component</h2>
            
            <div class="scenario-card">
                <h3>📋 Scenario</h3>
                <p>
                    Create a chart component that uses browser-only APIs,
                    showing a placeholder during SSR and initializing only on the client.
                </p>
            </div>

            <div class="requirements-section">
                <h3>✅ Requirements</h3>
                <ul>
                    <li>Show loading skeleton during SSR</li>
                    <li>Initialize chart only when in browser</li>
                    <li>Use afterNextRender for client-side initialization</li>
                    <li>Implement proper cleanup on destroy</li>
                </ul>
            </div>

            <div class="demo-section">
                <h3>🎮 Live Demo</h3>
                
                <div class="status-bar">
                    <span class="status-item">
                        Platform: <strong>{{ platform }}</strong>
                    </span>
                    <span class="status-item">
                        Chart Initialized: <strong>{{ chartInitialized ? 'Yes' : 'No' }}</strong>
                    </span>
                    <span class="status-item">
                        Render Phase: <strong>{{ renderPhase }}</strong>
                    </span>
                </div>

                <div class="chart-container">
                    <!-- SSR Placeholder -->
                    <div class="chart-skeleton" *ngIf="!chartInitialized">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-bars">
                            <div class="skeleton-bar" *ngFor="let i of [1,2,3,4,5]"></div>
                        </div>
                        <p class="loading-text">Loading chart...</p>
                    </div>
                    
                    <!-- Actual Chart (Browser Only) -->
                    <div class="chart-wrapper" *ngIf="chartInitialized">
                        <h4>Sales by Category</h4>
                        <div class="bar-chart" #chartElement>
                            <div class="bar-row" *ngFor="let item of chartData">
                                <span class="bar-label">{{ item.label }}</span>
                                <div class="bar-container">
                                    <div 
                                        class="bar" 
                                        [style.width.%]="item.value"
                                        [style.background]="item.color">
                                        {{ item.value }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <button (click)="updateData()" [disabled]="!chartInitialized">
                        🔄 Update Data
                    </button>
                    <button (click)="resetChart()">
                        Reset
                    </button>
                </div>

                <div class="implementation-notes">
                    <h4>📝 Implementation Notes</h4>
                    <div class="note">
                        <strong>afterNextRender:</strong> Use this to run code after Angular
                        has finished rendering the component on the client side.
                    </div>
                    <div class="note">
                        <strong>ngSkipHydration:</strong> Add this attribute to elements that
                        should be re-rendered on client instead of hydrated.
                    </div>
                </div>
            </div>

            <div class="solution-section">
                <h3>💡 Solution Approach</h3>
                <details>
                    <summary>Click to see solution outline</summary>
                    <div class="solution-code">
                        <pre><code>&#64;Component({{ '{' }}...{{ '}' }})
export class ChartComponent {{ '{' }}
    private injector = inject(Injector);
    private platformId = inject(PLATFORM_ID);
    
    chartInitialized = false;
    
    constructor() {{ '{' }}
        // Only runs on browser, after render
        afterNextRender(() => {{ '{' }}
            this.initializeChart();
        {{ '}' }}, {{ '{' }} injector: this.injector {{ '}' }});
    {{ '}' }}
    
    private initializeChart() {{ '{' }}
        // Safe to use window, document, etc.
        this.chartInitialized = true;
        // Initialize chart library here
    {{ '}' }}
    
    ngOnDestroy() {{ '{' }}
        // Clean up chart resources
        if (isPlatformBrowser(this.platformId)) {{ '{' }}
            // Destroy chart instance
        {{ '}' }}
    {{ '}' }}
{{ '}' }}</code></pre>
                    </div>
                </details>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 900px; margin: 0 auto; padding: 1.5rem; }
        h2 { color: var(--text-primary, #1f2937); border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        
        .scenario-card { background: #fee2e2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .scenario-card h3 { margin: 0 0 0.5rem; color: #b91c1c; }
        .scenario-card p { margin: 0; color: #991b1b; }
        
        .requirements-section { margin-bottom: 1.5rem; }
        .requirements-section ul { padding-left: 1.5rem; }
        
        .status-bar { display: flex; gap: 2rem; padding: 1rem; background: var(--bg-secondary, #f8fafc); border-radius: 8px; margin-bottom: 1rem; flex-wrap: wrap; }
        .status-item { font-size: 0.9rem; }
        .status-item strong { color: #6366f1; }
        
        .chart-container { border: 2px solid var(--border-color, #e2e8f0); border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; min-height: 300px; }
        
        /* Skeleton Loading */
        .chart-skeleton { padding: 1rem; }
        .skeleton-title { width: 40%; height: 24px; background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%); border-radius: 4px; margin-bottom: 1.5rem; animation: shimmer 1.5s infinite; }
        .skeleton-bars { display: flex; flex-direction: column; gap: 0.75rem; }
        .skeleton-bar { height: 32px; background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%); border-radius: 4px; animation: shimmer 1.5s infinite; }
        .skeleton-bar:nth-child(1) { width: 80%; }
        .skeleton-bar:nth-child(2) { width: 65%; animation-delay: 0.1s; }
        .skeleton-bar:nth-child(3) { width: 90%; animation-delay: 0.2s; }
        .skeleton-bar:nth-child(4) { width: 45%; animation-delay: 0.3s; }
        .skeleton-bar:nth-child(5) { width: 70%; animation-delay: 0.4s; }
        .loading-text { text-align: center; color: var(--text-secondary, #64748b); margin-top: 1rem; }
        
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
        }
        
        /* Actual Chart */
        .chart-wrapper h4 { margin: 0 0 1rem; }
        .bar-chart { display: flex; flex-direction: column; gap: 0.75rem; }
        .bar-row { display: flex; align-items: center; gap: 1rem; }
        .bar-label { min-width: 100px; font-size: 0.9rem; }
        .bar-container { flex: 1; background: #f1f5f9; border-radius: 4px; height: 32px; }
        .bar { height: 100%; border-radius: 4px; display: flex; align-items: center; justify-content: flex-end; padding-right: 0.5rem; color: white; font-weight: 500; font-size: 0.85rem; transition: width 0.5s ease; }
        
        .actions { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .actions button { padding: 0.75rem 1.5rem; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .actions button:disabled { opacity: 0.5; cursor: not-allowed; }
        .actions button:last-child { background: var(--bg-secondary, #f8fafc); color: var(--text-primary, #1f2937); border: 2px solid var(--border-color, #e2e8f0); }
        
        .implementation-notes { background: #ede9fe; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .implementation-notes h4 { margin: 0 0 0.75rem; color: #6d28d9; }
        .note { padding: 0.5rem 0; font-size: 0.9rem; }
        .note strong { color: #6d28d9; }
        
        .solution-section { background: #f0fdf4; padding: 1rem; border-radius: 8px; border: 1px solid #10b981; }
        .solution-section h3 { margin: 0 0 0.75rem; color: #047857; }
        details summary { cursor: pointer; padding: 0.5rem; }
        .solution-code pre { margin: 0.5rem 0 0; padding: 1rem; background: #1e293b; border-radius: 6px; overflow-x: auto; }
        .solution-code code { color: #e879f9; font-size: 0.85rem; }
    `]
})
export class ScenarioBrowserOnlyComponentComponent implements OnInit, OnDestroy {
    @ViewChild('chartElement') chartElement?: ElementRef;

    private platformId = inject(PLATFORM_ID);
    private injector = inject(Injector);

    platform = 'Unknown';
    renderPhase = 'Initial';
    chartInitialized = false;

    chartData: ChartData[] = [];

    constructor() {
        // TODO: Use afterNextRender to initialize chart on client
        afterNextRender(() => {
            this.renderPhase = 'After Render';
            this.initializeChart();
        }, { injector: this.injector });
    }

    ngOnInit(): void {
        this.platform = isPlatformBrowser(this.platformId) ? 'Browser' : 'Server';
        this.renderPhase = 'OnInit';
    }

    ngOnDestroy(): void {
        // Clean up chart resources
        if (isPlatformBrowser(this.platformId)) {
            console.log('Cleaning up chart resources');
            // Destroy chart instance if it exists
        }
    }

    private initializeChart(): void {
        // This only runs on the browser after render
        this.chartData = this.generateRandomData();
        this.chartInitialized = true;
    }

    updateData(): void {
        if (!this.chartInitialized) return;
        this.chartData = this.generateRandomData();
    }

    resetChart(): void {
        this.chartInitialized = false;
        this.chartData = [];

        // Re-initialize after a short delay to show skeleton
        setTimeout(() => {
            this.initializeChart();
        }, 1000);
    }

    private generateRandomData(): ChartData[] {
        const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home'];
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

        return categories.map((label, i) => ({
            label,
            value: Math.floor(Math.random() * 60) + 30,
            color: colors[i]
        }));
    }
}
