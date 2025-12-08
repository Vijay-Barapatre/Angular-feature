/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: FORM STATE MANAGEMENT
 * ============================================================================
 */

import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FormState {
    username: string;
    email: string;
    password: string;
}

interface ValidationErrors {
    username?: string;
    email?: string;
    password?: string;
}

@Component({
    selector: 'app-scenario-2-form',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Form State with Signals</h2>
                <p>Handle form state and validation without RxJS.</p>
            </div>

            <div class="form-container">
                <form (ngSubmit)="handleSubmit($event)">
                    <div class="form-group" [class.error]="errors().username">
                        <label>Username</label>
                        <input 
                            [value]="formState().username"
                            (input)="updateField('username', $any($event.target).value)"
                            placeholder="Enter username">
                        @if (errors().username) {
                            <span class="error-msg">{{ errors().username }}</span>
                        }
                    </div>

                    <div class="form-group" [class.error]="errors().email">
                        <label>Email</label>
                        <input 
                            type="email"
                            [value]="formState().email"
                            (input)="updateField('email', $any($event.target).value)"
                            placeholder="Enter email">
                        @if (errors().email) {
                            <span class="error-msg">{{ errors().email }}</span>
                        }
                    </div>

                    <div class="form-group" [class.error]="errors().password">
                        <label>Password</label>
                        <input 
                            type="password"
                            [value]="formState().password"
                            (input)="updateField('password', $any($event.target).value)"
                            placeholder="Enter password">
                        @if (errors().password) {
                            <span class="error-msg">{{ errors().password }}</span>
                        }
                        <div class="password-strength">
                            Strength: {{ passwordStrength() }}
                        </div>
                    </div>

                    <button type="submit" [disabled]="!isValid()">
                        {{ isSubmitting() ? 'Submitting...' : 'Submit' }}
                    </button>
                </form>

                <div class="state-preview">
                    <h4>Form State (Signal)</h4>
                    <pre>{{ formState() | json }}</pre>
                    <p>Is Valid: {{ isValid() ? '✅' : '❌' }}</p>
                    <p>Is Dirty: {{ isDirty() ? 'Yes' : 'No' }}</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #8b5cf6; }
        .form-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        form { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 6px; }
        .form-group.error input { border-color: #ef4444; }
        .error-msg { color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem; display: block; }
        .password-strength { font-size: 0.85rem; color: #6b7280; margin-top: 0.25rem; }
        button { width: 100%; padding: 0.75rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        .state-preview { background: #1e1e2e; padding: 1rem; border-radius: 8px; color: #a6e3a1; }
        .state-preview h4 { color: white; margin: 0 0 0.5rem; }
        .state-preview pre { margin: 0; font-size: 0.85rem; }
    `]
})
export class Scenario2FormComponent {
    private initialState: FormState = { username: '', email: '', password: '' };

    formState = signal<FormState>({ ...this.initialState });
    isSubmitting = signal(false);

    /**
     * TODO: Create computed signal for validation errors
     */
    errors = computed<ValidationErrors>(() => {
        const state = this.formState();
        const errors: ValidationErrors = {};

        if (state.username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }
        if (!state.email.includes('@')) {
            errors.email = 'Invalid email address';
        }
        if (state.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    });

    /**
     * TODO: Create computed signal for form validity
     */
    isValid = computed(() => Object.keys(this.errors()).length === 0);

    /**
     * TODO: Create computed signal for dirty state
     */
    isDirty = computed(() =>
        JSON.stringify(this.formState()) !== JSON.stringify(this.initialState)
    );

    /**
     * TODO: Create computed signal for password strength
     */
    passwordStrength = computed(() => {
        const password = this.formState().password;
        if (password.length < 6) return '🔴 Weak';
        if (password.length < 10) return '🟡 Medium';
        return '🟢 Strong';
    });

    updateField(field: keyof FormState, value: string): void {
        this.formState.update(state => ({ ...state, [field]: value }));
    }

    handleSubmit(event: Event): void {
        event.preventDefault();
        if (!this.isValid()) return;

        this.isSubmitting.set(true);
        setTimeout(() => {
            console.log('Form submitted:', this.formState());
            alert('Form submitted successfully!');
            this.isSubmitting.set(false);
        }, 1000);
    }
}
