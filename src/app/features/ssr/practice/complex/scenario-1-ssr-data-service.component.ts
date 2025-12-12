/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: SSR-READY DATA SERVICE
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Build a complete data service that properly handles SSR by caching 
 * API responses in TransferState to prevent duplicate fetches.
 * 
 * 📝 SCENARIO:
 * You're building an e-commerce product catalog. Products must be fetched
 * from an API and displayed. Without proper caching, the API would be
 * called twice - once on server and once when the client hydrates.
 * 
 * ✅ REQUIREMENTS:
 * 1. Create a product service with getProducts() method
 * 2. On server: fetch from API and store in TransferState
 * 3. On client: check TransferState first, only fetch if not cached
 * 4. Track and display API call statistics
 * 5. Implement cache invalidation
 * 
 * 🎯 SKILLS TESTED:
 * - TransferState API
 * - Platform detection
 * - Service architecture
 * - Cache management
 */

import { Component, OnInit, PLATFORM_ID, inject, Injectable } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';

// Data models
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

interface CacheStats {
    hits: number;
    misses: number;
    apiCalls: number;
}

// TODO: Create state keys
// const PRODUCTS_KEY = makeStateKey<Product[]>('catalog-products');

/**
 * TODO: Implement this service
 * 
 * This service should:
 * 1. Check TransferState before making API calls
 * 2. Store API responses in TransferState on server
 * 3. Remove cached data after consumption on client
 * 4. Track cache statistics
 */
@Injectable({ providedIn: 'root' })
class ProductCatalogService {
    // TODO: Inject dependencies
    // private transferState = inject(TransferState);
    // private platformId = inject(PLATFORM_ID);

    private stats: CacheStats = { hits: 0, misses: 0, apiCalls: 0 };

    getStats(): CacheStats {
        return { ...this.stats };
    }

    /**
     * TODO: Implement this method
     * 
     * 1. Check TransferState for cached products
     * 2. If cached, return and remove from state (cache hit)
     * 3. If not cached, simulate API call (cache miss)
     * 4. On server, store result in TransferState
     */
    async getProducts(): Promise<Product[]> {
        // TODO: Implement caching logic

        // For now, just simulate API call
        this.stats.apiCalls++;
        this.stats.misses++;
        return this.mockApiCall();
    }

    clearCache(): void {
        this.stats = { hits: 0, misses: 0, apiCalls: 0 };
    }

    private mockApiCall(): Promise<Product[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'Laptop Pro', price: 1299, category: 'Electronics', inStock: true },
                    { id: 2, name: 'Wireless Mouse', price: 59, category: 'Electronics', inStock: true },
                    { id: 3, name: 'USB-C Hub', price: 89, category: 'Accessories', inStock: false },
                    { id: 4, name: 'Mechanical Keyboard', price: 149, category: 'Electronics', inStock: true },
                    { id: 5, name: 'Monitor Stand', price: 79, category: 'Accessories', inStock: true },
                ]);
            }, 800);
        });
    }
}

