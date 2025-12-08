/**
 * ============================================================================
 * 🟦 EXERCISE 4: ASYNC PIPE
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, interval, map, take } from 'rxjs';

@Component({
    selector: 'app-exercise-4-async',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Async Pipe</h2>
                <p>Handle observables elegantly without manual subscription.</p>
            </div>

            <div class="demo">
                <h3>🎮 Async Pipe Demo</h3>
                
                <div class="demo-grid">
                    <div class="demo-card">
                        <h4>Timer (Observable)</h4>
                        <div class="value">{{ timer$ | async }}</div>
                        <code>{{ "{{ timer$ | async }}" }}</code>
                    </div>

                    <div class="demo-card">
                        <h4>User Data (BehaviorSubject)</h4>
                        @if (user$ | async; as user) {
                            <div class="user-info">
                                <span>{{ user.name }}</span>
                                <span class="email">{{ user.email }}</span>
                            </div>
                        }
                        <button (click)="changeUser()">Switch User</button>
                    </div>

                    <div class="demo-card">
                        <h4>Loading State</h4>
                        @if (loading$ | async) {
                            <div class="loading">Loading...</div>
                        } @else {
                            <div class="loaded">Data Loaded!</div>
                        }
                        <button (click)="simulateLoad()">Reload</button>
                    </div>
                </div>

                <div class="benefits">
                    <h4>Benefits of async pipe:</h4>
                    <ul>
                        <li>✅ Auto-subscribes and unsubscribes</li>
                        <li>✅ Prevents memory leaks</li>
                        <li>✅ Triggers change detection</li>
                        <li>✅ Works with Observables and Promises</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #ecfdf5; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #10b981; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
        .demo-card { padding: 1rem; background: #f8fafc; border-radius: 8px; text-align: center; }
        .demo-card h4 { margin: 0 0 0.75rem; font-size: 0.9rem; }
        .demo-card .value { font-size: 2rem; font-weight: bold; color: #10b981; margin-bottom: 0.5rem; }
        .demo-card code { display: block; font-size: 0.75rem; color: #6b7280; }
        .demo-card button { margin-top: 0.5rem; padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .user-info { margin-bottom: 0.5rem; }
        .user-info span { display: block; }
        .email { font-size: 0.85rem; color: #6b7280; }
        .loading { color: #f59e0b; }
        .loaded { color: #10b981; }
        .benefits { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .benefits h4 { margin: 0 0 0.5rem; }
        .benefits ul { margin: 0; padding-left: 1.25rem; }
    `]
})
export class Exercise4AsyncComponent {
    timer$ = interval(1000).pipe(map(n => n + 1), take(100));

    user$ = new BehaviorSubject({ name: 'John Doe', email: 'john@example.com' });

    loading$ = new BehaviorSubject(false);

    private users = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Bob Wilson', email: 'bob@example.com' }
    ];
    private userIndex = 0;

    changeUser(): void {
        this.userIndex = (this.userIndex + 1) % this.users.length;
        this.user$.next(this.users[this.userIndex]);
    }

    simulateLoad(): void {
        this.loading$.next(true);
        setTimeout(() => this.loading$.next(false), 2000);
    }
}
