/**
 * CONTROL FLOW PRACTICE - COMPLETE SECTION
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-control-flow-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🔀 Control Flow Practice</h1>
                <p class="subtitle">Angular 17+ built-in control flow</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: &#64;if Conditional</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: &#64;for Loop</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: &#64;switch</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: &#64;empty</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Nested Control Flow</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Dynamic Lists</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Tab System</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Filtering</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Pagination</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #22c55e; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #22c55e; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(34, 197, 94, 0.1); }
        .nav-section a.active { background: #22c55e; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class ControlFlowPracticeComponent { }

// Exercises
@Component({
    selector: 'app-cf-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: &#64;if Conditional</h2>
                <p>Use &#64;if for conditional rendering.</p>
            </div>
            <div class="demo">
                <button (click)="toggle()">Toggle</button>
                @if (isVisible()) {
                    <p class="box">✅ Content is visible!</p>
                } @else {
                    <p class="box else">❌ Content is hidden</p>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0fdf4; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #22c55e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo button { padding: 0.75rem 1rem; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .box { margin-top: 1rem; padding: 1rem; background: #dcfce7; border-radius: 8px; }
        .box.else { background: #fef2f2; }
    `]
})
export class CFExercise1Component {
    isVisible = signal(true);
    toggle(): void { this.isVisible.update(v => !v); }
}

@Component({
    selector: 'app-cf-exercise-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: &#64;for Loop</h2>
                <p>Use &#64;for for list rendering.</p>
            </div>
            <div class="demo">
                <ul>
                    @for (item of items(); track item.id) {
                        <li>{{ item.name }} ({{ $index + 1 }} of {{ $count }})</li>
                    } @empty {
                        <li>No items!</li>
                    }
                </ul>
                <button (click)="addItem()">Add Item</button>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0fdf4; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #22c55e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        ul { list-style: none; padding: 0; margin: 0 0 1rem; }
        li { padding: 0.75rem; background: #f0fdf4; margin-bottom: 0.5rem; border-radius: 6px; }
        .demo button { padding: 0.75rem 1rem; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; }
    `]
})
export class CFExercise2Component {
    items = signal([
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' }
    ]);
    addItem(): void {
        const id = Date.now();
        this.items.update(items => [...items, { id, name: `Item ${id}` }]);
    }
}

@Component({
    selector: 'app-cf-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: &#64;switch</h2>
                <p>Use &#64;switch for multiple conditions.</p>
            </div>
            <div class="demo">
                <pre>&#64;switch (status) &#123;
  &#64;case ('loading') &#123; &lt;spinner /&gt; &#125;
  &#64;case ('error') &#123; &lt;error /&gt; &#125;
  &#64;default &#123; &lt;content /&gt; &#125;
&#125;</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0fdf4; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #22c55e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class CFExercise3Component { }

@Component({
    selector: 'app-cf-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: &#64;empty</h2>
                <p>Handle empty collections.</p>
            </div>
            <div class="demo">
                <pre>&#64;for (item of items; track item) &#123;
  item content here
&#125; &#64;empty &#123;
  &lt;p&gt;No items found&lt;/p&gt;
&#125;</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0fdf4; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #22c55e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class CFExercise4Component { }

// Complex Scenarios
@Component({
    selector: 'app-cf-scenario-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Nested Control Flow</h2>
                <p>Combine &#64;if and &#64;for.</p>
            </div>
            <div class="content">
                <p>Conditional lists with filtering.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CFScenario1Component { }

@Component({
    selector: 'app-cf-scenario-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Dynamic Lists</h2>
                <p>Add/remove items dynamically.</p>
            </div>
            <div class="content">
                <p>CRUD operations with lists.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CFScenario2Component { }

@Component({
    selector: 'app-cf-scenario-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Tab System</h2>
                <p>Build tabs with &#64;switch.</p>
            </div>
            <div class="content">
                <p>Active tab switching.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CFScenario3Component { }

@Component({
    selector: 'app-cf-scenario-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Filtering</h2>
                <p>Filter and display results.</p>
            </div>
            <div class="content">
                <p>Search with &#64;if and &#64;for.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CFScenario4Component { }

@Component({
    selector: 'app-cf-scenario-5',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Pagination</h2>
                <p>Paginated list display.</p>
            </div>
            <div class="content">
                <p>Page navigation with control flow.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CFScenario5Component { }

export const CONTROL_FLOW_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: ControlFlowPracticeComponent, children: [
            { path: 'basic/exercise-1', component: CFExercise1Component },
            { path: 'basic/exercise-2', component: CFExercise2Component },
            { path: 'basic/exercise-3', component: CFExercise3Component },
            { path: 'basic/exercise-4', component: CFExercise4Component },
            { path: 'complex/scenario-1', component: CFScenario1Component },
            { path: 'complex/scenario-2', component: CFScenario2Component },
            { path: 'complex/scenario-3', component: CFScenario3Component },
            { path: 'complex/scenario-4', component: CFScenario4Component },
            { path: 'complex/scenario-5', component: CFScenario5Component },
        ]
    }
];
