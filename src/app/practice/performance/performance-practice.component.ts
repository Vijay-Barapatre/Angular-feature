/**
 * PERFORMANCE PRACTICE - COMPLETE SECTION
 */
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-performance-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>⚡ Performance Practice</h1>
                <p class="subtitle">Optimize Angular applications for speed</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: OnPush Strategy</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: TrackBy</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Pure Pipes</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Lazy Loading</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Large Lists</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Virtual Scroll</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Memoization</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Bundle Size</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Profiling</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #f97316; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #f97316; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(249, 115, 22, 0.1); }
        .nav-section a.active { background: #f97316; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class PerformancePracticeComponent { }

// Exercises
@Component({
    selector: 'app-perf-exercise-1',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: OnPush Strategy</h2>
                <p>Reduce change detection cycles.</p>
            </div>
            <div class="demo">
                <pre>&#64;Component(&#123;
  changeDetection: ChangeDetectionStrategy.OnPush
&#125;)</pre>
                <p>Only checks when inputs change or events fire.</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff7ed; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f97316; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class PerfExercise1Component { }

@Component({
    selector: 'app-perf-exercise-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: TrackBy</h2>
                <p>Optimize ngFor with trackBy.</p>
            </div>
            <div class="demo">
                <pre>&#64;for (item of items; track item.id) &#123;
  &lt;li&gt;item name here&lt;/li&gt;
&#125;</pre>
                <p>Prevents re-rendering unchanged items.</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff7ed; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f97316; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class PerfExercise2Component { }

@Component({
    selector: 'app-perf-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Pure Pipes</h2>
                <p>Memoize computations in pipes.</p>
            </div>
            <div class="demo">
                <pre>&#64;Pipe(&#123; name: 'filter', pure: true &#125;)</pre>
                <p>Pure pipes only recalculate when inputs change.</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff7ed; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f97316; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class PerfExercise3Component { }

@Component({
    selector: 'app-perf-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Lazy Loading</h2>
                <p>Load features on demand.</p>
            </div>
            <div class="demo">
                <pre>&#123; path: 'admin', loadChildren: () =&gt;
  import('./admin/routes')
    .then(m =&gt; m.ADMIN_ROUTES) &#125;</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff7ed; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f97316; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class PerfExercise4Component { }

// Complex Scenarios
@Component({
    selector: 'app-perf-scenario-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Large Lists</h2>
                <p>Handle 1000+ items efficiently.</p>
            </div>
            <div class="content">
                <p>Virtualization, pagination, OnPush.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class PerfScenario1Component { }

@Component({
    selector: 'app-perf-scenario-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Virtual Scrolling</h2>
                <p>CDK virtual scroll.</p>
            </div>
            <div class="content">
                <p>Render only visible items.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class PerfScenario2Component { }

@Component({
    selector: 'app-perf-scenario-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Memoization</h2>
                <p>Cache computed values.</p>
            </div>
            <div class="content">
                <p>Use computed() signals for memoization.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class PerfScenario3Component { }

@Component({
    selector: 'app-perf-scenario-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Bundle Size</h2>
                <p>Reduce bundle size.</p>
            </div>
            <div class="content">
                <p>Tree shaking, code splitting, imports.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class PerfScenario4Component { }

@Component({
    selector: 'app-perf-scenario-5',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Profiling</h2>
                <p>Use Angular DevTools.</p>
            </div>
            <div class="content">
                <p>Profile change detection, identify bottlenecks.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class PerfScenario5Component { }

export const PERFORMANCE_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: PerformancePracticeComponent, children: [
            { path: 'basic/exercise-1', component: PerfExercise1Component },
            { path: 'basic/exercise-2', component: PerfExercise2Component },
            { path: 'basic/exercise-3', component: PerfExercise3Component },
            { path: 'basic/exercise-4', component: PerfExercise4Component },
            { path: 'complex/scenario-1', component: PerfScenario1Component },
            { path: 'complex/scenario-2', component: PerfScenario2Component },
            { path: 'complex/scenario-3', component: PerfScenario3Component },
            { path: 'complex/scenario-4', component: PerfScenario4Component },
            { path: 'complex/scenario-5', component: PerfScenario5Component },
        ]
    }
];
