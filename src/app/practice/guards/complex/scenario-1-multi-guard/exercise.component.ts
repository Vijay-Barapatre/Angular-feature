/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: MULTI-GUARD CHAIN
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-1-multi-guard',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Multi-Guard Chain</h2>
                <p>Combine multiple guards that run in sequence.</p>
            </div>

            <div class="content">
                <div class="guard-chain">
                    <h4>Guard Execution Order:</h4>
                    <div class="chain-visual">
                        @for (guard of guards(); track guard.name; let i = $index) {
                            <div class="guard-step" [class.passed]="guard.passed" [class.failed]="guard.checked && !guard.passed">
                                <span class="step-num">{{ i + 1 }}</span>
                                <span class="guard-name">{{ guard.name }}</span>
                                <span class="guard-status">
                                    @if (!guard.checked) { ⏳ }
                                    @else if (guard.passed) { ✅ }
                                    @else { ❌ }
                                </span>
                            </div>
                            @if (i < guards().length - 1) {
                                <div class="chain-arrow">→</div>
                            }
                        }
                    </div>
                </div>

                <div class="controls">
                    <h4>Configure Guards:</h4>
                    @for (guard of guards(); track guard.name) {
                        <label class="guard-toggle">
                            <input 
                                type="checkbox" 
                                [checked]="guard.shouldPass"
                                (change)="toggleGuard(guard.name)">
                            {{ guard.name }} will {{ guard.shouldPass ? 'PASS' : 'FAIL' }}
                        </label>
                    }
                </div>

                <button (click)="runGuardChain()" class="btn-run" [disabled]="running()">
                    {{ running() ? 'Running Guards...' : '▶️ Run Guard Chain' }}
                </button>

                @if (result()) {
                    <div class="result" [class.success]="result()?.success">
                        <h4>{{ result()?.success ? '✅ All Guards Passed' : '❌ Guard Chain Failed' }}</h4>
                        <p>{{ result()?.message }}</p>
                    </div>
                }

                <div class="code-preview">
                    <h4>Route Configuration</h4>
                    <pre><code>{{ '{' }}
  path: 'admin/settings',
  component: AdminSettingsComponent,
  canActivate: [
    authGuard,      // 1. Check authentication
    roleGuard,      // 2. Check role permissions
    subscriptionGuard  // 3. Check subscription
  ],
  data: {{ '{' }} roles: ['admin'] {{ '}' }}
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .guard-chain { margin-bottom: 1.5rem; }
        .guard-chain h4 { margin: 0 0 1rem; }
        .chain-visual { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .guard-step { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: #f8fafc; border: 2px solid #e5e7eb; border-radius: 8px; }
        .guard-step.passed { border-color: #10b981; background: #f0fdf4; }
        .guard-step.failed { border-color: #ef4444; background: #fef2f2; }
        .step-num { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: #8b5cf6; color: white; border-radius: 50%; font-size: 0.75rem; font-weight: bold; }
        .guard-name { font-weight: 500; }
        .chain-arrow { font-size: 1.5rem; color: #9ca3af; }
        .controls { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .controls h4 { margin: 0 0 0.75rem; }
        .guard-toggle { display: block; padding: 0.5rem; cursor: pointer; }
        .guard-toggle input { margin-right: 0.5rem; }
        .btn-run { width: 100%; padding: 1rem; background: #8b5cf6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 500; margin-bottom: 1rem; }
        .btn-run:disabled { opacity: 0.7; }
        .result { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; background: #fef2f2; }
        .result.success { background: #f0fdf4; }
        .result h4 { margin: 0 0 0.25rem; }
        .result p { margin: 0; color: #6b7280; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario1MultiGuardComponent {
    guards = signal([
        { name: 'authGuard', shouldPass: true, checked: false, passed: false },
        { name: 'roleGuard', shouldPass: true, checked: false, passed: false },
        { name: 'subscriptionGuard', shouldPass: true, checked: false, passed: false }
    ]);

    running = signal(false);
    result = signal<{ success: boolean; message: string } | null>(null);

    toggleGuard(name: string): void {
        this.guards.update(guards =>
            guards.map(g => g.name === name ? { ...g, shouldPass: !g.shouldPass } : g)
        );
    }

    async runGuardChain(): Promise<void> {
        this.running.set(true);
        this.result.set(null);

        // Reset all guards
        this.guards.update(guards =>
            guards.map(g => ({ ...g, checked: false, passed: false }))
        );

        // Run guards sequentially
        for (let i = 0; i < this.guards().length; i++) {
            await new Promise(resolve => setTimeout(resolve, 600));

            const guard = this.guards()[i];
            this.guards.update(guards =>
                guards.map((g, idx) => idx === i ? { ...g, checked: true, passed: g.shouldPass } : g)
            );

            if (!guard.shouldPass) {
                this.result.set({
                    success: false,
                    message: `Navigation blocked by ${guard.name}. Subsequent guards skipped.`
                });
                this.running.set(false);
                return;
            }
        }

        this.result.set({
            success: true,
            message: 'All guards passed. Navigation allowed!'
        });
        this.running.set(false);
    }
}
