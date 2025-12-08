/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: BUILT-IN VALIDATORS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-exercise-3-validators',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Built-in Validators</h2>
                <p>Use Angular's built-in validators for form validation.</p>
                
                <h4>Validators Available:</h4>
                <ul>
                    <li>Validators.required</li>
                    <li>Validators.minLength(n) / maxLength(n)</li>
                    <li>Validators.email</li>
                    <li>Validators.pattern(regex)</li>
                    <li>Validators.min(n) / max(n)</li>
                </ul>
            </div>

            <div class="demo">
                <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
                    <div class="form-group" [class.error]="showError('username')">
                        <label>Username *</label>
                        <input formControlName="username" placeholder="Min 3 characters">
                        @if (showError('username')) {
                            <span class="error-msg">
                                @if (signupForm.get('username')?.errors?.['required']) {
                                    Username is required
                                } @else if (signupForm.get('username')?.errors?.['minlength']) {
                                    Min 3 characters required
                                }
                            </span>
                        }
                    </div>

                    <div class="form-group" [class.error]="showError('email')">
                        <label>Email *</label>
                        <input formControlName="email" type="email" placeholder="Valid email">
                        @if (showError('email')) {
                            <span class="error-msg">Please enter a valid email</span>
                        }
                    </div>

                    <div class="form-group" [class.error]="showError('age')">
                        <label>Age *</label>
                        <input formControlName="age" type="number" placeholder="18-100">
                        @if (showError('age')) {
                            <span class="error-msg">Age must be between 18 and 100</span>
                        }
                    </div>

                    <div class="form-group" [class.error]="showError('website')">
                        <label>Website</label>
                        <input formControlName="website" placeholder="https://...">
                        @if (showError('website')) {
                            <span class="error-msg">Must start with https://</span>
                        }
                    </div>

                    <button type="submit" [disabled]="signupForm.invalid">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 500px; }
        .instructions { background: #eff6ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #3b82f6; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; }
        .form-group.error input { border-color: #ef4444; }
        .error-msg { color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem; display: block; }
        button { width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
    `]
})
export class Exercise3ValidatorsComponent {
    /**
     * TODO: Create form with validators
     * 
     * HINT:
     * new FormControl('', [Validators.required, Validators.minLength(3)])
     */
    signupForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        age: new FormControl(null, [
            Validators.required,
            Validators.min(18),
            Validators.max(100)
        ]),
        website: new FormControl('', [
            Validators.pattern(/^https:\/\/.*/)
        ])
    });

    showError(controlName: string): boolean {
        const control = this.signupForm.get(controlName);
        return control ? control.invalid && control.touched : false;
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            console.log('Form submitted:', this.signupForm.value);
            alert('Form is valid!');
        }
    }
}
