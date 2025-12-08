/**
 * VIEWCHILD/CONTENTCHILD PRACTICE - COMPLETE SECTION
 */
import { Component, ViewChild, ContentChild, ElementRef, AfterViewInit, AfterContentInit, signal, QueryList, ViewChildren, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

// ============================================================================
// OVERVIEW COMPONENT
// ============================================================================
@Component({
    selector: 'app-viewchild-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🔍 ViewChild/ContentChild Practice</h1>
                <p class="subtitle">Query and access child elements and components</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: ViewChild Element</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: ViewChild Component</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: ContentChild</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: QueryList</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Form Focus</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Animation Control</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Dynamic Tabs</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Scroll Control</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Chart Integration</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #8b5cf6; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #8b5cf6; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(139, 92, 246, 0.1); }
        .nav-section a.active { background: #8b5cf6; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class ViewChildPracticeComponent { }

// ============================================================================
// BASIC EXERCISES
// ============================================================================
@Component({
    selector: 'app-vc-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: ViewChild Element</h2>
                <p>Access DOM elements with ViewChild and template reference.</p>
            </div>
            <div class="demo">
                <input #inputRef placeholder="Focus me!">
                <button (click)="focusInput()">Focus Input</button>
                <p>Input value: {{ inputValue() }}</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f5f3ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo input { padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; margin-right: 0.5rem; }
        .demo button { padding: 0.75rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }
    `]
})
export class VCExercise1Component implements AfterViewInit {
    @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
    inputValue = signal('');

    ngAfterViewInit(): void {
        this.inputRef.nativeElement.addEventListener('input', (e) => {
            this.inputValue.set((e.target as HTMLInputElement).value);
        });
    }

    focusInput(): void {
        this.inputRef.nativeElement.focus();
    }
}

@Component({ selector: 'app-child-comp', standalone: true, template: `<p>Child: {{ message }}</p>`, styles: [`p { padding: 1rem; background: #f5f3ff; border-radius: 6px; }`] })
export class ChildCompComponent { message = 'Hello from child!'; greet(): string { return 'Greetings!'; } }

@Component({
    selector: 'app-vc-exercise-2',
    standalone: true,
    imports: [CommonModule, ChildCompComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: ViewChild Component</h2>
                <p>Access child component instance and call its methods.</p>
            </div>
            <div class="demo">
                <app-child-comp />
                <button (click)="callChildMethod()">Call Child Method</button>
                <p *ngIf="result()">Result: {{ result() }}</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f5f3ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo button { padding: 0.75rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 0.5rem; }
    `]
})
export class VCExercise2Component {
    @ViewChild(ChildCompComponent) childComp!: ChildCompComponent;
    result = signal('');
    callChildMethod(): void { this.result.set(this.childComp.greet()); }
}

@Component({
    selector: 'app-vc-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: ContentChild</h2>
                <p>Access projected content using ContentChild.</p>
            </div>
            <div class="demo"><p>ContentChild queries projected content (ng-content).</p></div>
        </div>
    `,
    styles: [`.exercise { max-width: 800px; } .instructions { background: #f5f3ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`]
})
export class VCExercise3Component { }

@Component({
    selector: 'app-vc-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: QueryList</h2>
                <p>Query multiple elements/components with ViewChildren.</p>
            </div>
            <div class="demo">
                <div #item>Item 1</div>
                <div #item>Item 2</div>
                <div #item>Item 3</div>
                <p>Items count: {{ itemCount() }}</p>
            </div>
        </div>
    `,
    styles: [`.exercise { max-width: 800px; } .instructions { background: #f5f3ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } .demo div { padding: 0.5rem; background: #f5f3ff; margin-bottom: 0.5rem; border-radius: 4px; }`]
})
export class VCExercise4Component implements AfterViewInit {
    @ViewChildren('item') items!: QueryList<ElementRef>;
    itemCount = signal(0);
    ngAfterViewInit(): void { this.itemCount.set(this.items.length); }
}

// Complex Scenarios (simplified)
@Component({ selector: 'app-vc-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: Form Focus</h2><p>Auto-focus form fields on validation errors.</p></div><div class="content"><p>Focus first invalid input on form submit.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class VCScenario1Component { }

@Component({ selector: 'app-vc-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Animation Control</h2><p>Control child animations programmatically.</p></div><div class="content"><p>Play/pause/reverse animations via ViewChild.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class VCScenario2Component { }

@Component({ selector: 'app-vc-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Dynamic Tabs</h2><p>Query tab components with ContentChildren.</p></div><div class="content"><p>Build tab container that queries projected tabs.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class VCScenario3Component { }

@Component({ selector: 'app-vc-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Scroll Control</h2><p>Scroll to element programmatically.</p></div><div class="content"><p>Use ViewChild to scroll elements into view.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class VCScenario4Component { }

@Component({ selector: 'app-vc-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Chart Integration</h2><p>Integrate chart library with ViewChild.</p></div><div class="content"><p>Access canvas element for chart rendering.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class VCScenario5Component { }

// ROUTES
export const VIEWCHILD_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        component: ViewChildPracticeComponent,
        children: [
            { path: 'basic/exercise-1', component: VCExercise1Component },
            { path: 'basic/exercise-2', component: VCExercise2Component },
            { path: 'basic/exercise-3', component: VCExercise3Component },
            { path: 'basic/exercise-4', component: VCExercise4Component },
            { path: 'complex/scenario-1', component: VCScenario1Component },
            { path: 'complex/scenario-2', component: VCScenario2Component },
            { path: 'complex/scenario-3', component: VCScenario3Component },
            { path: 'complex/scenario-4', component: VCScenario4Component },
            { path: 'complex/scenario-5', component: VCScenario5Component },
        ]
    }
];
