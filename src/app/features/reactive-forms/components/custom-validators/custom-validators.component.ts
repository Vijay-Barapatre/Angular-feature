/**
 * ============================================================================
 * CUSTOM VALIDATORS (SYNC & ASYNC)
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Built-in validators cover common cases, but business logic often requires
 * custom validation. Angular allows you to create your own validators!
 * 
 * TWO TYPES OF CUSTOM VALIDATORS:
 * 
 * 1. SYNCHRONOUS VALIDATORS
 *    - Run immediately when value changes
 *    - Return ValidationErrors or null
 *    - Example: "No spaces in username"
 * 
 * 2. ASYNCHRONOUS VALIDATORS
 *    - Return Observable or Promise
 *    - Used for server-side checks (is username taken?)
 *    - Run AFTER sync validators pass
 *    - Have pending state while checking
 * 
 * VALIDATOR SIGNATURE:
 * (control: AbstractControl) => ValidationErrors | null
 * 
 * ValidationErrors is just an object: { errorKey: errorValue }
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
    AsyncValidatorFn
} from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

// ============================================================================
// CUSTOM SYNC VALIDATORS
// ============================================================================

/**
 * NO WHITESPACE VALIDATOR
 * 
 * Rejects values that contain any whitespace.
 * 
 * @param control The form control to validate
 * @returns null if valid, { noWhitespace: true } if invalid
 */
function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    // Check if value contains whitespace
    const hasWhitespace = /\s/.test(control.value);

    // Return null = valid, object = invalid
    return hasWhitespace ? { noWhitespace: true } : null;
}

/**
 * FORBIDDEN NAME VALIDATOR (Factory Pattern)
 * 
 * Creates a validator that rejects specific names.
 * Uses factory pattern to allow configuration.
 * 
 * @param forbiddenNames Array of names to reject
 * @returns Validator function
 */
function forbiddenNameValidator(forbiddenNames: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null; // Don't validate empty

        const isForbidden = forbiddenNames
            .map(n => n.toLowerCase())
            .includes(control.value.toLowerCase());

        return isForbidden ? { forbiddenName: { value: control.value } } : null;
    };
}

/**
 * STRONG PASSWORD VALIDATOR
 * 
 * Checks multiple password requirements and returns detailed errors.
 * More user-friendly than a single pattern validator.
 */
function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) {
        errors['noUppercase'] = true;
    }
    if (!/[a-z]/.test(value)) {
        errors['noLowercase'] = true;
    }
    if (!/[0-9]/.test(value)) {
        errors['noNumber'] = true;
    }
    if (!/[!@#$%^&*]/.test(value)) {
        errors['noSpecial'] = true;
    }

    // Return null if no errors, otherwise return errors object
    return Object.keys(errors).length ? errors : null;
}

// ============================================================================
// CUSTOM ASYNC VALIDATORS
// ============================================================================

/**
 * USERNAME AVAILABILITY VALIDATOR (Async)
 * 
 * Simulates checking if username is available via API.
 * In real app, this would call an HTTP service.
 * 
 * IMPORTANT: Async validators return Observable<ValidationErrors | null>
 */
function usernameAvailabilityValidator(): AsyncValidatorFn {
    // Simulated taken usernames
    const takenUsernames = ['admin', 'root', 'system', 'user'];

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null); // Don't validate empty
        }

        // Simulate API delay (500ms)
        return of(control.value).pipe(
            delay(500), // Simulate network delay
            map(username => {
                const isTaken = takenUsernames.includes(username.toLowerCase());
                return isTaken ? { usernameTaken: true } : null;
            })
        );
    };
}

