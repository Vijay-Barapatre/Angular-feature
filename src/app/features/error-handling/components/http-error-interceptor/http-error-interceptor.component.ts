/**
 * ============================================================================
 * HTTP ERROR INTERCEPTOR
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-http-error-interceptor',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔗 HTTP Error Interceptor</h1>
                <p class="subtitle">Centralized API Error Handling</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    An HTTP interceptor catches all HTTP responses and can handle errors
                    centrally - logging, retry logic, and user notifications in one place.
                </p>
            </section>

            <section class="code-section">
                <h2>💻 Functional Interceptor (Angular 17+)</h2>
                <pre class="code"><code>// http-error.interceptor.ts
import {{ '{' }} HttpInterceptorFn, HttpErrorResponse {{ '}' }} from '&#64;angular/common/http';
import {{ '{' }} catchError, throwError {{ '}' }} from 'rxjs';
import {{ '{' }} inject {{ '}' }} from '&#64;angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {{ '{' }}
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {{ '{' }}
            let errorMessage = 'An error occurred';
            
            if (error.error instanceof ErrorEvent) {{ '{' }}
                // Client-side error
                errorMessage = error.error.message;
            {{ '}' }} else {{ '{' }}
                // Server-side error
                switch (error.status) {{ '{' }}
                    case 400:
                        errorMessage = 'Bad Request';
                        break;
                    case 401:
                        errorMessage = 'Unauthorized - Please login';
                        // Redirect to login
                        break;
                    case 403:
                        errorMessage = 'Forbidden - Access denied';
                        break;
                    case 404:
                        errorMessage = 'Resource not found';
                        break;
                    case 500:
                        errorMessage = 'Server error - Try again later';
                        break;
                    default:
                        errorMessage = 'Error: ' + error.status;
                {{ '}' }}
            {{ '}' }}
            
            console.error('🚨 HTTP Error:', errorMessage, error);
            
            // Show notification
            // inject(NotificationService).showError(errorMessage);
            
            return throwError(() => new Error(errorMessage));
        {{ '}' }})
    );
{{ '}' }};</code></pre>
            </section>

            <section class="provide-section">
                <h2>📦 Provide in App Config</h2>
                <pre class="code"><code>// app.config.ts
import {{ '{' }} provideHttpClient, withInterceptors {{ '}' }} from '&#64;angular/common/http';
import {{ '{' }} httpErrorInterceptor {{ '}' }} from './interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {{ '{' }}
    providers: [
        provideHttpClient(
            withInterceptors([httpErrorInterceptor])
        )
    ]
{{ '}' }};</code></pre>
            </section>

            <section class="class-section">
                <h2>💻 Class-based Interceptor (Legacy)</h2>
                <pre class="code"><code>// For older Angular versions
&#64;Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {{ '{' }}
    intercept(req: HttpRequest&lt;any&gt;, next: HttpHandler): Observable&lt;HttpEvent&lt;any&gt;&gt; {{ '{' }}
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {{ '{' }}
                // Handle error...
                return throwError(() => error);
            {{ '}' }})
        );
    {{ '}' }}
{{ '}' }}

// Provide with HTTP_INTERCEPTORS token
{{ '{' }} provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true {{ '}' }}</code></pre>
            </section>

            <section class="status-section">
                <h2>📋 HTTP Status Codes</h2>
                <table>
                    <tr><th>Code</th><th>Meaning</th><th>Action</th></tr>
                    <tr><td>400</td><td>Bad Request</td><td>Show validation errors</td></tr>
                    <tr><td>401</td><td>Unauthorized</td><td>Redirect to login</td></tr>
                    <tr><td>403</td><td>Forbidden</td><td>Show access denied</td></tr>
                    <tr><td>404</td><td>Not Found</td><td>Show not found page</td></tr>
                    <tr><td>422</td><td>Unprocessable</td><td>Show validation errors</td></tr>
                    <tr><td>500</td><td>Server Error</td><td>Show generic error</td></tr>
                    <tr><td>503</td><td>Service Unavailable</td><td>Retry later</td></tr>
                </table>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Use functional interceptors in Angular 17+</li>
                    <li>Check for client vs server errors</li>
                    <li>Handle common status codes explicitly</li>
                    <li>401 typically triggers logout/redirect</li>
                    <li>Always re-throw for component handling</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #ef4444; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #ef4444; font-weight: bold; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class HttpErrorInterceptorComponent { }
