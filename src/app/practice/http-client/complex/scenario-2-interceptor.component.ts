/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: AUTH INTERCEPTOR
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-2-interceptor',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Auth Interceptor</h2>
                <p>Learn how to add authentication headers to all requests.</p>
            </div>

            <div class="content">
                <h3>🔐 Interceptor Concept</h3>
                
                <div class="code-block">
                    <h4>1. Create Interceptor Function</h4>
                    <pre><code>// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {{ '{' }}
  const token = localStorage.getItem('token');
  
  if (token) {{ '{' }}
    const cloned = req.clone({{ '{' }}
      headers: req.headers.set('Authorization', \`Bearer \${{ '{' }}token{{ '}' }}\`)
    {{ '}' }});
    return next(cloned);
  {{ '}' }}
  
  return next(req);
{{ '}' }};</code></pre>
                </div>

                <div class="code-block">
                    <h4>2. Register in app.config.ts</h4>
                    <pre><code>export const appConfig = {{ '{' }}
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
{{ '}' }};</code></pre>
                </div>

                <div class="demo-section">
                    <h4>🎮 Simulate Auth Flow</h4>
                    
                    <div class="auth-status">
                        <span>Token Status:</span>
                        <span [class.logged-in]="isLoggedIn()">
                            {{ isLoggedIn() ? '🟢 Logged In' : '🔴 Logged Out' }}
                        </span>
                    </div>

                    <div class="actions">
                        <button (click)="login()">Login (Set Token)</button>
                        <button (click)="logout()">Logout (Clear Token)</button>
                    </div>

                    @if (token()) {
                        <div class="token-display">
                            <strong>Current Token:</strong>
                            <code>{{ token() }}</code>
                        </div>
                    }

                    <div class="info-box">
                        <h4>💡 What the Interceptor Does:</h4>
                        <ul>
                            <li>Intercepts every HTTP request</li>
                            <li>Checks for stored auth token</li>
                            <li>Adds Authorization header automatically</li>
                            <li>Passes request to next handler</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { margin-bottom: 1.5rem; }
        .code-block h4 { margin: 0 0 0.5rem; font-size: 0.9rem; color: #6b7280; }
        .code-block pre { margin: 0; padding: 1rem; background: #1e1e2e; border-radius: 8px; overflow-x: auto; }
        .code-block code { color: #a6e3a1; font-size: 0.85rem; }
        .demo-section { padding: 1.5rem; background: #f8fafc; border-radius: 8px; }
        .auth-status { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; font-weight: 500; }
        .auth-status .logged-in { color: #10b981; }
        .actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .actions button { padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #06b6d4; color: white; cursor: pointer; }
        .token-display { padding: 1rem; background: white; border-radius: 8px; margin-bottom: 1rem; }
        .token-display code { display: block; margin-top: 0.5rem; padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; word-break: break-all; }
        .info-box { padding: 1rem; background: #eff6ff; border-radius: 8px; }
        .info-box h4 { margin: 0 0 0.5rem; }
        .info-box ul { margin: 0; padding-left: 1.25rem; }
    `]
})
export class Scenario2InterceptorComponent {
    token = signal<string | null>(null);
    isLoggedIn = signal(false);

    constructor() {
        // Check for existing token
        const stored = localStorage.getItem('demo_token');
        if (stored) {
            this.token.set(stored);
            this.isLoggedIn.set(true);
        }
    }

    login(): void {
        const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.' + Date.now();
        localStorage.setItem('demo_token', fakeToken);
        this.token.set(fakeToken);
        this.isLoggedIn.set(true);
    }

    logout(): void {
        localStorage.removeItem('demo_token');
        this.token.set(null);
        this.isLoggedIn.set(false);
    }
}
