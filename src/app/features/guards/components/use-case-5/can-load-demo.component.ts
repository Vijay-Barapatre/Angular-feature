/**
 * ============================================================================
 * USE CASE 5: canLoad GUARD - DEMO COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { canLoadAuthState } from './can-load.guard';

@Component({
    selector: 'app-can-load-demo',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <a routerLink="/guards" class="back-link">← Back to Guards</a>
                <h1>📦 Use Case 5: canLoad Guard</h1>
                <p class="subtitle">Prevent lazy-loaded modules from downloading</p>
            </header>

            <section class="concept-section">
                <h2>💡 What is canLoad?</h2>
                <p>
                    <code>canLoad</code> prevents a lazy-loaded module from being <strong>downloaded</strong> at all.
                    Unlike <code>canActivate</code>, the module code is <strong>never fetched</strong> if the guard returns false.
                </p>
                <div class="comparison">
                    <div class="compare-item">
                        <h4>canActivate</h4>
                        <p>Module downloads → Guard blocks → User can't access</p>
                        <span class="badge caution">Code visible in DevTools</span>
                    </div>
                    <div class="compare-item">
                        <h4>canLoad</h4>
                        <p>Guard blocks → Module never downloads</p>
                        <span class="badge success">Code stays hidden</span>
                    </div>
                </div>
            </section>

            <section class="demo-section">
                <h2>🎮 Toggle Premium Status</h2>
                <div class="status-panel">
                    <div class="status-item">
                        <span>Logged In:</span>
                        <button (click)="toggleLogin()" [class.active]="isLoggedIn">
                            {{ isLoggedIn ? '✅ Yes' : '❌ No' }}
                        </button>
                    </div>
                    <div class="status-item">
                        <span>Premium User:</span>
                        <button (click)="togglePremium()" [class.active]="isPremium">
                            {{ isPremium ? '⭐ Yes' : '❌ No' }}
                        </button>
                    </div>
                </div>

                <div class="action-panel">
                    <button class="try-btn" (click)="tryAccessPremium()">
                        🚀 Try to Access Premium Module
                    </button>
                    <p class="hint">
                        Open DevTools → Network tab to see if module loads!
                    </p>
                </div>

                @if (lastAttemptResult) {
                    <div class="result-panel" [class.success]="lastAttemptResult === 'success'">
                        {{ lastAttemptResult === 'success' 
                            ? '✅ Module loaded successfully!' 
                            : '❌ Module was blocked (check console)' }}
                    </div>
                }
            </section>

            <section class="code-section">
                <h2>📝 Implementation</h2>
                <pre><code>// can-load.guard.ts
export const premiumLoadGuard: CanLoadFn = (route, segments) => {{ '{' }}
    const authService = inject(AuthService);
    
    if (!authService.isPremium()) {{ '{' }}
        // Module code will NOT be downloaded!
        return false;
    {{ '}' }}
    
    return true;  // Allow module to load
{{ '}' }};

// app.routes.ts
{{ '{' }}
    path: 'premium-features',
    canLoad: [premiumLoadGuard],  // Checked BEFORE download
    loadChildren: () => import('./premium/premium.routes')
{{ '}' }}</code></pre>
            </section>

            <section class="use-cases-section">
                <h2>🎯 When to Use canLoad</h2>
                <ul>
                    <li>✅ <strong>Subscription-based features</strong> - Don't download premium code for free users</li>
                    <li>✅ <strong>Admin modules</strong> - Keep admin code hidden from regular users</li>
                    <li>✅ <strong>Feature flags</strong> - Don't load disabled feature modules</li>
                    <li>✅ <strong>Bandwidth optimization</strong> - Reduce initial download size</li>
                </ul>
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

        h2 { color: var(--text-primary, #f1f5f9); }
        p { color: var(--text-secondary, #cbd5e1); }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .compare-item { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; }
        .compare-item h4 { margin: 0 0 0.5rem 0; color: #667eea; }
        .compare-item p { color: var(--text-secondary, #cbd5e1); }
        .badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
        .badge.success { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .badge.caution { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }

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

        .action-panel { text-align: center; }
        .try-btn {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
        }
        .hint { color: var(--text-muted, #94a3b8); font-size: 0.85rem; margin-top: 0.5rem; }

        .result-panel {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }
        .result-panel.success { background: rgba(16, 185, 129, 0.2); color: #10b981; }

        .code-section pre {
            background: #0f172a;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.85rem;
            border-left: 4px solid #667eea;
        }

        .use-cases-section ul { list-style: none; padding: 0; }
        .use-cases-section li { padding: 0.5rem 0; color: var(--text-secondary, #cbd5e1); }
    `]
})
export class CanLoadDemoComponent {
    lastAttemptResult: 'success' | 'blocked' | null = null;

    get isLoggedIn(): boolean {
        return canLoadAuthState.isLoggedIn;
    }

    get isPremium(): boolean {
        return canLoadAuthState.isPremium;
    }

    toggleLogin(): void {
        canLoadAuthState.isLoggedIn = !canLoadAuthState.isLoggedIn;
    }

    togglePremium(): void {
        canLoadAuthState.isPremium = !canLoadAuthState.isPremium;
    }

    tryAccessPremium(): void {
        if (this.isLoggedIn && this.isPremium) {
            this.lastAttemptResult = 'success';
            console.log('✅ Premium access granted - module would load');
        } else {
            this.lastAttemptResult = 'blocked';
            console.log('❌ Premium access denied - module blocked');
        }
    }
}
