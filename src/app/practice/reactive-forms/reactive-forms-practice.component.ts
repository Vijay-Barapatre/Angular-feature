/**
 * ============================================================================
 * REACTIVE FORMS PRACTICE - OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-reactive-forms-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>📝 Reactive Forms Practice</h1>
                <p class="subtitle">Master form handling with FormBuilder and validators</p>
            </header>

            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">
                        Exercise 1: FormControl Basics
                    </a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">
                        Exercise 2: FormGroup
                    </a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">
                        Exercise 3: Built-in Validators
                    </a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">
                        Exercise 4: Custom Validators
                    </a>
                    <a routerLink="basic/exercise-5" routerLinkActive="active">
                        Exercise 5: Typed Forms
                    </a>
                    <a routerLink="basic/exercise-6" routerLinkActive="active">
                        Exercise 6: Signals Interop
                    </a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">
                        Scenario 1: Registration Form
                    </a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">
                        Scenario 2: Dynamic Form Arrays
                    </a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">
                        Scenario 3: Cross-Field Validation
                    </a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">
                        Scenario 4: Async Validation
                    </a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">
                        Scenario 5: Nested Forms
                    </a>
                </div>
            </nav>

            <main class="exercise-content">
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #10b981; text-decoration: none; font-size: 0.9rem; }
        h1 { margin: 0.5rem 0 0.25rem; color: #3b82f6; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; font-size: 1rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(59, 130, 246, 0.1); }
        .nav-section a.active { background: #3b82f6; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class ReactiveFormsPracticeComponent { }
