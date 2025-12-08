/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: TYPEAHEAD SEARCH
 * ============================================================================
 */

import { Component, signal, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
}

@Component({
    selector: 'app-scenario-1-typeahead',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Typeahead Search</h2>
                <p>Build an autocomplete with debouncing and cancellation.</p>
            </div>

            <div class="content">
                <div class="search-box">
                    <input 
                        type="text"
                        placeholder="Search users..."
                        (input)="onSearch($event)"
                        [value]="searchTerm()">
                    @if (loading()) {
                        <span class="spinner">🔄</span>
                    }
                </div>

                <div class="pipeline">
                    <span class="step">Input</span>
                    <span class="arrow">→</span>
                    <span class="step" [class.active]="searchTerm().length > 0">debounceTime(300)</span>
                    <span class="arrow">→</span>
                    <span class="step" [class.active]="searchTerm().length >= 2">filter(len >= 2)</span>
                    <span class="arrow">→</span>
                    <span class="step">distinctUntilChanged</span>
                    <span class="arrow">→</span>
                    <span class="step" [class.active]="loading()">switchMap(API)</span>
                </div>

                @if (results().length > 0) {
                    <div class="results">
                        <h4>Results ({{ results().length }})</h4>
                        @for (user of results(); track user.id) {
                            <div class="result-item" (click)="selectUser(user)">
                                <strong>{{ user.name }}</strong>
                                <span>&#64;{{ user.username }}</span>
                            </div>
                        }
                    </div>
                }

                @if (selectedUser()) {
                    <div class="selected">
                        <h4>Selected User</h4>
                        <p><strong>{{ selectedUser()?.name }}</strong></p>
                        <p>{{ selectedUser()?.email }}</p>
                    </div>
                }

                @if (error()) {
                    <div class="error">{{ error() }}</div>
                }

                <div class="stats">
                    <span>Keystrokes: {{ keystrokeCount() }}</span>
                    <span>API Calls: {{ apiCallCount() }}</span>
                    <span>Calls Saved: {{ keystrokeCount() - apiCallCount() }}</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 600px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .search-box { position: relative; margin-bottom: 1rem; }
        .search-box input { width: 100%; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; }
        .search-box input:focus { outline: none; border-color: #f59e0b; }
        .spinner { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
        .pipeline { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; }
        .step { padding: 0.25rem 0.5rem; background: #334155; color: #94a3b8; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
        .step.active { background: #f59e0b; color: white; }
        .arrow { color: #6b7280; }
        .results { padding: 0.5rem 0; }
        .results h4 { margin: 0 0 0.5rem; }
        .result-item { display: flex; justify-content: space-between; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; cursor: pointer; }
        .result-item:hover { background: #f59e0b; color: white; }
        .result-item span { font-size: 0.85rem; color: #6b7280; }
        .result-item:hover span { color: rgba(255,255,255,0.8); }
        .selected { padding: 1rem; background: #f0fdf4; border-radius: 8px; margin-top: 1rem; }
        .selected h4 { margin: 0 0 0.5rem; color: #10b981; }
        .error { padding: 1rem; background: #fef2f2; color: #dc2626; border-radius: 8px; margin-top: 1rem; }
        .stats { display: flex; justify-content: space-around; padding: 1rem; background: #f8fafc; border-radius: 8px; margin-top: 1rem; font-size: 0.85rem; }
    `]
})
export class Scenario1TypeaheadComponent implements OnDestroy {
    private http = inject(HttpClient);
    private searchSubject = new Subject<string>();
    private subscription: Subscription;

    searchTerm = signal('');
    results = signal<User[]>([]);
    selectedUser = signal<User | null>(null);
    loading = signal(false);
    error = signal('');
    keystrokeCount = signal(0);
    apiCallCount = signal(0);

    constructor() {
        this.subscription = this.searchSubject.pipe(
            tap(() => this.keystrokeCount.update(n => n + 1)),
            debounceTime(300),
            filter(term => term.length >= 2),
            distinctUntilChanged(),
            tap(() => {
                this.loading.set(true);
                this.apiCallCount.update(n => n + 1);
            }),
            switchMap(term =>
                this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users?name_like=${term}`).pipe(
                    catchError(err => {
                        this.error.set('Search failed');
                        return of([]);
                    })
                )
            )
        ).subscribe({
            next: (users) => {
                this.results.set(users);
                this.loading.set(false);
            }
        });
    }

    onSearch(event: Event): void {
        const term = (event.target as HTMLInputElement).value;
        this.searchTerm.set(term);
        this.error.set('');

        if (term.length < 2) {
            this.results.set([]);
        }

        this.searchSubject.next(term);
    }

    selectUser(user: User): void {
        this.selectedUser.set(user);
        this.results.set([]);
        this.searchTerm.set(user.name);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
