/**
 * ============================================================================
 * MSAL SETUP
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-msal-setup',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>⚙️ MSAL Setup</h1>
                <p class="subtitle">Configure Azure AD Authentication</p>
            </header>

            <section class="step-section">
                <h2>Step 1: Azure AD App Registration</h2>
                <div class="info-box">
                    <p>Go to <a href="https://portal.azure.com" target="_blank">Azure Portal</a> → Azure Active Directory → App registrations</p>
                </div>
                <ol>
                    <li>Click "New registration"</li>
                    <li>Name your application</li>
                    <li>Select supported account types</li>
                    <li>Set Redirect URI: <code>http://localhost:4200</code></li>
                    <li>Copy the <strong>Application (client) ID</strong></li>
                    <li>Copy the <strong>Directory (tenant) ID</strong></li>
                </ol>
            </section>

            <section class="step-section">
                <h2>Step 2: Install Packages</h2>
                <pre class="code terminal">npm install &#64;azure/msal-angular&#64;3 &#64;azure/msal-browser&#64;3</pre>
            </section>

            <section class="step-section">
                <h2>Step 3: Create Configuration</h2>
                <pre class="code"><code>// auth.config.ts
import {{ '{' }} MsalGuardConfiguration, MsalInterceptorConfiguration {{ '}' }} from '&#64;azure/msal-angular';
import {{ '{' }}
    PublicClientApplication,
    InteractionType,
    BrowserCacheLocation
{{ '}' }} from '&#64;azure/msal-browser';

export const msalConfig = {{ '{' }}
    auth: {{ '{' }}
        clientId: 'YOUR_CLIENT_ID',
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
        redirectUri: 'http://localhost:4200'
    {{ '}' }},
    cache: {{ '{' }}
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: false
    {{ '}' }}
{{ '}' }};

export function MSALInstanceFactory() {{ '{' }}
    return new PublicClientApplication(msalConfig);
{{ '}' }}</code></pre>
            </section>

            <section class="step-section">
                <h2>Step 4: Configure App Providers</h2>
                <pre class="code"><code>// app.config.ts
import {{ '{' }} ApplicationConfig {{ '}' }} from '&#64;angular/core';
import {{ '{' }}
    MSAL_INSTANCE,
    MSAL_GUARD_CONFIG,
    MSAL_INTERCEPTOR_CONFIG,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    MsalInterceptor
{{ '}' }} from '&#64;azure/msal-angular';
import {{ '{' }} HTTP_INTERCEPTORS {{ '}' }} from '&#64;angular/common/http';
import {{ '{' }}
    MSALInstanceFactory,
    MSALGuardConfigFactory,
    MSALInterceptorConfigFactory
{{ '}' }} from './auth.config';

export const appConfig: ApplicationConfig = {{ '{' }}
    providers: [
        {{ '{' }} provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory {{ '}' }},
        {{ '{' }} provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory {{ '}' }},
        {{ '{' }} provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory {{ '}' }},
        {{ '{' }} provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true {{ '}' }},
        MsalService,
        MsalGuard,
        MsalBroadcastService
    ]
{{ '}' }};</code></pre>
            </section>

            <section class="step-section">
                <h2>Step 5: Add MSAL Redirect Component</h2>
                <pre class="code"><code>&lt;!-- app.component.html --&gt;
&lt;router-outlet&gt;&lt;/router-outlet&gt;
&lt;app-redirect&gt;&lt;/app-redirect&gt;  &lt;!-- Handles redirect responses --&gt;</code></pre>
            </section>

            <section class="checklist">
                <h2>✅ Setup Checklist</h2>
                <table>
                    <tr><td>☐</td><td>Azure AD App Registration created</td></tr>
                    <tr><td>☐</td><td>Client ID and Tenant ID obtained</td></tr>
                    <tr><td>☐</td><td>Redirect URI configured</td></tr>
                    <tr><td>☐</td><td>MSAL packages installed</td></tr>
                    <tr><td>☐</td><td>auth.config.ts created</td></tr>
                    <tr><td>☐</td><td>Providers configured in app.config.ts</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #0078d4; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; margin: 0.5rem 0; }
        .code.terminal { background: #0d1117; color: #58a6ff; }

        .step-section { margin-bottom: 2rem; }
        .info-box { background: #e1f5fe; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .info-box a { color: #0078d4; }

        ol { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }

        .checklist table { width: 100%; border-collapse: collapse; }
        .checklist td { padding: 0.75rem; border-bottom: 1px solid #e5e7eb; }
        .checklist td:first-child { width: 30px; }
    `]
})
export class MsalSetupComponent { }
