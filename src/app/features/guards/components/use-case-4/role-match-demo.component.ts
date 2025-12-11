/**
 * ============================================================================
 * USE CASE 4: canMatch GUARD - DEMO COMPONENT
 * ============================================================================
 * 
 * This component demonstrates canMatch by showing different dashboards
 * based on user role - all on the SAME route!
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService, UserRole } from './role.service';

@Component({
    selector: 'app-role-match-demo',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <a routerLink="/guards" class="back-link">← Back to Guards</a>
                <h1>🎭 Use Case 4: canMatch Guard</h1>
                <p class="subtitle">Role-based route matching - Same URL, Different Views</p>
            </header>

            <section class="concept-section">
                <h2>💡 What is canMatch?</h2>
                <p>
                    <code>canMatch</code> determines if a route should be <strong>matched</strong> at all.
                    Unlike <code>canActivate</code>, it doesn't block or redirect - it simply 
                    <strong>skips</strong> the route and tries the next one.
                </p>
            </section>

            <section class="demo-section">
                <h2>🎮 Try It: Change Your Role</h2>
                <div class="role-switcher">
                    @for (role of roles; track role) {
                        <button 
                            (click)="setRole(role)"
                            [class.active]="currentRole === role"
                            class="role-btn">
                            {{ getRoleLabel(role) }}
                        </button>
                    }
                </div>
                <p class="current-role">Current Role: <strong>{{ currentRole }}</strong></p>
            </section>

            <section class="dashboard-section">
                <h2>📊 Your Dashboard</h2>
                <div class="dashboard-preview" [ngClass]="currentRole">
                    @switch (currentRole) {
                        @case ('admin') {
                            <div class="dashboard admin-dashboard">
                                <h3>👑 Admin Dashboard</h3>
                                <ul>
                                    <li>📊 System Analytics</li>
                                    <li>👥 User Management</li>
                                    <li>⚙️ Configuration</li>
                                    <li>📝 Audit Logs</li>
                                </ul>
                            </div>
                        }
                        @case ('premium') {
                            <div class="dashboard premium-dashboard">
                                <h3>⭐ Premium Dashboard</h3>
                                <ul>
                                    <li>📈 Advanced Analytics</li>
                                    <li>🎨 Premium Themes</li>
                                    <li>📤 Export Features</li>
                                </ul>
                            </div>
                        }
                        @case ('user') {
                            <div class="dashboard user-dashboard">
                                <h3>👤 User Dashboard</h3>
                                <ul>
                                    <li>📊 Basic Stats</li>
                                    <li>📋 My Items</li>
                                </ul>
                            </div>
                        }
                        @default {
                            <div class="dashboard guest-dashboard">
                                <h3>👋 Guest View</h3>
                                <p>Sign up to unlock more features!</p>
                            </div>
                        }
                    }
                </div>
            </section>

            <section class="code-section">
                <h2>📝 How It Works</h2>
                <pre><code>// role-match.guard.ts
export const adminMatchGuard: CanMatchFn = (route, segments) => {{ '{' }}
    const roleService = inject(RoleService);
    
    // Returns true → Route MATCHES (use this component)
    // Returns false → Route SKIPS (try next route)
    return roleService.hasRole('admin');
{{ '}' }};

// guards.routes.ts
{{ '{' }}
    path: 'dashboard',
    canMatch: [adminMatchGuard],  // Only matches for admins
    component: AdminDashboardComponent
{{ '}' }},
{{ '{' }}
    path: 'dashboard',
    canMatch: [premiumMatchGuard],  // Fallback for premium
    component: PremiumDashboardComponent
{{ '}' }},
{{ '{' }}
    path: 'dashboard',  // Fallback for everyone else
    component: UserDashboardComponent
{{ '}' }}</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .header { margin-bottom: 2rem; }
        .back-link { color: #667eea; text-decoration: none; }
        h1 { margin: 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .subtitle { color: var(--text-muted, #94a3b8); }

        .concept-section, .demo-section, .dashboard-section, .code-section {
            background: var(--bg-secondary, #1e293b);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        h2 { color: var(--text-primary, #f1f5f9); }
        p { color: var(--text-secondary, #cbd5e1); }

        .role-switcher { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .role-btn {
            padding: 0.75rem 1.5rem;
            border: 2px solid var(--bg-card, #334155);
            background: var(--bg-card, #334155);
            color: var(--text-primary, #f1f5f9);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .role-btn:hover { border-color: #667eea; }
        .role-btn.active { border-color: #667eea; background: #667eea; color: white; }
        .current-role { font-size: 1.1rem; color: var(--text-primary, #f1f5f9); }

        .dashboard {
            padding: 1.5rem;
            border-radius: 12px;
            color: white;
        }
        .admin-dashboard { background: linear-gradient(135deg, #667eea, #764ba2); }
        .premium-dashboard { background: linear-gradient(135deg, #f093fb, #f5576c); }
        .user-dashboard { background: linear-gradient(135deg, #4facfe, #00f2fe); }
        .guest-dashboard { background: linear-gradient(135deg, #64748b, #475569); }

        .code-section pre {
            background: #0f172a;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.85rem;
            border-left: 4px solid #667eea;
        }
    `]
})
export class RoleMatchDemoComponent {
    private roleService = inject(RoleService);

    roles: UserRole[] = ['guest', 'user', 'premium', 'admin'];

    get currentRole(): UserRole {
        return this.roleService.getRole();
    }

    setRole(role: UserRole): void {
        this.roleService.setRole(role);
    }

    getRoleLabel(role: UserRole): string {
        const labels: Record<UserRole, string> = {
            guest: '👋 Guest',
            user: '👤 User',
            premium: '⭐ Premium',
            admin: '👑 Admin'
        };
        return labels[role];
    }
}
