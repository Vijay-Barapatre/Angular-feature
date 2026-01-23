/**
 * ============================================================================
 * BUILT-IN VALIDATORS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Validation is the gatekeeper of your forms. Angular provides a rich set of
 * built-in validators that handle most common validation scenarios out of the box.
 * 
 * BUILT-IN VALIDATORS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Validator               │  Use Case                                   │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  Validators.required     │  Field must have a value                    │
 * │  Validators.minLength(n) │  Minimum character count                    │
 * │  Validators.maxLength(n) │  Maximum character count                    │
 * │  Validators.min(n)       │  Minimum numeric value                      │
 * │  Validators.max(n)       │  Maximum numeric value                      │
 * │  Validators.email        │  Must be valid email format                 │
 * │  Validators.pattern(re)  │  Must match regex pattern                   │
 * │  Validators.requiredTrue │  Checkbox must be checked                   │
 * │  Validators.nullValidator│  No-op (always valid)                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * VALIDATION FLOW:
 * User types → Validator runs → Errors object populated → UI updates
 * 
 * ERROR OBJECT STRUCTURE:
 * { required: true }           // Field is empty
 * { minlength: { requiredLength: 3, actualLength: 2 } }
 * { email: true }              // Invalid email format
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-built-in-validators',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>✅ Built-in Validators</h1>
            <p class="description">
                Master Angular's built-in validators: required, minLength, maxLength, email, pattern, and more.
            </p>

            <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()" class="form">
                
                <!-- 
                    USERNAME: required + minLength + maxLength
                    Demonstrates combining multiple validators
                -->
                <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                        id="username" 
                        type="text" 
                        formControlName="username"
                        placeholder="3-20 characters"
                        [class.invalid]="isInvalid('username')">
                    
                    <!-- 
                        ERROR DISPLAY PATTERN:
                        Show errors only if:
                        1. Control is invalid AND
                        2. Control is dirty (user changed it) OR touched (user focused and left)
                    -->
                    @if (isInvalid('username')) {
                        <div class="error-messages">
                            @if (getErrors('username')?.['required']) {
                                <span class="error">Username is required</span>
                            }
                            @if (getErrors('username')?.['minlength']) {
                                <span class="error">
                                    Minimum {{ getErrors('username')?.['minlength'].requiredLength }} characters 
                                    (you have {{ getErrors('username')?.['minlength'].actualLength }})
                                </span>
                            }
                            @if (getErrors('username')?.['maxlength']) {
                                <span class="error">
                                    Maximum {{ getErrors('username')?.['maxlength'].requiredLength }} characters
                                </span>
                            }
                        </div>
                    }
                </div>

                <!-- 
                    EMAIL: required + email validator
                    Angular's email validator checks for valid email format
                -->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        formControlName="email"
                        placeholder="your@email.com"
                        [class.invalid]="isInvalid('email')">
                    
                    @if (isInvalid('email')) {
                        <div class="error-messages">
                            @if (getErrors('email')?.['required']) {
                                <span class="error">Email is required</span>
                            }
                            @if (getErrors('email')?.['email']) {
                                <span class="error">Please enter a valid email address</span>
                            }
                        </div>
                    }
                </div>

                <!-- 
                    AGE: min + max (numeric validators)
                    Validates the numeric value, not string length
                -->
                <div class="form-group">
                    <label for="age">Age</label>
                    <input 
                        id="age" 
                        type="number" 
                        formControlName="age"
                        placeholder="18-120"
                        [class.invalid]="isInvalid('age')">
                    
                    @if (isInvalid('age')) {
                        <div class="error-messages">
                            @if (getErrors('age')?.['required']) {
                                <span class="error">Age is required</span>
                            }
                            @if (getErrors('age')?.['min']) {
                                <span class="error">Must be at least {{ getErrors('age')?.['min'].min }}</span>
                            }
                            @if (getErrors('age')?.['max']) {
                                <span class="error">Must be at most {{ getErrors('age')?.['max'].max }}</span>
                            }
                        </div>
                    }
                </div>

                <!-- 
                    PHONE: pattern (regex validator)
                    Uses regex to validate format
                -->
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input 
                        id="phone" 
                        type="tel" 
                        formControlName="phone"
                        placeholder="XXX-XXX-XXXX"
                        [class.invalid]="isInvalid('phone')">
                    
                    @if (isInvalid('phone')) {
                        <div class="error-messages">
                            @if (getErrors('phone')?.['pattern']) {
                                <span class="error">Format: XXX-XXX-XXXX</span>
                            }
                        </div>
                    }
                </div>

                <!-- 
                    PASSWORD: required + minLength + pattern
                    Complex validation with multiple rules
                -->
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        id="password" 
                        type="password" 
                        formControlName="password"
                        placeholder="8+ chars, uppercase, number"
                        [class.invalid]="isInvalid('password')">
                    
                    @if (isInvalid('password')) {
                        <div class="error-messages">
                            @if (getErrors('password')?.['required']) {
                                <span class="error">Password is required</span>
                            }
                            @if (getErrors('password')?.['minlength']) {
                                <span class="error">At least 8 characters required</span>
                            }
                            @if (getErrors('password')?.['pattern']) {
                                <span class="error">Need uppercase letter and number</span>
                            }
                        </div>
                    }
                </div>

                <!-- 
                    TERMS: requiredTrue
                    For checkboxes that must be checked
                -->
                <div class="form-group checkbox-group">
                    <label>
                        <input 
                            type="checkbox" 
                            formControlName="acceptTerms">
                        I accept the terms and conditions
                    </label>
                    
                    @if (isInvalid('acceptTerms')) {
                        <div class="error-messages">
                            <span class="error">You must accept the terms</span>
                        </div>
                    }
                </div>

                <button type="submit" class="submit-btn" [disabled]="registrationForm.invalid">
                    Register
                </button>
            </form>

            <!-- Form Status -->
            <div class="form-state">
                <h3>📊 Form Status</h3>
                <div class="status-grid">
                    <div class="status-item">
                        <span class="label">Valid:</span>
                        <span [class.yes]="registrationForm.valid" [class.no]="!registrationForm.valid">
                            {{ registrationForm.valid ? '✅' : '❌' }}
                        </span>
                    </div>
                    <div class="status-item">
                        <span class="label">Dirty:</span>
                        <span>{{ registrationForm.dirty ? '✅' : '❌' }}</span>
                    </div>
                    <div class="status-item">
                        <span class="label">Touched:</span>
                        <span>{{ registrationForm.touched ? '✅' : '❌' }}</span>
                    </div>
                </div>
            </div>

            <!-- Validators Reference -->
            <div class="reference">
                <h3>📚 Built-in Validators Reference</h3>
                <table>
                    <tr>
                        <th>Validator</th>
                        <th>Error Key</th>
                        <th>Error Value</th>
                    </tr>
                    <tr>
                        <td><code>Validators.required</code></td>
                        <td><code>required</code></td>
                        <td><code>true</code></td>
                    </tr>
                    <tr>
                        <td><code>Validators.minLength(3)</code></td>
                        <td><code>minlength</code></td>
                        <td><code>{{ '{' }} requiredLength, actualLength {{ '}' }}</code></td>
                    </tr>
                    <tr>
                        <td><code>Validators.email</code></td>
                        <td><code>email</code></td>
                        <td><code>true</code></td>
                    </tr>
                    <tr>
                        <td><code>Validators.min(18)</code></td>
                        <td><code>min</code></td>
                        <td><code>{{ '{' }} min, actual {{ '}' }}</code></td>
                    </tr>
                    <tr>
                        <td><code>Validators.pattern(/regex/)</code></td>
                        <td><code>pattern</code></td>
                        <td><code>{{ '{' }} requiredPattern, actualValue {{ '}' }}</code></td>
                    </tr>
                </table>
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

        .form-group { margin-bottom: 1.5rem; }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="number"],
        .form-group input[type="tel"],
        .form-group input[type="password"] {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus { outline: none; border-color: #667eea; }
        .form-group input.invalid { border-color: #ef4444; background: #fef2f2; }

        .checkbox-group label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: normal;
            cursor: pointer;
        }

        .checkbox-group input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }

        .error-messages { margin-top: 0.5rem; }
        .error {
            display: block;
            color: #ef4444;
            font-size: 0.85rem;
            margin-bottom: 0.25rem;
        }

        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .form-state, .reference {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }

        .form-state h3, .reference h3 { margin-top: 0; color: #1a1a2e; }

        .status-grid {
            display: flex;
            gap: 2rem;
        }

        .status-item {
            display: flex;
            gap: 0.5rem;
        }

        .status-item .label { font-weight: 600; }
        .status-item .yes { color: #10b981; }
        .status-item .no { color: #ef4444; }

        .reference table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        .reference th, .reference td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }

        .reference th { background: #667eea; color: white; }
        .reference code { background: #e0e0e0; padding: 0.2rem 0.5rem; border-radius: 4px; }
    `]
})
export class BuiltInValidatorsComponent implements OnInit {
    registrationForm!: FormGroup;

    ngOnInit(): void {
        /**
         * APPLYING VALIDATORS
         * 
         * Validators are passed as the second argument to FormControl.
         * - Single validator: new FormControl('', Validators.required)
         * - Multiple validators: new FormControl('', [V1, V2, V3])
         */
        this.registrationForm = new FormGroup({
            /**
             * USERNAME VALIDATION
             * - Required
             * - Minimum 3 characters
             * - Maximum 20 characters
             */
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20)
            ]),

            /**
             * EMAIL VALIDATION
             * - Required
             * - Must be valid email format
             * 
             * Note: Validators.email is a simple check. For stricter validation,
             * use a custom validator or Validators.pattern with a regex.
             */
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),

            /**
             * AGE VALIDATION
             * - Required
             * - Minimum value: 18
             * - Maximum value: 120
             * 
             * Note: min/max validate NUMERIC values, not string length!
             */
            age: new FormControl(null, [
                Validators.required,
                Validators.min(18),
                Validators.max(120)
            ]),

            /**
             * PHONE VALIDATION
             * - Pattern: XXX-XXX-XXXX
             * 
             * Validators.pattern accepts a string or RegExp.
             * The pattern is anchored (^ and $ are implied).
             */
            phone: new FormControl('', [
                Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)
            ]),

            /**
             * PASSWORD VALIDATION
             * - Required
             * - Minimum 8 characters
             * - Pattern: Must contain uppercase letter and number
             * 
             * Complex patterns can enforce strong passwords.
             */
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                // At least one uppercase and one digit
                Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
            ]),

            /**
             * ACCEPT TERMS VALIDATION
             * - Must be true (checked)
             * 
             * Validators.requiredTrue is for boolean checkboxes.
             * Unlike required, it specifically checks for `true` value.
             */
            acceptTerms: new FormControl(false, [
                Validators.requiredTrue
            ])
        });
    }

    /**
     * HELPER: Check if control is invalid and should show errors
     * 
     * Only show errors if:
     * 1. Control is invalid
     * 2. Control is dirty (user changed it) OR touched (user focused and left)
     * 
     * This prevents showing errors on initial load.
     */
    isInvalid(controlName: string): boolean {
        const control = this.registrationForm.get(controlName);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    /**
     * HELPER: Get errors object for a control
     * 
     * Returns null if no errors, otherwise returns the errors object.
     * Example: { required: true, minlength: { requiredLength: 3, actualLength: 2 } }
     */
    getErrors(controlName: string) {
        return this.registrationForm.get(controlName)?.errors;
    }

    onSubmit(): void {
        if (this.registrationForm.valid) {
            console.log('✅ Form is valid!');
            console.log('Form Value:', this.registrationForm.value);
        } else {
            console.log('❌ Form is invalid');
            // Mark all controls as touched to show errors
            this.registrationForm.markAllAsTouched();
        }
    }
}
