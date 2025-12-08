/**
 * ============================================================================
 * TEMPLATE FORMS PRACTICE - COMPLETE SECTION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

// ============================================================================
// OVERVIEW COMPONENT
// ============================================================================
@Component({
    selector: 'app-template-forms-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>📝 Template Forms Practice</h1>
                <p class="subtitle">Master template-driven forms with ngModel</p>
            </header>

            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: ngModel Binding</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Two-way Binding</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Form Validation</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Form Submission</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Contact Form</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: Survey Form</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Dynamic Fields</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Custom Validation</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: Form State</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #ec4899; text-decoration: none; font-size: 0.9rem; }
        h1 { margin: 0.5rem 0 0.25rem; color: #ec4899; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; font-size: 1rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(236, 72, 153, 0.1); }
        .nav-section a.active { background: #ec4899; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class TemplateFormsPracticeComponent { }

// ============================================================================
// BASIC EXERCISES
// ============================================================================
@Component({
    selector: 'app-tf-exercise-1',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: ngModel Binding</h2>
                <p>Basic two-way binding with ngModel.</p>
            </div>
            <div class="demo">
                <input [(ngModel)]="name" placeholder="Enter your name">
                <p>Hello, {{ name || 'stranger' }}!</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fdf2f8; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; margin-bottom: 1rem; }
    `]
})
export class TFExercise1Component { name = ''; }

@Component({
    selector: 'app-tf-exercise-2',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Two-way Binding</h2>
                <p>Synchronized binding between multiple inputs.</p>
            </div>
            <div class="demo">
                <input [(ngModel)]="value" placeholder="Type here...">
                <input [(ngModel)]="value" placeholder="Or here...">
                <p>Value: "{{ value }}"</p>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fdf2f8; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.5rem; }
    `]
})
export class TFExercise2Component { value = ''; }

@Component({
    selector: 'app-tf-exercise-3',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Form Validation</h2>
                <p>Template-driven validation with required, minlength, etc.</p>
            </div>
            <div class="demo">
                <form #myForm="ngForm">
                    <input name="email" ngModel required email #emailInput="ngModel" placeholder="Email">
                    @if (emailInput.invalid && emailInput.touched) {
                        <p class="error">Please enter a valid email!</p>
                    }
                    <p>Form valid: {{ myForm.valid }}</p>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fdf2f8; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.5rem; }
        .error { color: #ef4444; font-size: 0.9rem; margin: 0.25rem 0; }
    `]
})
export class TFExercise3Component { }

@Component({
    selector: 'app-tf-exercise-4',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Form Submission</h2>
                <p>Handle form submission with ngSubmit.</p>
            </div>
            <div class="demo">
                <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
                    <input name="message" ngModel required placeholder="Message">
                    <button type="submit" [disabled]="f.invalid">Submit</button>
                </form>
                @if (submitted()) {
                    <p class="success">Submitted: {{ submitted() | json }}</p>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fdf2f8; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ec4899; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ec4899; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .demo input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.5rem; }
        .demo button { padding: 0.75rem 1.5rem; background: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .demo button:disabled { opacity: 0.5; cursor: not-allowed; }
        .success { padding: 0.75rem; background: #dcfce7; border-radius: 6px; color: #16a34a; margin-top: 1rem; }
    `]
})
export class TFExercise4Component {
    submitted = signal<unknown>(null);
    onSubmit(value: unknown): void { this.submitted.set(value); }
}

// ============================================================================
// COMPLEX SCENARIOS
// ============================================================================
@Component({
    selector: 'app-tf-scenario-1',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Contact Form</h2>
                <p>Complete contact form with validation.</p>
            </div>
            <div class="content">
                <form #contactForm="ngForm" (ngSubmit)="submit(contactForm)">
                    <input name="name" ngModel required placeholder="Name">
                    <input name="email" ngModel required email placeholder="Email">
                    <textarea name="message" ngModel required placeholder="Message"></textarea>
                    <button type="submit" [disabled]="contactForm.invalid">Send</button>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        input, textarea { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.5rem; }
        textarea { min-height: 100px; }
        button { padding: 0.75rem 1.5rem; background: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; }
    `]
})
export class TFScenario1Component {
    submit(form: unknown): void { console.log('Form submitted:', form); }
}

@Component({ selector: 'app-tf-scenario-2', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 2: Survey Form</h2><p>Multi-step survey with radio buttons and checkboxes.</p></div><div class="content"><p>Build a survey with different input types.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class TFScenario2Component { }

@Component({ selector: 'app-tf-scenario-3', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 3: Dynamic Fields</h2><p>Add/remove form fields dynamically.</p></div><div class="content"><p>Create forms with variable number of inputs.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class TFScenario3Component { }

@Component({ selector: 'app-tf-scenario-4', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 4: Custom Validation</h2><p>Create custom validators for template forms.</p></div><div class="content"><p>Implement password matching, custom patterns, etc.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class TFScenario4Component { }

@Component({ selector: 'app-tf-scenario-5', standalone: true, imports: [CommonModule], template: `<div class="scenario"><div class="instructions"><h2>🟥 Scenario 5: Form State Management</h2><p>Track and display form state (pristine, dirty, touched).</p></div><div class="content"><p>Monitor form state changes and provide user feedback.</p></div></div>`, styles: [`.scenario { max-width: 800px; } .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; } .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; } .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }`] })
export class TFScenario5Component { }

// ============================================================================
// ROUTES
// ============================================================================
export const TEMPLATE_FORMS_PRACTICE_ROUTES: Routes = [
    {
        path: '',
        component: TemplateFormsPracticeComponent,
        children: [
            { path: 'basic/exercise-1', component: TFExercise1Component },
            { path: 'basic/exercise-2', component: TFExercise2Component },
            { path: 'basic/exercise-3', component: TFExercise3Component },
            { path: 'basic/exercise-4', component: TFExercise4Component },
            { path: 'complex/scenario-1', component: TFScenario1Component },
            { path: 'complex/scenario-2', component: TFScenario2Component },
            { path: 'complex/scenario-3', component: TFScenario3Component },
            { path: 'complex/scenario-4', component: TFScenario4Component },
            { path: 'complex/scenario-5', component: TFScenario5Component },
        ]
    }
];
