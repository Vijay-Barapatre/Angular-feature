/**
 * ============================================================================
 * 🟦 EXERCISE 1: AUTHENTICATION GUARD
 * ============================================================================
 * 
 * OBJECTIVE: Implement a canActivate guard that protects routes from 
 * unauthenticated users.
 * 
 * See problem.md for full requirements.
 * See solution.md for the complete solution with diagrams.
 */

import { Component, Injectable, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================================================
// AUTH SERVICE (Simulated)
// ============================================================================
@Injectable({ providedIn: 'root' })
export class MockAuthService {
    private _isLoggedIn = signal(false);
    private _currentUser = signal<string | null>(null);

    isLoggedIn(): boolean {
        return this._isLoggedIn();
    }

    login(username: string, password: string): boolean {
        // TODO: Implement login logic
        // Hint: Set _isLoggedIn to true and store the username
        // For this exercise, accept any non-empty credentials

        return false; // Replace with your implementation
    }

    logout(): void {
        // TODO: Implement logout logic
        // Hint: Set _isLoggedIn to false and clear the user
    }

    getCurrentUser(): string | null {
        return this._currentUser();
    }
}

// ============================================================================
// EXERCISE COMPONENT
// ============================================================================
@Component({
    selector: 'app-exercise-1-auth',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Authentication Guard</h2>
                <p>Implement a guard that protects routes from unauthenticated users.</p>
                
                <div class="task-list">
                    <h4>📋 Tasks:</h4>
                    <ul>
                        <li>Complete the <code>login()</code> method in MockAuthService</li>
                        <li>Complete the <code>logout()</code> method in MockAuthService</li>
                        <li>Understand how the guard would redirect to login</li>
                    </ul>
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Authentication Demo</h3>
                
                <div class="auth-status">
                    <div class="status-indicator" [class.logged-in]="isLoggedIn()">
                        {{ isLoggedIn() ? '🟢 Logged In' : '🔴 Not Logged In' }}
                    </div>
                    @if (currentUser()) {
                        <span class="user-name">Welcome, {{ currentUser() }}</span>
                    }
                </div>

                @if (!isLoggedIn()) {
                    <div class="login-form">
                        <h4>Login</h4>
                        <input 
                            type="text" 
                            [(ngModel)]="username" 
                            placeholder="Username"
                            class="input">
                        <input 
                            type="password" 
                            [(ngModel)]="password" 
                            placeholder="Password"
                            class="input">
                        <button (click)="handleLogin()" class="btn-login">Login</button>
                        @if (loginError()) {
                            <p class="error">{{ loginError() }}</p>
                        }
                    </div>
                } @else {
                    <button (click)="handleLogout()" class="btn-logout">Logout</button>
                }

                <div class="protected-routes">
                    <h4>Protected Routes Demo</h4>
                    <div class="route-list">
                        @for (route of protectedRoutes; track route.path) {
                            <div class="route-item">
                                <span class="route-path">{{ route.path }}</span>
                                <span class="route-status" [class.allowed]="isLoggedIn()">
                                    {{ isLoggedIn() ? '✅ Accessible' : '🚫 Blocked' }}
                                </span>
                                <button 
                                    (click)="tryNavigate(route.path)"
                                    class="btn-nav">
                                    Try Navigate
                                </button>
                            </div>
                        }
                    </div>
                </div>

                @if (navigationResult()) {
                    <div class="nav-result" [class.success]="navigationResult()?.allowed">
                        <h4>Navigation Result</h4>
                        <p>{{ navigationResult()?.message }}</p>
                        @if (navigationResult()?.redirectTo) {
                            <code>Redirecting to: {{ navigationResult()?.redirectTo }}</code>
                        }
                    </div>
                }

                <div class="code-preview">
                    <h4>Guard Implementation</h4>
                    <pre><code>export const authGuard: CanActivateFn = (route, state) => {{ '{' }}
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {{ '{' }}
    return true; // ✅ Allow access
  {{ '}' }}
  
  // 🔄 Redirect to login with return URL
  return router.createUrlTree(['/login'], {{ '{' }}
    queryParams: {{ '{' }} returnUrl: state.url {{ '}' }}
  {{ '}' }});
{{ '}' }};</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #f5f3ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #8b5cf6; }
        .instructions h2 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .task-list { background: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; color: #1e1e2e; }
        .task-list h4 { margin: 0 0 0.5rem; }
        .task-list ul { margin: 0; padding-left: 1.5rem; }
        .task-list li { margin-bottom: 0.25rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .auth-status { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .status-indicator { padding: 0.5rem 1rem; background: #fee2e2; color: #dc2626; border-radius: 6px; font-weight: 500; }
        .status-indicator.logged-in { background: #dcfce7; color: #16a34a; }
        .user-name { color: #6b7280; }
        .login-form { padding: 1.5rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .login-form h4 { margin: 0 0 1rem; }
        .input { display: block; width: 100%; padding: 0.75rem; margin-bottom: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .btn-login { width: 100%; padding: 0.75rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
        .btn-logout { padding: 0.75rem 1.5rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 1rem; }
        .error { color: #dc2626; margin: 0.5rem 0 0; font-size: 0.9rem; }
        .protected-routes { margin-bottom: 1rem; }
        .protected-routes h4 { margin: 0 0 0.75rem; }
        .route-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .route-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; }
        .route-path { flex: 1; font-family: monospace; color: #8b5cf6; }
        .route-status { font-size: 0.85rem; color: #dc2626; }
        .route-status.allowed { color: #16a34a; }
        .btn-nav { padding: 0.5rem 1rem; background: #e5e7eb; border: none; border-radius: 4px; cursor: pointer; }
        .nav-result { padding: 1rem; background: #fef2f2; border-radius: 8px; margin-bottom: 1rem; }
        .nav-result.success { background: #f0fdf4; }
        .nav-result h4 { margin: 0 0 0.5rem; }
        .nav-result p { margin: 0 0 0.5rem; }
        .nav-result code { display: block; padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; overflow-x: auto; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise1AuthComponent {
    private authService = inject(MockAuthService);

    username = '';
    password = '';
    loginError = signal('');
    navigationResult = signal<{ allowed: boolean; message: string; redirectTo?: string } | null>(null);

    protectedRoutes = [
        { path: '/dashboard', name: 'Dashboard' },
        { path: '/profile', name: 'Profile' },
        { path: '/settings', name: 'Settings' }
    ];

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    currentUser(): string | null {
        return this.authService.getCurrentUser();
    }

    handleLogin(): void {
        this.loginError.set('');
        const success = this.authService.login(this.username, this.password);

        if (!success) {
            this.loginError.set('Login failed. Make sure you implemented the login() method!');
        } else {
            this.username = '';
            this.password = '';
            this.navigationResult.set(null);
        }
    }

    handleLogout(): void {
        this.authService.logout();
        this.navigationResult.set(null);
    }

    tryNavigate(path: string): void {
        if (this.authService.isLoggedIn()) {
            this.navigationResult.set({
                allowed: true,
                message: `✅ authGuard returned TRUE. Navigation to ${path} allowed.`
            });
        } else {
            this.navigationResult.set({
                allowed: false,
                message: `🚫 authGuard returned UrlTree. User not authenticated.`,
                redirectTo: `/login?returnUrl=${path}`
            });
        }
    }
}
