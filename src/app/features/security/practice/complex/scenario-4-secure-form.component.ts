/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: SECURE FORM WITH VALIDATION
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * A bank's money transfer form needs comprehensive security:
 * - Prevent injection attacks in all fields
 * - Validate account numbers against known patterns
 * - Rate-limit form submissions
 * - Require CAPTCHA after failed attempts
 * - Encrypt sensitive data before submission
 * 
 * 📝 PROBLEM STATEMENT:
 * Create a secure money transfer form with multiple layers of validation,
 * rate limiting, and security measures.
 * 
 * ✅ EXPECTED RESULT:
 * - All inputs are validated and sanitized
 * - Form is rate-limited (3 submissions per minute)
 * - CAPTCHA appears after 2 failed attempts
 * - Sensitive data is masked in logs
 * - Form shows real-time validation
 */

import { Component, Injectable, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';

// ========================================
// INTERFACES
// ========================================

interface TransferRequest {
    fromAccount: string;
    toAccount: string;
    amount: number;
    description: string;
    timestamp: number;
}

interface RateLimitInfo {
    attempts: number;
    lastAttempt: number;
    blocked: boolean;
    unblockAt?: number;
}

// ========================================
// SECURITY SERVICE
// ========================================

@Injectable({ providedIn: 'root' })
export class TransferSecurityService {
    private rateLimitInfo = signal<RateLimitInfo>({
        attempts: 0,
        lastAttempt: 0,
        blocked: false
    });

    private failedAttempts = signal(0);
    private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
    private readonly MAX_ATTEMPTS = 3;
    private readonly CAPTCHA_THRESHOLD = 2;

    /**
     * TODO: Implement rate limiting check
     * 
     * Check if the user has exceeded rate limits:
     * - Max 3 submissions per minute
     * - If exceeded, block for remaining time
     * - Return { allowed: boolean, waitTime?: number }
     */
    checkRateLimit(): { allowed: boolean; waitTime?: number } {
        /*
         * TODO: Implement feature logic here
         * 
         * const info = this.rateLimitInfo();
         * const now = Date.now();
         * 
         * // Reset if window expired
         * if (now - info.lastAttempt > this.RATE_LIMIT_WINDOW) {
         *     this.rateLimitInfo.set({
         *         attempts: 0,
         *         lastAttempt: now,
         *         blocked: false
         *     });
         *     return { allowed: true };
         * }
         * 
         * if (info.attempts >= this.MAX_ATTEMPTS) {
         *     const waitTime = this.RATE_LIMIT_WINDOW - (now - info.lastAttempt);
         *     return { allowed: false, waitTime };
         * }
         * 
         * return { allowed: true };
         */

        return { allowed: true }; // Replace with your implementation
    }

    /**
     * TODO: Record a form submission attempt
     */
    recordAttempt(): void {
        /*
         * TODO: Implement feature logic here
         * 
         * this.rateLimitInfo.update(info => ({
         *     attempts: info.attempts + 1,
         *     lastAttempt: Date.now(),
         *     blocked: info.attempts + 1 >= this.MAX_ATTEMPTS
         * }));
         */
    }

    /**
     * TODO: Check if CAPTCHA is required
     */
    isCaptchaRequired(): boolean {
        /*
         * TODO: Implement feature logic here
         * 
         * return this.failedAttempts() >= this.CAPTCHA_THRESHOLD;
         */

        return false;
    }

    /**
     * TODO: Record failed attempt (for CAPTCHA trigger)
     */
    recordFailedAttempt(): void {
        /*
         * TODO: Implement feature logic here
         */
    }

    /**
     * TODO: Reset failed attempts on successful submission
     */
    resetFailedAttempts(): void {
        /*
         * TODO: Implement feature logic here
         */
    }

    /**
     * TODO: Mask sensitive data for logging
     * 
     * Mask account numbers: 1234567890 -> ******7890
     * Mask amounts: Show only if under threshold
     */
    maskSensitiveData(request: TransferRequest): Record<string, string> {
        /*
         * TODO: Implement feature logic here
         * 
         * return {
         *     fromAccount: '******' + request.fromAccount.slice(-4),
         *     toAccount: '******' + request.toAccount.slice(-4),
         *     amount: request.amount > 10000 ? '[LARGE AMOUNT]' : String(request.amount),
         *     description: request.description.substring(0, 20) + '...',
         *     timestamp: new Date(request.timestamp).toISOString()
         * };
         */

        return {}; // Replace with your implementation
    }

    getRateLimitInfo() {
        return this.rateLimitInfo;
    }

    getFailedAttempts() {
        return this.failedAttempts;
    }
}

// ========================================
// CUSTOM VALIDATORS
// ========================================

/**
 * TODO: Implement account number validator
 * 
 * Valid patterns:
 * - 10 digits (savings): 1234567890
 * - 12 digits with dashes (checking): 1234-5678-9012
 * - Starts with valid bank prefix: 10, 20, 30, 40
 */
function accountNumberValidator(control: AbstractControl): ValidationErrors | null {
    /*
     * TODO: Implement feature logic here
     * 
     * const value = (control.value || '').replace(/-/g, '');
     * 
     * if (!/^\d+$/.test(value)) {
     *     return { invalidFormat: 'Only digits and dashes allowed' };
     * }
     * 
     * if (value.length !== 10 && value.length !== 12) {
     *     return { invalidLength: 'Account must be 10 or 12 digits' };
     * }
     * 
     * const validPrefixes = ['10', '20', '30', '40'];
     * if (!validPrefixes.includes(value.substring(0, 2))) {
     *     return { invalidPrefix: 'Invalid bank prefix' };
     * }
     * 
     * return null;
     */

    return null;
}

/**
 * TODO: Implement amount validator
 * 
 * Rules:
 * - Must be positive number
 * - Minimum $1
 * - Maximum $1,000,000
 * - Maximum 2 decimal places
 */
function amountValidator(control: AbstractControl): ValidationErrors | null {
    /*
     * TODO: Implement feature logic here
     */

    return null;
}

/**
 * TODO: Implement description sanitizer/validator
 * 
 * Block:
 * - SQL keywords (SELECT, DROP, etc.)
 * - Script tags
 * - Excessive special characters
 * - Length > 200
 */
function safeDescriptionValidator(control: AbstractControl): ValidationErrors | null {
    /*
     * TODO: Implement feature logic here
     */

    return null;
}

// ========================================
// DEMO COMPONENT
// ========================================

@Component({
    selector: 'app-scenario-secure-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="scenario-container">
            <h2>💰 Scenario 4: Secure Money Transfer Form</h2>
            
            <div class="security-status">
                <div class="status-item">
                    <span class="label">Rate Limit:</span>
                    <span class="value" [class.warning]="rateLimitInfo().attempts >= 2">
                        {{ rateLimitInfo().attempts }}/3 attempts
                    </span>
                </div>
                <div class="status-item">
                    <span class="label">CAPTCHA:</span>
                    <span class="value" [class.active]="captchaRequired">
                        {{ captchaRequired ? 'Required' : 'Not required' }}
                    </span>
                </div>
                <div class="status-item blocked" *ngIf="rateLimitInfo().blocked">
                    ⏳ Rate limited. Wait {{ remainingWaitTime }}s
                </div>
            </div>

            <form [formGroup]="transferForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label>From Account</label>
                    <input type="text" formControlName="fromAccount" 
                           placeholder="10-digit account number">
                    <div class="error" *ngIf="getError('fromAccount')">
                        {{ getError('fromAccount') }}
                    </div>
                </div>

                <div class="form-group">
                    <label>To Account</label>
                    <input type="text" formControlName="toAccount" 
                           placeholder="Recipient account number">
                    <div class="error" *ngIf="getError('toAccount')">
                        {{ getError('toAccount') }}
                    </div>
                </div>

                <div class="form-group">
                    <label>Amount ($)</label>
                    <input type="number" formControlName="amount" 
                           placeholder="Enter amount" step="0.01">
                    <div class="error" *ngIf="getError('amount')">
                        {{ getError('amount') }}
                    </div>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea formControlName="description" 
                              placeholder="Transfer description" rows="3"></textarea>
                    <div class="hint">{{ descriptionLength }}/200 characters</div>
                    <div class="error" *ngIf="getError('description')">
                        {{ getError('description') }}
                    </div>
                </div>

                <!-- CAPTCHA Section -->
                <div class="captcha-section" *ngIf="captchaRequired">
                    <label>🤖 Verify you're human</label>
                    <div class="captcha-box">
                        <span class="captcha-text">{{ captchaChallenge }}</span>
                        <button type="button" (click)="refreshCaptcha()">🔄</button>
                    </div>
                    <input type="text" formControlName="captchaAnswer" 
                           placeholder="Enter the answer">
                </div>

                <button type="submit" 
                        [disabled]="transferForm.invalid || rateLimitInfo().blocked">
                    🔒 Secure Transfer
                </button>
            </form>

            <div class="submission-log">
                <h3>📋 Submission Log (Masked)</h3>
                <div class="log-entry" *ngFor="let log of submissionLogs">
                    <pre>{{ log | json }}</pre>
                </div>
                <div class="empty" *ngIf="submissionLogs.length === 0">
                    No submissions yet
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 600px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        
        .security-status { display: flex; gap: 1rem; flex-wrap: wrap; padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1.5rem; }
        .status-item { display: flex; gap: 0.5rem; align-items: center; }
        .status-item .label { font-size: 0.85rem; color: #6b7280; }
        .status-item .value { font-weight: 500; }
        .status-item .value.warning { color: #f59e0b; }
        .status-item .value.active { color: #ef4444; }
        .status-item.blocked { width: 100%; padding: 0.5rem; background: #fee2e2; color: #dc2626; border-radius: 4px; }
        
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .form-group input, .form-group textarea { 
            width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; 
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        .hint { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
        .error { color: #dc2626; font-size: 0.85rem; margin-top: 0.25rem; }
        
        .captcha-section { padding: 1rem; background: #fef3c7; border-radius: 8px; margin-bottom: 1rem; }
        .captcha-box { display: flex; gap: 0.5rem; align-items: center; margin: 0.5rem 0; }
        .captcha-text { padding: 0.5rem 1rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; font-family: monospace; font-size: 1.25rem; letter-spacing: 0.25rem; }
        .captcha-box button { padding: 0.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; }
        
        button[type="submit"] { width: 100%; padding: 0.875rem; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
        button[type="submit"]:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .submission-log { margin-top: 1.5rem; background: #1e1e2e; padding: 1rem; border-radius: 8px; }
        .submission-log h3 { color: white; margin: 0 0 1rem; }
        .log-entry pre { margin: 0; color: #a6e3a1; font-size: 0.75rem; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 4px; margin-bottom: 0.5rem; }
        .empty { color: #6b7280; text-align: center; }
    `]
})
export class ScenarioSecureFormComponent {
    private fb = inject(FormBuilder);
    private securityService = inject(TransferSecurityService);

    transferForm: FormGroup;
    captchaRequired = false;
    captchaChallenge = '';
    captchaAnswer = 0;
    remainingWaitTime = 0;
    submissionLogs: Record<string, string>[] = [];

    rateLimitInfo = this.securityService.getRateLimitInfo();

    constructor() {
        this.transferForm = this.fb.group({
            fromAccount: ['', [Validators.required, accountNumberValidator]],
            toAccount: ['', [Validators.required, accountNumberValidator]],
            amount: ['', [Validators.required, amountValidator]],
            description: ['', [Validators.maxLength(200), safeDescriptionValidator]],
            captchaAnswer: ['']
        });

        this.refreshCaptcha();
    }

    get descriptionLength(): number {
        return this.transferForm.get('description')?.value?.length || 0;
    }

    getError(fieldName: string): string | null {
        const control = this.transferForm.get(fieldName);
        if (!control?.touched || !control?.errors) return null;

        const errors = control.errors;
        if (errors['required']) return 'This field is required';
        if (errors['invalidFormat']) return errors['invalidFormat'];
        if (errors['invalidLength']) return errors['invalidLength'];
        if (errors['invalidPrefix']) return errors['invalidPrefix'];
        if (errors['maxlength']) return 'Maximum 200 characters allowed';

        return 'Invalid input';
    }

    refreshCaptcha(): void {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        this.captchaChallenge = `${a} + ${b} = ?`;
        this.captchaAnswer = a + b;
    }

    onSubmit(): void {
        // Check rate limit first
        const rateCheck = this.securityService.checkRateLimit();
        if (!rateCheck.allowed) {
            this.remainingWaitTime = Math.ceil((rateCheck.waitTime || 0) / 1000);
            return;
        }

        this.securityService.recordAttempt();

        if (this.transferForm.valid) {
            const request: TransferRequest = {
                ...this.transferForm.value,
                timestamp: Date.now()
            };

            // Mask and log
            const masked = this.securityService.maskSensitiveData(request);
            this.submissionLogs.unshift(masked);

            this.securityService.resetFailedAttempts();
            this.transferForm.reset();
        } else {
            this.securityService.recordFailedAttempt();
            this.captchaRequired = this.securityService.isCaptchaRequired();
        }
    }
}
