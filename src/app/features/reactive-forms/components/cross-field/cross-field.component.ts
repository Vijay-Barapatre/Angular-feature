/**
 * ============================================================================
 * CROSS-FIELD VALIDATION
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Sometimes validation depends on MULTIPLE fields. Password confirmation,
 * date ranges, quantity limits - these can't be validated in isolation.
 * Cross-field validators are applied at the FormGroup level!
 * 
 * KEY INSIGHT:
 * - Single-field validators: Applied to FormControl
 * - Cross-field validators: Applied to FormGroup (or parent group)
 * 
 * The validator receives the GROUP, so it can access ALL child controls.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';

/**
 * PASSWORD MATCH VALIDATOR
 * 
 * Validates that password and confirmPassword fields match.
 * Applied to the parent FormGroup, not individual controls.
 */
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    // Only validate if both fields have values
    if (!password || !confirmPassword) {
        return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
}

/**
 * DATE RANGE VALIDATOR
 * 
 * Validates that endDate is after startDate.
 */
function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (!startDate || !endDate) {
        return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return end > start ? null : { invalidDateRange: true };
}

/**
 * AGE CONSISTENCY VALIDATOR
 * 
 * Validates that if isAdult is checked, age must be >= 18.
 */
function ageConsistencyValidator(group: AbstractControl): ValidationErrors | null {
    const isAdult = group.get('isAdult')?.value;
    const age = group.get('age')?.value;

    if (isAdult && age && age < 18) {
        return { ageInconsistency: { claimedAdult: true, actualAge: age } };
    }

    return null;
}

@Component({
    selector: 'app-cross-field',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>🔗 Cross-Field Validation</h1>
            <p class="description">
                Validate fields that depend on each other: password match, date ranges, etc.
            </p>

            <form [formGroup]="accountForm" (ngSubmit)="onSubmit()" class="form">
                
                <!-- PASSWORD MATCHING EXAMPLE -->
                <div class="section">
                    <h3>🔐 Password Confirmation</h3>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            formControlName="password"
                            placeholder="Enter password">
                    </div>
                    
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            type="password" 
                            formControlName="confirmPassword"
                            placeholder="Confirm password"
                            [class.invalid]="accountForm.hasError('passwordMismatch') && accountForm.get('confirmPassword')?.touched">
                    </div>
                    
                    <!-- 
                        CROSS-FIELD ERROR DISPLAY:
                        Error is on the FORM, not the control!
                        Use form.hasError('errorKey') to check.
                    -->
                    @if (accountForm.hasError('passwordMismatch') && accountForm.get('confirmPassword')?.touched) {
                        <div class="error-banner">
                            ❌ Passwords do not match
                        </div>
                    }
                    @if (!accountForm.hasError('passwordMismatch') && accountForm.get('confirmPassword')?.valid && accountForm.get('confirmPassword')?.dirty) {
                        <div class="success-banner">
                            ✅ Passwords match!
                        </div>
                    }
                </div>

                <!-- DATE RANGE EXAMPLE -->
                <div class="section">
                    <h3>📅 Date Range</h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="startDate">Start Date</label>
                            <input 
                                id="startDate" 
                                type="date" 
                                formControlName="startDate">
                        </div>
                        
                        <div class="form-group">
                            <label for="endDate">End Date</label>
                            <input 
                                id="endDate" 
                                type="date" 
                                formControlName="endDate"
                                [class.invalid]="accountForm.hasError('invalidDateRange')">
                        </div>
                    </div>
                    
                    @if (accountForm.hasError('invalidDateRange')) {
                        <div class="error-banner">
                            ❌ End date must be after start date
                        </div>
                    }
                </div>

                <!-- AGE/ADULT CONSISTENCY EXAMPLE -->
                <div class="section">
                    <h3>👤 Age Verification</h3>
                    
                    <div class="form-group checkbox-group">
                        <label>
                            <input type="checkbox" formControlName="isAdult">
                            I confirm I am an adult (18+)
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label for="age">Your Age</label>
                        <input 
                            id="age" 
                            type="number" 
                            formControlName="age"
                            placeholder="Enter your age"
                            [class.invalid]="accountForm.hasError('ageInconsistency')">
                    </div>
                    
                    @if (accountForm.hasError('ageInconsistency')) {
                        <div class="error-banner">
                            ❌ You checked "adult" but entered age {{ accountForm.getError('ageInconsistency')?.actualAge }}
                        </div>
                    }
                </div>

                <button type="submit" class="submit-btn" [disabled]="accountForm.invalid">
                    Submit
                </button>
            </form>

            <!-- Form Errors Display -->
            <div class="form-state">
                <h3>📊 Form-Level Errors</h3>
                <pre>{{ accountForm.errors | json }}</pre>
                <p class="hint">
                    💡 Cross-field errors appear on the <strong>form</strong>, not individual controls.
                </p>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .section {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            border: 2px dashed #667eea;
        }

        .section h3 { margin-top: 0; color: #667eea; }

        .form-group { margin-bottom: 1rem; }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }

        .form-group input[type="text"],
        .form-group input[type="password"],
        .form-group input[type="date"],
        .form-group input[type="number"] {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
        }

        .form-group input:focus { outline: none; border-color: #667eea; }
        .form-group input.invalid { border-color: #ef4444; background: #fef2f2; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        .checkbox-group label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: normal;
            cursor: pointer;
        }

        .error-banner {
            background: #fee2e2;
            color: #b91c1c;
            padding: 0.75rem;
            border-radius: 6px;
            margin-top: 0.5rem;
        }

        .success-banner {
            background: #dcfce7;
            color: #166534;
            padding: 0.75rem;
            border-radius: 6px;
            margin-top: 0.5rem;
        }

        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
        }

        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .form-state {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
        }

        .form-state h3 { margin-top: 0; color: #1a1a2e; }
        .form-state pre {
            background: #1a1a2e;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
        }

        .hint { 
            background: #e0f2fe; 
            padding: 0.75rem; 
            border-radius: 6px; 
            color: #0369a1; 
            margin-top: 1rem; 
        }
    `]
})
export class CrossFieldComponent implements OnInit {
    accountForm!: FormGroup;

    ngOnInit(): void {
        /**
         * APPLYING CROSS-FIELD VALIDATORS
         * 
         * Cross-field validators are applied to the FormGroup.
         * They receive the entire group and can access all children.
         * 
         * Two ways to apply:
         * 1. In constructor: new FormGroup({...}, validators)
         * 2. In options: new FormGroup({...}, { validators: [...] })
         */
        this.accountForm = new FormGroup({
            // Password fields
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl('', Validators.required),

            // Date fields
            startDate: new FormControl(''),
            endDate: new FormControl(''),

            // Age fields
            isAdult: new FormControl(false),
            age: new FormControl(null)
        }, {
            // 🛡️ CRITICAL: Validators here are cross-field (group-level)
            validators: [
                passwordMatchValidator,
                dateRangeValidator,
                ageConsistencyValidator
            ]
        });
    }

    onSubmit(): void {
        if (this.accountForm.valid) {
            console.log('✅ Form is valid!');
            console.log('Form Value:', this.accountForm.value);
        } else {
            console.log('Form Errors:', this.accountForm.errors);
            this.accountForm.markAllAsTouched();
        }
    }
}
