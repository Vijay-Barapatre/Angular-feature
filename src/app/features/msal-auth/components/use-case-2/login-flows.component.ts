/**
 * ============================================================================
 * USE CASE 2: LOGIN FLOWS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login-flows',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔑 Login Flows</h1>
                <p class="subtitle">Popup vs Redirect Authentication</p>
            </header>

            <section class="comparison-section">
                <h2>Two Login Methods</h2>
                <div class="comparison-grid">
                    <div class="method popup">
                        <h3>🪟 Popup Login</h3>
                        <ul>
                            <li>Opens in new window</li>
                            <li>User stays on current page</li>
                            <li>May be blocked by popup blockers</li>
                            <li>Better for SPA UX</li>
                        </ul>
                        <pre class="code"><code>msalService.loginPopup({{ '{' }}
  scopes: ['user.read']
{{ '}' }}).subscribe(result => {{ '{' }}
  console.log('Logged in!', result);
{{ '}' }});</code></pre>
                    </div>
                    <div class="method redirect">
                        <h3>↪️ Redirect Login</h3>
                        <ul>
                            <li>Full page redirect</li>
                            <li>User leaves app temporarily</li>
                            <li>Works everywhere</li>
                            <li>Better for mobile</li>
                        </ul>
                        <pre class="code"><code>msalService.loginRedirect({{ '{' }}
  scopes: ['user.read']
{{ '}' }});</code></pre>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Login Component Implementation</h2>
                <pre class="code"><code>// login.component.ts
import {{ '{' }} Component, inject {{ '}' }} from '&#64;angular/core';
import {{ '{' }} MsalService {{ '}' }} from '&#64;azure/msal-angular';

&#64;Component({{ '{' }}
    selector: 'app-login',
    template: &#96;
        &lt;button (click)="loginPopup()"&gt;Login with Popup&lt;/button&gt;
        &lt;button (click)="loginRedirect()"&gt;Login with Redirect&lt;/button&gt;
        &lt;button (click)="logout()"&gt;Logout&lt;/button&gt;
        
        &#64;if (isLoggedIn) {{ '{' }}
            &lt;p&gt;Welcome, {{ '{{' }} accountName {{ '}}' }}!&lt;/p&gt;
        {{ '}' }}
    &#96;
{{ '}' }})
export class LoginComponent {{ '{' }}
    private msalService = inject(MsalService);

    get isLoggedIn(): boolean {{ '{' }}
        return this.msalService.instance.getAllAccounts().length > 0;
    {{ '}' }}

    get accountName(): string {{ '{' }}
        const accounts = this.msalService.instance.getAllAccounts();
        return accounts[0]?.name ?? '';
    {{ '}' }}

    loginPopup() {{ '{' }}
        this.msalService.loginPopup({{ '{' }}
            scopes: ['user.read']
        {{ '}' }}).subscribe({{ '{' }}
            next: (result) => console.log('Login success', result),
            error: (error) => console.error('Login failed', error)
        {{ '}' }});
    {{ '}' }}

    loginRedirect() {{ '{' }}
        this.msalService.loginRedirect({{ '{' }}
            scopes: ['user.read']
        {{ '}' }});
    {{ '}' }}

    logout() {{ '{' }}
        this.msalService.logoutRedirect();
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="handling-section">
                <h2>🔄 Handling Redirect Response</h2>
                <pre class="code"><code>// app.component.ts
import {{ '{' }} Component, OnInit, inject {{ '}' }} from '&#64;angular/core';
import {{ '{' }} MsalService, MsalBroadcastService {{ '}' }} from '&#64;azure/msal-angular';
import {{ '{' }} filter {{ '}' }} from 'rxjs/operators';
import {{ '{' }} EventMessage, EventType {{ '}' }} from '&#64;azure/msal-browser';

&#64;Component({{ '{' }}...{{ '}' }})
export class AppComponent implements OnInit {{ '{' }}
    private msalService = inject(MsalService);
    private broadcastService = inject(MsalBroadcastService);

    ngOnInit() {{ '{' }}
        // Handle redirect after login
        this.msalService.handleRedirectObservable().subscribe();

        // Listen for login success
        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => 
                    msg.eventType === EventType.LOGIN_SUCCESS
                )
            )
            .subscribe((result) => {{ '{' }}
                console.log('Login successful!', result);
            {{ '}' }});
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="best-practices">
                <h2>✅ Best Practices</h2>
                <table>
                    <tr><th>Scenario</th><th>Recommendation</th></tr>
                    <tr><td>Desktop browser</td><td>Popup (better UX)</td></tr>
                    <tr><td>Mobile browser</td><td>Redirect (fewer issues)</td></tr>
                    <tr><td>Iframe embedded</td><td>Redirect (popups blocked)</td></tr>
                    <tr><td>Enterprise apps</td><td>Redirect (more reliable)</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #0078d4; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; margin: 0.5rem 0; }

        section { margin-bottom: 2rem; }

        .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .method { padding: 1.5rem; border-radius: 12px; }
        .method.popup { background: #e3f2fd; }
        .method.redirect { background: #fff3e0; }
        .method h3 { margin-top: 0; }
        .method ul { padding-left: 1.25rem; font-size: 0.9rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class LoginFlowsComponent { }
