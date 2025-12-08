/**
 * ============================================================================
 * 🟦 EXERCISE 2: ROLE-BASED GUARD
 * ============================================================================
 * 
 * OBJECTIVE: Implement a guard that restricts access based on user roles.
 * 
 * See problem.md for full requirements.
 * See solution.md for the complete solution with diagrams.
 */

import { Component, Injectable, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// TYPES
// ============================================================================
type UserRole = 'user' | 'editor' | 'admin';

interface User {
    name: string;
    role: UserRole;
}

// ============================================================================
// AUTH SERVICE WITH ROLES
// ============================================================================
@Injectable({ providedIn: 'root' })
export class RoleAuthService {
    private _currentUser = signal<User | null>(null);

    login(name: string, role: UserRole): void {
        this._currentUser.set({ name, role });
    }

    logout(): void {
        this._currentUser.set(null);
    }

    isLoggedIn(): boolean {
        return this._currentUser() !== null;
    }

    getCurrentUser(): User | null {
        return this._currentUser();
    }

    getUserRole(): UserRole | null {
        return this._currentUser()?.role ?? null;
    }

    // TODO: Implement hasRole method
    hasRole(requiredRoles: UserRole[]): boolean {
        // 1. Get the current user's role
        // 2. If user is admin, grant access to everything
        // 3. Check if user's role is in the requiredRoles array
        // 4. Return true if allowed, false otherwise

        return false; // Replace with your implementation
    }
}

// ============================================================================
// EXERCISE COMPONENT
// ============================================================================
@Component({
    selector: 'app-exercise-2-role',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Role-Based Guard</h2>
                <p>Implement a guard that restricts access based on user roles.</p>
                
                <div class="task-list">
                    <h4>📋 Tasks:</h4>
                    <ul>
                        <li>Implement the <code>hasRole()</code> method in RoleAuthService</li>
                        <li>Admin should have access to all routes</li>
                        <li>Editor should access editor + user routes</li>
                        <li>User should only access user routes</li>
                    </ul>
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Role-Based Access Demo</h3>
                
                <div class="user-selector">
                    <h4>Select User:</h4>
                    <div class="user-buttons">
                        @for (user of users; track user.name) {
                            <button 
                                [class.active]="currentUser()?.name === user.name"
                                (click)="selectUser(user)">
                                {{ getRoleEmoji(user.role) }} {{ user.name }} ({{ user.role }})
                            </button>
                        }
                        <button 
                            [class.active]="!currentUser()"
                            (click)="logout()"
                            class="logout">
                            🚪 Logout
                        </button>
                    </div>
                </div>

                @if (currentUser()) {
                    <div class="current-user">
                        <span>Current: {{ getRoleEmoji(currentUser()!.role) }} {{ currentUser()!.name }}</span>
                        <span class="role-badge" [class]="currentUser()!.role">{{ currentUser()!.role }}</span>
                    </div>
                }

                <div class="routes-grid">
                    <h4>Protected Routes:</h4>
                    @for (route of protectedRoutes; track route.path) {
                        <div class="route-card">
                            <div class="route-header">
                                <span class="route-path">{{ route.path }}</span>
                                <div class="required-roles">
                                    @for (role of route.requiredRoles; track role) {
                                        <span class="role-tag" [class]="role">{{ role }}</span>
                                    }
                                </div>
                            </div>
                            <div class="route-access" [class.allowed]="canAccess(route.requiredRoles)">
                                {{ canAccess(route.requiredRoles) ? '✅ Access Granted' : '🚫 Access Denied' }}
                            </div>
                        </div>
                    }
                </div>

                <div class="code-preview">
                    <h4>Route Configuration</h4>
                    <pre><code>{{ '{' }}
  path: 'admin',
  canActivate: [authGuard, roleGuard],
  data: {{ '{' }} roles: ['admin'] {{ '}' }}
{{ '}' }}

{{ '{' }}
  path: 'editor',
  canActivate: [authGuard, roleGuard],
  data: {{ '{' }} roles: ['editor', 'admin'] {{ '}' }}
{{ '}' }}</code></pre>
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
        .demo { background: white; padding: 1.5rem; border-radius: 12px; }
        .user-selector { margin-bottom: 1.5rem; }
        .user-selector h4 { margin: 0 0 0.75rem; }
        .user-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .user-buttons button { padding: 0.5rem 1rem; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; }
        .user-buttons button:hover { border-color: #8b5cf6; }
        .user-buttons button.active { background: #8b5cf6; color: white; border-color: #8b5cf6; }
        .user-buttons button.logout { background: #fee2e2; border-color: #fecaca; }
        .current-user { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1.5rem; }
        .role-badge { padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500; }
        .role-badge.admin { background: #fef3c7; color: #b45309; }
        .role-badge.editor { background: #dbeafe; color: #1d4ed8; }
        .role-badge.user { background: #dcfce7; color: #16a34a; }
        .routes-grid { display: grid; gap: 0.75rem; margin-bottom: 1.5rem; }
        .routes-grid h4 { margin: 0 0 0.5rem; }
        .route-card { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .route-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .route-path { font-family: monospace; font-weight: 500; color: #8b5cf6; }
        .required-roles { display: flex; gap: 0.25rem; }
        .role-tag { padding: 0.125rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
        .role-tag.admin { background: #fef3c7; color: #b45309; }
        .role-tag.editor { background: #dbeafe; color: #1d4ed8; }
        .role-tag.user { background: #dcfce7; color: #16a34a; }
        .route-access { padding: 0.5rem; background: #fee2e2; color: #dc2626; border-radius: 4px; text-align: center; font-size: 0.9rem; }
        .route-access.allowed { background: #dcfce7; color: #16a34a; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise2RoleComponent {
    private authService = inject(RoleAuthService);

    users: User[] = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'editor' },
        { name: 'Charlie', role: 'user' }
    ];

    protectedRoutes = [
        { path: '/dashboard', requiredRoles: ['user', 'editor', 'admin'] as UserRole[] },
        { path: '/editor/posts', requiredRoles: ['editor', 'admin'] as UserRole[] },
        { path: '/editor/media', requiredRoles: ['editor', 'admin'] as UserRole[] },
        { path: '/admin/users', requiredRoles: ['admin'] as UserRole[] },
        { path: '/admin/settings', requiredRoles: ['admin'] as UserRole[] }
    ];

    currentUser(): User | null {
        return this.authService.getCurrentUser();
    }

    selectUser(user: User): void {
        this.authService.login(user.name, user.role);
    }

    logout(): void {
        this.authService.logout();
    }

    canAccess(requiredRoles: UserRole[]): boolean {
        if (!this.authService.isLoggedIn()) return false;
        return this.authService.hasRole(requiredRoles);
    }

    getRoleEmoji(role: UserRole): string {
        switch (role) {
            case 'admin': return '👑';
            case 'editor': return '✏️';
            case 'user': return '👤';
        }
    }
}
