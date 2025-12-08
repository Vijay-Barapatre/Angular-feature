/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: SUBJECTS
 * ============================================================================
 */

import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exercise-3-subjects',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Subjects</h2>
                <p>Understand different types of Subjects for multicasting.</p>
            </div>

            <div class="demo">
                <div class="subjects-grid">
                    <div class="subject-card">
                        <h4>Subject</h4>
                        <p>No initial value, emit to all subscribers</p>
                        <div class="input-row">
                            <input [(ngModel)]="subjectValue" placeholder="Enter value">
                            <button (click)="emitSubject()">Emit</button>
                        </div>
                        <div class="subscribers">
                            <div class="sub">Sub 1: {{ subject1Value() }}</div>
                            <div class="sub">Sub 2: {{ subject2Value() }}</div>
                        </div>
                    </div>

                    <div class="subject-card">
                        <h4>BehaviorSubject</h4>
                        <p>Has initial value, new subs get last value</p>
                        <div class="input-row">
                            <input [(ngModel)]="behaviorValue" placeholder="Enter value">
                            <button (click)="emitBehavior()">Emit</button>
                        </div>
                        <button class="small" (click)="addBehaviorSub()">Add Subscriber</button>
                        <div class="subscribers">
                            @for (val of behaviorValues(); track val.id) {
                                <div class="sub">Sub {{ val.id }}: {{ val.value }}</div>
                            }
                        </div>
                    </div>

                    <div class="subject-card">
                        <h4>ReplaySubject</h4>
                        <p>Replays last N values to new subscribers</p>
                        <button (click)="emitReplay()">Emit Random</button>
                        <button class="small" (click)="addReplaySub()">Add Subscriber</button>
                        <div class="history">History: {{ replayHistory() }}</div>
                        <div class="subscribers">
                            @for (val of replayValues(); track val.id) {
                                <div class="sub">Sub {{ val.id }}: {{ val.values }}</div>
                            }
                        </div>
                    </div>

                    <div class="subject-card">
                        <h4>AsyncSubject</h4>
                        <p>Only emits last value on complete</p>
                        <div class="input-row">
                            <input [(ngModel)]="asyncValue" placeholder="Final value">
                            <button (click)="emitAsync()">Emit</button>
                        </div>
                        <button (click)="completeAsync()" class="complete">Complete</button>
                        <div class="subscribers">
                            <div class="sub">Received: {{ asyncResult() }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 800px; }
        .instructions { background: #fffbeb; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .subjects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .subject-card { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .subject-card h4 { margin: 0; color: #f59e0b; }
        .subject-card p { margin: 0.5rem 0; font-size: 0.8rem; color: #6b7280; }
        .input-row { display: flex; gap: 0.5rem; margin: 0.5rem 0; }
        .input-row input { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .input-row button, .subject-card > button { padding: 0.5rem 1rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .small { font-size: 0.8rem; padding: 0.25rem 0.5rem; margin: 0.5rem 0; }
        .complete { background: #10b981; margin-top: 0.5rem; }
        .subscribers { margin-top: 0.75rem; }
        .sub { padding: 0.25rem 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; margin-bottom: 0.25rem; font-family: monospace; font-size: 0.8rem; }
        .history { font-size: 0.75rem; color: #6b7280; margin: 0.5rem 0; }
    `]
})
export class Exercise3SubjectsComponent implements OnDestroy {
    private subscriptions: Subscription[] = [];

    // Subject
    private subject$ = new Subject<string>();
    subjectValue = '';
    subject1Value = signal('(waiting)');
    subject2Value = signal('(waiting)');

    // BehaviorSubject
    private behavior$ = new BehaviorSubject<string>('Initial');
    behaviorValue = '';
    behaviorValues = signal<{ id: number; value: string }[]>([]);
    private behaviorSubCount = 0;

    // ReplaySubject
    private replay$ = new ReplaySubject<number>(3);
    replayHistory = signal('');
    replayValues = signal<{ id: number; values: string }[]>([]);
    private replaySubCount = 0;
    private replayEmissions: number[] = [];

    // AsyncSubject
    private async$ = new AsyncSubject<string>();
    asyncValue = '';
    asyncResult = signal('(waiting for complete)');

    constructor() {
        // Subject subscriptions
        this.subscriptions.push(
            this.subject$.subscribe(val => this.subject1Value.set(val)),
            this.subject$.subscribe(val => this.subject2Value.set(val))
        );

        // Initial BehaviorSubject subscriber
        this.addBehaviorSub();

        // AsyncSubject subscription
        this.subscriptions.push(
            this.async$.subscribe(val => this.asyncResult.set(val))
        );
    }

    emitSubject(): void {
        if (this.subjectValue) {
            this.subject$.next(this.subjectValue);
            this.subjectValue = '';
        }
    }

    emitBehavior(): void {
        if (this.behaviorValue) {
            this.behavior$.next(this.behaviorValue);
            this.behaviorValue = '';
        }
    }

    addBehaviorSub(): void {
        this.behaviorSubCount++;
        const id = this.behaviorSubCount;
        this.behaviorValues.update(v => [...v, { id, value: '(subscribing...)' }]);

        this.subscriptions.push(
            this.behavior$.subscribe(val => {
                this.behaviorValues.update(values =>
                    values.map(v => v.id === id ? { ...v, value: val } : v)
                );
            })
        );
    }

    emitReplay(): void {
        const val = Math.floor(Math.random() * 100);
        this.replayEmissions.push(val);
        this.replayHistory.set(this.replayEmissions.slice(-5).join(', '));
        this.replay$.next(val);
    }

    addReplaySub(): void {
        this.replaySubCount++;
        const id = this.replaySubCount;
        const received: number[] = [];

        this.subscriptions.push(
            this.replay$.subscribe(val => {
                received.push(val);
                this.replayValues.update(values => {
                    const existing = values.find(v => v.id === id);
                    if (existing) {
                        return values.map(v => v.id === id ? { ...v, values: received.join(', ') } : v);
                    }
                    return [...values, { id, values: received.join(', ') }];
                });
            })
        );
    }

    emitAsync(): void {
        if (this.asyncValue) {
            this.async$.next(this.asyncValue);
        }
    }

    completeAsync(): void {
        this.async$.complete();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