@Component({
    selector: 'app-scenario-ssr-data-service',
    standalone: true,
    imports: [CommonModule],
    providers: [ProductCatalogService],
    template: `
        <div class="scenario-container">
            <h2>🏪 Scenario 1: SSR-Ready Data Service</h2>
            
            <div class="scenario-card">
                <h3>📋 Scenario</h3>
                <p>
                    Build a product catalog service that uses TransferState to cache
                    API responses and prevent duplicate fetches between server and client.
                </p>
            </div>

            <div class="requirements-section">
                <h3>✅ Requirements</h3>
                <ul>
                    <li>Check TransferState before API calls</li>
                    <li>Store response in TransferState on server</li>
                    <li>Consume and remove cache on client</li>
                    <li>Track cache hit/miss statistics</li>
                    <li>Implement cache clearing</li>
                </ul>
            </div>

            <div class="demo-section">
                <h3>🎮 Live Demo</h3>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-value hits">{{ stats.hits }}</span>
                        <span class="stat-label">Cache Hits</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value misses">{{ stats.misses }}</span>
                        <span class="stat-label">Cache Misses</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value api">{{ stats.apiCalls }}</span>
                        <span class="stat-label">API Calls</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">{{ platform }}</span>
                        <span class="stat-label">Platform</span>
                    </div>
                </div>

                <div class="actions">
                    <button (click)="loadProducts()" [disabled]="loading" class="primary">
                        {{ loading ? 'Loading...' : 'Load Products' }}
                    </button>
                    <button (click)="clearAll()">Clear All</button>
                </div>

                <div class="products-grid" *ngIf="products.length > 0">
                    <div class="product-card" *ngFor="let product of products">
                        <div class="product-header">
                            <h4>{{ product.name }}</h4>
                            <span class="category">{{ product.category }}</span>
                        </div>
                        <div class="product-footer">
                            <span class="price">\${{ product.price }}</span>
                            <span class="stock" [class.in-stock]="product.inStock">
                                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="success-criteria" *ngIf="products.length > 0">
                    <h4>🎯 Success Criteria</h4>
                    <div class="criteria" [class.passed]="stats.apiCalls === 1">
                        {{ stats.apiCalls === 1 ? '✅' : '❌' }}
                        Only 1 API call should be made (not 2)
                    </div>
                    <div class="criteria" [class.passed]="stats.hits > 0 || stats.misses === 1">
                        {{ stats.hits > 0 || stats.misses === 1 ? '✅' : '❌' }}
                        Cache should be used on client hydration
                    </div>
                </div>
            </div>

            <div class="solution-section">
                <h3>💡 Solution Approach</h3>
                <details>
                    <summary>Click to see solution outline</summary>
                    <div class="solution-code">
                        <pre><code>async getProducts(): Promise&lt;Product[]&gt; {{ '{' }}
    // Step 1: Check cache
    const cached = this.transferState.get(PRODUCTS_KEY, null);
    
    if (cached) {{ '{' }}
        this.stats.hits++;
        this.transferState.remove(PRODUCTS_KEY);
        return cached;
    {{ '}' }}
    
    // Step 2: Fetch from API
    this.stats.misses++;
    this.stats.apiCalls++;
    const products = await this.mockApiCall();
    
    // Step 3: Store on server
    if (isPlatformServer(this.platformId)) {{ '{' }}
        this.transferState.set(PRODUCTS_KEY, products);
    {{ '}' }}
    
    return products;
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
        .requirements-section li { margin-bottom: 0.25rem; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1rem; }
        .stat-card { padding: 1rem; background: var(--bg-secondary, #f8fafc); border-radius: 8px; text-align: center; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: bold; }
        .stat-value.hits { color: #10b981; }
        .stat-value.misses { color: #f59e0b; }
        .stat-value.api { color: #6366f1; }
        .stat-label { font-size: 0.75rem; color: var(--text-secondary, #64748b); }
        
        .actions { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .actions button { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
        .actions button.primary { background: #6366f1; color: white; }
        .actions button.primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .actions button:not(.primary) { background: var(--bg-secondary, #f8fafc); border: 2px solid var(--border-color, #e2e8f0); }
        
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
        .product-card { padding: 1rem; background: white; border-radius: 8px; border: 1px solid var(--border-color, #e2e8f0); }
        .product-header h4 { margin: 0 0 0.25rem; }
        .category { font-size: 0.75rem; color: #6366f1; background: #ede9fe; padding: 0.15rem 0.5rem; border-radius: 4px; }
        .product-footer { display: flex; justify-content: space-between; margin-top: 0.75rem; }
        .price { font-weight: bold; color: #10b981; }
        .stock { font-size: 0.75rem; color: #ef4444; }
        .stock.in-stock { color: #10b981; }
        
        .success-criteria { padding: 1rem; background: var(--bg-secondary, #f8fafc); border-radius: 8px; margin-bottom: 1.5rem; }
        .success-criteria h4 { margin: 0 0 0.75rem; }
        .criteria { padding: 0.5rem 0; color: #ef4444; }
        .criteria.passed { color: #10b981; }
        
        .solution-section { background: #f0fdf4; padding: 1rem; border-radius: 8px; border: 1px solid #10b981; }
        .solution-section h3 { margin: 0 0 0.75rem; color: #047857; }
        details summary { cursor: pointer; padding: 0.5rem; }
        .solution-code pre { margin: 0.5rem 0 0; padding: 1rem; background: #1e293b; border-radius: 6px; overflow-x: auto; }
        .solution-code code { color: #e879f9; font-size: 0.85rem; }
    `]
})
export class ScenarioSsrDataServiceComponent implements OnInit {
    private service = inject(ProductCatalogService);
    private platformId = inject(PLATFORM_ID);

    products: Product[] = [];
    loading = false;
    stats: CacheStats = { hits: 0, misses: 0, apiCalls: 0 };
    platform = 'Unknown';

    ngOnInit(): void {
        this.platform = isPlatformBrowser(this.platformId) ? 'Browser' : 'Server';
        this.updateStats();
    }

    async loadProducts(): Promise<void> {
        this.loading = true;
        this.products = await this.service.getProducts();
        this.updateStats();
        this.loading = false;
    }

    clearAll(): void {
        this.products = [];
        this.service.clearCache();
        this.updateStats();
    }

    private updateStats(): void {
        this.stats = this.service.getStats();
    }
}
