/**
 * ============================================================================
 * MEMORY CACHE SERVICE
 * ============================================================================
 */

import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Memory Cache Service with TTL
@Injectable({ providedIn: 'root' })
export class MemoryCacheService {
    private cache = new Map<string, { data: any; expiry: number }>();

    set<T>(key: string, data: T, ttlSeconds: number = 300): void {
        const expiry = Date.now() + (ttlSeconds * 1000);
        this.cache.set(key, { data, expiry });
    }

    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.data as T;
    }

    has(key: string): boolean {
        return this.get(key) !== null;
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    getStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

@Component({
    selector: 'app-memory-cache',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🧠 Memory Cache Service</h1>
                <p class="subtitle">In-Memory Caching with TTL</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    A memory cache stores data in runtime memory using a Map.
                    Adding a <strong>TTL (Time To Live)</strong> ensures stale data is automatically invalidated.
                </p>
            </section>

            <section class="code-section">
                <h2>💻 Implementation</h2>
                <pre class="code"><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class MemoryCacheService {{ '{' }}
    private cache = new Map&lt;string, {{ '{' }} data: any; expiry: number {{ '}' }}&gt;();
    
    set&lt;T&gt;(key: string, data: T, ttlSeconds = 300): void {{ '{' }}
        const expiry = Date.now() + (ttlSeconds * 1000);
        this.cache.set(key, {{ '{' }} data, expiry {{ '}' }});
    {{ '}' }}
    
    get&lt;T&gt;(key: string): T | null {{ '{' }}
        const item = this.cache.get(key);
        if (!item) return null;
        
        // Check if expired
        if (Date.now() &gt; item.expiry) {{ '{' }}
            this.cache.delete(key);
            return null;
        {{ '}' }}
        
        return item.data as T;
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-box">
                    <div class="input-group">
                        <input [(ngModel)]="key" placeholder="Cache key">
                        <input [(ngModel)]="value" placeholder="Value">
                        <input type="number" [(ngModel)]="ttl" placeholder="TTL (seconds)">
                        <button (click)="setCache()">Set</button>
                    </div>
                    
                    <div class="input-group">
                        <input [(ngModel)]="getKey" placeholder="Key to retrieve">
                        <button (click)="getCache()">Get</button>
                    </div>
                    
                    @if (retrievedValue !== null) {
                        <div class="result success">
                            Value: <strong>{{ retrievedValue }}</strong>
                        </div>
                    }
                    @if (retrievedValue === null && getKey) {
                        <div class="result error">
                            Key not found or expired
                        </div>
                    }

                    <div class="cache-stats">
                        <h4>📊 Cache Stats</h4>
                        <p>Entries: <strong>{{ cacheStats.size }}</strong></p>
                        <p>Keys: <strong>{{ cacheStats.keys.join(', ') || 'empty' }}</strong></p>
                        <button (click)="clearAll()" class="danger">Clear All</button>
                    </div>
                </div>
            </section>

            <section class="usage-section">
                <h2>📋 Usage Patterns</h2>
                <pre class="code"><code>// In a service
export class UserService {{ '{' }}
    private cache = inject(MemoryCacheService);
    private http = inject(HttpClient);
    
    getUser(id: number): Observable&lt;User&gt; {{ '{' }}
        const cacheKey = 'user-' + id;
        
        // Check cache first
        const cached = this.cache.get&lt;User&gt;(cacheKey);
        if (cached) {{ '{' }}
            return of(cached);
        {{ '}' }}
        
        // Fetch and cache
        return this.http.get&lt;User&gt;('/api/users/' + id).pipe(
            tap(user =&gt; this.cache.set(cacheKey, user, 300))
        );
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Data is lost on page refresh</li>
                    <li>Great for frequently accessed data</li>
                    <li>TTL prevents stale data issues</li>
                    <li>Watch memory usage for large datasets</li>
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
        .input-group { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .input-group input { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; flex: 1; min-width: 100px; }
        .input-group button { padding: 0.5rem 1rem; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer; }

        .result { padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; }
        .result.success { background: #dcfce7; color: #15803d; }
        .result.error { background: #fee2e2; color: #dc2626; }

        .cache-stats { background: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .cache-stats h4 { margin: 0 0 0.5rem; color: #f97316; }
        .cache-stats p { margin: 0.25rem 0; }
        .danger { background: #ef4444 !important; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class MemoryCacheComponent {
    private cacheService = new MemoryCacheService();

    key = '';
    value = '';
    ttl = 60;
    getKey = '';
    retrievedValue: any = null;
    cacheStats = { size: 0, keys: [] as string[] };

    setCache() {
        if (this.key && this.value) {
            this.cacheService.set(this.key, this.value, this.ttl);
            this.updateStats();
            this.key = '';
            this.value = '';
        }
    }

    getCache() {
        this.retrievedValue = this.cacheService.get(this.getKey);
    }

    clearAll() {
        this.cacheService.clear();
        this.updateStats();
        this.retrievedValue = null;
    }

    updateStats() {
        this.cacheStats = this.cacheService.getStats();
    }
}
