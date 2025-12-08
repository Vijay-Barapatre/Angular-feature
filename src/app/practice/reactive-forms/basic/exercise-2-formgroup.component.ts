/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: FORMGROUP
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-exercise-2-formgroup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: FormGroup</h2>
                <p>Group multiple FormControls together.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Create a FormGroup with multiple controls</li>
                    <li>Bind to form element with [formGroup]</li>
                    <li>Use formControlName for inputs</li>
                    <li>Access form values and state</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 User Profile Form</h3>
                
                <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label>First Name:</label>
                        <input formControlName="firstName" placeholder="First name">
                    </div>

                    <div class="form-group">
                        <label>Last Name:</label>
                        <input formControlName="lastName" placeholder="Last name">
                    </div>

                    <div class="form-group">
                        <label>Email:</label>
                        <input formControlName="email" type="email" placeholder="Email">
                    </div>

                    <div class="form-group">
                        <label>Age:</label>
                        <input formControlName="age" type="number" placeholder="Age">
                    </div>

                    <div class="form-actions">
                        <button type="submit">Submit</button>
                        <button type="button" (click)="profileForm.reset()">Reset</button>
                        <button type="button" (click)="patchValues()">Patch Values</button>
                    </div>
                </form>

                <div class="state-panel">
                    <h4>Form State:</h4>
                    <pre>{{ profileForm.value | json }}</pre>
                    <p>Valid: {{ profileForm.valid ? '✅' : '❌' }}</p>
                    <p>Dirty: {{ profileForm.dirty ? 'Yes' : 'No' }}</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #eff6ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #3b82f6; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; }
        .form-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
        .form-actions button { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; }
        .form-actions button[type="submit"] { background: #3b82f6; color: white; }
        .form-actions button[type="button"] { background: #e5e7eb; }
        .state-panel { margin-top: 1.5rem; padding: 1rem; background: #1e1e2e; border-radius: 8px; color: #a6e3a1; }
        .state-panel h4 { color: white; margin: 0 0 0.5rem; }
        .state-panel pre { margin: 0 0 0.5rem; }
    `]
})
export class Exercise2FormGroupComponent {
    /**
     * TODO: Create FormGroup with controls
     * 
     * HINT:
     * profileForm = new FormGroup({
     *     firstName: new FormControl(''),
     *     lastName: new FormControl(''),
     *     ...
     * });
     */
    profileForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        age: new FormControl(null)
    });

    /**
     * TODO: Handle form submission
     */
    onSubmit(): void {
        console.log('Form submitted:', this.profileForm.value);
        alert('Form submitted! Check console.');
    }

    /**
     * TODO: Patch some values
     * 
     * patchValue updates only specified controls
     * setValue requires all controls
     */
    patchValues(): void {
        this.profileForm.patchValue({
            firstName: 'John',
            lastName: 'Doe'
        });
    }
}
