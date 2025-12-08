/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: CACHING SERVICE
 * ============================================================================
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of, tap, shareReplay, Observable } from 'rxjs';

@Component({
    selector: 'app-scenario-3-caching',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: HTTP Caching Service</h2>
                <p>Implement client-side caching to reduce API calls.</p>
            </div>

            <div class="content">
                <div class="demo-section">
                    <h3>🗄️ Cache Demo</h3>
                    
                    <div class="actions">
                        <button (click)="fetchPosts()">Fetch Posts</button>
                        <button (click)="fetchPostsCached()">Fetch (Cached)</button>
                        <button class="clear" (click)="clearCache()">Clear Cache</button>
                    </div>

                    <div class="stats-grid">
                        <div class="stat">
                            <span class="stat-label">API Calls</span>
                            <span class="stat-value">{{ apiCalls() }}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Cache Hits</span>
                            <span class="stat-value">{{ cacheHits() }}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Cache Status</span>
                            <span class="stat-value">{{ hasCachedData() ? '🟢 Cached' : '🔴 Empty' }}</span>
                        </div>
                    </div>

                    <div class="log">
                        <h4>📋 Activity Log</h4>
                        @for (entry of logs(); track entry) {
                            <div class="log-entry">{{ entry }}</div>
                        }
                    </div>
                </div>

                <div class="code-example">
                    <h4>Caching with shareReplay</h4>
                    <pre><code>private cache$ = this.http.get(url).pipe(
  shareReplay(1) // Cache and replay last emission
);

getData() {{ '{' }}
  return this.cache$;
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .demo-section { padding: 1.5rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1.5rem; }
        .actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .actions button { padding: 0.5rem 1rem; background: #06b6d4; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .actions button.clear { background: #ef4444; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
        .stat { padding: 1rem; background: white; border-radius: 8px; text-align: center; }
        .stat-label { display: block; font-size: 0.8rem; color: #6b7280; }
        .stat-value { font-size: 1.5rem; font-weight: bold; color: #06b6d4; }
        .log { padding: 1rem; background: #1e1e2e; border-radius: 8px; max-height: 150px; overflow-y: auto; }
        .log h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .log-entry { color: #a6e3a1; font-family: monospace; font-size: 0.8rem; padding: 0.25rem 0; }
        .code-example { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-example pre { margin: 0; }
        .code-example code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario3CachingComponent {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    private cache$: Observable<any[]> | null = null;

    apiCalls = signal(0);
    cacheHits = signal(0);
    logs = signal<string[]>([]);
    hasCachedData = signal(false);

    fetchPosts(): void {
        this.addLog('Making fresh API call...');
        this.apiCalls.update(n => n + 1);

        this.http.get<any[]>(`${this.apiUrl}?_limit=5`).subscribe({
            next: (data) => {
                this.addLog(`Received ${data.length} posts from API`);
            }
        });
    }

    fetchPostsCached(): void {
        if (!this.cache$) {
            this.addLog('Cache empty - creating new cached request');
            this.apiCalls.update(n => n + 1);

            this.cache$ = this.http.get<any[]>(`${this.apiUrl}?_limit=5`).pipe(
                tap(() => this.addLog('API response received')),
                shareReplay(1)
            );
            this.hasCachedData.set(true);
        } else {
            this.addLog('Using cached data (no API call)');
            this.cacheHits.update(n => n + 1);
        }

        this.cache$.subscribe({
            next: (data) => {
                this.addLog(`Got ${data.length} posts from cache/API`);
            }
        });
    }

    clearCache(): void {
        this.cache$ = null;
        this.hasCachedData.set(false);
        this.addLog('Cache cleared!');
    }

    private addLog(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.logs.update(logs => [`[${timestamp}] ${message}`, ...logs].slice(0, 10));
    }
}
