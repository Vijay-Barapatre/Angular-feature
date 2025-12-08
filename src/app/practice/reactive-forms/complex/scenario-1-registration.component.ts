/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: REGISTRATION FORM
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-scenario-1-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Complete Registration Form</h2>
                <p>Build a real-world registration form with step indicators.</p>
            </div>

            <div class="form-container">
                <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
                    <div class="form-section">
                        <h3>👤 Personal Information</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label>First Name *</label>
                                <input formControlName="firstName">
                            </div>
                            <div class="form-group">
                                <label>Last Name *</label>
                                <input formControlName="lastName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input formControlName="email" type="email">
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>🔐 Security</h3>
                        <div class="form-group">
                            <label>Password *</label>
                            <input formControlName="password" type="password">
                        </div>
                        <div class="form-group">
                            <label>Confirm Password *</label>
                            <input formControlName="confirmPassword" type="password">
                            @if (registrationForm.errors?.['passwordMismatch']) {
                                <span class="error-msg">Passwords do not match</span>
                            }
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>📋 Preferences</h3>
                        <label class="checkbox">
                            <input type="checkbox" formControlName="newsletter">
                            Subscribe to newsletter
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" formControlName="terms">
                            I agree to Terms and Conditions *
                        </label>
                    </div>

                    <button type="submit" [disabled]="registrationForm.invalid">
                        Create Account
                    </button>
                </form>

                <div class="form-summary">
                    <h4>Form Status</h4>
                    <p>Valid: {{ registrationForm.valid ? '✅' : '❌' }}</p>
                    <pre>{{ registrationForm.value | json }}</pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #3b82f6; }
        .form-container { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        form { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-section { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb; }
        .form-section h3 { margin: 0 0 1rem; font-size: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { margin-bottom: 0.75rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-size: 0.9rem; }
        .form-group input:not([type="checkbox"]) { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .checkbox { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; cursor: pointer; }
        .error-msg { color: #ef4444; font-size: 0.8rem; }
        button { width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; }
        .form-summary { background: #1e1e2e; padding: 1rem; border-radius: 8px; color: #a6e3a1; height: fit-content; }
        .form-summary h4 { color: white; margin: 0 0 0.5rem; }
        .form-summary pre { font-size: 0.75rem; margin: 0; overflow-x: auto; }
    `]
})
export class Scenario1RegistrationComponent {
    registrationForm;

    constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            newsletter: [false],
            terms: [false, Validators.requiredTrue]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    passwordMatchValidator(group: AbstractControl) {
        const password = group.get('password')?.value;
        const confirm = group.get('confirmPassword')?.value;
        return password === confirm ? null : { passwordMismatch: true };
    }

    onSubmit(): void {
        if (this.registrationForm.valid) {
            console.log('Registration:', this.registrationForm.value);
            alert('Registration successful!');
        }
    }
}
