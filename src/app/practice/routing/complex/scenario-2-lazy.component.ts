/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: LAZY LOADING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-2-lazy',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Lazy Loading</h2>
                <p>Load feature modules on demand to reduce initial bundle size.</p>
            </div>

            <div class="content">
                <div class="code-block">
                    <h4>Lazy Load Configuration</h4>
                    <pre><code>{{ '{' }}
  path: 'admin',
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent)
{{ '}' }}

// Or with routes
{{ '{' }}
  path: 'shop',
  loadChildren: () => import('./shop/shop.routes')
    .then(m => m.SHOP_ROUTES)
{{ '}' }}</code></pre>
                </div>

                <h3>📦 Bundle Visualization</h3>
                
                <div class="bundle-demo">
                    <div class="bundle main">
                        <h4>main.js (loaded on init)</h4>
                        <div class="size-bar" style="width: 100%">
                            <span>{{ mainBundleSize }}KB</span>
                        </div>
                    </div>

                    @for (bundle of lazyBundles(); track bundle.name) {
                        <div class="bundle lazy" [class.loaded]="bundle.loaded">
                            <h4>{{ bundle.name }} (lazy)</h4>
                            <div class="size-bar" [style.width.%]="(bundle.size / mainBundleSize) * 100">
                                <span>{{ bundle.size }}KB</span>
                            </div>
                            <button (click)="loadBundle(bundle)" [disabled]="bundle.loaded">
                                {{ bundle.loaded ? '✅ Loaded' : '📦 Load' }}
                            </button>
                        </div>
                    }
                </div>

                <div class="stats">
                    <div class="stat">
                        <span class="label">Initial Load</span>
                        <span class="value">{{ mainBundleSize }}KB</span>
                    </div>
                    <div class="stat">
                        <span class="label">Total Loaded</span>
                        <span class="value">{{ totalLoaded() }}KB</span>
                    </div>
                    <div class="stat">
                        <span class="label">Savings</span>
                        <span class="value">{{ savings() }}KB ({{ savingsPercent() }}%)</span>
                    </div>
                </div>

                <div class="preload-section">
                    <h4>Preloading Strategies</h4>
                    <div class="strategies">
                        <div class="strategy">
                            <strong>NoPreloading</strong>
                            <p>Load only when navigating (default)</p>
                        </div>
                        <div class="strategy">
                            <strong>PreloadAllModules</strong>
                            <p>Preload all lazy modules in background</p>
                        </div>
                        <div class="strategy">
                            <strong>Custom Strategy</strong>
                            <p>Preload based on data.preload flag</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.85rem; }
        .bundle-demo { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .bundle { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .bundle.main { background: #1e1e2e; color: white; }
        .bundle.main h4 { color: white; }
        .bundle h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .bundle.lazy { display: flex; align-items: center; gap: 1rem; }
        .bundle.lazy h4 { min-width: 150px; margin: 0; }
        .bundle.lazy.loaded { background: #f0fdf4; }
        .size-bar { height: 24px; background: linear-gradient(90deg, #ec4899, #f59e0b); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold; min-width: 60px; }
        .bundle.lazy .size-bar { flex: 1; background: linear-gradient(90deg, #10b981, #06b6d4); }
        .bundle.lazy button { padding: 0.5rem 1rem; background: #ec4899; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .bundle.lazy button:disabled { background: #10b981; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat { padding: 1rem; background: #1e1e2e; border-radius: 8px; text-align: center; }
        .stat .label { display: block; font-size: 0.8rem; color: #94a3b8; }
        .stat .value { font-size: 1.25rem; font-weight: bold; color: #ec4899; }
        .preload-section h4 { margin: 0 0 0.75rem; }
        .strategies { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .strategy { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .strategy strong { color: #ec4899; }
        .strategy p { margin: 0.5rem 0 0; font-size: 0.8rem; color: #6b7280; }
    `]
})
export class Scenario2LazyComponent {
    mainBundleSize = 250;

    lazyBundles = signal([
        { name: 'admin.js', size: 85, loaded: false },
        { name: 'shop.js', size: 120, loaded: false },
        { name: 'reports.js', size: 65, loaded: false },
        { name: 'settings.js', size: 45, loaded: false }
    ]);

    loadBundle(bundle: { name: string; loaded: boolean }): void {
        // Simulate loading delay
        setTimeout(() => {
            this.lazyBundles.update(bundles =>
                bundles.map(b => b.name === bundle.name ? { ...b, loaded: true } : b)
            );
        }, 500);
    }

    totalLoaded(): number {
        const lazyLoaded = this.lazyBundles()
            .filter(b => b.loaded)
            .reduce((sum, b) => sum + b.size, 0);
        return this.mainBundleSize + lazyLoaded;
    }

    savings(): number {
        const notLoaded = this.lazyBundles()
            .filter(b => !b.loaded)
            .reduce((sum, b) => sum + b.size, 0);
        return notLoaded;
    }

    savingsPercent(): number {
        const totalPossible = this.lazyBundles().reduce((sum, b) => sum + b.size, 0) + this.mainBundleSize;
        return Math.round((this.savings() / totalPossible) * 100);
    }
}
