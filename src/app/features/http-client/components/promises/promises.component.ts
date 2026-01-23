/**
 * ============================================================================
 * PROMISE-BASED REQUESTS
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * How to use async/await syntax with Angular's HttpClient by converting
 * Observables to Promises.
 * 
 * 💡 KEY CONCEPTS:
 * 
 * 1. OBSERVABLE VS PROMISE:
 *    
 *    Observable:
 *    - Can emit multiple values over time
 *    - Lazy (nothing happens until you subscribe)
 *    - Can be cancelled (unsubscribe)
 *    - Has powerful operators (map, filter, switchMap)
 *    
 *    Promise:
 *    - Emits single value (resolves once)
 *    - Eager (starts immediately when created)
 *    - Cannot be cancelled
 *    - Simpler async/await syntax
 * 
 * 2. WHEN TO USE PROMISES:
 *    ✅ Simple one-time requests (fetch user, submit form)
 *    ✅ When you need sequential async flow
 *    ✅ When working with Promise-based libraries
 *    ✅ When async/await improves readability
 *    
 *    ❌ Avoid for:
 *    - Streams (WebSocket, polling)
 *    - Type-ahead search (need cancellation)
 *    - Complex transformations (use RxJS operators)
 * 
 * 3. CONVERSION METHODS:
 *    
 *    lastValueFrom() - Recommended for HTTP (single emission)
 *    - Waits for Observable to complete
 *    - Resolves with the LAST emitted value
 *    - Rejects if Observable errors
 *    
 *    firstValueFrom() - For streams that emit multiple times
 *    - Resolves with the FIRST emitted value
 *    - Unsubscribes after first emission
 *    
 * ⚠️ DEPRECATED:
 * .toPromise() is deprecated! Use lastValueFrom() instead.
 * 
 *   ❌ const data = await this.http.get(url).toPromise();
 *   ✅ const data = await lastValueFrom(this.http.get(url));
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, User } from '../../services/api.service';
import { lastValueFrom, firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-promises',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>🤝 Promise-based Requests</h1>
            <p class="description">
                Convert Observables to Promises for async/await syntax.
            </p>

            <div class="demo-grid">
                <!-- lastValueFrom -->
                <section class="demo-section">
                    <h3>📥 lastValueFrom (Recommended)</h3>
                    <button (click)="fetchWithLastValue()" [disabled]="loading1">
                        {{ loading1 ? 'Loading...' : 'Fetch Users' }}
                    </button>
                    @if (users1.length) {
                        <div class="result">
                            Fetched {{ users1.length }} users
                        </div>
                    }
                    <div class="code-hint">
                        <pre>
const users = await lastValueFrom(
    this.apiService.getUsers()
);
                        </pre>
                    </div>
                </section>

                <!-- async/await pattern -->
                <section class="demo-section">
                    <h3>⚡ Async/Await Pattern</h3>
                    <button (click)="fetchWithAsyncAwait()" [disabled]="loading2">
                        {{ loading2 ? 'Loading...' : 'Load with try/catch' }}
                    </button>
                    @if (result2) {
                        <div class="result" [class.error]="result2.includes('Error')">
                            {{ result2 }}
                        </div>
                    }
                    <div class="code-hint">
                        <pre>
async loadData() {{ '{' }}
    try {{ '{' }}
        this.data = await lastValueFrom(
            this.apiService.getData()
        );
    {{ '}' }} catch (err) {{ '{' }}
        console.error(err);
    {{ '}' }}
{{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- Sequential requests -->
                <section class="demo-section">
                    <h3>🔗 Sequential Requests</h3>
                    <button (click)="fetchSequential()" [disabled]="loading3">
                        {{ loading3 ? 'Loading...' : 'Fetch User then Products' }}
                    </button>
                    @if (sequentialResult) {
                        <div class="result">{{ sequentialResult }}</div>
                    }
                    <div class="code-hint">
                        <pre>
async loadSequential() {{ '{' }}
    const user = await lastValueFrom(getUser(1));
    const products = await lastValueFrom(getProducts());
    // user is available for products request!
{{ '}' }}
                        </pre>
                    </div>
                </section>

                <!-- firstValueFrom -->
                <section class="demo-section">
                    <h3>1️⃣ firstValueFrom</h3>
                    <p>For streams that emit multiple values, takes only the first.</p>
                    <button (click)="fetchWithFirstValue()" [disabled]="loading4">
                        {{ loading4 ? 'Loading...' : 'Get First Value' }}
                    </button>
                    @if (result4) {
                        <div class="result">{{ result4 }}</div>
                    }
                </section>
            </div>

            <div class="comparison">
                <h3>📊 Observable vs Promise</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Observable</th>
                            <th>Promise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Multiple values</td>
                            <td>✅ Yes</td>
                            <td>❌ No</td>
                        </tr>
                        <tr>
                            <td>Cancellable</td>
                            <td>✅ Yes</td>
                            <td>❌ No</td>
                        </tr>
                        <tr>
                            <td>Operators</td>
                            <td>✅ Rich (RxJS)</td>
                            <td>⚠️ Limited</td>
                        </tr>
                        <tr>
                            <td>Syntax</td>
                            <td>subscribe callback</td>
                            <td>async/await</td>
                        </tr>
                        <tr>
                            <td>Best for</td>
                            <td>Streams, events</td>
                            <td>One-time requests</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section h3 { margin-top: 0; }
        .demo-section button { background: #667eea; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; }

        .result { background: #dcfce7; color: #166534; padding: 1rem; border-radius: 6px; margin-top: 1rem; }
        .result.error { background: #fee2e2; color: #b91c1c; }

        .code-hint { margin-top: 1rem; background: #1a1a2e; padding: 1rem; border-radius: 8px; }
        .code-hint pre { color: #4ade80; margin: 0; font-size: 0.8rem; }

        .comparison { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .comparison h3 { margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f8f9fa; }
    `]
})
export class PromisesComponent {
    private apiService = inject(ApiService);

    loading1 = false;
    loading2 = false;
    loading3 = false;
    loading4 = false;

    users1: User[] = [];
    result2 = '';
    sequentialResult = '';
    result4 = '';

    /**
     * lastValueFrom - Converts Observable to Promise
     * Returns the LAST value before completion.
     */
    async fetchWithLastValue(): Promise<void> {
        this.loading1 = true;
        try {
            // 🛡️ CRITICAL: Use lastValueFrom (toPromise is deprecated)
            this.users1 = await lastValueFrom(this.apiService.getUsers());
            console.log('✅ Users loaded:', this.users1);
        } catch (err) {
            console.error('❌ Error:', err);
        } finally {
            this.loading1 = false;
        }
    }

    /**
     * Async/Await with try/catch error handling
     */
    async fetchWithAsyncAwait(): Promise<void> {
        this.loading2 = true;
        this.result2 = '';

        try {
            const users = await lastValueFrom(this.apiService.getUsers());
            this.result2 = `✅ Loaded ${users.length} users successfully!`;
        } catch (err: any) {
            this.result2 = `❌ Error: ${err.message}`;
        } finally {
            this.loading2 = false;
        }
    }

    /**
     * Sequential requests - await one after another
     * Use when second request depends on first.
     */
    async fetchSequential(): Promise<void> {
        this.loading3 = true;
        this.sequentialResult = '';

        try {
            // First request
            const users = await lastValueFrom(this.apiService.getUsers());

            // Second request (could use user data)
            const products = await lastValueFrom(this.apiService.getProducts());

            this.sequentialResult = `Got ${users.length} users, then ${products.length} products`;
        } catch (err) {
            console.error(err);
        } finally {
            this.loading3 = false;
        }
    }

    /**
     * firstValueFrom - Takes first emission only
     * Useful for hot observables or when only first value matters.
     */
    async fetchWithFirstValue(): Promise<void> {
        this.loading4 = true;
        try {
            const users = await firstValueFrom(this.apiService.getUsers());
            this.result4 = `First value: ${users[0]?.name}`;
        } finally {
            this.loading4 = false;
        }
    }
}
