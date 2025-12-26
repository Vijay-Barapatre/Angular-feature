/**
 * CONTROL FLOW FEATURE - Use Case 2: @for Loop Rendering
 * 
 * Angular 17+ built-in control flow for iteration
 */
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

@Component({
    selector: 'app-for-control-flow',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🔄 Use Case 2: Loop Rendering</h2>
            <p class="subtitle">Angular 17+ built-in control flow for iteration</p>
            
            <!-- Demo 1: Basic @for -->
            <section class="demo-section">
                <h3>1️⃣ Basic Loop with track</h3>
                <div class="demo-area">
                    <ul class="simple-list">
                        @for (item of fruits(); track item) {
                            <li>🍎 {{ item }}</li>
                        }
                    </ul>
                </div>
            </section>

            <!-- Demo 2: @for with index and count -->
            <section class="demo-section">
                <h3>2️⃣ Loop with Context Variables</h3>
                <div class="demo-area">
                    <ul class="context-list">
                        @for (user of users(); track user.id; let i = $index, c = $count) {
                            <li [class.even]="$even" [class.odd]="$odd">
                                <span class="index">{{ i + 1 }}/{{ c }}</span>
                                <span class="name">{{ user.name }}</span>
                                @if ($first) { <span class="badge first">First</span> }
                                @if ($last) { <span class="badge last">Last</span> }
                            </li>
                        }
                    </ul>
                </div>
            </section>

            <!-- Demo 3: @empty block -->
            <section class="demo-section">
                <h3>3️⃣ Loop with empty Block</h3>
                <div class="controls">
                    <button class="btn" (click)="toggleItems()">
                        {{ items().length ? 'Clear Items' : 'Add Items' }}
                    </button>
                </div>
                <div class="demo-area">
                    @for (item of items(); track item.id) {
                        <div class="item-card">{{ item.name }}</div>
                    } @empty {
                        <div class="empty-state">
                            📭 No items found. Click "Add Items" to populate.
                        </div>
                    }
                </div>
            </section>

            <!-- Demo 4: Products with CRUD -->
            <section class="demo-section">
                <h3>4️⃣ Interactive List (CRUD)</h3>
                <div class="controls">
                    <button class="btn" (click)="addProduct()">➕ Add Product</button>
                    <button class="btn secondary" (click)="shuffleProducts()">🔀 Shuffle</button>
                </div>
                <div class="products-grid">
                    @for (product of products(); track product.id) {
                        <div class="product-card">
                            <div class="product-name">{{ product.name }}</div>
                            <div class="product-price">\${{ product.price }}</div>
                            <div class="product-category">{{ product.category }}</div>
                            <button class="remove-btn" (click)="removeProduct(product.id)">×</button>
                        </div>
                    } @empty {
                        <div class="empty-state full-width">No products. Add some!</div>
                    }
                </div>
            </section>

            <!-- Context Variables Reference -->
            <section class="reference-section">
                <h3>📊 Context Variables</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code>$index</code></td><td>number</td><td>Current iteration index (0-based)</td></tr>
                        <tr><td><code>$count</code></td><td>number</td><td>Total items in collection</td></tr>
                        <tr><td><code>$first</code></td><td>boolean</td><td>True for first item</td></tr>
                        <tr><td><code>$last</code></td><td>boolean</td><td>True for last item</td></tr>
                        <tr><td><code>$even</code></td><td>boolean</td><td>True for even index</td></tr>
                        <tr><td><code>$odd</code></td><td>boolean</td><td>True for odd index</td></tr>
                    </tbody>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h2 { color: #22c55e; margin-bottom: 0.5rem; }
        .subtitle { color: #a0a0a0; margin-bottom: 2rem; }
        
        .demo-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }
        
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        
        .controls {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            background: linear-gradient(135deg, #22c55e, #14b8a6);
            color: white;
        }
        
        .btn.secondary {
            background: #4b5563;
        }
        
        .demo-area {
            margin-bottom: 1rem;
        }
        
        .simple-list, .context-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .simple-list li {
            padding: 0.5rem;
            background: #0d0d0d;
            margin-bottom: 0.25rem;
            border-radius: 4px;
        }
        
        .context-list li {
            padding: 0.75rem;
            background: #0d0d0d;
            margin-bottom: 0.25rem;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .context-list li.even { background: #1a1a2e; }
        .context-list li.odd { background: #0d0d0d; }
        
        .index { color: #a0a0a0; font-size: 0.85rem; }
        .name { flex: 1; }
        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .badge.first { background: #22c55e; color: white; }
        .badge.last { background: #ef4444; color: white; }
        
        .item-card {
            padding: 0.75rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 8px;
            color: white;
            margin-bottom: 0.5rem;
        }
        
        .empty-state {
            padding: 2rem;
            background: #0d0d0d;
            border-radius: 8px;
            text-align: center;
            color: #a0a0a0;
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
        }
        
        .product-card {
            padding: 1rem;
            background: linear-gradient(135deg, #3b82f6, #06b6d4);
            border-radius: 12px;
            color: white;
            position: relative;
        }
        
        .product-name { font-weight: 600; margin-bottom: 0.5rem; }
        .product-price { font-size: 1.25rem; font-weight: 700; }
        .product-category { font-size: 0.8rem; opacity: 0.8; margin-top: 0.25rem; }
        
        .remove-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1rem;
        }
        
        .full-width { grid-column: 1 / -1; }
        
        pre {
            background: #0d0d0d;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 0;
        }
        
        code {
            color: #a6e3a1;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }
        
        .reference-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #333;
        }
        
        th { background: #0d0d0d; color: #22c55e; }
        
        td code {
            background: #0d0d0d;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
        }
    `]
})
export class ForControlFlowComponent {
    fruits = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);

    users = signal([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'Diana' },
        { id: 5, name: 'Eve' }
    ]);

    items = signal([
        { id: 1, name: 'Item A' },
        { id: 2, name: 'Item B' },
        { id: 3, name: 'Item C' }
    ]);

    products = signal<Product[]>([
        { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
        { id: 2, name: 'Headphones', price: 149, category: 'Electronics' },
        { id: 3, name: 'Desk Chair', price: 299, category: 'Furniture' }
    ]);

    toggleItems(): void {
        if (this.items().length) {
            this.items.set([]);
        } else {
            this.items.set([
                { id: 1, name: 'Item A' },
                { id: 2, name: 'Item B' },
                { id: 3, name: 'Item C' }
            ]);
        }
    }

    addProduct(): void {
        const id = Date.now();
        const names = ['Monitor', 'Keyboard', 'Mouse', 'Webcam', 'Microphone'];
        const categories = ['Electronics', 'Accessories', 'Peripherals'];
        this.products.update(p => [...p, {
            id,
            name: names[Math.floor(Math.random() * names.length)],
            price: Math.floor(Math.random() * 500) + 50,
            category: categories[Math.floor(Math.random() * categories.length)]
        }]);
    }

    removeProduct(id: number): void {
        this.products.update(p => p.filter(prod => prod.id !== id));
    }

    shuffleProducts(): void {
        this.products.update(p => [...p].sort(() => Math.random() - 0.5));
    }
}
