/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: ROUTE PARAMETERS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-exercise-2-params',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Route Parameters</h2>
                <p>Pass and read dynamic parameters in routes.</p>
                
                <h4>Parameter Types:</h4>
                <ul>
                    <li><code>:id</code> - Required parameter</li>
                    <li><code>:id?</code> - Optional parameter</li>
                    <li>Multiple params: <code>/users/:userId/posts/:postId</code></li>
                </ul>
            </div>

            <div class="demo">
                <div class="code-block">
                    <h4>Route Definition</h4>
                    <pre><code>{{ '{' }} path: 'products/:id', component: ProductDetailComponent {{ '}' }}
{{ '{' }} path: 'users/:userId/orders/:orderId', component: OrderComponent {{ '}' }}</code></pre>
                </div>

                <div class="code-block">
                    <h4>Reading Parameters</h4>
                    <pre><code>// Using ActivatedRoute
constructor(private route: ActivatedRoute) {{ '{' }}
  // Snapshot (one-time read)
  const id = this.route.snapshot.paramMap.get('id');
  
  // Observable (reactive)
  this.route.paramMap.subscribe(params => {{ '{' }}
    this.productId = params.get('id');
  {{ '}' }});
{{ '}' }}</code></pre>
                </div>

                <h3>🎮 Interactive Demo</h3>
                
                <div class="products-list">
                    <h4>Click a product:</h4>
                    @for (product of products(); track product.id) {
                        <button 
                            [class.active]="selectedId() === product.id"
                            (click)="selectProduct(product.id)">
                            {{ product.name }}
                        </button>
                    }
                </div>

                @if (selectedProduct()) {
                    <div class="product-detail">
                        <div class="url-bar">
                            📍 /products/{{ selectedId() }}
                        </div>
                        <div class="detail-content">
                            <h4>{{ selectedProduct()?.name }}</h4>
                            <p>{{ selectedProduct()?.description }}</p>
                            <span class="price">\${{ selectedProduct()?.price }}</span>
                        </div>
                        <div class="param-display">
                            <code>route.paramMap.get('id') → {{ selectedId() }}</code>
                        </div>
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; }
        .code-block h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.85rem; }
        .products-list { margin-bottom: 1rem; }
        .products-list h4 { margin: 0 0 0.5rem; }
        .products-list button { padding: 0.5rem 1rem; margin-right: 0.5rem; margin-bottom: 0.5rem; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; }
        .products-list button:hover { background: #fdf2f8; }
        .products-list button.active { background: #ec4899; color: white; border-color: #ec4899; }
        .product-detail { border-radius: 8px; overflow: hidden; }
        .url-bar { padding: 0.75rem; background: #334155; color: #a6e3a1; font-family: monospace; font-size: 0.85rem; }
        .detail-content { padding: 1.5rem; background: #f8fafc; }
        .detail-content h4 { margin: 0 0 0.5rem; color: #ec4899; }
        .detail-content p { margin: 0 0 0.5rem; color: #6b7280; }
        .price { font-size: 1.5rem; font-weight: bold; color: #10b981; }
        .param-display { padding: 0.75rem; background: #1e1e2e; }
        .param-display code { color: #fbbf24; font-size: 0.85rem; }
    `]
})
export class Exercise2ParamsComponent {
    products = signal([
        { id: 1, name: 'Laptop', description: 'Powerful development machine', price: 999 },
        { id: 2, name: 'Keyboard', description: 'Mechanical RGB keyboard', price: 149 },
        { id: 3, name: 'Monitor', description: '4K Ultra HD display', price: 399 },
        { id: 4, name: 'Mouse', description: 'Ergonomic wireless mouse', price: 79 }
    ]);

    selectedId = signal<number | null>(null);
    selectedProduct = signal<{ id: number; name: string; description: string; price: number } | null>(null);

    selectProduct(id: number): void {
        this.selectedId.set(id);
        const product = this.products().find(p => p.id === id);
        this.selectedProduct.set(product ?? null);
    }
}
