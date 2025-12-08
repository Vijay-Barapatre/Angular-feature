/**
 * DYNAMIC COMPONENTS PRACTICE - COMPLETE SECTION
 */
import { Component, ViewContainerRef, inject, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-dynamic-components-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🔄 Dynamic Components Practice</h1>
                <p class="subtitle">Create and manage components at runtime</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: ViewContainerRef</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Component Inputs</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Lazy Loading</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: ngComponentOutlet</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Modal Service</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Dashboard Widgets</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Form Builder</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Plugin System</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Tab Container</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #06b6d4; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #06b6d4; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(6, 182, 212, 0.1); }
        .nav-section a.active { background: #06b6d4; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class DynamicComponentsPracticeComponent { }

// Exercises
@Component({ selector: 'app-dc-exercise-1', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 1: ViewContainerRef</h2><p>Create components dynamically using ViewContainerRef.</p></div><div class="demo"><pre>vcr.createComponent(MyComponent)</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfeff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DCExercise1Component { }

@Component({ selector: 'app-dc-exercise-2', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 2: Component Inputs</h2><p>Pass data to dynamically created components.</p></div><div class="demo"><pre>const ref = vcr.createComponent(Comp);\nref.setInput('data', myData);</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfeff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DCExercise2Component { }

@Component({ selector: 'app-dc-exercise-3', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 3: Lazy Loading</h2><p>Load components on demand.</p></div><div class="demo"><pre>const {{ default: Comp }} = await import('./comp');\nvcr.createComponent(Comp);</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfeff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DCExercise3Component { }

@Component({ selector: 'app-dc-exercise-4', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 4: ngComponentOutlet</h2><p>Simpler dynamic component rendering.</p></div><div class="demo"><pre>&lt;ng-container *ngComponentOutlet="component"&gt;&lt;/ng-container&gt;</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #ecfeff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DCExercise4Component { }

// Complex Scenarios
@Component({ selector: 'app-dc-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: Modal Service</h2><p>Create modals dynamically.</p></div><div class="content"><p>Service that opens modals with any component.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DCScenario1Component { }

@Component({ selector: 'app-dc-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Dashboard Widgets</h2><p>Drag and drop widgets.</p></div><div class="content"><p>Dynamic dashboard layout.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DCScenario2Component { }

@Component({ selector: 'app-dc-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Form Builder</h2><p>Dynamic form field generation.</p></div><div class="content"><p>Build forms from configuration.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DCScenario3Component { }

@Component({ selector: 'app-dc-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Plugin System</h2><p>Extensible plugin architecture.</p></div><div class="content"><p>Load plugins at runtime.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DCScenario4Component { }

@Component({ selector: 'app-dc-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Tab Container</h2><p>Dynamic tab content.</p></div><div class="content"><p>Lazy-load tab content.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DCScenario5Component { }

export const DYNAMIC_COMPONENTS_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: DynamicComponentsPracticeComponent, children: [
            { path: 'basic/exercise-1', component: DCExercise1Component },
            { path: 'basic/exercise-2', component: DCExercise2Component },
            { path: 'basic/exercise-3', component: DCExercise3Component },
            { path: 'basic/exercise-4', component: DCExercise4Component },
            { path: 'complex/scenario-1', component: DCScenario1Component },
            { path: 'complex/scenario-2', component: DCScenario2Component },
            { path: 'complex/scenario-3', component: DCScenario3Component },
            { path: 'complex/scenario-4', component: DCScenario4Component },
            { path: 'complex/scenario-5', component: DCScenario5Component },
        ]
    }
];
