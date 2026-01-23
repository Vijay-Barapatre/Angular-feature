/**
 * ============================================================================
 * ERROR HANDLING & RETRY (ENHANCED)
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * Professional-grade error handling strategies for HTTP requests.
 * These patterns are used in production apps at scale.
 * 
 * 💡 KEY CONCEPTS COVERED:
 * 
 * 1. ERROR CLASSIFICATION:
 *    Categorize errors to determine proper response:
 *    - Network errors (status 0): Connection issues, offline
 *    - Client errors (4xx): Bad request, unauthorized, not found
 *    - Server errors (5xx): Server crashed, overloaded
 *    
 * 2. WHICH ERRORS ARE RETRYABLE?
 *    ✅ RETRY:
 *      - Status 0 (network offline, timeout)
 *      - Status 429 (rate limited - with backoff)
 *      - Status 500, 502, 503, 504 (server issues, temporary)
 *    
 *    ❌ DON'T RETRY:
 *      - Status 400 (bad request - fix your data)
 *      - Status 401 (unauthorized - need to login)
 *      - Status 403 (forbidden - not allowed)
 *      - Status 404 (not found - won't magically appear)
 * 
 * 3. EXPONENTIAL BACKOFF WITH JITTER:
 *    Wait progressively longer between retries:
 *    - Retry 1: Wait 1s (+random 0-1s)
 *    - Retry 2: Wait 2s (+random 0-1s)
 *    - Retry 3: Wait 4s (+random 0-1s)
 *    
 *    WHY JITTER? Prevents "thundering herd" where all clients
 *    retry at exactly the same time, overwhelming the server.
 * 
 * 4. CIRCUIT BREAKER PATTERN:
 *    Stop calling a failing service to give it time to recover.
 *    States:
 *    - CLOSED: Normal operation, requests pass through
 *    - OPEN: Service is down, requests blocked
 *    - HALF-OPEN: Testing if service recovered
 * 
 * 5. GRACEFUL DEGRADATION:
 *    When primary source fails, try alternatives:
 *    1. Live API ❌
 *    2. Cached data ✅
 *    3. Static fallback ✅
 * 
 * ⚠️ PRODUCTION CONSIDERATIONS:
 * - Log errors to monitoring service (Sentry, DataDog)
 * - Show user-friendly messages (not technical errors)
 * - Don't retry infinitely (set max attempts)
 * - Consider circuit breaker for external APIs
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, timer, retryWhen, delayWhen, tap, take, of, throwError, Observable, finalize, map, scan } from 'rxjs';

/**
 * 📦 CLASSIFIED ERROR INTERFACE
 * 
 * Instead of just passing raw HttpErrorResponse around,
 * we classify it into a structured format that's easier to work with.
 * 
 * Benefits:
 * - Type safety for error handling
 * - Consistent error shape across the app
 * - Centralized error classification logic
 * - User-friendly messages separate from technical details
 */
interface ClassifiedError {
    code: number;           // HTTP status code (0, 400, 500, etc.)
    type: 'network' | 'client' | 'server' | 'unknown';  // Error category
    message: string;        // Technical message (for logging)
    userMessage: string;    // User-friendly message (for UI)
    isRetryable: boolean;   // Should we retry this request?
    originalError: any;     // Original error for debugging
}

