/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: EFFECTS
 * ============================================================================
 */

import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exercise-3-effects',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Effects</h2>
                <p>React to signal changes with effects.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Create an effect that logs search term changes</li>
                    <li>Create an effect that saves to localStorage</li>
                    <li>See effects auto-run when signals change</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🔍 Search with Effects</h3>
                
                <div class="form-row">
                    <input 
                        [value]="searchTerm()" 
                        (input)="searchTerm.set($any($event.target).value)"
                        placeholder="Type to search...">
                </div>

                <div class="effect-log">
                    <h4>📋 Effect Log (check console too)</h4>
                    <div class="log-entries">
                        @for (entry of logEntries(); track entry) {
                            <div class="log-entry">{{ entry }}</div>
                        }
                    </div>
                </div>

                <hr>

                <h3>💾 Persistent Counter</h3>
                <p class="note">This counter saves to localStorage via effect</p>
                
                <div class="counter">
                    <button (click)="decrement()">−</button>
                    <span>{{ persistentCount() }}</span>
                    <button (click)="increment()">+</button>
                </div>
                
                <p class="hint">Refresh the page - the count persists!</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-row input { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 1rem; }
        .effect-log { margin-top: 1rem; padding: 1rem; background: #1e1e2e; border-radius: 8px; color: #a6e3a1; }
        .effect-log h4 { margin: 0 0 0.5rem; color: white; }
        .log-entries { max-height: 150px; overflow-y: auto; }
        .log-entry { padding: 0.25rem 0; font-family: monospace; font-size: 0.85rem; }
        hr { margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb; }
        .counter { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1rem 0; }
        .counter button { width: 50px; height: 50px; border: none; border-radius: 8px; font-size: 1.5rem; background: #8b5cf6; color: white; cursor: pointer; }
        .counter span { font-size: 2rem; font-weight: bold; min-width: 80px; text-align: center; }
        .note { color: #6b7280; font-size: 0.9rem; }
        .hint { color: #10b981; font-size: 0.85rem; text-align: center; }
    `]
})
export class Exercise3EffectsComponent {
    searchTerm = signal('');
    logEntries = signal<string[]>([]);

    // Load from localStorage or default to 0
    persistentCount = signal(
        parseInt(localStorage.getItem('practiceCount') || '0', 10)
    );

    constructor() {
        /**
         * TODO: Create effect that logs search term changes
         * 
         * HINT:
         * effect(() => {
         *     const term = this.searchTerm();
         *     console.log('Search term changed:', term);
         * });
         */
        effect(() => {
            const term = this.searchTerm();
            if (term) {
                const entry = `[${new Date().toLocaleTimeString()}] Searched: "${term}"`;
                console.log(entry);
                this.logEntries.update(entries => [entry, ...entries].slice(0, 10));
            }
        });

        /**
         * TODO: Create effect that saves count to localStorage
         * 
         * HINT:
         * effect(() => {
         *     localStorage.setItem('practiceCount', this.persistentCount().toString());
         * });
         */
        effect(() => {
            const count = this.persistentCount();
            localStorage.setItem('practiceCount', count.toString());
            console.log('Saved to localStorage:', count);
        });
    }

    increment(): void {
        this.persistentCount.update(v => v + 1);
    }

    decrement(): void {
        this.persistentCount.update(v => v - 1);
    }
}
