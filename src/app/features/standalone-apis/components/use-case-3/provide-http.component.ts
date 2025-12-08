/**
 * ============================================================================
 * USE CASE 3: PROVIDE HTTP CLIENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-provide-http',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🌐 provideHttpClient</h1>
                <p class="subtitle">Modern HTTP with Functional Interceptors</p>
            </header>

            <section class="basic-section">
                <h2>Basic Usage</h2>
                <pre class="code"><code>import {{ '{' }} provideHttpClient {{ '}' }} from '&#64;angular/common/http';

export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideHttpClient()
  ]
{{ '}' }};</code></pre>
            </section>

            <section class="features-section">
                <h2>🔧 HTTP Features</h2>
                <div class="feature-grid">
                    <div class="feature">
                        <h3>withInterceptors</h3>
                        <code>withInterceptors([loggingInterceptor])</code>
                        <p>Functional interceptors</p>
                    </div>
                    <div class="feature">
                        <h3>withInterceptorsFromDi</h3>
                        <code>withInterceptorsFromDi()</code>
                        <p>Class-based interceptors</p>
                    </div>
                    <div class="feature">
                        <h3>withFetch</h3>
                        <code>withFetch()</code>
                        <p>Use fetch() API</p>
                    </div>
                    <div class="feature">
                        <h3>withXsrfConfiguration</h3>
                        <code>withXsrfConfiguration({{ '{' }}...{{ '}' }})</code>
                        <p>XSRF protection</p>
                    </div>
                </div>
            </section>

            <section class="interceptor-section">
                <h2>🎯 Functional Interceptors</h2>
                <pre class="code"><code>// auth.interceptor.ts
import {{ '{' }} HttpInterceptorFn {{ '}' }} from '&#64;angular/common/http';

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
            </section>

            <section class="config-example">
                <h2>📝 Full Configuration</h2>
                <pre class="code"><code>import {{ '{' }}
  provideHttpClient,
  withInterceptors,
  withFetch
{{ '}' }} from '&#64;angular/common/http';
import {{ '{' }} authInterceptor {{ '}' }} from './interceptors/auth.interceptor';
import {{ '{' }} loggingInterceptor {{ '}' }} from './interceptors/logging.interceptor';

provideHttpClient(
  withInterceptors([authInterceptor, loggingInterceptor]),
  withFetch()  // Use modern fetch API
)</code></pre>
            </section>

            <section class="comparison-section">
                <h2>Class vs Functional Interceptors</h2>
                <div class="comparison">
                    <div class="old">
                        <h4>❌ Class-based</h4>
                        <code>&#64;Injectable()<br/>class AuthInterceptor implements HttpInterceptor</code>
                    </div>
                    <div class="new">
                        <h4>✅ Functional</h4>
                        <code>export const authInterceptor: HttpInterceptorFn = (req, next) => ...</code>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
            font-size: 0.85rem;
        }

        .feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem; }
        .feature {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1rem; border-radius: 8px;
        }
        .feature h3 { margin: 0 0 0.5rem 0; font-size: 0.9rem; color: var(--primary-color); }
        .feature code { display: block; font-size: 0.7rem; background: #1e1e2e; color: #a6e3a1; padding: 0.4rem; border-radius: 4px; margin-bottom: 0.5rem; }
        .feature p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }

        section { margin-bottom: 2rem; }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .old, .new { padding: 1rem; border-radius: 8px; }
        .old { background: #fee2e2; }
        .new { background: #dcfce7; }
        .old h4, .new h4 { margin: 0 0 0.5rem 0; font-size: 0.85rem; }
        .old code, .new code { font-size: 0.75rem; background: rgba(0,0,0,0.1); padding: 0.5rem; border-radius: 4px; display: block; }
    `]
})
export class ProvideHttpComponent { }
