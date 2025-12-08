/**
 * ============================================================================
 * USE CASE 1: HTTP CACHING WITH RXJS
 * ============================================================================
 */

import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, BehaviorSubject, tap } from 'rxjs';

// Cached HTTP Service Example
@Injectable({ providedIn: 'root' })
export class CachedApiService {
    private http = inject(HttpClient);

    // Cache using shareReplay
    private usersCache$?: Observable<any[]>;

    getUsers(): Observable<any[]> {
        if (!this.usersCache$) {
            this.usersCache$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
                .pipe(
                    shareReplay({ bufferSize: 1, refCount: true })
                );
        }
        return this.usersCache$;
    }

    clearCache() {
        this.usersCache$ = undefined;
    }
}

@Component({
    selector: 'app-http-caching',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 HTTP Caching</h1>
                <p class="subtitle">shareReplay & Cache Headers</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    <code>shareReplay</code> caches the last emitted value and replays it to new subscribers.
                    This prevents multiple HTTP requests for the same data.
                </p>
            </section>

            <section class="code-section">
                <h2>💻 shareReplay Pattern</h2>
                <pre class="code"><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class DataService {{ '{' }}
    private http = inject(HttpClient);
    
    // 🔑 Cache the observable, not the data
    private dataCache$?: Observable&lt;Data[]&gt;;
    
    getData(): Observable&lt;Data[]&gt; {{ '{' }}
        if (!this.dataCache$) {{ '{' }}
            this.dataCache$ = this.http.get&lt;Data[]&gt;('/api/data')
                .pipe(
                    shareReplay({{ '{' }}
                        bufferSize: 1,    // Cache 1 value
                        refCount: true    // Auto-cleanup when no subscribers
                    {{ '}' }})
                );
        {{ '}' }}
        return this.dataCache$;
    {{ '}' }}
    
    clearCache() {{ '{' }}
        this.dataCache$ = undefined;
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-box">
                    <div class="demo-controls">
                        <button (click)="fetchUsers()" [disabled]="loading">
                            {{ loading ? 'Loading...' : 'Fetch Users' }}
                        </button>
                        <button (click)="fetchAgain()">
                            Fetch Again (Cached)
                        </button>
                        <button (click)="clearCache()" class="danger">
                            Clear Cache
                        </button>
                    </div>
                    <div class="stats">
                        <span>Requests made: <strong>{{ requestCount }}</strong></span>
                        <span>Cache status: <strong>{{ cacheStatus }}</strong></span>
                    </div>
                    @if (users.length > 0) {
                        <div class="users-list">
                            @for (user of users.slice(0, 3); track user.id) {
                                <div class="user-item">
                                    <span class="user-name">{{ user.name }}</span>
                                    <span class="user-email">{{ user.email }}</span>
                                </div>
                            }
                        </div>
                    }
                </div>
            </section>

            <section class="headers-section">
                <h2>📋 HTTP Cache Headers</h2>
                <table>
                    <tr><th>Header</th><th>Purpose</th></tr>
                    <tr><td>Cache-Control: max-age=3600</td><td>Cache for 1 hour</td></tr>
                    <tr><td>Cache-Control: no-cache</td><td>Revalidate before using cache</td></tr>
                    <tr><td>Cache-Control: no-store</td><td>Never cache</td></tr>
                    <tr><td>ETag</td><td>Validate cache freshness</td></tr>
                    <tr><td>If-None-Match</td><td>Conditional request with ETag</td></tr>
                </table>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li><code>bufferSize: 1</code> - Cache only the latest value</li>
                    <li><code>refCount: true</code> - Auto-unsubscribe when no consumers</li>
                    <li>Cache the Observable reference, not the data</li>
                    <li>Clear cache by setting to undefined</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #f97316; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        .demo-box { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; }
        .demo-controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .demo-controls button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; background: #f97316; color: white; }
        .demo-controls button.danger { background: #ef4444; }
        .demo-controls button:disabled { opacity: 0.6; }

        .stats { display: flex; gap: 2rem; margin-bottom: 1rem; font-size: 0.9rem; }

        .users-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .user-item { display: flex; justify-content: space-between; padding: 0.75rem; background: white; border-radius: 6px; }
        .user-name { font-weight: 500; }
        .user-email { color: var(--text-secondary); font-size: 0.85rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class HttpCachingComponent {
    private apiService = inject(CachedApiService);

    users: any[] = [];
    loading = false;
    requestCount = 0;
    cacheStatus = 'Empty';

    fetchUsers() {
        this.loading = true;
        this.requestCount++;
        this.apiService.getUsers().subscribe({
            next: (users) => {
                this.users = users;
                this.cacheStatus = 'Populated';
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    fetchAgain() {
        // This should use the cache
        this.apiService.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    clearCache() {
        this.apiService.clearCache();
        this.cacheStatus = 'Cleared';
        this.users = [];
    }
}
