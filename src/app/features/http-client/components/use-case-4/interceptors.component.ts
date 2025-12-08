/**
 * ============================================================================
 * USE CASE 4: HTTP INTERCEPTORS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Interceptors are middleware for HTTP requests/responses.
 * They run for EVERY request, perfect for:
 * - Adding auth tokens
 * - Logging
 * - Global error handling
 * - Caching
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

/**
 * AUTH INTERCEPTOR (Functional Style - Angular 15+)
 * 
 * Adds Authorization header to all requests.
 */
export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    // 🛡️ CRITICAL: Clone request to add headers (requests are immutable)
    const token = localStorage.getItem('auth_token') || 'demo-token-12345';

    const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    console.log('🔒 Auth Interceptor: Added token to', req.url);
    return next(authReq);
};

/**
 * LOGGING INTERCEPTOR
 * 
 * Logs all requests and responses with timing.
 */
export const loggingInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const startTime = Date.now();

    console.log(`📤 [${req.method}] ${req.url}`);

    return next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const duration = Date.now() - startTime;
                console.log(`📥 [${event.status}] ${req.url} (${duration}ms)`);
            }
        })
    );
};

/**
 * ERROR INTERCEPTOR
 * 
 * Global error handling for all requests.
 */
export const errorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error(`❌ HTTP Error: ${error.status} - ${error.message}`);

            // Could show toast notification here
            if (error.status === 401) {
                console.log('🔐 Unauthorized - redirect to login');
            }

            return throwError(() => error);
        })
    );
};

@Component({
    selector: 'app-interceptors',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>🔒 Use Case 4: HTTP Interceptors</h1>
            <p class="description">
                Middleware that runs for every HTTP request. Check the console!
            </p>

            <div class="demo-grid">
                <section class="demo-section">
                    <h3>🔐 Auth Interceptor</h3>
                    <p>Automatically adds Bearer token to all requests.</p>
                    <button (click)="makeRequest()">Make Request</button>
                    <div class="token-display">
                        Token: <code>{{ currentToken }}</code>
                    </div>
                </section>

                <section class="demo-section">
                    <h3>📊 Logging Interceptor</h3>
                    <p>Logs request/response with timing.</p>
                    <div class="log-output">
                        @for (log of logs; track $index) {
                            <div class="log-line">{{ log }}</div>
                        }
                    </div>
                </section>

                <section class="demo-section">
                    <h3>❌ Error Interceptor</h3>
                    <button (click)="triggerError()">Trigger 401 Error</button>
                    @if (errorMessage) {
                        <div class="error-box">{{ errorMessage }}</div>
                    }
                </section>
            </div>

            <div class="setup-guide">
                <h3>📋 Setup in app.config.ts</h3>
                <pre>
import {{ '{' }} provideHttpClient, withInterceptors {{ '}' }} from '&#64;angular/common/http';

export const appConfig = {{ '{' }}
    providers: [
        provideHttpClient(
            withInterceptors([
                authInterceptor,
                loggingInterceptor,
                errorInterceptor
            ])
        )
    ]
{{ '}' }};
                </pre>
            </div>

            <div class="interceptor-flow">
                <h3>🔄 Interceptor Chain</h3>
                <div class="flow-diagram">
                    <div class="flow-item">Request</div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-item interceptor">Auth</div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-item interceptor">Logging</div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-item interceptor">Error</div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-item server">Server</div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section h3 { margin-top: 0; }
        .demo-section button { background: #667eea; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; }

        .token-display { margin-top: 1rem; background: #1a1a2e; padding: 0.75rem; border-radius: 6px; }
        .token-display code { color: #4ade80; }

        .log-output { background: #1a1a2e; padding: 1rem; border-radius: 6px; min-height: 100px; max-height: 150px; overflow-y: auto; }
        .log-line { color: #4ade80; font-family: monospace; font-size: 0.8rem; }

        .error-box { background: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: 6px; margin-top: 1rem; }

        .setup-guide { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
        .setup-guide h3 { color: white; margin-top: 0; }
        .setup-guide pre { color: #4ade80; margin: 0; overflow-x: auto; }

        .interceptor-flow { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .interceptor-flow h3 { margin-top: 0; }
        .flow-diagram { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
        .flow-item { padding: 0.75rem 1rem; border-radius: 6px; background: #e0e0e0; }
        .flow-item.interceptor { background: #667eea; color: white; }
        .flow-item.server { background: #4ade80; color: white; }
        .flow-arrow { color: #888; }
    `]
})
export class InterceptorsComponent {
    private http = inject(HttpClient);

    currentToken = localStorage.getItem('auth_token') || 'demo-token-12345';
    logs: string[] = [];
    errorMessage = '';

    makeRequest(): void {
        const start = new Date().toLocaleTimeString();
        this.logs.push(`[${start}] 📤 Starting request...`);

        this.http.get('http://localhost:3000/api/users').subscribe({
            next: () => {
                const end = new Date().toLocaleTimeString();
                this.logs.push(`[${end}] ✅ Request complete`);
            },
            error: (err) => {
                this.logs.push(`❌ Error: ${err.message}`);
            }
        });
    }

    triggerError(): void {
        this.errorMessage = '';
        this.http.get('http://localhost:3000/api/error?code=401').subscribe({
            error: (err) => {
                this.errorMessage = `${err.status}: ${err.error?.error || 'Unauthorized'}`;
            }
        });
    }
}
