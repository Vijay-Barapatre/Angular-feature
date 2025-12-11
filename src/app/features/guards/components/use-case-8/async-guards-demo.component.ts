/**
 * ============================================================================
 * USE CASE 8: ASYNC GUARDS - DEMO COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { asyncGuardState } from './async.guards';

@Component({
    selector: 'app-async-guards-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <a routerLink="/guards" class="back-link">← Back to Guards</a>
                <h1>⏳ Use Case 8: Async Guards</h1>
                <p class="subtitle">Guards that make API calls and return Observables</p>
            </header>

            <section class="concept-section">
                <h2>💡 What are Async Guards?</h2>
                <p>
                    Guards can return <code>Observable&lt;boolean&gt;</code> or <code>Promise&lt;boolean&gt;</code>
                    instead of just a boolean. This allows guards to:
                </p>
                <ul>
                    <li>🔌 Call APIs to check permissions</li>
                    <li>🔐 Validate tokens with the server</li>
                    <li>📦 Check if resources exist</li>
                    <li>⏳ Wait for async operations</li>
                </ul>
            </section>

            <section class="demo-section">
                <h2>🎮 Simulate Server Conditions</h2>
                <div class="toggle-grid">
                    <div class="toggle-item">
                        <span>🌐 Server Available:</span>
                        <button (click)="toggleServer()" [class.active]="state.serverAvailable">
                            {{ state.serverAvailable ? '🟢 Online' : '🔴 Offline' }}
                        </button>
                    </div>
                    <div class="toggle-item">
                        <span>✅ Has Permission:</span>
                        <button (click)="togglePermission()" [class.active]="state.hasPermission">
                            {{ state.hasPermission ? '✅ Yes' : '❌ No' }}
                        </button>
                    </div>
                    <div class="toggle-item">
                        <span>⏱️ Delay (ms):</span>
                        <input type="number" [(ngModel)]="state.responseDelay" min="0" max="5000" step="100">
                    </div>
                </div>

                <div class="test-panel">
                    <button (click)="testAsyncGuard()" class="test-btn" [disabled]="isLoading">
                        {{ isLoading ? '⏳ Checking...' : '🚀 Test Async Permission Check' }}
                    </button>
                </div>

                @if (isLoading) {
                    <div class="loading-panel">
                        <div class="spinner"></div>
                        <p>Calling server... ({{ state.responseDelay }}ms delay)</p>
                    </div>
                }

                @if (testResult && !isLoading) {
                    <div class="result-panel" [class.success]="testResult.success">
                        <h4>{{ testResult.success ? '✅ Access Granted!' : '❌ Access Denied' }}</h4>
                        <p>{{ testResult.message }}</p>
                        <code>Response time: {{ testResult.time }}ms</code>
                    </div>
                }
            </section>

            <section class="code-section">
                <h2>📝 Implementation</h2>
                <pre><code>// async.guard.ts
export const asyncPermissionGuard: CanActivateFn = (
    route, state
): Observable&lt;boolean&gt; => {{ '{' }}
    const http = inject(HttpClient);
    const router = inject(Router);
    
    // Make API call to check permission
    return http.get&lt;{{ '{' }} allowed: boolean {{ '}' }}&gt;('/api/permissions/check').pipe(
        map(response => response.allowed),
        catchError(() => of(false))
    );
{{ '}' }};

// Using with route
{{ '{' }}
    path: 'protected-resource',
    canActivate: [asyncPermissionGuard],
    component: ProtectedComponent
{{ '}' }}</code></pre>
            </section>

            <section class="patterns-section">
                <h2>🔧 Common Patterns</h2>
                <div class="pattern-grid">
                    <div class="pattern-card">
                        <h4>Token Validation</h4>
                        <pre><code>return http.post('/api/validate-token', {{ '{' }} token {{ '}' }})
  .pipe(map(r => r.valid));</code></pre>
                    </div>
                    <div class="pattern-card">
                        <h4>Resource Exists</h4>
                        <pre><code>return http.head(\`/api/items/\${{ '{' }}id{{ '}' }}\`)
  .pipe(
    map(() => true),
    catchError(() => of(false))
  );</code></pre>
                    </div>
                    <div class="pattern-card">
                        <h4>With Timeout</h4>
                        <pre><code>return http.get('/api/check').pipe(
  timeout(5000),
  catchError(() => of(false))
);</code></pre>
                    </div>
                </div>
            </section>

            <section class="tips-section">
                <h2>⚠️ Performance Tips</h2>
                <ul>
                    <li><strong>Add timeout:</strong> Prevent hanging on slow servers</li>
                    <li><strong>Cache results:</strong> Don't repeat the same API call</li>
                    <li><strong>Handle errors:</strong> Always use catchError</li>
                    <li><strong>Show loading:</strong> Consider showing a loading state</li>
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

        .concept-section ul { padding-left: 1.5rem; }
        .concept-section li { margin: 0.5rem 0; color: var(--text-secondary, #cbd5e1); }

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
        .toggle-item button, .toggle-item input {
            padding: 0.5rem 1rem;
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 6px;
            background: var(--bg-secondary, #1e293b);
            color: var(--text-primary, #f1f5f9);
            cursor: pointer;
        }
        .toggle-item button:hover, .toggle-item input:hover { border-color: #667eea; }
        .toggle-item input { width: 100px; }
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
        .test-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .loading-panel {
            text-align: center;
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(102, 126, 234, 0.2);
            border-radius: 8px;
            color: var(--text-primary, #f1f5f9);
        }
        .spinner {
            width: 30px;
            height: 30px;
            border: 3px solid #667eea;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 0.5rem;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .result-panel {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }
        .result-panel.success { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .result-panel h4 { color: inherit; }
        .result-panel p { color: inherit; }
        .result-panel code { display: block; margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-muted, #94a3b8); }

        .code-section pre, .pattern-card pre {
            background: #0f172a;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.8rem;
            border-left: 4px solid #667eea;
        }

        .pattern-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .pattern-card {
            background: var(--bg-card, #334155);
            padding: 1rem;
            border-radius: 8px;
        }
        .pattern-card h4 { margin: 0 0 0.5rem 0; color: #667eea; }

        .tips-section ul { padding-left: 1.5rem; }
        .tips-section li { margin: 0.5rem 0; color: var(--text-secondary, #cbd5e1); }
    `]
})
export class AsyncGuardsDemoComponent {
    state = asyncGuardState;
    isLoading = false;
    testResult: { success: boolean; message: string; time: number } | null = null;

    toggleServer(): void {
        this.state.serverAvailable = !this.state.serverAvailable;
    }

    togglePermission(): void {
        this.state.hasPermission = !this.state.hasPermission;
    }

    testAsyncGuard(): void {
        this.isLoading = true;
        this.testResult = null;
        const startTime = Date.now();

        setTimeout(() => {
            this.isLoading = false;
            const time = Date.now() - startTime;

            if (!this.state.serverAvailable) {
                this.testResult = {
                    success: false,
                    message: 'Server is unavailable. Guard blocked navigation.',
                    time
                };
            } else if (!this.state.hasPermission) {
                this.testResult = {
                    success: false,
                    message: 'Server denied permission. Guard blocked navigation.',
                    time
                };
            } else {
                this.testResult = {
                    success: true,
                    message: 'Server granted permission. Navigation allowed!',
                    time
                };
            }
        }, this.state.responseDelay);
    }
}
