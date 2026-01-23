/**
 * ============================================================================
 * GLOBAL ERROR HANDLER
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-global-error-handler',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🌍 Global ErrorHandler</h1>
                <p class="subtitle">Catch All Unhandled Errors</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    Angular's <code>ErrorHandler</code> is a service that catches all unhandled errors.
                    By providing a custom implementation, you can log errors, send to monitoring services,
                    and show user-friendly messages.
                </p>
            </section>

            <section class="code-section">
                <h2>💻 Custom ErrorHandler</h2>
                <pre class="code"><code>// global-error-handler.ts
import {{ '{' }} ErrorHandler, Injectable, inject {{ '}' }} from '&#64;angular/core';

&#64;Injectable()
export class GlobalErrorHandler implements ErrorHandler {{ '{' }}
    
    handleError(error: any): void {{ '{' }}
        // 1. Log to console
        console.error('🚨 Global Error:', error);
        
        // 2. Extract error details
        const message = error?.message || 'Unknown error';
        const stack = error?.stack || '';
        
        // 3. Send to monitoring service (Sentry, LogRocket, etc.)
        this.logToService({{ '{' }}
            message,
            stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        {{ '}' }});
        
        // 4. Show user notification
        // this.notificationService.showError('Something went wrong!');
    {{ '}' }}
    
    private logToService(errorData: any): void {{ '{' }}
        // Send to backend logging API
        // fetch('/api/logs', {{ '{' }} method: 'POST', body: JSON.stringify(errorData) {{ '}' }});
        console.log('📤 Error logged:', errorData);
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="provide-section">
                <h2>📦 Provide in App Config</h2>
                <pre class="code"><code>// app.config.ts
import {{ '{' }} ApplicationConfig, ErrorHandler {{ '}' }} from '&#64;angular/core';
import {{ '{' }} GlobalErrorHandler {{ '}' }} from './global-error-handler';

export const appConfig: ApplicationConfig = {{ '{' }}
    providers: [
        {{ '{' }} provide: ErrorHandler, useClass: GlobalErrorHandler {{ '}' }}
    ]
{{ '}' }};</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Demo: Trigger Error</h2>
                <div class="demo-box">
                    <button (click)="triggerError()" class="error-btn">
                        💥 Throw Unhandled Error
                    </button>
                    <button (click)="triggerAsyncError()" class="error-btn">
                        ⏳ Throw Async Error
                    </button>
                    <p class="hint">Open console to see global error handler in action</p>
                </div>
            </section>

            <section class="integration-section">
                <h2>🔗 Integration with Monitoring</h2>
                <pre class="code"><code>// Integration with Sentry
import * as Sentry from '&#64;sentry/angular';

&#64;Injectable()
export class GlobalErrorHandler implements ErrorHandler {{ '{' }}
    handleError(error: any): void {{ '{' }}
        // Send to Sentry
        Sentry.captureException(error);
        
        // Still log locally
        console.error(error);
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Catches all unhandled JS errors</li>
                    <li>Does NOT catch handled errors (try/catch, catchError)</li>
                    <li>Provide in root for app-wide coverage</li>
                    <li>Always call console.error for debugging</li>
                    <li>Don't throw from within ErrorHandler!</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #ef4444; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        .demo-box { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; text-align: center; }
        .error-btn { padding: 0.75rem 1.5rem; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; margin: 0.5rem; }
        .error-btn:hover { background: #dc2626; }
        .hint { margin-top: 1rem; color: var(--text-secondary); font-size: 0.85rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class GlobalErrorHandlerComponent {
    triggerError(): void {
        throw new Error('This is an unhandled error from the component!');
    }

    triggerAsyncError(): void {
        setTimeout(() => {
            throw new Error('This is an async unhandled error!');
        }, 100);
    }
}
