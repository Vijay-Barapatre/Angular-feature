/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: DEBOUNCE INPUT
 * ============================================================================
 */

import { Component, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Directive({
    selector: '[appDebounce]',
    standalone: true
})
export class DebounceDirective implements OnDestroy {
    @Input() debounceTime = 300;
    @Output() debounceEvent = new EventEmitter<string>();

    private subject = new Subject<string>();
    private destroy$ = new Subject<void>();

    constructor(private el: ElementRef) {
        this.subject.pipe(
            debounceTime(this.debounceTime),
            takeUntil(this.destroy$)
        ).subscribe(value => {
            this.debounceEvent.emit(value);
        });
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string): void {
        this.subject.next(value);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

@Component({
    selector: 'app-scenario-5-debounce',
    standalone: true,
    imports: [CommonModule, DebounceDirective],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Debounce Input</h2>
                <p>Debounce user input for search/API calls.</p>
            </div>

            <div class="content">
                <div class="search-box">
                    <input 
                        appDebounce 
                        [debounceTime]="debounceMs()"
                        (debounceEvent)="onSearch($event)"
                        placeholder="Start typing to search...">
                </div>

                <div class="debounce-config">
                    <label>Debounce time: {{ debounceMs() }}ms</label>
                    <input type="range" min="100" max="1000" step="100" 
                        [value]="debounceMs()" 
                        (input)="debounceMs.set(+$any($event.target).value)">
                </div>

                <div class="results">
                    <h4>Search Results</h4>
                    <p>Query: "{{ lastQuery() }}"</p>
                    <p>API calls: {{ apiCallCount() }}</p>
                    <p>Keystrokes: {{ keystrokeCount() }}</p>
                    <p class="savings">Saved {{ keystrokeCount() - apiCallCount() }} API calls!</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .search-box { margin-bottom: 1rem; }
        .search-box input { width: 100%; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; }
        .debounce-config { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .debounce-config label { display: block; margin-bottom: 0.5rem; }
        .debounce-config input { width: 100%; }
        .results { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .results h4 { margin: 0 0 0.5rem; }
        .results p { margin: 0.25rem 0; }
        .savings { color: #10b981; font-weight: 500; }
    `]
})
export class Scenario5DebounceComponent {
    debounceMs = signal(300);
    lastQuery = signal('');
    apiCallCount = signal(0);
    keystrokeCount = signal(0);

    onSearch(query: string): void {
        this.lastQuery.set(query);
        this.apiCallCount.update(n => n + 1);
        this.keystrokeCount.update(n => n + query.length > 0 ? n + 1 : n);
    }
}
