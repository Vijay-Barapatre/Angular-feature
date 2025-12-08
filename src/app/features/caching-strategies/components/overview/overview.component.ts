/**
 * ============================================================================
 * CACHING STRATEGIES OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-caching-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>💾 Caching Strategies</h1>
                <p class="subtitle">HTTP, Memory, Storage & IndexedDB Caching</p>
            </header>

            <section class="intro-section">
                <div class="intro-card">
                    <h2>Why Caching?</h2>
                    <p>
                        <strong>Caching</strong> improves performance by storing data for quick retrieval,
                        reducing server requests, network latency, and improving user experience.
                    </p>
                </div>
            </section>

            <section class="types-section">
                <h2>📊 Caching Types</h2>
                <div class="types-grid">
                    <div class="type-card">
                        <span class="icon">🔄</span>
                        <h3>HTTP Caching</h3>
                        <p>shareReplay, Cache headers</p>
                    </div>
                    <div class="type-card">
                        <span class="icon">🧠</span>
                        <h3>Memory Cache</h3>
                        <p>In-memory Map/Service</p>
                    </div>
                    <div class="type-card">
                        <span class="icon">💽</span>
                        <h3>Storage Cache</h3>
                        <p>localStorage/sessionStorage</p>
                    </div>
                    <div class="type-card">
                        <span class="icon">📦</span>
                        <h3>IndexedDB</h3>
                        <p>Large data, offline support</p>
                    </div>
                </div>
            </section>

            <section class="usecases-section">
                <h2>📖 Use Cases</h2>
                <div class="usecase-grid">
                    <a routerLink="use-case-1" class="usecase-card">
                        <span class="num">1</span>
                        <h3>HTTP Caching</h3>
                        <p>shareReplay, HTTP cache headers</p>
                        <span class="tag">RxJS</span>
                    </a>
                    <a routerLink="use-case-2" class="usecase-card">
                        <span class="num">2</span>
                        <h3>Memory Cache Service</h3>
                        <p>In-memory caching with TTL</p>
                        <span class="tag">Service</span>
                    </a>
                    <a routerLink="use-case-3" class="usecase-card">
                        <span class="num">3</span>
                        <h3>Storage Cache</h3>
                        <p>localStorage & sessionStorage</p>
                        <span class="tag">Web API</span>
                    </a>
                    <a routerLink="use-case-4" class="usecase-card">
                        <span class="num">4</span>
                        <h3>IndexedDB</h3>
                        <p>Large data & offline storage</p>
                        <span class="tag">Dexie.js</span>
                    </a>
                    <a routerLink="use-case-5" class="usecase-card">
                        <span class="num">5</span>
                        <h3>Cache Invalidation</h3>
                        <p>TTL, stale-while-revalidate</p>
                        <span class="tag">Patterns</span>
                    </a>
                </div>
            </section>

            <section class="comparison-section">
                <h2>📋 Quick Comparison</h2>
                <table>
                    <tr><th>Type</th><th>Persistence</th><th>Size Limit</th><th>Best For</th></tr>
                    <tr><td>Memory</td><td>Session</td><td>~50MB</td><td>Frequently accessed data</td></tr>
                    <tr><td>localStorage</td><td>Permanent</td><td>~5MB</td><td>User preferences</td></tr>
                    <tr><td>sessionStorage</td><td>Tab</td><td>~5MB</td><td>Temporary session data</td></tr>
                    <tr><td>IndexedDB</td><td>Permanent</td><td>~50%+ disk</td><td>Large datasets, offline</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #f97316); }

        .intro-card { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 2rem; border-radius: 12px; }

        section { margin-bottom: 2.5rem; }

        .types-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .type-card { background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; text-align: center; }
        .type-card .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .type-card h3 { margin: 0 0 0.25rem; font-size: 1rem; color: #f97316; }
        .type-card p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }

        .usecase-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .usecase-card { display: block; background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s; position: relative; border: 2px solid transparent; }
        .usecase-card:hover { border-color: #f97316; transform: translateY(-2px); }
        .usecase-card .num { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #f97316; color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .usecase-card h3 { margin: 0 0 0.5rem; color: #f97316; }
        .usecase-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }
        .tag { background: rgba(249, 115, 22, 0.1); color: #f97316; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class CachingOverviewComponent { }
