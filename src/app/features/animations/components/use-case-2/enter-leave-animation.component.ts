/**
 * ANIMATIONS FEATURE - Use Case 2: Enter/Leave Animations
 * 
 * Core concepts: :enter, :leave, void => *, * => void
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    trigger,
    transition,
    style,
    animate,
    query,
    stagger
} from '@angular/animations';

@Component({
    selector: 'app-enter-leave-animation',
    standalone: true,
    imports: [CommonModule],
    animations: [
        // 🎯 Fade Enter/Leave
        trigger('fadeEnterLeave', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ opacity: 0 }))
            ])
        ]),

        // 🎯 Slide from left
        trigger('slideInLeft', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('400ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
            ])
        ]),

        // 🎯 Slide from right
        trigger('slideInRight', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('400ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
            ])
        ]),

        // 🎯 Scale up
        trigger('scaleIn', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),
                animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    style({ transform: 'scale(1)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-in',
                    style({ transform: 'scale(0.5)', opacity: 0 }))
            ])
        ]),

        // 🎯 Slide from bottom
        trigger('slideUp', [
            transition(':enter', [
                style({ transform: 'translateY(50px)', opacity: 0 }),
                animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ transform: 'translateY(50px)', opacity: 0 }))
            ])
        ]),

        // 🎯 List stagger animation
        trigger('listAnimation', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateY(-20px)' }),
                    stagger('100ms', [
                        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ])
    ],
    template: `
        <div class="demo-container">
            <h2>🚪 Use Case 2: Enter/Leave Animations</h2>
            
            <!-- Demo 1: Fade -->
            <section class="demo-section">
                <h3>1️⃣ Fade Enter/Leave</h3>
                <button class="btn" (click)="toggleFade()">Toggle Fade</button>
                @if (showFade()) {
                    <div class="box purple" @fadeEnterLeave>Fade Animation</div>
                }
            </section>

            <!-- Demo 2: Slide Left -->
            <section class="demo-section">
                <h3>2️⃣ Slide from Left</h3>
                <button class="btn" (click)="toggleSlideLeft()">Toggle Slide Left</button>
                @if (showSlideLeft()) {
                    <div class="box blue" @slideInLeft>Slide from Left</div>
                }
            </section>

            <!-- Demo 3: Slide Right -->
            <section class="demo-section">
                <h3>3️⃣ Slide from Right</h3>
                <button class="btn" (click)="toggleSlideRight()">Toggle Slide Right</button>
                @if (showSlideRight()) {
                    <div class="box green" @slideInRight>Slide from Right</div>
                }
            </section>

            <!-- Demo 4: Scale -->
            <section class="demo-section">
                <h3>4️⃣ Scale In/Out</h3>
                <button class="btn" (click)="toggleScale()">Toggle Scale</button>
                @if (showScale()) {
                    <div class="box orange" @scaleIn>Scale Animation</div>
                }
            </section>

            <!-- Demo 5: Slide Up -->
            <section class="demo-section">
                <h3>5️⃣ Slide Up</h3>
                <button class="btn" (click)="toggleSlideUp()">Toggle Slide Up</button>
                @if (showSlideUp()) {
                    <div class="box pink" @slideUp>Slide from Bottom</div>
                }
            </section>

            <!-- Demo 6: List with Stagger -->
            <section class="demo-section">
                <h3>6️⃣ List with Stagger</h3>
                <button class="btn" (click)="addItem()">Add Item</button>
                <button class="btn secondary" (click)="clearItems()">Clear All</button>
                <div class="list" [@listAnimation]="items().length">
                    @for (item of items(); track item.id) {
                        <div class="list-item" @fadeEnterLeave>
                            {{ item.name }}
                            <button class="remove-btn" (click)="removeItem(item.id)">×</button>
                        </div>
                    }
                </div>
            </section>

            <!-- Code Example -->
            <section class="code-section">
                <h3>📝 Key Code</h3>
                <pre><code>// Enter animation (:enter = void => *)
transition(':enter', [
  style(&#123; opacity: 0, transform: 'translateY(-20px)' &#125;),
  animate('300ms ease-out', style(&#123; opacity: 1, transform: 'translateY(0)' &#125;))
])

// Leave animation (:leave = * => void)
transition(':leave', [
  animate('300ms ease-in', style(&#123; opacity: 0 &#125;))
])</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h2 {
            color: #a855f7;
            margin-bottom: 2rem;
        }
        
        .demo-section {
            background: var(--bg-secondary, #1e1e2e);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            overflow: hidden;
        }
        
        h3 {
            margin: 0 0 1rem;
            color: #f5f5f5;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            background: linear-gradient(135deg, #a855f7, #6366f1);
            color: white;
            margin-right: 0.5rem;
            transition: all 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
        }
        
        .btn.secondary {
            background: #374151;
        }
        
        .box {
            margin-top: 1rem;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            font-weight: 600;
            color: white;
        }
        
        .box.purple { background: linear-gradient(135deg, #a855f7, #6366f1); }
        .box.blue { background: linear-gradient(135deg, #3b82f6, #06b6d4); }
        .box.green { background: linear-gradient(135deg, #22c55e, #14b8a6); }
        .box.orange { background: linear-gradient(135deg, #f97316, #eab308); }
        .box.pink { background: linear-gradient(135deg, #ec4899, #f43f5e); }
        
        .list {
            margin-top: 1rem;
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
            line-height: 1;
        }
        
        .remove-btn:hover {
            background: rgba(255,255,255,0.3);
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
export class EnterLeaveAnimationComponent {
    showFade = signal(true);
    showSlideLeft = signal(true);
    showSlideRight = signal(true);
    showScale = signal(true);
    showSlideUp = signal(true);

    items = signal([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ]);

    toggleFade(): void { this.showFade.update(v => !v); }
    toggleSlideLeft(): void { this.showSlideLeft.update(v => !v); }
    toggleSlideRight(): void { this.showSlideRight.update(v => !v); }
    toggleScale(): void { this.showScale.update(v => !v); }
    toggleSlideUp(): void { this.showSlideUp.update(v => !v); }

    addItem(): void {
        const id = Date.now();
        this.items.update(items => [...items, { id, name: `Item ${items.length + 1}` }]);
    }

    removeItem(id: number): void {
        this.items.update(items => items.filter(item => item.id !== id));
    }

    clearItems(): void {
        this.items.set([]);
    }
}
