/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: SORTING PIPE
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'sortBy', standalone: true })
export class SortByPipe implements PipeTransform {
    transform<T>(items: T[], property: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
        if (!items || !property) return items;
        return [...items].sort((a, b) => {
            const valA = a[property];
            const valB = b[property];
            let comparison = 0;
            if (valA > valB) comparison = 1;
            if (valA < valB) comparison = -1;
            return order === 'desc' ? -comparison : comparison;
        });
    }
}

@Component({
    selector: 'app-scenario-2-sorting',
    standalone: true,
    imports: [CommonModule, SortByPipe],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Sorting Pipe</h2>
                <p>Sort arrays by any property with configurable order.</p>
            </div>

            <div class="content">
                <div class="controls">
                    <select [value]="sortProperty()" (change)="sortProperty.set($any($event.target).value)">
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="rating">Sort by Rating</option>
                    </select>
                    <button (click)="toggleOrder()">
                        {{ sortOrder() === 'asc' ? '↑ Ascending' : '↓ Descending' }}
                    </button>
                </div>

                <div class="items">
                    @for (item of items | sortBy:sortProperty():sortOrder(); track item.id) {
                        <div class="item-card">
                            <span class="name">{{ item.name }}</span>
                            <span class="price">\${{ item.price }}</span>
                            <span class="rating">⭐ {{ item.rating }}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        select { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        button { padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .items { display: grid; gap: 0.5rem; }
        .item-card { display: flex; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .name { flex: 1; }
        .price { color: #10b981; }
        .rating { color: #f59e0b; }
    `]
})
export class Scenario2SortingComponent {
    sortProperty = signal<'name' | 'price' | 'rating'>('name');
    sortOrder = signal<'asc' | 'desc'>('asc');

    items = [
        { id: 1, name: 'Apple Watch', price: 399, rating: 4.5 },
        { id: 2, name: 'AirPods Pro', price: 249, rating: 4.8 },
        { id: 3, name: 'MacBook Air', price: 999, rating: 4.7 },
        { id: 4, name: 'iPad Mini', price: 499, rating: 4.3 },
        { id: 5, name: 'iPhone 15', price: 799, rating: 4.6 },
    ];

    toggleOrder(): void {
        this.sortOrder.update(o => o === 'asc' ? 'desc' : 'asc');
    }
}
