/**
 * HOST BINDING PRACTICE - COMPLETE SECTION
 */
import { Component, HostListener, HostBinding, signal, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-host-binding-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🎯 Host Listener/Binding Practice</h1>
                <p class="subtitle">Control host element properties and events</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: HostListener</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: HostBinding</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Combined</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Custom Events</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Dropdown</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Resize Observer</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Keyboard Nav</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Drag & Drop</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Theme Toggle</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #ec4899; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #ec4899; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(236, 72, 153, 0.1); }
        .nav-section a.active { background: #ec4899; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class HostBindingPracticeComponent { }

// Exercises
@Component({
    selector: 'app-hb-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: HostListener</h2>
                <p>Listen to host element events.</p>
            </div>
            <div class="demo" (mouseover)="onHover(true)" (mouseout)="onHover(false)">
                <p>Hover over me!</p>
                <p>Hovering: {{ isHovering() }}</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fdf4ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; transition: background 0.3s; }
        .demo:hover { background: #fdf4ff; }
    `]
})
export class HBExercise1Component {
    isHovering = signal(false);
    onHover(value: boolean): void { this.isHovering.set(value); }
}

@Component({ selector: 'app-hb-exercise-2', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 2: HostBinding</h2><p>Bind to host element properties.</p></div><div class="demo"><pre>&#64;HostBinding('class.active') isActive = false;</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fdf4ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class HBExercise2Component { }

@Component({ selector: 'app-hb-exercise-3', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 3: Combined Usage</h2><p>Use both together for interactive components.</p></div><div class="demo"><p>HostListener + HostBinding = Interactive!</p></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fdf4ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class HBExercise3Component { }

@Component({ selector: 'app-hb-exercise-4', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 4: Custom Events</h2><p>Listen to document/window events.</p></div><div class="demo"><pre>&#64;HostListener('document:keydown', ['$event'])</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fdf4ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class HBExercise4Component { }

// Complex Scenarios
@Component({ selector: 'app-hb-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: Dropdown</h2><p>Click outside to close.</p></div><div class="content"><p>Use HostListener for document clicks.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class HBScenario1Component { }

@Component({ selector: 'app-hb-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Resize Observer</h2><p>React to window resize.</p></div><div class="content"><p>Responsive component behavior.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class HBScenario2Component { }

@Component({ selector: 'app-hb-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Keyboard Navigation</h2><p>Arrow key navigation.</p></div><div class="content"><p>Accessible keyboard controls.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class HBScenario3Component { }

@Component({ selector: 'app-hb-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Drag & Drop</h2><p>Drag events handling.</p></div><div class="content"><p>Implement drag and drop.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class HBScenario4Component { }

@Component({ selector: 'app-hb-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Theme Toggle</h2><p>Toggle dark/light mode.</p></div><div class="content"><p>Apply theme class to host.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class HBScenario5Component { }

export const HOST_BINDING_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: HostBindingPracticeComponent, children: [
            { path: 'basic/exercise-1', component: HBExercise1Component },
            { path: 'basic/exercise-2', component: HBExercise2Component },
            { path: 'basic/exercise-3', component: HBExercise3Component },
            { path: 'basic/exercise-4', component: HBExercise4Component },
            { path: 'complex/scenario-1', component: HBScenario1Component },
            { path: 'complex/scenario-2', component: HBScenario2Component },
            { path: 'complex/scenario-3', component: HBScenario3Component },
            { path: 'complex/scenario-4', component: HBScenario4Component },
            { path: 'complex/scenario-5', component: HBScenario5Component },
        ]
    }
];
