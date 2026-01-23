/**
 * ============================================================================
 * REAL-WORLD PATTERNS
 * ============================================================================
 */

import { Component, signal, computed, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { of, delay, switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs';

@Component({
    selector: 'app-real-world-patterns',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🌍 Real-world Patterns</h1>
                <p class="subtitle">Production-ready interop examples</p>
            </header>

            <!-- PATTERN 1: HTTP LOADING STATE -->
            <section class="pattern-section">
                <h2>1️⃣ HTTP with Loading State</h2>
                <pre class="code"><code>// Service or component
private http = inject(HttpClient);

users$ = this.http.get&lt;User[]&gt;('/api/users').pipe(
  catchError(() => of([]))
);

users = toSignal(this.users$, {{ '{' }} initialValue: [] {{ '}' }});
loading = signal(true);

constructor() {{ '{' }}
  effect(() => {{ '{' }}
    if (this.users().length) this.loading.set(false);
  {{ '}' }});
{{ '}' }}</code></pre>
            </section>

            <!-- PATTERN 2: SEARCH WITH DEBOUNCE -->
            <section class="pattern-section">
                <h2>2️⃣ Search with Debounce</h2>
                <pre class="code"><code>searchQuery = signal('');
searchQuery$ = toObservable(this.searchQuery);

results = toSignal(
  this.searchQuery$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => 
      query.length > 2 
        ? this.api.search(query) 
        : of([])
    )
  ),
  {{ '{' }} initialValue: [] {{ '}' }}
);</code></pre>
            </section>

            <!-- PATTERN 3: FORM VALIDATION -->
            <section class="pattern-section">
                <h2>3️⃣ Form with Computed Validation</h2>
                <pre class="code"><code>form = {{ '{' }}
  email: signal(''),
  password: signal('')
{{ '}' }};

isValidEmail = computed(() => 
  /^[^&#64;]+&#64;[^&#64;]+$/.test(this.form.email())
);

isValidPassword = computed(() => 
  this.form.password().length >= 8
);

isFormValid = computed(() => 
  this.isValidEmail() && this.isValidPassword()
);</code></pre>
            </section>

            <!-- PATTERN 4: STORE PATTERN -->
            <section class="pattern-section">
                <h2>4️⃣ Simple State Store</h2>
                <pre class="code"><code>// store.service.ts
&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class UserStore {{ '{' }}
  private _users = signal&lt;User[]&gt;([]);
  private _loading = signal(false);
  
  // Public readonly signals
  users = this._users.asReadonly();
  loading = this._loading.asReadonly();
  
  // Derived
  userCount = computed(() => this._users().length);
  
  // Actions
  load() {{ '{' }}
    this._loading.set(true);
    this.http.get&lt;User[]&gt;('/api/users').subscribe(users => {{ '{' }}
      this._users.set(users);
      this._loading.set(false);
    {{ '}' }});
  {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <!-- PATTERN 5: CACHING -->
            <section class="pattern-section">
                <h2>5️⃣ Cached API Calls</h2>
                <pre class="code"><code>private cache = new Map&lt;string, Signal&lt;Data[]&gt;&gt;();

getData(key: string): Signal&lt;Data[]&gt; {{ '{' }}
  if (!this.cache.has(key)) {{ '{' }}
    const data = toSignal(
      this.http.get&lt;Data[]&gt;(\`/api/data/\${{ '{' }}key{{ '}' }}\`),
      {{ '{' }} initialValue: [] {{ '}' }}
    );
    this.cache.set(key, data);
  {{ '}' }}
  return this.cache.get(key)!;
{{ '}' }}</code></pre>
            </section>

            <section class="summary-section">
                <h2>📋 Pattern Summary</h2>
                <table>
                    <tr><th>Pattern</th><th>Key Technique</th></tr>
                    <tr><td>HTTP + Loading</td><td>toSignal + effect for loading state</td></tr>
                    <tr><td>Debounced Search</td><td>toObservable → RxJS → toSignal</td></tr>
                    <tr><td>Form Validation</td><td>computed() for derived validation</td></tr>
                    <tr><td>State Store</td><td>Signals as store, computed for derived</td></tr>
                    <tr><td>Caching</td><td>toSignal in Map for memoization</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .pattern-section { margin-bottom: 2rem; }
        .pattern-section h2 { margin-bottom: 1rem; font-size: 1.1rem; }
        
        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.25rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        .summary-section table { width: 100%; border-collapse: collapse; }
        .summary-section th, .summary-section td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .summary-section th { background: var(--bg-secondary); }
    `]
})
export class RealWorldPatternsComponent { }
