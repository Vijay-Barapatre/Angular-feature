/**
 * ============================================================================
 * INDEXEDDB CACHING - COMPLETE IMPLEMENTATION
 * ============================================================================
 * 
 * This file demonstrates:
 * 1. IndexedDB Service using native API (no external dependencies)
 * 2. CRUD operations with TTL support
 * 3. Live demo component with interactive UI
 * 
 * For production, consider using Dexie.js for cleaner API:
 *   npm install dexie
 */

import { Component, Injectable, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================================================
// INDEXED DB CACHE SERVICE (Native API - No Dependencies)
// ============================================================================

interface CacheEntry {
    key: string;
    data: any;
    expiry: number;
    createdAt: number;
}

@Injectable({ providedIn: 'root' })
export class IndexedDbCacheService {
    private dbName = 'AppCacheDB';
    private storeName = 'cache';
    private dbVersion = 1;
    private db: IDBDatabase | null = null;

    /**
     * Initialize the database
     * Call this once at app startup or before first use
     */
    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            // Called when database is created or version increases
            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'key' });
                    store.createIndex('expiry', 'expiry', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                console.log('✅ IndexedDB initialized');
                resolve();
            };

            request.onerror = (event) => {
                console.error('❌ IndexedDB error:', (event.target as IDBOpenDBRequest).error);
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    /**
     * Store data with TTL (Time To Live)
     * @param key - Unique identifier
     * @param data - Data to cache (any type)
     * @param ttlSeconds - How long to keep (default: 1 hour)
     */
    async set<T>(key: string, data: T, ttlSeconds: number = 3600): Promise<void> {
        await this.ensureDb();

        const entry: CacheEntry = {
            key,
            data,
            expiry: Date.now() + (ttlSeconds * 1000),
            createdAt: Date.now()
        };

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const request = store.put(entry);  // put = upsert (insert or update)

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get data (returns null if expired or not found)
     * Automatically deletes expired entries
     */
    async get<T>(key: string): Promise<T | null> {
        await this.ensureDb();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const request = store.get(key);

            request.onsuccess = () => {
                const entry = request.result as CacheEntry | undefined;

                if (!entry) {
                    resolve(null);
                    return;
                }

                // Check if expired
                if (Date.now() > entry.expiry) {
                    // Auto-cleanup expired entry
                    store.delete(key);
                    resolve(null);
                    return;
                }

                resolve(entry.data as T);
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Check if key exists and is valid (not expired)
     */
    async has(key: string): Promise<boolean> {
        return (await this.get(key)) !== null;
    }

    /**
     * Delete a specific key
     */
    async delete(key: string): Promise<void> {
        await this.ensureDb();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear all cached data
     */
    async clear(): Promise<void> {
        await this.ensureDb();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all cached entries (for debugging/stats)
     */
    async getAll(): Promise<CacheEntry[]> {
        await this.ensureDb();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(this.storeName, 'readonly');
            const store = tx.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Cleanup all expired entries
     * Returns number of entries deleted
     */
    async cleanup(): Promise<number> {
        await this.ensureDb();
        const now = Date.now();
        let deleted = 0;

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const index = store.index('expiry');

            // Get all entries with expiry < now
            const range = IDBKeyRange.upperBound(now);
            const request = index.openCursor(range);

            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                if (cursor) {
                    cursor.delete();
                    deleted++;
                    cursor.continue();
                } else {
                    resolve(deleted);
                }
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get cache statistics
     */
    async getStats(): Promise<{ count: number; keys: string[]; totalSize: string }> {
        const entries = await this.getAll();
        const validEntries = entries.filter(e => e.expiry > Date.now());
        const totalBytes = new Blob([JSON.stringify(entries)]).size;

        return {
            count: validEntries.length,
            keys: validEntries.map(e => e.key),
            totalSize: this.formatBytes(totalBytes)
        };
    }

    private formatBytes(bytes: number): string {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    private async ensureDb(): Promise<void> {
        if (!this.db) {
            await this.init();
        }
    }
}

// ============================================================================
// DEMO COMPONENT
// ============================================================================

@Component({
    selector: 'app-indexeddb-cache',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 IndexedDB Cache Service</h1>
                <p class="subtitle">Persistent Browser Storage with TTL</p>
            </header>

            <!-- Status -->
            <section class="status-section">
                <div class="status" [class.connected]="isInitialized()">
                    {{ isInitialized() ? '✅ IndexedDB Connected' : '⏳ Initializing...' }}
                </div>
            </section>

            <!-- SET Operation -->
            <section class="demo-section">
                <h2>💾 Store Data</h2>
                <div class="demo-box">
                    <div class="input-group">
                        <input [(ngModel)]="setKey" placeholder="Key (e.g., user-1)">
                        <input [(ngModel)]="setValue" placeholder="Value (any string)">
                        <input type="number" [(ngModel)]="setTtl" placeholder="TTL (seconds)">
                        <button (click)="setCache()" [disabled]="!isInitialized()">
                            💾 Store
                        </button>
                    </div>
                    @if (setMessage()) {
                        <div class="message success">{{ setMessage() }}</div>
                    }
                </div>
            </section>

            <!-- GET Operation -->
            <section class="demo-section">
                <h2>🔍 Retrieve Data</h2>
                <div class="demo-box">
                    <div class="input-group">
                        <input [(ngModel)]="getKey" placeholder="Key to retrieve">
                        <button (click)="getCache()" [disabled]="!isInitialized()">
                            🔍 Get
                        </button>
                    </div>
                    @if (getResult() !== null) {
                        <div class="result success">
                            <strong>Value:</strong> {{ getResult() }}
                        </div>
                    }
                    @if (getResult() === null && getKey) {
                        <div class="result error">
                            Key not found or expired
                        </div>
                    }
                </div>
            </section>

            <!-- DELETE Operation -->
            <section class="demo-section">
                <h2>🗑️ Delete Data</h2>
                <div class="demo-box">
                    <div class="input-group">
                        <input [(ngModel)]="deleteKey" placeholder="Key to delete">
                        <button (click)="deleteCache()" [disabled]="!isInitialized()">
                            🗑️ Delete
                        </button>
                        <button (click)="clearAll()" class="danger" [disabled]="!isInitialized()">
                            💥 Clear All
                        </button>
                    </div>
                    @if (deleteMessage()) {
                        <div class="message">{{ deleteMessage() }}</div>
                    }
                </div>
            </section>

            <!-- Stats -->
            <section class="demo-section">
                <h2>📊 Cache Statistics</h2>
                <div class="demo-box">
                    <button (click)="refreshStats()" [disabled]="!isInitialized()">
                        🔄 Refresh Stats
                    </button>
                    <button (click)="cleanupExpired()" [disabled]="!isInitialized()">
                        🧹 Cleanup Expired
                    </button>
                    
                    @if (stats()) {
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Entries:</span>
                                <span class="stat-value">{{ stats()!.count }}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Size:</span>
                                <span class="stat-value">{{ stats()!.totalSize }}</span>
                            </div>
                            <div class="stat-item full-width">
                                <span class="stat-label">Keys:</span>
                                <span class="stat-value">{{ stats()!.keys.join(', ') || 'empty' }}</span>
                            </div>
                        </div>
                    }
                </div>
            </section>

            <!-- Code Example -->
            <section class="code-section">
                <h2>💻 Usage Example</h2>
                <pre class="code"><code>// Inject the service
private cache = inject(IndexedDbCacheService);

// Initialize once (app startup)
await this.cache.init();

// Store with 5 minute TTL
await this.cache.set('user-1', {{ '{' }} name: 'John' {{ '}' }}, 300);

// Retrieve (null if expired)
const user = await this.cache.get('user-1');

// Check existence
const exists = await this.cache.has('user-1');

// Delete
await this.cache.delete('user-1');

// Clear all
await this.cache.clear();

// Cleanup expired entries
const deleted = await this.cache.cleanup();</code></pre>
            </section>

            <!-- Key Points -->
            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li>📦 <strong>Persistent:</strong> Data survives page refresh and browser restart</li>
                    <li>⏰ <strong>TTL Support:</strong> Automatic expiration with cleanup</li>
                    <li>🚀 <strong>Async:</strong> Non-blocking operations won't freeze UI</li>
                    <li>💾 <strong>Large Storage:</strong> Gigabytes of data (50%+ of disk)</li>
                    <li>📴 <strong>Offline Ready:</strong> Works without network</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #f97316; margin-bottom: 0.5rem; }
        .subtitle { color: #6b7280; }

        .status-section { text-align: center; margin-bottom: 2rem; }
        .status { 
            display: inline-block;
            padding: 0.5rem 1rem; 
            border-radius: 20px; 
            background: #fef3c7; 
            color: #92400e;
        }
        .status.connected { background: #d1fae5; color: #065f46; }

        .demo-section { margin-bottom: 2rem; }
        .demo-section h2 { margin-bottom: 1rem; color: #374151; }
        
        .demo-box { 
            background: #f9fafb; 
            padding: 1.5rem; 
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        .input-group { 
            display: flex; 
            gap: 0.5rem; 
            margin-bottom: 1rem; 
            flex-wrap: wrap; 
        }
        .input-group input { 
            padding: 0.75rem; 
            border: 1px solid #d1d5db; 
            border-radius: 6px; 
            flex: 1; 
            min-width: 120px;
            font-size: 0.9rem;
        }
        .input-group input:focus {
            outline: none;
            border-color: #f97316;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }
        .input-group button { 
            padding: 0.75rem 1.25rem; 
            background: #f97316; 
            color: white; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer;
            font-weight: 500;
            transition: background 0.2s;
        }
        .input-group button:hover:not(:disabled) { background: #ea580c; }
        .input-group button:disabled { background: #d1d5db; cursor: not-allowed; }
        .input-group button.danger { background: #ef4444; }
        .input-group button.danger:hover:not(:disabled) { background: #dc2626; }

        .result, .message { 
            padding: 0.75rem 1rem; 
            border-radius: 6px; 
            margin-top: 0.5rem;
        }
        .result.success, .message.success { background: #d1fae5; color: #065f46; }
        .result.error { background: #fee2e2; color: #991b1b; }
        .message { background: #dbeafe; color: #1e40af; }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }
        .stat-item {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .stat-item.full-width { grid-column: 1 / -1; }
        .stat-label { color: #6b7280; font-size: 0.875rem; }
        .stat-value { 
            display: block; 
            font-size: 1.25rem; 
            font-weight: 600; 
            color: #111827;
            margin-top: 0.25rem;
        }

        .code-section { margin-bottom: 2rem; }
        .code { 
            background: #1e1e2e; 
            color: #a6e3a1; 
            padding: 1.5rem; 
            border-radius: 10px; 
            overflow-x: auto; 
            font-size: 0.8rem;
            line-height: 1.6;
        }

        .key-points { margin-bottom: 2rem; }
        .key-points ul { 
            list-style: none; 
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 0.75rem;
        }
        .key-points li { 
            background: #f9fafb;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
    `]
})
export class IndexedDbCacheComponent implements OnInit {
    private cacheService = new IndexedDbCacheService();

    // Signals for reactive state
    isInitialized = signal(false);
    setMessage = signal('');
    getResult = signal<string | null>(null);
    deleteMessage = signal('');
    stats = signal<{ count: number; keys: string[]; totalSize: string } | null>(null);

    // Form inputs
    setKey = '';
    setValue = '';
    setTtl = 60;
    getKey = '';
    deleteKey = '';

    async ngOnInit() {
        try {
            await this.cacheService.init();
            this.isInitialized.set(true);
            await this.refreshStats();
        } catch (error) {
            console.error('Failed to initialize IndexedDB:', error);
        }
    }

    async setCache() {
        if (!this.setKey || !this.setValue) return;

        try {
            await this.cacheService.set(this.setKey, this.setValue, this.setTtl);
            this.setMessage.set(`✅ Stored "${this.setKey}" with ${this.setTtl}s TTL`);
            this.setKey = '';
            this.setValue = '';
            await this.refreshStats();

            setTimeout(() => this.setMessage.set(''), 3000);
        } catch (error) {
            this.setMessage.set(`❌ Error: ${error}`);
        }
    }

    async getCache() {
        if (!this.getKey) return;

        try {
            const result = await this.cacheService.get<string>(this.getKey);
            this.getResult.set(result);
        } catch (error) {
            console.error('Get error:', error);
            this.getResult.set(null);
        }
    }

    async deleteCache() {
        if (!this.deleteKey) return;

        try {
            await this.cacheService.delete(this.deleteKey);
            this.deleteMessage.set(`✅ Deleted "${this.deleteKey}"`);
            this.deleteKey = '';
            await this.refreshStats();

            setTimeout(() => this.deleteMessage.set(''), 3000);
        } catch (error) {
            this.deleteMessage.set(`❌ Error: ${error}`);
        }
    }

    async clearAll() {
        try {
            await this.cacheService.clear();
            this.deleteMessage.set('✅ All cache cleared!');
            await this.refreshStats();

            setTimeout(() => this.deleteMessage.set(''), 3000);
        } catch (error) {
            this.deleteMessage.set(`❌ Error: ${error}`);
        }
    }

    async cleanupExpired() {
        try {
            const deleted = await this.cacheService.cleanup();
            this.deleteMessage.set(`🧹 Cleaned up ${deleted} expired entries`);
            await this.refreshStats();

            setTimeout(() => this.deleteMessage.set(''), 3000);
        } catch (error) {
            this.deleteMessage.set(`❌ Error: ${error}`);
        }
    }

    async refreshStats() {
        try {
            const stats = await this.cacheService.getStats();
            this.stats.set(stats);
        } catch (error) {
            console.error('Stats error:', error);
        }
    }
}
