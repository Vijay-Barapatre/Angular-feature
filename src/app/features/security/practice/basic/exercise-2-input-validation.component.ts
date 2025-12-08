/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: SECURE INPUT VALIDATION
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Create reusable validators that prevent injection attacks and
 * enforce secure input patterns.
 * 
 * 📝 DESCRIPTION:
 * You are building a user registration form that must validate:
 * - Username: alphanumeric only, no special chars (SQL injection prevention)
 * - Email: valid format, no script injection
 * - Password: strong password requirements
 * - Bio: limited HTML, no scripts
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Username rejects special characters and SQL keywords
 * 2. Email validates format and rejects javascript: protocol
 * 3. Password enforces complexity rules
 * 4. Form shows real-time validation feedback
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Complete the noSqlInjection validator
 * - Complete the secureEmail validator
 * - Complete the strongPassword validator
 * - Wire up validators to the form
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';

@Component({
    selector: 'app-exercise-input-validation',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="exercise-container">
            <h2>📝 Exercise 2: Secure Input Validation</h2>
            
            <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" formControlName="username" placeholder="alphanumeric only">
                    <div class="error" *ngIf="registrationForm.get('username')?.touched && registrationForm.get('username')?.invalid">
                        <span *ngIf="registrationForm.get('username')?.errors?.['required']">Username is required</span>
                        <span *ngIf="registrationForm.get('username')?.errors?.['pattern']">Only letters and numbers allowed</span>
                        <span *ngIf="registrationForm.get('username')?.errors?.['sqlInjection']">
                            ⚠️ Potential SQL injection detected!
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" formControlName="email" placeholder="your@email.com">
                    <div class="error" *ngIf="registrationForm.get('email')?.touched && registrationForm.get('email')?.invalid">
                        <span *ngIf="registrationForm.get('email')?.errors?.['required']">Email is required</span>
                        <span *ngIf="registrationForm.get('email')?.errors?.['email']">Invalid email format</span>
                        <span *ngIf="registrationForm.get('email')?.errors?.['insecureEmail']">
                            ⚠️ Potentially malicious email detected!
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" formControlName="password" placeholder="Strong password">
                    <div class="password-strength" *ngIf="registrationForm.get('password')?.value">
                        <div class="strength-bar" [style.width.%]="passwordStrength" 
                             [class.weak]="passwordStrength < 40"
                             [class.medium]="passwordStrength >= 40 && passwordStrength < 70"
                             [class.strong]="passwordStrength >= 70"></div>
                    </div>
                    <div class="error" *ngIf="registrationForm.get('password')?.touched && registrationForm.get('password')?.invalid">
                        <span *ngIf="registrationForm.get('password')?.errors?.['required']">Password is required</span>
                        <span *ngIf="registrationForm.get('password')?.errors?.['weakPassword']">
                            Password must have: uppercase, lowercase, number, special char
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Bio (optional)</label>
                    <textarea formControlName="bio" placeholder="Tell us about yourself" rows="3"></textarea>
                </div>

                <button type="submit" [disabled]="registrationForm.invalid">
                    Register Securely
                </button>
            </form>

            <div class="result" *ngIf="submittedData">
                <h4>✅ Validated & Sanitized Data:</h4>
                <pre>{{ submittedData | json }}</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 500px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 0.5rem; }
        
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input, .form-group textarea { 
            width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; 
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        
        .error { color: #dc2626; font-size: 0.85rem; margin-top: 0.25rem; }
        
        .password-strength { height: 4px; background: #e5e7eb; border-radius: 2px; margin-top: 0.5rem; overflow: hidden; }
        .strength-bar { height: 100%; transition: width 0.3s, background 0.3s; }
        .strength-bar.weak { background: #ef4444; }
        .strength-bar.medium { background: #f59e0b; }
        .strength-bar.strong { background: #10b981; }
        
        button { width: 100%; padding: 0.875rem; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        button:hover:not(:disabled) { background: #059669; }
        
        .result { margin-top: 1.5rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; }
        .result pre { margin: 0.5rem 0 0; font-size: 0.85rem; }
    `]
})
export class ExerciseInputValidationComponent {
    registrationForm: FormGroup;
    submittedData: any = null;
    passwordStrength = 0;

    constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group({
            username: ['', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9_]+$/),
                this.noSqlInjection
            ]],
            email: ['', [
                Validators.required,
                Validators.email,
                this.secureEmail
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                this.strongPassword
            ]],
            bio: ['']
        });

        // Watch password changes for strength meter
        this.registrationForm.get('password')?.valueChanges.subscribe(value => {
            this.passwordStrength = this.calculatePasswordStrength(value || '');
        });
    }

    /**
     * TODO: Implement this validator
     * 
     * This validator should detect SQL injection patterns:
     * - SQL keywords: SELECT, INSERT, UPDATE, DELETE, DROP, UNION, --
     * - Special patterns: ' OR ', '; --', '1=1'
     * 
     * Return { sqlInjection: true } if dangerous pattern found
     * Return null if input is safe
     */
    noSqlInjection(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';

        // TODO: Write your logic here
        // HINT: Create regex patterns for SQL keywords
        // const sqlPatterns = [
        //     /SELECT\s/i,
        //     /INSERT\s/i,
        //     /UPDATE\s/i,
        //     ...
        // ];

        // Check each pattern and return error if found

        return null; // Replace with your implementation
    }

    /**
     * TODO: Implement this validator
     * 
     * This validator should detect potentially malicious emails:
     * - Contains 'javascript:' protocol
     * - Contains script tags
     * - Contains encoded characters that could be scripts
     * 
     * Return { insecureEmail: true } if dangerous pattern found
     * Return null if input is safe
     */
    secureEmail(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';

        // TODO: Write your logic here
        // HINT: Check for dangerous patterns in email
        // - /javascript:/i
        // - /<script/i
        // - /%3Cscript/i (URL encoded)

        return null; // Replace with your implementation
    }

    /**
     * TODO: Implement this validator
     * 
     * Strong password requirements:
     * - At least one uppercase letter
     * - At least one lowercase letter
     * - At least one number
     * - At least one special character (!@#$%^&*)
     * - Minimum 8 characters (handled by Validators.minLength)
     * 
     * Return { weakPassword: true } if requirements not met
     * Return null if password is strong
     */
    strongPassword(control: AbstractControl): ValidationErrors | null {
        const value = control.value || '';

        // TODO: Write your logic here
        // const hasUpperCase = /[A-Z]/.test(value);
        // const hasLowerCase = /[a-z]/.test(value);
        // const hasNumber = /[0-9]/.test(value);
        // const hasSpecialChar = /[!@#$%^&*]/.test(value);

        // if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        //     return null;
        // }
        // return { weakPassword: true };

        return null; // Replace with your implementation
    }

    /**
     * TODO: Implement password strength calculator
     * 
     * Calculate strength as percentage (0-100):
     * - Length > 8: +20
     * - Length > 12: +10
     * - Has uppercase: +15
     * - Has lowercase: +15
     * - Has number: +15
     * - Has special char: +15
     * - Has multiple special chars: +10
     */
    calculatePasswordStrength(password: string): number {
        // TODO: Write your logic here
        let strength = 0;

        // Add points based on criteria

        return Math.min(100, strength); // Cap at 100
    }

    onSubmit(): void {
        if (this.registrationForm.valid) {
            this.submittedData = this.registrationForm.value;
        }
    }
}
