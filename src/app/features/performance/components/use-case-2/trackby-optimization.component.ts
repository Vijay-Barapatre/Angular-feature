/**
 * ============================================================================
 * USE CASE 2: TRACKBY OPTIMIZATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
    id: number;
    name: string;
    timestamp: number;
}

@Component({
    selector: 'app-trackby-optimization',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📋 TrackBy Optimization</h1>
                <p class="subtitle">Efficient List Rendering</p>
            </header>

            <section class="problem-section">
                <h2>The Problem Without TrackBy</h2>
                <div class="problem-visual">
                    <div class="before">
                        <h4>Without trackBy</h4>
                        <p>Array changes → ALL DOM elements recreated</p>
                        <div class="dom-nodes">
                            <div class="node destroy">❌ Item 1</div>
                            <div class="node destroy">❌ Item 2</div>
                            <div class="node destroy">❌ Item 3</div>
                        </div>
                        <div class="arrow">↓ Recreate all</div>
                        <div class="dom-nodes">
                            <div class="node new">✨ Item 1</div>
                            <div class="node new">✨ Item 2</div>
                            <div class="node new">✨ Item 3</div>
                        </div>
                    </div>
                    <div class="after">
                        <h4>With trackBy</h4>
                        <p>Array changes → Only changed items updated</p>
                        <div class="dom-nodes">
                            <div class="node keep">✓ Item 1</div>
                            <div class="node keep">✓ Item 2</div>
                            <div class="node new">✨ Item 3</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="demo-section">
                <h2>Live Demo ({{ items().length }} items)</h2>
                <div class="controls">
                    <button (click)="addItem()">Add Item</button>
                    <button (click)="shuffleItems()">Shuffle</button>
                    <button (click)="resetItems()">Reset</button>
                </div>
                <div class="list">
                    @for (item of items(); track item.id) {
                        <div class="list-item">
                            <span class="id">#{{ item.id }}</span>
                            <span class="name">{{ item.name }}</span>
                            <span class="timestamp">{{ item.timestamp }}</span>
                        </div>
                    }
                </div>
            </section>

            <section class="syntax-section">
                <h2>📝 Syntax Comparison</h2>
                <div class="syntax-grid">
                    <div class="syntax-card">
                        <h4>Modern &#64;for (Angular 17+)</h4>
                        <pre><code>&#64;for (item of items; track item.id) {{ '{' }}
  &lt;div&gt;{{ '{{ item.name }}' }}&lt;/div&gt;
{{ '}' }}</code></pre>
                    </div>
                    <div class="syntax-card">
                        <h4>Legacy *ngFor</h4>
                        <pre><code>&lt;div *ngFor="let item of items; 
     trackBy: trackById"&gt;
  {{ '{{ item.name }}' }}
&lt;/div&gt;

trackById(index: number, item: Item) {{ '{' }}
  return item.id;
{{ '}' }}</code></pre>
                    </div>
                </div>
            </section>

            <section class="impact-section">
                <h2>⚡ Performance Impact</h2>
                <table>
                    <tr><th>Scenario</th><th>Without TrackBy</th><th>With TrackBy</th></tr>
                    <tr><td>1000 items, add 1</td><td class="bad">1000 DOM ops</td><td class="good">1 DOM op</td></tr>
                    <tr><td>1000 items, remove 1</td><td class="bad">1000 DOM ops</td><td class="good">1 DOM op</td></tr>
                    <tr><td>1000 items, reorder</td><td class="bad">1000 DOM ops</td><td class="good">0 DOM ops*</td></tr>
                </table>
                <p class="note">*With CSS order property or move operations</p>
            </section>

            <section class="best-practices">
                <h2>✅ Best Practices</h2>
                <ul>
                    <li>Always use <code>track</code> with unique identifiers</li>
                    <li>Use <code>item.id</code> not <code>index</code> when possible</li>
                    <li>For static lists, <code>track $index</code> is acceptable</li>
                    <li>Never track by object reference (defeats purpose)</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .problem-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
        .before, .after { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; }
        .before { border-top: 4px solid #ef4444; }
        .after { border-top: 4px solid #10b981; }
        .dom-nodes { display: flex; gap: 0.5rem; margin: 0.5rem 0; }
        .node { padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem; }
        .node.destroy { background: #fee2e2; }
        .node.new { background: #dcfce7; }
        .node.keep { background: #e0e7ff; }
        .arrow { text-align: center; color: var(--text-secondary); }

        .demo-section { margin: 2rem 0; }
        .controls { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .controls button { padding: 0.5rem 1rem; border: none; border-radius: 6px; background: #667eea; color: white; cursor: pointer; }
        .list { display: flex; flex-direction: column; gap: 0.5rem; }
        .list-item { display: flex; gap: 1rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 6px; }
        .list-item .id { font-weight: bold; color: var(--primary-color); }
        .list-item .timestamp { font-size: 0.8rem; color: var(--text-secondary); margin-left: auto; }

        .syntax-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .syntax-card { background: #1e1e2e; border-radius: 10px; overflow: hidden; }
        .syntax-card h4 { margin: 0; padding: 0.75rem; background: #2d2d3f; color: white; font-size: 0.85rem; }
        .syntax-card pre { margin: 0; padding: 1rem; color: #a6e3a1; font-size: 0.8rem; }

        .impact-section table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .impact-section th, .impact-section td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .impact-section th { background: var(--bg-secondary); }
        .bad { color: #ef4444; }
        .good { color: #10b981; font-weight: bold; }
        .note { font-size: 0.8rem; color: var(--text-secondary); }

        .best-practices { background: linear-gradient(135deg, #10b98120, #14b8a620); padding: 2rem; border-radius: 12px; }
        .best-practices code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }
    `]
})
export class TrackByOptimizationComponent {
    items = signal<Item[]>([
        { id: 1, name: 'Apple', timestamp: Date.now() },
        { id: 2, name: 'Banana', timestamp: Date.now() },
        { id: 3, name: 'Cherry', timestamp: Date.now() }
    ]);

    private nextId = 4;

    addItem() {
        const newItem = { id: this.nextId++, name: `Item ${this.nextId - 1}`, timestamp: Date.now() };
        this.items.update(items => [...items, newItem]);
    }

    shuffleItems() {
        this.items.update(items => [...items].sort(() => Math.random() - 0.5));
    }

    resetItems() {
        this.nextId = 4;
        this.items.set([
            { id: 1, name: 'Apple', timestamp: Date.now() },
            { id: 2, name: 'Banana', timestamp: Date.now() },
            { id: 3, name: 'Cherry', timestamp: Date.now() }
        ]);
    }
}
