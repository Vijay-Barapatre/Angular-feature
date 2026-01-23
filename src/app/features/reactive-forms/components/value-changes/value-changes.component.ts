/**
 * ============================================================================
 * VALUE CHANGES & STATUS OBSERVABLES
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Reactive Forms are truly REACTIVE! Every FormControl and FormGroup exposes
 * Observables for value changes and status changes. Use RxJS to react!
 * 
 * KEY OBSERVABLES:
 * - valueChanges: Observable<any> - Emits on every value change
 * - statusChanges: Observable<string> - Emits 'VALID', 'INVALID', 'PENDING'
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-value-changes',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <h1>📡 Value Changes & Status</h1>
            <p class="description">React to form changes using RxJS Observables.</p>

            <form [formGroup]="searchForm" class="form">
                <div class="form-group">
                    <label for="search">Search (debounced)</label>
                    <input 
                        id="search" 
                        type="text" 
                        formControlName="search"
                        placeholder="Type to search...">
                </div>

                <div class="form-group">
                    <label for="email">Email (with status)</label>
                    <input 
                        id="email" 
                        type="email" 
                        formControlName="email"
                        placeholder="your@email.com">
                    <div class="status-badge" [class]="emailStatus.toLowerCase()">
                        Status: {{ emailStatus }}
                    </div>
                </div>
            </form>

            <div class="logs">
                <div class="log-section">
                    <h3>🔍 Search Log (debounced 300ms)</h3>
                    <div class="log-entries">
                        @for (entry of searchLog; track $index) {
                            <div class="log-entry">{{ entry }}</div>
                        }
                        @empty {
                            <div class="empty">Type to see debounced values...</div>
                        }
                    </div>
                </div>

                <div class="log-section">
                    <h3>📧 Email Status Changes</h3>
                    <div class="log-entries">
                        @for (entry of statusLog; track $index) {
                            <div class="log-entry" [class]="entry.includes('VALID') ? 'valid' : 'invalid'">
                                {{ entry }}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div class="info">
                <h3>💡 Key Concepts</h3>
                <ul>
                    <li><code>valueChanges</code> - Emits on every value change</li>
                    <li><code>statusChanges</code> - Emits VALID, INVALID, PENDING</li>
                    <li>Use <code>debounceTime</code> to limit API calls</li>
                    <li>Use <code>distinctUntilChanged</code> to skip duplicates</li>
                    <li><strong>Always unsubscribe</strong> in ngOnDestroy!</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333; }
        .form-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
        }

        .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
            margin-top: 0.5rem;
        }
        .status-badge.valid { background: #dcfce7; color: #166534; }
        .status-badge.invalid { background: #fee2e2; color: #b91c1c; }
        .status-badge.pending { background: #e0f2fe; color: #0369a1; }

        .logs { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .log-section { background: #f8f9fa; padding: 1rem; border-radius: 8px; }
        .log-section h3 { margin-top: 0; font-size: 1rem; color: #667eea; }
        .log-entries { max-height: 200px; overflow-y: auto; }
        .log-entry { padding: 0.5rem; border-bottom: 1px solid #e0e0e0; font-family: monospace; font-size: 0.85rem; }
        .log-entry.valid { color: #166534; }
        .log-entry.invalid { color: #b91c1c; }
        .empty { color: #888; font-style: italic; }

        .info { background: #e0f2fe; padding: 1.5rem; border-radius: 12px; }
        .info h3 { margin-top: 0; color: #0369a1; }
        .info ul { margin: 0; padding-left: 1.5rem; }
        .info li { margin-bottom: 0.5rem; }
        .info code { background: #0369a1; color: white; padding: 0.1rem 0.4rem; border-radius: 4px; }
    `]
})
export class ValueChangesComponent implements OnInit, OnDestroy {
    searchForm!: FormGroup;
    searchLog: string[] = [];
    statusLog: string[] = [];
    emailStatus = 'INVALID';

    private subscriptions: Subscription[] = [];

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            search: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email])
        });

        /**
         * VALUE CHANGES WITH DEBOUNCE
         * 
         * Perfect for search-as-you-type!
         * - debounceTime: Wait for pause in typing
         * - distinctUntilChanged: Skip if value didn't change
         */
        const searchSub = this.searchForm.get('search')!.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(value => {
            const timestamp = new Date().toLocaleTimeString();
            this.searchLog.unshift(`${timestamp}: "${value}"`);
            if (this.searchLog.length > 10) this.searchLog.pop();
        });
        this.subscriptions.push(searchSub);

        /**
         * STATUS CHANGES
         * 
         * React to validation status changes.
         */
        const statusSub = this.searchForm.get('email')!.statusChanges.subscribe(status => {
            this.emailStatus = status;
            const timestamp = new Date().toLocaleTimeString();
            this.statusLog.unshift(`${timestamp}: ${status}`);
            if (this.statusLog.length > 10) this.statusLog.pop();
        });
        this.subscriptions.push(statusSub);
    }

    /**
     * 🛡️ CRITICAL: Always unsubscribe to prevent memory leaks!
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
