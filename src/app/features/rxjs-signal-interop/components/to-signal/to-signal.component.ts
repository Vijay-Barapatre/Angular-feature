/**
 * ============================================================================
 * toSignal() - OBSERVABLE TO SIGNAL
 * ============================================================================
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-to-signal',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📡 toSignal()</h1>
                <p class="subtitle">Observable → Signal</p>
            </header>

            <section class="concept-section">
                <h2>What is toSignal()?</h2>
                <p>
                    Converts an Observable into a Signal. The signal automatically updates 
                    when the Observable emits. <strong>No async pipe needed!</strong>
                </p>
            </section>

            <section class="demo-section">
                <h2>Live Demos</h2>
                
                <div class="demo-card">
                    <h3>1. Interval Timer</h3>
                    <p class="value">Seconds: {{ seconds() }}</p>
                    <code>seconds = toSignal(interval(1000));</code>
                </div>

                <div class="demo-card">
                    <h3>2. With Initial Value</h3>
                    <p class="value">Data: {{ dataWithDefault() }}</p>
                    <code>toSignal(data$, {{ '{' }} initialValue: 'Loading...' {{ '}' }});</code>
                </div>
            </section>

            <section class="syntax-section">
                <h2>📝 Syntax Options</h2>
                <div class="syntax-grid">
                    <div class="syntax-card">
                        <h4>Basic Usage</h4>
                        <pre><code>const data = toSignal(observable$);
// Type: Signal&lt;T | undefined&gt;</code></pre>
                    </div>
                    <div class="syntax-card">
                        <h4>With Initial Value</h4>
                        <pre><code>const data = toSignal(observable$, {{ '{' }}
  initialValue: defaultValue
{{ '}' }});
// Type: Signal&lt;T&gt;</code></pre>
                    </div>
                    <div class="syntax-card">
                        <h4>Require Sync (BehaviorSubject)</h4>
                        <pre><code>const data = toSignal(behaviorSubject$, {{ '{' }}
  requireSync: true
{{ '}' }});
// Type: Signal&lt;T&gt; - no undefined!</code></pre>
                    </div>
                    <div class="syntax-card">
                        <h4>Manual Cleanup</h4>
                        <pre><code>const data = toSignal(observable$, {{ '{' }}
  manualCleanup: true
{{ '}' }});
// You handle unsubscription</code></pre>
                    </div>
                </div>
            </section>

            <section class="http-section">
                <h2>🌐 Common: HTTP with toSignal</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}...{{ '}' }})
export class UserComponent {{ '{' }}
  private http = inject(HttpClient);
  
  // Simple! No async pipe, no subscribe
  users = toSignal(
    this.http.get&lt;User[]&gt;('/api/users'),
    {{ '{' }} initialValue: [] {{ '}' }}
  );
{{ '}' }}

// Template - just use like a signal!
&#64;for (user of users(); track user.id) {{ '{' }}
  &lt;div&gt;{{ '{{ user.name }}' }}&lt;/div&gt;
{{ '}' }}</code></pre>
            </section>

            <section class="important-section">
                <h2>⚠️ Important Notes</h2>
                <ul>
                    <li>toSignal subscribes <strong>immediately</strong> when called</li>
                    <li>Must be called in <strong>injection context</strong> (constructor, field initializer)</li>
                    <li>Auto-unsubscribes when component destroys</li>
                    <li>Use <code>initialValue</code> to avoid undefined checks</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-section { margin: 2rem 0; }
        .demo-card { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; margin: 1rem 0; }
        .demo-card h3 { margin: 0 0 0.5rem; }
        .demo-card .value { font-size: 1.5rem; font-weight: bold; color: var(--primary-color); margin: 0.5rem 0; }
        .demo-card code { display: block; background: #1e1e2e; color: #a6e3a1; padding: 0.5rem; border-radius: 4px; font-size: 0.8rem; }

        .syntax-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .syntax-card { background: #1e1e2e; border-radius: 10px; overflow: hidden; }
        .syntax-card h4 { margin: 0; padding: 0.75rem; background: #2d2d3f; color: white; font-size: 0.85rem; }
        .syntax-card pre { margin: 0; padding: 1rem; color: #a6e3a1; font-size: 0.75rem; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; }

        .important-section { background: linear-gradient(135deg, #f59e0b20, #eab30820); padding: 2rem; border-radius: 12px; }
        .important-section ul { padding-left: 1.5rem; }
        .important-section li { margin-bottom: 0.5rem; }
        .important-section code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }
    `]
})
export class ToSignalComponent {
    private http = inject(HttpClient);

    // Basic interval - auto-updates every second
    seconds = toSignal(interval(1000), { initialValue: 0 });

    // With initial value
    dataWithDefault = toSignal(
        of('Hello from Observable!'),
        { initialValue: 'Loading...' }
    );
}
