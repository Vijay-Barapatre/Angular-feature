/**
 * ============================================================================
 * AUTHENTICATION SECURITY
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth-security',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔐 Authentication Security</h1>
                <p class="subtitle">JWT, Secure Storage & Token Handling</p>
            </header>

            <section class="concept-section">
                <h2>Authentication Vulnerabilities</h2>
                <div class="vuln-grid">
                    <div class="vuln-card">
                        <span class="icon">🔓</span>
                        <h4>Token Theft</h4>
                        <p>XSS can steal tokens from localStorage</p>
                    </div>
                    <div class="vuln-card">
                        <span class="icon">⏰</span>
                        <h4>Token Expiry</h4>
                        <p>Long-lived tokens increase risk</p>
                    </div>
                    <div class="vuln-card">
                        <span class="icon">🔄</span>
                        <h4>Refresh Token</h4>
                        <p>Improper handling enables theft</p>
                    </div>
                </div>
            </section>

            <section class="storage-section">
                <h2>📦 Token Storage Options</h2>
                <table>
                    <tr><th>Storage</th><th>XSS Safe?</th><th>CSRF Safe?</th><th>Recommendation</th></tr>
                    <tr>
                        <td>localStorage</td>
                        <td class="bad">❌ No</td>
                        <td class="good">✅ Yes</td>
                        <td>⚠️ Avoid for sensitive tokens</td>
                    </tr>
                    <tr>
                        <td>sessionStorage</td>
                        <td class="bad">❌ No</td>
                        <td class="good">✅ Yes</td>
                        <td>⚠️ Better, but still vulnerable</td>
                    </tr>
                    <tr>
                        <td>HttpOnly Cookie</td>
                        <td class="good">✅ Yes</td>
                        <td class="bad">❌ No</td>
                        <td>✅ Best with CSRF protection</td>
                    </tr>
                    <tr>
                        <td>Memory (variable)</td>
                        <td class="good">✅ Yes</td>
                        <td class="good">✅ Yes</td>
                        <td>✅ Most secure, lost on refresh</td>
                    </tr>
                </table>
            </section>

            <section class="jwt-section">
                <h2>💻 Secure JWT Pattern</h2>
                <pre class="code"><code>// auth.service.ts
&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class AuthService {{ '{' }}
    // Store access token in memory (safest)
    private accessToken: string | null = null;
    
    // Short-lived access token (15 min)
    setAccessToken(token: string): void {{ '{' }}
        this.accessToken = token;
    {{ '}' }}
    
    getAccessToken(): string | null {{ '{' }}
        return this.accessToken;
    {{ '}' }}
    
    // Refresh token in HttpOnly cookie (set by server)
    async refreshToken(): Promise&lt;string&gt; {{ '{' }}
        // Server reads refresh token from cookie
        // Returns new access token
        const response = await this.http.post&lt;{{ '{' }} accessToken: string {{ '}' }}&gt;(
            '/api/auth/refresh',
            {{ '{' }}{{ '}' }},
            {{ '{' }} withCredentials: true {{ '}' }}  // Send cookies
        ).toPromise();
        
        this.accessToken = response.accessToken;
        return response.accessToken;
    {{ '}' }}
    
    logout(): void {{ '{' }}
        this.accessToken = null;
        // Also call server to invalidate refresh token
        this.http.post('/api/auth/logout', {{ '{' }}{{ '}' }}, {{ '{' }} withCredentials: true {{ '}' }});
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="interceptor-section">
                <h2>💻 Auth Interceptor</h2>
                <pre class="code"><code>// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) =&gt; {{ '{' }}
    const authService = inject(AuthService);
    const token = authService.getAccessToken();
    
    if (token) {{ '{' }}
        req = req.clone({{ '{' }}
            setHeaders: {{ '{' }}
                Authorization: 'Bearer ' + token
            {{ '}' }}
        {{ '}' }});
    {{ '}' }}
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse) =&gt; {{ '{' }}
            if (error.status === 401) {{ '{' }}
                // Token expired, try refresh
                return from(authService.refreshToken()).pipe(
                    switchMap(newToken =&gt; {{ '{' }}
                        req = req.clone({{ '{' }}
                            setHeaders: {{ '{' }} Authorization: 'Bearer ' + newToken {{ '}' }}
                        {{ '}' }});
                        return next(req);
                    {{ '}' }}),
                    catchError(() =&gt; {{ '{' }}
                        authService.logout();
                        return throwError(() =&gt; error);
                    {{ '}' }})
                );
            {{ '}' }}
            return throwError(() =&gt; error);
        {{ '}' }})
    );
{{ '}' }};</code></pre>
            </section>

            <section class="best-practices">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li>✅ Short access token lifetime (5-15 min)</li>
                    <li>✅ Store access token in memory only</li>
                    <li>✅ Refresh token in HttpOnly, Secure, SameSite cookie</li>
                    <li>✅ Implement token refresh before expiry</li>
                    <li>✅ Invalidate refresh token on logout</li>
                    <li>✅ Use HTTPS everywhere</li>
                    <li>⚠️ Never store tokens in localStorage for sensitive apps</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #10b981; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        .vuln-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .vuln-card { background: #fef2f2; padding: 1.25rem; border-radius: 10px; text-align: center; border: 1px solid #fecaca; }
        .vuln-card .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .vuln-card h4 { margin: 0 0 0.25rem; color: #dc2626; }
        .vuln-card p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        .good { color: #16a34a; }
        .bad { color: #dc2626; }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class AuthSecurityComponent { }
