/**
 * ============================================================================
 * 🟦 EXERCISE 4: DATA RESOLVER
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

@Component({
    selector: 'app-exercise-4-resolve',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Data Resolver</h2>
                <p>Pre-fetch data before route activation using resolvers.</p>
                
                <div class="task-list">
                    <h4>📋 Tasks:</h4>
                    <ul>
                        <li>Understand how resolvers pre-load data</li>
                        <li>See the difference: with vs without resolver</li>
                        <li>Handle loading and error states</li>
                    </ul>
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Resolver Demo</h3>
                
                <div class="product-selector">
                    <h4>Select a Product:</h4>
                    <div class="product-buttons">
                        @for (id of [1, 2, 3, 999]; track id) {
                            <button 
                                [class.active]="selectedId() === id"
                                (click)="loadProduct(id)">
                                {{ id === 999 ? '❌ Invalid ID' : '📦 Product ' + id }}
                            </button>
                        }
                    </div>
                </div>

                @if (loading()) {
                    <div class="loading-state">
                        <div class="spinner">⏳</div>
                        <p>Resolver fetching data...</p>
                        <div class="progress-bar">
                            <div class="progress" [style.width.%]="loadProgress()"></div>
                        </div>
                    </div>
                }

                @if (error()) {
                    <div class="error-state">
                        <h4>🚫 Product Not Found</h4>
                        <p>Resolver would redirect to /not-found</p>
                        <code>router.navigate(['/not-found'])</code>
                    </div>
                }

                @if (product() && !loading()) {
                    <div class="product-detail">
                        <div class="detail-header">
                            <span class="badge">✅ Data Resolved</span>
                        </div>
                        <div class="detail-body">
                            <div class="product-image">{{ product()!.image }}</div>
                            <div class="product-info">
                                <h3>{{ product()!.name }}</h3>
                                <p>{{ product()!.description }}</p>
                                <span class="price">\${{ product()!.price }}</span>
                            </div>
                        </div>
                        <div class="detail-footer">
                            <code>this.product = route.snapshot.data['product'];</code>
                        </div>
                    </div>
                }

                <div class="comparison">
                    <h4>📊 With vs Without Resolver</h4>
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <h5>With Resolver</h5>
                            <ul>
                                <li>✅ Data ready on init</li>
                                <li>✅ No loading in component</li>
                                <li>⚠️ Delays navigation</li>
                            </ul>
                        </div>
                        <div class="comparison-item">
                            <h5>Without Resolver</h5>
                            <ul>
                                <li>✅ Instant navigation</li>
                                <li>⚠️ Loading spinner needed</li>
                                <li>⚠️ Handle loading state</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="code-preview">
                    <h4>Resolver Implementation</h4>
                    <pre><code>export const productResolver: ResolveFn&lt;Product&gt; = (route) => {{ '{' }}
  const id = route.paramMap.get('id');
  const productService = inject(ProductService);
  const router = inject(Router);
  
  return productService.getProduct(id).pipe(
    catchError(() => {{ '{' }}
      router.navigate(['/not-found']);
      return EMPTY;
    {{ '}' }})
  );
{{ '}' }};</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f5f3ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .instructions h2 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .task-list { background: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .product-selector { margin-bottom: 1.5rem; }
        .product-selector h4 { margin: 0 0 0.75rem; }
        .product-buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .product-buttons button { padding: 0.5rem 1rem; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; }
        .product-buttons button:hover { border-color: #8b5cf6; }
        .product-buttons button.active { background: #8b5cf6; color: white; border-color: #8b5cf6; }
        .loading-state { padding: 2rem; background: #f8fafc; border-radius: 8px; text-align: center; margin-bottom: 1rem; }
        .spinner { font-size: 2rem; animation: pulse 1s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .progress-bar { height: 6px; background: #e5e7eb; border-radius: 3px; margin-top: 1rem; overflow: hidden; }
        .progress { height: 100%; background: #8b5cf6; transition: width 0.3s; }
        .error-state { padding: 1.5rem; background: #fee2e2; border-radius: 8px; margin-bottom: 1rem; text-align: center; }
        .error-state h4 { margin: 0 0 0.5rem; color: #dc2626; }
        .error-state code { display: block; margin-top: 0.5rem; padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; }
        .product-detail { border: 2px solid #8b5cf6; border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; }
        .detail-header { padding: 0.75rem; background: #f5f3ff; }
        .badge { padding: 0.25rem 0.75rem; background: #dcfce7; color: #16a34a; border-radius: 4px; font-size: 0.85rem; }
        .detail-body { display: flex; gap: 1.5rem; padding: 1.5rem; }
        .product-image { font-size: 4rem; padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .product-info h3 { margin: 0 0 0.5rem; }
        .product-info p { margin: 0 0 0.5rem; color: #6b7280; }
        .price { font-size: 1.5rem; font-weight: bold; color: #8b5cf6; }
        .detail-footer { padding: 0.75rem; background: #1e1e2e; }
        .detail-footer code { color: #a6e3a1; font-size: 0.85rem; }
        .comparison { margin-bottom: 1.5rem; }
        .comparison h4 { margin: 0 0 0.75rem; }
        .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .comparison-item { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .comparison-item h5 { margin: 0 0 0.5rem; }
        .comparison-item ul { margin: 0; padding-left: 1.25rem; font-size: 0.9rem; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; overflow-x: auto; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise4ResolveComponent {
    private mockProducts: Product[] = [
        { id: 1, name: 'Laptop Pro', description: 'High-performance laptop for developers', price: 1299, image: '💻' },
        { id: 2, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 79, image: '🖱️' },
        { id: 3, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 149, image: '⌨️' }
    ];

    selectedId = signal<number | null>(null);
    loading = signal(false);
    loadProgress = signal(0);
    error = signal(false);
    product = signal<Product | null>(null);

    loadProduct(id: number): void {
        this.selectedId.set(id);
        this.loading.set(true);
        this.loadProgress.set(0);
        this.error.set(false);
        this.product.set(null);

        // Simulate resolver fetching data
        const interval = setInterval(() => {
            this.loadProgress.update(p => Math.min(p + 25, 100));
        }, 200);

        setTimeout(() => {
            clearInterval(interval);
            this.loadProgress.set(100);
            this.loading.set(false);

            const found = this.mockProducts.find(p => p.id === id);
            if (found) {
                this.product.set(found);
            } else {
                this.error.set(true);
            }
        }, 1000);
    }
}
