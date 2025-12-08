/**
 * ============================================================================
 * USE CASE 4: HTTP INTERCEPTOR
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-http-interceptor',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔗 HTTP Interceptor</h1>
                <p class="subtitle">Auto-Attach Tokens to API Calls</p>
            </header>

            <section class="concept-section">
                <h2>What is MsalInterceptor?</h2>
                <p>
                    <strong>MsalInterceptor</strong> automatically acquires and attaches access tokens 
                    to outgoing HTTP requests for protected resources. No manual token handling needed!
                </p>
            </section>

            <section class="visual-section">
                <h2>🔄 How It Works</h2>
                <div class="flow-visual">
                    <div class="flow-step">
                        <span class="num">1</span>
                        <h4>HTTP Request</h4>
                        <p>http.get('/api/data')</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="flow-step">
                        <span class="num">2</span>
                        <h4>Interceptor</h4>
                        <p>Check protected resource map</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="flow-step">
                        <span class="num">3</span>
                        <h4>Acquire Token</h4>
                        <p>Get token silently</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="flow-step">
                        <span class="num">4</span>
                        <h4>Attach Header</h4>
                        <p>Authorization: Bearer token</p>
                    </div>
                </div>
            </section>

            <section class="config-section">
                <h2>⚙️ Configure Protected Resources</h2>
                <pre class="code"><code>// auth.config.ts
import {{ '{' }} MsalInterceptorConfiguration {{ '}' }} from '&#64;azure/msal-angular';
import {{ '{' }} InteractionType {{ '}' }} from '&#64;azure/msal-browser';

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {{ '{' }}
    const protectedResourceMap = new Map&lt;string, Array&lt;string&gt;&gt;();
    
    // Microsoft Graph API
    protectedResourceMap.set(
        'https://graph.microsoft.com/v1.0/*',
        ['user.read', 'mail.read']
    );
    
    // Your custom API
    protectedResourceMap.set(
        'https://your-api.azurewebsites.net/api/*',
        ['api://YOUR_API_CLIENT_ID/access_as_user']
    );
    
    // Local development API
    protectedResourceMap.set(
        'http://localhost:5000/api/*',
        ['api://YOUR_API_CLIENT_ID/access_as_user']
    );
    
    return {{ '{' }}
        interactionType: InteractionType.Redirect,
        protectedResourceMap
    {{ '}' }};
{{ '}' }}</code></pre>
            </section>

            <section class="providers-section">
                <h2>📦 Register Interceptor</h2>
                <pre class="code"><code>// app.config.ts
import {{ '{' }} HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi {{ '}' }} from '&#64;angular/common/http';
import {{ '{' }} MSAL_INTERCEPTOR_CONFIG, MsalInterceptor {{ '}' }} from '&#64;azure/msal-angular';

export const appConfig = {{ '{' }}
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        {{ '{' }}
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        {{ '}' }},
        {{ '{' }}
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory
        {{ '}' }}
    ]
{{ '}' }};</code></pre>
            </section>

            <section class="usage-section">
                <h2>💻 Usage (Automatic!)</h2>
                <pre class="code"><code>// data.service.ts
import {{ '{' }} HttpClient {{ '}' }} from '&#64;angular/common/http';
import {{ '{' }} inject {{ '}' }} from '&#64;angular/core';

export class DataService {{ '{' }}
    private http = inject(HttpClient);

    // Token automatically attached! 🎉
    getProfile() {{ '{' }}
        return this.http.get('https://graph.microsoft.com/v1.0/me');
    {{ '}' }}

    // Token automatically attached! 🎉
    getData() {{ '{' }}
        return this.http.get('https://your-api.azurewebsites.net/api/data');
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="tips-section">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Use <code>*</code> wildcard for path matching</li>
                    <li>Tokens are acquired silently (no popup/redirect)</li>
                    <li>If silent fails, user is prompted based on <code>interactionType</code></li>
                    <li>Unprotected URLs are not intercepted</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #0078d4; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; margin: 0.5rem 0; }

        section { margin-bottom: 2rem; }

        .flow-visual { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
        .flow-step { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; text-align: center; min-width: 130px; position: relative; }
        .flow-step .num { position: absolute; top: -8px; left: -8px; width: 24px; height: 24px; background: #0078d4; color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .flow-step h4 { margin: 0 0 0.25rem; font-size: 0.9rem; }
        .flow-step p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }
        .arrow { font-size: 1.25rem; color: #0078d4; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class HttpInterceptorComponent { }
