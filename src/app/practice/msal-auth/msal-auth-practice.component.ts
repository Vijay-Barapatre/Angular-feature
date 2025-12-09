/**
 * MSAL AUTH PRACTICE - COMPLETE SECTION
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
    selector: 'app-msal-auth-practice',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
        <div class="practice-container">
            <header class="practice-header">
                <a routerLink="/practice" class="back-link">← Back to Practice</a>
                <h1>🔐 MSAL Auth Practice</h1>
                <p class="subtitle">Azure AD Authentication with MSAL</p>
            </header>
            <nav class="exercise-nav">
                <div class="nav-section">
                    <h3>🟦 Basic Exercises</h3>
                    <a routerLink="basic/exercise-1" routerLinkActive="active">Exercise 1: MSAL Setup</a>
                    <a routerLink="basic/exercise-2" routerLinkActive="active">Exercise 2: Login/Logout</a>
                    <a routerLink="basic/exercise-3" routerLinkActive="active">Exercise 3: Token Access</a>
                    <a routerLink="basic/exercise-4" routerLinkActive="active">Exercise 4: Guards</a>
                </div>
                <div class="nav-section">
                    <h3>🟥 Complex Scenarios</h3>
                    <a routerLink="complex/scenario-1" routerLinkActive="active">Scenario 1: Silent SSO</a>
                    <a routerLink="complex/scenario-2" routerLinkActive="active">Scenario 2: API Protection</a>
                    <a routerLink="complex/scenario-3" routerLinkActive="active">Scenario 3: Role-based Access</a>
                    <a routerLink="complex/scenario-4" routerLinkActive="active">Scenario 4: Multi-Tenant</a>
                    <a routerLink="complex/scenario-5" routerLinkActive="active">Scenario 5: B2C Flows</a>
                </div>
            </nav>
            <main class="exercise-content"><router-outlet></router-outlet></main>
        </div>
    `,
    styles: [`
        .practice-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
        .practice-header { margin-bottom: 1.5rem; }
        .back-link { color: #0078d4; text-decoration: none; }
        h1 { margin: 0.5rem 0 0.25rem; color: #0078d4; }
        .subtitle { margin: 0; color: var(--text-secondary); }
        .exercise-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .nav-section { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .nav-section h3 { margin: 0 0 0.75rem; }
        .nav-section a { display: block; padding: 0.5rem 0.75rem; border-radius: 4px; text-decoration: none; color: inherit; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .nav-section a:hover { background: rgba(0, 120, 212, 0.1); }
        .nav-section a.active { background: #0078d4; color: white; }
        .exercise-content { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; min-height: 400px; }
    `]
})
export class MsalAuthPracticeComponent { }

// Exercises
@Component({
    selector: 'app-msal-exercise-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: MSAL Setup</h2>
                <p>Configure MSAL in Angular app.</p>
            </div>
            <div class="demo">
                <pre>// app.config.ts
provideHttpClient(withInterceptorsFromDi()),
provideMsal(&#123;
  clientId: 'your-client-id',
  authority: 'https://login.microsoftonline.com/tenant-id',
  redirectUri: 'http://localhost:4200'
&#125;)</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0078d4; }
        .instructions h2 { color: #1e1e2e !important; background: none !important; -webkit-text-fill-color: #1e1e2e !important; margin-bottom: 0.5rem; }
        .instructions p { color: #374151 !important; margin: 0; }
        .demo { background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.5; overflow-x: auto; }
    `]
})
export class MsalExercise1Component { }

@Component({
    selector: 'app-msal-exercise-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Login/Logout</h2>
                <p>Implement login and logout flows.</p>
            </div>
            <div class="demo">
                <pre>login(): void &#123;
  this.msalService.loginPopup().subscribe(result =&gt; &#123;
    console.log('Logged in:', result.account);
  &#125;);
&#125;

logout(): void &#123;
  this.msalService.logout();
&#125;</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0078d4; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class MsalExercise2Component { }

@Component({
    selector: 'app-msal-exercise-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Token Access</h2>
                <p>Acquire tokens for API calls.</p>
            </div>
            <div class="demo">
                <pre>this.msalService.acquireTokenSilent(&#123;
  scopes: ['api://your-api/access']
&#125;).subscribe(result =&gt; &#123;
  const token = result.accessToken;
  // Use token for API calls
&#125;);</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0078d4; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class MsalExercise3Component { }

@Component({
    selector: 'app-msal-exercise-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Guards</h2>
                <p>Protect routes with MsalGuard.</p>
            </div>
            <div class="demo">
                <pre>&#123;
  path: 'protected',
  component: ProtectedComponent,
  canActivate: [MsalGuard]
&#125;</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0078d4; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; }
    `]
})
export class MsalExercise4Component { }

// Complex Scenarios
@Component({
    selector: 'app-msal-scenario-1',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Silent SSO</h2>
                <p>Single sign-on with silent authentication.</p>
            </div>
            <div class="content">
                <p>Handle redirect callbacks and SSO.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class MsalScenario1Component { }

@Component({
    selector: 'app-msal-scenario-2',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: API Protection</h2>
                <p>Protect backend APIs with tokens.</p>
            </div>
            <div class="content">
                <p>Use MSAL Interceptor for auto token injection.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class MsalScenario2Component { }

@Component({
    selector: 'app-msal-scenario-3',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Role-based Access</h2>
                <p>Control access based on Azure AD roles.</p>
            </div>
            <div class="content">
                <p>Extract roles from token claims.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class MsalScenario3Component { }

@Component({
    selector: 'app-msal-scenario-4',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Multi-Tenant</h2>
                <p>Support multiple Azure AD tenants.</p>
            </div>
            <div class="content">
                <p>Configure for multi-tenant apps.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class MsalScenario4Component { }

@Component({
    selector: 'app-msal-scenario-5',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: B2C Flows</h2>
                <p>Azure AD B2C user flows.</p>
            </div>
            <div class="content">
                <p>Sign-up, password reset, profile edit.</p>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
    `]
})
export class MsalScenario5Component { }

export const MSAL_AUTH_PRACTICE_ROUTES: Routes = [
    {
        path: '', component: MsalAuthPracticeComponent, children: [
            { path: 'basic/exercise-1', component: MsalExercise1Component },
            { path: 'basic/exercise-2', component: MsalExercise2Component },
            { path: 'basic/exercise-3', component: MsalExercise3Component },
            { path: 'basic/exercise-4', component: MsalExercise4Component },
            { path: 'complex/scenario-1', component: MsalScenario1Component },
            { path: 'complex/scenario-2', component: MsalScenario2Component },
            { path: 'complex/scenario-3', component: MsalScenario3Component },
            { path: 'complex/scenario-4', component: MsalScenario4Component },
            { path: 'complex/scenario-5', component: MsalScenario5Component },
        ]
    }
];
