/**
 * ============================================================================
 * AUTH GUARD
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth-guard',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🛡️ Auth Guard</h1>
                <p class="subtitle">Protect Routes with MsalGuard</p>
            </header>

            <section class="concept-section">
                <h2>What is MsalGuard?</h2>
                <p>
                    <strong>MsalGuard</strong> is a route guard that checks if the user is authenticated 
                    before allowing access to a route. If not authenticated, it redirects to Azure AD login.
                </p>
            </section>

            <section class="code-section">
                <h2>📋 Configure Guard in Routes</h2>
                <pre class="code"><code>// app.routes.ts
import {{ '{' }} Routes {{ '}' }} from '&#64;angular/router';
import {{ '{' }} MsalGuard {{ '}' }} from '&#64;azure/msal-angular';

export const routes: Routes = [
    {{ '{' }}
        path: '',
        component: HomeComponent  // Public route
    {{ '}' }},
    {{ '{' }}
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [MsalGuard]  // 🛡️ Protected route
    {{ '}' }},
    {{ '{' }}
        path: 'profile',
        loadComponent: () => import('./profile/profile.component'),
        canActivate: [MsalGuard]  // 🛡️ Protected lazy route
    {{ '}' }},
    {{ '{' }}
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes'),
        canActivate: [MsalGuard],  // 🛡️ Protected entire module
        canActivateChild: [MsalGuard]
    {{ '}' }}
];</code></pre>
            </section>

            <section class="config-section">
                <h2>⚙️ Guard Configuration</h2>
                <pre class="code"><code>// auth.config.ts
import {{ '{' }} MsalGuardConfiguration {{ '}' }} from '&#64;azure/msal-angular';
import {{ '{' }} InteractionType {{ '}' }} from '&#64;azure/msal-browser';

export function MSALGuardConfigFactory(): MsalGuardConfiguration {{ '{' }}
    return {{ '{' }}
        // How to handle unauthenticated users
        interactionType: InteractionType.Redirect,
        
        // What permissions to request
        authRequest: {{ '{' }}
            scopes: ['user.read']
        {{ '}' }},
        
        // Optional: Custom error handling
        loginFailedRoute: '/login-failed'
    {{ '}' }};
{{ '}' }}</code></pre>
            </section>

            <section class="providers-section">
                <h2>📦 Provide Guard in App Config</h2>
                <pre class="code"><code>// app.config.ts
import {{ '{' }} MSAL_GUARD_CONFIG, MsalGuard {{ '}' }} from '&#64;azure/msal-angular';
import {{ '{' }} MSALGuardConfigFactory {{ '}' }} from './auth.config';

export const appConfig = {{ '{' }}
    providers: [
        // ... other providers
        {{ '{' }} provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory {{ '}' }},
        MsalGuard
    ]
{{ '}' }};</code></pre>
            </section>

            <section class="visual-section">
                <h2>🔄 Guard Flow</h2>
                <div class="flow-visual">
                    <div class="flow-step">
                        <span class="icon">👤</span>
                        <p>User navigates to /dashboard</p>
                    </div>
                    <div class="arrow">↓</div>
                    <div class="flow-step">
                        <span class="icon">🛡️</span>
                        <p>MsalGuard checks authentication</p>
                    </div>
                    <div class="arrow">↓</div>
                    <div class="flow-step decision">
                        <span class="icon">❓</span>
                        <p>Authenticated?</p>
                    </div>
                    <div class="branch">
                        <div class="branch-left">
                            <span>✅ Yes</span>
                            <div class="flow-step success">
                                <span class="icon">✓</span>
                                <p>Allow access</p>
                            </div>
                        </div>
                        <div class="branch-right">
                            <span>❌ No</span>
                            <div class="flow-step redirect">
                                <span class="icon">↪️</span>
                                <p>Redirect to login</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="tips-section">
                <h2>💡 Tips</h2>
                <ul>
                    <li>Use <code>InteractionType.Redirect</code> for production apps</li>
                    <li>Use <code>InteractionType.Popup</code> for better UX (if popups allowed)</li>
                    <li>Always handle redirect in app.component.ts</li>
                    <li>Consider using <code>canActivateChild</code> for child routes</li>
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

        .flow-visual { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-top: 1rem; }
        .flow-step { background: var(--bg-secondary, #f8f9fa); padding: 1rem 2rem; border-radius: 8px; text-align: center; }
        .flow-step .icon { font-size: 1.5rem; display: block; margin-bottom: 0.25rem; }
        .flow-step p { margin: 0; font-size: 0.85rem; }
        .flow-step.decision { background: #fff3e0; }
        .flow-step.success { background: #e8f5e9; }
        .flow-step.redirect { background: #e3f2fd; }
        .arrow { font-size: 1.25rem; color: var(--text-secondary); }

        .branch { display: flex; gap: 2rem; margin-top: 0.5rem; }
        .branch-left, .branch-right { text-align: center; }
        .branch span { font-weight: bold; display: block; margin-bottom: 0.5rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class AuthGuardComponent { }
