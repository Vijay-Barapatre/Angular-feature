/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: ROLE-BASED CONTENT SECURITY
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * A dashboard application shows different content based on user roles.
 * Some sections are admin-only, some for managers, some for all users.
 * The system must:
 * - Hide unauthorized content completely (not just disable)
 * - Verify permissions on both client and server
 * - Provide audit logging for access attempts
 * - Support role hierarchy (admin can do what managers can)
 * 
 * 📝 PROBLEM STATEMENT:
 * Implement a role-based access control (RBAC) system with Angular
 * directives and guards that secures UI components.
 * 
 * ✅ EXPECTED RESULT:
 * - Unauthorized sections are not rendered (not just hidden)
 * - Role checks work with hierarchies
 * - Failed access attempts are logged
 * - UI updates when roles change
 */

import {
    Component,
    Directive,
    Injectable,
    Input,
    TemplateRef,
    ViewContainerRef,
    inject,
    signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ========================================
// INTERFACES
// ========================================

type Role = 'guest' | 'user' | 'manager' | 'admin';

interface User {
    id: string;
    name: string;
    roles: Role[];
}

interface AccessLog {
    timestamp: Date;
    user: string;
    resource: string;
    allowed: boolean;
}

// ========================================
// ROLE HIERARCHY
// ========================================

const ROLE_HIERARCHY: Record<Role, number> = {
    guest: 0,
    user: 1,
    manager: 2,
    admin: 3
};

// ========================================
// AUTH SERVICE WITH RBAC
// ========================================

@Injectable({ providedIn: 'root' })
export class RbacAuthService {
    private currentUser = signal<User | null>(null);
    private accessLogs = signal<AccessLog[]>([]);

    getUser() {
        return this.currentUser;
    }

    /**
     * TODO: Implement role checking with hierarchy
     * 
     * Check if current user has the required role.
     * Consider role hierarchy: admin > manager > user > guest
     * 
     * Example: If user has 'admin' role, they should pass check for 'manager'
     */
    hasRole(requiredRole: Role): boolean {
        /*
         * TODO: Implement feature logic here
         * 
         * const user = this.currentUser();
         * if (!user) return false;
         * 
         * const requiredLevel = ROLE_HIERARCHY[requiredRole];
         * 
         * // Check if user has any role >= required level
         * return user.roles.some(role => 
         *     ROLE_HIERARCHY[role] >= requiredLevel
         * );
         */

        return false; // Replace with your implementation
    }

    /**
     * TODO: Implement permission checking for multiple roles (any)
     * 
     * Return true if user has ANY of the specified roles
     */
    hasAnyRole(roles: Role[]): boolean {
        /*
         * TODO: Implement feature logic here
         */

        return false; // Replace with your implementation
    }

    /**
     * TODO: Implement permission checking for multiple roles (all)
     * 
     * Return true if user has ALL of the specified roles (rare but useful)
     */
    hasAllRoles(roles: Role[]): boolean {
        /*
         * TODO: Implement feature logic here
         */

        return false; // Replace with your implementation
    }

    /**
     * TODO: Log access attempt for audit
     */
    logAccess(resource: string, allowed: boolean): void {
        /*
         * TODO: Implement feature logic here
         * 
         * const user = this.currentUser();
         * this.accessLogs.update(logs => [...logs, {
         *     timestamp: new Date(),
         *     user: user?.name || 'Anonymous',
         *     resource,
         *     allowed
         * }]);
         */
    }

    getAccessLogs() {
        return this.accessLogs;
    }

    // Simulate login as different roles
    loginAs(role: Role): void {
        const users: Record<Role, User> = {
            guest: { id: 'g1', name: 'Guest User', roles: ['guest'] },
            user: { id: 'u1', name: 'John User', roles: ['user'] },
            manager: { id: 'm1', name: 'Jane Manager', roles: ['user', 'manager'] },
            admin: { id: 'a1', name: 'Admin Boss', roles: ['user', 'manager', 'admin'] }
        };
        this.currentUser.set(users[role]);
    }

    logout(): void {
        this.currentUser.set(null);
    }
}

// ========================================
// *hasRole STRUCTURAL DIRECTIVE
// ========================================

/**
 * TODO: Implement the *hasRole structural directive
 * 
 * Usage:
 * <div *hasRole="'admin'">Admin only content</div>
 * <div *hasRole="['manager', 'admin']">Manager or Admin</div>
 * 
 * The content should:
 * - NOT be rendered if user lacks role (security)
 * - Update when user roles change
 * - Log access attempts
 */
@Directive({
    selector: '[hasRole]',
    standalone: true
})
export class HasRoleDirective {
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);
    private authService = inject(RbacAuthService);
    private isVisible = false;

    @Input() set hasRole(roleOrRoles: Role | Role[]) {
        /*
         * TODO: Implement feature logic here
         * 
         * const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
         * const hasAccess = roles.some(role => this.authService.hasRole(role));
         * 
         * // Log access attempt
         * this.authService.logAccess(`Directive check: ${roles.join(', ')}`, hasAccess);
         * 
         * if (hasAccess && !this.isVisible) {
         *     this.viewContainer.createEmbeddedView(this.templateRef);
         *     this.isVisible = true;
         * } else if (!hasAccess && this.isVisible) {
         *     this.viewContainer.clear();
         *     this.isVisible = false;
         * }
         */
    }
}

// ========================================
// DEMO COMPONENT
// ========================================

