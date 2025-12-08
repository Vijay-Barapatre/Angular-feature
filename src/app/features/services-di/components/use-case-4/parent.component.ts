/**
 * USE CASE 4: Injection Tokens
 * 
 * Demonstrates how to inject non-class values like:
 * - Configuration objects
 * - API URLs
 * - Feature flags
 * - Primitive values
 */

import { Component, Inject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Step 1: Define an interface for type safety
 */
export interface AppConfig {
    apiUrl: string;
    appName: string;
    version: string;
    features: {
        darkMode: boolean;
        notifications: boolean;
        analytics: boolean;
    };
}

/**
 * Step 2: Create an InjectionToken
 * 
 * InjectionToken is used when the dependency is NOT a class.
 * Classes can be used as their own tokens, but primitives and
 * objects need an InjectionToken.
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

/**
 * Step 3: Define the actual configuration value
 */
const appConfig: AppConfig = {
    apiUrl: 'https://api.example.com',
    appName: 'Angular Features Learning',
    version: '1.0.0',
    features: {
        darkMode: true,
        notifications: true,
        analytics: false
    }
};

@Component({
    selector: 'app-use-case-4-parent',
    standalone: true,
    imports: [CommonModule, RouterLink],
    /**
     * Step 4: Provide the value using useValue
     */
    providers: [
        { provide: APP_CONFIG, useValue: appConfig }
    ],
    template: `
        <div class="use-case-container fade-in">
            <div class="page-header">
                <a routerLink="/services-di" class="back-link">← Back to Overview</a>
                <h1>🎫 Use Case 4: Injection Tokens</h1>
                <p class="header-description">
                    Learn how to inject non-class values like configuration objects using InjectionToken.
                </p>
            </div>

            <section class="concept-section">
                <h2>🎯 The Problem</h2>
                <div class="problem-box">
                    <p>Angular's DI uses classes as tokens. But what if you need to inject:</p>
                    <ul>
                        <li>Configuration objects</li>
                        <li>API URLs (strings)</li>
                        <li>Feature flags (booleans)</li>
                        <li>Any non-class value</li>
                    </ul>
                    <p><strong>Solution:</strong> Use <code>InjectionToken</code> as a unique identifier!</p>
                </div>
            </section>

            <section class="demo-section">
                <h2>🧪 Injected Configuration</h2>
                
                <div class="config-display">
                    <div class="config-header">
                        <span class="icon">⚙️</span>
                        <h3>{{ config.appName }}</h3>
                        <span class="version-badge">v{{ config.version }}</span>
                    </div>
                    
                    <div class="config-body">
                        <div class="config-item">
                            <span class="label">API URL:</span>
                            <code class="value">{{ config.apiUrl }}</code>
                        </div>
                        
                        <h4>Feature Flags</h4>
                        <div class="features-grid">
                            <div class="feature-item" [class.enabled]="config.features.darkMode">
                                <span class="feature-icon">{{ config.features.darkMode ? '✅' : '❌' }}</span>
                                <span>Dark Mode</span>
                            </div>
                            <div class="feature-item" [class.enabled]="config.features.notifications">
                                <span class="feature-icon">{{ config.features.notifications ? '✅' : '❌' }}</span>
                                <span>Notifications</span>
                            </div>
                            <div class="feature-item" [class.enabled]="config.features.analytics">
                                <span class="feature-icon">{{ config.features.analytics ? '✅' : '❌' }}</span>
                                <span>Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Implementation Steps</h2>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Define the interface</h4>
                        <pre><code>interface AppConfig &#123;
  apiUrl: string;
  version: string;
&#125;</code></pre>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Create InjectionToken</h4>
                        <pre><code>export const APP_CONFIG = 
  new InjectionToken&lt;AppConfig&gt;('app.config');</code></pre>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Provide with useValue</h4>
                        <pre><code>providers: [
  &#123; provide: APP_CONFIG, useValue: myConfig &#125;
]</code></pre>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Inject with &#64;Inject()</h4>
                        <pre><code>constructor(
  &#64;Inject(APP_CONFIG) private config: AppConfig
) &#123;&#125;</code></pre>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .use-case-container { max-width: 1000px; margin: 0 auto; }
        .page-header { text-align: center; margin-bottom: var(--spacing-2xl); }
        .back-link { display: inline-block; color: var(--primary-light); text-decoration: none; margin-bottom: var(--spacing-md); }
        .back-link:hover { color: var(--accent-color); }
        .page-header h1 { font-size: 2.25rem; margin-bottom: var(--spacing-md); }
        .header-description { font-size: 1.125rem; color: var(--text-secondary); max-width: 700px; margin: 0 auto; }
        section { margin-bottom: var(--spacing-2xl); }
        section h2 { font-size: 1.75rem; margin-bottom: var(--spacing-xl); border-left: 4px solid var(--primary-color); padding-left: var(--spacing-lg); }
        
        .problem-box { background: var(--bg-secondary); padding: var(--spacing-xl); border-radius: var(--radius-lg); border-left: 4px solid var(--warning); }
        .problem-box p { color: var(--text-secondary); margin-bottom: var(--spacing-md); }
        .problem-box ul { list-style: none; padding: 0; margin: 0 0 var(--spacing-md) 0; }
        .problem-box li { padding: var(--spacing-xs) 0; padding-left: var(--spacing-lg); position: relative; color: var(--text-muted); }
        .problem-box li::before { content: '→'; position: absolute; left: 0; color: var(--warning); }
        .problem-box code { background: var(--bg-card); padding: 2px 6px; border-radius: 4px; color: var(--primary-light); }
        
        .config-display { background: var(--bg-secondary); border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--primary-color); }
        .config-header { display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-lg); background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); }
        .config-header .icon { font-size: 1.5rem; }
        .config-header h3 { margin: 0; flex: 1; }
        .version-badge { background: rgba(0,0,0,0.2); padding: var(--spacing-xs) var(--spacing-sm); border-radius: var(--radius-sm); font-size: 0.875rem; }
        .config-body { padding: var(--spacing-xl); }
        .config-item { display: flex; gap: var(--spacing-md); align-items: center; margin-bottom: var(--spacing-lg); padding: var(--spacing-md); background: var(--bg-card); border-radius: var(--radius-md); }
        .config-item .label { color: var(--text-secondary); }
        .config-item .value { font-family: monospace; color: var(--accent-color); }
        .config-body h4 { margin-bottom: var(--spacing-md); color: var(--text-secondary); }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-md); }
        .feature-item { display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-md); background: var(--bg-card); border-radius: var(--radius-md); opacity: 0.5; }
        .feature-item.enabled { opacity: 1; border: 1px solid var(--success); }
        .feature-icon { font-size: 1.25rem; }
        
        .step { display: flex; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg); }
        .step-number { width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .step-content { flex: 1; background: var(--bg-secondary); padding: var(--spacing-lg); border-radius: var(--radius-md); }
        .step-content h4 { margin: 0 0 var(--spacing-md) 0; }
        .step-content pre { margin: 0; background: var(--bg-card); padding: var(--spacing-md); border-radius: var(--radius-md); overflow-x: auto; }
        .step-content code { font-family: monospace; font-size: 0.875rem; }
    `]
})
export class UseCase4ParentComponent {
    /**
     * Step 5: Inject using @Inject decorator
     * 
     * Unlike class-based services, InjectionToken requires
     * the @Inject() decorator to tell Angular which token to use.
     */
    constructor(@Inject(APP_CONFIG) public config: AppConfig) {
        console.log('[UseCase4] Config injected:', this.config);
    }
}
