/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: QUERY PARAMETERS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exercise-3-query',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Query Parameters</h2>
                <p>Work with optional query parameters for filtering and pagination.</p>
            </div>

            <div class="demo">
                <div class="code-block">
                    <h4>Using Query Params</h4>
                    <pre><code>// In template
&lt;a [routerLink]="['/search']" 
   [queryParams]="{{ '{' }} q: 'angular', page: 1 {{ '}' }}"&gt;
  Search
&lt;/a&gt;

// Programmatic
this.router.navigate(['/search'], {{ '{' }}
  queryParams: {{ '{' }} category: 'books', sort: 'price' {{ '}' }}
{{ '}' }});

// Reading
this.route.queryParamMap.subscribe(params => {{ '{' }}
  this.page = params.get('page');
{{ '}' }});</code></pre>
                </div>

                <h3>🔍 Filter Demo</h3>
                
                <div class="filters">
                    <div class="filter-row">
                        <label>Category:</label>
                        <select [(ngModel)]="category" (ngModelChange)="updateUrl()">
                            <option value="">All</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                        </select>
                    </div>
                    <div class="filter-row">
                        <label>Sort:</label>
                        <select [(ngModel)]="sort" (ngModelChange)="updateUrl()">
                            <option value="name">Name</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                    <div class="filter-row">
                        <label>Page:</label>
                        <div class="pagination">
                            <button (click)="prevPage()" [disabled]="page <= 1">←</button>
                            <span>{{ page }}</span>
                            <button (click)="nextPage()">→</button>
                        </div>
                    </div>
                </div>

                <div class="url-preview">
                    <h4>Generated URL:</h4>
                    <code>{{ generatedUrl() }}</code>
                </div>

                <div class="query-params">
                    <h4>Query Params Object:</h4>
                    <pre>{{ queryParams() | json }}</pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; }
        .code-block h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.85rem; }
        .filters { display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .filter-row { display: flex; align-items: center; gap: 1rem; }
        .filter-row label { min-width: 80px; font-weight: 500; }
        .filter-row select { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .pagination { display: flex; align-items: center; gap: 0.5rem; }
        .pagination button { width: 32px; height: 32px; background: #ec4899; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .pagination button:disabled { opacity: 0.5; }
        .pagination span { min-width: 40px; text-align: center; font-weight: bold; }
        .url-preview { padding: 1rem; background: #334155; border-radius: 8px; margin-bottom: 1rem; }
        .url-preview h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .url-preview code { color: #a6e3a1; word-break: break-all; }
        .query-params { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .query-params h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .query-params pre { margin: 0; color: #fbbf24; font-size: 0.9rem; }
    `]
})
export class Exercise3QueryComponent {
    category = '';
    sort = 'name';
    page = 1;

    generatedUrl = signal('/products');
    queryParams = signal<Record<string, string | number>>({});

    updateUrl(): void {
        const params: Record<string, string | number> = {};

        if (this.category) params['category'] = this.category;
        if (this.sort !== 'name') params['sort'] = this.sort;
        if (this.page > 1) params['page'] = this.page;

        this.queryParams.set(params);

        const queryString = Object.entries(params)
            .map(([key, val]) => `${key}=${val}`)
            .join('&');

        this.generatedUrl.set('/products' + (queryString ? `?${queryString}` : ''));
    }

    prevPage(): void {
        if (this.page > 1) {
            this.page--;
            this.updateUrl();
        }
    }

    nextPage(): void {
        this.page++;
        this.updateUrl();
    }
}
