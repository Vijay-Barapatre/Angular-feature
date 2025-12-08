/**
 * ============================================================================
 * 🟦 EXERCISE 1: ONINIT / ONDESTROY
 * ============================================================================
 */

import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-child-lifecycle',
    standalone: true,
    template: `
        <div class="child-box">
            <h4>Child Component</h4>
            <p>Created at: {{ createdAt }}</p>
            <p>Time alive: {{ timeAlive() }}s</p>
        </div>
    `,
    styles: [`
        .child-box { padding: 1rem; background: #ecfeff; border: 2px solid #06b6d4; border-radius: 8px; }
        .child-box h4 { margin: 0 0 0.5rem; color: #06b6d4; }
    `]
})
export class ChildLifecycleComponent implements OnInit, OnDestroy {
    createdAt = '';
    timeAlive = signal(0);
    private intervalId?: ReturnType<typeof setInterval>;

    ngOnInit(): void {
        console.log('🟢 ChildComponent: ngOnInit called');
        this.createdAt = new Date().toLocaleTimeString();

        // Start timer to track time alive
        this.intervalId = setInterval(() => {
            this.timeAlive.update(t => t + 1);
        }, 1000);
    }

    ngOnDestroy(): void {
        console.log('🔴 ChildComponent: ngOnDestroy called');

        // CRITICAL: Clean up the interval!
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

@Component({
    selector: 'app-exercise-1-init-destroy',
    standalone: true,
    imports: [CommonModule, ChildLifecycleComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: OnInit / OnDestroy</h2>
                <p>Understand component initialization and cleanup lifecycle.</p>
                <ul>
                    <li><code>ngOnInit</code> - Called once after first ngOnChanges</li>
                    <li><code>ngOnDestroy</code> - Called just before component is destroyed</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 Demo</h3>
                
                <div class="controls">
                    <button (click)="toggleChild()" [class.destroy]="showChild()">
                        {{ showChild() ? '🗑️ Destroy' : '➕ Create' }} Child
                    </button>
                    <span class="hint">Watch the console for lifecycle logs!</span>
                </div>

                <div class="child-container">
                    @if (showChild()) {
                        <app-child-lifecycle />
                    } @else {
                        <div class="placeholder">Child component destroyed</div>
                    }
                </div>

                <div class="lifecycle-log">
                    <h4>Lifecycle Order:</h4>
                    <ol>
                        <li>constructor()</li>
                        <li>ngOnChanges() - if inputs exist</li>
                        <li>ngOnInit() ✅</li>
                        <li>ngDoCheck()</li>
                        <li>ngAfterContentInit()</li>
                        <li>ngAfterContentChecked()</li>
                        <li>ngAfterViewInit()</li>
                        <li>ngAfterViewChecked()</li>
                        <li>ngOnDestroy() ✅</li>
                    </ol>
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
        .controls { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .controls button { padding: 0.75rem 1.5rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
        .controls button.destroy { background: #ef4444; }
        .hint { font-size: 0.85rem; color: #6b7280; }
        .child-container { min-height: 100px; margin-bottom: 1rem; }
        .placeholder { padding: 2rem; background: #f8fafc; border-radius: 8px; text-align: center; color: #6b7280; border: 2px dashed #e5e7eb; }
        .lifecycle-log { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .lifecycle-log h4 { margin: 0 0 0.5rem; }
        .lifecycle-log ol { margin: 0; padding-left: 1.5rem; }
        .lifecycle-log li { margin-bottom: 0.25rem; }
    `]
})
export class Exercise1InitDestroyComponent {
    showChild = signal(true);

    toggleChild(): void {
        this.showChild.update(v => !v);
    }
}
