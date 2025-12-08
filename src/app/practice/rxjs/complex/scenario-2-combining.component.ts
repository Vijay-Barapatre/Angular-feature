/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: COMBINING STREAMS
 * ============================================================================
 */

import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, combineLatest, merge, forkJoin, of, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-scenario-2-combining',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Combining Streams</h2>
                <p>Learn different ways to combine multiple Observables.</p>
            </div>

            <div class="content">
                <div class="operators-demo">
                    <div class="demo-card">
                        <h4>combineLatest</h4>
                        <p>Emits when ANY source emits (after all have emitted once)</p>
                        <div class="inputs">
                            <input [(ngModel)]="inputA" placeholder="Stream A" (ngModelChange)="emitA($event)">
                            <input [(ngModel)]="inputB" placeholder="Stream B" (ngModelChange)="emitB($event)">
                        </div>
                        <div class="result">Combined: {{ combinedResult() }}</div>
                    </div>

                    <div class="demo-card">
                        <h4>merge</h4>
                        <p>Emits values from all sources as they arrive</p>
                        <div class="actions">
                            <button (click)="emitMerge('A')">Emit A</button>
                            <button (click)="emitMerge('B')">Emit B</button>
                            <button (click)="emitMerge('C')">Emit C</button>
                        </div>
                        <div class="result">Merged: {{ mergedResult() }}</div>
                    </div>

                    <div class="demo-card">
                        <h4>forkJoin</h4>
                        <p>Waits for ALL sources to complete, emits last values</p>
                        <button (click)="runForkJoin()" [disabled]="forkJoinLoading()">
                            {{ forkJoinLoading() ? 'Loading...' : 'Load All Data' }}
                        </button>
                        <div class="result">
                            @if (forkJoinResult()) {
                                {{ forkJoinResult() }}
                            } @else {
                                (waiting for all to complete)
                            }
                        </div>
                    </div>
                </div>

                <div class="visual">
                    <h4>📊 Stream Visualization</h4>
                    <div class="timeline">
                        @for (event of timelineEvents(); track event.time) {
                            <div class="event" [style.left.%]="event.position" [style.background]="event.color">
                                {{ event.label }}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #f59e0b; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .operators-demo { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .demo-card { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .demo-card h4 { margin: 0; color: #f59e0b; }
        .demo-card p { margin: 0.25rem 0 0.75rem; font-size: 0.85rem; color: #6b7280; }
        .inputs { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
        .inputs input { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .actions { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
        .actions button, .demo-card > button { padding: 0.5rem 1rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .result { padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; font-family: monospace; font-size: 0.85rem; }
        .visual { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .visual h4 { margin: 0 0 1rem; color: white; }
        .timeline { position: relative; height: 40px; background: #334155; border-radius: 4px; }
        .event { position: absolute; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; color: white; transform: translateX(-50%); top: 5px; }
    `]
})
export class Scenario2CombiningComponent implements OnDestroy {
    private subscriptions: Subscription[] = [];
    private streamA$ = new Subject<string>();
    private streamB$ = new Subject<string>();
    private mergeStream$ = new Subject<string>();

    inputA = '';
    inputB = '';
    combinedResult = signal('');
    mergedResult = signal('');
    forkJoinResult = signal('');
    forkJoinLoading = signal(false);
    timelineEvents = signal<{ time: number; position: number; label: string; color: string }[]>([]);

    private startTime = Date.now();

    constructor() {
        // combineLatest subscription
        this.subscriptions.push(
            combineLatest([this.streamA$, this.streamB$]).pipe(
                map(([a, b]) => `[${a}, ${b}]`)
            ).subscribe(result => {
                this.combinedResult.set(result);
                this.addTimelineEvent('CL', '#f59e0b');
            })
        );

        // merge subscription
        const merged: string[] = [];
        this.subscriptions.push(
            merge(
                this.mergeStream$.pipe(map(v => `${v}1`)),
                this.mergeStream$.pipe(delay(100), map(v => `${v}2`))
            ).subscribe(value => {
                merged.push(value);
                this.mergedResult.set(merged.slice(-6).join(' → '));
                this.addTimelineEvent(value, '#10b981');
            })
        );
    }

    emitA(value: string): void {
        this.streamA$.next(value);
        this.addTimelineEvent('A', '#3b82f6');
    }

    emitB(value: string): void {
        this.streamB$.next(value);
        this.addTimelineEvent('B', '#8b5cf6');
    }

    emitMerge(source: string): void {
        this.mergeStream$.next(source);
    }

    runForkJoin(): void {
        this.forkJoinLoading.set(true);
        this.forkJoinResult.set('');

        forkJoin({
            users: of(['User1', 'User2']).pipe(delay(1000)),
            posts: of(['Post1', 'Post2', 'Post3']).pipe(delay(1500)),
            comments: of(['Comment1']).pipe(delay(800))
        }).subscribe({
            next: (result) => {
                this.forkJoinResult.set(
                    `Users: ${result.users.length}, Posts: ${result.posts.length}, Comments: ${result.comments.length}`
                );
                this.forkJoinLoading.set(false);
            }
        });
    }

    private addTimelineEvent(label: string, color: string): void {
        const time = Date.now() - this.startTime;
        const position = Math.min(95, (time / 10000) * 100);

        this.timelineEvents.update(events =>
            [...events.slice(-10), { time, position, label, color }]
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
