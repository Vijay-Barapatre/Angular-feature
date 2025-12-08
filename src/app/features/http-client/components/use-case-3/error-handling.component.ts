/**
 * ============================================================================
 * USE CASE 3: ERROR HANDLING & RETRY (ENHANCED)
 * ============================================================================
 * 
 * 💡 REAL-WORLD SCENARIOS:
 * 1. Exponential backoff with jitter
 * 2. Circuit breaker pattern
 * 3. Error classification (retryable vs non-retryable)
 * 4. User-friendly error messages
 * 5. Error logging and reporting
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, timer, retryWhen, delayWhen, tap, take, of, throwError, Observable, finalize, map, scan } from 'rxjs';

// Error classification
interface ClassifiedError {
    code: number;
    type: 'network' | 'client' | 'server' | 'unknown';
    message: string;
    userMessage: string;
    isRetryable: boolean;
    originalError: any;
}

@Component({
    selector: 'app-error-handling',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>🐛 Use Case 3: Advanced Error Handling</h1>
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

    // Scenario 3: Circuit Breaker
    circuitState: 'closed' | 'open' | 'half-open' = 'closed';
    failureCount = 0;
    successCount = 0;
    failureThreshold = 3;
    circuitCooldown = 30;

    // Scenario 4: Graceful Degradation
    degradationResult: { source: string; data: any } | null = null;

    /**
     * SCENARIO 1: Error Classification
     * Classify errors to determine proper handling strategy.
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
            isRetryable = error.status === 429; // Rate limit is retryable
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

    /**
     * SCENARIO 2: Exponential Backoff with Jitter
     * Prevents all clients from retrying simultaneously.
     */
    testExponentialBackoff(): void {
        this.retrying = true;
        this.backoffLog = [];
        let attempt = 0;

        const jitter = () => Math.random() * 1000; // 0-1 second jitter

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

    /**
     * SCENARIO 3: Circuit Breaker
     * Stop making requests to failing service.
     */
    testCircuitBreaker(): void {
        if (this.circuitState === 'open') {
            this.addLog('Circuit is OPEN - request blocked', 'error');
            return;
        }

        this.apiService.getRandomFail().pipe(
            tap(() => {
                this.successCount++;
                if (this.circuitState === 'half-open') {
                    this.circuitState = 'closed';
                    this.failureCount = 0;
                }
            }),
            catchError(error => {
                this.failureCount++;
                if (this.failureCount >= this.failureThreshold) {
                    this.circuitState = 'open';
                    setTimeout(() => {
                        this.circuitState = 'half-open';
                    }, this.circuitCooldown * 1000);
                }
                return of(null);
            })
        ).subscribe();
    }

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
