/**
 * ============================================================================
 * 📦 NgRx Entity Adapter - Educational Component
 * ============================================================================
 * 
 * This component demonstrates @ngrx/entity - a utility for managing
 * collections of entities in a normalized format.
 * 
 * ============================================================================
 * 📚 WHY ENTITY ADAPTER?
 * ============================================================================
 * 
 * Managing arrays of objects (users, products, orders) is tedious:
 * - Finding by ID requires array.find()
 * - Updating requires array.map()
 * - Deleting requires array.filter()
 * - All operations are O(n) complexity
 * 
 * Entity Adapter solves this by:
 * - Storing entities in a normalized { ids: [], entities: {} } format
 * - Providing CRUD helpers (addOne, updateOne, removeOne)
 * - O(1) lookups by ID
 * - Auto-sorting capabilities
 * 
 * ============================================================================
 * 🎯 ENTITY STATE STRUCTURE
 * ============================================================================
 * 
 * Instead of: User[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 * 
 * Entity Adapter stores:
 * {
 *   ids: [1, 2],           // Ordered array of IDs
 *   entities: {
 *     1: { id: 1, name: 'John' },
 *     2: { id: 2, name: 'Jane' }
 *   }
 * }
 * 
 * Benefits:
 * - O(1) lookup: entities[id]
 * - Maintains order via ids array
 * - Easy to check existence: id in entities
 * 
 * ============================================================================
 * 🔧 ADAPTER METHODS
 * ============================================================================
 * 
 * | Method      | Purpose              | Example                      |
 * |-------------|----------------------|------------------------------|
 * | addOne      | Add single entity    | adapter.addOne(user, state)  |
 * | addMany     | Add multiple         | adapter.addMany(users, state)|
 * | setAll      | Replace all          | adapter.setAll(users, state) |
 * | updateOne   | Update single        | adapter.updateOne({id, changes}, state) |
 * | updateMany  | Update multiple      | adapter.updateMany(updates, state) |
 * | removeOne   | Delete single        | adapter.removeOne(id, state) |
 * | removeMany  | Delete multiple      | adapter.removeMany(ids, state) |
 * | upsertOne   | Add or update        | adapter.upsertOne(user, state) |
 */
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

