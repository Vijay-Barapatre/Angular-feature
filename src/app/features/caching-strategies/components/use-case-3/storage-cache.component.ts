/**
 * ============================================================================
 * USE CASE 3: LOCAL/SESSION STORAGE CACHING
 * ============================================================================
 */

import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Storage Cache Service
@Injectable({ providedIn: 'root' })
export class StorageCacheService {

    setLocal<T>(key: string, data: T, ttlSeconds?: number): void {
        const item = {
            data,
            expiry: ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    getLocal<T>(key: string): T | null {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        const item = JSON.parse(raw);
        if (item.expiry && Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.data as T;
    }

    setSession<T>(key: string, data: T): void {
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    getSession<T>(key: string): T | null {
        const raw = sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }

    clearLocal() { localStorage.clear(); }
    clearSession() { sessionStorage.clear(); }
}

@Component({
    selector: 'app-storage-cache',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>💽 Storage Cache</h1>
                <p class="subtitle">localStorage & sessionStorage</p>
            </header>

            <section class="comparison-section">
                <h2>📊 Comparison</h2>
                <table>
                    <tr><th>Feature</th><th>localStorage</th><th>sessionStorage</th></tr>
                    <tr><td>Persistence</td><td>Permanent</td><td>Tab/Window only</td></tr>
                    <tr><td>Size Limit</td><td>~5MB</td><td>~5MB</td></tr>
                    <tr><td>Shared</td><td>All tabs</td><td>Single tab</td></tr>
                    <tr><td>Clear on</td><td>Manual</td><td>Tab close</td></tr>
                </table>
            </section>

            <section class="code-section">
                <h2>💻 Implementation with TTL</h2>
                <pre class="code"><code>setLocal&lt;T&gt;(key: string, data: T, ttlSeconds?: number): void {{ '{' }}
    const item = {{ '{' }}
        data,
        expiry: ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null
    {{ '}' }};
    localStorage.setItem(key, JSON.stringify(item));
{{ '}' }}

getLocal&lt;T&gt;(key: string): T | null {{ '{' }}
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    
    const item = JSON.parse(raw);
    if (item.expiry && Date.now() &gt; item.expiry) {{ '{' }}
        localStorage.removeItem(key);
        return null;  // Expired!
    {{ '}' }}
    
    return item.data as T;
{{ '}' }}</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-box">
                    <div class="storage-panels">
                        <div class="panel">
                            <h3>💾 localStorage</h3>
                            <div class="input-group">
                                <input [(ngModel)]="localKey" placeholder="Key">
                                <input [(ngModel)]="localValue" placeholder="Value">
                            </div>
                            <button (click)="saveToLocal()">Save</button>
                            <button (click)="loadFromLocal()">Load</button>
                            <button (click)="clearLocal()" class="danger">Clear</button>
                            @if (localResult) {
                                <div class="result">{{ localResult }}</div>
                            }
                        </div>
                        
                        <div class="panel">
                            <h3>📋 sessionStorage</h3>
                            <div class="input-group">
                                <input [(ngModel)]="sessionKey" placeholder="Key">
                                <input [(ngModel)]="sessionValue" placeholder="Value">
                            </div>
                            <button (click)="saveToSession()">Save</button>
                            <button (click)="loadFromSession()">Load</button>
                            <button (click)="clearSession()" class="danger">Clear</button>
                            @if (sessionResult) {
                                <div class="result">{{ sessionResult }}</div>
                            }
                        </div>
                    </div>
                </div>
            </section>

            <section class="use-cases-section">
                <h2>📋 When to Use</h2>
                <div class="use-case-grid">
                    <div class="use-case">
                        <h4>localStorage</h4>
                        <ul>
                            <li>User preferences</li>
                            <li>Theme settings</li>
                            <li>Language selection</li>
                            <li>Remember me tokens</li>
                        </ul>
                    </div>
                    <div class="use-case">
                        <h4>sessionStorage</h4>
                        <ul>
                            <li>Form drafts</li>
                            <li>One-time messages</li>
                            <li>Temporary state</li>
                            <li>Wizard progress</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Data is stored as strings - use JSON.stringify/parse</li>
                    <li>Synchronous API - can block main thread for large data</li>
                    <li>Not secure - never store sensitive data</li>
                    <li>Add TTL wrapper for expiration support</li>
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

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }

        .demo-box { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; }
        .storage-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .panel { background: white; padding: 1rem; border-radius: 8px; }
        .panel h3 { margin: 0 0 1rem; font-size: 1rem; color: #f97316; }
        .input-group { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
        .input-group input { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        button { padding: 0.5rem 0.75rem; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.25rem; font-size: 0.85rem; }
        .danger { background: #ef4444; }
        .result { margin-top: 0.75rem; padding: 0.5rem; background: #dcfce7; border-radius: 4px; font-size: 0.85rem; }

        .use-case-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .use-case { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; }
        .use-case h4 { margin: 0 0 0.5rem; color: #f97316; }
        .use-case ul { margin: 0; padding-left: 1.25rem; font-size: 0.9rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class StorageCacheComponent {
    private storage = new StorageCacheService();

    localKey = '';
    localValue = '';
    localResult = '';

    sessionKey = '';
    sessionValue = '';
    sessionResult = '';

    saveToLocal() {
        if (this.localKey && this.localValue) {
            this.storage.setLocal(this.localKey, this.localValue);
            this.localResult = 'Saved!';
        }
    }

    loadFromLocal() {
        const value = this.storage.getLocal(this.localKey);
        this.localResult = value ? `Value: ${value}` : 'Not found';
    }

    clearLocal() {
        this.storage.clearLocal();
        this.localResult = 'Cleared!';
    }

    saveToSession() {
        if (this.sessionKey && this.sessionValue) {
            this.storage.setSession(this.sessionKey, this.sessionValue);
            this.sessionResult = 'Saved!';
        }
    }

    loadFromSession() {
        const value = this.storage.getSession(this.sessionKey);
        this.sessionResult = value ? `Value: ${value}` : 'Not found';
    }

    clearSession() {
        this.storage.clearSession();
        this.sessionResult = 'Cleared!';
    }
}
