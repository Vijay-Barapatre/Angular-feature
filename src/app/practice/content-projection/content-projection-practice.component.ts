/**
 * CONTENT PROJECTION PRACTICE - COMPLETE SECTION
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

// ============================================================================
// OVERVIEW COMPONENT
// ============================================================================
@Component({
    selector: 'app-content-projection-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>📦 Content Projection Practice</h1>
                <p class="subtitle">Master ng-content and multi-slot projection</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Basic ng-content</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Multiple Slots</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Conditional</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Default Content</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Card Component</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Modal Dialog</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Layout System</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Accordion</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Wizard Steps</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #f59e0b; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #f59e0b; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(245, 158, 11, 0.1); }
        .nav-section a.active { background: #f59e0b; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class ContentProjectionPracticeComponent { }

// ============================================================================
// BASIC EXERCISES
// ============================================================================
@Component({
    selector: 'app-simple-card',
    standalone: true,
    template: `<div class="card"><ng-content></ng-content></div>`,
    styles: [`.card { padding: 1rem; border: 2px solid #f59e0b; border-radius: 8px; background: white; }`]
})
export class SimpleCardComponent { }

@Component({
    selector: 'app-cp-exercise-1',
    standalone: true,
    imports: [CommonModule, SimpleCardComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Basic ng-content</h2>
                <p>Create a wrapper component that projects child content.</p>
            </div>
            <div class="demo">
                <app-simple-card>
                    <h3>Hello!</h3>
                    <p>This content is projected into the card.</p>
                </app-simple-card>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CPExercise1Component { }

@Component({
    selector: 'app-multi-slot-card',
    standalone: true,
    template: `
        <div class="card">
            <header><ng-content select="[card-header]"></ng-content></header>
            <main><ng-content></ng-content></main>
            <footer><ng-content select="[card-footer]"></ng-content></footer>
        </div>
    `,
    styles: [`
        .card { border: 2px solid #f59e0b; border-radius: 8px; overflow: hidden; }
        header { background: #f59e0b; color: white; padding: 0.75rem; }
        main { padding: 1rem; background: white; }
        footer { background: #fef3c7; padding: 0.75rem; border-top: 1px solid #fcd34d; }
    `]
})
export class MultiSlotCardComponent { }

@Component({
    selector: 'app-cp-exercise-2',
    standalone: true,
    imports: [CommonModule, MultiSlotCardComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Multiple Slots</h2>
                <p>Use select attribute to project content to specific slots.</p>
            </div>
            <div class="demo">
                <app-multi-slot-card>
                    <h3 card-header>Card Title</h3>
                    <p>This goes to the default slot (main).</p>
                    <button card-footer>Action Button</button>
                </app-multi-slot-card>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CPExercise2Component { }

@Component({
    selector: 'app-cp-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Conditional Projection</h2>
                <p>Check if content was projected using ngProjectAs.</p>
            </div>
            <div class="demo">
                <p>Use &#64;if with content reference to conditionally show slots.</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CPExercise3Component { }

@Component({
    selector: 'app-cp-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Default Content</h2>
                <p>Provide fallback content when nothing is projected.</p>
            </div>
            <div class="demo">
                <p>Place default content inside ng-content tags (though it won't render if content is projected).</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CPExercise4Component { }

// ============================================================================
// COMPLEX SCENARIOS
// ============================================================================
@Component({
    selector: 'app-cp-scenario-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Card Component</h2>
                <p>Build a flexible card with header, body, and actions slots.</p>
            </div>
            <div class="content"><p>Full card component with multiple projection slots.</p></div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class CPScenario1Component { }

@Component({ selector: 'app-cp-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Modal Dialog</h2><p>Create modal with projected header and content.</p></div><div class="content"><p>Modal with customizable parts.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CPScenario2Component { }

@Component({ selector: 'app-cp-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Layout System</h2><p>Build header/sidebar/content layout.</p></div><div class="content"><p>Flexible page layout with slots.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CPScenario3Component { }

@Component({ selector: 'app-cp-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Accordion</h2><p>Accordion with projected panel content.</p></div><div class="content"><p>Expandable panels with content projection.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CPScenario4Component { }

@Component({ selector: 'app-cp-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Wizard Steps</h2><p>Multi-step wizard with projected step content.</p></div><div class="content"><p>Step-by-step wizard component.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class CPScenario5Component { }

// ============================================================================
// ROUTES
// ============================================================================
export const CONTENT_PROJECTION_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        component: ContentProjectionPracticeComponent,
        children: [
            { path: 'basic/exercise-1', component: CPExercise1Component },
            { path: 'basic/exercise-2', component: CPExercise2Component },
            { path: 'basic/exercise-3', component: CPExercise3Component },
            { path: 'basic/exercise-4', component: CPExercise4Component },
            { path: 'complex/scenario-1', component: CPScenario1Component },
            { path: 'complex/scenario-2', component: CPScenario2Component },
            { path: 'complex/scenario-3', component: CPScenario3Component },
            { path: 'complex/scenario-4', component: CPScenario4Component },
            { path: 'complex/scenario-5', component: CPScenario5Component },
        ]
    }
];