@Component({
    selector: 'app-entity-adapter',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/ngrx" class="back-link">← Back to NgRx Overview</a>
                <h1>📦 Use Case 3: Entity Adapter</h1>
                <p>Efficient Collection Management with &#64;ngrx/entity</p>
            </header>

            <div class="content-grid">
                <!-- ENTITY STRUCTURE VISUALIZATION -->
                <section class="card structure-card">
                    <h2>🗃️ Entity State Structure</h2>
                    <div class="code-block">
                        <pre>{{ entityStructure() | json }}</pre>
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <span class="value">{{ products().length }}</span>
                            <span class="label">Total Products</span>
                        </div>
                        <div class="stat">
                            <span class="value">{{ inStockCount() }}</span>
                            <span class="label">In Stock</span>
                        </div>
                    </div>
                </section>

                <!-- CRUD OPERATIONS -->
                <section class="card operations-card">
                    <h2>⚡ Entity Operations</h2>
                    
                    <div class="operation-group">
                        <h3>Add Product</h3>
                        <div class="input-row">
                            <input [(ngModel)]="newProduct.name" placeholder="Name">
                            <input [(ngModel)]="newProduct.price" type="number" placeholder="Price">
                            <button (click)="addProduct()" class="btn add">+ Add</button>
                        </div>
                    </div>

                    <div class="operation-group">
                        <h3>Bulk Operations</h3>
                        <div class="button-row">
                            <button (click)="loadSampleData()" class="btn load">Load Sample</button>
                            <button (click)="removeAll()" class="btn danger">Clear All</button>
                            <button (click)="toggleAllStock()" class="btn toggle">Toggle Stock</button>
                        </div>
                    </div>
                </section>

                <!-- PRODUCTS LIST -->
                <section class="card products-card">
                    <h2>📋 Products ({{ products().length }})</h2>
                    <div class="products-list">
                        @for (product of products(); track product.id) {
                            <div class="product-item" [class.out-of-stock]="!product.inStock">
                                <div class="product-info">
                                    <span class="id">#{{ product.id }}</span>
                                    <span class="name">{{ product.name }}</span>
                                    <span class="price">\${{ product.price }}</span>
                                    <span class="stock" [class.in]="product.inStock">
                                        {{ product.inStock ? '✓ In Stock' : '✗ Out' }}
                                    </span>
                                </div>
                                <div class="product-actions">
                                    <button (click)="toggleStock(product.id)" class="btn-icon">
                                        {{ product.inStock ? '📦' : '❌' }}
                                    </button>
                                    <button (click)="removeProduct(product.id)" class="btn-icon danger">🗑️</button>
                                </div>
                            </div>
                        } @empty {
                            <div class="empty">No products. Add some or load sample data!</div>
                        }
                    </div>
                </section>

                <!-- COMPARISON -->
                <section class="card comparison-card">
                    <h2>📊 Array vs Entity Adapter</h2>
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Operation</th>
                                <th>Array</th>
                                <th>Entity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Find by ID</td>
                                <td class="bad">O(n) - array.find()</td>
                                <td class="good">O(1) - entities[id]</td>
                            </tr>
                            <tr>
                                <td>Update</td>
                                <td class="bad">O(n) - array.map()</td>
                                <td class="good">O(1) - spread</td>
                            </tr>
                            <tr>
                                <td>Delete</td>
                                <td class="bad">O(n) - array.filter()</td>
                                <td class="good">O(1) - delete + filter ids</td>
                            </tr>
                            <tr>
                                <td>Check exists</td>
                                <td class="bad">O(n) - array.some()</td>
                                <td class="good">O(1) - id in entities</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
        h1 { color: #f8fafc; margin: 0.5rem 0; }
        p { color: #94a3b8; }

        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        .card {
            background: #1e293b;
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .card h2 { color: #f8fafc; margin: 0 0 1rem 0; font-size: 1.1rem; }
        .card h3 { color: #94a3b8; margin: 0.5rem 0; font-size: 0.9rem; }

        .structure-card { grid-column: 1 / -1; }
        .products-card { grid-column: 1 / -1; }
        .comparison-card { grid-column: 1 / -1; }

        .code-block {
            background: #0f172a;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-family: monospace;
            font-size: 0.85rem;
            color: #10b981;
        }

        .stats { display: flex; gap: 2rem; margin-top: 1rem; }
        .stat { text-align: center; }
        .stat .value { display: block; font-size: 2rem; font-weight: bold; color: #3b82f6; }
        .stat .label { color: #64748b; font-size: 0.85rem; }

        .input-row, .button-row { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
        .input-row input {
            flex: 1;
            padding: 0.5rem;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #0f172a;
            color: white;
        }

        .btn {
            padding: 0.5rem 1rem;
            border-radius: 6px;
            border: none;
            font-weight: 600;
            cursor: pointer;
        }
        .btn.add { background: #10b981; color: white; }
        .btn.load { background: #3b82f6; color: white; }
        .btn.danger { background: #ef4444; color: white; }
        .btn.toggle { background: #f59e0b; color: white; }

        .products-list { max-height: 300px; overflow-y: auto; }
        .product-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: #0f172a;
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }
        .product-item.out-of-stock { opacity: 0.6; }
        .product-info { display: flex; gap: 1rem; align-items: center; }
        .id { color: #64748b; font-family: monospace; }
        .name { color: #f8fafc; font-weight: 500; }
        .price { color: #10b981; }
        .stock { font-size: 0.8rem; }
        .stock.in { color: #10b981; }
        .stock:not(.in) { color: #ef4444; }
        .product-actions { display: flex; gap: 0.5rem; }
        .btn-icon { background: none; border: none; cursor: pointer; font-size: 1.2rem; }
        .btn-icon.danger:hover { transform: scale(1.2); }
        .empty { color: #64748b; text-align: center; padding: 2rem; font-style: italic; }

        .comparison-table { width: 100%; border-collapse: collapse; }
        .comparison-table th, .comparison-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #334155; }
        .comparison-table th { color: #94a3b8; }
        .comparison-table td { color: #f8fafc; }
        .comparison-table .good { color: #10b981; }
        .comparison-table .bad { color: #f59e0b; }

        .operation-group { margin-bottom: 1rem; }
    `]
})
export class EntityAdapterComponent {
    // Simulating Entity State structure
    private nextId = 1;
    private entityState = signal<{ ids: number[], entities: Record<number, Product> }>({
        ids: [],
        entities: {}
    });

    newProduct = { name: '', price: 0 };

    // Computed values (like selectors)
    products = computed(() => {
        const state = this.entityState();
        return state.ids.map(id => state.entities[id]);
    });

    inStockCount = computed(() =>
        this.products().filter(p => p.inStock).length
    );

    entityStructure = computed(() => ({
        ids: this.entityState().ids,
        entities: '{ ' + Object.keys(this.entityState().entities).join(', ') + ' }'
    }));

    addProduct() {
        if (!this.newProduct.name) return;

        const product: Product = {
            id: this.nextId++,
            name: this.newProduct.name,
            price: this.newProduct.price || 0,
            category: 'General',
            inStock: true
        };

        // Entity Adapter style: addOne
        this.entityState.update(state => ({
            ids: [...state.ids, product.id],
            entities: { ...state.entities, [product.id]: product }
        }));

        this.newProduct = { name: '', price: 0 };
    }

    removeProduct(id: number) {
        // Entity Adapter style: removeOne
        this.entityState.update(state => {
            const { [id]: removed, ...remainingEntities } = state.entities;
            return {
                ids: state.ids.filter(i => i !== id),
                entities: remainingEntities
            };
        });
    }

    toggleStock(id: number) {
        // Entity Adapter style: updateOne
        this.entityState.update(state => ({
            ...state,
            entities: {
                ...state.entities,
                [id]: { ...state.entities[id], inStock: !state.entities[id].inStock }
            }
        }));
    }

    toggleAllStock() {
        // Entity Adapter style: updateMany
        this.entityState.update(state => {
            const updatedEntities = { ...state.entities };
            state.ids.forEach(id => {
                updatedEntities[id] = { ...updatedEntities[id], inStock: !updatedEntities[id].inStock };
            });
            return { ...state, entities: updatedEntities };
        });
    }

    loadSampleData() {
        const sampleProducts: Product[] = [
            { id: this.nextId++, name: 'Laptop Pro', price: 1299, category: 'Electronics', inStock: true },
            { id: this.nextId++, name: 'Wireless Mouse', price: 49, category: 'Electronics', inStock: true },
            { id: this.nextId++, name: 'USB-C Hub', price: 79, category: 'Electronics', inStock: false },
            { id: this.nextId++, name: 'Monitor 27"', price: 399, category: 'Electronics', inStock: true },
            { id: this.nextId++, name: 'Keyboard', price: 129, category: 'Electronics', inStock: true },
        ];

        // Entity Adapter style: setAll
        this.entityState.set({
            ids: sampleProducts.map(p => p.id),
            entities: sampleProducts.reduce((acc, p) => ({ ...acc, [p.id]: p }), {})
        });
    }

    removeAll() {
        // Entity Adapter style: removeAll
        this.entityState.set({ ids: [], entities: {} });
    }
}
