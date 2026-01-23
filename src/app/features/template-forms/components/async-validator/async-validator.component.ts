/**
 * ============================================================================
 * ASYNC VALIDATORS IN TEMPLATE-DRIVEN FORMS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Template-Driven Forms can also perform async validation! The trick is to
 * wrap your async logic in a directive that implements AsyncValidator.
 * 
 * KEY DIFFERENCE FROM REACTIVE FORMS:
 * - Reactive: Pass async validator function directly to FormControl
 * - Template: Create a directive with NG_ASYNC_VALIDATORS provider
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncUsernameValidatorDirective } from '../../directives/async-username-validator.directive';

@Component({
    selector: 'app-async-validator',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, AsyncUsernameValidatorDirective],
    template: `
        <div class="form-container">
            <h1>⏳ Async Validators</h1>
            <p class="desc">
                Check username availability in real-time using an async validator directive.
            </p>

            <div class="info-box">
                <h4>📝 Reserved Usernames (Try These):</h4>
                <div class="reserved-list">
                    <span class="chip">admin</span>
                    <span class="chip">user</span>
                    <span class="chip">test</span>
                    <span class="chip">angular</span>
                    <span class="chip">demo</span>
                </div>
            </div>

            <form #signupForm="ngForm" (ngSubmit)="onSubmit(signupForm)">
                
                <div class="form-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        [(ngModel)]="model.username"
                        #usernameCtrl="ngModel"
                        required
                        minlength="3"
                        appAsyncUsername="800"
                        [class.invalid]="usernameCtrl.invalid && usernameCtrl.touched"
                        [class.pending]="usernameCtrl.pending"
                        [class.valid]="usernameCtrl.valid && usernameCtrl.touched"
                    >
                    
                    <!-- Pending State -->
                    @if (usernameCtrl.pending) {
                        <div class="status-msg pending">
                            <span class="spinner"></span> Checking availability...
                        </div>
                    }
                    
                    <!-- Error Messages -->
                    @if (usernameCtrl.invalid && usernameCtrl.touched && !usernameCtrl.pending) {
                        <div class="error-msg">
                            @if (usernameCtrl.errors?.['required']) {
                                <small>Username is required.</small>
                            }
                            @if (usernameCtrl.errors?.['minlength']) {
                                <small>Must be at least 3 characters.</small>
                            }
                            @if (usernameCtrl.errors?.['usernameTaken']) {
                                <small>❌ "{{ usernameCtrl.errors?.['usernameTaken'].value }}" is already taken!</small>
                            }
                        </div>
                    }
                    
                    <!-- Success State -->
                    @if (usernameCtrl.valid && usernameCtrl.touched) {
                        <div class="success-msg">
                            ✅ Username is available!
                        </div>
                    }
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        [(ngModel)]="model.email"
                        #emailCtrl="ngModel"
                        required
                        email
                    >
                </div>

                <button type="submit" [disabled]="signupForm.invalid || signupForm.pending">
                    @if (signupForm.pending) {
                        <span class="spinner"></span> Validating...
                    } @else {
                        Create Account
                    }
                </button>
            </form>

            <!-- Debug Panel -->
            <div class="debug-panel">
                <h3>📊 Form State</h3>
                <div class="state-grid">
                    <div class="state-item">
                        <span class="label">Pending:</span>
                        <span class="value" [class.active]="signupForm.pending">{{ signupForm.pending }}</span>
                    </div>
                    <div class="state-item">
                        <span class="label">Valid:</span>
                        <span class="value" [class.active]="signupForm.valid">{{ signupForm.valid }}</span>
                    </div>
                    <div class="state-item">
                        <span class="label">Status:</span>
                        <span class="value">{{ usernameCtrl.status }}</span>
                    </div>
                </div>
                <p class="hint">
                    💡 Notice how the form's <code>pending</code> state tracks async validation!
                </p>
            </div>

            <a routerLink="/template-forms" class="back-link">← Back to Overview</a>
        </div>
    `,
    styles: [`
        .form-container {
            max-width: 550px;
            margin: 30px auto;
            padding: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
        }

        .info-box {
            background: #eff6ff;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        .info-box h4 { margin: 0 0 0.5rem; color: #3b82f6; }
        .reserved-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .chip {
            background: #dbeafe;
            color: #1e40af;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-family: monospace;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }

        input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: all 0.3s;
        }

        input:focus { outline: none; border-color: #3b82f6; }
        input.pending { border-color: #f59e0b; background: #fffbeb; }
        input.invalid { border-color: #ef4444; background: #fef2f2; }
        input.valid { border-color: #22c55e; background: #f0fdf4; }

        .status-msg {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
            font-size: 0.9rem;
        }
        .status-msg.pending { color: #b45309; }

        .error-msg { color: #dc2626; font-size: 0.85rem; margin-top: 5px; }
        .success-msg { color: #16a34a; font-size: 0.85rem; margin-top: 5px; }

        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #f59e0b;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        button:disabled { opacity: 0.5; cursor: not-allowed; }
        button .spinner { border-color: white; border-top-color: transparent; }

        .debug-panel {
            margin-top: 2rem;
            padding: 1rem;
            background: #1e293b;
            border-radius: 8px;
            color: #e2e8f0;
        }
        .debug-panel h3 { margin: 0 0 0.75rem; color: #94a3b8; }
        .state-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
        .state-item { background: #334155; padding: 0.5rem 0.75rem; border-radius: 4px; }
        .state-item .label { color: #94a3b8; margin-right: 0.5rem; }
        .state-item .value { font-family: monospace; color: #f87171; }
        .state-item .value.active { color: #4ade80; }
        .hint { color: #94a3b8; font-size: 0.85rem; margin-top: 1rem; }
        code { background: #475569; padding: 0.1rem 0.3rem; border-radius: 3px; }

        .back-link {
            display: block;
            margin-top: 20px;
            text-align: center;
            color: var(--primary-color);
            text-decoration: none;
        }
    `]
})
export class AsyncValidatorComponent {
    model = {
        username: '',
        email: ''
    };

    onSubmit(form: NgForm): void {
        if (form.valid) {
            alert('Account created successfully!\n' + JSON.stringify(this.model, null, 2));
        }
    }
}
