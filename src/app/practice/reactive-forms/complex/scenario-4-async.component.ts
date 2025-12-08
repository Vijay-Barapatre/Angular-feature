/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: ASYNC VALIDATION
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

@Component({
    selector: 'app-scenario-4-async',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Async Validation</h2>
                <p>Validate against server (simulated) - check username availability.</p>
            </div>

            <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label>Username</label>
                    <div class="input-with-status">
                        <input formControlName="username" placeholder="Check availability">
                        @if (signupForm.get('username')?.pending) {
                            <span class="status checking">🔄 Checking...</span>
                        }
                        @if (signupForm.get('username')?.valid && !signupForm.get('username')?.pending) {
                            <span class="status available">✅ Available</span>
                        }
                        @if (signupForm.get('username')?.hasError('usernameTaken')) {
                            <span class="status taken">❌ Taken</span>
                        }
                    </div>
                    <p class="hint">Try: admin, john, test (these are taken)</p>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <div class="input-with-status">
                        <input formControlName="email" type="email" placeholder="Check email">
                        @if (signupForm.get('email')?.pending) {
                            <span class="status checking">🔄 Checking...</span>
                        }
                    </div>
                </div>

                <button type="submit" [disabled]="signupForm.invalid || signupForm.pending">
                    {{ signupForm.pending ? 'Validating...' : 'Sign Up' }}
                </button>
            </form>
        </div>
    `,
    styles: [`
        .scenario { max-width: 400px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6; }
        form { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; }
        .input-with-status { display: flex; gap: 0.5rem; align-items: center; }
        .input-with-status input { flex: 1; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .status { font-size: 0.85rem; white-space: nowrap; }
        .status.checking { color: #3b82f6; }
        .status.available { color: #10b981; }
        .status.taken { color: #ef4444; }
        .hint { font-size: 0.8rem; color: #6b7280; margin-top: 0.25rem; }
        button { width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; }
    `]
})
export class Scenario4AsyncComponent {
    signupForm;

    private takenUsernames = ['admin', 'john', 'test', 'user'];

    constructor(private fb: FormBuilder) {
        this.signupForm = this.fb.group({
            username: ['',
                [Validators.required, Validators.minLength(3)],
                [this.checkUsernameAvailability.bind(this)]
            ],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    /**
     * Async validator that simulates server check
     */
    checkUsernameAvailability(control: AbstractControl): Observable<ValidationErrors | null> {
        if (!control.value) return of(null);

        return of(control.value).pipe(
            delay(1000), // Simulate network delay
            map(username => {
                const isTaken = this.takenUsernames.includes(username.toLowerCase());
                return isTaken ? { usernameTaken: true } : null;
            })
        );
    }

    onSubmit(): void {
        console.log('Signup:', this.signupForm.value);
        alert('Account created!');
    }
}
