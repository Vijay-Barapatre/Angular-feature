/**
 * ERROR HANDLING PRACTICE - COMPLETE SECTION
 */
import { Component, ErrorHandler, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

// ============================================================================
// OVERVIEW COMPONENT
// ============================================================================
@Component({
    selector: 'app-error-handling-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>⚠️ Error Handling Practice</h1>
                <p class="subtitle">Master error handling patterns in Angular</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: Try-Catch</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Error Boundaries</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: HTTP Errors</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Global Handler</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Form Errors</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: API Failures</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Retry Logic</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Error Logging</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Recovery</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #ef4444; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #ef4444; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(239, 68, 68, 0.1); }
        .nav-section a.active { background: #ef4444; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class ErrorHandlingPracticeComponent { }

// ============================================================================
// BASIC EXERCISES
// ============================================================================
@Component({
    selector: 'app-eh-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Try-Catch Pattern</h2>
                <p>Handle errors with try-catch in async code.</p>
            </div>
            <div class="demo">
                <button (click)="triggerError()">Trigger Error</button>
                <button (click)="triggerSafeError()">Safe Error</button>
                @if (error()) { <p class="error">{{ error() }}</p> }
                @if (result()) { <p class="success">{{ result() }}</p> }
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo button { padding: 0.75rem 1rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 0.5rem; }
        .error { color: #ef4444; padding: 0.75rem; background: #fef2f2; border-radius: 6px; }
        .success { color: #10b981; padding: 0.75rem; background: #ecfdf5; border-radius: 6px; }
    `]
})
export class EHExercise1Component {
    error = signal('');
    result = signal('');

    triggerError(): void {
        throw new Error('Unhandled error!');
    }

    triggerSafeError(): void {
        try {
            throw new Error('This error is caught!');
        } catch (e) {
            this.error.set((e as Error).message);
            this.result.set('');
        }
    }
}

@Component({ selector: 'app-eh-exercise-2', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 2: Error Boundaries</h2><p>Contain errors to specific component trees.</p></div><div class="demo"><p>Error boundaries prevent cascading failures.</p></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class EHExercise2Component { }

@Component({ selector: 'app-eh-exercise-3', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 3: HTTP Errors</h2><p>Handle HTTP errors with catchError.</p></div><div class="demo"><pre>http.get(url).pipe(\n  catchError(err => {{\n    console.error(err);\n    return EMPTY;\n  }})\n)</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }`] })
export class EHExercise3Component { }

@Component({ selector: 'app-eh-exercise-4', standalone: true, imports: [CommonModule], template: `<div class="exercise"><div class="instructions"><h2>🟦 Exercise 4: Global Error Handler</h2><p>Implement custom ErrorHandler.</p></div><div class="demo"><pre>&#64;Injectable()\nexport class GlobalErrorHandler implements ErrorHandler {{\n  handleError(error: any): void {{\n    console.error('Global:', error);\n  }}\n}}</pre></div></div>`, styles: [`.exercise { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; } pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; overflow-x: auto; }`] })
export class EHExercise4Component { }

// Complex Scenarios
@Component({ selector: 'app-eh-scenario-1', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 1: Form Errors</h2><p>Display form validation errors gracefully.</p></div><div class="content"><p>Show errors inline and in summary.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class EHScenario1Component { }

@Component({ selector: 'app-eh-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: API Failures</h2><p>Handle different HTTP error codes.</p></div><div class="content"><p>401, 403, 404, 500 handling strategies.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class EHScenario2Component { }

@Component({ selector: 'app-eh-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Retry Logic</h2><p>Automatic retry with exponential backoff.</p></div><div class="content"><p>Use retry and retryWhen operators.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class EHScenario3Component { }

@Component({ selector: 'app-eh-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Error Logging</h2><p>Log errors to monitoring service.</p></div><div class="content"><p>Integrate with Sentry, LogRocket, etc.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class EHScenario4Component { }

@Component({ selector: 'app-eh-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Error Recovery</h2><p>Graceful degradation and recovery.</p></div><div class="content"><p>Fallback UI, cached data, retry options.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class EHScenario5Component { }

// ROUTES
export const ERROR_HANDLING_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        component: ErrorHandlingPracticeComponent,
        children: [
            { path: 'basic/exercise-1', component: EHExercise1Component },
            { path: 'basic/exercise-2', component: EHExercise2Component },
            { path: 'basic/exercise-3', component: EHExercise3Component },
            { path: 'basic/exercise-4', component: EHExercise4Component },
            { path: 'complex/scenario-1', component: EHScenario1Component },
            { path: 'complex/scenario-2', component: EHScenario2Component },
            { path: 'complex/scenario-3', component: EHScenario3Component },
            { path: 'complex/scenario-4', component: EHScenario4Component },
            { path: 'complex/scenario-5', component: EHScenario5Component },
        ]
    }
];
