/**
 * ============================================================================
 * 🟦 EXERCISE 2: ONCHANGES
 * ============================================================================
 */

import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-changes-child',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="child-box">
            <h4>Child Receives: "{{ message }}"</h4>
            <div class="changes-log">
                <h5>Changes History:</h5>
                @for (change of changes(); track $index) {
                    <div class="change-entry">
                        <span class="old">{{ change.previous }}</span>
                        <span class="arrow">→</span>
                        <span class="new">{{ change.current }}</span>
                        <span class="first">{{ change.first ? '(first)' : '' }}</span>
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .child-box { padding: 1rem; background: #ecfeff; border: 2px solid #06b6d4; border-radius: 8px; }
        .child-box h4 { margin: 0 0 0.75rem; color: #06b6d4; }
        .changes-log h5 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .change-entry { display: flex; gap: 0.5rem; align-items: center; padding: 0.25rem 0; font-size: 0.85rem; }
        .old { color: #ef4444; text-decoration: line-through; }
        .arrow { color: #6b7280; }
        .new { color: #10b981; font-weight: 500; }
        .first { color: #f59e0b; font-size: 0.75rem; }
    `]
})
export class ChangesChildComponent implements OnChanges {
    @Input() message = '';

    changes = signal<{ previous: string; current: string; first: boolean }[]>([]);

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges called:', changes);

        if (changes['message']) {
            const change = changes['message'];
            this.changes.update(list => [...list, {
                previous: change.previousValue ?? 'undefined',
                current: change.currentValue,
                first: change.firstChange
            }].slice(-5));
        }
    }
}

@Component({
    selector: 'app-exercise-2-onchanges',
    standalone: true,
    imports: [CommonModule, FormsModule, ChangesChildComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: OnChanges</h2>
                <p>React to input property changes with SimpleChanges.</p>
                <ul>
                    <li><code>ngOnChanges(changes: SimpleChanges)</code></li>
                    <li>Access <code>previousValue</code>, <code>currentValue</code>, <code>firstChange</code></li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="parent-controls">
                    <label>Parent Message:</label>
                    <input type="text" [(ngModel)]="parentMessage" placeholder="Type a message...">
                    <div class="quick-buttons">
                        <button (click)="parentMessage = 'Hello'">Hello</button>
                        <button (click)="parentMessage = 'World'">World</button>
                        <button (click)="parentMessage = 'Angular'">Angular</button>
                    </div>
                </div>

                <app-changes-child [message]="parentMessage" />

                <div class="code-preview">
                    <pre><code>ngOnChanges(changes: SimpleChanges) {{ '{' }}
  if (changes['message']) {{ '{' }}
    const {{ '{' }} previousValue, currentValue, firstChange {{ '}' }} = changes['message'];
    console.log(\`Changed from \${{ '{' }}previousValue{{ '}' }} to \${{ '{' }}currentValue{{ '}' }}\`);
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #ecfeff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #06b6d4; }
        .instructions code { background: #cffafe; padding: 0.125rem 0.375rem; border-radius: 4px; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .parent-controls { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .parent-controls label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .parent-controls input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.75rem; }
        .quick-buttons { display: flex; gap: 0.5rem; }
        .quick-buttons button { padding: 0.5rem 1rem; background: #06b6d4; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .code-preview { margin-top: 1rem; padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise2OnChangesComponent {
    parentMessage = 'Initial Value';
}
