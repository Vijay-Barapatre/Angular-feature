/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: CUSTOM VALIDATORS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * TODO: Create custom validator function
 * 
 * Custom validators are functions that take a control and return
 * null (valid) or an error object (invalid)
 */
function forbiddenWords(forbidden: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;

        const hasForbidden = forbidden.some(word =>
            control.value.toLowerCase().includes(word.toLowerCase())
        );

        return hasForbidden ? { forbiddenWord: true } : null;
    };
}

function strongPassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    const isLongEnough = value.length >= 8;

    const errors: ValidationErrors = {};

    if (!hasUppercase) errors['noUppercase'] = true;
    if (!hasLowercase) errors['noLowercase'] = true;
    if (!hasNumber) errors['noNumber'] = true;
    if (!hasSpecial) errors['noSpecial'] = true;
    if (!isLongEnough) errors['tooShort'] = true;

    return Object.keys(errors).length > 0 ? errors : null;
}

@Component({
    selector: 'app-exercise-4-custom',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Custom Validators</h2>
                <p>Create your own validation logic.</p>
            </div>

            <div class="demo">
                <form [formGroup]="customForm">
                    <div class="form-group" [class.error]="showError('username')">
                        <label>Username (no bad words)</label>
                        <input formControlName="username" placeholder="Enter username">
                        @if (showError('username') && customForm.get('username')?.errors?.['forbiddenWord']) {
                            <span class="error-msg">Username contains forbidden word</span>
                        }
                    </div>

                    <div class="form-group" [class.error]="showError('password')">
                        <label>Password (strong required)</label>
                        <input formControlName="password" type="password" placeholder="Enter password">
                        
                        <div class="password-requirements">
                            <span [class.met]="!passwordErrors?.['tooShort']">✓ 8+ characters</span>
                            <span [class.met]="!passwordErrors?.['noUppercase']">✓ Uppercase</span>
                            <span [class.met]="!passwordErrors?.['noLowercase']">✓ Lowercase</span>
                            <span [class.met]="!passwordErrors?.['noNumber']">✓ Number</span>
                            <span [class.met]="!passwordErrors?.['noSpecial']">✓ Special char</span>
                        </div>
                    </div>

                    <button type="submit" [disabled]="customForm.invalid">
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
        .error-msg { color: #ef4444; font-size: 0.8rem; }
        .password-requirements { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .password-requirements span { font-size: 0.75rem; color: #ef4444; padding: 0.25rem 0.5rem; background: #fee2e2; border-radius: 4px; }
        .password-requirements span.met { color: #10b981; background: #dcfce7; }
        button { width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 1rem; }
        button:disabled { opacity: 0.5; }
    `]
})
export class Exercise4CustomComponent {
    customForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            forbiddenWords(['admin', 'root', 'test'])
        ]),
        password: new FormControl('', [
            Validators.required,
            strongPassword
        ])
    });

    get passwordErrors() {
        return this.customForm.get('password')?.errors;
    }

    showError(controlName: string): boolean {
        const control = this.customForm.get(controlName);
        return control ? control.invalid && control.touched : false;
    }
}
