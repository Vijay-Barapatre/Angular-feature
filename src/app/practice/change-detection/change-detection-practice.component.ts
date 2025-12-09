/**
 * CHANGE DETECTION PRACTICE - COMPLETE SECTION
 */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-change-detection-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🔬 Change Detection Practice</h1>
                <p class="subtitle">Understand and optimize Angular's change detection</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Default Strategy</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: OnPush Strategy</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Manual Detection</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: DetectChanges</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Zone.js</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: runOutsideAngular</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Immutable Data</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Async Pipe</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Profiling</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #0ea5e9; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #0ea5e9; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(14, 165, 233, 0.1); }
        .nav-section a.active { background: #0ea5e9; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class ChangeDetectionPracticeComponent { }

// Exercises
@Component({
    selector: 'app-cd-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Default Strategy</h2>
                <p>Understand default change detection behavior.</p>
            </div>
            <div class="demo">
                <p>Default: Checks entire component tree on every event.</p>
                <p>Current time: {{ getTime() }}</p>
                <button (click)="onClick()">Trigger CD</button>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0ea5e9; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo button { padding: 0.75rem 1rem; background: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer; }
    `]
})
export class CDExercise1Component {
    getTime(): string { return new Date().toLocaleTimeString(); }
    onClick(): void { console.log('Clicked!'); }
}

@Component({
    selector: 'app-cd-exercise-2',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: OnPush Strategy</h2>
                <p>Only check when inputs change or events fire.</p>
            </div>
            <div class="demo">
                <pre>changeDetection: ChangeDetectionStrategy.OnPush</pre>
                <p>Counter: {{ counter() }}</p>
                <button (click)="increment()">Increment</button>
            </div>
        </div>
    `,
    styles: [`.exercise { max-width: 800px; } .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0ea5e9; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; } .demo button { padding: 0.75rem 1rem; background: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 0.5rem; }`]
})
export class CDExercise2Component {
    counter = signal(0);
    increment(): void { this.counter.update(n => n + 1); }
}

@Component({ selector: 'app-cd-exercise-3', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 3: Manual Detection</h2><p>Detach and reattach change detector.</p></div><div class="demo"><pre>cdr.detach();\n// do work\ncdr.reattach();</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0ea5e9; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class CDExercise3Component { }

@Component({ selector: 'app-cd-exercise-4', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 4: DetectChanges</h2><p>Manually trigger change detection.</p></div><div class="demo"><pre>this.cdr.detectChanges();\nthis.cdr.markForCheck();</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0ea5e9; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class CDExercise4Component { }

// Complex Scenarios
@Component({ selector: 'app-cd-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: Zone.js</h2><p>Understand Zone.js role.</p></div><div class="content"><p>Zone patches async APIs to trigger CD.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CDScenario1Component { }

@Component({ selector: 'app-cd-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: runOutsideAngular</h2><p>Optimize with NgZone.</p></div><div class="content"><p>Run code outside Angular zone.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CDScenario2Component { }

@Component({ selector: 'app-cd-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Immutable Data</h2><p>OnPush with immutability.</p></div><div class="content"><p>Create new objects to trigger detection.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CDScenario3Component { }

@Component({ selector: 'app-cd-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Async Pipe</h2><p>Auto-trigger with async pipe.</p></div><div class="content"><p>Async pipe triggers markForCheck.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CDScenario4Component { }

@Component({ selector: 'app-cd-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Profiling</h2><p>Profile with Angular DevTools.</p></div><div class="content"><p>Identify CD hotspots.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CDScenario5Component { }

export const CHANGE_DETECTION_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: ChangeDetectionPracticeComponent, children: [
            { path: 'basic/exercise-1', component: CDExercise1Component },
            { path: 'basic/exercise-2', component: CDExercise2Component },
            { path: 'basic/exercise-3', component: CDExercise3Component },
            { path: 'basic/exercise-4', component: CDExercise4Component },
            { path: 'complex/scenario-1', component: CDScenario1Component },
            { path: 'complex/scenario-2', component: CDScenario2Component },
            { path: 'complex/scenario-3', component: CDScenario3Component },
            { path: 'complex/scenario-4', component: CDScenario4Component },
            { path: 'complex/scenario-5', component: CDScenario5Component },
        ]
    }
];
