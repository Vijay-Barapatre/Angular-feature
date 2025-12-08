/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2-5: ADDITIONAL COMPLEX SCENARIOS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Scenario 2: Lazy Detection
@Component({
    selector: 'app-scenario-2-lazy',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Change Detection Timing</h2>
                <p>Understanding when lifecycle hooks fire during change detection.</p>
            </div>
            <div class="content">
                <div class="demo-box">
                    <p>Counter: {{ counter() }}</p>
                    <button (click)="increment()">Increment</button>
                </div>
                <div class="info">
                    <h4>Lifecycle during CD:</h4>
                    <ol>
                        <li>ngDoCheck - Every CD cycle</li>
                        <li>ngAfterContentChecked - After content check</li>
                        <li>ngAfterViewChecked - After view check</li>
                    </ol>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo-box { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .demo-box button { margin-top: 0.5rem; padding: 0.5rem 1rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .info { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .info h4 { margin: 0 0 0.5rem; }
        .info ol { margin: 0; padding-left: 1.5rem; }
    `]
})
export class Scenario2LazyComponent {
    counter = signal(0);
    increment(): void { this.counter.update(n => n + 1); }
}

// Scenario 3: Dynamic Form
@Component({
    selector: 'app-scenario-3-form',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Dynamic Form Lifecycle</h2>
                <p>Managing form component lifecycle with dynamic fields.</p>
            </div>
            <div class="content">
                <p>Dynamic form fields are added/removed, each with own lifecycle.</p>
                <button (click)="addField()">Add Field</button>
                <div class="fields">
                    @for (field of fields(); track field.id) {
                        <input [placeholder]="'Field ' + field.id">
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .content button { padding: 0.5rem 1rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 1rem; }
        .fields { display: flex; flex-direction: column; gap: 0.5rem; }
        .fields input { padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; }
    `]
})
export class Scenario3FormComponent {
    fields = signal<{ id: number }[]>([]);
    private nextId = 1;
    addField(): void {
        this.fields.update(f => [...f, { id: this.nextId++ }]);
    }
}

// Scenario 4: Animation Hooks
@Component({
    selector: 'app-scenario-4-animation',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Animation with Lifecycle</h2>
                <p>Coordinating animations with component lifecycle.</p>
            </div>
            <div class="content">
                <button (click)="toggle()">Toggle Box</button>
                @if (show()) {
                    <div class="animated-box">I fade in/out!</div>
                }
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .content button { padding: 0.5rem 1rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 1rem; }
        .animated-box { padding: 2rem; background: #06b6d4; color: white; border-radius: 8px; text-align: center; animation: fadeIn 0.3s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
    `]
})
export class Scenario4AnimationComponent {
    show = signal(true);
    toggle(): void { this.show.update(v => !v); }
}

// Scenario 5: Performance
@Component({
    selector: 'app-scenario-5-performance',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Lifecycle Performance</h2>
                <p>Monitoring and optimizing lifecycle hook execution.</p>
            </div>
            <div class="content">
                <div class="perf-tips">
                    <h4>Performance Tips:</h4>
                    <ul>
                        <li>Keep ngDoCheck lightweight</li>
                        <li>Use OnPush change detection</li>
                        <li>Avoid heavy operations in ngAfterViewChecked</li>
                        <li>Clean up in ngOnDestroy</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .perf-tips { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .perf-tips h4 { margin: 0 0 0.5rem; }
        .perf-tips ul { margin: 0; padding-left: 1.5rem; }
    `]
})
export class Scenario5PerformanceComponent { }
