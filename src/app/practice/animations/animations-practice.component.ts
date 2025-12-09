/**
 * ANIMATIONS PRACTICE - COMPLETE SECTION
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-animations-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🎬 Animations Practice</h1>
                <p class="subtitle">Create smooth Angular animations</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: State Animations</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Enter/Leave</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Keyframes</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Query/Stagger</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Page Transitions</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: List Animations</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Modal Animation</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Accordion</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Carousel</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #a855f7; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #a855f7; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(168, 85, 247, 0.1); }
        .nav-section a.active { background: #a855f7; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class AnimationsPracticeComponent { }

// Exercises
@Component({
    selector: 'app-anim-exercise-1',
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('fadeInOut', [
            state('void', style({ opacity: 0 })),
            state('*', style({ opacity: 1 })),
            transition('void <=> *', animate('300ms ease-in-out'))
        ])
    ],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: State Animations</h2>
                <p>Create animations that respond to state changes.</p>
            </div>
            <div class="demo">
                <button (click)="toggle()">Toggle Box</button>
                @if (isVisible()) {
                    <div class="box" @fadeInOut>Animated Box!</div>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo button { padding: 0.75rem 1rem; background: #a855f7; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .box { margin-top: 1rem; padding: 2rem; background: #a855f7; color: white; border-radius: 8px; text-align: center; }
    `]
})
export class AnimExercise1Component {
    isVisible = signal(true);
    toggle(): void { this.isVisible.update(v => !v); }
}

@Component({
    selector: 'app-anim-exercise-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Enter/Leave</h2>
                <p>Animate elements entering and leaving DOM.</p>
            </div>
            <div class="demo">
                <pre>transition(':enter', [...])
transition(':leave', [...])</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class AnimExercise2Component { }

@Component({
    selector: 'app-anim-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Keyframes</h2>
                <p>Create multi-step animations with keyframes.</p>
            </div>
            <div class="demo">
                <pre>animate('1s', keyframes([...
  style(&#123; opacity: 0 &#125;),
  style(&#123; opacity: 0.5 &#125;),
  style(&#123; opacity: 1 &#125;)
]))</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class AnimExercise3Component { }

@Component({
    selector: 'app-anim-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Query/Stagger</h2>
                <p>Animate multiple elements with stagger.</p>
            </div>
            <div class="demo">
                <pre>query(':enter', [
  stagger('50ms', [
    animate('300ms', ...)
  ])
])</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #faf5ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #a855f7; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class AnimExercise4Component { }

// Complex Scenarios
@Component({
    selector: 'app-anim-scenario-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Page Transitions</h2>
                <p>Animate route transitions.</p>
            </div>
            <div class="content">
                <p>Use route animations with data.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class AnimScenario1Component { }

@Component({
    selector: 'app-anim-scenario-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: List Animations</h2>
                <p>Animate list add/remove.</p>
            </div>
            <div class="content">
                <p>Stagger animations for lists.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class AnimScenario2Component { }

@Component({
    selector: 'app-anim-scenario-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Modal Animation</h2>
                <p>Fade and scale modal.</p>
            </div>
            <div class="content">
                <p>Backdrop and modal animations.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class AnimScenario3Component { }

@Component({
    selector: 'app-anim-scenario-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Accordion</h2>
                <p>Expand/collapse animation.</p>
            </div>
            <div class="content">
                <p>Height animation with auto.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class AnimScenario4Component { }

@Component({
    selector: 'app-anim-scenario-5',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Carousel</h2>
                <p>Slide through items.</p>
            </div>
            <div class="content">
                <p>Transform-based transitions.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class AnimScenario5Component { }

export const ANIMATIONS_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: AnimationsPracticeComponent, children: [
            { path: 'basic/exercise-1', component: AnimExercise1Component },
            { path: 'basic/exercise-2', component: AnimExercise2Component },
            { path: 'basic/exercise-3', component: AnimExercise3Component },
            { path: 'basic/exercise-4', component: AnimExercise4Component },
            { path: 'complex/scenario-1', component: AnimScenario1Component },
            { path: 'complex/scenario-2', component: AnimScenario2Component },
            { path: 'complex/scenario-3', component: AnimScenario3Component },
            { path: 'complex/scenario-4', component: AnimScenario4Component },
            { path: 'complex/scenario-5', component: AnimScenario5Component },
        ]
    }
];
