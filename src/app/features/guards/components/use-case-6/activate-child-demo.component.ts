/**
 * ============================================================================
 * USE CASE 6: canActivateChild GUARD - DEMO COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { adminAuthState } from './activate-child.guard';

@Component({
    selector: 'app-activate-child-demo',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <a routerLink="/guards" class="back-link">← Back to Guards</a>
                <h1>👶 Use Case 6: canActivateChild Guard</h1>
                <p class="subtitle">Protect ALL child routes with a single guard</p>
            </header>

            <section class="concept-section">
                <h2>💡 What is canActivateChild?</h2>
                <p>
                    <code>canActivateChild</code> protects <strong>all child routes</strong> of a parent route.
                    Instead of adding <code>canActivate</code> to each child, you add <strong>one guard</strong> to the parent.
                </p>
                <div class="diagram">
                    <div class="route-tree">
                        <div class="parent-route">
                            /admin (parent)
                            <span class="guard-badge">canActivateChild: [adminGuard]</span>
                        </div>
                        <div class="child-routes">
                            <div class="child">/admin/users ← Protected ✓</div>
                            <div class="child">/admin/settings ← Protected ✓</div>
                            <div class="child">/admin/reports ← Protected ✓</div>
                            <div class="child">/admin/logs ← Protected ✓</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="demo-section">
                <h2>🎮 Toggle Admin Status</h2>
                <div class="status-panel">
                    <div class="status-item">
                        <span>Logged In:</span>
                        <button (click)="toggleLogin()" [class.active]="isLoggedIn">
                            {{ isLoggedIn ? '✅ Yes' : '❌ No' }}
                        </button>
                    </div>
                    <div class="status-item">
                        <span>Admin Role:</span>
                        <button (click)="toggleAdmin()" [class.active]="isAdmin">
                            {{ isAdmin ? '👑 Yes' : '❌ No' }}
                        </button>
                    </div>
                </div>

                <div class="child-links">
                    <h3>Try Accessing Admin Child Routes:</h3>
                    <div class="link-grid">
                        <button class="child-link" (click)="tryAccess('/admin/users')">
                            👥 /admin/users
                        </button>
                        <button class="child-link" (click)="tryAccess('/admin/settings')">
                            ⚙️ /admin/settings
                        </button>
                        <button class="child-link" (click)="tryAccess('/admin/reports')">
                            📊 /admin/reports
                        </button>
                    </div>
                </div>

                @if (lastResult) {
                    <div class="result-panel" [class.success]="lastResult.success">
                        <strong>{{ lastResult.route }}</strong>
                        <p>{{ lastResult.message }}</p>
                    </div>
                }
            </section>

            <section class="comparison-section">
                <h2>🆚 Without vs With canActivateChild</h2>
                <div class="comparison">
                    <div class="compare-item bad">
                        <h4>❌ Without (Repetitive)</h4>
                        <pre><code>{{ '{' }}
  path: 'admin/users',
  canActivate: [adminGuard]  // Repeated!
{{ '}' }},
{{ '{' }}
  path: 'admin/settings',
  canActivate: [adminGuard]  // Repeated!
{{ '}' }},
{{ '{' }}
  path: 'admin/reports',
  canActivate: [adminGuard]  // Repeated!
{{ '}' }}</code></pre>
                    </div>
                    <div class="compare-item good">
                        <h4>✅ With canActivateChild</h4>
                        <pre><code>{{ '{' }}
  path: 'admin',
  canActivateChild: [adminGuard],  // Once!
  children: [
    {{ '{' }} path: 'users' {{ '}' }},
    {{ '{' }} path: 'settings' {{ '}' }},
    {{ '{' }} path: 'reports' {{ '}' }}
  ]
{{ '}' }}</code></pre>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Implementation</h2>
                <pre><code>// activate-child.guard.ts
export const adminChildGuard: CanActivateChildFn = (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {{ '{' }}
    const authService = inject(AuthService);
    const router = inject(Router);
    
    // This runs for EVERY child route navigation
    console.log('Checking access to:', state.url);
    
    if (!authService.isAdmin()) {{ '{' }}
        return router.createUrlTree(['/login']);
    {{ '}' }}
    
    return true;
{{ '}' }};</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .header { margin-bottom: 2rem; }
        .back-link { color: #667eea; text-decoration: none; }
        h1 { margin: 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .subtitle { color: var(--text-muted, #94a3b8); }

        section {
            background: var(--bg-secondary, #1e293b);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        h2, h3 { color: var(--text-primary, #f1f5f9); }
        p { color: var(--text-secondary, #cbd5e1); }

        .diagram { margin-top: 1rem; }
        .route-tree { 
            background: var(--bg-card, #334155); 
            padding: 1rem; 
            border-radius: 8px;
            font-family: monospace;
            color: var(--text-primary, #f1f5f9);
        }
        .parent-route { 
            padding: 0.5rem; 
            background: rgba(102, 126, 234, 0.2);
            border-radius: 4px;
            margin-bottom: 0.5rem;
            color: var(--text-primary, #f1f5f9);
        }
        .guard-badge {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
        }
        .child-routes { padding-left: 2rem; }
        .child { 
            padding: 0.25rem 0.5rem;
            border-left: 2px solid #667eea;
            margin: 0.25rem 0;
            color: var(--text-secondary, #cbd5e1);
        }

        .status-panel { display: flex; gap: 2rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .status-item { display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary, #f1f5f9); }
        .status-item button {
            padding: 0.5rem 1rem;
            border: 2px solid var(--bg-card, #334155);
            border-radius: 6px;
            background: var(--bg-card, #334155);
            color: var(--text-primary, #f1f5f9);
            cursor: pointer;
        }
        .status-item button:hover { border-color: #667eea; }
        .status-item button.active { background: #667eea; color: white; border-color: #667eea; }

        .link-grid { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .child-link {
            padding: 0.75rem 1rem;
            background: var(--bg-card, #334155);
            border: 2px solid #667eea;
            border-radius: 6px;
            cursor: pointer;
            color: #667eea;
        }
        .child-link:hover { background: #667eea; color: white; }

        .result-panel {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }
        .result-panel.success { background: rgba(16, 185, 129, 0.2); color: #10b981; }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .compare-item { padding: 1rem; border-radius: 8px; }
        .compare-item h4 { color: var(--text-primary, #f1f5f9); }
        .compare-item.bad { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); }
        .compare-item.good { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); }
        .compare-item pre { 
            background: #0f172a; 
            color: #4ade80; 
            padding: 0.75rem; 
            border-radius: 6px;
            font-size: 0.75rem;
            overflow-x: auto;
        }

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
export class ActivateChildDemoComponent {
    lastResult: { route: string; success: boolean; message: string } | null = null;

    get isLoggedIn(): boolean {
        return adminAuthState.isLoggedIn;
    }

    get isAdmin(): boolean {
        return adminAuthState.isAdmin;
    }

    toggleLogin(): void {
        adminAuthState.isLoggedIn = !adminAuthState.isLoggedIn;
    }

    toggleAdmin(): void {
        adminAuthState.isAdmin = !adminAuthState.isAdmin;
    }

    tryAccess(route: string): void {
        if (!this.isLoggedIn) {
            this.lastResult = {
                route,
                success: false,
                message: '❌ Blocked: You must be logged in!'
            };
        } else if (!this.isAdmin) {
            this.lastResult = {
                route,
                success: false,
                message: '❌ Blocked: Admin role required!'
            };
        } else {
            this.lastResult = {
                route,
                success: true,
                message: '✅ Access granted! canActivateChild allowed navigation.'
            };
        }
        console.log(`[Demo] Attempted access to ${route}:`, this.lastResult);
    }
}
