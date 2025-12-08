/**
 * ============================================================================
 * USE CASE 4: RETRY & RECOVERY PATTERNS
 * ============================================================================
 */

import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, retryWhen, delay, take, catchError, timeout } from 'rxjs/operators';

@Component({
    selector: 'app-retry-recovery',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 Retry & Recovery</h1>
                <p class="subtitle">RxJS Patterns for Error Recovery</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    RxJS provides operators for handling transient failures gracefully.
                    Retry, fallback values, and timeout handling improve resilience.
                </p>
            </section>

            <section class="retry-section">
                <h2>💻 Basic Retry</h2>
                <pre class="code"><code>// Retry up to 3 times before failing
this.http.get('/api/data').pipe(
    retry(3)
).subscribe({{ '{' }}
    next: data => console.log('Success:', data),
    error: err => console.error('Failed after 3 retries:', err)
{{ '}' }});</code></pre>
            </section>

            <section class="delay-section">
                <h2>💻 Retry with Delay</h2>
                <pre class="code"><code>import {{ '{' }} retry, timer {{ '}' }} from 'rxjs';

// Retry 3 times with 1 second delay between attempts
this.http.get('/api/data').pipe(
    retry({{ '{' }}
        count: 3,
        delay: (error, retryCount) => {{ '{' }}
            console.log('Retry attempt: ' + retryCount);
            return timer(1000 * retryCount); // Exponential backoff
        {{ '}' }}
    {{ '}' }})
).subscribe();</code></pre>
            </section>

            <section class="catcherror-section">
                <h2>💻 catchError with Fallback</h2>
                <pre class="code"><code>import {{ '{' }} catchError, of {{ '}' }} from 'rxjs';

// Return fallback value on error
this.http.get&lt;User[]&gt;('/api/users').pipe(
    catchError(error => {{ '{' }}
        console.error('API failed, using cached data');
        return of(this.cachedUsers); // Return fallback
    {{ '}' }})
).subscribe(users => {{ '{' }}
    // Works with either API or cached data
{{ '}' }});</code></pre>
            </section>

            <section class="timeout-section">
                <h2>💻 Timeout Handling</h2>
                <pre class="code"><code>import {{ '{' }} timeout, catchError {{ '}' }} from 'rxjs';

// Timeout after 5 seconds
this.http.get('/api/slow-endpoint').pipe(
    timeout(5000),
    catchError(error => {{ '{' }}
        if (error.name === 'TimeoutError') {{ '{' }}
            console.error('Request timed out!');
            return of({{ '{' }} error: 'timeout' {{ '}' }});
        {{ '}' }}
        return throwError(() => error);
    {{ '}' }})
).subscribe();</code></pre>
            </section>

            <section class="service-section">
                <h2>💻 Resilient Service Pattern</h2>
                <pre class="code"><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class ResilientApiService {{ '{' }}
    private http = inject(HttpClient);
    private cache = new Map&lt;string, any&gt;();
    
    getData(id: string): Observable&lt;Data&gt; {{ '{' }}
        return this.http.get&lt;Data&gt;('/api/data/' + id).pipe(
            // Timeout after 5s
            timeout(5000),
            
            // Retry with exponential backoff
            retry({{ '{' }}
                count: 3,
                delay: (_, i) => timer(1000 * Math.pow(2, i))
            {{ '}' }}),
            
            // Cache successful response
            tap(data => this.cache.set(id, data)),
            
            // Fallback to cache on any error
            catchError(() => {{ '{' }}
                const cached = this.cache.get(id);
                if (cached) return of(cached);
                return throwError(() => new Error('No data available'));
            {{ '}' }})
        );
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="patterns-table">
                <h2>📋 Pattern Summary</h2>
                <table>
                    <tr><th>Operator</th><th>Use Case</th><th>When?</th></tr>
                    <tr><td>retry(n)</td><td>Retry n times</td><td>Transient failures</td></tr>
                    <tr><td>retry(&#123;delay&#125;)</td><td>Retry with delay</td><td>Rate limiting, backoff</td></tr>
                    <tr><td>catchError</td><td>Handle & recover</td><td>Fallback, transform</td></tr>
                    <tr><td>timeout</td><td>Cancel slow requests</td><td>Deadline enforcement</td></tr>
                    <tr><td>finalize</td><td>Cleanup</td><td>Loading states</td></tr>
                </table>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Use exponential backoff to avoid hammering servers</li>
                    <li>Always have a fallback for critical data</li>
                    <li>Set reasonable timeouts for UX</li>
                    <li>Combine patterns for resilient APIs</li>
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

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #ef4444; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class RetryRecoveryComponent { }
