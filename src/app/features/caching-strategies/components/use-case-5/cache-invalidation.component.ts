/**
 * ============================================================================
 * USE CASE 5: CACHE INVALIDATION
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cache-invalidation',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 Cache Invalidation</h1>
                <p class="subtitle">TTL, Stale-While-Revalidate & Patterns</p>
            </header>

            <section class="quote-section">
                <blockquote>
                    "There are only two hard things in Computer Science: 
                    cache invalidation and naming things."
                    <cite>— Phil Karlton</cite>
                </blockquote>
            </section>

            <section class="strategies-section">
                <h2>📊 Invalidation Strategies</h2>
                <div class="strategy-grid">
                    <div class="strategy-card">
                        <h3>⏰ TTL (Time To Live)</h3>
                        <p>Cache expires after fixed duration</p>
                        <pre class="code"><code>setCache(key, data, {{ '{' }}
    ttl: 5 * 60 * 1000 // 5 minutes
{{ '}' }});</code></pre>
                    </div>
                    <div class="strategy-card">
                        <h3>🔄 Stale-While-Revalidate</h3>
                        <p>Serve stale, refresh in background</p>
                        <pre class="code"><code>getWithRevalidate(key, fetchFn)
// Returns cached immediately
// Fetches fresh in background</code></pre>
                    </div>
                    <div class="strategy-card">
                        <h3>📢 Event-Based</h3>
                        <p>Invalidate on specific events</p>
                        <pre class="code"><code>onUserUpdate.subscribe(() => 
    cache.delete('user-profile')
);</code></pre>
                    </div>
                    <div class="strategy-card">
                        <h3>🏷️ Version-Based</h3>
                        <p>Invalidate when version changes</p>
                        <pre class="code"><code>const key = 'data-v' + version;
// New version = new cache</code></pre>
                    </div>
                </div>
            </section>

            <section class="swr-section">
                <h2>🚀 Stale-While-Revalidate Pattern</h2>
                <pre class="code"><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class SWRCacheService {{ '{' }}
    private cache = new Map&lt;string, {{ '{' }} data: any; timestamp: number {{ '}' }}&gt;();
    
    getWithRevalidate&lt;T&gt;(
        key: string,
        fetchFn: () => Observable&lt;T&gt;,
        maxAge: number = 5 * 60 * 1000  // 5 minutes
    ): Observable&lt;T&gt; {{ '{' }}
        const cached = this.cache.get(key);
        
        if (cached) {{ '{' }}
            const isStale = Date.now() - cached.timestamp &gt; maxAge;
            
            if (isStale) {{ '{' }}
                // Revalidate in background
                fetchFn().subscribe(data => {{ '{' }}
                    this.cache.set(key, {{ '{' }} data, timestamp: Date.now() {{ '}' }});
                {{ '}' }});
            {{ '}' }}
            
            // Return cached immediately
            return of(cached.data);
        {{ '}' }}
        
        // No cache, fetch fresh
        return fetchFn().pipe(
            tap(data => this.cache.set(key, {{ '{' }} data, timestamp: Date.now() {{ '}' }}))
        );
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="patterns-section">
                <h2>📋 Common Patterns</h2>
                <table>
                    <tr><th>Pattern</th><th>When to Use</th><th>Example</th></tr>
                    <tr>
                        <td>TTL</td>
                        <td>Data changes infrequently</td>
                        <td>Config, static lists</td>
                    </tr>
                    <tr>
                        <td>SWR</td>
                        <td>Fresh data preferred, stale acceptable</td>
                        <td>User profile, dashboard</td>
                    </tr>
                    <tr>
                        <td>Event-Based</td>
                        <td>Clear relationship to actions</td>
                        <td>After update/delete</td>
                    </tr>
                    <tr>
                        <td>Write-Through</td>
                        <td>Cache + persist together</td>
                        <td>Form saves</td>
                    </tr>
                    <tr>
                        <td>Cache-Aside</td>
                        <td>Lazy loading pattern</td>
                        <td>On-demand fetching</td>
                    </tr>
                </table>
            </section>

            <section class="best-practices">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li>🎯 <strong>Be specific</strong> - Invalidate only what's needed</li>
                    <li>📝 <strong>Use cache keys wisely</strong> - Include version/params</li>
                    <li>⚡ <strong>SWR for UX</strong> - Fast first paint</li>
                    <li>🔔 <strong>Event-based for mutations</strong> - Clear after writes</li>
                    <li>📊 <strong>Monitor cache hit rates</strong> - Tune TTL accordingly</li>
                </ul>
            </section>

            <section class="code-example">
                <h2>💻 Complete Service Example</h2>
                <pre class="code"><code>&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class SmartCacheService {{ '{' }}
    private cache = new Map&lt;string, CacheEntry&gt;();
    
    get&lt;T&gt;(key: string): T | null {{ '{' }}
        const entry = this.cache.get(key);
        if (!entry) return null;
        if (this.isExpired(entry)) {{ '{' }}
            this.cache.delete(key);
            return null;
        {{ '}' }}
        return entry.data;
    {{ '}' }}
    
    set&lt;T&gt;(key: string, data: T, options: CacheOptions = {{ '{}' }}): void {{ '{' }}
        this.cache.set(key, {{ '{' }}
            data,
            createdAt: Date.now(),
            ttl: options.ttl ?? 5 * 60 * 1000,
            tags: options.tags ?? []
        {{ '}' }});
    {{ '}' }}
    
    invalidateByTag(tag: string): void {{ '{' }}
        this.cache.forEach((entry, key) => {{ '{' }}
            if (entry.tags.includes(tag)) {{ '{' }}
                this.cache.delete(key);
            {{ '}' }}
        {{ '}' }});
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #f97316; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        blockquote { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 1.5rem 2rem; border-radius: 12px; margin: 0; font-style: italic; }
        cite { display: block; margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.9; }

        .strategy-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .strategy-card { background: var(--bg-secondary); padding: 1.25rem; border-radius: 10px; }
        .strategy-card h3 { margin: 0 0 0.5rem; font-size: 1rem; color: #f97316; }
        .strategy-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class CacheInvalidationComponent { }
