/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: LAZY LOADING GUARDS (canMatch)
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-2-lazy-guard',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Lazy Loading Guards</h2>
                <p>Control route matching with canMatch for lazy-loaded modules.</p>
            </div>

            <div class="content">
                <div class="info-box">
                    <h4>📦 canMatch vs canActivate</h4>
                    <p><strong>canActivate:</strong> Runs after route matches, module already loaded</p>
                    <p><strong>canMatch:</strong> Runs before matching, prevents module load if false</p>
                </div>

                <div class="module-demo">
                    <h4>Lazy Modules:</h4>
                    @for (mod of modules(); track mod.name) {
                        <div class="module-card" [class.loaded]="mod.loaded">
                            <div class="module-header">
                                <span class="module-name">{{ mod.name }}</span>
                                <span class="module-size">{{ mod.size }}</span>
                            </div>
                            <div class="module-status">
                                @if (mod.loaded) {
                                    <span class="loaded-badge">📦 Loaded</span>
                                } @else {
                                    <span class="not-loaded-badge">⏳ Not Loaded</span>
                                }
                            </div>
                            <button (click)="tryLoadModule(mod)" [disabled]="mod.loaded">
                                {{ mod.loaded ? 'Already Loaded' : 'Try Navigate' }}
                            </button>
                        </div>
                    }
                </div>

                <div class="toggle-section">
                    <h4>Guard Configuration:</h4>
                    <label>
                        <input type="checkbox" [checked]="isAdmin()" (change)="toggleAdmin()">
                        User is Admin (controls canMatch for Admin module)
                    </label>
                </div>

                @if (result()) {
                    <div class="result" [class.success]="result()?.success">
                        <p>{{ result()?.message }}</p>
                    </div>
                }

                <div class="code-preview">
                    <h4>canMatch Implementation</h4>
                    <pre><code>export const adminCanMatch: CanMatchFn = (route, segments) => {{ '{' }}
  const auth = inject(AuthService);
  
  // If not admin, route won't even match
  // Module stays unloaded!
  return auth.isAdmin();
{{ '}' }};

// Route config
{{ '{' }}
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes'),
  canMatch: [adminCanMatch]  // Prevents loading if false
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .info-box { padding: 1rem; background: #eff6ff; border-radius: 8px; margin-bottom: 1.5rem; }
        .info-box h4 { margin: 0 0 0.5rem; color: #1d4ed8; }
        .info-box p { margin: 0.25rem 0; font-size: 0.9rem; }
        .module-demo { display: grid; gap: 1rem; margin-bottom: 1.5rem; }
        .module-demo h4 { margin: 0 0 0.5rem; }
        .module-card { padding: 1rem; border: 2px solid #e5e7eb; border-radius: 8px; }
        .module-card.loaded { border-color: #10b981; background: #f0fdf4; }
        .module-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .module-name { font-weight: 600; }
        .module-size { color: #6b7280; font-size: 0.85rem; }
        .loaded-badge { color: #10b981; }
        .not-loaded-badge { color: #f59e0b; }
        .module-card button { width: 100%; padding: 0.5rem; margin-top: 0.5rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .module-card button:disabled { opacity: 0.5; }
        .toggle-section { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .toggle-section h4 { margin: 0 0 0.5rem; }
        .result { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; background: #fef2f2; }
        .result.success { background: #f0fdf4; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario2LazyGuardComponent {
    isAdmin = signal(false);

    modules = signal([
        { name: 'Dashboard Module', path: '/dashboard', size: '45KB', loaded: true, requiresAdmin: false },
        { name: 'Admin Module', path: '/admin', size: '120KB', loaded: false, requiresAdmin: true },
        { name: 'Reports Module', path: '/reports', size: '85KB', loaded: false, requiresAdmin: false }
    ]);

    result = signal<{ success: boolean; message: string } | null>(null);

    toggleAdmin(): void {
        this.isAdmin.update(v => !v);
    }

    tryLoadModule(mod: { name: string; loaded: boolean; requiresAdmin: boolean }): void {
        if (mod.requiresAdmin && !this.isAdmin()) {
            this.result.set({
                success: false,
                message: `🚫 canMatch returned false for ${mod.name}. Module NOT loaded (saves bandwidth!)`
            });
        } else {
            this.modules.update(modules =>
                modules.map(m => m.name === mod.name ? { ...m, loaded: true } : m)
            );
            this.result.set({
                success: true,
                message: `✅ canMatch passed. ${mod.name} loaded and route activated.`
            });
        }
    }
}