@Component({
    selector: 'app-custom-validators',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>🛡️ Custom Validators</h1>
            <p class="description">
                Create sync and async validators for custom business logic.
            </p>

            <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="form">
                
                <!-- 
                    USERNAME: Custom sync + async validators
                    Demonstrates both validator types on one field
                -->
                <div class="form-group">
                    <label for="username">
                        Username
                        @if (signupForm.get('username')?.pending) {
                            <span class="checking">⏳ Checking availability...</span>
                        }
                    </label>
                    <input 
                        id="username" 
                        type="text" 
                        formControlName="username"
                        placeholder="No spaces, must be unique"
                        [class.invalid]="isInvalid('username')"
                        [class.valid]="isValid('username')">
                    
                    @if (isInvalid('username')) {
                        <div class="error-messages">
                            @if (getErrors('username')?.['required']) {
                                <span class="error">Username is required</span>
                            }
                            @if (getErrors('username')?.['noWhitespace']) {
                                <span class="error">Username cannot contain spaces</span>
                            }
                            @if (getErrors('username')?.['forbiddenName']) {
                                <span class="error">
                                    "{{ getErrors('username')?.['forbiddenName'].value }}" is not allowed
                                </span>
                            }
                            @if (getErrors('username')?.['usernameTaken']) {
                                <span class="error">This username is already taken</span>
                            }
                        </div>
                    }
                    @if (isValid('username')) {
                        <span class="success">✅ Username is available!</span>
                    }
                </div>

                <!-- 
                    PASSWORD: Strong password validator with detailed feedback
                -->
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        id="password" 
                        type="password" 
                        formControlName="password"
                        placeholder="Strong password required"
                        [class.invalid]="isInvalid('password')">
                    
                    <!-- Password Strength Checklist -->
                    <div class="password-requirements">
                        <span [class.met]="!getErrors('password')?.['noUppercase']">
                            {{ !getErrors('password')?.['noUppercase'] ? '✅' : '❌' }} Uppercase letter
                        </span>
                        <span [class.met]="!getErrors('password')?.['noLowercase']">
                            {{ !getErrors('password')?.['noLowercase'] ? '✅' : '❌' }} Lowercase letter
                        </span>
                        <span [class.met]="!getErrors('password')?.['noNumber']">
                            {{ !getErrors('password')?.['noNumber'] ? '✅' : '❌' }} Number
                        </span>
                        <span [class.met]="!getErrors('password')?.['noSpecial']">
                            {{ !getErrors('password')?.['noSpecial'] ? '✅' : '❌' }} Special char (!&#64;#$%^&*)
                        </span>
                    </div>
                </div>

                <!-- 
                    EMAIL: With async "uniqueness" check
                -->
                <div class="form-group">
                    <label for="email">
                        Email
                        @if (signupForm.get('email')?.pending) {
                            <span class="checking">⏳ Verifying...</span>
                        }
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        formControlName="email"
                        placeholder="your@email.com"
                        [class.invalid]="isInvalid('email')"
                        [class.valid]="isValid('email')">
                    
                    @if (isInvalid('email')) {
                        <div class="error-messages">
                            @if (getErrors('email')?.['required']) {
                                <span class="error">Email is required</span>
                            }
                            @if (getErrors('email')?.['email']) {
                                <span class="error">Invalid email format</span>
                            }
                            @if (getErrors('email')?.['emailTaken']) {
                                <span class="error">This email is already registered</span>
                            }
                        </div>
                    }
                </div>

                <button 
                    type="submit" 
                    class="submit-btn" 
                    [disabled]="signupForm.invalid || signupForm.pending">
                    @if (signupForm.pending) {
                        Validating...
                    } @else {
                        Sign Up
                    }
                </button>
            </form>

            <!-- Validator Code Reference -->
            <div class="reference">
                <h3>📚 Custom Validator Patterns</h3>
                
                <div class="code-example">
                    <h4>Sync Validator</h4>
                    <pre>function noWhitespace(control): ValidationErrors | null {{ '{' }}
  return /\\s/.test(control.value) 
    ? {{ '{' }} noWhitespace: true {{ '}' }} 
    : null;
{{ '}' }}</pre>
                </div>

                <div class="code-example">
                    <h4>Async Validator</h4>
                    <pre>function checkUsername(): AsyncValidatorFn {{ '{' }}
  return (control) => {{ '{' }}
    return http.get('/check/' + control.value).pipe(
      map(exists => exists ? {{ '{' }} taken: true {{ '}' }} : null)
    );
  {{ '}' }};
{{ '}' }}</pre>
                </div>
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
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }

        .checking {
            font-size: 0.85rem;
            color: #667eea;
            font-weight: normal;
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }

        .form-group input:focus { outline: none; border-color: #667eea; }
        .form-group input.invalid { border-color: #ef4444; background: #fef2f2; }
        .form-group input.valid { border-color: #10b981; background: #ecfdf5; }

        .error-messages { margin-top: 0.5rem; }
        .error { display: block; color: #ef4444; font-size: 0.85rem; margin-bottom: 0.25rem; }
        .success { display: block; color: #10b981; font-size: 0.85rem; margin-top: 0.5rem; }

        .password-requirements {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            margin-top: 0.75rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .password-requirements span {
            font-size: 0.85rem;
            color: #ef4444;
        }

        .password-requirements span.met { color: #10b981; }

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

        .reference {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
        }

        .reference h3 { margin-top: 0; color: #1a1a2e; }

        .code-example {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #e0e0e0;
        }

        .code-example h4 { margin: 0 0 0.5rem 0; color: #667eea; }

        .code-example pre {
            background: #1a1a2e;
            color: #4ade80;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            margin: 0;
            font-size: 0.85rem;
        }
    `]
})
export class CustomValidatorsComponent implements OnInit {
    signupForm!: FormGroup;

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            /**
             * USERNAME CONTROL
             * 
             * Demonstrates layering multiple validators:
             * 1. Sync: required, noWhitespace, forbiddenName
             * 2. Async: usernameAvailability (runs after sync pass)
             * 
             * FormControl signature:
             * new FormControl(value, syncValidators, asyncValidators)
             */
            username: new FormControl('',
                // Sync validators (2nd argument)
                [
                    Validators.required,
                    noWhitespaceValidator,
                    forbiddenNameValidator(['admin', 'root', 'system'])
                ],
                // Async validators (3rd argument)
                [usernameAvailabilityValidator()]
            ),

            /**
             * PASSWORD CONTROL
             * 
             * Uses strongPasswordValidator for detailed requirement feedback.
             */
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                strongPasswordValidator
            ]),

            /**
             * EMAIL CONTROL
             * 
             * Combines built-in email validator with async uniqueness check.
             */
            email: new FormControl('',
                [Validators.required, Validators.email],
                [this.emailAvailabilityValidator()]
            )
        });
    }

    /**
     * EMAIL AVAILABILITY ASYNC VALIDATOR
     * 
     * Defined as method to demonstrate class-based approach.
     * In real app, would inject HttpClient and call API.
     */
    emailAvailabilityValidator(): AsyncValidatorFn {
        const takenEmails = ['test@test.com', 'admin@admin.com'];

        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) return of(null);

            return of(control.value).pipe(
                delay(400),
                map(email => {
                    const isTaken = takenEmails.includes(email.toLowerCase());
                    return isTaken ? { emailTaken: true } : null;
                })
            );
        };
    }

    isInvalid(controlName: string): boolean {
        const control = this.signupForm.get(controlName);
        return !!(control?.invalid && (control.dirty || control.touched));
    }

    isValid(controlName: string): boolean {
        const control = this.signupForm.get(controlName);
        return !!(control?.valid && control.dirty);
    }

    getErrors(controlName: string) {
        return this.signupForm.get(controlName)?.errors;
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            console.log('✅ Form is valid!');
            console.log('Form Value:', this.signupForm.value);
        } else {
            this.signupForm.markAllAsTouched();
        }
    }
}
