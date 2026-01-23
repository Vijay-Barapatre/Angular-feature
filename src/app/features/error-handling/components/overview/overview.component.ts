/**
 * ============================================================================
 * ERROR HANDLING OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error-handling-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>🚨 Error Handling</h1>
                <p class="subtitle">Global Handlers, Interceptors & Recovery Patterns</p>
            </header>

            <section class="intro-section">
                <div class="intro-card">
                    <h2>Why Error Handling Matters</h2>
                    <p>
                        Proper error handling prevents crashes, provides user feedback,
                        and enables debugging. Angular provides multiple layers for catching errors.
                    </p>
                </div>
            </section>

            <section class="layers-section">
                <h2>📊 Error Handling Layers</h2>
                <div class="layers-visual">
                    <div class="layer l1">
                        <span class="num">1</span>
                        <h4>Component</h4>
                        <p>try/catch, async pipe</p>
                    </div>
                    <div class="layer l2">
                        <span class="num">2</span>
                        <h4>HTTP Interceptor</h4>
                        <p>API error handling</p>
                    </div>
                    <div class="layer l3">
                        <span class="num">3</span>
                        <h4>Global ErrorHandler</h4>
                        <p>Catches all unhandled</p>
                    </div>
                </div>
            </section>

            <section class="usecases-section">
                <h2>📖 Use Cases</h2>
                <div class="usecase-grid">
                    <a routerLink="global-error-handler" class="usecase-card">
                        <span class="num">1</span>
                        <h3>Global ErrorHandler</h3>
                        <p>Custom ErrorHandler class for all unhandled errors</p>
                        <span class="tag">ErrorHandler</span>
                    </a>
                    <a routerLink="http-error-interceptor" class="usecase-card">
                        <span class="num">2</span>
                        <h3>HTTP Error Interceptor</h3>
                        <p>Centralized API error handling</p>
                        <span class="tag">HttpInterceptor</span>
                    </a>
                    <a routerLink="error-notification" class="usecase-card">
                        <span class="num">3</span>
                        <h3>Error Notification</h3>
                        <p>Toast/snackbar service for user feedback</p>
                        <span class="tag">Service</span>
                    </a>
                    <a routerLink="retry-recovery" class="usecase-card">
                        <span class="num">4</span>
                        <h3>Retry & Recovery</h3>
                        <p>RxJS retry, catchError, fallback patterns</p>
                        <span class="tag">RxJS</span>
                    </a>
                    <a routerLink="error-boundaries" class="usecase-card">
                        <span class="num">5</span>
                        <h3>Error Boundaries</h3>
                        <p>Component-level error isolation</p>
                        <span class="tag">Pattern</span>
                    </a>
                </div>
            </section>

            <section class="types-section">
                <h2>📋 Error Types</h2>
                <table>
                    <tr><th>Type</th><th>Source</th><th>How to Handle</th></tr>
                    <tr><td>HTTP Errors</td><td>API calls</td><td>Interceptor + catchError</td></tr>
                    <tr><td>JS Errors</td><td>Code bugs</td><td>Global ErrorHandler</td></tr>
                    <tr><td>Async Errors</td><td>Promises/Observables</td><td>catchError, try/catch</td></tr>
                    <tr><td>Validation Errors</td><td>Forms</td><td>Form validators</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #ef4444); }

        .intro-card { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 2rem; border-radius: 12px; }

        section { margin-bottom: 2.5rem; }

        .layers-visual { display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
        .layer { background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; text-align: center; min-width: 160px; position: relative; }
        .layer .num { position: absolute; top: -10px; left: -10px; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
        .layer.l1 .num { background: #22c55e; }
        .layer.l2 .num { background: #f59e0b; }
        .layer.l3 .num { background: #ef4444; }
        .layer h4 { margin: 0 0 0.25rem; color: #ef4444; }
        .layer p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }

        .usecase-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .usecase-card { display: block; background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s; position: relative; border: 2px solid transparent; }
        .usecase-card:hover { border-color: #ef4444; transform: translateY(-2px); }
        .usecase-card .num { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #ef4444; color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .usecase-card h3 { margin: 0 0 0.5rem; color: #ef4444; }
        .usecase-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }
        .tag { background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class ErrorHandlingOverviewComponent { }
