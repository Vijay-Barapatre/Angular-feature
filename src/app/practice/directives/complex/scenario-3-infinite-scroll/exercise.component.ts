/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: INFINITE SCROLL
 * ============================================================================
 */

import { Component, Directive, ElementRef, EventEmitter, HostListener, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true
})
export class InfiniteScrollDirective {
    @Output() scrollEnd = new EventEmitter<void>();

    constructor(private el: ElementRef) { }

    @HostListener('scroll')
    onScroll(): void {
        const element = this.el.nativeElement;
        const threshold = 50;
        const reachedBottom =
            element.scrollHeight - element.scrollTop <= element.clientHeight + threshold;

        if (reachedBottom) {
            this.scrollEnd.emit();
        }
    }
}

@Component({
    selector: 'app-scenario-3-infinite-scroll',
    standalone: true,
    imports: [CommonModule, InfiniteScrollDirective],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Infinite Scroll</h2>
                <p>Load more items when scrolling to the bottom.</p>
            </div>

            <div class="content">
                <div class="scroll-container" appInfiniteScroll (scrollEnd)="loadMore()">
                    @for (item of items(); track item.id) {
                        <div class="item">
                            <span class="item-id">#{{ item.id }}</span>
                            <span class="item-name">{{ item.name }}</span>
                        </div>
                    }
                    @if (loading()) {
                        <div class="loading">Loading more...</div>
                    }
                </div>
                <div class="stats">
                    Loaded: {{ items().length }} items | Total loads: {{ loadCount() }}
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .scroll-container { height: 300px; overflow-y: auto; border: 2px solid #e5e7eb; border-radius: 8px; padding: 0.5rem; }
        .item { display: flex; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .item-id { color: #6b7280; font-size: 0.85rem; }
        .item-name { font-weight: 500; }
        .loading { padding: 1rem; text-align: center; color: #6b7280; }
        .stats { margin-top: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; text-align: center; font-size: 0.9rem; }
    `]
})
export class Scenario3InfiniteScrollComponent {
    items = signal<{ id: number; name: string }[]>([]);
    loading = signal(false);
    loadCount = signal(0);
    private nextId = 1;

    constructor() {
        this.loadInitial();
    }

    loadInitial(): void {
        this.items.set(this.generateItems(10));
    }

    loadMore(): void {
        if (this.loading()) return;

        this.loading.set(true);
        this.loadCount.update(n => n + 1);

        setTimeout(() => {
            this.items.update(items => [...items, ...this.generateItems(5)]);
            this.loading.set(false);
        }, 500);
    }

    private generateItems(count: number): { id: number; name: string }[] {
        return Array.from({ length: count }, () => ({
            id: this.nextId++,
            name: `Item ${this.nextId - 1}`
        }));
    }
}
