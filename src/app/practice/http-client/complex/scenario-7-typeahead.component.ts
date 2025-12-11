/**
 * ============================================================================
 * COMPLEX SCENARIO 7: TYPE-AHEAD SEARCH (debounce + switchMap)
 * ============================================================================
 * 
 * 🎯 OBJECTIVE:
 * Implement an efficient search-as-you-type feature with proper RxJS patterns.
 * 
 * 📋 CONCEPTS:
 * 1. debounceTime - Wait for user to stop typing before searching
 * 2. distinctUntilChanged - Don't search if query hasn't changed
 * 3. switchMap - Cancel previous request when new search comes in
 * 4. Loading state management
 * 
 * 💡 REAL-WORLD USE:
 * Google Search, GitHub Search, any autocomplete feature
 */

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
    Subject, Subscription, of,
    debounceTime, distinctUntilChanged, switchMap,
    tap, catchError, delay, map, finalize
} from 'rxjs';

interface SearchResult {
    id: number;
    name: string;
    category: string;
}

interface SearchStats {
    totalKeystrokes: number;
    actualSearches: number;
    cancelledRequests: number;
}

@Component({
    selector: 'app-scenario-7-typeahead',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise-container">
            <div class="exercise-header">
                <h2>📝 Scenario 7: Type-Ahead Search</h2>
                <span class="difficulty complex">Complex</span>
            </div>

            <div class="instructions">
                <h3>📋 The Problem</h3>
                <p>
                    Without proper handling, every keystroke triggers an API call.
                    This wastes bandwidth and can show stale results.
                </p>
                <div class="problem-visual">
                    <span>User types: "laptop"</span>
                    <div class="keystroke-demo">
                        <span class="key">l</span>→API
                        <span class="key">a</span>→API
                        <span class="key">p</span>→API
                        <span class="key">t</span>→API
                        <span class="key">o</span>→API
                        <span class="key">p</span>→API
                    </div>
                    <span class="bad">❌ 6 API calls for 1 search!</span>
                </div>
            </div>

            <div class="workspace">
                <div class="search-section">
                    <h4>🔍 Smart Search</h4>
                    <input 
                        type="text" 
                        [(ngModel)]="searchQuery"
                        (ngModelChange)="onSearch($event)"
                        placeholder="Type to search products..."
                        class="search-input"
                    >
                    @if (searching) {
                        <span class="search-indicator">⏳ Searching...</span>
                    }
                </div>

                <div class="stats-section">
                    <h4>📊 Efficiency Stats</h4>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <span class="stat-value">{{ stats.totalKeystrokes }}</span>
                            <span class="stat-label">Total Keystrokes</span>
                        </div>
                        <div class="stat-card success">
                            <span class="stat-value">{{ stats.actualSearches }}</span>
                            <span class="stat-label">Actual API Calls</span>
                        </div>
                        <div class="stat-card warning">
                            <span class="stat-value">{{ stats.cancelledRequests }}</span>
                            <span class="stat-label">Cancelled Requests</span>
                        </div>
                        <div class="stat-card info">
                            <span class="stat-value">{{ savingsPercent }}%</span>
                            <span class="stat-label">Bandwidth Saved</span>
                        </div>
                    </div>
                </div>

                <div class="results-section">
                    <h4>📦 Results ({{ results.length }})</h4>
                    <div class="results-grid">
                        @for (result of results; track result.id) {
                            <div class="result-card">
                                <span class="name">{{ result.name }}</span>
                                <span class="category">{{ result.category }}</span>
                            </div>
                        }
                        @empty {
                            <div class="empty-state">
                                {{ searchQuery ? '🔍 No results found' : '⌨️ Start typing to search' }}
                            </div>
                        }
                    </div>
                </div>

                <div class="log-section">
                    <h4>📜 Request Log</h4>
                    <div class="log-container">
                        @for (log of requestLog; track $index) {
                            <div class="log-entry" [class]="log.type">
                                <span class="time">{{ log.time }}</span>
                                <span class="message">{{ log.message }}</span>
                            </div>
                        }
                    </div>
                    <button (click)="clearLog()" class="btn secondary">Clear Log</button>
                </div>
            </div>

            <div class="code-section">
                <h4>💻 Implementation</h4>
                <pre><code>// Create a Subject for search terms
private searchSubject = new Subject&lt;string&gt;();

// Setup the search pipeline
this.searchSubject.pipe(
    debounceTime(300),           // Wait 300ms after last keystroke
    distinctUntilChanged(),       // Only if search term changed
    tap(() => this.searching = true),
    switchMap(term =>             // Cancel previous, use new
        term.length &lt; 2 
            ? of([])              // Don't search short terms
            : this.search(term).pipe(
                catchError(() => of([]))
              )
    ),
    tap(() => this.searching = false)
).subscribe(results => this.results = results);

// On every keystroke
onSearch(term: string): void {{ '{' }}
    this.searchSubject.next(term);  // Push to stream
{{ '}' }}</code></pre>
            </div>

            <div class="explanation-section">
                <h4>🧠 How It Works</h4>
                <div class="explanation-flow">
                    <div class="flow-item">
                        <code>debounceTime(300)</code>
                        <p>Waits 300ms after user stops typing before emitting</p>
                    </div>
                    <span class="arrow">→</span>
                    <div class="flow-item">
                        <code>distinctUntilChanged()</code>
                        <p>Ignores if term is same as last search</p>
                    </div>
                    <span class="arrow">→</span>
                    <div class="flow-item">
                        <code>switchMap()</code>
                        <p>Cancels previous request, starts new one</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { padding: 1.5rem; max-width: 1000px; margin: 0 auto; }
        .exercise-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .exercise-header h2 { margin: 0; color: var(--text-primary, #f1f5f9); }
        .difficulty { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; }
        .difficulty.complex { background: #f59e0b; color: white; }

        .instructions { background: var(--bg-secondary, #1e293b); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .instructions h3 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .instructions p { color: var(--text-secondary, #cbd5e1); }
        .problem-visual { background: var(--bg-card, #334155); padding: 1rem; border-radius: 6px; margin-top: 0.5rem; }
        .problem-visual span { color: var(--text-secondary, #cbd5e1); }
        .keystroke-demo { margin: 0.5rem 0; font-family: monospace; color: #ef4444; }
        .key { background: #ef4444; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; margin-right: 0.25rem; }
        .bad { color: #ef4444; font-weight: bold; }

        .workspace { background: var(--bg-secondary, #1e293b); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }

        .search-section { margin-bottom: 1.5rem; }
        .search-section h4 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .search-input { width: 100%; padding: 1rem; font-size: 1rem; border: 2px solid #667eea; border-radius: 8px; background: var(--bg-card, #334155); color: var(--text-primary, #f1f5f9); }
        .search-input:focus { outline: none; border-color: #764ba2; }
        .search-indicator { display: block; margin-top: 0.5rem; color: #667eea; }

        .stats-section { margin-bottom: 1.5rem; }
        .stats-section h4 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .stat-card { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; text-align: center; }
        .stat-card.success { border-left: 4px solid #10b981; }
        .stat-card.warning { border-left: 4px solid #f59e0b; }
        .stat-card.info { border-left: 4px solid #667eea; }
        .stat-value { display: block; font-size: 2rem; font-weight: bold; color: var(--text-primary, #f1f5f9); }
        .stat-label { color: var(--text-muted, #94a3b8); font-size: 0.8rem; }

        .results-section { margin-bottom: 1.5rem; }
        .results-section h4 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem; }
        .result-card { background: var(--bg-card, #334155); padding: 0.75rem; border-radius: 6px; }
        .result-card .name { display: block; color: var(--text-primary, #f1f5f9); font-weight: 500; }
        .result-card .category { color: var(--text-muted, #94a3b8); font-size: 0.8rem; }
        .empty-state { text-align: center; padding: 2rem; color: var(--text-muted, #94a3b8); }

        .log-section { margin-bottom: 1.5rem; }
        .log-section h4 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .log-container { max-height: 150px; overflow-y: auto; background: #0f172a; padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; }
        .log-entry { padding: 0.25rem 0.5rem; font-family: monospace; font-size: 0.75rem; border-radius: 4px; margin-bottom: 0.25rem; }
        .log-entry.keystroke { color: #94a3b8; }
        .log-entry.search { color: #10b981; }
        .log-entry.cancelled { color: #f59e0b; }
        .log-entry .time { margin-right: 0.5rem; color: #667eea; }

        .btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .btn.secondary { background: var(--bg-card, #334155); color: var(--text-primary, #f1f5f9); }

        .code-section, .explanation-section { background: var(--bg-secondary, #1e293b); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .code-section h4, .explanation-section h4 { margin: 0 0 1rem 0; color: var(--text-primary, #f1f5f9); }
        pre { background: #0f172a; color: #4ade80; padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.75rem; margin: 0; }

        .explanation-flow { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .flow-item { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; flex: 1; min-width: 150px; }
        .flow-item code { color: #667eea; font-size: 0.85rem; }
        .flow-item p { margin: 0.5rem 0 0 0; color: var(--text-secondary, #cbd5e1); font-size: 0.8rem; }
        .arrow { color: #667eea; font-weight: bold; font-size: 1.5rem; }

        @media (max-width: 768px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .explanation-flow { flex-direction: column; }
            .arrow { transform: rotate(90deg); }
        }
    `]
})
export class Scenario7TypeaheadComponent implements OnInit, OnDestroy {
    searchQuery = '';
    searching = false;
    results: SearchResult[] = [];

    stats: SearchStats = {
        totalKeystrokes: 0,
        actualSearches: 0,
        cancelledRequests: 0
    };

    requestLog: { time: string; message: string; type: string }[] = [];

    private searchSubject = new Subject<string>();
    private subscription: Subscription | null = null;
    private currentSearchId = 0;

    // Sample data to search through
    private allProducts: SearchResult[] = [
        { id: 1, name: 'Gaming Laptop', category: 'Electronics' },
        { id: 2, name: 'Laptop Stand', category: 'Accessories' },
        { id: 3, name: 'Laptop Bag', category: 'Bags' },
        { id: 4, name: 'Wireless Mouse', category: 'Electronics' },
        { id: 5, name: 'Mechanical Keyboard', category: 'Electronics' },
        { id: 6, name: 'USB Hub', category: 'Accessories' },
        { id: 7, name: 'Monitor 27"', category: 'Electronics' },
        { id: 8, name: 'Webcam HD', category: 'Electronics' },
        { id: 9, name: 'Headphones', category: 'Audio' },
        { id: 10, name: 'Desk Lamp', category: 'Office' }
    ];

    get savingsPercent(): number {
        if (this.stats.totalKeystrokes === 0) return 0;
        const saved = this.stats.totalKeystrokes - this.stats.actualSearches;
        return Math.round((saved / this.stats.totalKeystrokes) * 100);
    }

    /**
     * 🔧 ngOnInit - Setup the search pipeline
     * 
     * This is where we create the RxJS stream that handles:
     * - Debouncing (waiting for user to stop typing)
     * - Deduplication (not searching same term twice)
     * - Request cancellation (switchMap)
     */
    ngOnInit(): void {
        this.subscription = this.searchSubject.pipe(
            // Add slight delay to simulate real typing
            tap(() => {
                this.log('Keystroke received', 'keystroke');
            }),

            // DEBOUNCE: Wait 300ms after last keystroke
            // This prevents API call on every keystroke
            debounceTime(300),

            // DISTINCT: Only proceed if term actually changed
            // Handles cases like: typing "a", backspace, "a" again
            distinctUntilChanged(),

            // Show loading state
            tap(term => {
                if (term.length >= 2) {
                    this.searching = true;
                    this.log(`Searching for "${term}"...`, 'search');
                }
            }),

            // SWITCHMAP: Cancel previous request, start new one
            // This is the key to avoiding stale results
            switchMap(term => {
                const searchId = ++this.currentSearchId;

                if (term.length < 2) {
                    return of([]);
                }

                this.stats.actualSearches++;

                return this.simulateSearch(term).pipe(
                    // Check if this search is still current
                    map(results => {
                        if (searchId !== this.currentSearchId) {
                            this.stats.cancelledRequests++;
                            this.log('Request cancelled (newer search)', 'cancelled');
                            return this.results; // Return current results, don't update
                        }
                        return results;
                    }),
                    catchError(() => of([]))
                );
            }),

            // Hide loading state
            finalize(() => this.searching = false)
        ).subscribe(results => {
            this.results = results;
            this.searching = false;
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    /**
     * Called on every keystroke
     * Simply pushes the term to the Subject - the pipeline handles the rest
     */
    onSearch(term: string): void {
        this.stats.totalKeystrokes++;
        this.searchSubject.next(term);
    }

    clearLog(): void {
        this.requestLog = [];
    }

    private log(message: string, type: string): void {
        const time = new Date().toLocaleTimeString();
        this.requestLog.unshift({ time, message, type });
        if (this.requestLog.length > 20) {
            this.requestLog.pop();
        }
    }

    /**
     * Simulates an API call with network delay
     */
    private simulateSearch(term: string) {
        const filtered = this.allProducts.filter(p =>
            p.name.toLowerCase().includes(term.toLowerCase())
        );
        // Simulate network delay of 500-1000ms
        const networkDelay = 500 + Math.random() * 500;
        return of(filtered).pipe(delay(networkDelay));
    }
}
