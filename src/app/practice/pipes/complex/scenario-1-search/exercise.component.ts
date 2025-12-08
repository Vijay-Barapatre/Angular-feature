/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: SEARCH FILTER
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'searchFilter', standalone: true })
export class SearchFilterPipe implements PipeTransform {
    transform<T>(items: T[], searchTerm: string, properties: (keyof T)[]): T[] {
        if (!items || !searchTerm) return items;
        const term = searchTerm.toLowerCase();
        return items.filter(item =>
            properties.some(prop => {
                const value = item[prop];
                return value && String(value).toLowerCase().includes(term);
            })
        );
    }
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

@Component({
    selector: 'app-scenario-1-search',
    standalone: true,
    imports: [CommonModule, SearchFilterPipe],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Search Filter Pipe</h2>
                <p>Filter list items based on multiple properties.</p>
            </div>

            <div class="content">
                <input type="text" [value]="search()" 
                    (input)="search.set($any($event.target).value)"
                    placeholder="Search products...">

                <div class="results">
                    @for (product of products | searchFilter:search():['name', 'category']; track product.id) {
                        <div class="product-card">
                            <span class="name">{{ product.name }}</span>
                            <span class="category">{{ product.category }}</span>
                            <span class="price">\${{ product.price }}</span>
                        </div>
                    } @empty {
                        <p class="no-results">No products found</p>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; margin-bottom: 1rem; }
        .results { display: grid; gap: 0.5rem; }
        .product-card { display: flex; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; align-items: center; }
        .name { flex: 1; font-weight: 500; }
        .category { color: #6b7280; font-size: 0.9rem; }
        .price { color: #10b981; font-weight: bold; }
        .no-results { text-align: center; color: #6b7280; padding: 2rem; }
    `]
})
export class Scenario1SearchComponent {
    search = signal('');
    products: Product[] = [
        { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299 },
        { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 49 },
        { id: 3, name: 'Office Chair', category: 'Furniture', price: 299 },
        { id: 4, name: 'Desk Lamp', category: 'Lighting', price: 79 },
        { id: 5, name: 'Mechanical Keyboard', category: 'Electronics', price: 149 },
    ];
}
