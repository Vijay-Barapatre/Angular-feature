/**
 * ANIMATIONS FEATURE - Use Case 4: Query & Stagger Animations
 * 
 * Core concepts: query, stagger, animateChild, group
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    trigger,
    transition,
    style,
    animate,
    query,
    stagger,
    group
} from '@angular/animations';

@Component({
    selector: 'app-query-stagger-animation',
    standalone: true,
    imports: [CommonModule],
    animations: [
        // 🎯 List stagger - items appear one by one
        trigger('listStagger', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateX(-50px)' }),
                    stagger('80ms', [
                        animate('400ms ease-out',
                            style({ opacity: 1, transform: 'translateX(0)' }))
                    ])
                ], { optional: true }),
                query(':leave', [
                    stagger('50ms', [
                        animate('300ms ease-in',
                            style({ opacity: 0, transform: 'translateX(50px)' }))
                    ])
                ], { optional: true })
            ])
        ]),

        // 🎯 Grid stagger - cards appear in grid pattern
        trigger('gridStagger', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'scale(0.8)' }),
                    stagger('100ms', [
                        animate('300ms ease-out',
                            style({ opacity: 1, transform: 'scale(1)' }))
                    ])
                ], { optional: true })
            ])
        ]),

        // 🎯 Query specific children
        trigger('filterAnimation', [
            transition('* => *', [
                // Animate all items with class 'card'
                query('.card:enter', [
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger('50ms', [
                        animate('300ms ease-out',
                            style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true }),
                query('.card:leave', [
                    animate('200ms ease-in',
                        style({ opacity: 0, transform: 'scale(0.8)' }))
                ], { optional: true })
            ])
        ]),

        // 🎯 Group - parallel animations
        trigger('groupAnimation', [
            transition(':enter', [
                group([
                    style({ opacity: 0, transform: 'translateY(-50px)' }),
                    animate('400ms ease-out', style({ opacity: 1 })),
                    animate('600ms ease-out', style({ transform: 'translateY(0)' }))
                ])
            ])
        ])
    ],
    template: `
        <div class="demo-container">
            <h2>🎭 Use Case 4: Query & Stagger</h2>
            <p class="subtitle">Animate multiple children with controlled timing</p>
            
            <!-- Demo 1: List Stagger -->
            <section class="demo-section">
                <h3>1️⃣ List Stagger</h3>
                <div class="controls">
                    <button class="btn" (click)="addListItem()">Add Item</button>
                    <button class="btn secondary" (click)="removeLastItem()">Remove Last</button>
                    <button class="btn secondary" (click)="resetList()">Reset</button>
                </div>
                <div class="list" [@listStagger]="listItems().length">
                    @for (item of listItems(); track item.id) {
                        <div class="list-item">
                            <span>{{ item.name }}</span>
                            <button class="remove-btn" (click)="removeListItem(item.id)">×</button>
                        </div>
                    }
                </div>
            </section>

            <!-- Demo 2: Grid Stagger -->
            <section class="demo-section">
                <h3>2️⃣ Grid Stagger</h3>
                <div class="controls">
                    <button class="btn" (click)="toggleGrid()">
                        {{ showGrid() ? 'Hide' : 'Show' }} Grid
                    </button>
                </div>
                @if (showGrid()) {
                    <div class="grid" [@gridStagger]="gridItems().length">
                        @for (item of gridItems(); track item.id) {
                            <div class="grid-card">{{ item.name }}</div>
                        }
                    </div>
                }
            </section>

            <!-- Demo 3: Filter Animation -->
            <section class="demo-section">
                <h3>3️⃣ Filter Animation</h3>
                <div class="controls">
                    <button class="btn" [class.active]="filter() === 'all'" 
                            (click)="filter.set('all')">All</button>
                    <button class="btn" [class.active]="filter() === 'active'" 
                            (click)="filter.set('active')">Active</button>
                    <button class="btn" [class.active]="filter() === 'completed'" 
                            (click)="filter.set('completed')">Completed</button>
                </div>
                <div class="card-container" [@filterAnimation]="filteredTasks().length">
                    @for (task of filteredTasks(); track task.id) {
                        <div class="card" [class.completed]="task.completed">
                            {{ task.name }}
                        </div>
                    }
                </div>
            </section>

            <!-- Code Example -->
            <section class="code-section">
                <h3>📝 Key Code</h3>
                <pre><code>trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style(&#123; opacity: 0 &#125;),
      stagger('80ms', [
        animate('400ms', style(&#123; opacity: 1 &#125;))
      ])
    ], &#123; optional: true &#125;)
  ])
])</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h2 { color: #a855f7; margin-bottom: 0.5rem; }
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
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            background: linear-gradient(135deg, #a855f7, #6366f1);
            color: white;
            transition: all 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
        }
        
        .btn.secondary {
            background: #374151;
        }
        
        .btn.active {
            background: #22c55e;
        }
        
        .list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .list-item {
            padding: 1rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 8px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .remove-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
        }
        
        .grid-card {
            padding: 2rem 1rem;
            background: linear-gradient(135deg, #22c55e, #14b8a6);
            border-radius: 12px;
            color: white;
            text-align: center;
            font-weight: 600;
        }
        
        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .card {
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #3b82f6, #06b6d4);
            border-radius: 8px;
            color: white;
            font-weight: 600;
        }
        
        .card.completed {
            background: linear-gradient(135deg, #22c55e, #14b8a6);
            text-decoration: line-through;
            opacity: 0.8;
        }
        
        .code-section {
            background: #0d0d0d;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #333;
        }
        
        pre {
            background: #1a1a2e;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 0;
        }
        
        code {
            color: #a6e3a1;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
        }
    `]
})
export class QueryStaggerAnimationComponent {
    // List stagger demo
    listItems = signal([
        { id: 1, name: 'First Item' },
        { id: 2, name: 'Second Item' },
        { id: 3, name: 'Third Item' }
    ]);

    // Grid stagger demo
    showGrid = signal(true);
    gridItems = signal([
        { id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' },
        { id: 4, name: 'D' }, { id: 5, name: 'E' }, { id: 6, name: 'F' }
    ]);

    // Filter demo
    filter = signal<'all' | 'active' | 'completed'>('all');
    tasks = signal([
        { id: 1, name: 'Task 1', completed: false },
        { id: 2, name: 'Task 2', completed: true },
        { id: 3, name: 'Task 3', completed: false },
        { id: 4, name: 'Task 4', completed: true },
        { id: 5, name: 'Task 5', completed: false }
    ]);

    filteredTasks = () => {
        const f = this.filter();
        const t = this.tasks();
        if (f === 'all') return t;
        if (f === 'active') return t.filter(task => !task.completed);
        return t.filter(task => task.completed);
    };

    addListItem(): void {
        const id = Date.now();
        this.listItems.update(items => [...items, { id, name: `Item ${items.length + 1}` }]);
    }

    removeListItem(id: number): void {
        this.listItems.update(items => items.filter(item => item.id !== id));
    }

    removeLastItem(): void {
        this.listItems.update(items => items.slice(0, -1));
    }

    resetList(): void {
        this.listItems.set([
            { id: 1, name: 'First Item' },
            { id: 2, name: 'Second Item' },
            { id: 3, name: 'Third Item' }
        ]);
    }

    toggleGrid(): void {
        this.showGrid.update(v => !v);
    }
}
