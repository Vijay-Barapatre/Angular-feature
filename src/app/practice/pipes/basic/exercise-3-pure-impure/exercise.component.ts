/**
 * ============================================================================
 * 🟦 EXERCISE 3: PURE VS IMPURE
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'pureFilter', standalone: true, pure: true })
export class PureFilterPipe implements PipeTransform {
    private callCount = 0;
    transform(items: string[], filter: string): string[] {
        this.callCount++;
        console.log('Pure pipe called:', this.callCount);
        return filter ? items.filter(i => i.toLowerCase().includes(filter.toLowerCase())) : items;
    }
}

@Pipe({ name: 'impureFilter', standalone: true, pure: false })
export class ImpureFilterPipe implements PipeTransform {
    private callCount = 0;
    transform(items: string[], filter: string): string[] {
        this.callCount++;
        console.log('Impure pipe called:', this.callCount);
        return filter ? items.filter(i => i.toLowerCase().includes(filter.toLowerCase())) : items;
    }
}

@Component({
    selector: 'app-exercise-3-pure-impure',
    standalone: true,
    imports: [CommonModule, PureFilterPipe, ImpureFilterPipe],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Pure vs Impure Pipes</h2>
                <p>Understand when pipes recalculate and performance implications.</p>
            </div>

            <div class="demo">
                <h3>🎮 Comparison Demo</h3>
                
                <div class="controls">
                    <input type="text" [value]="filter()" 
                        (input)="filter.set($any($event.target).value)"
                        placeholder="Filter items...">
                    <button (click)="addItem()">Add Random Item</button>
                    <button (click)="triggerCD()">Trigger CD ({{ counter }})</button>
                </div>

                <div class="comparison">
                    <div class="pure-side">
                        <h4>Pure Pipe (pure: true)</h4>
                        <p class="hint">Check console for call count</p>
                        <ul>
                            @for (item of items() | pureFilter:filter(); track item) {
                                <li>{{ item }}</li>
                            }
                        </ul>
                    </div>
                    <div class="impure-side">
                        <h4>Impure Pipe (pure: false)</h4>
                        <p class="hint warning">Check console - many more calls!</p>
                        <ul>
                            @for (item of items() | impureFilter:filter(); track item) {
                                <li>{{ item }}</li>
                            }
                        </ul>
                    </div>
                </div>

                <div class="info-box">
                    <p><strong>Pure:</strong> Only runs when input reference changes</p>
                    <p><strong>Impure:</strong> Runs on every change detection cycle</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #10b981; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .controls input { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .controls button { padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .pure-side, .impure-side { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .pure-side h4, .impure-side h4 { margin: 0 0 0.5rem; }
        .hint { margin: 0 0 0.5rem; font-size: 0.85rem; color: #10b981; }
        .hint.warning { color: #f59e0b; }
        ul { margin: 0; padding-left: 1.25rem; }
        .info-box { padding: 1rem; background: #eff6ff; border-radius: 8px; }
        .info-box p { margin: 0.25rem 0; font-size: 0.9rem; }
    `]
})
export class Exercise3PureImpureComponent {
    items = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
    filter = signal('');
    counter = 0;

    addItem(): void {
        const fruits = ['Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];
        const newItem = fruits[Math.floor(Math.random() * fruits.length)];
        this.items.update(items => [...items, newItem]);
    }

    triggerCD(): void {
        this.counter++;
    }
}
