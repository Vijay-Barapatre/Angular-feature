/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: FEATURE FLAGS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeatureFlag {
    name: string;
    key: string;
    enabled: boolean;
    description: string;
}

@Component({
    selector: 'app-scenario-5-feature-flag',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Feature Flags</h2>
                <p>Enable/disable routes dynamically based on feature flags.</p>
            </div>

            <div class="content">
                <div class="flag-manager">
                    <h4>🚩 Feature Flags Configuration</h4>
                    <p class="flag-info">Toggle features to simulate remote config changes</p>
                    
                    @for (flag of featureFlags(); track flag.key) {
                        <div class="flag-row">
                            <div class="flag-info">
                                <span class="flag-name">{{ flag.name }}</span>
                                <span class="flag-desc">{{ flag.description }}</span>
                            </div>
                            <label class="toggle">
                                <input 
                                    type="checkbox" 
                                    [checked]="flag.enabled"
                                    (change)="toggleFlag(flag.key)">
                                <span class="slider"></span>
                            </label>
                        </div>
                    }
                </div>

                <div class="routes-demo">
                    <h4>Available Routes:</h4>
                    @for (route of routes; track route.path) {
                        <div class="route-row" [class.disabled]="!isRouteEnabled(route.flagKey)">
                            <span class="route-path">{{ route.path }}</span>
                            <span class="route-flag">flag: {{ route.flagKey }}</span>
                            <button 
                                (click)="navigate(route)"
                                [disabled]="!isRouteEnabled(route.flagKey)">
                                {{ isRouteEnabled(route.flagKey) ? '🚀 Navigate' : '🚫 Disabled' }}
                            </button>
                        </div>
                    }
                </div>

                @if (navResult()) {
                    <div class="result" [class.success]="navResult()?.allowed">
                        {{ navResult()?.message }}
                    </div>
                }

                <div class="code-preview">
                    <h4>Feature Flag Guard</h4>
                    <pre><code>export const featureFlagGuard: CanMatchFn = (route) => {{ '{' }}
  const flagService = inject(FeatureFlagService);
  const flagKey = route.data?.['featureFlag'] as string;
  
  if (!flagKey) return true;
  
  // Check if feature is enabled
  return flagService.isEnabled(flagKey);
{{ '}' }};

// Route config
{{ '{' }}
  path: 'new-dashboard',
  loadComponent: () => import('./new-dashboard'),
  canMatch: [featureFlagGuard],
  data: {{ '{' }} featureFlag: 'new-dashboard-v2' {{ '}' }}
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
        .flag-manager { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1.5rem; }
        .flag-manager h4 { margin: 0 0 0.5rem; }
        .flag-manager > .flag-info { margin: 0 0 1rem; font-size: 0.9rem; color: #6b7280; }
        .flag-row { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: white; border-radius: 6px; margin-bottom: 0.5rem; }
        .flag-row .flag-info { display: flex; flex-direction: column; }
        .flag-name { font-weight: 500; }
        .flag-desc { font-size: 0.8rem; color: #6b7280; }
        .toggle { position: relative; width: 48px; height: 24px; }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #e5e7eb; border-radius: 24px; transition: 0.3s; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.3s; }
        .toggle input:checked + .slider { background: #10b981; }
        .toggle input:checked + .slider:before { transform: translateX(24px); }
        .routes-demo { margin-bottom: 1.5rem; }
        .routes-demo h4 { margin: 0 0 0.75rem; }
        .route-row { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .route-row.disabled { opacity: 0.5; }
        .route-path { flex: 1; font-family: monospace; font-weight: 500; }
        .route-flag { font-size: 0.8rem; color: #6b7280; }
        .route-row button { padding: 0.5rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .route-row button:disabled { background: #9ca3af; cursor: not-allowed; }
        .result { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; background: #fef2f2; }
        .result.success { background: #f0fdf4; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; font-size: 0.9rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario5FeatureFlagComponent {
    featureFlags = signal<FeatureFlag[]>([
        { name: 'New Dashboard', key: 'new-dashboard-v2', enabled: true, description: 'Redesigned dashboard experience' },
        { name: 'AI Assistant', key: 'ai-assistant', enabled: false, description: 'Experimental AI chat feature' },
        { name: 'Dark Mode', key: 'dark-mode', enabled: true, description: 'Enable dark theme toggle' },
        { name: 'Beta Reports', key: 'beta-reports', enabled: false, description: 'New reporting module' }
    ]);

    routes = [
        { path: '/dashboard', name: 'Dashboard', flagKey: 'new-dashboard-v2' },
        { path: '/ai-chat', name: 'AI Chat', flagKey: 'ai-assistant' },
        { path: '/settings/theme', name: 'Theme Settings', flagKey: 'dark-mode' },
        { path: '/reports/beta', name: 'Beta Reports', flagKey: 'beta-reports' }
    ];

    navResult = signal<{ allowed: boolean; message: string } | null>(null);

    toggleFlag(key: string): void {
        this.featureFlags.update(flags =>
            flags.map(f => f.key === key ? { ...f, enabled: !f.enabled } : f)
        );
    }

    isRouteEnabled(flagKey: string): boolean {
        return this.featureFlags().find(f => f.key === flagKey)?.enabled ?? false;
    }

    navigate(route: { path: string; name: string; flagKey: string }): void {
        if (this.isRouteEnabled(route.flagKey)) {
            this.navResult.set({
                allowed: true,
                message: `✅ Feature '${route.flagKey}' is enabled. Navigating to ${route.path}`
            });
        } else {
            this.navResult.set({
                allowed: false,
                message: `🚫 Feature '${route.flagKey}' is disabled. Route does not match.`
            });
        }
    }
}
