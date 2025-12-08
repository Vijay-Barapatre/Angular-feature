/**
 * ============================================================================
 * USE CASE 4: INDEXEDDB CACHING
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-indexeddb-cache',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 IndexedDB Caching</h1>
                <p class="subtitle">Large Data & Offline Storage</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    <strong>IndexedDB</strong> is a low-level browser API for storing large amounts 
                    of structured data, including files/blobs. It's essential for offline-first apps.
                </p>
            </section>

            <section class="comparison-section">
                <h2>📊 Why IndexedDB?</h2>
                <table>
                    <tr><th>Feature</th><th>localStorage</th><th>IndexedDB</th></tr>
                    <tr><td>Storage Limit</td><td>~5MB</td><td>50%+ of disk</td></tr>
                    <tr><td>Data Types</td><td>Strings only</td><td>Objects, Blobs, Files</td></tr>
                    <tr><td>Async</td><td>No (blocking)</td><td>Yes (non-blocking)</td></tr>
                    <tr><td>Indexing</td><td>Key only</td><td>Multiple indexes</td></tr>
                    <tr><td>Transactions</td><td>No</td><td>Yes</td></tr>
                </table>
            </section>

            <section class="code-section">
                <h2>💻 Native IndexedDB</h2>
                <pre class="code"><code>// Open database
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {{ '{' }}
    const db = event.target.result;
    
    // Create object store (like a table)
    const store = db.createObjectStore('users', {{ '{' }} keyPath: 'id' {{ '}' }});
    store.createIndex('email', 'email', {{ '{' }} unique: true {{ '}' }});
{{ '}' }};

request.onsuccess = (event) => {{ '{' }}
    const db = event.target.result;
    
    // Add data
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    store.add({{ '{' }} id: 1, name: 'John', email: 'john&#64;example.com' {{ '}' }});
{{ '}' }};</code></pre>
            </section>

            <section class="dexie-section">
                <h2>🚀 Dexie.js (Recommended)</h2>
                <pre class="code"><code>// Install: npm install dexie

import Dexie from 'dexie';

class AppDatabase extends Dexie {{ '{' }}
    users!: Dexie.Table&lt;User, number&gt;;
    
    constructor() {{ '{' }}
        super('MyAppDB');
        this.version(1).stores({{ '{' }}
            users: '++id, email, name'  // ++ = auto-increment
        {{ '}' }});
    {{ '}' }}
{{ '}' }}

const db = new AppDatabase();

// Simple CRUD operations
await db.users.add({{ '{' }} name: 'John', email: 'john&#64;example.com' {{ '}' }});
const user = await db.users.get(1);
const allUsers = await db.users.toArray();
await db.users.where('email').equals('john&#64;example.com').first();</code></pre>
            </section>

            <section class="service-section">
                <h2>💻 Angular Service Pattern</h2>
                <pre class="code"><code>// indexed-db.service.ts
&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class IndexedDbService {{ '{' }}
    private db: AppDatabase;
    
    constructor() {{ '{' }}
        this.db = new AppDatabase();
    {{ '}' }}
    
    async cacheData&lt;T&gt;(storeName: string, data: T[]): Promise&lt;void&gt; {{ '{' }}
        await this.db.table(storeName).bulkPut(data);
    {{ '}' }}
    
    async getCached&lt;T&gt;(storeName: string): Promise&lt;T[]&gt; {{ '{' }}
        return this.db.table(storeName).toArray();
    {{ '}' }}
    
    async getCachedById&lt;T&gt;(storeName: string, id: number): Promise&lt;T | undefined&gt; {{ '{' }}
        return this.db.table(storeName).get(id);
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="use-cases">
                <h2>📋 Best Use Cases</h2>
                <ul>
                    <li>📴 <strong>Offline data</strong> - Sync when online</li>
                    <li>📁 <strong>File caching</strong> - Images, PDFs, media</li>
                    <li>📊 <strong>Large datasets</strong> - 1000+ records</li>
                    <li>🔍 <strong>Complex queries</strong> - Need indexes</li>
                    <li>⚡ <strong>Performance</strong> - Avoid blocking main thread</li>
                </ul>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>Use Dexie.js for simpler API</li>
                    <li>Always handle version upgrades</li>
                    <li>Use transactions for data integrity</li>
                    <li>Consider Web Workers for large operations</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #f97316; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class IndexedDbCacheComponent { }
