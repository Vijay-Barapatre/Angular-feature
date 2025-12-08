/**
 * USE CASE 5: Factory Providers (useFactory)
 * 
 * Demonstrates how to create services dynamically using factory functions.
 * Useful when the service needs runtime configuration or conditional logic.
 */

import { Component, Inject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Token for environment type
export const ENVIRONMENT = new InjectionToken<string>('environment');

// Logger service interface
export interface Logger {
    log(message: string): void;
    getLevel(): string;
}

// Development logger - verbose output
class DevelopmentLogger implements Logger {
    log(message: string): void {
        console.log(`[DEV] ${new Date().toISOString()} - ${message}`);
    }
    getLevel(): string { return 'DEBUG'; }
}

// Production logger - minimal output
class ProductionLogger implements Logger {
    log(message: string): void {
        console.log(`[PROD] ${message}`);
    }
    getLevel(): string { return 'ERROR'; }
}

// Injection token for the logger
export const LOGGER = new InjectionToken<Logger>('logger');

/**
 * Factory function - creates the appropriate logger based on environment
 */
function loggerFactory(env: string): Logger {
    console.log(`[Factory] Creating logger for environment: ${env}`);
    return env === 'production' ? new ProductionLogger() : new DevelopmentLogger();
}

@Component({
    selector: 'app-use-case-5-parent',
    standalone: true,
    imports: [CommonModule, RouterLink],
    providers: [
        // Provide environment
        { provide: ENVIRONMENT, useValue: 'development' },
        // Factory provider with dependencies
        {
            provide: LOGGER,
            useFactory: loggerFactory,
            deps: [ENVIRONMENT]  // Inject ENVIRONMENT into factory
        }
    ],
    template: `
        <div class="use-case-container fade-in">
            <div class="page-header">
                <a routerLink="/services-di" class="back-link">← Back to Overview</a>
                <h1>🏭 Use Case 5: Factory Providers</h1>
                <p class="header-description">
                    Create services dynamically using factory functions with runtime dependencies.
                </p>
            </div>

            <section class="demo-section">
                <h2>🧪 Factory-Created Logger</h2>
                
                <div class="logger-display">
                    <div class="logger-header">
                        <span class="icon">📝</span>
                        <h3>Active Logger</h3>
                    </div>
                    <div class="logger-body">
                        <div class="info-row">
                            <span class="label">Environment:</span>
                            <span class="value env-dev">{{ environment }}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Log Level:</span>
                            <span class="value">{{ logger.getLevel() }}</span>
                        </div>
                        
                        <div class="log-area">
                            <h4>Test the Logger:</h4>
                            <button (click)="testLog()" class="btn btn-primary">
                                📤 Log a Message
                            </button>
                            <p class="hint">Check browser console to see the output</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 How It Works</h2>
                
                <div class="code-block">
                    <div class="code-header">Factory Provider Configuration</div>
                    <pre><code>providers: [
  // 1. Provide environment value
  &#123; provide: ENVIRONMENT, useValue: 'development' &#125;,
  
  // 2. Factory creates logger based on environment
  &#123;
    provide: LOGGER,
    useFactory: (env: string) =&gt; &#123;
      return env === 'production' 
        ? new ProductionLogger() 
        : new DevelopmentLogger();
    &#125;,
    deps: [ENVIRONMENT]  // Dependencies passed to factory
  &#125;
]</code></pre>
                </div>
            </section>

            <section class="use-cases-section">
                <h2>💡 When to Use Factory Providers</h2>
                <div class="use-cases-grid">
                    <div class="use-case-card">
                        <span class="icon">🔧</span>
                        <h4>Environment-Based Config</h4>
                        <p>Different services for dev/staging/prod</p>
                    </div>
                    <div class="use-case-card">
                        <span class="icon">🔐</span>
                        <h4>Authentication</h4>
                        <p>Mock auth in dev, real auth in prod</p>
                    </div>
                    <div class="use-case-card">
                        <span class="icon">📊</span>
                        <h4>Feature Flags</h4>
                        <p>Enable/disable features dynamically</p>
                    </div>
                    <div class="use-case-card">
                        <span class="icon">🌐</span>
                        <h4>API Endpoints</h4>
                        <p>Switch between API versions</p>
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
        
        .logger-display { background: var(--bg-secondary); border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--accent-color); }
        .logger-header { display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-lg); background: linear-gradient(135deg, var(--accent-color), #4ade80); color: var(--bg-primary); }
        .logger-header .icon { font-size: 1.5rem; }
        .logger-header h3 { margin: 0; }
        .logger-body { padding: var(--spacing-xl); }
        .info-row { display: flex; gap: var(--spacing-md); align-items: center; margin-bottom: var(--spacing-md); padding: var(--spacing-md); background: var(--bg-card); border-radius: var(--radius-md); }
        .info-row .label { color: var(--text-secondary); }
        .info-row .value { font-family: monospace; font-weight: 600; }
        .env-dev { color: var(--warning); }
        .log-area { margin-top: var(--spacing-xl); text-align: center; }
        .log-area h4 { margin-bottom: var(--spacing-md); }
        .btn { padding: var(--spacing-md) var(--spacing-xl); border-radius: var(--radius-md); cursor: pointer; font-weight: 600; border: none; }
        .btn-primary { background: var(--accent-color); color: var(--bg-primary); }
        .btn:hover { transform: translateY(-2px); }
        .hint { font-size: 0.875rem; color: var(--text-muted); margin-top: var(--spacing-md); }
        
        .code-block { background: var(--bg-secondary); border-radius: var(--radius-lg); overflow: hidden; }
        .code-header { padding: var(--spacing-md) var(--spacing-lg); background: var(--bg-card); border-bottom: 1px solid rgba(102,126,234,0.2); font-family: monospace; color: var(--primary-light); }
        .code-block pre { margin: 0; padding: var(--spacing-lg); overflow-x: auto; }
        .code-block code { font-family: monospace; font-size: 0.875rem; line-height: 1.6; }
        
        .use-cases-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); }
        .use-case-card { background: var(--bg-secondary); padding: var(--spacing-lg); border-radius: var(--radius-md); text-align: center; border: 1px solid rgba(102,126,234,0.2); }
        .use-case-card .icon { font-size: 2rem; display: block; margin-bottom: var(--spacing-md); }
        .use-case-card h4 { margin-bottom: var(--spacing-sm); }
        .use-case-card p { color: var(--text-muted); font-size: 0.875rem; margin: 0; }
    `]
})
export class UseCase5ParentComponent {
    constructor(
        @Inject(ENVIRONMENT) public environment: string,
        @Inject(LOGGER) public logger: Logger
    ) {
        console.log('[UseCase5] Factory-created logger injected');
    }

    testLog(): void {
        this.logger.log('Hello from the factory-created logger!');
    }
}