@Component({
    selector: 'app-error-handling',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>🐛 Advanced Error Handling</h1>
            <p class="description">
                Production-grade error handling patterns.
            </p>

            <div class="demo-grid">
                <!-- Scenario 1: Error Classification -->
                <section class="demo-section">
                    <h3>📊 Scenario 1: Error Classification</h3>
                    <p>Different handling for different error types:</p>
                    <div class="button-group">
                        <button (click)="testError(400)" class="btn">400 Bad Request</button>
                        <button (click)="testError(401)" class="btn">401 Unauthorized</button>
                        <button (click)="testError(404)" class="btn">404 Not Found</button>
                        <button (click)="testError(500)" class="btn">500 Server Error</button>
                        <button (click)="testError(503)" class="btn">503 Unavailable</button>
                    </div>
                    @if (classifiedError) {
                        <div class="error-card" [class]="classifiedError.type">
                            <div class="error-header">
                                <span class="error-type">{{ classifiedError.type.toUpperCase() }}</span>
                                <span class="error-code">{{ classifiedError.code }}</span>
                            </div>
                            <div class="error-message">{{ classifiedError.userMessage }}</div>
                            <div class="error-meta">
                                <span>Retryable: {{ classifiedError.isRetryable ? '✅ Yes' : '❌ No' }}</span>
                            </div>
                        </div>
                    }
                </section>

                <!-- Scenario 2: Exponential Backoff with Jitter -->
                <section class="demo-section">
                    <h3>⏱️ Scenario 2: Exponential Backoff + Jitter</h3>
                    <p>Prevents thundering herd problem:</p>
                    <button (click)="testExponentialBackoff()" [disabled]="retrying" class="btn primary">
                        {{ retrying ? 'Retrying...' : 'Test Backoff' }}
                    </button>
                    <div class="retry-log">
                        @for (entry of backoffLog; track $index) {
                            <div class="log-entry" [class]="entry.type">
                                <span class="time">{{ entry.time }}</span>
                                <span class="msg">{{ entry.message }}</span>
                            </div>
                        }
                    </div>
                </section>

                <!-- Scenario 3: Circuit Breaker -->
                <section class="demo-section">
                    <h3>⚡ Scenario 3: Circuit Breaker</h3>
                    <p>Stop calling failing service temporarily:</p>
                    <div class="circuit-status" [class]="circuitState">
                        Circuit: <strong>{{ circuitState.toUpperCase() }}</strong>
                    </div>
                    <button (click)="testCircuitBreaker()" class="btn primary">
                        Make Request
                    </button>
                    <div class="circuit-stats">
                        <div>Failures: {{ failureCount }}/{{ failureThreshold }}</div>
                        <div>Success Count: {{ successCount }}</div>
                    </div>
                    @if (circuitState === 'open') {
                        <div class="circuit-message">
                            Circuit is OPEN. Requests blocked for {{ circuitCooldown }}s.
                            <button (click)="resetCircuit()" class="btn secondary">Reset</button>
                        </div>
                    }
                </section>

                <!-- Scenario 4: Graceful Degradation -->
                <section class="demo-section">
                    <h3>🛟 Scenario 4: Graceful Degradation</h3>
                    <p>Fallback strategies when API fails:</p>
                    <button (click)="testGracefulDegradation()" class="btn primary">
                        Load with Fallback
                    </button>
                    @if (degradationResult) {
                        <div class="fallback-result" [class]="degradationResult.source">
                            <div class="source-label">Source: {{ degradationResult.source }}</div>
                            <pre>{{ degradationResult.data | json }}</pre>
                        </div>
                    }
                </section>
            </div>

            <div class="code-patterns">
                <h3>💻 Key Pattern: Error Classification</h3>
                <pre>
classifyError(error: HttpErrorResponse): ClassifiedError {{ '{' }}
    if (error.status === 0) return {{ '{' }} type: 'network', isRetryable: true {{ '}' }};
    if (error.status >= 400 && error.status < 500) return {{ '{' }} type: 'client', isRetryable: false {{ '}' }};
    if (error.status >= 500) return {{ '{' }} type: 'server', isRetryable: true {{ '}' }};
{{ '}' }}
                </pre>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; margin: 0.25rem; }
        .btn.primary { background: #667eea; color: white; }
        .btn.secondary { background: #e0e0e0; color: #333; }
        .button-group { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }

        .error-card { padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .error-card.network { background: #fef3c7; border-left: 4px solid #f59e0b; }
        .error-card.client { background: #fee2e2; border-left: 4px solid #ef4444; }
        .error-card.server { background: #dbeafe; border-left: 4px solid #3b82f6; }
        .error-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .error-type { font-weight: 600; }
        .error-code { background: #1a1a2e; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; }
        .error-message { margin-bottom: 0.5rem; }
        .error-meta { font-size: 0.85rem; color: #666; }

        .retry-log { background: #1a1a2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; max-height: 200px; overflow-y: auto; }
        .log-entry { display: flex; gap: 1rem; font-family: monospace; font-size: 0.85rem; }
        .log-entry .time { color: #888; }
        .log-entry .msg { color: #4ade80; }
        .log-entry.error .msg { color: #ef4444; }
        .log-entry.warning .msg { color: #fbbf24; }

        .circuit-status { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center; }
        .circuit-status.closed { background: #dcfce7; color: #166534; }
        .circuit-status.open { background: #fee2e2; color: #b91c1c; }
        .circuit-status.half-open { background: #fef3c7; color: #92400e; }
        .circuit-stats { display: flex; gap: 2rem; margin-top: 1rem; }
        .circuit-message { background: #fef3c7; padding: 1rem; border-radius: 8px; margin-top: 1rem; }

        .fallback-result { padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .fallback-result.api { background: #dcfce7; }
        .fallback-result.cache { background: #dbeafe; }
        .fallback-result.fallback { background: #fef3c7; }
        .source-label { font-weight: 600; margin-bottom: 0.5rem; }

        .code-patterns { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .code-patterns h3 { color: white; margin-top: 0; }
        .code-patterns pre { color: #4ade80; margin: 0; overflow-x: auto; }
    `]
})
export class ErrorHandlingComponent {
    private apiService = inject(ApiService);

    // Scenario 1: Error Classification
    classifiedError: ClassifiedError | null = null;

    // Scenario 2: Exponential Backoff
    retrying = false;
    backoffLog: { time: string; message: string; type: string }[] = [];

    // =========================================================================
    // SCENARIO 3: CIRCUIT BREAKER - STATE PROPERTIES
    // =========================================================================
    /**
     * 🔌 CIRCUIT BREAKER STATE
     * 
     * The circuit can be in one of three states:
     * - 'closed': Normal operation, all requests pass through
     * - 'open':   Circuit tripped, all requests blocked (fail fast)
     * - 'half-open': Testing state, one request allowed to test recovery
     */
    circuitState: 'closed' | 'open' | 'half-open' = 'closed';

    /**
     * 📊 FAILURE COUNTER
     * Tracks consecutive failures. When it reaches threshold, circuit opens.
     */
    failureCount = 0;

    /**
     * ✅ SUCCESS COUNTER
     * Tracks successful requests (for demo/stats purposes).
     */
    successCount = 0;

    /**
     * 🎯 FAILURE THRESHOLD
     * After this many consecutive failures, circuit opens.
     * Lower = more sensitive (opens quickly)
     * Higher = more tolerant (takes more failures)
     */
    failureThreshold = 3;

    /**
     * ⏱️ COOLDOWN PERIOD (seconds)
     * How long circuit stays OPEN before moving to HALF-OPEN.
     * This gives the failing service time to recover.
     */
    circuitCooldown = 30;

    // Scenario 4: Graceful Degradation
    degradationResult: { source: string; data: any } | null = null;

    // =========================================================================
    // SCENARIO 1: ERROR CLASSIFICATION
    // =========================================================================
    /**
     * 🏷️ TEST ERROR CLASSIFICATION
     * Triggers different HTTP error codes to see how they're classified.
     */
    testError(code: number): void {
        this.classifiedError = null;

        this.apiService.getError(code).pipe(
            catchError((error: HttpErrorResponse) => {
                this.classifiedError = this.classifyError(error);
                return of(null);
            })
        ).subscribe();
    }

    /**
     * 🔍 CLASSIFY ERROR
     * Analyzes HTTP error and categorizes it.
     */
    private classifyError(error: HttpErrorResponse): ClassifiedError {
        const errorMessages: Record<number, string> = {
            400: 'Please check your input and try again.',
            401: 'Please log in to continue.',
            403: 'You don\'t have permission to access this.',
            404: 'The requested resource was not found.',
            500: 'Something went wrong on our end. Please try later.',
            503: 'Service is temporarily unavailable. Please wait.'
        };

        let type: 'network' | 'client' | 'server' | 'unknown' = 'unknown';
        let isRetryable = false;

        if (error.status === 0) {
            type = 'network';
            isRetryable = true;
        } else if (error.status >= 400 && error.status < 500) {
            type = 'client';
            isRetryable = error.status === 429;
        } else if (error.status >= 500) {
            type = 'server';
            isRetryable = true;
        }

        return {
            code: error.status,
            type,
            message: error.message,
            userMessage: errorMessages[error.status] || 'An unexpected error occurred.',
            isRetryable,
            originalError: error
        };
    }

    // =========================================================================
    // SCENARIO 2: EXPONENTIAL BACKOFF
    // =========================================================================
    /**
     * ⏱️ TEST EXPONENTIAL BACKOFF
     * Demonstrates retry with increasing delays.
     */
    testExponentialBackoff(): void {
        this.retrying = true;
        this.backoffLog = [];
        let attempt = 0;

        const jitter = () => Math.random() * 1000;

        this.apiService.getError(500).pipe(
            tap(() => {
                attempt++;
                this.addLog(`Attempt ${attempt}...`, 'info');
            }),
            retryWhen(errors => errors.pipe(
                scan((acc, error) => {
                    acc++;
                    if (acc > 3) throw error;
                    return acc;
                }, 0),
                delayWhen((retryCount) => {
                    const baseDelay = Math.pow(2, retryCount) * 1000;
                    const delay = baseDelay + jitter();
                    this.addLog(`Waiting ${Math.round(delay)}ms before retry...`, 'warning');
                    return timer(delay);
                })
            )),
            catchError(() => {
                this.addLog('All retries exhausted!', 'error');
                return of(null);
            }),
            finalize(() => this.retrying = false)
        ).subscribe();
    }

    private addLog(message: string, type: string): void {
        this.backoffLog.push({
            time: new Date().toLocaleTimeString(),
            message,
            type
        });
    }

    // =========================================================================
    // SCENARIO 3: CIRCUIT BREAKER PATTERN
    // =========================================================================
    /**
     * ⚡ CIRCUIT BREAKER PATTERN - DETAILED EXPLANATION
     * 
     * ═══════════════════════════════════════════════════════════════════════
     * WHAT IS IT?
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * The Circuit Breaker is a design pattern that prevents an application
     * from repeatedly trying to execute an operation that's likely to fail.
     * 
     * Imagine your house's electrical circuit breaker:
     * - When too much current flows → BREAKER TRIPS (opens)
     * - Electricity stops flowing → PREVENTS FIRE/DAMAGE
     * - You fix the problem → RESET THE BREAKER
     * - Normal operation resumes
     * 
     * Same concept for API calls!
     * 
     * ═══════════════════════════════════════════════════════════════════════
     * THE THREE STATES
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │                                                                     │
     * │   🟢 CLOSED (Normal)     🔴 OPEN (Blocked)      🟡 HALF-OPEN       │
     * │   ─────────────────     ────────────────       ────────────        │
     * │   All requests pass     All requests           One test request    │
     * │   through normally      are BLOCKED            allowed through     │
     * │                         (fail immediately)                         │
     * │                                                                     │
     * └─────────────────────────────────────────────────────────────────────┘
     * 
     * ═══════════════════════════════════════════════════════════════════════
     * STATE TRANSITIONS (HOW IT WORKS)
     * ═══════════════════════════════════════════════════════════════════════
     * 
     *                    ┌──────────────┐
     *            ┌──────►│   CLOSED     │◄──────┐
     *            │       │  (Normal)    │       │
     *            │       └──────┬───────┘       │
     *            │              │               │
     *            │     Failures >= Threshold    │ Success in
     *            │              │               │ half-open
     *            │              ▼               │
     *            │       ┌──────────────┐       │
     *            │       │    OPEN      │       │
     *            │       │  (Blocked)   │       │
     *            │       └──────┬───────┘       │
     *            │              │               │
     *            │     After cooldown period    │
     *            │              │               │
     *            │              ▼               │
     *            │       ┌──────────────┐       │
     *            │       │  HALF-OPEN   │───────┘
     *     Failure│       │  (Testing)   │
     *     in     │       └──────────────┘
     *     half-  │              │
     *     open   │       Failure in half-open
     *            └──────────────┘
     * 
     * ═══════════════════════════════════════════════════════════════════════
     * REAL-WORLD EXAMPLE
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * Scenario: Your app calls a payment service that's down.
     * 
     * WITHOUT Circuit Breaker:
     * - User clicks "Pay" → 30 second timeout → Error
     * - User clicks again → Another 30 second timeout → Error
     * - User is frustrated, server is overwhelmed with retry requests
     * 
     * WITH Circuit Breaker:
     * - User clicks "Pay" → Fail (failure count: 1)
     * - User clicks again → Fail (failure count: 2)
     * - User clicks again → Fail (failure count: 3) → CIRCUIT OPENS!
     * - User clicks again → INSTANT fail: "Service unavailable, try later"
     * - After 30 seconds → HALF-OPEN, one request allowed
     * - If success → CIRCUIT CLOSES, normal operation
     * - If fail → CIRCUIT stays OPEN for another 30 seconds
     * 
     * ═══════════════════════════════════════════════════════════════════════
     * WHY USE IT?
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * 1. FAIL FAST: Users get immediate feedback instead of waiting
     * 2. PROTECT DOWNSTREAM: Don't overwhelm a struggling service
     * 3. SELF-HEALING: Automatically recovers when service is back
     * 4. SAVE RESOURCES: No wasted network requests to dead service
     * 
     * ═══════════════════════════════════════════════════════════════════════
     * CONFIGURATION (This implementation)
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * failureThreshold = 3   → Open circuit after 3 consecutive failures
     * circuitCooldown = 30   → Wait 30 seconds before trying again
     */
    testCircuitBreaker(): void {
        // ─────────────────────────────────────────────────────────────────
        // STEP 1: CHECK IF CIRCUIT IS OPEN
        // ─────────────────────────────────────────────────────────────────
        // If circuit is OPEN, reject immediately without making API call.
        // This is the "fail fast" behavior - don't waste time on a dead service.
        if (this.circuitState === 'open') {
            this.addLog('Circuit is OPEN - request blocked', 'error');
            return;  // Exit immediately - no API call made!
        }

        // ─────────────────────────────────────────────────────────────────
        // STEP 2: MAKE THE API CALL (circuit is CLOSED or HALF-OPEN)
        // ─────────────────────────────────────────────────────────────────
        this.apiService.getRandomFail().pipe(
            // ─────────────────────────────────────────────────────────────
            // STEP 3a: ON SUCCESS
            // ─────────────────────────────────────────────────────────────
            tap(() => {
                this.successCount++;

                // If we were in HALF-OPEN state and request succeeded,
                // the service is recovered! Close the circuit.
                if (this.circuitState === 'half-open') {
                    this.circuitState = 'closed';  // Back to normal!
                    this.failureCount = 0;         // Reset failure counter
                    // Circuit is now fully operational again
                }
            }),

            // ─────────────────────────────────────────────────────────────
            // STEP 3b: ON FAILURE
            // ─────────────────────────────────────────────────────────────
            catchError(error => {
                // Increment failure counter
                this.failureCount++;

                // Check if we've hit the failure threshold
                if (this.failureCount >= this.failureThreshold) {
                    // ─────────────────────────────────────────────────────
                    // TRIP THE CIRCUIT! (CLOSED → OPEN)
                    // ─────────────────────────────────────────────────────
                    // Too many failures - stop trying!
                    this.circuitState = 'open';

                    // ─────────────────────────────────────────────────────
                    // SET COOLDOWN TIMER (OPEN → HALF-OPEN)
                    // ─────────────────────────────────────────────────────
                    // After cooldown period, allow ONE test request
                    // to check if service has recovered.
                    setTimeout(() => {
                        this.circuitState = 'half-open';
                        // Now one request will be allowed through to test
                    }, this.circuitCooldown * 1000);  // 30 seconds
                }

                return of(null);  // Swallow error, don't crash
            })
        ).subscribe();
    }

    /**
     * 🔄 RESET CIRCUIT
     * 
     * Manually reset the circuit breaker to CLOSED state.
     * Use this when you know the service is back up.
     */
    resetCircuit(): void {
        this.circuitState = 'closed';
        this.failureCount = 0;
        this.successCount = 0;
    }

    /**
     * SCENARIO 4: Graceful Degradation
     * Try multiple fallback sources.
     */
    testGracefulDegradation(): void {
        this.degradationResult = null;

        // Try API first
        this.apiService.getError(500).pipe(
            map(data => ({ source: 'api', data })),
            catchError(() => {
                // Fallback to cache
                const cached = localStorage.getItem('users_cache');
                if (cached) {
                    return of({ source: 'cache', data: JSON.parse(cached) });
                }
                // Final fallback
                return of({
                    source: 'fallback',
                    data: [{ id: 0, name: 'Offline Mode', email: 'N/A' }]
                });
            })
        ).subscribe(result => {
            this.degradationResult = result;
        });
    }
}
