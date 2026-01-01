/**
 * NGRX PRACTICE - INTERACTIVE EXERCISES
 * Components with working UI demos to practice NgRx concepts
 */
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ============================================
// MAIN PRACTICE COMPONENT
// ============================================
@Component({
    selector: 'app-ngrx-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🔴 NgRx Practice</h1>
                <p class="subtitle">State management with Redux pattern</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Store Setup</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Actions</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Reducers</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Selectors</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Effects</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Entity Adapter</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Feature State</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Router Store</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: DevTools</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #ba2bd2; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #ba2bd2; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(186, 43, 210, 0.1); }
        .nav-section a.active { background: #ba2bd2; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class NgRxPracticeComponent { }

// ============================================
// EXERCISE 1: STORE SETUP
// ============================================
@Component({
    selector: 'app-ngrx-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Store Setup</h2>
                <p>Configure NgRx store in a standalone Angular app with DevTools for debugging.</p>
            </div>
            <div class="demo-section">
                <h3>📋 Configuration Preview</h3>
                <div class="config-toggles">
                    <label class="toggle-label">
                        <input type="checkbox" [checked]="storeEnabled()" (change)="toggleStore()">
                        <span>provideStore()</span>
                        <span class="badge required">Required</span>
                    </label>
                    <label class="toggle-label">
                        <input type="checkbox" [checked]="effectsEnabled()" (change)="toggleEffects()">
                        <span>provideEffects()</span>
                        <span class="badge optional">Optional</span>
                    </label>
                    <label class="toggle-label">
                        <input type="checkbox" [checked]="devToolsEnabled()" (change)="toggleDevTools()">
                        <span>provideStoreDevtools()</span>
                        <span class="badge optional">Optional</span>
                    </label>
                </div>
                <div class="code-preview">
                    <pre>{{ generatedConfig() }}</pre>
                </div>
                <div class="status-bar" [class.valid]="storeEnabled()">
                    {{ storeEnabled() ? '✅ Store is properly configured!' : '❌ Store provider is required!' }}
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 900px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo-section { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .demo-section h3 { margin: 0 0 1rem; color: #1e1e2e; }
        .config-toggles { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .toggle-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem; background: white; border-radius: 6px; border: 1px solid #e2e8f0; }
        .toggle-label input { width: 18px; height: 18px; }
        .badge { padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge.required { background: #fee2e2; color: #dc2626; }
        .badge.optional { background: #e0f2fe; color: #0284c7; }
        .code-preview pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.8rem; line-height: 1.6; overflow-x: auto; white-space: pre-wrap; }
        .status-bar { padding: 0.75rem; border-radius: 6px; text-align: center; font-weight: 500; background: #fee2e2; color: #dc2626; }
        .status-bar.valid { background: #dcfce7; color: #16a34a; }
    `]
})
export class NgRxExercise1Component {
    storeEnabled = signal(true);
    effectsEnabled = signal(true);
    devToolsEnabled = signal(true);

    toggleStore() { this.storeEnabled.update(v => !v); }
    toggleEffects() { this.effectsEnabled.update(v => !v); }
    toggleDevTools() { this.devToolsEnabled.update(v => !v); }

    generatedConfig = computed(() => {
        const lines = ['// main.ts or app.config.ts', 'providers: ['];
        if (this.storeEnabled()) lines.push('  provideStore({ /* reducers */ }),');
        if (this.effectsEnabled()) lines.push('  provideEffects([]),');
        if (this.devToolsEnabled()) lines.push('  provideStoreDevtools({ maxAge: 25 }),');
        lines.push(']');
        return lines.join('\n');
    });
}

// ============================================
// EXERCISE 2: ACTIONS
// ============================================
@Component({
    selector: 'app-ngrx-exercise-2',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Actions</h2>
                <p>Define type-safe actions with createAction and props. Try dispatching actions!</p>
            </div>
            <div class="demo-section">
                <h3>🎬 Action Dispatcher</h3>
                <div class="action-buttons">
                    <button class="action-btn" (click)="dispatch('loadProducts')">📦 Load Products</button>
                    <button class="action-btn success" (click)="dispatch('loadSuccess')">✅ Load Success</button>
                    <button class="action-btn danger" (click)="dispatch('loadFailure')">❌ Load Failure</button>
                    <button class="action-btn add" (click)="dispatch('addProduct')">➕ Add Product</button>
                </div>
                <div class="action-log">
                    <h4>📜 Action Log</h4>
                    @for (action of actionLog(); track action.id) {
                        <div class="log-entry" [class]="action.type">
                            <span class="time">{{ action.time }}</span>
                            <span class="type">{{ action.action }}</span>
                            <span class="payload">{{ action.payload }}</span>
                        </div>
                    } @empty {
                        <p class="empty">No actions dispatched yet. Click a button above!</p>
                    }
                </div>
                <button class="clear-btn" (click)="clearLog()">🗑️ Clear Log</button>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 900px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo-section { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .demo-section h3, .demo-section h4 { margin: 0 0 1rem; color: #1e1e2e; }
        .action-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .action-btn { padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; background: #6366f1; color: white; }
        .action-btn.success { background: #22c55e; }
        .action-btn.danger { background: #ef4444; }
        .action-btn.add { background: #f59e0b; }
        .action-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .action-log { background: #1e1e2e; border-radius: 8px; padding: 1rem; max-height: 250px; overflow-y: auto; margin-bottom: 1rem; }
        .log-entry { display: flex; gap: 1rem; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.25rem; font-family: monospace; font-size: 0.85rem; }
        .log-entry.load { background: rgba(99, 102, 241, 0.2); }
        .log-entry.success { background: rgba(34, 197, 94, 0.2); }
        .log-entry.failure { background: rgba(239, 68, 68, 0.2); }
        .log-entry.add { background: rgba(245, 158, 11, 0.2); }
        .time { color: #94a3b8; }
        .type { color: #a6e3a1; font-weight: 600; }
        .payload { color: #f9a8d4; }
        .empty { color: #64748b; text-align: center; margin: 2rem 0; }
        .clear-btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; background: #475569; color: white; }
    `]
})
export class NgRxExercise2Component {
    private logId = 0;
    actionLog = signal<{ id: number; time: string; action: string; payload: string; type: string }[]>([]);

    dispatch(type: string) {
        const now = new Date().toLocaleTimeString();
        const actions: Record<string, { action: string; payload: string; type: string }> = {
            loadProducts: { action: '[Products] Load', payload: '{}', type: 'load' },
            loadSuccess: { action: '[Products API] Load Success', payload: '{ products: [...] }', type: 'success' },
            loadFailure: { action: '[Products API] Load Failure', payload: '{ error: "Network error" }', type: 'failure' },
            addProduct: { action: '[Products] Add', payload: '{ product: { id: 1, name: "Widget" } }', type: 'add' }
        };
        const entry = { id: this.logId++, time: now, ...actions[type] };
        this.actionLog.update(log => [entry, ...log]);
    }

    clearLog() { this.actionLog.set([]); }
}

// ============================================
// EXERCISE 3: REDUCERS
// ============================================
@Component({
    selector: 'app-ngrx-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Reducers</h2>
                <p>Create pure reducer functions. See how actions transform state immutably!</p>
            </div>
            <div class="demo-section">
                <div class="state-display">
                    <h3>📊 Current State</h3>
                    <pre>{{ stateJson() }}</pre>
                </div>
                <div class="reducer-actions">
                    <h4>🎮 Dispatch Actions</h4>
                    <div class="button-grid">
                        <button (click)="increment()">➕ Increment</button>
                        <button (click)="decrement()">➖ Decrement</button>
                        <button (click)="reset()">🔄 Reset</button>
                        <button (click)="setLoading(true)">⏳ Set Loading</button>
                        <button (click)="setLoading(false)">✅ Loading Done</button>
                        <button (click)="addItem()">📦 Add Item</button>
                    </div>
                </div>
                <div class="history">
                    <h4>📜 State History (Last 5)</h4>
                    @for (h of history(); track $index) {
                        <div class="history-entry">{{ h }}</div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 900px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo-section { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .state-display { margin-bottom: 1.5rem; }
        .state-display h3 { margin: 0 0 0.5rem; color: #1e1e2e; }
        .state-display pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.85rem; }
        .reducer-actions h4 { margin: 0 0 0.75rem; color: #1e1e2e; }
        .button-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1.5rem; }
        .button-grid button { padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; background: #6366f1; color: white; font-weight: 500; }
        .button-grid button:hover { opacity: 0.9; }
        .history h4 { margin: 0 0 0.5rem; color: #1e1e2e; }
        .history-entry { font-family: monospace; font-size: 0.8rem; padding: 0.25rem 0.5rem; background: #e2e8f0; border-radius: 4px; margin-bottom: 0.25rem; }
    `]
})
export class NgRxExercise3Component {
    count = signal(0);
    loading = signal(false);
    items = signal<string[]>([]);
    history = signal<string[]>([]);

    stateJson = computed(() => JSON.stringify({ count: this.count(), loading: this.loading(), items: this.items() }, null, 2));

    private addHistory(action: string) {
        this.history.update(h => [action + ' → ' + this.stateJson(), ...h].slice(0, 5));
    }

    increment() { this.count.update(c => c + 1); this.addHistory('INCREMENT'); }
    decrement() { this.count.update(c => c - 1); this.addHistory('DECREMENT'); }
    reset() { this.count.set(0); this.items.set([]); this.addHistory('RESET'); }
    setLoading(val: boolean) { this.loading.set(val); this.addHistory(val ? 'LOADING_START' : 'LOADING_END'); }
    addItem() { this.items.update(i => [...i, 'Item ' + (i.length + 1)]); this.addHistory('ADD_ITEM'); }
}

// ============================================
// EXERCISE 4: SELECTORS
// ============================================
@Component({
    selector: 'app-ngrx-exercise-4',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Selectors</h2>
                <p>Create memoized selectors. Filter products and see computed values!</p>
            </div>
            <div class="demo-section">
                <div class="filters">
                    <label>Min Price: $<input type="number" [ngModel]="minPrice()" (ngModelChange)="minPrice.set($event)"></label>
                    <label>Category: 
                        <select [ngModel]="category()" (ngModelChange)="category.set($event)">
                            <option value="">All</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                        </select>
                    </label>
                </div>
                <div class="stats">
                    <div class="stat"><span class="label">Total Products:</span> <span class="value">{{ totalCount() }}</span></div>
                    <div class="stat"><span class="label">Filtered:</span> <span class="value">{{ filteredProducts().length }}</span></div>
                    <div class="stat"><span class="label">Avg Price:</span> <span class="value">\${{ avgPrice() }}</span></div>
                </div>
                <div class="products-grid">
                    @for (p of filteredProducts(); track p.id) {
                        <div class="product-card">
                            <span class="name">{{ p.name }}</span>
                            <span class="category">{{ p.category }}</span>
                            <span class="price">\${{ p.price }}</span>
                        </div>
                    } @empty {
                        <p class="empty">No products match filters</p>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 900px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ba2bd2; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo-section { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .filters { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .filters label { display: flex; align-items: center; gap: 0.5rem; }
        .filters input, .filters select { padding: 0.4rem; border-radius: 4px; border: 1px solid #cbd5e1; }
        .stats { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .stat { background: #e2e8f0; padding: 0.5rem 1rem; border-radius: 6px; }
        .stat .label { color: #64748b; }
        .stat .value { font-weight: 600; color: #1e1e2e; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.75rem; }
        .product-card { background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 0.25rem; }
        .product-card .name { font-weight: 600; color: #1e1e2e; }
        .product-card .category { font-size: 0.8rem; color: #64748b; }
        .product-card .price { color: #16a34a; font-weight: 500; }
        .empty { text-align: center; color: #64748b; grid-column: 1/-1; }
    `]
})
export class NgRxExercise4Component {
    products = signal([
        { id: 1, name: 'Laptop', price: 999, category: 'electronics' },
        { id: 2, name: 'T-Shirt', price: 25, category: 'clothing' },
        { id: 3, name: 'Phone', price: 699, category: 'electronics' },
        { id: 4, name: 'Jeans', price: 60, category: 'clothing' },
        { id: 5, name: 'Tablet', price: 450, category: 'electronics' },
    ]);
    minPrice = signal(0);
    category = signal('');

    totalCount = computed(() => this.products().length);
    filteredProducts = computed(() => {
        return this.products().filter(p =>
            p.price >= this.minPrice() &&
            (this.category() === '' || p.category === this.category())
        );
    });
    avgPrice = computed(() => {
        const fp = this.filteredProducts();
        return fp.length ? Math.round(fp.reduce((sum, p) => sum + p.price, 0) / fp.length) : 0;
    });
}

// ============================================
// SCENARIO 1: EFFECTS
// ============================================
@Component({
    selector: 'app-ngrx-scenario-1',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Effects</h2>
                <p>Handle async side effects like API calls with NgRx Effects.</p>
            </div>
            <div class="demo-section">
                <div class="controls">
                    <button [disabled]="loading()" (click)="loadProducts()">
                        {{ loading() ? '⏳ Loading...' : '📦 Load Products' }}
                    </button>
                    <label><input type="checkbox" [(ngModel)]="simulateError"> Simulate Error</label>
                </div>
                @if (error()) {
                    <div class="error-box">❌ {{ error() }}</div>
                }
                @if (loading()) {
                    <div class="loading-box">⏳ Fetching from API...</div>
                }
                <div class="products-list">
                    @for (p of products(); track p.id) {
                        <div class="product-item">{{ p.name }} - \${{ p.price }}</div>
                    } @empty {
                        @if (!loading()) {
                            <p class="empty">Click "Load Products" to fetch data</p>
                        }
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 900px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo-section { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .controls { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }
        .controls button { padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer; background: #6366f1; color: white; font-weight: 500; }
        .controls button:disabled { background: #94a3b8; cursor: not-allowed; }
        .error-box { background: #fee2e2; color: #dc2626; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; }
        .loading-box { background: #e0f2fe; color: #0284c7; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; }
        .products-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .product-item { background: white; padding: 0.75rem; border-radius: 6px; border: 1px solid #e2e8f0; }
        .empty { color: #64748b; text-align: center; }
    `]
})
export class NgRxScenario1Component {
    loading = signal(false);
    products = signal<{ id: number; name: string; price: number }[]>([]);
    error = signal('');
    simulateError = false;

    loadProducts() {
        this.loading.set(true);
        this.error.set('');
        this.products.set([]);

        // Simulate API call with delay
        setTimeout(() => {
            if (this.simulateError) {
                this.error.set('Failed to fetch products: Network error');
            } else {
                this.products.set([
                    { id: 1, name: 'Laptop Pro', price: 1299 },
                    { id: 2, name: 'Wireless Mouse', price: 49 },
                    { id: 3, name: 'Mechanical Keyboard', price: 159 },
                ]);
            }
            this.loading.set(false);
        }, 1500);
    }
}

// ============================================
// SCENARIO 2: ENTITY ADAPTER
// ============================================
@Component({
    selector: 'app-ngrx-scenario-2',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Entity Adapter</h2>
                <p>Manage normalized collections with CRUD operations.</p>
            </div>
            <div class="demo-section">
                <div class="add-form">
                    <input placeholder="Product name" [(ngModel)]="newName">
                    <input type="number" placeholder="Price" [(ngModel)]="newPrice">
                    <button (click)="addProduct()">➕ Add</button>
                </div>
                <div class="entity-view">
                    <div class="ids">
                        <h4>IDs Array</h4>
                        <pre>{{ idsJson() }}</pre>
                    </div>
                    <div class="entities">
                        <h4>Entities Map</h4>
                        <pre>{{ entitiesJson() }}</pre>
                    </div>
                </div>
                <div class="products-table">
                    <table>
                        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
                        <tbody>
                            @for (p of productList(); track p.id) {
                                <tr>
                                    <td>{{ p.id }}</td>
                                    <td>{{ p.name }}</td>
                                    <td>\${{ p.price }}</td>
                                    <td>
                                        <button class="small" (click)="updatePrice(p.id)">💰 +10</button>
                                        <button class="small danger" (click)="deleteProduct(p.id)">🗑️</button>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 900px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo-section { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .add-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .add-form input { padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 4px; }
        .add-form button { padding: 0.5rem 1rem; border: none; border-radius: 6px; background: #22c55e; color: white; cursor: pointer; }
        .entity-view { display: grid; grid-template-columns: 1fr 2fr; gap: 1rem; margin-bottom: 1rem; }
        .entity-view h4 { margin: 0 0 0.5rem; color: #1e1e2e; }
        .entity-view pre { background: #1e1e2e; color: #a6e3a1; padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; max-height: 150px; overflow: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.5rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background: #f1f5f9; color: #1e1e2e; }
        button.small { padding: 0.25rem 0.5rem; font-size: 0.75rem; border: none; border-radius: 4px; cursor: pointer; background: #6366f1; color: white; margin-right: 0.25rem; }
        button.small.danger { background: #ef4444; }
    `]
})
export class NgRxScenario2Component {
    private nextId = 4;
    newName = '';
    newPrice = 0;

    // Entity adapter pattern: separate IDs and entities
    ids = signal<number[]>([1, 2, 3]);
    entities = signal<Record<number, { id: number; name: string; price: number }>>({
        1: { id: 1, name: 'Widget', price: 29 },
        2: { id: 2, name: 'Gadget', price: 49 },
        3: { id: 3, name: 'Gizmo', price: 39 }
    });

    idsJson = computed(() => JSON.stringify(this.ids(), null, 2));
    entitiesJson = computed(() => JSON.stringify(this.entities(), null, 2));
    productList = computed(() => this.ids().map(id => this.entities()[id]));

    addProduct() {
        if (!this.newName) return;
        const id = this.nextId++;
        this.ids.update(ids => [...ids, id]);
        this.entities.update(e => ({ ...e, [id]: { id, name: this.newName, price: this.newPrice || 0 } }));
        this.newName = '';
        this.newPrice = 0;
    }

    updatePrice(id: number) {
        this.entities.update(e => ({ ...e, [id]: { ...e[id], price: e[id].price + 10 } }));
    }

    deleteProduct(id: number) {
        this.ids.update(ids => ids.filter(i => i !== id));
        this.entities.update(e => { const copy = { ...e }; delete copy[id]; return copy; });
    }
}

// ============================================
// SCENARIOS 3-5: STATIC CONTENT
// ============================================
@Component({
    selector: 'app-ngrx-scenario-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Feature State</h2>
                <p>Lazy-load feature state with provideState().</p>
            </div>
            <div class="content">
                <pre>// In feature routes
providers: [
  provideState(&#123; name: 'products', reducer: productsReducer &#125;),
  provideEffects(ProductsEffects)
]</pre>
                <p>✅ Feature state loads only when route is activated</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.85rem; }
        p { color: #374151; margin-top: 1rem; }
    `]
})
export class NgRxScenario3Component { }

@Component({
    selector: 'app-ngrx-scenario-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Router Store</h2>
                <p>Sync router state with NgRx store.</p>
            </div>
            <div class="content">
                <pre>// Setup
provideRouterStore()

// Select route params
selectRouteParams = createSelector(
  selectRouterState,
  router =&gt; router.state.params
);</pre>
                <p>✅ Access route params from anywhere via selectors</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.85rem; }
        p { color: #374151; margin-top: 1rem; }
    `]
})
export class NgRxScenario4Component { }

@Component({
    selector: 'app-ngrx-scenario-5',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: DevTools</h2>
                <p>Debug with Redux DevTools browser extension.</p>
            </div>
            <div class="content">
                <h4>🛠️ DevTools Features</h4>
                <ul>
                    <li>⏪ <strong>Time Travel</strong> - Jump to any previous state</li>
                    <li>📋 <strong>Action Log</strong> - See all dispatched actions</li>
                    <li>📊 <strong>State Tree</strong> - Explore current state</li>
                    <li>💾 <strong>Export/Import</strong> - Save and load state</li>
                </ul>
                <pre>provideStoreDevtools(&#123;
  maxAge: 25,
  logOnly: environment.production
&#125;)</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .content { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .content h4 { color: #1e1e2e; margin: 0 0 0.75rem; }
        ul { margin: 0 0 1rem; padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; color: #374151; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.85rem; }
    `]
})
export class NgRxScenario5Component { }

// ============================================
// ROUTES
// ============================================
export const NGRX_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: NgRxPracticeComponent, children: [
            { path: 'basic/exercise-1', component: NgRxExercise1Component },
            { path: 'basic/exercise-2', component: NgRxExercise2Component },
            { path: 'basic/exercise-3', component: NgRxExercise3Component },
            { path: 'basic/exercise-4', component: NgRxExercise4Component },
            { path: 'complex/scenario-1', component: NgRxScenario1Component },
            { path: 'complex/scenario-2', component: NgRxScenario2Component },
            { path: 'complex/scenario-3', component: NgRxScenario3Component },
            { path: 'complex/scenario-4', component: NgRxScenario4Component },
            { path: 'complex/scenario-5', component: NgRxScenario5Component },
        ]
    }
];
