/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: ASYNC TESTING
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-3-async',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Async Testing</h2>
                <p>Handle promises, observables, and timers in tests.</p>
            </div>

            <div class="content">
                <div class="code-block">
                    <h4>fakeAsync & tick</h4>
                    <pre><code>it('should handle timer', fakeAsync(() => {{ '{' }}
  let value = false;
  setTimeout(() => {{ '{' }} value = true; {{ '}' }}, 1000);
  
  expect(value).toBeFalse(); // Still false
  tick(1000);                // Advance time
  expect(value).toBeTrue();  // Now true
{{ '}' }}));</code></pre>
                </div>

                <div class="code-block">
                    <h4>waitForAsync</h4>
                    <pre><code>it('should handle promise', waitForAsync(() => {{ '{' }}
  let result = '';
  
  fetchData().then(data => {{ '{' }}
    result = data;
  {{ '}' }});
  
  // waitForAsync waits for all async to complete
  fixture.whenStable().then(() => {{ '{' }}
    expect(result).toBe('data');
  {{ '}' }});
{{ '}' }}));</code></pre>
                </div>

                <div class="code-block">
                    <h4>Testing Observables</h4>
                    <pre><code>it('should test observable', (done) => {{ '{' }}
  service.getData().subscribe(data => {{ '{' }}
    expect(data.length).toBe(3);
    done(); // Signal test complete
  {{ '}' }});
{{ '}' }});

// Or with fakeAsync
it('should test observable with fakeAsync', fakeAsync(() => {{ '{' }}
  let result: any;
  service.getData().subscribe(d => result = d);
  tick(); // Flush observables
  expect(result).toBeDefined();
{{ '}' }}));</code></pre>
                </div>

                <h3>🎮 Async Demo</h3>
                <div class="async-demo">
                    <button (click)="startAsyncOp()" [disabled]="loading()">
                        {{ loading() ? 'Loading...' : 'Start Async Operation' }}
                    </button>
                    
                    @if (loading()) {
                        <div class="progress">
                            <div class="progress-bar" [style.width.%]="progress()"></div>
                        </div>
                        <p class="status">{{ status() }}</p>
                    }

                    @if (result()) {
                        <div class="result-box">
                            ✅ {{ result() }}
                        </div>
                    }
                </div>

                <div class="tips">
                    <h4>💡 Async Testing Tips</h4>
                    <ul>
                        <li><code>fakeAsync</code> - Synchronous control over async code</li>
                        <li><code>tick(ms)</code> - Advance virtual time</li>
                        <li><code>flush()</code> - Complete all pending async tasks</li>
                        <li><code>waitForAsync</code> - Wait for real async operations</li>
                        <li><code>done()</code> - Jasmine callback for async tests</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #14b8a6; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .code-block { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; }
        .code-block h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-block pre { margin: 0; }
        .code-block code { color: #a6e3a1; font-size: 0.8rem; }
        .async-demo { padding: 1.5rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; text-align: center; }
        .async-demo button { padding: 0.75rem 1.5rem; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .async-demo button:disabled { opacity: 0.7; }
        .progress { height: 8px; background: #e5e7eb; border-radius: 4px; margin: 1rem 0; overflow: hidden; }
        .progress-bar { height: 100%; background: #14b8a6; transition: width 0.3s; }
        .status { color: #6b7280; font-size: 0.9rem; }
        .result-box { padding: 1rem; background: #f0fdf4; border-radius: 8px; color: #10b981; font-weight: bold; margin-top: 1rem; }
        .tips { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .tips h4 { color: white; margin: 0 0 0.5rem; }
        .tips ul { margin: 0; padding-left: 1.25rem; color: #a6e3a1; }
        .tips code { color: #fbbf24; }
    `]
})
export class Scenario3AsyncComponent {
    loading = signal(false);
    progress = signal(0);
    status = signal('');
    result = signal('');

    startAsyncOp(): void {
        this.loading.set(true);
        this.progress.set(0);
        this.result.set('');
        this.status.set('Starting...');

        const steps = ['Fetching data...', 'Processing...', 'Finalizing...'];
        let step = 0;

        const interval = setInterval(() => {
            this.progress.update(p => p + 33);
            this.status.set(steps[step]);
            step++;

            if (step >= steps.length) {
                clearInterval(interval);
                setTimeout(() => {
                    this.loading.set(false);
                    this.result.set('Async operation completed successfully!');
                }, 300);
            }
        }, 500);
    }
}
