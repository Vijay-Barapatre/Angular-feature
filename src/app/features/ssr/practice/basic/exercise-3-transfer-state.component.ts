/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: TRANSFER STATE BASICS
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn to use TransferState to share data between server and client,
 * preventing duplicate API calls.
 * 
 * 📝 DESCRIPTION:
 * You are building a user profile component that fetches user data.
 * Without TransferState, the data would be fetched twice - once on
 * server and once on client. Your job is to cache it.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Data fetched only once (on server)
 * 2. Client uses cached data from TransferState
 * 3. Cache is removed after consumption
 * 4. API call count stays at 1 (not 2)
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Create a StateKey using makeStateKey
 * - Store data in TransferState on server
 * - Retrieve and consume data on client
 * - Remove cached data after use
 */

import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';

// Mock user interface
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

// TODO: Create a StateKey for the user data
// const USER_KEY = makeStateKey<User>('user-data');

@Component({
    selector: 'app-exercise-transfer-state',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise-container">
            <h2>📦 Exercise 3: Transfer State Basics</h2>
            
            <div class="objective-card">
                <h3>📋 Objective</h3>
                <p>
                    Implement TransferState to cache data between server and client,
                    preventing duplicate API calls.
                </p>
            </div>

            <div class="task-section">
                <h3>🎯 Tasks</h3>
                <div class="task" [class.completed]="task1Complete">
                    <span class="checkbox">{{ task1Complete ? '✅' : '⬜' }}</span>
                    <span>Task 1: Create StateKey using makeStateKey</span>
                </div>
                <div class="task" [class.completed]="task2Complete">
                    <span class="checkbox">{{ task2Complete ? '✅' : '⬜' }}</span>
                    <span>Task 2: Check TransferState for cached data</span>
                </div>
                <div class="task" [class.completed]="task3Complete">
                    <span class="checkbox">{{ task3Complete ? '✅' : '⬜' }}</span>
                    <span>Task 3: Store data on server, remove on client</span>
                </div>
            </div>

            <div class="implementation-section">
                <h3>🔨 Your Implementation</h3>
                
                <div class="stats-row">
                    <div class="stat-card">
                        <span class="stat-value">{{ apiCallCount }}</span>
                        <span class="stat-label">API Calls</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">{{ dataSource }}</span>
                        <span class="stat-label">Data Source</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">{{ platform }}</span>
                        <span class="stat-label">Platform</span>
                    </div>
                </div>
                
                <div class="result-card">
                    <h4>User Data</h4>
                    <div class="user-info" *ngIf="user">
                        <p><strong>ID:</strong> {{ user.id }}</p>
                        <p><strong>Name:</strong> {{ user.name }}</p>
                        <p><strong>Email:</strong> {{ user.email }}</p>
                        <p><strong>Role:</strong> {{ user.role }}</p>
                    </div>
                    <div class="no-data" *ngIf="!user">
                        No user data loaded
                    </div>
                </div>

                <div class="actions">
                    <button (click)="loadUser()" [disabled]="loading">
                        {{ loading ? 'Loading...' : 'Load User Data' }}
                    </button>
                    <button (click)="reset()">Reset</button>
                </div>
            </div>

            <div class="hints-section">
                <h3>💡 Hints</h3>
                <details>
                    <summary>Hint 1: Creating a StateKey</summary>
                    <pre><code>const USER_KEY = makeStateKey&lt;User&gt;('user-data');</code></pre>
                </details>
                <details>
                    <summary>Hint 2: Checking for cached data</summary>
                    <pre><code>const cached = this.transferState.get(USER_KEY, null);
if (cached) {{ '{' }}
    this.user = cached;
    this.transferState.remove(USER_KEY); // Clean up!
    this.dataSource = 'cache';
{{ '}' }}</code></pre>
                </details>
                <details>
                    <summary>Hint 3: Storing on server</summary>
                    <pre><code>if (isPlatformServer(this.platformId)) {{ '{' }}
    this.transferState.set(USER_KEY, userData);
{{ '}' }}</code></pre>
                </details>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
        h2 { color: var(--text-primary, #1f2937); border-bottom: 2px solid #6366f1; padding-bottom: 0.5rem; }
        
        .objective-card { background: #ede9fe; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .objective-card h3 { margin: 0 0 0.5rem; color: #6d28d9; }
        .objective-card p { margin: 0; color: #4c1d95; }
        
        .task-section { margin-bottom: 1.5rem; }
        .task { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--bg-secondary, #f8fafc); border-radius: 4px; margin-bottom: 0.25rem; }
        .task.completed { background: #d1fae5; }
        
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
        .stat-card { padding: 1rem; background: var(--bg-secondary, #f8fafc); border-radius: 8px; text-align: center; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: bold; color: #6366f1; }
        .stat-label { font-size: 0.8rem; color: var(--text-secondary, #64748b); }
        
        .result-card { background: var(--bg-secondary, #f8fafc); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .result-card h4 { margin: 0 0 0.75rem; }
        .user-info p { margin: 0.25rem 0; }
        .no-data { color: var(--text-secondary, #64748b); font-style: italic; }
        
        .actions { display: flex; gap: 0.5rem; }
        .actions button { padding: 0.75rem 1.5rem; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .actions button:disabled { opacity: 0.6; cursor: not-allowed; }
        .actions button:last-child { background: transparent; border: 2px solid var(--border-color, #e2e8f0); color: var(--text-secondary, #64748b); }
        
        .hints-section { background: #fef3c7; padding: 1rem; border-radius: 8px; border: 1px solid #f59e0b; margin-top: 1.5rem; }
        .hints-section h3 { margin: 0 0 0.75rem; color: #92400e; }
        details { margin-bottom: 0.5rem; }
        summary { cursor: pointer; padding: 0.5rem; background: white; border-radius: 4px; }
        details pre { margin: 0.5rem 0 0; padding: 0.75rem; background: #1e293b; border-radius: 4px; overflow-x: auto; }
        details code { color: #e879f9; font-size: 0.85rem; }
    `]
})
export class ExerciseTransferStateComponent implements OnInit {
    // TODO: Inject TransferState and PLATFORM_ID
    // private transferState = inject(TransferState);
    // private platformId = inject(PLATFORM_ID);

    user: User | null = null;
    loading = false;
    apiCallCount = 0;
    dataSource = 'none';
    platform = 'unknown';

    task1Complete = false;
    task2Complete = false;
    task3Complete = false;

    ngOnInit(): void {
        // TODO: Set platform
        // this.platform = isPlatformBrowser(this.platformId) ? 'Browser' : 'Server';

        // TODO: Check TransferState for cached data
        // const cached = this.transferState.get(USER_KEY, null);
        // if (cached) { ... }

        this.checkTasks();
    }

    /**
     * TODO: Implement this method
     * 
     * 1. Check TransferState first
     * 2. If cached data exists, use it and remove from state
     * 3. If no cache, simulate API call
     * 4. On server, store result in TransferState
     */
    loadUser(): void {
        this.loading = true;

        // TODO: Check for cached data first
        // const cached = this.transferState.get(USER_KEY, null);

        // Simulate API call
        setTimeout(() => {
            this.apiCallCount++;
            this.user = this.mockFetchUser();
            this.dataSource = 'api';
            this.loading = false;

            // TODO: On server, store in TransferState
            // if (isPlatformServer(this.platformId)) {
            //     this.transferState.set(USER_KEY, this.user);
            // }
        }, 500);
    }

    reset(): void {
        this.user = null;
        this.apiCallCount = 0;
        this.dataSource = 'none';
    }

    private mockFetchUser(): User {
        return {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin'
        };
    }

    private checkTasks(): void {
        // Would check actual implementation
        this.task1Complete = false;
        this.task2Complete = false;
        this.task3Complete = false;
    }
}
