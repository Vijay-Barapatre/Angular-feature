/**
 * ============================================================================
 * USE CASE 7: OBSERVING FORM CHANGES IN TEMPLATE-DRIVEN FORMS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * Template-Driven Forms also expose valueChanges and statusChanges observables!
 * The key is accessing them via ViewChild after the view initializes.
 * 
 * KEY DIFFERENCE FROM REACTIVE FORMS:
 * - Reactive: Access observables immediately (form is created in TS)
 * - Template: Use @ViewChild + AfterViewInit (form is created in template)
 */

import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-value-changes',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    template: `
        <div class="form-container">
            <h1>📡 Use Case 7: Observing Form Changes</h1>
            <p class="desc">
                React to value and status changes using RxJS observables.
            </p>

            <form #searchForm="ngForm">
                <div class="form-group">
                    <label>Search Query (Debounced)</label>
                    <input 
                        type="text" 
                        name="query" 
                        [(ngModel)]="model.query"
                        placeholder="Type to search..."
                    >
                    <small>Debounced by 300ms before logging</small>
                </div>

                <div class="form-group">
                    <label>Email (Status Changes)</label>
                    <input 
                        type="email" 
                        name="email" 
                        [(ngModel)]="model.email"
                        required
                        email
                    >
                    <div class="status-badge" [class]="currentStatus">
                        Status: {{ currentStatus }}
                    </div>
                </div>

                <div class="form-group">
                    <label>Theme</label>
                    <select name="theme" [(ngModel)]="model.theme">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                    </select>
                </div>
            </form>

            <!-- Logs Section -->
            <div class="logs-section">
                <div class="log-panel">
                    <h3>🔍 Value Changes Log</h3>
                    <div class="log-entries">
                        @for (entry of valueLog; track $index) {
                            <div class="log-entry">{{ entry }}</div>
                        }
                        @empty {
                            <div class="empty">Type to see value changes...</div>
                        }
                    </div>
                </div>

                <div class="log-panel">
                    <h3>📊 Status Changes Log</h3>
                    <div class="log-entries">
                        @for (entry of statusLog; track $index) {
                            <div class="log-entry" [class]="entry.includes('VALID') ? 'valid' : 'invalid'">
                                {{ entry }}
                            </div>
                        }
                        @empty {
                            <div class="empty">Modify email to see status changes...</div>
                        }
                    </div>
                </div>
            </div>

            <!-- Key Concepts -->
            <div class="info-box">
                <h4>💡 Key Points</h4>
                <ul>
                    <li><code>&#64;ViewChild('formName')</code> to access NgForm</li>
                    <li><code>ngAfterViewInit()</code> - form is ready here</li>
                    <li><code>form.valueChanges</code> - Observable of all values</li>
                    <li><code>form.statusChanges</code> - Observable of VALID/INVALID</li>
                    <li><strong>Always unsubscribe</strong> in ngOnDestroy!</li>
                </ul>
            </div>

            <a routerLink="/template-forms" class="back-link">← Back to Overview</a>
        </div>
    `,
    styles: [`
        .form-container {
            max-width: 700px;
            margin: 30px auto;
            padding: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }

        input, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            box-sizing: border-box;
        }

        small { color: #6b7280; font-size: 0.85rem; }

        .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            font-family: monospace;
        }
        .status-badge.VALID { background: #dcfce7; color: #166534; }
        .status-badge.INVALID { background: #fee2e2; color: #b91c1c; }
        .status-badge.PENDING { background: #e0f2fe; color: #0369a1; }

        .logs-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .log-panel {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
        }
        .log-panel h3 { margin: 0 0 0.75rem; font-size: 1rem; color: #667eea; }
        .log-entries { max-height: 200px; overflow-y: auto; }
        .log-entry {
            padding: 0.5rem;
            border-bottom: 1px solid #e0e0e0;
            font-family: monospace;
            font-size: 0.8rem;
            word-break: break-all;
        }
        .log-entry.valid { color: #166534; }
        .log-entry.invalid { color: #b91c1c; }
        .empty { color: #9ca3af; font-style: italic; }

        .info-box {
            background: #eff6ff;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        .info-box h4 { margin: 0 0 0.5rem; color: #3b82f6; }
        .info-box ul { margin: 0; padding-left: 1.5rem; }
        .info-box li { margin-bottom: 0.25rem; }
        .info-box code { background: #dbeafe; padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.85rem; }

        .back-link {
            display: block;
            margin-top: 20px;
            text-align: center;
            color: var(--primary-color);
            text-decoration: none;
        }
    `]
})
export class ValueChangesComponent implements AfterViewInit, OnDestroy {
    /**
     * KEY CONCEPT: Use @ViewChild to access the NgForm directive
     * The form reference isn't available until AfterViewInit
     */
    @ViewChild('searchForm') searchForm!: NgForm;

    model = {
        query: '',
        email: '',
        theme: 'light'
    };

    valueLog: string[] = [];
    statusLog: string[] = [];
    currentStatus = 'INVALID';

    private subscriptions: Subscription[] = [];

    /**
     * ngAfterViewInit - The form is now available!
     * 
     * In Template-Driven forms, the NgForm and NgModel directives
     * are created by Angular when parsing the template. They're not
     * available in ngOnInit - only after the view initializes.
     */
    ngAfterViewInit(): void {
        // Need setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => this.setupSubscriptions());
    }

    private setupSubscriptions(): void {
        // Subscribe to valueChanges with debounce
        const valueSub = this.searchForm.valueChanges!.pipe(
            debounceTime(300),
            distinctUntilChanged((prev, curr) =>
                JSON.stringify(prev) === JSON.stringify(curr)
            )
        ).subscribe(value => {
            const timestamp = new Date().toLocaleTimeString();
            this.valueLog.unshift(`${timestamp}: ${JSON.stringify(value)}`);
            if (this.valueLog.length > 10) this.valueLog.pop();
        });
        this.subscriptions.push(valueSub);

        // Subscribe to statusChanges
        const statusSub = this.searchForm.statusChanges!.subscribe(status => {
            this.currentStatus = status;
            const timestamp = new Date().toLocaleTimeString();
            this.statusLog.unshift(`${timestamp}: ${status}`);
            if (this.statusLog.length > 10) this.statusLog.pop();
        });
        this.subscriptions.push(statusSub);
    }

    /**
     * CRITICAL: Always unsubscribe to prevent memory leaks!
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