@Component({
    selector: 'app-scenario-rbac',
    standalone: true,
    imports: [CommonModule, FormsModule, HasRoleDirective],
    template: `
        <div class="scenario-container">
            <h2>👥 Scenario 3: Role-Based Content Security</h2>
            
            <div class="user-section">
                <h3>Current User</h3>
                <div class="user-card" *ngIf="currentUser(); else noUser">
                    <span class="user-name">{{ currentUser()!.name }}</span>
                    <div class="user-roles">
                        <span class="role-badge" *ngFor="let role of currentUser()!.roles">
                            {{ role }}
                        </span>
                    </div>
                </div>
                <ng-template #noUser>
                    <div class="user-card guest">
                        <span class="user-name">Not logged in</span>
                    </div>
                </ng-template>
            </div>

            <div class="login-buttons">
                <button (click)="loginAs('guest')">Login as Guest</button>
                <button (click)="loginAs('user')">Login as User</button>
                <button (click)="loginAs('manager')">Login as Manager</button>
                <button (click)="loginAs('admin')">Login as Admin</button>
                <button (click)="logout()" class="logout">Logout</button>
            </div>

            <div class="dashboard-sections">
                <h3>Dashboard Sections (Role-Protected)</h3>
                
                <!-- Public section -->
                <div class="section public">
                    <h4>📢 Public Announcements</h4>
                    <p>This section is visible to everyone.</p>
                </div>

                <!-- User section -->
                <div class="section user" *hasRole="'user'">
                    <h4>👤 User Dashboard</h4>
                    <p>This section requires 'user' role or higher.</p>
                </div>

                <!-- Manager section -->
                <div class="section manager" *hasRole="'manager'">
                    <h4>📊 Manager Reports</h4>
                    <p>This section requires 'manager' role or higher.</p>
                </div>

                <!-- Admin section -->
                <div class="section admin" *hasRole="'admin'">
                    <h4>⚙️ Admin Panel</h4>
                    <p>This section requires 'admin' role only.</p>
                    <div class="admin-actions">
                        <button>Delete All Users</button>
                        <button>System Shutdown</button>
                    </div>
                </div>

                <!-- Multiple roles (any) -->
                <div class="section multi" *hasRole="['manager', 'admin']">
                    <h4>📝 Management Tools</h4>
                    <p>Visible to managers OR admins.</p>
                </div>
            </div>

            <div class="access-log">
                <h3>🔍 Access Audit Log</h3>
                <div class="log-entry" *ngFor="let log of accessLogs()">
                    <span class="time">{{ log.timestamp | date:'HH:mm:ss' }}</span>
                    <span class="user">{{ log.user }}</span>
                    <span class="resource">{{ log.resource }}</span>
                    <span class="result" [class.allowed]="log.allowed" [class.denied]="!log.allowed">
                        {{ log.allowed ? '✅ Allowed' : '🚫 Denied' }}
                    </span>
                </div>
                <div class="empty" *ngIf="accessLogs().length === 0">
                    No access attempts logged yet
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 900px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        h3 { margin-top: 1.5rem; }
        
        .user-card { padding: 1rem; background: #f0fdf4; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
        .user-card.guest { background: #f8fafc; }
        .user-name { font-weight: 500; }
        .user-roles { display: flex; gap: 0.25rem; }
        .role-badge { padding: 0.25rem 0.5rem; background: #10b981; color: white; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; }
        
        .login-buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
        .login-buttons button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; }
        .login-buttons button:nth-child(1) { background: #9ca3af; color: white; }
        .login-buttons button:nth-child(2) { background: #3b82f6; color: white; }
        .login-buttons button:nth-child(3) { background: #8b5cf6; color: white; }
        .login-buttons button:nth-child(4) { background: #10b981; color: white; }
        .login-buttons button.logout { background: #ef4444; color: white; }
        
        .section { padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; border-left: 4px solid; }
        .section h4 { margin: 0 0 0.5rem; }
        .section p { margin: 0; font-size: 0.9rem; color: #6b7280; }
        .section.public { background: #f8fafc; border-color: #9ca3af; }
        .section.user { background: #eff6ff; border-color: #3b82f6; }
        .section.manager { background: #f5f3ff; border-color: #8b5cf6; }
        .section.admin { background: #fef2f2; border-color: #ef4444; }
        .section.multi { background: #fefce8; border-color: #eab308; }
        .admin-actions { margin-top: 0.5rem; }
        .admin-actions button { padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; margin-right: 0.5rem; cursor: pointer; }
        
        .access-log { margin-top: 1.5rem; background: #1e1e2e; padding: 1rem; border-radius: 8px; }
        .access-log h3 { color: white; margin: 0 0 1rem; }
        .log-entry { display: flex; gap: 1rem; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 4px; margin-bottom: 0.25rem; font-size: 0.8rem; color: #a6e3a1; }
        .log-entry .time { color: #6b7280; font-family: monospace; }
        .log-entry .user { color: #60a5fa; min-width: 100px; }
        .log-entry .resource { flex: 1; color: #a6e3a1; }
        .result.allowed { color: #22c55e; }
        .result.denied { color: #ef4444; }
        .empty { text-align: center; color: #6b7280; padding: 1rem; }
    `]
})
export class ScenarioRbacComponent {
    private authService = inject(RbacAuthService);

    currentUser = this.authService.getUser();
    accessLogs = this.authService.getAccessLogs();

    loginAs(role: Role): void {
        this.authService.loginAs(role);
    }

    logout(): void {
        this.authService.logout();
    }
}
