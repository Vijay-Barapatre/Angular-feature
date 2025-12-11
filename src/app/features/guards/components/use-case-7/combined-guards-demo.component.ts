/**
 * ============================================================================
 * USE CASE 7: COMBINED GUARDS - DEMO COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { combinedGuardState } from './combined.guards';

@Component({
    selector: 'app-combined-guards-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <a routerLink="/guards" class="back-link">← Back to Guards</a>
                <h1>🔗 Use Case 7: Combined Guards</h1>
                <p class="subtitle">Chain multiple guards for multi-layer security</p>
            </header>

            <section class="concept-section">
                <h2>💡 What are Combined Guards?</h2>
                <p>
                    You can apply <strong>multiple guards</strong> to a single route.
                    Guards run in order, and <strong>ALL must return true</strong> for navigation to proceed.
                </p>
                <div class="flow-diagram">
                    <div class="guard-step">🔐 authGuard</div>
                    <div class="arrow">→</div>
                    <div class="guard-step">👑 roleGuard</div>
                    <div class="arrow">→</div>
                    <div class="guard-step">🚩 featureFlagGuard</div>
                    <div class="arrow">→</div>
                    <div class="guard-step">🔧 maintenanceGuard</div>
                    <div class="arrow">→</div>
                    <div class="result">✅ Access</div>
                </div>
            </section>

            <section class="demo-section">
                <h2>🎮 Toggle Guard Conditions</h2>
                <div class="toggle-grid">
                    <div class="toggle-item">
                        <span>🔐 Logged In:</span>
                        <button (click)="toggleLogin()" [class.active]="state.isLoggedIn">
                            {{ state.isLoggedIn ? '✅ Yes' : '❌ No' }}
                        </button>
                    </div>
                    <div class="toggle-item">
                        <span>👑 Role:</span>
                        <select [(ngModel)]="state.role" (change)="0">
                            <option value="guest">Guest</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div class="toggle-item">
                        <span>🚩 Feature Enabled:</span>
                        <button (click)="toggleFeature()" [class.active]="state.featureEnabled">
                            {{ state.featureEnabled ? '✅ Yes' : '❌ No' }}
                        </button>
                    </div>
                    <div class="toggle-item">
                        <span>🔧 Maintenance Mode:</span>
                        <button (click)="toggleMaintenance()" [class.active]="!state.maintenanceMode">
                            {{ state.maintenanceMode ? '🔴 Active' : '🟢 Off' }}
                        </button>
                    </div>
                </div>

                <div class="test-panel">
                    <button (click)="testAccess()" class="test-btn">
                        🚀 Test Access (Requires Admin)
                    </button>
                </div>

                @if (testResult) {
                    <div class="result-panel" [class.success]="testResult.success">
                        <h4>{{ testResult.success ? '✅ Access Granted!' : '❌ Access Denied' }}</h4>
                        <div class="guard-results">
                            @for (result of testResult.guards; track result.name) {
                                <div class="guard-result" [class.passed]="result.passed">
                                    {{ result.passed ? '✅' : '❌' }} {{ result.name }}: {{ result.message }}
                                </div>
                            }
                        </div>
                    </div>
                }
            </section>

            <section class="code-section">
                <h2>📝 Route Configuration</h2>
                <pre><code>{{ '{' }}
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    
    // 🔗 COMBINED GUARDS - All must pass!
    canActivate: [
        authCheckGuard,       // Guard 1: Auth
        roleCheckGuard,       // Guard 2: Role
        featureFlagGuard,     // Guard 3: Feature
        maintenanceModeGuard  // Guard 4: Maintenance
    ],
    
    // Pass data to guards
    data: {{ '{' }}
        requiredRole: 'admin'
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="tips-section">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li><strong>Order matters:</strong> Put fast guards first (auth before expensive API calls)</li>
                    <li><strong>Single responsibility:</strong> Each guard checks ONE thing</li>
                    <li><strong>Reusable:</strong> Same guards can be combined differently on different routes</li>
                    <li><strong>Clear naming:</strong> Guard names should describe what they check</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .header { margin-bottom: 2rem; }
        .back-link { color: #667eea; text-decoration: none; }
        h1, h2, h4 { margin: 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .subtitle { color: var(--text-muted, #94a3b8); }
        p { color: var(--text-secondary, #cbd5e1); }

        section {
            background: var(--bg-secondary, #1e293b);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .flow-diagram {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 1rem;
            padding: 1rem;
            background: var(--bg-card, #334155);
            border-radius: 8px;
        }
        .guard-step {
            background: rgba(102, 126, 234, 0.2);
            color: var(--text-primary, #f1f5f9);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 500;
        }
        .arrow { color: #667eea; font-weight: bold; }
        .result { background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.5rem 1rem; border-radius: 6px; }

        .toggle-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        .toggle-item { 
            display: flex; 
            align-items: center; 
            justify-content: space-between;
            background: var(--bg-card, #334155);
            padding: 0.75rem;
            border-radius: 6px;
            color: var(--text-primary, #f1f5f9);
        }
        .toggle-item button, .toggle-item select {
            padding: 0.5rem 1rem;
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 6px;
            background: var(--bg-secondary, #1e293b);
            color: var(--text-primary, #f1f5f9);
            cursor: pointer;
        }
        .toggle-item button:hover, .toggle-item select:hover { border-color: #667eea; }
        .toggle-item button.active { background: #667eea; color: white; border-color: #667eea; }

        .test-panel { text-align: center; margin-top: 1.5rem; }
        .test-btn {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
        }

        .result-panel {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }
        .result-panel.success { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .guard-results { margin-top: 0.5rem; }
        .guard-result { padding: 0.25rem 0; font-size: 0.9rem; color: var(--text-secondary, #cbd5e1); }

        .code-section pre {
            background: #0f172a;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.85rem;
            border-left: 4px solid #667eea;
        }

        .tips-section ul { padding-left: 1.5rem; }
        .tips-section li { margin: 0.5rem 0; color: var(--text-secondary, #cbd5e1); }
    `]
})
export class CombinedGuardsDemoComponent {
    state = combinedGuardState;
    testResult: {
        success: boolean;
        guards: { name: string; passed: boolean; message: string }[];
    } | null = null;

    toggleLogin(): void {
        this.state.isLoggedIn = !this.state.isLoggedIn;
    }

    toggleFeature(): void {
        this.state.featureEnabled = !this.state.featureEnabled;
    }

    toggleMaintenance(): void {
        this.state.maintenanceMode = !this.state.maintenanceMode;
    }

    testAccess(): void {
        const guards: { name: string; passed: boolean; message: string }[] = [];

        // Guard 1: Auth
        if (!this.state.isLoggedIn) {
            guards.push({ name: 'authGuard', passed: false, message: 'Not logged in' });
            this.testResult = { success: false, guards };
            return;
        }
        guards.push({ name: 'authGuard', passed: true, message: 'Logged in' });

        // Guard 2: Role
        const hasAdminRole = this.state.role === 'admin';
        if (!hasAdminRole) {
            guards.push({ name: 'roleGuard', passed: false, message: `Role "${this.state.role}" insufficient` });
            this.testResult = { success: false, guards };
            return;
        }
        guards.push({ name: 'roleGuard', passed: true, message: 'Admin role verified' });

        // Guard 3: Feature
        if (!this.state.featureEnabled) {
            guards.push({ name: 'featureFlagGuard', passed: false, message: 'Feature disabled' });
            this.testResult = { success: false, guards };
            return;
        }
        guards.push({ name: 'featureFlagGuard', passed: true, message: 'Feature enabled' });

        // Guard 4: Maintenance
        if (this.state.maintenanceMode) {
            guards.push({ name: 'maintenanceModeGuard', passed: false, message: 'System under maintenance' });
            this.testResult = { success: false, guards };
            return;
        }
        guards.push({ name: 'maintenanceModeGuard', passed: true, message: 'System operational' });

        this.testResult = { success: true, guards };
    }
}
