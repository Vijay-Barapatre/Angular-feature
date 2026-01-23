/**
 * ============================================================================
 * 🛠️ NgRx DevTools - Educational Component
 * ============================================================================
 * 
 * Redux DevTools is a browser extension that provides powerful debugging
 * capabilities for NgRx applications.
 * 
 * ============================================================================
 * 📚 WHAT DEVTOOLS PROVIDE
 * ============================================================================
 * 
 * 1. ACTION LOG - See every action dispatched with timestamp
 * 2. STATE INSPECTION - View current state tree
 * 3. TIME TRAVEL - Jump to any previous state
 * 4. ACTION REPLAY - Replay actions from beginning
 * 5. STATE EXPORT/IMPORT - Save and load state for debugging
 * 6. ACTION SKIP - Skip actions to see what-if scenarios
 * 
 * ============================================================================
 * 🎯 SETUP
 * ============================================================================
 * 
 * // main.ts
 * import { provideStoreDevtools } from '@ngrx/store-devtools';
 * 
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideStore(reducers),
 *     provideStoreDevtools({
 *       maxAge: 25,           // Retain last 25 states
 *       logOnly: !isDevMode() // Restrict in production
 *     })
 *   ]
 * });
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as DevToolsActions from './store/devtools.actions';
import * as DevToolsSelectors from './store/devtools.selectors';

@Component({
    selector: 'app-devtools-demo',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/ngrx" class="back-link">← Back to NgRx Overview</a>
                <h1>🛠️ DevTools Integration</h1>
                <p>Time-Travel Debugging with Redux DevTools</p>
            </header>

            <div class="content-grid">
                <!-- SETUP INSTRUCTIONS -->
                <section class="card setup-card">
                    <h2>📦 Installation & Setup</h2>
                    <div class="steps">
                        <div class="step">
                            <span class="step-num">1</span>
                            <div class="step-content">
                                <strong>Install Browser Extension</strong>
                                <p>Install "Redux DevTools" from Chrome/Firefox store</p>
                            </div>
                        </div>
                        <div class="step">
                            <span class="step-num">2</span>
                            <div class="step-content">
                                <strong>Install NgRx Package</strong>
                                <code>npm install &#64;ngrx/store-devtools</code>
                            </div>
                        </div>
                        <div class="step">
                            <span class="step-num">3</span>
                            <div class="step-content">
                                <strong>Configure in main.ts</strong>
                                <div class="code-block">
                                    <pre>provideStoreDevtools(&#123;
  maxAge: 25,
  logOnly: !isDevMode()
&#125;)</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- FEATURES -->
                <section class="card features-card">
                    <h2>✨ DevTools Features</h2>
                    <div class="features-grid">
                        <div class="feature">
                            <span class="icon">📋</span>
                            <strong>Action Log</strong>
                            <p>See every dispatched action</p>
                        </div>
                        <div class="feature">
                            <span class="icon">🌳</span>
                            <strong>State Tree</strong>
                            <p>Explore full state structure</p>
                        </div>
                        <div class="feature">
                            <span class="icon">⏰</span>
                            <strong>Time Travel</strong>
                            <p>Jump to any past state</p>
                        </div>
                        <div class="feature">
                            <span class="icon">📊</span>
                            <strong>State Diff</strong>
                            <p>See what changed per action</p>
                        </div>
                        <div class="feature">
                            <span class="icon">💾</span>
                            <strong>Export/Import</strong>
                            <p>Save state for bug reports</p>
                        </div>
                        <div class="feature">
                            <span class="icon">⏭️</span>
                            <strong>Skip Actions</strong>
                            <p>What-if analysis</p>
                        </div>
                    </div>
                </section>

                <!-- DEMO AREA -->
                <section class="card demo-card">
                    <h2>🎮 Interactive Demo</h2>
                    <p class="description">
                        Click buttons below and watch the <strong>Redux DevTools panel</strong> (F12 → Redux tab)
                    </p>
                    <div class="demo-state">
                        <span class="label">Count:</span>
                        <span class="value">{{ count$ | async }}</span>
                    </div>
                    <div class="button-row">
                        <button (click)="increment()" class="btn">Increment</button>
                        <button (click)="decrement()" class="btn">Decrement</button>
                        <button (click)="reset()" class="btn danger">Reset</button>
                        <button (click)="addRandom()" class="btn primary">Add Random</button>
                    </div>
                    <div class="instructions">
                        <h3>📍 How to Use DevTools:</h3>
                        <ol>
                            <li>Open browser DevTools (F12)</li>
                            <li>Click "Redux" tab (install extension if not visible)</li>
                            <li>Click buttons above and watch actions appear</li>
                            <li>Click any action to see state before/after</li>
                            <li>Use slider to time-travel through states!</li>
                        </ol>
                    </div>
                </section>

                <!-- BEST PRACTICES -->
                <section class="card practices-card">
                    <h2>⚠️ Production Considerations</h2>
                    <div class="practices-list">
                        <div class="practice good">
                            <span class="icon">✅</span>
                            <div>
                                <strong>Use logOnly in Production</strong>
                                <p>logOnly: !isDevMode() prevents state modification in prod</p>
                            </div>
                        </div>
                        <div class="practice good">
                            <span class="icon">✅</span>
                            <div>
                                <strong>Limit maxAge</strong>
                                <p>Too many stored states = memory issues</p>
                            </div>
                        </div>
                        <div class="practice warning">
                            <span class="icon">⚠️</span>
                            <div>
                                <strong>Sanitize Sensitive Data</strong>
                                <p>Use actionSanitizer/stateSanitizer to hide passwords, tokens</p>
                            </div>
                        </div>
                        <div class="practice bad">
                            <span class="icon">❌</span>
                            <div>
                                <strong>Don't enable full DevTools in Prod</strong>
                                <p>Users could see and modify your state!</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
        h1 { color: #f8fafc; margin: 0.5rem 0; }
        p { color: #94a3b8; }

        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        .card {
            background: #1e293b;
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(148, 163, 184, 0.1);
        }
        .card h2 { color: #f8fafc; margin: 0 0 1rem 0; font-size: 1.1rem; }

        .setup-card { grid-column: 1 / -1; }
        .steps { display: flex; gap: 2rem; }
        .step { display: flex; gap: 1rem; flex: 1; }
        .step-num { width: 32px; height: 32px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
        .step-content strong { display: block; color: #f8fafc; margin-bottom: 0.5rem; }
        .step-content p, .step-content code { color: #94a3b8; font-size: 0.9rem; }
        .step-content code { background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; }
        .code-block { background: #0f172a; padding: 0.75rem; border-radius: 6px; margin-top: 0.5rem; }
        .code-block pre { margin: 0; font-size: 0.8rem; color: #10b981; }

        .features-card { grid-column: 1 / -1; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .feature { background: #0f172a; padding: 1rem; border-radius: 8px; transition: transform 0.2s; }
        .feature:hover { transform: translateY(-2px); background: #1a2744; }
        .feature .icon { font-size: 1.5rem; }
        .feature strong { display: block; color: #f8fafc; margin: 0.5rem 0 0.25rem; }
        .feature p { color: #64748b; font-size: 0.85rem; margin: 0; }

        .demo-card { grid-column: 1 / -1; }
        .description { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
        .demo-state { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #0f172a; border-radius: 8px; margin-bottom: 1rem; }
        .demo-state .label { color: #94a3b8; }
        .demo-state .value { font-size: 2rem; font-weight: bold; color: #3b82f6; }
        .button-row { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .btn { padding: 0.5rem 1rem; border-radius: 6px; border: none; background: #334155; color: white; cursor: pointer; }
        .btn.primary { background: #3b82f6; }
        .btn.danger { background: #ef4444; }

        .instructions { background: #0f172a; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .instructions h3 { color: #f8fafc; margin: 0 0 1rem 0; font-size: 1rem; }
        .instructions ol { color: #94a3b8; margin: 0; padding-left: 1.5rem; }
        .instructions li { padding: 0.25rem 0; }

        .practices-card { grid-column: 1 / -1; }
        .practices-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .practice { display: flex; gap: 1rem; padding: 1rem; background: #0f172a; border-radius: 8px; }
        .practice .icon { font-size: 1.5rem; }
        .practice strong { display: block; color: #f8fafc; }
        .practice p { color: #64748b; font-size: 0.85rem; margin: 0; }
        .practice.warning { border-left: 3px solid #f59e0b; }
        .practice.bad { border-left: 3px solid #ef4444; }
        .practice.good { border-left: 3px solid #10b981; }
    `]
})
export class DevToolsDemoComponent {
    private store = inject(Store);

    // Observable from NgRx store
    count$ = this.store.select(DevToolsSelectors.selectCount);

    increment() {
        this.store.dispatch(DevToolsActions.increment());
    }

    decrement() {
        this.store.dispatch(DevToolsActions.decrement());
    }

    reset() {
        this.store.dispatch(DevToolsActions.reset());
    }

    addRandom() {
        const value = Math.floor(Math.random() * 100);
        this.store.dispatch(DevToolsActions.setRandom({ value }));
    }
}
