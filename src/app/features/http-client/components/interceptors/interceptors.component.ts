/**
 * ============================================================================
 * HTTP INTERCEPTORS
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * HTTP Interceptors are middleware functions that run for EVERY HTTP request
 * and response. They're perfect for cross-cutting concerns.
 * 
 * 💡 KEY CONCEPTS:
 * 
 * 1. WHAT ARE INTERCEPTORS?
 *    Think of them as a pipeline that every HTTP request passes through.
 *    You can inspect/modify the request BEFORE it goes out,
 *    and inspect/modify the response BEFORE it reaches your component.
 * 
 * 2. COMMON USE CASES:
 *    - Auth: Add Bearer token to all requests automatically
 *    - Logging: Log every request/response for debugging
 *    - Error Handling: Catch 401s globally, redirect to login
 *    - Caching: Return cached responses for certain URLs
 *    - Loading: Show/hide global loading indicator
 *    - Headers: Add common headers (Content-Type, API keys)
 * 
 * 3. INTERCEPTOR TYPES (Angular 15+):
 *    
 *    FUNCTIONAL (Recommended - what we use here):
 *    export const myInterceptor: HttpInterceptorFn = (req, next) => { ... }
 *    
 *    CLASS-BASED (Legacy):
 *    @Injectable()
 *    export class MyInterceptor implements HttpInterceptor { ... }
 * 
 * 4. INTERCEPTOR CHAIN:
 *    Interceptors run in ORDER they're registered:
 *    Request:  Component → Auth → Logging → Error → Server
 *    Response: Server → Error → Logging → Auth → Component
 * 
 * ⚠️ CRITICAL RULE:
 * HTTP Requests are IMMUTABLE! You cannot modify them directly.
 * You MUST clone the request to add headers:
 * 
 *   ❌ req.headers.set('Auth', 'token')  // Doesn't work!
 *   ✅ req.clone({ headers: req.headers.set('Auth', 'token') })
 * 
 * 🔧 SETUP (app.config.ts):
 * provideHttpClient(
 *     withInterceptors([authInterceptor, loggingInterceptor])
 * )
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

// =============================================================================
// INTERCEPTOR 1: AUTH INTERCEPTOR
// =============================================================================
/**
 * 🔐 AUTH INTERCEPTOR (Functional Style - Angular 15+)
 * 
 * PURPOSE: Automatically add Authorization header to ALL outgoing requests.
 * 
 * This is the most common interceptor pattern. Instead of manually adding
 * the auth token to every HTTP call, this interceptor does it globally.
 * 
 * HOW IT WORKS:
 * 1. Intercept the outgoing request
 * 2. Clone it with the Authorization header added
 * 3. Pass the modified request to the next handler
 * 
 * REAL-WORLD CONSIDERATIONS:
 * - Skip auth for public endpoints (login, register)
 * - Handle token refresh when token expires
 * - Clear token on logout
 * 
 * @example
 * // Before interceptor: Must add manually every time
 * http.get('/api/data', { headers: { Authorization: 'Bearer xxx' }})
 * 
 * // After interceptor: Just make the call!
 * http.get('/api/data')  // Token added automatically
 */
export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    // Get token from storage (in real app, use a service)
    const token = localStorage.getItem('auth_token') || 'demo-token-12345';

    // 🛡️ CRITICAL: Clone request to add headers!
    // HTTP requests are IMMUTABLE - you cannot modify them directly
    const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    console.log('🔒 Auth Interceptor: Added token to', req.url);

    // Pass the cloned request to the next handler in the chain
    return next(authReq);
};

// =============================================================================
// INTERCEPTOR 2: LOGGING INTERCEPTOR
// =============================================================================
/**
 * 📊 LOGGING INTERCEPTOR
 * 
 * PURPOSE: Log all HTTP requests and responses with timing information.
 * 
 * Great for debugging and monitoring API performance.
 * In production, you might send this data to an analytics service.
 * 
 * HOW IT WORKS:
 * 1. Record the start time
 * 2. Log the outgoing request
 * 3. Pass to next handler
 * 4. When response arrives, log it with duration
 * 
 * WHAT WE LOG:
 * - Request: Method, URL
 * - Response: Status code, duration
 * - Errors: Status, message
 */
export const loggingInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    // Record when the request started
    const startTime = Date.now();

    // Log outgoing request
    console.log(`📤 [${req.method}] ${req.url}`);

    // Pass to next handler and observe the response
    return next(req).pipe(
        tap(event => {
            // Only log when we get the final response (not upload progress, etc.)
            if (event instanceof HttpResponse) {
                const duration = Date.now() - startTime;
                console.log(`📥 [${event.status}] ${req.url} (${duration}ms)`);
            }
        })
    );
};

// =============================================================================
// INTERCEPTOR 3: GLOBAL ERROR INTERCEPTOR
// =============================================================================
/**
 * ❌ ERROR INTERCEPTOR
 * 
 * PURPOSE: Handle HTTP errors globally instead of in every component.
 * 
 * COMMON PATTERNS:
 * - 401 Unauthorized: Redirect to login, clear stored credentials
 * - 403 Forbidden: Show "access denied" message
 * - 500 Server Error: Show generic error toast
 * - 0 Network Error: Show "check your connection"
 * 
 * HOW IT WORKS:
 * 1. Pass request to next handler
 * 2. Catch any errors that occur
 * 3. Handle them (log, show toast, redirect)
 * 4. Re-throw so component can also handle if needed
 * 
 * ⚠️ IMPORTANT:
 * Always re-throw the error (return throwError())!
 * This allows individual components to also catch and handle it.
 */
export const errorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // Log all errors
            console.error(`❌ HTTP Error: ${error.status} - ${error.message}`);

            // Handle specific status codes globally
            if (error.status === 401) {
                console.log('🔐 Unauthorized - redirect to login');
                // In real app: this.router.navigate(['/login']);
                // Also clear stored tokens: localStorage.removeItem('auth_token');
            }

            if (error.status === 403) {
                console.log('🚫 Forbidden - access denied');
                // Show "access denied" toast notification
            }

            if (error.status >= 500) {
                console.log('💥 Server error - show error message to user');
                // Show "something went wrong" toast
            }

            // Re-throw so components can also handle if needed
            // This is IMPORTANT! Don't swallow errors.
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
            <h1>🔒 HTTP Interceptors</h1>
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
