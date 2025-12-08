/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: ROUTE GUARDS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-1-guards',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Route Guards</h2>
                <p>Protect routes with canActivate, canDeactivate, and more.</p>
            </div>

            <div class="content">
                <div class="guard-types">
                    <div class="guard-card">
                        <h4>canActivate</h4>
                        <p>Prevent access to a route</p>
                        <code>Check if user is logged in</code>
                    </div>
                    <div class="guard-card">
                        <h4>canActivateChild</h4>
                        <p>Protect child routes</p>
                        <code>Check role for admin section</code>
                    </div>
                    <div class="guard-card">
                        <h4>canDeactivate</h4>
                        <p>Prevent leaving a route</p>
                        <code>Confirm unsaved changes</code>
                    </div>
                    <div class="guard-card">
                        <h4>canMatch</h4>
                        <p>Control route matching</p>
                        <code>Feature flags</code>
                    </div>
                </div>

                <h3>🎮 Guard Simulation</h3>
                
                <div class="auth-controls">
                    <label>
                        <input type="checkbox" [checked]="isLoggedIn()" (change)="toggleLogin()">
                        Logged In
                    </label>
                    <label>
                        <input type="checkbox" [checked]="isAdmin()" (change)="toggleAdmin()">
                        Admin Role
                    </label>
                    <label>
                        <input type="checkbox" [checked]="hasUnsavedChanges()" (change)="toggleChanges()">
                        Unsaved Changes
                    </label>
                </div>

                <div class="routes-demo">
                    @for (route of protectedRoutes(); track route.path) {
                        <div class="route-item">
                            <span class="route-path">{{ route.path }}</span>
                            <span class="route-guard">{{ route.guard }}</span>
                            <button 
                                [class.blocked]="!canAccess(route)"
                                (click)="attemptNavigation(route)">
                                {{ canAccess(route) ? '✅ Access' : '🚫 Blocked' }}
                            </button>
                        </div>
                    }
                </div>

                @if (lastAttempt()) {
                    <div class="attempt-result" [class.success]="lastAttempt()?.allowed">
                        <strong>{{ lastAttempt()?.allowed ? '✅' : '🚫' }} {{ lastAttempt()?.route }}</strong>
                        <p>{{ lastAttempt()?.message }}</p>
                    </div>
                }

                <div class="code-example">
                    <h4>Functional Guard Example</h4>
                    <pre><code>export const authGuard: CanActivateFn = (route, state) => {{ '{' }}
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {{ '{' }}
    return true;
  {{ '}' }}
  
  return router.createUrlTree(['/login'], {{ '{' }}
    queryParams: {{ '{' }} returnUrl: state.url {{ '}' }}
  {{ '}' }});
{{ '}' }};</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fdf2f8; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ec4899; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .guard-types { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .guard-card { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .guard-card h4 { margin: 0; color: #ec4899; }
        .guard-card p { margin: 0.25rem 0; font-size: 0.85rem; color: #6b7280; }
        .guard-card code { font-size: 0.8rem; color: #6b7280; }
        .auth-controls { display: flex; gap: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .auth-controls label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .routes-demo { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .route-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; }
        .route-path { flex: 1; font-weight: 500; }
        .route-guard { color: #6b7280; font-size: 0.85rem; font-family: monospace; }
        .route-item button { padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .route-item button.blocked { background: #ef4444; }
        .attempt-result { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; background: #fef2f2; }
        .attempt-result.success { background: #f0fdf4; }
        .attempt-result p { margin: 0.5rem 0 0; font-size: 0.9rem; }
        .code-example { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-example pre { margin: 0; overflow-x: auto; }
        .code-example code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario1GuardsComponent {
    isLoggedIn = signal(true);
    isAdmin = signal(false);
    hasUnsavedChanges = signal(false);
    lastAttempt = signal<{ route: string; allowed: boolean; message: string } | null>(null);

    protectedRoutes = signal([
        { path: '/dashboard', guard: 'canActivate: authGuard', requiresAuth: true, requiresAdmin: false },
        { path: '/admin/users', guard: 'canActivate: adminGuard', requiresAuth: true, requiresAdmin: true },
        { path: '/profile/edit', guard: 'canDeactivate: unsavedGuard', requiresAuth: true, requiresAdmin: false },
        { path: '/settings', guard: 'canActivate: authGuard', requiresAuth: true, requiresAdmin: false }
    ]);

    toggleLogin(): void {
        this.isLoggedIn.update(v => !v);
        if (!this.isLoggedIn()) this.isAdmin.set(false);
    }

    toggleAdmin(): void {
        this.isAdmin.update(v => !v);
        if (this.isAdmin()) this.isLoggedIn.set(true);
    }

    toggleChanges(): void {
        this.hasUnsavedChanges.update(v => !v);
    }

    canAccess(route: { requiresAuth: boolean; requiresAdmin: boolean }): boolean {
        if (route.requiresAuth && !this.isLoggedIn()) return false;
        if (route.requiresAdmin && !this.isAdmin()) return false;
        return true;
    }

    attemptNavigation(route: { path: string; requiresAuth: boolean; requiresAdmin: boolean }): void {
        if (!this.isLoggedIn() && route.requiresAuth) {
            this.lastAttempt.set({
                route: route.path,
                allowed: false,
                message: 'authGuard: User not logged in. Redirecting to /login...'
            });
        } else if (route.requiresAdmin && !this.isAdmin()) {
            this.lastAttempt.set({
                route: route.path,
                allowed: false,
                message: 'adminGuard: User lacks admin role. Access denied.'
            });
        } else {
            this.lastAttempt.set({
                route: route.path,
                allowed: true,
                message: 'All guards passed. Navigation allowed.'
            });
        }
    }
}
