/**
 * DEFER VIEWS PRACTICE - COMPLETE SECTION
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-defer-views-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>⏳ Defer Views Practice</h1>
                <p class="subtitle">Angular 17+ deferred loading with &#64;defer</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Basic &#64;defer</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Triggers</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Loading States</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Prefetching</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Heavy Component</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Image Gallery</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Dashboard</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Infinite Scroll</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Modal Content</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #14b8a6; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #14b8a6; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(20, 184, 166, 0.1); }
        .nav-section a.active { background: #14b8a6; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class DeferViewsPracticeComponent { }

// Exercises
@Component({ selector: 'app-dv-exercise-1', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 1: Basic &#64;defer</h2><p>Defer component loading until needed.</p></div><div class="demo"><pre>&#64;defer {{\n  &lt;heavy-component /&gt;\n}}</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #f0fdfa; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #14b8a6; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DVExercise1Component { }

@Component({ selector: 'app-dv-exercise-2', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 2: Triggers</h2><p>Control when to load content.</p></div><div class="demo"><pre>&#64;defer (on viewport) {{ }}\n&#64;defer (on interaction) {{ }}\n&#64;defer (on hover) {{ }}\n&#64;defer (on timer(2s)) {{ }}</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #f0fdfa; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #14b8a6; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DVExercise2Component { }

@Component({ selector: 'app-dv-exercise-3', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 3: Loading States</h2><p>Show placeholder and loading UI.</p></div><div class="demo"><pre>&#64;defer {{\n  &lt;content /&gt;\n}} &#64;placeholder {{\n  &lt;p&gt;Placeholder&lt;/p&gt;\n}} &#64;loading {{\n  &lt;spinner /&gt;\n}} &#64;error {{\n  &lt;p&gt;Error!&lt;/p&gt;\n}}</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #f0fdfa; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #14b8a6; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DVExercise3Component { }

@Component({ selector: 'app-dv-exercise-4', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 4: Prefetching</h2><p>Prefetch content before display.</p></div><div class="demo"><pre>&#64;defer (on interaction; prefetch on idle) {{\n  &lt;content /&gt;\n}}</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #f0fdfa; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #14b8a6; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class DVExercise4Component { }

// Complex Scenarios
@Component({ selector: 'app-dv-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: Heavy Component</h2><p>Defer loading of chart/table.</p></div><div class="content"><p>Improve initial page load time.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DVScenario1Component { }

@Component({ selector: 'app-dv-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Image Gallery</h2><p>Lazy load images on viewport.</p></div><div class="content"><p>Load images as user scrolls.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DVScenario2Component { }

@Component({ selector: 'app-dv-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Dashboard Widgets</h2><p>Defer non-critical widgets.</p></div><div class="content"><p>Load analytics widgets after main content.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DVScenario3Component { }

@Component({ selector: 'app-dv-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Infinite Scroll</h2><p>Load more on scroll.</p></div><div class="content"><p>Combine defer with scroll detection.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DVScenario4Component { }

@Component({ selector: 'app-dv-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Modal Content</h2><p>Load modal content on open.</p></div><div class="content"><p>Defer heavy modal content.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class DVScenario5Component { }

export const DEFER_VIEWS_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: DeferViewsPracticeComponent, children: [
            { path: 'basic/exercise-1', component: DVExercise1Component },
            { path: 'basic/exercise-2', component: DVExercise2Component },
            { path: 'basic/exercise-3', component: DVExercise3Component },
            { path: 'basic/exercise-4', component: DVExercise4Component },
            { path: 'complex/scenario-1', component: DVScenario1Component },
            { path: 'complex/scenario-2', component: DVScenario2Component },
            { path: 'complex/scenario-3', component: DVScenario3Component },
            { path: 'complex/scenario-4', component: DVScenario4Component },
            { path: 'complex/scenario-5', component: DVScenario5Component },
        ]
    }
];
