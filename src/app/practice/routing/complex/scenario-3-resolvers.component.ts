/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: RESOLVERS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-3-resolvers',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Route Resolvers</h2>
                <p>Pre-fetch data before route activation.</p>
            </div>

            <div class="content">
                <div class="code-block">
                    <h4>Resolver Function</h4>
                    <pre><code>// product.resolver.ts
export const productResolver: ResolveFn&lt;Product&gt; = (route) => {{ '{' }}
  const productId = route.paramMap.get('id');
  return inject(ProductService).getProduct(productId);
{{ '}' }};

// routes
{{ '{' }}
  path: 'product/:id',
  component: ProductDetailComponent,
  resolve: {{ '{' }} product: productResolver {{ '}' }}
{{ '}' }}

// In component
ngOnInit() {{ '{' }}
  this.product = this.route.snapshot.data['product'];
{{ '}' }}</code></pre>
                </div>

                <h3>🎮 Resolver Demo</h3>

                <div class="products-list">
                    <h4>Select a product:</h4>
                    @for (product of products(); track product.id) {
                        <button (click)="navigateToProduct(product.id)">
                            {{ product.name }}
                        </button>
                    }
                </div>

                @if (loading()) {
                    <div class="loading-state">
                        <div class="spinner">🔄</div>
                        <p>Resolver fetching data...</p>
                        <div class="progress-bar">
                            <div class="progress" [style.width.%]="loadingProgress()"></div>
                        </div>
                    </div>
                }

                @if (resolvedData() && !loading()) {
                    <div class="resolved-data">
                        <h4>✅ Data Resolved</h4>
                        <div class="data-content">
                            <p><strong>{{ resolvedData()?.name }}</strong></p>
                            <p>{{ resolvedData()?.description }}</p>
                            <p class="price">\${{ resolvedData()?.price }}</p>
                        </div>
                        <div class="timeline">
                            <div class="step done">
                                <span>1</span>
                                <p>Navigation started</p>
                            </div>
                            <div class="step done">
                                <span>2</span>
                                <p>Resolver activated</p>
                            </div>
                            <div class="step done">
                                <span>3</span>
                                <p>Data fetched</p>
                            </div>
                            <div class="step done">
                                <span>4</span>
                                <p>Component rendered</p>
                            </div>
                        </div>
                    </div>
                }

                <div class="info-box">
                    <h4>💡 When to Use Resolvers</h4>
                    <ul>
                        <li>Data must be available before component renders</li>
                        <li>Avoid loading states in component</li>
                        <li>Ensure route can't be accessed without data</li>
                    </ul>
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
        .code-block pre { margin: 0; overflow-x: auto; }
        .code-block code { color: #a6e3a1; font-size: 0.85rem; }
        .products-list { margin-bottom: 1.5rem; }
        .products-list h4 { margin: 0 0 0.5rem; }
        .products-list button { padding: 0.5rem 1rem; margin-right: 0.5rem; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; }
        .products-list button:hover { background: #fdf2f8; border-color: #ec4899; }
        .loading-state { padding: 2rem; background: #fdf2f8; border-radius: 8px; text-align: center; margin-bottom: 1rem; }
        .spinner { font-size: 2rem; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .progress-bar { height: 8px; background: #e5e7eb; border-radius: 4px; margin-top: 1rem; overflow: hidden; }
        .progress { height: 100%; background: #ec4899; transition: width 0.3s; }
        .resolved-data { padding: 1.5rem; background: #f0fdf4; border-radius: 8px; margin-bottom: 1rem; }
        .resolved-data h4 { margin: 0 0 1rem; color: #10b981; }
        .data-content { padding: 1rem; background: white; border-radius: 8px; margin-bottom: 1rem; }
        .data-content p { margin: 0.25rem 0; }
        .price { font-size: 1.5rem; font-weight: bold; color: #10b981; }
        .timeline { display: flex; gap: 1rem; }
        .step { text-align: center; flex: 1; }
        .step span { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; background: #e5e7eb; border-radius: 50%; font-weight: bold; }
        .step.done span { background: #10b981; color: white; }
        .step p { margin: 0.5rem 0 0; font-size: 0.75rem; color: #6b7280; }
        .info-box { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .info-box h4 { margin: 0 0 0.5rem; }
        .info-box ul { margin: 0; padding-left: 1.25rem; }
        .info-box li { font-size: 0.9rem; margin-bottom: 0.25rem; }
    `]
})
export class Scenario3ResolversComponent {
    products = signal([
        { id: 1, name: 'iPhone 15', description: 'Latest Apple smartphone', price: 999 },
        { id: 2, name: 'MacBook Pro', description: 'M3 chip laptop', price: 1999 },
        { id: 3, name: 'AirPods Pro', description: 'Wireless earbuds', price: 249 }
    ]);

    loading = signal(false);
    loadingProgress = signal(0);
    resolvedData = signal<{ name: string; description: string; price: number } | null>(null);

    navigateToProduct(id: number): void {
        this.loading.set(true);
        this.loadingProgress.set(0);
        this.resolvedData.set(null);

        // Simulate resolver fetching data
        const interval = setInterval(() => {
            this.loadingProgress.update(p => Math.min(p + 20, 100));
        }, 200);

        setTimeout(() => {
            clearInterval(interval);
            this.loadingProgress.set(100);

            const product = this.products().find(p => p.id === id);
            if (product) {
                this.resolvedData.set(product);
            }
            this.loading.set(false);
        }, 1200);
    }
}
