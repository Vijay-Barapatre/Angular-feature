import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';

import { loadUsers, clearUsers } from './store/user.actions';
import { selectAllUsers, selectUserLoading, selectUserError, selectUserCount } from './store/user.selectors';

@Component({
    selector: 'app-effects-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, AsyncPipe, JsonPipe],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/ngrx" class="back-link">← Back to NgRx Overview</a>
                <h1>⚡ Use Case 2: Effects</h1>
                <p>Handling Side Effects (API Calls) with NgRx Effects</p>
            </header>

            <div class="content-wrapper">
                <!-- ACTIONS -->
                <div class="controls-panel">
                    <button class="btn load" 
                            [class.loading]="(loading$ | async)"
                            [disabled]="(loading$ | async)"
                            (click)="loadData()">
                        <span class="spinner" *ngIf="(loading$ | async)">↻</span>
                        {{ (loading$ | async) ? 'Fetching Data...' : 'Load Users from API' }}
                    </button>
                    
                    <button class="btn clear" (click)="clearData()">
                        Clear Data
                    </button>

                    <p class="hint">Includes simulated delay and 20% error chance!</p>
                </div>

                <!-- ERROR STATE -->
                <div *ngIf="error$ | async as error" class="alert error">
                    <strong>❌ Error:</strong> {{ error }}
                    <button class="retry-link" (click)="loadData()">Retry?</button>
                </div>

                <!-- DATA DISPLAY -->
                <div class="data-panel">
                    <div class="panel-header">
                        <h3>Users List</h3>
                        <span class="badge" *ngIf="count$ | async as count">{{ count }} Found</span>
                    </div>

                    <div class="list-container" *ngIf="users$ | async as users">
                        <div *ngIf="users.length === 0 && !(loading$ | async) && !(error$ | async)" class="empty-state">
                            No data loaded. Click "Load Users" to start.
                        </div>

                        <div *ngFor="let user of users" class="user-card">
                            <div class="avatar">{{ user.name.charAt(0) }}</div>
                            <div class="user-info">
                                <span class="name">{{ user.name }}</span>
                                <span class="role">{{ user.role }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
        h1 { color: #f8fafc; margin: 0.5rem 0; }
        p { color: #94a3b8; }

        .controls-panel {
            background: #1e293b;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 2rem;
            border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .btn {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            margin: 0 0.5rem;
            transition: all 0.2s;
        }

        .load { background: #3b82f6; color: white; }
        .load:hover:not(:disabled) { background: #2563eb; transform: translateY(-2px); }
        .load:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .clear { background: #334155; color: #cbd5e1; }
        .clear:hover { background: #475569; }

        .hint { color: #64748b; font-size: 0.85rem; margin-top: 1rem; }

        .spinner { display: inline-block; animation: spin 1s linear infinite; margin-right: 5px; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .alert.error {
            background: rgba(239, 68, 68, 0.1);
            color: #fca5a5;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            border: 1px solid rgba(239, 68, 68, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .retry-link {
            background: none;
            border: none;
            color: #ef4444;
            text-decoration: underline;
            cursor: pointer;
            font-weight: bold;
        }

        .data-panel {
            background: #1e293b;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .panel-header {
            padding: 1rem 1.5rem;
            background: rgba(148, 163, 184, 0.05);
            border-bottom: 1px solid rgba(148, 163, 184, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .panel-header h3 { margin: 0; color: #f8fafc; }
        .badge { background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; }

        .list-container { padding: 1.5rem; }
        .empty-state { text-align: center; color: #64748b; padding: 2rem; font-style: italic; }

        .user-card {
            display: flex;
            align-items: center;
            padding: 1rem;
            background: #0f172a;
            border-radius: 8px;
            margin-bottom: 0.75rem;
            transition: transform 0.2s;
        }

        .user-card:hover { transform: translateX(5px); background: #1a2336; }

        .avatar {
            width: 40px;
            height: 40px;
            background: #ba2bd2;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 1rem;
        }

        .user-info { display: flex; flex-direction: column; }
        .name { color: #e2e8f0; font-weight: 500; }
        .role { color: #94a3b8; font-size: 0.85rem; }
    `]
})
export class EffectsDemoComponent {
    private store = inject(Store);

    users$ = this.store.select(selectAllUsers);
    loading$ = this.store.select(selectUserLoading);
    error$ = this.store.select(selectUserError);
    count$ = this.store.select(selectUserCount);

    loadData() {
        this.store.dispatch(loadUsers());
    }

    clearData() {
        this.store.dispatch(clearUsers());
    }
}
