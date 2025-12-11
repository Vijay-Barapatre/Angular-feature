/**
 * ============================================================================
 * USE CASE 7: CACHING STRATEGIES
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * How to cache HTTP responses to avoid redundant API calls.
 * Critical for performance and reducing server load.
 * 
 * 💡 KEY CONCEPTS:
 * 
 * 1. WHY CACHE?
 *    - Performance: Instant data on repeat visits
 *    - Bandwidth: Fewer network requests
 *    - Server load: Less stress on backend
 *    - UX: No loading spinners for cached data
 * 
 * 2. shareReplay() OPERATOR:
 *    
 *    The magic RxJS operator for caching Observables.
 *    
 *    Without shareReplay:
 *    - Each subscription triggers a NEW HTTP request
 *    - Click 3 times = 3 API calls
 *    
 *    With shareReplay(1):
 *    - First subscription triggers HTTP request
 *    - Subsequent subscriptions get CACHED value
 *    - Click 3 times = 1 API call!
 *    
 *    The (1) means "cache the last 1 emission"
 * 
 * 3. CACHE INVALIDATION:
 *    Set the cached Observable to null to force a fresh request.
 *    Call this when:
 *    - User creates/updates/deletes data
 *    - Cache TTL expires
 *    - User manually refreshes
 * 
 * 4. CACHING STRATEGIES:
 *    
 *    | Strategy     | Persistence | Use Case                    |
 *    |--------------|-------------|-----------------------------|
 *    | shareReplay  | In-memory   | Simple, session-only cache  |
 *    | BehaviorSubject | In-memory | Need current value access |
 *    | localStorage | Browser     | Persist across sessions     |
 *    | Interceptor  | Global      | Cache multiple endpoints    |
 * 
 * ⚠️ WHEN NOT TO CACHE:
 * - User-specific data that changes frequently
 * - Time-sensitive data (stock prices, notifications)
 * - After mutations (POST/PUT/DELETE)
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, User } from '../../services/api.service';

@Component({
    selector: 'app-caching',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>💾 Use Case 7: Caching Strategies</h1>
            <p class="description">
                Cache HTTP responses to avoid redundant API calls.
            </p>

            <div class="demo-grid">
                <!-- shareReplay Cache -->
                <section class="demo-section">
                    <h3>📦 shareReplay Cache</h3>
                    <p>Check console - only first call hits the API:</p>
                    <button (click)="loadCached()">Load Cached Users</button>
                    <button (click)="loadCached()">Load Again (Cached!)</button>
                    <button (click)="loadCached()">Load Third Time</button>
                    @if (users.length) {
                        <div class="result">{{ users.length }} users loaded</div>
                    }
                    <button (click)="invalidateCache()" class="secondary">🗑️ Invalidate Cache</button>
                    
                    <div class="log">
                        @for (log of cacheLogs; track $index) {
                            <div class="log-line">{{ log }}</div>
                        }
                    </div>
                </section>

                <!-- No Cache Demo -->
                <section class="demo-section">
                    <h3>🔄 Without Cache (Compare)</h3>
                    <p>Each click makes a new API call:</p>
                    <button (click)="loadNonCached()">Load Users</button>
                    <button (click)="loadNonCached()">Load Again</button>
                    @if (usersNonCached.length) {
                        <div class="result">{{ usersNonCached.length }} users</div>
                    }
                    <div class="log">
                        @for (log of nonCacheLogs; track $index) {
                            <div class="log-line">{{ log }}</div>
                        }
                    </div>
                </section>
            </div>

            <div class="code-example">
                <h3>💻 Implementation</h3>
                <pre>
// In Service
private usersCache$: Observable&#60;User[]&#62; | null = null;

getUsersCached(): Observable&#60;User[]&#62; {{ '{' }}
    if (!this.usersCache$) {{ '{' }}
        this.usersCache$ = this.http.get&#60;User[]&#62;(url).pipe(
            shareReplay(1) // 🛡️ Cache last emission
        );
    {{ '}' }}
    return this.usersCache$;
{{ '}' }}

invalidateCache(): void {{ '{' }}
    this.usersCache$ = null; // Force new request next time
{{ '}' }}
                </pre>
            </div>

            <div class="strategies">
                <h3>📋 Caching Strategies</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Strategy</th>
                            <th>How</th>
                            <th>Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>shareReplay</td>
                            <td>RxJS operator</td>
                            <td>In-memory, simple</td>
                        </tr>
                        <tr>
                            <td>BehaviorSubject</td>
                            <td>Manual state</td>
                            <td>Need current value</td>
                        </tr>
                        <tr>
                            <td>localStorage</td>
                            <td>Browser storage</td>
                            <td>Persist across sessions</td>
                        </tr>
                        <tr>
                            <td>HTTP Interceptor</td>
                            <td>Global caching</td>
                            <td>Multiple endpoints</td>
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
        .demo-section button { background: #667eea; color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; margin-right: 0.5rem; margin-bottom: 0.5rem; }
        .demo-section button.secondary { background: #ef4444; }

        .result { background: #dcfce7; color: #166534; padding: 0.75rem; border-radius: 6px; margin: 1rem 0; }

        .log { background: #1a1a2e; padding: 1rem; border-radius: 6px; margin-top: 1rem; min-height: 80px; }
        .log-line { color: #4ade80; font-family: monospace; font-size: 0.8rem; }

        .code-example { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
        .code-example h3 { color: white; margin-top: 0; }
        .code-example pre { color: #4ade80; margin: 0; overflow-x: auto; }

        .strategies { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .strategies h3 { margin-top: 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f8f9fa; }
    `]
})
export class CachingComponent {
    private apiService = inject(ApiService);

    users: User[] = [];
    usersNonCached: User[] = [];
    cacheLogs: string[] = [];
    nonCacheLogs: string[] = [];

    /**
     * CACHED REQUEST
     * Uses shareReplay - subsequent calls use cached data.
     */
    loadCached(): void {
        const start = new Date().toLocaleTimeString();
        this.cacheLogs.push(`[${start}] Requesting cached users...`);

        this.apiService.getUsersCached().subscribe(users => {
            this.users = users;
            const end = new Date().toLocaleTimeString();
            this.cacheLogs.push(`[${end}] ✅ Got ${users.length} users`);
        });
    }

    invalidateCache(): void {
        this.apiService.invalidateUsersCache();
        this.cacheLogs.push(`🗑️ Cache invalidated`);
    }

    /**
     * NON-CACHED REQUEST
     * Each call makes a new API request.
     */
    loadNonCached(): void {
        const start = new Date().toLocaleTimeString();
        this.nonCacheLogs.push(`[${start}] Making API request...`);

        this.apiService.getUsers().subscribe(users => {
            this.usersNonCached = users;
            const end = new Date().toLocaleTimeString();
            this.nonCacheLogs.push(`[${end}] ✅ Got ${users.length} users`);
        });
    }
}
