/**
 * STANDALONE COMPONENTS PRACTICE - COMPLETE SECTION
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-standalone-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🧩 Standalone Components Practice</h1>
                <p class="subtitle">Modern Angular without NgModules</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Creating Standalone</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Imports Array</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Providers</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Bootstrapping</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Lazy Loading</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Shared Components</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Migration</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Testing</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Library Usage</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #f43f5e; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #f43f5e; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(244, 63, 94, 0.1); }
        .nav-section a.active { background: #f43f5e; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class StandalonePracticeComponent { }

// Exercises
@Component({
    selector: 'app-sa-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Creating Standalone</h2>
                <p>Create a standalone component by adding standalone: true to the Component decorator.</p>
            </div>
            <div class="demo">
                <pre>&#64;Component(&#123;
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  template: '&lt;p&gt;Hello!&lt;/p&gt;'
&#125;)
export class MyComponent &#123;&#125;</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f43f5e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; overflow-x: auto; }
    `]
})
export class SAExercise1Component { }

@Component({
    selector: 'app-sa-exercise-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Imports Array</h2>
                <p>Import dependencies directly in the component instead of NgModule.</p>
            </div>
            <div class="demo">
                <pre>&#64;Component(&#123;
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MyOtherComponent
  ]
&#125;)</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f43f5e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAExercise2Component { }

@Component({
    selector: 'app-sa-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Providers</h2>
                <p>Provide services in standalone applications using bootstrapApplication.</p>
            </div>
            <div class="demo">
                <pre>bootstrapApplication(App, &#123;
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    MyService
  ]
&#125;);</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f43f5e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAExercise3Component { }

@Component({
    selector: 'app-sa-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Bootstrapping</h2>
                <p>Bootstrap a standalone application without AppModule.</p>
            </div>
            <div class="demo">
                <pre>// main.ts
bootstrapApplication(AppComponent, &#123;
  providers: [...]
&#125;).catch(err =&gt; console.error(err));</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fff1f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f43f5e; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAExercise4Component { }

// Complex Scenarios
@Component({
    selector: 'app-sa-scenario-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Lazy Loading</h2>
                <p>Lazy load standalone components directly in routes.</p>
            </div>
            <div class="content">
                <pre>&#123;
  path: 'admin',
  loadComponent: () =&gt; import('./admin.component')
    .then(m =&gt; m.AdminComponent)
&#125;</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAScenario1Component { }

@Component({
    selector: 'app-sa-scenario-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Shared Components</h2>
                <p>Share standalone components across your application.</p>
            </div>
            <div class="content">
                <pre>// shared/index.ts - Export pattern
export &#123; ButtonComponent &#125; from './button.component';
export &#123; CardComponent &#125; from './card.component';

// Consumer imports directly
imports: [ButtonComponent, CardComponent]</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAScenario2Component { }

@Component({
    selector: 'app-sa-scenario-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Migration</h2>
                <p>Gradually migrate from NgModules to standalone.</p>
            </div>
            <div class="content">
                <pre># Use Angular schematic
ng generate &#64;angular/core:standalone

# Steps:
# 1. Add standalone: true to components
# 2. Move imports from NgModule to component
# 3. Update routes to use loadComponent
# 4. Remove empty NgModules</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAScenario3Component { }

@Component({
    selector: 'app-sa-scenario-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Testing</h2>
                <p>Test standalone components with simplified TestBed.</p>
            </div>
            <div class="content">
                <pre>// Import instead of declare!
TestBed.configureTestingModule(&#123;
  imports: [MyStandaloneComponent],
  providers: [
    &#123; provide: MyService, useClass: MockService &#125;
  ]
&#125;);</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAScenario4Component { }

@Component({
    selector: 'app-sa-scenario-5',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Library Usage</h2>
                <p>Use third-party libraries with standalone components.</p>
            </div>
            <div class="content">
                <pre>// Import Material components directly
imports: [
  MatButtonModule,
  MatCardModule,
  MatInputModule
]

// Or individual components (v15+)
imports: [MatButton, MatCard]</pre>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class SAScenario5Component { }

export const STANDALONE_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: StandalonePracticeComponent, children: [
            { path: 'basic/exercise-1', component: SAExercise1Component },
            { path: 'basic/exercise-2', component: SAExercise2Component },
            { path: 'basic/exercise-3', component: SAExercise3Component },
            { path: 'basic/exercise-4', component: SAExercise4Component },
            { path: 'complex/scenario-1', component: SAScenario1Component },
            { path: 'complex/scenario-2', component: SAScenario2Component },
            { path: 'complex/scenario-3', component: SAScenario3Component },
            { path: 'complex/scenario-4', component: SAScenario4Component },
            { path: 'complex/scenario-5', component: SAScenario5Component },
        ]
    }
];
