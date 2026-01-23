import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

@Component({
    selector: 'app-query-parameters',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Query Parameters
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Filter Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Product Filter</h3>
              
              <!-- Search Controls -->
              <div class="flex flex-col gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Search</label>
                  <input type="text" 
                         [(ngModel)]="searchTerm"
                         (input)="updateFilters()"
                         placeholder="e.g. laptop"
                         class="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow">
                </div>

                <div class="flex gap-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select [(ngModel)]="selectedCategory" 
                            (change)="updateFilters()"
                            class="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option value="">All Categories</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="books">Books</option>
                    </select>
                  </div>
                  
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Price</label>
                    <select [(ngModel)]="sortOrder" 
                            (change)="updateFilters()"
                            class="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option value="asc">Low to High</option>
                      <option value="desc">High to Low</option>
                    </select>
                  </div>
                </div>

                <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span>URL Preview:</span>
                  <code class="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                    ?q={{searchTerm}}&category={{selectedCategory}}&sort={{sortOrder}}
                  </code>
                </div>
              </div>

              <!-- Results List -->
              <div class="space-y-2">
                <ng-container *ngIf="filteredProducts$ | async as products">
                  <div *ngFor="let product of products" 
                       class="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <div>
                      <h4 class="font-medium text-slate-800 dark:text-slate-200">{{product.name}}</h4>
                      <span class="text-xs text-slate-500 capitalize">{{product.category}}</span>
                    </div>
                    <span class="font-bold text-slate-700 dark:text-slate-300">\${{product.price}}</span>
                  </div>
                  
                  <div *ngIf="products.length === 0" class="text-center py-6 text-slate-500">
                    No products found matching your criteria.
                  </div>
                </ng-container>
              </div>
            </div>

            <div class="p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-lg">
              <h4 class="font-semibold text-sky-900 dark:text-sky-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                Key Config: queryParamsHandling
              </h4>
              <p class="text-sky-800 dark:text-sky-400 text-sm">
                When navigating, use <code>queryParamsHandling: 'merge'</code> to update specific parameters while keeping others (like 'tab=details') intact.
              </p>
            </div>
          </div>

          <!-- Component/Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `
})
export class QueryParametersComponent {
    searchTerm = '';
    selectedCategory = '';
    sortOrder = 'asc';

    products: Product[] = [
        { id: 1, name: 'MacBook Pro', category: 'electronics', price: 1999 },
        { id: 2, name: 'T-Shirt', category: 'clothing', price: 29 },
        { id: 3, name: 'iPhone 15', category: 'electronics', price: 999 },
        { id: 4, name: 'The Pragmatic Programmer', category: 'books', price: 45 },
        { id: 5, name: 'Jeans', category: 'clothing', price: 59 },
        { id: 6, name: 'Kindle', category: 'electronics', price: 129 },
        { id: 7, name: 'Design Patterns', category: 'books', price: 55 },
    ];

    filteredProducts$: Observable<Product[]>;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        // React to URL changes - Single Source of Truth!
        this.filteredProducts$ = this.route.queryParams.pipe(
            map(params => {
                // 1. Sync local state with URL
                this.searchTerm = params['q'] || '';
                this.selectedCategory = params['category'] || '';
                this.sortOrder = params['sort'] || 'asc';

                // 2. Perform Filtering
                return this.products
                    .filter(p => {
                        const matchesSearch = p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
                        const matchesCategory = this.selectedCategory ? p.category === this.selectedCategory : true;
                        return matchesSearch && matchesCategory;
                    })
                    .sort((a, b) => {
                        return this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
                    });
            })
        );
    }

    updateFilters() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                q: this.searchTerm || null,           // remove if empty
                category: this.selectedCategory || null,
                sort: this.sortOrder
            },
            queryParamsHandling: 'merge', // merge with existing params (if any others existed)
            replaceUrl: true // optional: don't clog up history with every keystroke
        });
    }
}
