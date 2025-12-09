/**
 * NGMODULE PRACTICE - COMPLETE SECTION
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-ngmodule-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>📦 NgModule Practice</h1>
                <p class="subtitle">Module-based Angular architecture</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Feature Modules</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Shared Modules</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Core Module</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Lazy Loading</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: forRoot/forChild</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Module Providers</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Barrel Exports</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Entry Components</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Migration</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`.practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; } .practice-header { margin-bottom: 1.5rem; } .back-link { color: #e11d48; text-decoration: none; } h1 { margin: 0.5rem 0 0.25rem; color: #e11d48; } .subtitle { margin: 0; color: var(--text-secondary); } .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; } .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; } .nav-section h3 { margin: 0 0 0.75rem; } .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; } .nav-section a:hover { background: rgba(225, 29, 72, 0.1); } .nav-section a.active { background: #e11d48; color: white; } .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }`]
})
export class NgModulePracticeComponent { }

// Basic Exercises
@Component({
    selector: 'app-ngmodule-exercise-1', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 1: Feature Modules</h2><p>Organize code into feature modules.</p></div><div class="demo"><pre>&#64;NgModule(&#123;
  declarations: [ProductListComponent],
  imports: [CommonModule],
  exports: [ProductListComponent]
&#125;)
export class ProductsModule &#123; &#125;</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #e11d48; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`]
})
export class NgModuleExercise1Component { }

@Component({ selector: 'app-ngmodule-exercise-2', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 2: Shared Modules</h2><p>Create reusable shared modules.</p></div><div class="demo"><p>Export common components, directives, pipes.</p></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #e11d48; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleExercise2Component { }

@Component({ selector: 'app-ngmodule-exercise-3', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 3: Core Module</h2><p>Singleton services in CoreModule.</p></div><div class="demo"><p>Prevent multiple CoreModule imports.</p></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #e11d48; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleExercise3Component { }

@Component({ selector: 'app-ngmodule-exercise-4', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 4: Lazy Loading</h2><p>Lazy load feature modules.</p></div><div class="demo"><p>Use loadChildren for on-demand loading.</p></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #e11d48; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleExercise4Component { }

// Complex Scenarios
@Component({ selector: 'app-ngmodule-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: forRoot/forChild</h2><p>Configure modules for root and child.</p></div><div class="content"><p>ModuleWithProviders pattern.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleScenario1Component { }

@Component({ selector: 'app-ngmodule-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Module Providers</h2><p>Understand provider scoping.</p></div><div class="content"><p>Root vs module-scoped providers.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleScenario2Component { }

@Component({ selector: 'app-ngmodule-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Barrel Exports</h2><p>Organize exports with index.ts.</p></div><div class="content"><p>Clean import paths.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleScenario3Component { }

@Component({ selector: 'app-ngmodule-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Entry Components</h2><p>Dynamic component loading (legacy).</p></div><div class="content"><p>Historical entryComponents usage.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleScenario4Component { }

@Component({ selector: 'app-ngmodule-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Migration to Standalone</h2><p>Migrate from modules to standalone.</p></div><div class="content"><p>ng generate &#64;angular/core:standalone</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class NgModuleScenario5Component { }

export const NGMODULE_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: NgModulePracticeComponent, children: [
            { path: 'basic/exercise-1', component: NgModuleExercise1Component },
            { path: 'basic/exercise-2', component: NgModuleExercise2Component },
            { path: 'basic/exercise-3', component: NgModuleExercise3Component },
            { path: 'basic/exercise-4', component: NgModuleExercise4Component },
            { path: 'complex/scenario-1', component: NgModuleScenario1Component },
            { path: 'complex/scenario-2', component: NgModuleScenario2Component },
            { path: 'complex/scenario-3', component: NgModuleScenario3Component },
            { path: 'complex/scenario-4', component: NgModuleScenario4Component },
            { path: 'complex/scenario-5', component: NgModuleScenario5Component },
        ]
    }
];
